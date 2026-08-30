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
var stateKey = function (id, course) { return "da-academy-state-v1:" + id + ":" + (course || activeCourse()); };
var legacyStateKey = function (id) { return "da-academy-state-v1:" + id; };
var notesKey = function (id) { return "da-academy-notes-v1:" + id; };

var MAX_HEARTS = 5, HEART_MINUTES = 20, DAILY_GOAL = 50;

var AVATARS = ["◈","◉","▲","⬡","★","◆","●","⬢","✦","▣"];
var COLORS  = ["#3b4ee0","#12925b","#c98a12","#d3283f","#7a3bd0","#0d8a9e","#c2410c","#4d5a70"];

/* ------------------------------------------------------------ low level */
function activeCourse() {
  return (book && book.activeCourse) || "digital-assets";
}
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
    marks: {},                    // lessonId -> [highlight/comment]
    cards: {},                    // glossary term -> spaced-repetition record
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
  book = { users: [first], activeId: first.id, settings: { autoBackup: true, hearts: true } };
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
if (!book.settings) { book.settings = { autoBackup: true, hearts: true }; writeJSON(USERS_KEY, book); }
if (!book.activeCourse) { book.activeCourse = "digital-assets"; writeJSON(USERS_KEY, book); }

var S = null, N = null;

function loadActive() {
  var id = book.activeId, course = activeCourse();
  var st = readJSON(stateKey(id, course), null);
  if (!st && course === "digital-assets") {
    // v2 kept one state per profile, before courses existed.
    var legacy = readJSON(legacyStateKey(id), null);
    if (legacy) { st = legacy; writeJSON(stateKey(id, course), st); }
  }
  st = st || blankState();
  var b = blankState();
  for (var k in b) if (!(k in st)) st[k] = b[k];
  if (!st.glossary) st.glossary = {};
  if (!st.marks) st.marks = {};
  if (!st.cards) st.cards = {};
  S = st;
  N = readJSON(notesKey(id), null) || blankNotes();
  if (!N.pages) N.pages = [];
}
/* A bundled course ships in the repo and cannot be deleted, so a profile
 * that does not want one can hide it instead. */
function isHidden(courseId) {
  return !!(book.hidden && book.hidden[courseId]);
}
function setHidden(courseId, on) {
  book.hidden = book.hidden || {};
  if (on) book.hidden[courseId] = true; else delete book.hidden[courseId];
  saveBook();
}
function switchCourse(courseId) {
  if (book.activeCourse === courseId) return false;
  book.activeCourse = courseId; saveBook(); loadActive();
  return true;
}
/* Every course this profile has touched, plus every course installed. */
function courseIds() {
  var ids = {}, prefix = "da-academy-state-v1:" + book.activeId + ":";
  for (var i = 0; i < localStorage.length; i++) {
    var k = localStorage.key(i);
    if (k && k.indexOf(prefix) === 0) ids[k.slice(prefix.length)] = true;
  }
  (window.DA_COURSES ? DA_COURSES.list() : []).forEach(function (c) { ids[c.id] = true; });
  return Object.keys(ids);
}
function stateForCourse(courseId) {
  if (courseId === activeCourse()) return S;
  return readJSON(stateKey(book.activeId, courseId), null);
}
loadActive();

function save()      { writeJSON(stateKey(book.activeId, activeCourse()), S); }
function saveNotes() { writeJSON(notesKey(book.activeId), N); }
function saveBook()  { writeJSON(USERS_KEY, book); }

/* ------------------------------------------------------------ hearts/xp */
/* Hearts are a stake, not a timer. Nothing refills by waiting: you earn them
 * back by clearing a recovery round of questions you have already missed, or
 * by reading a lesson. They can be switched off entirely.
 */
