/* Digital Assets Academy — application engine
 * No framework, no build step. Plain DOM + hash routing + localStorage.
 */
(function () {
"use strict";

var C = window.DA_CURRICULUM;
var QB = window.DA_QUESTIONS;

/* ---------------------------------------------------------------- config */
var KEY = "da-academy-v1";
var MAX_HEARTS = 5;
var HEART_MINUTES = 20;      // one heart back every 20 minutes
var Q_PER_LESSON = 6;        // questions per quiz lesson
var XP_CORRECT = 10;
var XP_COMPLETE = 5;
var XP_PERFECT = 20;
var DAILY_GOAL = 50;

/* ---------------------------------------------------------------- state */
var S = load();

function blank() {
  return {
    xp: 0, streak: 0, lastDay: null, days: {},
    hearts: MAX_HEARTS, heartTs: Date.now(),
    read: {}, quiz: {}, seen: {}, mistakes: [],
    started: todayKey()
  };
}
function load() {
  try {
    var raw = localStorage.getItem(KEY);
    if (!raw) return blank();
    var s = JSON.parse(raw), b = blank();
    for (var k in b) if (!(k in s)) s[k] = b[k];
    return s;
  } catch (e) { return blank(); }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
}
function todayKey(d) {
  d = d || new Date();
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
}
function pad(n) { return n < 10 ? "0" + n : "" + n; }
function daysBetween(a, b) {
  return Math.round((new Date(b + "T00:00:00") - new Date(a + "T00:00:00")) / 86400000);
}

/* ------------------------------------------------------------- hearts/xp */
function syncHearts() {
  if (S.hearts >= MAX_HEARTS) { S.heartTs = Date.now(); return; }
  var mins = (Date.now() - S.heartTs) / 60000;
  var gained = Math.floor(mins / HEART_MINUTES);
  if (gained > 0) {
    S.hearts = Math.min(MAX_HEARTS, S.hearts + gained);
    S.heartTs = S.hearts >= MAX_HEARTS ? Date.now() : S.heartTs + gained * HEART_MINUTES * 60000;
    save();
  }
}
function heartsIn() {
  if (S.hearts >= MAX_HEARTS) return null;
  var ms = S.heartTs + HEART_MINUTES * 60000 - Date.now();
  return Math.max(1, Math.ceil(ms / 60000));
}
function loseHeart() {
  if (S.hearts === MAX_HEARTS) S.heartTs = Date.now();
  S.hearts = Math.max(0, S.hearts - 1);
  save(); paintHud();
}
function addXp(n) {
  S.xp += n;
  var t = todayKey();
  S.days[t] = (S.days[t] || 0) + n;
  if (S.lastDay !== t) {
    if (S.lastDay && daysBetween(S.lastDay, t) === 1) S.streak += 1;
    else S.streak = 1;
    S.lastDay = t;
  }
  if (!S.streak) S.streak = 1;
  save(); paintHud();
}

/* ---------------------------------------------------------------- helpers */
function el(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function norm(s) { return String(s).toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim(); }
function toast(msg) {
  var t = document.getElementById("toast");
  t.textContent = msg; t.classList.add("on");
  clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("on"); }, 2200);
}
function moduleById(id) { for (var i = 0; i < C.modules.length; i++) if (C.modules[i].id === id) return C.modules[i]; return null; }
function lessonById(id) {
  for (var i = 0; i < C.modules.length; i++)
    for (var j = 0; j < C.modules[i].lessons.length; j++)
      if (C.modules[i].lessons[j].id === id) return { m: C.modules[i], l: C.modules[i].lessons[j], mi: i, li: j };
  return null;
}
function poolFor(mid) { return QB.filter(function (q) { return q.m === mid; }); }
function unitLessons(mid) { return Math.max(1, Math.ceil(poolFor(mid).length / Q_PER_LESSON)); }
function quizKey(mid, idx) { return mid + ":" + idx; }

function moduleReadPct(m) {
  var n = 0;
  m.lessons.forEach(function (l) { if (S.read[l.id]) n++; });
  return n / m.lessons.length;
}
function moduleQuizPct(m) {
  var n = unitLessons(m.id), done = 0;
  for (var i = 0; i < n; i++) if ((S.quiz[quizKey(m.id, i)] || {}).done) done++;
  return done / n;
}
function unitUnlocked(idx) {
  if (idx === 0) return true;
  var prev = C.modules[idx - 1];
  return moduleQuizPct(prev) >= 1 || moduleReadPct(prev) >= 1;
}
function totals() {
  var lessons = 0, readN = 0, qz = 0, qzDone = 0;
  C.modules.forEach(function (m) {
    lessons += m.lessons.length;
    m.lessons.forEach(function (l) { if (S.read[l.id]) readN++; });
    var n = unitLessons(m.id); qz += n;
    for (var i = 0; i < n; i++) if ((S.quiz[quizKey(m.id, i)] || {}).done) qzDone++;
  });
  var right = 0, wrong = 0;
  for (var k in S.seen) { right += S.seen[k].right || 0; wrong += S.seen[k].wrong || 0; }
  return { lessons: lessons, readN: readN, qz: qz, qzDone: qzDone, right: right, wrong: wrong,
           acc: right + wrong ? Math.round(right / (right + wrong) * 100) : 0 };
}

/* ---------------------------------------------------------------- chrome */
function paintHud() {
  syncHearts();
  document.getElementById("hud-xp").textContent = S.xp;
  document.getElementById("hud-streak").textContent = S.streak;
  document.getElementById("hud-hearts").textContent = S.hearts;
  document.querySelector(".hud-hearts").classList.toggle("empty", S.hearts === 0);
}
function setTab(name) {
  document.querySelectorAll(".tab").forEach(function (b) {
    b.classList.toggle("on", b.dataset.nav === name);
  });
}
var view = document.getElementById("view");
function render(html) {
  view.innerHTML = html;
  window.scrollTo(0, 0);
}

/* ---------------------------------------------------------------- router */
function route() {
  paintHud();
  var h = (location.hash || "#/").replace(/^#/, "");
  var p = h.split("/").filter(Boolean);
  if (!p.length) { setTab("home"); return viewHome(); }
  if (p[0] === "syllabus") {
    setTab("syllabus");
    if (p[1] && p[2]) return viewLesson(p[1], parseInt(p[2], 10));
    if (p[1]) return viewModule(p[1]);
    return viewSyllabus();
  }
  if (p[0] === "quiz") {
    setTab("quiz");
    if (p[1] === "practice") return startSession("practice", null, null);
    if (p[1] && p[2] !== undefined) return startSession("unit", p[1], parseInt(p[2], 10));
    return viewQuizPath();
  }
  if (p[0] === "progress") { setTab("progress"); return viewProgress(); }
  location.hash = "#/";
}

/* ---------------------------------------------------------------- home */
function viewHome() {
  var t = totals();
  var nextMod = C.modules.find(function (m) { return moduleReadPct(m) < 1; }) || C.modules[0];
  var goalPct = Math.min(100, Math.round((S.days[todayKey()] || 0) / DAILY_GOAL * 100));
  render(
  '<div class="wrap">' +
    '<section class="hero">' +
      '<h1>How digital assets actually work</h1>' +
      '<p class="lede">A ' + C.modules.length + '-module syllabus and a ' + QB.length + '-question drill, written for someone who has to make decisions about this — not for someone who wants a glossary. Current to ' + C.updated + '.</p>' +
      '<div class="row">' +
        '<a class="btn" href="#/syllabus">' + (t.readN ? "Continue reading" : "Start the syllabus") + '</a>' +
        '<a class="btn btn-ghost" href="#/quiz">Go to the quiz</a>' +
      '</div>' +
      '<div class="hero-stats">' +
        '<div class="hero-stat"><b>' + C.modules.length + '</b><span>Modules</span></div>' +
        '<div class="hero-stat"><b>' + t.lessons + '</b><span>Lessons</span></div>' +
        '<div class="hero-stat"><b>' + QB.length + '</b><span>Questions</span></div>' +
        '<div class="hero-stat"><b>' + t.readN + "/" + t.lessons + '</b><span>Read</span></div>' +
        '<div class="hero-stat"><b>' + t.qzDone + "/" + t.qz + '</b><span>Quizzes cleared</span></div>' +
      '</div>' +
    '</section>' +
    '<div class="pair">' +
      '<div class="card">' +
        '<h3>Pick up where you left off</h3>' +
        '<p class="muted" style="font-size:14.5px">Module ' + nextMod.number + " — " + esc(nextMod.title) + '</p>' +
        '<div class="bar" style="margin:12px 0 16px"><i style="width:' + Math.round(moduleReadPct(nextMod) * 100) + '%"></i></div>' +
        '<a class="btn btn-sm" href="#/syllabus/' + nextMod.id + '">Open module</a>' +
      '</div>' +
      '<div class="card">' +
        '<h3>Today</h3>' +
        '<p class="muted" style="font-size:14.5px">' + (S.days[todayKey()] || 0) + " / " + DAILY_GOAL + ' XP toward today&rsquo;s goal · ' + S.streak + '-day streak</p>' +
        '<div class="bar good" style="margin:12px 0 16px"><i style="width:' + goalPct + '%"></i></div>' +
        '<a class="btn btn-sm btn-ghost" href="#/quiz">Drill now</a>' +
      '</div>' +
    '</div>' +
    '<div class="card" style="margin-top:18px">' +
      '<h3>How to use this</h3>' +
      '<p style="font-size:15px;color:var(--ink2);max-width:70ch">Read a module, then clear its quiz unit. The quiz asks the things worth remembering — dates, thresholds, mechanisms and the judgment calls — not vocabulary. You have ' + MAX_HEARTS + ' hearts; a wrong answer costs one and the question comes back later in the same session. Hearts return one every ' + HEART_MINUTES + ' minutes.</p>' +
      '<p style="font-size:15px;color:var(--ink2);max-width:70ch;margin:0">Everything is stored in this browser only. Nothing is sent anywhere.</p>' +
    '</div>' +
  '</div>');
}

/* ---------------------------------------------------------------- syllabus */
function viewSyllabus() {
  var cards = C.modules.map(function (m) {
    var pct = Math.round(moduleReadPct(m) * 100);
    return '<button class="mod' + (pct === 100 ? " done" : "") + '" data-go="#/syllabus/' + m.id + '">' +
      '<div class="mod-top"><span class="mod-icon">' + m.icon + '</span>' +
        '<div><div class="mod-n">Module ' + m.number + '</div>' +
        '<div class="mod-title">' + esc(m.title) + '</div></div></div>' +
      '<p class="mod-tag">' + esc(m.tagline) + '</p>' +
      '<div class="bar" style="margin-top:6px"><i style="width:' + pct + '%"></i></div>' +
      '<div class="mod-meta"><span>' + m.lessons.length + ' lessons</span><span>' + m.minutes + ' min</span>' +
        '<span style="margin-left:auto">' + pct + '%</span></div>' +
    '</button>';
  }).join("");
  render('<div class="wrap"><h1>Syllabus</h1>' +
    '<p class="lede">Ten modules, ' + totals().lessons + ' lessons. Read in order if this is new to you; jump straight to Modules 5, 6, 7 and 9 if it is not.</p>' +
    '<div class="mods">' + cards + '</div></div>');
}

function viewModule(mid) {
  var m = moduleById(mid); if (!m) return (location.hash = "#/syllabus");
  var pct = Math.round(moduleReadPct(m) * 100);
  var list = m.lessons.map(function (l, i) {
    return '<button class="mod" data-go="#/syllabus/' + m.id + "/" + i + '" style="flex-direction:row;align-items:center;gap:14px">' +
      '<span class="mod-icon">' + (S.read[l.id] ? "✓" : (i + 1)) + '</span>' +
      '<span style="flex:1"><span class="mod-title" style="display:block">' + esc(l.title) + '</span>' +
      '<span class="mod-tag" style="display:block">' + l.minutes + ' min read</span></span></button>';
  }).join("");
  render('<div class="wrap">' +
    '<p><a href="#/syllabus" class="muted" style="font-size:14px;text-decoration:none">&larr; All modules</a></p>' +
    '<div class="card" style="margin-bottom:20px">' +
      '<div class="mod-n">Module ' + m.number + ' · ' + m.minutes + ' min · ' + m.lessons.length + ' lessons</div>' +
      '<h1 style="margin:4px 0 6px">' + esc(m.title) + '</h1>' +
      '<p class="lede" style="margin-bottom:16px">' + esc(m.summary) + '</p>' +
      '<h4 style="margin-top:0">By the end you can</h4>' +
      '<ul class="outcomes">' + m.outcomes.map(function (o) { return "<li>" + esc(o) + "</li>"; }).join("") + '</ul>' +
      '<div class="bar" style="margin:18px 0 14px"><i style="width:' + pct + '%"></i></div>' +
      '<div class="row"><a class="btn btn-sm" href="#/syllabus/' + m.id + '/0">' + (pct ? "Continue" : "Start module") + '</a>' +
      '<a class="btn btn-sm btn-ghost" href="#/quiz">Quiz this module</a></div>' +
    '</div>' +
    '<div class="mods">' + list + '</div></div>');
}

function viewLesson(mid, idx) {
  var m = moduleById(mid); if (!m) return (location.hash = "#/syllabus");
  if (isNaN(idx) || idx < 0 || idx >= m.lessons.length) idx = 0;
  var l = m.lessons[idx];
  var toc = m.lessons.map(function (x, i) {
    return '<button class="' + (i === idx ? "on " : "") + (S.read[x.id] ? "done" : "") + '" data-go="#/syllabus/' + m.id + "/" + i + '">' +
      '<span class="tick">' + (S.read[x.id] ? "✓" : "○") + '</span><span>' + esc(x.title) + '</span></button>';
  }).join("");
  var prev = idx > 0 ? '#/syllabus/' + m.id + "/" + (idx - 1) : null;
  var nextMod = C.modules[m.number] ? C.modules[m.number] : null;
  var next = idx < m.lessons.length - 1 ? '#/syllabus/' + m.id + "/" + (idx + 1)
           : (nextMod ? '#/syllabus/' + nextMod.id + "/0" : "#/quiz");

  render('<div class="wrap"><div class="reader">' +
    '<aside class="toc"><h4>Module ' + m.number + '</h4>' + toc +
      '<div style="border-top:1px solid var(--line);margin-top:10px;padding-top:10px">' +
      '<button data-go="#/syllabus"><span class="tick">←</span><span>All modules</span></button>' +
      '<button data-go="#/quiz"><span class="tick">◆</span><span>Quiz this material</span></button></div></aside>' +
    '<article class="lesson">' +
      '<div class="eyebrow">Module ' + m.number + " · Lesson " + (idx + 1) + " of " + m.lessons.length + '</div>' +
      '<h1>' + esc(l.title) + '</h1>' +
      '<div class="lesson-body">' + l.body + '</div>' +
      '<div class="keypoints"><h4>Worth remembering</h4><ul>' +
        l.key.map(function (k) { return "<li>" + esc(k) + "</li>"; }).join("") + '</ul></div>' +
      '<div class="lesson-nav">' +
        (prev ? '<a class="btn btn-ghost btn-sm" href="' + prev + '">&larr; Previous</a>' : '<span></span>') +
        '<div class="row">' +
          '<button class="btn btn-sm ' + (S.read[l.id] ? "btn-ghost" : "btn-good") + '" id="mark">' +
            (S.read[l.id] ? "✓ Marked as read" : "Mark as read") + '</button>' +
          '<a class="btn btn-sm" href="' + next + '">Next &rarr;</a>' +
        '</div>' +
      '</div>' +
    '</article></div></div>');

  // wrap wide tables so they scroll instead of breaking the layout
  view.querySelectorAll("table.data").forEach(function (tb) {
    if (tb.parentNode.classList.contains("tablewrap")) return;
    var w = document.createElement("div"); w.className = "tablewrap";
    tb.parentNode.insertBefore(w, tb); w.appendChild(tb);
  });

  document.getElementById("mark").addEventListener("click", function () {
    if (S.read[l.id]) { delete S.read[l.id]; save(); viewLesson(mid, idx); return; }
    S.read[l.id] = true; save(); addXp(5);
    toast("Lesson marked as read · +5 XP");
    viewLesson(mid, idx);
  });
}

/* ---------------------------------------------------------------- quiz path */
function viewQuizPath() {
  var missN = S.mistakes.length;
  var units = C.modules.map(function (m, mi) {
    var open = unitUnlocked(mi);
    var n = unitLessons(m.id);
    var doneN = 0;
    var nodes = "";
    for (var i = 0; i < n; i++) {
      var st = S.quiz[quizKey(m.id, i)] || {};
      if (st.done) doneN++;
      var lockedNode = !open || (i > 0 && !(S.quiz[quizKey(m.id, i - 1)] || {}).done);
      var cls = lockedNode ? "locked" : st.perfect ? "gold" : st.done ? "done" : "";
      var glyph = lockedNode ? "🔒" : st.perfect ? "★" : st.done ? "✓" : (i + 1);
      var span = (window.innerWidth || 1024) < 480 ? 44 : 70;
      var off = [0, 1, 0, -1, 0, 1][i % 6] * span;
      nodes += '<div class="node-row"><div class="node-wrap" style="transform:translateX(' + off + 'px)">' +
        '<button class="node ' + cls + '"' + (lockedNode ? " disabled" : ' data-go="#/quiz/' + m.id + "/" + i + '"') + '>' +
        '<span class="node-ring"></span>' + glyph + '</button>' +
        '<span class="node-label">' + (lockedNode ? "Locked" : "Set " + (i + 1)) + '</span></div></div>';
    }
    var pct = Math.round(doneN / n * 100);
    return '<section class="unit">' +
      '<div class="unit-head' + (open ? "" : " locked") + '">' +
        '<span class="mod-icon">' + m.icon + '</span>' +
        '<div><h3>Unit ' + m.number + " · " + esc(m.title) + '</h3><p>' + esc(m.tagline) + '</p></div>' +
        '<div class="unit-prog">' + doneN + "/" + n + '<div class="bar' + (pct === 100 ? " good" : "") + '"><i style="width:' + pct + '%"></i></div></div>' +
      '</div>' +
      (open ? '<div class="path">' + nodes + '</div>'
            : '<p class="muted" style="text-align:center;font-size:13.5px">Clear Unit ' + (m.number - 1) + ' — or finish reading Module ' + (m.number - 1) + ' — to unlock.</p>') +
    '</section>';
  }).join("");

  var hin = heartsIn();
  render('<div class="wrap-narrow">' +
    '<h1>Quiz</h1>' +
    '<p class="lede">Ten units following the syllabus. Clear a unit — or finish reading the matching module — to unlock the next one.</p>' +
    '<div class="card" style="margin-bottom:24px;display:flex;gap:16px;align-items:center;flex-wrap:wrap">' +
      '<div class="hearts">' + [0,1,2,3,4].map(function (i) { return '<span class="' + (i < S.hearts ? "on" : "") + '">♥</span>'; }).join("") + '</div>' +
      '<div style="font-size:14px;color:var(--ink2)">' +
        (S.hearts ? "<b>" + S.hearts + "</b> heart" + (S.hearts === 1 ? "" : "s") + " left"
                  : "<b>Out of hearts.</b> Practice mode still works and costs nothing.") +
        (hin ? ' · next in ' + hin + ' min' : "") + '</div>' +
      '<a class="btn btn-sm btn-ghost" style="margin-left:auto" href="#/quiz/practice">' +
        'Practice mistakes' + (missN ? " (" + missN + ")" : "") + '</a>' +
    '</div>' + units + '</div>');
}

/* ---------------------------------------------------------------- session */
var Q = null; // active session

function buildRuntime(q) {
  var r = { src: q, type: q.type, q: q.q, explain: q.explain };
  if (q.type === "mc") {
    var idx = shuffle(q.options.map(function (_, i) { return i; }));
    r.options = idx.map(function (i) { return q.options[i]; });
    r.answer = idx.indexOf(q.answer);
  } else if (q.type === "multi") {
    var ix = shuffle(q.options.map(function (_, i) { return i; }));
    r.options = ix.map(function (i) { return q.options[i]; });
    r.answers = q.answers.map(function (a) { return ix.indexOf(a); }).sort();
  } else if (q.type === "tf") {
    r.options = ["True", "False"];
    r.answer = q.answer ? 0 : 1;
  } else if (q.type === "type") {
    r.accept = q.accept; r.hint = q.hint;
  } else if (q.type === "match") {
    r.left = q.pairs.map(function (p) { return p[0]; });
    r.right = shuffle(q.pairs.map(function (p) { return p[1]; }));
    r.map = {}; q.pairs.forEach(function (p) { r.map[p[0]] = p[1]; });
  } else if (q.type === "order") {
    r.correct = q.items.slice();
    var s = shuffle(q.items);
    if (s.join("|") === r.correct.join("|") && s.length > 1) { var t = s[0]; s[0] = s[1]; s[1] = t; }
    r.items = s;
  }
  return r;
}

function startSession(mode, mid, idx) {
  syncHearts();
  var list, title;
  if (mode === "practice") {
    list = S.mistakes.map(function (id) { return QB.find(function (q) { return q.id === id; }); })
                     .filter(Boolean);
    if (!list.length) {
      render('<div class="wrap-narrow"><div class="empty-state"><div class="big">◎</div>' +
        '<h2>No mistakes saved yet</h2><p>Anything you get wrong lands here so you can drill it later.</p>' +
        '<p style="margin-top:18px"><a class="btn" href="#/quiz">Back to the path</a></p></div></div>');
      return;
    }
    list = shuffle(list).slice(0, 12);
    title = "Practice · your mistakes";
  } else {
    var m = moduleById(mid); if (!m) return (location.hash = "#/quiz");
    if (S.hearts <= 0) {
      var hin = heartsIn();
      render('<div class="wrap-narrow"><div class="empty-state"><div class="big">♥</div>' +
        '<h2>Out of hearts</h2><p>One comes back every ' + HEART_MINUTES + ' minutes' + (hin ? " — next in " + hin + " min" : "") + '.<br>Practice mode costs nothing and still counts for XP.</p>' +
        '<p style="margin-top:18px"><a class="btn" href="#/quiz/practice">Practice mistakes</a> ' +
        '<a class="btn btn-ghost" href="#/quiz">Back</a></p></div></div>');
      return;
    }
    var pool = poolFor(mid);
    list = pool.slice(idx * Q_PER_LESSON, idx * Q_PER_LESSON + Q_PER_LESSON);
    if (!list.length) return (location.hash = "#/quiz");
    list = shuffle(list);
    title = "Unit " + m.number + " · Set " + (idx + 1);
  }
  Q = {
    mode: mode, mid: mid, idx: idx, title: title,
    queue: list.map(buildRuntime), requeue: [], total: list.length,
    pos: 0, firstTry: 0, answered: 0, xp: 0, wrongIds: [], t0: Date.now(), locked: false
  };
  paintQuestion();
}

function paintQuestion() {
  if (!Q.queue.length) {
    if (Q.requeue.length) { Q.queue = shuffle(Q.requeue); Q.requeue = []; }
    else return finishSession();
  }
  var r = Q.queue[0];
  var pct = Math.round(Q.answered / (Q.total + Q.wrongIds.length || Q.total) * 100);
  var body = "";
  var kind = { mc: "Choose one", multi: "Select all that apply", tf: "True or false",
               type: "Type the answer", match: "Match the pairs", order: "Put in order" }[r.type];

  if (r.type === "mc" || r.type === "tf") {
    body = '<div class="opts' + (r.type === "tf" ? " grid2" : "") + '" id="opts">' +
      r.options.map(function (o, i) {
        return '<button class="opt" data-i="' + i + '"><span class="kbd">' + (i + 1) + '</span><span>' + esc(o) + '</span></button>';
      }).join("") + '</div>';
  } else if (r.type === "multi") {
    body = '<div class="opts" id="opts">' + r.options.map(function (o, i) {
        return '<button class="opt" data-i="' + i + '"><span class="kbd">' + (i + 1) + '</span><span>' + esc(o) + '</span></button>';
      }).join("") + '</div>';
  } else if (r.type === "type") {
    body = '<input class="typebox" id="typein" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type your answer">' +
           (r.hint ? '<p class="hintline">Hint: ' + esc(r.hint) + '</p>' : "");
  } else if (r.type === "match") {
    body = '<div class="matchgrid" id="matchgrid"><div class="mcol">' +
      r.left.map(function (t, i) { return '<button class="mitem" data-side="L" data-i="' + i + '">' + esc(t) + '</button>'; }).join("") +
      '</div><div class="mcol">' +
      r.right.map(function (t, i) { return '<button class="mitem" data-side="R" data-i="' + i + '">' + esc(t) + '</button>'; }).join("") +
      '</div></div>';
  } else if (r.type === "order") {
    body = '<div class="orderlist" id="orderlist">' + r.items.map(function (t, i) {
      return '<div class="oitem" data-i="' + i + '"><span class="onum">' + (i + 1) + '</span>' +
        '<span class="otxt">' + esc(t) + '</span><span class="obtns">' +
        '<button data-dir="-1" aria-label="Move up">▲</button><button data-dir="1" aria-label="Move down">▼</button></span></div>';
    }).join("") + '</div>';
  }

  render('<div class="session">' +
    '<div class="sess-top">' +
      '<button class="quit" id="quit" title="Leave">×</button>' +
      '<div class="bar"><i style="width:' + pct + '%"></i></div>' +
      (Q.mode === "practice" ? '<span class="pill">Practice</span>' :
        '<div class="hearts">' + [0,1,2,3,4].map(function (i) { return '<span class="' + (i < S.hearts ? "on" : "") + '">♥</span>'; }).join("") + '</div>') +
    '</div>' +
    '<div class="q-kind">' + kind + '</div>' +
    '<h2 class="q-text">' + esc(r.q) + '</h2>' +
    body +
    '<div class="row" style="justify-content:flex-end"><button class="btn" id="check" disabled>Check</button></div>' +
  '</div>');

  bindQuestion(r);
}

function bindQuestion(r) {
  var checkBtn = document.getElementById("check");
  document.getElementById("quit").onclick = function () { Q = null; location.hash = "#/quiz"; };
  var sel = { one: null, many: [], pairs: {}, pending: null, order: r.items ? r.items.slice() : null };
  Q.sel = sel;

  function enable(on) { checkBtn.disabled = !on; }

  if (r.type === "mc" || r.type === "tf") {
    view.querySelectorAll(".opt").forEach(function (b) {
      b.onclick = function () {
        if (Q.locked) return;
        view.querySelectorAll(".opt").forEach(function (x) { x.classList.remove("sel"); });
        b.classList.add("sel"); sel.one = +b.dataset.i; enable(true);
      };
    });
  } else if (r.type === "multi") {
    view.querySelectorAll(".opt").forEach(function (b) {
      b.onclick = function () {
        if (Q.locked) return;
        var i = +b.dataset.i, at = sel.many.indexOf(i);
        if (at >= 0) sel.many.splice(at, 1); else sel.many.push(i);
        b.classList.toggle("sel", at < 0);
        enable(sel.many.length > 0);
      };
    });
  } else if (r.type === "type") {
    var inp = document.getElementById("typein");
    inp.focus();
    inp.oninput = function () { enable(inp.value.trim().length > 0); };
    inp.onkeydown = function (e) { if (e.key === "Enter" && !checkBtn.disabled) { e.preventDefault(); checkBtn.click(); } };
  } else if (r.type === "match") {
    var pairCount = 0;
    view.querySelectorAll(".mitem").forEach(function (b) {
      b.onclick = function () {
        if (Q.locked || b.classList.contains("paired")) return;
        var side = b.dataset.side;
        if (!sel.pending) {
          view.querySelectorAll(".mitem").forEach(function (x) { x.classList.remove("sel"); });
          b.classList.add("sel"); sel.pending = b; return;
        }
        if (sel.pending === b) { b.classList.remove("sel"); sel.pending = null; return; }
        if (sel.pending.dataset.side === side) {
          sel.pending.classList.remove("sel"); b.classList.add("sel"); sel.pending = b; return;
        }
        var L = side === "L" ? b : sel.pending;
        var R = side === "R" ? b : sel.pending;
        pairCount++;
        sel.pairs[r.left[+L.dataset.i]] = r.right[+R.dataset.i];
        [L, R].forEach(function (x) {
          x.classList.remove("sel"); x.classList.add("paired");
          x.insertAdjacentHTML("afterbegin", '<span class="pnum">' + pairCount + "</span>");
        });
        sel.pending = null;
        enable(pairCount === r.left.length);
      };
    });
  } else if (r.type === "order") {
    var listEl = document.getElementById("orderlist");
    function repaint() {
      listEl.innerHTML = sel.order.map(function (t, i) {
        return '<div class="oitem" data-i="' + i + '"><span class="onum">' + (i + 1) + '</span>' +
          '<span class="otxt">' + esc(t) + '</span><span class="obtns">' +
          '<button data-dir="-1"' + (i === 0 ? " disabled" : "") + ' aria-label="Move up">▲</button>' +
          '<button data-dir="1"' + (i === sel.order.length - 1 ? " disabled" : "") + ' aria-label="Move down">▼</button></span></div>';
      }).join("");
      listEl.querySelectorAll("button").forEach(function (b) {
        b.onclick = function () {
          if (Q.locked) return;
          var row = b.closest(".oitem"), i = +row.dataset.i, d = +b.dataset.dir, j = i + d;
          if (j < 0 || j >= sel.order.length) return;
          var t = sel.order[i]; sel.order[i] = sel.order[j]; sel.order[j] = t;
          repaint();
        };
      });
    }
    repaint();
    enable(true);
  }

  checkBtn.onclick = function () { grade(r, sel); };

  document.onkeydown = function (e) {
    if (!Q) return;
    if (e.key === "Enter") {
      var cont = document.getElementById("cont");
      if (cont) { e.preventDefault(); cont.click(); return; }
      if (!checkBtn.disabled) { e.preventDefault(); checkBtn.click(); }
      return;
    }
    if (Q.locked) return;
    if ((r.type === "mc" || r.type === "tf" || r.type === "multi") && /^[1-9]$/.test(e.key)) {
      var b = view.querySelector('.opt[data-i="' + (+e.key - 1) + '"]');
      if (b) { e.preventDefault(); b.click(); }
    }
  };
}

function grade(r, sel) {
  if (Q.locked) return;
  Q.locked = true;
  var ok = false, marks = null;

  if (r.type === "mc" || r.type === "tf") {
    ok = sel.one === r.answer;
    view.querySelectorAll(".opt").forEach(function (b) {
      var i = +b.dataset.i; b.disabled = true; b.classList.remove("sel");
      if (i === r.answer) b.classList.add("right");
      else if (i === sel.one) b.classList.add("wrong");
    });
  } else if (r.type === "multi") {
    var got = sel.many.slice().sort();
    ok = got.length === r.answers.length && got.every(function (v, i) { return v === r.answers[i]; });
    view.querySelectorAll(".opt").forEach(function (b) {
      var i = +b.dataset.i; b.disabled = true; b.classList.remove("sel");
      var should = r.answers.indexOf(i) >= 0, picked = sel.many.indexOf(i) >= 0;
      if (should) b.classList.add("right");
      else if (picked) b.classList.add("wrong");
    });
  } else if (r.type === "type") {
    var v = norm(document.getElementById("typein").value);
    ok = r.accept.some(function (a) { return norm(a) === v; });
    document.getElementById("typein").disabled = true;
    document.getElementById("typein").style.borderColor = ok ? "var(--good)" : "var(--bad)";
    if (!ok) marks = "Accepted answer: " + r.accept[0];
  } else if (r.type === "match") {
    ok = r.left.every(function (L) { return sel.pairs[L] === r.map[L]; });
    view.querySelectorAll('.mitem[data-side="L"]').forEach(function (b) {
      var L = r.left[+b.dataset.i];
      b.classList.remove("paired");
      b.classList.add(sel.pairs[L] === r.map[L] ? "paired" : "miss");
    });
    if (!ok) marks = r.left.map(function (L) { return L + " → " + r.map[L]; }).join(" · ");
  } else if (r.type === "order") {
    ok = sel.order.join("|") === r.correct.join("|");
    view.querySelectorAll(".oitem").forEach(function (row, i) {
      row.classList.add(sel.order[i] === r.correct[i] ? "right" : "wrong");
      row.querySelectorAll("button").forEach(function (b) { b.disabled = true; });
    });
    if (!ok) marks = "Correct order: " + r.correct.join(" → ");
  }

  // bookkeeping
  var id = r.src.id;
  S.seen[id] = S.seen[id] || { right: 0, wrong: 0 };
  var isRetry = Q.wrongIds.indexOf(id) >= 0;
  Q.answered++;

  if (ok) {
    S.seen[id].right++;
    if (!isRetry) { Q.firstTry++; Q.xp += XP_CORRECT; }
    var mi = S.mistakes.indexOf(id);
    if (mi >= 0 && S.seen[id].right >= 2) S.mistakes.splice(mi, 1);
  } else {
    S.seen[id].wrong++;
    if (!isRetry) Q.wrongIds.push(id);
    if (S.mistakes.indexOf(id) < 0) S.mistakes.unshift(id);
    if (S.mistakes.length > 60) S.mistakes.pop();
    if (Q.mode !== "practice") loseHeart();
    Q.requeue.push(r);
  }
  save();

  var fb = el('<div class="feedback ' + (ok ? "ok" : "no") + ' pop"><div class="fb-inner">' +
    '<span class="fb-icon">' + (ok ? "✓" : "✕") + '</span>' +
    '<div class="fb-txt"><div class="fb-title">' + (ok ? pick(["Correct", "Exactly", "That's it", "Right"]) : "Not quite") + '</div>' +
    '<div class="fb-exp">' + esc(r.explain) + (marks ? '<br><b>' + esc(marks) + "</b>" : "") + '</div></div>' +
    '<button class="btn fb-btn ' + (ok ? "btn-good" : "btn-bad") + '" id="cont">Continue</button>' +
    '</div></div>');
  document.querySelector(".session").appendChild(fb);
  document.getElementById("check").style.display = "none";
  if (!ok) document.querySelector(".q-text").classList.add("shake");
  fb.scrollIntoView({ behavior: "smooth", block: "end" });

  document.getElementById("cont").onclick = function () {
    Q.locked = false;
    Q.queue.shift();
    if (S.hearts <= 0 && Q.mode !== "practice") return failSession();
    paintQuestion();
  };
  document.getElementById("cont").focus();
}
function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

function failSession() {
  var hin = heartsIn();
  render('<div class="wrap-narrow"><div class="result">' +
    '<div class="big">♥</div><h2>Out of hearts</h2>' +
    '<p class="muted">You got ' + Q.firstTry + ' of ' + Q.total + ' right first time. The set was not saved.</p>' +
    '<p class="muted" style="font-size:14px">A heart returns every ' + HEART_MINUTES + ' minutes' + (hin ? " — next in " + hin + " min" : "") + '. Practice mode never costs hearts.</p>' +
    '<div class="row" style="justify-content:center;margin-top:22px">' +
      '<a class="btn" href="#/quiz/practice">Practice mistakes</a>' +
      '<a class="btn btn-ghost" href="#/quiz">Back to the path</a></div></div></div>');
  Q = null;
}

function finishSession() {
  var perfect = Q.wrongIds.length === 0;
  var xp = Q.xp + XP_COMPLETE + (perfect ? XP_PERFECT : 0);
  var acc = Math.round(Q.firstTry / Q.total * 100);
  var secs = Math.round((Date.now() - Q.t0) / 1000);

  if (Q.mode === "unit") {
    var k = quizKey(Q.mid, Q.idx);
    var prev = S.quiz[k] || {};
    S.quiz[k] = { done: true, best: Math.max(prev.best || 0, acc), perfect: prev.perfect || perfect };
  }
  addXp(xp);
  save();

  var m = Q.mode === "unit" ? moduleById(Q.mid) : null;
  var nextIdx = m ? Q.idx + 1 : -1;
  var hasNext = m && nextIdx < unitLessons(m.id);
  var nextHref = hasNext ? "#/quiz/" + m.id + "/" + nextIdx : "#/quiz";
  var goalPct = Math.min(100, Math.round((S.days[todayKey()] || 0) / DAILY_GOAL * 100));

  render('<div class="wrap-narrow"><div class="result pop">' +
    '<div class="big">' + (perfect ? "★" : acc >= 80 ? "✓" : "◆") + '</div>' +
    '<h2>' + (perfect ? "Flawless set" : acc >= 80 ? "Set cleared" : "Set complete") + '</h2>' +
    '<p class="muted">' + esc(Q.title) + '</p>' +
    '<div class="rstats">' +
      '<div class="rstat xp"><b>+' + xp + '</b><span>XP</span></div>' +
      '<div class="rstat acc"><b>' + acc + '%</b><span>First try</span></div>' +
      '<div class="rstat"><b>' + (secs < 60 ? secs + "s" : Math.round(secs / 60) + "m") + '</b><span>Time</span></div>' +
    '</div>' +
    '<div style="text-align:left;margin-bottom:20px">' +
      '<div class="muted" style="font-size:12.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Today &middot; ' + (S.days[todayKey()] || 0) + '/' + DAILY_GOAL + ' XP</div>' +
      '<div class="bar good"><i style="width:' + goalPct + '%"></i></div></div>' +
    (Q.wrongIds.length ? '<p class="muted" style="font-size:14px">' + Q.wrongIds.length + ' question' + (Q.wrongIds.length === 1 ? "" : "s") + ' saved to your mistakes for later practice.</p>' : "") +
    '<div class="row" style="justify-content:center;margin-top:18px">' +
      '<a class="btn" href="' + nextHref + '">' + (hasNext ? "Next set" : "Back to the path") + '</a>' +
      '<a class="btn btn-ghost" href="#/progress">See progress</a>' +
    '</div></div></div>');
  Q = null;
}

/* ---------------------------------------------------------------- progress */
function viewProgress() {
  var t = totals();
  var rows = C.modules.map(function (m) {
    var read = Math.round(moduleReadPct(m) * 100);
    var qz = Math.round(moduleQuizPct(m) * 100);
    var score = Math.round((read + qz) / 2);
    return '<div class="mrow"><span class="mnum">' + m.number + '</span>' +
      '<span>' + esc(m.title) + '<br><span class="muted" style="font-size:12px">read ' + read + '% · quiz ' + qz + '%</span></span>' +
      '<span class="mbar"><span class="bar' + (score === 100 ? " good" : "") + '"><i style="width:' + score + '%"></i></span></span>' +
      '<span class="mval">' + score + '%</span></div>';
  }).join("");

  var days = [];
  for (var i = 13; i >= 0; i--) {
    var d = new Date(); d.setDate(d.getDate() - i);
    var k = todayKey(d), got = S.days[k] || 0;
    days.push('<div title="' + k + ": " + got + ' XP" style="flex:1;text-align:center">' +
      '<div style="height:' + Math.max(4, Math.min(46, got / 2)) + 'px;background:' + (got >= DAILY_GOAL ? "var(--good)" : got ? "var(--brand)" : "var(--line2)") +
      ';border-radius:4px;margin-bottom:4px"></div>' +
      '<span style="font-size:10px;color:var(--ink3)">' + "SMTWTFS"[d.getDay()] + '</span></div>');
  }

  var miss = S.mistakes.slice(0, 12).map(function (id) {
    var q = QB.find(function (x) { return x.id === id; }); if (!q) return "";
    var m = moduleById(q.m);
    return '<div class="miss"><div class="mq">' + esc(q.q) + '</div>' +
      '<div class="ma"><span class="pill">Module ' + (m ? m.number : "?") + '</span> ' + esc(q.explain) + '</div></div>';
  }).join("");

  render('<div class="wrap"><h1>Progress</h1>' +
    '<p class="lede">Everything here lives in this browser only.</p>' +
    '<div class="statgrid">' +
      '<div class="stat"><b>' + S.xp + '</b><span>Total XP</span></div>' +
      '<div class="stat"><b>' + S.streak + '</b><span>Day streak</span></div>' +
      '<div class="stat"><b>' + t.readN + "/" + t.lessons + '</b><span>Lessons read</span></div>' +
      '<div class="stat"><b>' + t.qzDone + "/" + t.qz + '</b><span>Quiz sets cleared</span></div>' +
      '<div class="stat"><b>' + t.acc + '%</b><span>Answer accuracy</span></div>' +
      '<div class="stat"><b>' + (t.right + t.wrong) + '</b><span>Questions answered</span></div>' +
    '</div>' +
    '<div class="pair">' +
      '<div class="card"><h3 style="margin-top:0">Last 14 days</h3>' +
        '<div style="display:flex;gap:4px;align-items:flex-end;height:64px;margin-top:14px">' + days.join("") + '</div>' +
        '<p class="muted" style="font-size:12.5px;margin:12px 0 0">Green bars hit the ' + DAILY_GOAL + ' XP daily goal.</p></div>' +
      '<div class="card"><h3 style="margin-top:0">Module mastery</h3>' +
        '<div class="mastery" style="margin-top:14px">' + rows + '</div></div>' +
    '</div>' +
    '<h2>Your mistakes' + (S.mistakes.length ? " (" + S.mistakes.length + ")" : "") + '</h2>' +
    (miss ? '<p><a class="btn btn-sm" href="#/quiz/practice">Drill these now</a></p><div class="misslist">' + miss + '</div>'
          : '<p class="muted">Nothing yet. Questions you get wrong collect here and clear once you answer them right twice.</p>') +
    '<h2>Reset</h2>' +
    '<p class="muted" style="font-size:14.5px">Clears XP, streak, reading progress, quiz results and saved mistakes.</p>' +
    '<button class="btn btn-sm btn-ghost" id="reset">Reset all progress</button>' +
  '</div>');

  document.getElementById("reset").onclick = function () {
    if (!confirm("Reset all progress? This cannot be undone.")) return;
    S = blank(); save(); toast("Progress reset"); viewProgress(); paintHud();
  };
}

/* ---------------------------------------------------------------- boot */
document.addEventListener("click", function (e) {
  var go = e.target.closest("[data-go]");
  if (go) { e.preventDefault(); location.hash = go.dataset.go; return; }
  var nav = e.target.closest("[data-nav]");
  if (nav) {
    e.preventDefault();
    var n = nav.dataset.nav;
    location.hash = n === "home" ? "#/" : "#/" + n;
  }
});
window.addEventListener("hashchange", function () { document.onkeydown = null; route(); });
setInterval(paintHud, 60000);
route();

})();
