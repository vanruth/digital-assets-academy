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
  book = { users: [first], activeId: first.id };
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
  exportProfile: exportProfile, importProfile: importProfile
};
})();