function heartsOn() { return book.settings.hearts !== false; }
function setHearts(on) {
  book.settings.hearts = !!on; saveBook();
  S.hearts = MAX_HEARTS; save();
}
function syncHearts() { if (!heartsOn()) S.hearts = MAX_HEARTS; }
function loseHeart() {
  if (!heartsOn()) return;
  S.hearts = Math.max(0, S.hearts - 1);
  save();
}
function gainHeart(n) {
  if (!heartsOn()) return;
  S.hearts = Math.min(MAX_HEARTS, S.hearts + (n || 1));
  save();
}
function refillHearts() { S.hearts = MAX_HEARTS; save(); }
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
function activeGlossary() {
  return window.DA_ACTIVE_GLOSSARY || window.DA_GLOSSARY || [];
}
function termsForLesson(lessonId) {
  return activeGlossary().filter(function (g) { return g.l === lessonId; });
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
  var g = activeGlossary(), got = 0;
  g.forEach(function (x) { if (S.glossary[x.t]) got++; });
  return { total: g.length, unlocked: got };
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

/* ------------------------------------------------------------ annotations */
function marksFor(lessonId) {
  if (!S.marks) S.marks = {};
  if (!S.marks[lessonId]) S.marks[lessonId] = [];
  return S.marks[lessonId];
}
function markCount(lessonId) { return ((S.marks || {})[lessonId] || []).length; }
function markTotals() {
  var m = S.marks || {}, hl = 0, notes = 0, lessons = 0;
  for (var k in m) {
    if (!m[k].length) continue;
    lessons++;
    m[k].forEach(function (x) { hl++; if (x.note && x.note.trim()) notes++; });
  }
  return { highlights: hl, comments: notes, lessons: lessons };
}

/* ------------------------------------------------------------ flashcards
 * Leitner-style boxes. A card only exists for a term you have unlocked.
 */
var BOX_DAYS = [0, 1, 3, 7, 16, 35];
function cards() { if (!S.cards) S.cards = {}; return S.cards; }
function hasCard(term) { return !!cards()[term]; }
function addCard(term) {
  if (cards()[term]) return false;
  cards()[term] = { box: 0, due: new Date().toISOString(), seen: 0, right: 0, wrong: 0 };
  save(); return true;
}
function removeCard(term) { delete cards()[term]; save(); }
function cardDue(term) {
  var c = cards()[term];
  return !!c && new Date(c.due).getTime() <= Date.now();
}
function dueCards() {
  var out = [];
  for (var t in cards()) if (cardDue(t)) out.push(t);
  return out;
}
function gradeCard(term, grade) {          // "again" | "good" | "easy"
  var c = cards()[term]; if (!c) return;
  c.seen++;
  if (grade === "again") { c.box = 0; c.wrong++; }
  else { c.right++; c.box = Math.min(BOX_DAYS.length - 1, c.box + (grade === "easy" ? 2 : 1)); }
  var days = BOX_DAYS[c.box];
  var when = new Date();
  if (days === 0) when.setMinutes(when.getMinutes() + 10);
  else when.setDate(when.getDate() + days);
  c.due = when.toISOString();
  save();
}
function cardStats() {
  var all = Object.keys(cards()), due = dueCards().length, learned = 0;
  all.forEach(function (t) { if (cards()[t].box >= 3) learned++; });
  return { total: all.length, due: due, learned: learned };
}

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
  writeJSON(stateKey(u.id, activeCourse()), blankState());
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
  try {
    var pre = "da-academy-state-v1:" + id;
    for (var i = localStorage.length - 1; i >= 0; i--) {
      var k = localStorage.key(i);
      if (k && k.indexOf(pre) === 0) localStorage.removeItem(k);
    }
    localStorage.removeItem(notesKey(id));
  } catch (e) {}
  if (book.activeId === id) book.activeId = book.users[0].id;
  saveBook(); loadActive();
  return true;
}
function resetActive() {
  var pre = "da-academy-state-v1:" + book.activeId + ":";
  for (var i = localStorage.length - 1; i >= 0; i--) {
    var k = localStorage.key(i);
    if (k && k.indexOf(pre) === 0) localStorage.removeItem(k);
  }
  S = blankState(); N = blankNotes();
  save(); saveNotes();
}

