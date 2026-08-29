/* Digital Assets Academy — storage layer
 * Profiles, per-profile progress, per-profile notes, glossary unlocking.
 *
 * There is no server. These are local profiles on this device, not
 * authenticated accounts — see exportProfile/importProfile to move a
 * profile between browsers or machines.
 */
window.DA = (function () {
"use strict";

var USERS_KEY  = "da-academy-users-v1";
var LEGACY_KEY = "da-academy-v1";
var stateKey = function (id) { return "da-academy-state-v1:" + id; };
var notesKey = function (id) { return "da-academy-notes-v1:" + id; };

var MAX_HEARTS = 5, HEART_MINUTES = 20, DAILY_GOAL = 50;

var AVATARS = ["◈","◉","▲","⬡","★","◆","●","⬢","✦","▣"];
var COLORS  = ["#3b4ee0","#12925b","#c98a12","#d3283f","#7a3bd0","#0d8a9e","#c2410c","#4d5a70"];

/* ------------------------------------------------------------ low level */
function readJSON(k, fallback) {
  try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; }
  catch (e) { return fallback; }
}
function writeJSON(k, v) {
  try { localStorage.setItem(k, JSON.stringify(v)); return true; }
  catch (e) { return false; }
}
function uid() { return "u" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
function pad(n) { return n < 10 ? "0" + n : "" + n; }
function todayKey(d) { d = d || new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
function daysBetween(a, b) { return Math.round((new Date(b + "T00:00:00") - new Date(a + "T00:00:00")) / 86400000); }

/* ------------------------------------------------------------ defaults */
function blankState() {
  return {
    xp: 0, streak: 0, lastDay: null, days: {},
    hearts: MAX_HEARTS, heartTs: Date.now(),
    read: {}, quiz: {}, seen: {}, mistakes: {}.mistakes || [],
    glossary: {},                 // term -> ISO timestamp unlocked
    lastBackup: null,             // ISO timestamp of the last exported backup
    started: todayKey()
  };
}
function blankNotes() { return { pages: [] }; }

/* ------------------------------------------------------------ profiles */
var book = readJSON(USERS_KEY, null);

function seed() {
  var legacy = readJSON(LEGACY_KEY, null);
  var first = {
    id: uid(), name: "You", avatar: AVATARS[0], color: COLORS[0],
    created: new Date().toISOString(), lastSeen: new Date().toISOString()
  };
  book = { users: [first], activeId: first.id, settings: { autoBackup: true } };
  writeJSON(USERS_KEY, book);
  var st = blankState();
  if (legacy && typeof legacy === "object") {
    for (var k in st) if (k in legacy) st[k] = legacy[k];
    if (!st.glossary) st.glossary = {};
  }
  writeJSON(stateKey(first.id), st);
  writeJSON(notesKey(first.id), blankNotes());
}
if (!book || !book.users || !book.users.length) seed();
if (!book.activeId || !book.users.some(function (u) { return u.id === book.activeId; }))
  book.activeId = book.users[0].id;
if (!book.settings) { book.settings = { autoBackup: true }; writeJSON(USERS_KEY, book); }

var S = null, N = null;

function loadActive() {
  var id = book.activeId;
  var st = readJSON(stateKey(id), null) || blankState();
  var b = blankState();
  for (var k in b) if (!(k in st)) st[k] = b[k];
  if (!st.glossary) st.glossary = {};
  S = st;
  N = readJSON(notesKey(id), null) || blankNotes();
  if (!N.pages) N.pages = [];
}
loadActive();

function save()      { writeJSON(stateKey(book.activeId), S); }
function saveNotes() { writeJSON(notesKey(book.activeId), N); }
function saveBook()  { writeJSON(USERS_KEY, book); }

/* ------------------------------------------------------------ hearts/xp */
function syncHearts() {
  if (S.hearts >= MAX_HEARTS) { S.heartTs = Date.now(); return; }
  var gained = Math.floor((Date.now() - S.heartTs) / 60000 / HEART_MINUTES);
  if (gained > 0) {
    S.hearts = Math.min(MAX_HEARTS, S.hearts + gained);
    S.heartTs = S.hearts >= MAX_HEARTS ? Date.now() : S.heartTs + gained * HEART_MINUTES * 60000;
    save();
  }
}
function heartsIn() {
  if (S.hearts >= MAX_HEARTS) return null;
  return Math.max(1, Math.ceil((S.heartTs + HEART_MINUTES * 60000 - Date.now()) / 60000));
}
function loseHeart() {
  if (S.hearts === MAX_HEARTS) S.heartTs = Date.now();
  S.hearts = Math.max(0, S.hearts - 1);
  save();
}
function addXp(n) {
  S.xp += n;
  var t = todayKey();
  S.days[t] = (S.days[t] || 0) + n;
  if (S.lastDay !== t) {
    S.streak = (S.lastDay && daysBetween(S.lastDay, t) === 1) ? S.streak + 1 : 1;
    S.lastDay = t;
  }
  if (!S.streak) S.streak = 1;
  save();
}

/* ------------------------------------------------------------ glossary */
function termsForLesson(lessonId) {
  return (window.DA_GLOSSARY || []).filter(function (g) { return g.l === lessonId; });
}
/* Marks a lesson read and returns the terms newly unlocked by doing so. */
function markRead(lessonId) {
  if (S.read[lessonId]) return [];
  S.read[lessonId] = true;
  var now = new Date().toISOString(), fresh = [];
  termsForLesson(lessonId).forEach(function (g) {
    if (!S.glossary[g.t]) { S.glossary[g.t] = now; fresh.push(g); }
  });
  save();
  return fresh;
}
function unmarkRead(lessonId) {
  delete S.read[lessonId];
  termsForLesson(lessonId).forEach(function (g) { delete S.glossary[g.t]; });
  save();
}
function isUnlocked(term) { return !!S.glossary[term]; }
function glossaryCounts() {
  var all = (window.DA_GLOSSARY || []).length, got = 0;
  (window.DA_GLOSSARY || []).forEach(function (g) { if (S.glossary[g.t]) got++; });
  return { total: all, unlocked: got };
}

/* ------------------------------------------------------------ notes */
function newPage(ref, title) {
  var p = {
    id: "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    title: title || "Untitled",
    icon: "📝",
    ref: ref || null,                 // {kind:"lesson"|"module", id, label}
    blocks: [{ id: bid(), type: "p", html: "" }],
    created: new Date().toISOString(),
    updated: new Date().toISOString()
  };
  N.pages.unshift(p); saveNotes();
  return p;
}
function bid() { return "b" + Math.random().toString(36).slice(2, 9); }
function pageById(id) { for (var i = 0; i < N.pages.length; i++) if (N.pages[i].id === id) return N.pages[i]; return null; }
function pageForRef(kind, id) {
  for (var i = 0; i < N.pages.length; i++) {
    var r = N.pages[i].ref;
    if (r && r.kind === kind && r.id === id) return N.pages[i];
  }
  return null;
}
function deletePage(id) {
  N.pages = N.pages.filter(function (p) { return p.id !== id; });
  saveNotes();
}
function touchPage(p) { p.updated = new Date().toISOString(); saveNotes(); }

/* ------------------------------------------------------------ profiles API */
function listUsers() { return book.users.slice(); }
function activeUser() { for (var i = 0; i < book.users.length; i++) if (book.users[i].id === book.activeId) return book.users[i]; return book.users[0]; }
function switchUser(id) {
  if (!book.users.some(function (u) { return u.id === id; })) return false;
  book.activeId = id;
  activeUser().lastSeen = new Date().toISOString();
  saveBook(); loadActive();
  return true;
}
function createUser(name) {
  name = (name || "").trim().slice(0, 24) || "New profile";
  var n = book.users.length;
  var u = {
    id: uid(), name: name,
    avatar: AVATARS[n % AVATARS.length], color: COLORS[n % COLORS.length],
    created: new Date().toISOString(), lastSeen: new Date().toISOString()
  };
  book.users.push(u); saveBook();
  writeJSON(stateKey(u.id), blankState());
  writeJSON(notesKey(u.id), blankNotes());
  return u;
}
function renameUser(id, name) {
  book.users.forEach(function (u) { if (u.id === id) u.name = (name || "").trim().slice(0, 24) || u.name; });
  saveBook();
}
function styleUser(id, avatar, color) {
  book.users.forEach(function (u) { if (u.id === id) { if (avatar) u.avatar = avatar; if (color) u.color = color; } });
  saveBook();
}
function deleteUser(id) {
  if (book.users.length <= 1) return false;
  book.users = book.users.filter(function (u) { return u.id !== id; });
  try { localStorage.removeItem(stateKey(id)); localStorage.removeItem(notesKey(id)); } catch (e) {}
  if (book.activeId === id) book.activeId = book.users[0].id;
  saveBook(); loadActive();
  return true;
}
function resetActive() {
  S = blankState(); N = blankNotes();
  save(); saveNotes();
}

/* -------------------------------------------------- export / import */
function exportProfile(id) {
  id = id || book.activeId;
  var u = null;
  book.users.forEach(function (x) { if (x.id === id) u = x; });
  return {
    format: "digital-assets-academy/profile",
    version: 2,
    exported: new Date().toISOString(),
    profile: { name: u ? u.name : "Profile", avatar: u ? u.avatar : AVATARS[0], color: u ? u.color : COLORS[0] },
    state: readJSON(stateKey(id), blankState()),
    notes: readJSON(notesKey(id), blankNotes())
  };
}
function importProfile(obj) {
  if (!obj || obj.format !== "digital-assets-academy/profile") throw new Error("Not a Digital Assets Academy profile file.");
  var u = createUser((obj.profile && obj.profile.name ? obj.profile.name : "Imported") + "");
  if (obj.profile) styleUser(u.id, obj.profile.avatar, obj.profile.color);
  var st = blankState();
  if (obj.state) for (var k in st) if (k in obj.state) st[k] = obj.state[k];
  if (!st.glossary) st.glossary = {};
  writeJSON(stateKey(u.id), st);
  writeJSON(notesKey(u.id), (obj.notes && obj.notes.pages) ? obj.notes : blankNotes());
  return u;
}

/* ------------------------------------------------------------ backups
 * The profile only exists in this browser, so the app backs itself up.
 * If the browser supports the File System Access API and a folder has been
 * chosen, backups are written straight there; otherwise we hand the user a
 * download. Either way it fires at most once every BACKUP_HOURS.
 */
var BACKUP_HOURS = 24;
var IDB_NAME = "da-academy", IDB_STORE = "handles";

function idb() {
  return new Promise(function (res, rej) {
    if (!window.indexedDB) return rej(new Error("no indexedDB"));
    var r = indexedDB.open(IDB_NAME, 1);
    r.onupgradeneeded = function () { r.result.createObjectStore(IDB_STORE); };
    r.onsuccess = function () { res(r.result); };
    r.onerror = function () { rej(r.error); };
  });
}
function idbGet(k) {
  return idb().then(function (db) {
    return new Promise(function (res, rej) {
      var t = db.transaction(IDB_STORE, "readonly").objectStore(IDB_STORE).get(k);
      t.onsuccess = function () { res(t.result); };
      t.onerror = function () { rej(t.error); };
    });
  }).catch(function () { return null; });
}
function idbSet(k, v) {
  return idb().then(function (db) {
    return new Promise(function (res, rej) {
      var t = db.transaction(IDB_STORE, "readwrite").objectStore(IDB_STORE).put(v, k);
      t.onsuccess = function () { res(true); };
      t.onerror = function () { rej(t.error); };
    });
  }).catch(function () { return false; });
}

function backupSupported() { return typeof window.showDirectoryPicker === "function"; }
function getBackupDir() { return idbGet("backupDir"); }
function clearBackupDir() { return idbSet("backupDir", null); }
function chooseBackupDir() {
  if (!backupSupported()) return Promise.reject(new Error("This browser cannot write to a folder. Use Chrome or Edge, or download backups instead."));
  return window.showDirectoryPicker({ mode: "readwrite", id: "da-academy-backups" })
    .then(function (dir) { return idbSet("backupDir", dir).then(function () { return dir; }); });
}
function dirPermission(dir, request) {
  if (!dir || !dir.queryPermission) return Promise.resolve("granted");
  return dir.queryPermission({ mode: "readwrite" }).then(function (p) {
    if (p === "granted" || !request) return p;
    return dir.requestPermission({ mode: "readwrite" });
  });
}
function backupFilename(id) {
  var u = null;
  book.users.forEach(function (x) { if (x.id === (id || book.activeId)) u = x; });
  var nm = (u ? u.name : "profile").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return "digital-assets-academy-" + (nm || "profile") + "-" + todayKey() + ".json";
}
/* Writes to the chosen folder. Resolves with the folder name, or rejects. */
function writeBackupToFolder(request) {
  return getBackupDir().then(function (dir) {
    if (!dir) throw new Error("no folder chosen");
    return dirPermission(dir, request).then(function (p) {
      if (p !== "granted") throw new Error("permission not granted");
      return dir.getFileHandle(backupFilename(), { create: true })
        .then(function (fh) { return fh.createWritable(); })
        .then(function (w) {
          return w.write(JSON.stringify(exportProfile(), null, 2)).then(function () { return w.close(); });
        })
        .then(function () { markBackedUp(); return dir.name; });
    });
  });
}
function markBackedUp() { S.lastBackup = new Date().toISOString(); save(); }
function hoursSinceBackup() {
  if (!S.lastBackup) return Infinity;
  return (Date.now() - new Date(S.lastBackup).getTime()) / 3600000;
}
function backupDue() {
  return book.settings.autoBackup !== false && hoursSinceBackup() >= BACKUP_HOURS;
}
function setAutoBackup(on) { book.settings.autoBackup = !!on; saveBook(); }
function autoBackupOn() { return book.settings.autoBackup !== false; }

/* ------------------------------------------------------------ exports */
return {
  MAX_HEARTS: MAX_HEARTS, HEART_MINUTES: HEART_MINUTES, DAILY_GOAL: DAILY_GOAL,
  AVATARS: AVATARS, COLORS: COLORS,
  get state() { return S; },
  get notes() { return N; },
  save: save, saveNotes: saveNotes,
  todayKey: todayKey,
  syncHearts: syncHearts, heartsIn: heartsIn, loseHeart: loseHeart, addXp: addXp,
  termsForLesson: termsForLesson, markRead: markRead, unmarkRead: unmarkRead,
  isUnlocked: isUnlocked, glossaryCounts: glossaryCounts,
  newPage: newPage, pageById: pageById, pageForRef: pageForRef,
  deletePage: deletePage, touchPage: touchPage, bid: bid,
  listUsers: listUsers, activeUser: activeUser, switchUser: switchUser,
  createUser: createUser, renameUser: renameUser, styleUser: styleUser,
  deleteUser: deleteUser, resetActive: resetActive,
  exportProfile: exportProfile, importProfile: importProfile,
  BACKUP_HOURS: BACKUP_HOURS,
  backupSupported: backupSupported, getBackupDir: getBackupDir, chooseBackupDir: chooseBackupDir,
  clearBackupDir: clearBackupDir, writeBackupToFolder: writeBackupToFolder,
  markBackedUp: markBackedUp, hoursSinceBackup: hoursSinceBackup, backupDue: backupDue,
  backupFilename: backupFilename, setAutoBackup: setAutoBackup, autoBackupOn: autoBackupOn
};
})();