/* -------------------------------------------------- export / import */
function uniqueName(base) {
  base = (base || "Imported").trim().slice(0, 24) || "Imported";
  var taken = {};
  book.users.forEach(function (u) { taken[u.name.toLowerCase()] = true; });
  if (!taken[base.toLowerCase()]) return base;
  var tryName = (base + " (imported)").slice(0, 24);
  if (!taken[tryName.toLowerCase()]) return tryName;
  for (var n = 2; n < 50; n++) {
    var c = (base + " " + n).slice(0, 24);
    if (!taken[c.toLowerCase()]) return c;
  }
  return base + " " + Date.now().toString(36).slice(-4);
}
/* ------------------------------------------------------------ backups
 * The profile only exists in this browser, so the app backs itself up.
 * A backup covers every course under the profile, not just the open one.
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
  return "academy-" + (nm || "profile") + "-" + todayKey() + ".json";
}
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

function exportProfile(id) {
  id = id || book.activeId;
  var u = null;
  book.users.forEach(function (x) { if (x.id === id) u = x; });

  // Progress for every course this profile has touched, plus the content of
  // any course that is not the built-in one — a backup has to be able to
  // restore a course that only ever existed in this browser.
  var courses = {}, library = [];
  var pre = "da-academy-state-v1:" + id + ":";
  for (var i = 0; i < localStorage.length; i++) {
    var k = localStorage.key(i);
    if (!k || k.indexOf(pre) !== 0) continue;
    var cid = k.slice(pre.length);
    courses[cid] = readJSON(k, null);
  }
  if (window.DA_COURSES) {
    DA_COURSES.list().forEach(function (c) {
      if (c.builtin || c.broken) return;
      var full = DA_COURSES.get(c.id);
      if (full) library.push(full);
    });
  }
  return {
    format: "digital-assets-academy/profile",
    version: 3,
    exported: new Date().toISOString(),
    profile: { name: u ? u.name : "Profile", avatar: u ? u.avatar : AVATARS[0], color: u ? u.color : COLORS[0] },
    courses: courses,
    library: library,
    notes: readJSON(notesKey(id), blankNotes())
  };
}

function importProfile(obj) {
  if (!obj || obj.format !== "digital-assets-academy/profile") throw new Error("Not a Digital Assets Academy profile file.");
  var u = createUser(uniqueName(obj.profile && obj.profile.name));
  if (obj.profile) styleUser(u.id, obj.profile.avatar, obj.profile.color);

  // Bring any course the backup carried that is not installed here.
  var remap = {};
  if (Array.isArray(obj.library) && window.DA_COURSES) {
    obj.library.forEach(function (c) {
      try {
        var wanted = c.id;
        if (DA_COURSES.exists(wanted)) { remap[wanted] = wanted; return; }
        var made = DA_COURSES.add(DA_COURSES.normalise(JSON.parse(JSON.stringify(c))));
        remap[wanted] = made.id;
      } catch (e) { /* a course that will not load must not sink the import */ }
    });
  }

  var courses = obj.courses;
  if (!courses && obj.state) courses = { "digital-assets": obj.state };   // v2 backup
  courses = courses || {};
  Object.keys(courses).forEach(function (cid) {
    var target = remap[cid] || cid;
    var st = blankState(), src = courses[cid] || {};
    for (var k in st) if (k in src) st[k] = src[k];
    if (!st.glossary) st.glossary = {};
    if (!st.marks) st.marks = {};
    if (!st.cards) st.cards = {};
    writeJSON(stateKey(u.id, target), st);
  });

  writeJSON(notesKey(u.id), (obj.notes && obj.notes.pages) ? obj.notes : blankNotes());
  return u;
}

/* ------------------------------------------------------------ exports */
return {
  MAX_HEARTS: MAX_HEARTS, HEART_MINUTES: HEART_MINUTES, DAILY_GOAL: DAILY_GOAL,
  AVATARS: AVATARS, COLORS: COLORS,
  get state() { return S; },
  get notes() { return N; },
  save: save, saveNotes: saveNotes,
  todayKey: todayKey,
  syncHearts: syncHearts, loseHeart: loseHeart, gainHeart: gainHeart,
  refillHearts: refillHearts, heartsOn: heartsOn, setHearts: setHearts, addXp: addXp,
  termsForLesson: termsForLesson, markRead: markRead, unmarkRead: unmarkRead,
  isUnlocked: isUnlocked, glossaryCounts: glossaryCounts,
  marksFor: marksFor, markCount: markCount, markTotals: markTotals,
  cards: cards, hasCard: hasCard, addCard: addCard, removeCard: removeCard,
  dueCards: dueCards, gradeCard: gradeCard, cardStats: cardStats, cardDue: cardDue,
  newPage: newPage, pageById: pageById, pageForRef: pageForRef,
  deletePage: deletePage, touchPage: touchPage, bid: bid,
  listUsers: listUsers, activeUser: activeUser, switchUser: switchUser,
  createUser: createUser, renameUser: renameUser, styleUser: styleUser,
  deleteUser: deleteUser, resetActive: resetActive,
  exportProfile: exportProfile, importProfile: importProfile,
  activeCourse: activeCourse, switchCourse: switchCourse,
  isHidden: isHidden, setHidden: setHidden,
  courseIds: courseIds, stateForCourse: stateForCourse,
  BACKUP_HOURS: BACKUP_HOURS,
  backupSupported: backupSupported, getBackupDir: getBackupDir, chooseBackupDir: chooseBackupDir,
  clearBackupDir: clearBackupDir, writeBackupToFolder: writeBackupToFolder,
  markBackedUp: markBackedUp, hoursSinceBackup: hoursSinceBackup, backupDue: backupDue,
  backupFilename: backupFilename, setAutoBackup: setAutoBackup, autoBackupOn: autoBackupOn
};
})();
