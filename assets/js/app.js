/* Digital Assets Academy — application
 * Router, syllabus reader, quiz engine, glossary, notes drawer, profiles.
 */
(function () {
"use strict";

var C = window.DA_CURRICULUM;
var QB = window.DA_QUESTIONS;
var GL = window.DA_GLOSSARY || [];

var Q_PER_LESSON = 6, XP_CORRECT = 10, XP_COMPLETE = 5, XP_PERFECT = 20, XP_READ = 5;
var MAX_HEARTS = DA.MAX_HEARTS, HEART_MINUTES = DA.HEART_MINUTES, DAILY_GOAL = DA.DAILY_GOAL;

function S() { return DA.state; }

/* ---------------------------------------------------------------- utils */
function el(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }
function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function norm(s) { return String(s).toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim(); }
function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
function toast(msg, ms) {
  var t = document.getElementById("toast");
  t.innerHTML = msg; t.classList.add("on");
  clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("on"); }, ms || 2400);
}
function moduleById(id) { for (var i = 0; i < C.modules.length; i++) if (C.modules[i].id === id) return C.modules[i]; return null; }
function lessonRef(lessonId) {
  for (var i = 0; i < C.modules.length; i++)
    for (var j = 0; j < C.modules[i].lessons.length; j++)
      if (C.modules[i].lessons[j].id === lessonId) return { m: C.modules[i], l: C.modules[i].lessons[j], i: j };
  return null;
}
function poolFor(mid) { return QB.filter(function (q) { return q.m === mid; }); }
function unitLessons(mid) { return Math.max(1, Math.ceil(poolFor(mid).length / Q_PER_LESSON)); }
function quizKey(mid, idx) { return mid + ":" + idx; }
function moduleReadPct(m) { var n = 0; m.lessons.forEach(function (l) { if (S().read[l.id]) n++; }); return n / m.lessons.length; }
function moduleQuizPct(m) {
  var n = unitLessons(m.id), done = 0;
  for (var i = 0; i < n; i++) if ((S().quiz[quizKey(m.id, i)] || {}).done) done++;
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
    m.lessons.forEach(function (l) { if (S().read[l.id]) readN++; });
    var n = unitLessons(m.id); qz += n;
    for (var i = 0; i < n; i++) if ((S().quiz[quizKey(m.id, i)] || {}).done) qzDone++;
  });
  var right = 0, wrong = 0;
  for (var k in S().seen) { right += S().seen[k].right || 0; wrong += S().seen[k].wrong || 0; }
  return { lessons: lessons, readN: readN, qz: qz, qzDone: qzDone, right: right, wrong: wrong,
           acc: right + wrong ? Math.round(right / (right + wrong) * 100) : 0 };
}

/* ---------------------------------------------------------------- chrome */
var view = document.getElementById("view");
function render(html) { view.innerHTML = html; window.scrollTo(0, 0); wrapTables(); }
function wrapTables() {
  view.querySelectorAll("table.data").forEach(function (tb) {
    if (tb.parentNode.classList && tb.parentNode.classList.contains("tablewrap")) return;
    var w = document.createElement("div"); w.className = "tablewrap";
    tb.parentNode.insertBefore(w, tb); w.appendChild(tb);
  });
}
function paintHud() {
  DA.syncHearts();
  document.getElementById("hud-xp").textContent = S().xp;
  document.getElementById("hud-streak").textContent = S().streak;
  document.getElementById("hud-hearts").textContent = S().hearts;
  document.querySelector(".hud-hearts").classList.toggle("empty", S().hearts === 0);
  var u = DA.activeUser();
  document.getElementById("who-av").textContent = u.avatar;
  document.getElementById("who-av").style.background = u.color;
  document.getElementById("who-name").textContent = u.name;
}
function setTab(name) {
  document.querySelectorAll(".tab").forEach(function (b) { b.classList.toggle("on", b.dataset.nav === name); });
}

/* ---------------------------------------------------------------- modal */
function modal(html, onMount) {
  var m = document.getElementById("modal");
  m.innerHTML = '<div class="modal-scrim" data-close></div><div class="modal-card">' + html + "</div>";
  m.hidden = false;
  m.querySelectorAll("[data-close]").forEach(function (b) { b.onclick = closeModal; });
  document.addEventListener("keydown", escClose);
  if (onMount) onMount(m.querySelector(".modal-card"));
}
function closeModal() {
  var m = document.getElementById("modal");
  m.hidden = true; m.innerHTML = "";
  document.removeEventListener("keydown", escClose);
}
function escClose(e) { if (e.key === "Escape") closeModal(); }

/* ---------------------------------------------------------------- profiles */
function profileMenu() {
  var users = DA.listUsers(), active = DA.activeUser();
  modal(
    '<h3 style="margin-top:0">Profiles</h3>' +
    '<p class="muted" style="font-size:13.5px;margin-bottom:16px">Each profile keeps its own XP, streak, reading progress, quiz results, glossary and notes. These are local to this browser — there is no server and no login. Use export to move a profile to another device.</p>' +
    '<div class="plist">' + users.map(function (u) {
      return '<div class="prow' + (u.id === active.id ? " on" : "") + '">' +
        '<span class="who-av" style="background:' + u.color + '">' + esc(u.avatar) + '</span>' +
        '<span class="pname">' + esc(u.name) + (u.id === active.id ? ' <i class="pill">active</i>' : "") + '</span>' +
        (u.id === active.id ? "" : '<button class="btn btn-sm btn-ghost" data-use="' + u.id + '">Switch</button>') +
        '<button class="btn btn-sm btn-ghost" data-ren="' + u.id + '">Rename</button>' +
        '<button class="btn btn-sm btn-ghost" data-exp="' + u.id + '">Export</button>' +
        (users.length > 1 ? '<button class="btn btn-sm btn-ghost danger" data-del="' + u.id + '">Delete</button>' : "") +
      '</div>';
    }).join("") + '</div>' +
    '<h4 style="margin:22px 0 6px">Backups</h4>' +
    '<p class="muted" style="font-size:13px;margin-bottom:10px">Nothing here is on a server, so the app backs itself up when you open it and the last copy is more than a day old. Pick a folder and it writes there by itself; otherwise it hands you a download.</p>' +
    '<div class="row" style="margin-bottom:6px">' +
      '<label class="chk"><input type="checkbox" id="autobk"' + (DA.autoBackupOn() ? " checked" : "") + '> Daily backup</label>' +
      '<button class="btn btn-sm btn-ghost" id="bkfolder">' + (DA.backupSupported() ? "Choose folder…" : "Folder unsupported here") + '</button>' +
      '<button class="btn btn-sm btn-ghost" id="bknow">Back up now</button>' +
      '<span class="muted" id="bkstate" style="font-size:12.5px"></span>' +
    '</div>' +
    '<div class="row" style="margin-top:18px">' +
      '<input class="tin" id="newname" placeholder="New profile name" maxlength="24">' +
      '<button class="btn btn-sm" id="addp">Add profile</button>' +
      '<button class="btn btn-sm btn-ghost" id="impp">Import file…</button>' +
      '<button class="btn btn-sm btn-ghost" data-close style="margin-left:auto">Done</button>' +
    '</div>' +
    '<input type="file" id="impf" accept="application/json,.json" hidden>',
  function (card) {
    card.querySelectorAll("[data-use]").forEach(function (b) {
      b.onclick = function () { DA.switchUser(b.dataset.use); closeModal(); toast("Switched to " + esc(DA.activeUser().name)); route(); };
    });
    card.querySelectorAll("[data-ren]").forEach(function (b) {
      b.onclick = function () {
        var cur = DA.listUsers().filter(function (u) { return u.id === b.dataset.ren; })[0];
        var n = prompt("Profile name", cur ? cur.name : "");
        if (n !== null) { DA.renameUser(b.dataset.ren, n); closeModal(); paintHud(); profileMenu(); }
      };
    });
    card.querySelectorAll("[data-exp]").forEach(function (b) {
      b.onclick = function () { downloadJSON(DA.exportProfile(b.dataset.exp)); };
    });
    card.querySelectorAll("[data-del]").forEach(function (b) {
      b.onclick = function () {
        if (!confirm("Delete this profile and everything in it? This cannot be undone.")) return;
        DA.deleteUser(b.dataset.del); closeModal(); paintHud(); route(); profileMenu();
      };
    });
    var bkstate = card.querySelector("#bkstate");
    function paintBk() {
      var h = DA.hoursSinceBackup();
      DA.getBackupDir().then(function (dir) {
        bkstate.textContent = (h === Infinity ? "Never backed up" :
          h < 24 ? "Backed up today" :
          Math.floor(h / 24) === 1 ? "1 day since last backup" :
          Math.floor(h / 24) + " days since last backup") +
          (dir ? " · folder: " + dir.name : "");
      });
    }
    paintBk();
    card.querySelector("#autobk").onchange = function (e) {
      DA.setAutoBackup(e.target.checked);
      toast(e.target.checked ? "Daily backup on" : "Daily backup off");
    };
    card.querySelector("#bknow").onclick = function () { runBackupNow(true).then(paintBk); };
    var bf = card.querySelector("#bkfolder");
    if (DA.backupSupported()) bf.onclick = function () {
      DA.chooseBackupDir()
        .then(function () { return runBackupNow(true); })
        .then(paintBk)
        .catch(function (e) { if (e && e.name !== "AbortError") toast(esc(e.message || "Could not use that folder")); });
    }; else bf.disabled = true;

    card.querySelector("#addp").onclick = function () {
      var v = card.querySelector("#newname").value.trim();
      if (!v) { card.querySelector("#newname").focus(); return; }
      var u = DA.createUser(v); DA.switchUser(u.id);
      closeModal(); paintHud(); toast("Profile created — you are now " + esc(u.name)); route();
    };
    card.querySelector("#newname").onkeydown = function (e) { if (e.key === "Enter") card.querySelector("#addp").click(); };
    card.querySelector("#impp").onclick = function () { card.querySelector("#impf").click(); };
    card.querySelector("#impf").onchange = function (e) {
      var f = e.target.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        try {
          var u = DA.importProfile(JSON.parse(r.result));
          DA.switchUser(u.id); closeModal(); paintHud();
          toast("Imported profile " + esc(u.name)); route();
        } catch (err) { alert("Could not import that file. " + err.message); }
      };
      r.readAsText(f);
    };
  });
}
function downloadJSON(obj) {
  var name = "digital-assets-academy-" + (obj.profile.name || "profile").toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".json";
  var blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click();
  setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}

/* ---------------------------------------------------------------- notes drawer */
var drawer = document.getElementById("drawer");
var scrim = document.getElementById("drawer-scrim");
var dwEditor = null, dwPageId = null;

function currentContext() {
  var p = (location.hash || "").replace(/^#\//, "").split("/").filter(Boolean);
  if (p[0] === "syllabus" && p[1]) {
    var m = moduleById(p[1]); if (!m) return null;
    if (p[2] !== undefined) {
      var l = m.lessons[parseInt(p[2], 10)];
      if (l) return { kind: "lesson", id: l.id, label: "Module " + m.number + " · " + l.title, href: "#/syllabus/" + m.id + "/" + p[2] };
    }
    return { kind: "module", id: m.id, label: "Module " + m.number + " · " + m.title, href: "#/syllabus/" + m.id };
  }
  if (p[0] === "quiz" && p[1] && p[1] !== "practice") {
    var mm = moduleById(p[1]);
    if (mm) return { kind: "module", id: mm.id, label: "Module " + mm.number + " · " + mm.title, href: "#/syllabus/" + mm.id };
  }
  return null;
}
function openDrawer(pageId) {
  var ctx = currentContext();
  var page = null;
  if (pageId) page = DA.pageById(pageId);
  if (!page && dwPageId) page = DA.pageById(dwPageId);
  if (!page && ctx) page = DA.pageForRef(ctx.kind, ctx.id);
  if (!page) page = DA.notes.pages[0] || null;
  if (!page) page = DA.newPage(ctx, ctx ? ctx.label : "Untitled");
  dwPageId = page.id;

  drawer.hidden = false; scrim.hidden = false;
  requestAnimationFrame(function () { drawer.classList.add("on"); scrim.classList.add("on"); });
  document.getElementById("notefab").classList.add("hidden");
  paintDrawer();
}
function closeDrawer() {
  drawer.classList.remove("on"); scrim.classList.remove("on");
  document.getElementById("notefab").classList.remove("hidden");
  setTimeout(function () { drawer.hidden = true; scrim.hidden = true; }, 200);
  if (dwEditor) { dwEditor.destroy(); dwEditor = null; }
}
function toggleDrawer() { if (drawer.hidden || !drawer.classList.contains("on")) openDrawer(); else closeDrawer(); }

function paintDrawer() {
  var page = DA.pageById(dwPageId);
  var ctx = currentContext();
  var sel = document.getElementById("dw-page");
  sel.innerHTML = DA.notes.pages.map(function (p) {
    return '<option value="' + p.id + '"' + (p.id === dwPageId ? " selected" : "") + '>' +
           esc((p.icon || "📝") + " " + (p.title || "Untitled")) + "</option>";
  }).join("");
  document.getElementById("dw-open").href = "#/notes/" + dwPageId;

  var body = document.getElementById("dw-body");
  body.innerHTML = "";
  var linked = ctx ? DA.pageForRef(ctx.kind, ctx.id) : null;
  if (ctx && (!linked || linked.id !== dwPageId)) {
    var bar = el('<div class="dw-ctx">' +
      (linked ? 'This page has a note: <button class="linkish" data-goto="' + linked.id + '">' + esc(linked.title) + '</button>'
              : 'No note yet for <b>' + esc(ctx.label) + '</b> · <button class="linkish" id="dw-make">create one</button>') +
      '</div>');
    body.appendChild(bar);
    if (linked) bar.querySelector("[data-goto]").onclick = function () { dwPageId = linked.id; paintDrawer(); };
    else bar.querySelector("#dw-make").onclick = function () {
      var p = DA.newPage(ctx, ctx.label); dwPageId = p.id; paintDrawer();
    };
  }
  var host = document.createElement("div");
  body.appendChild(host);
  if (dwEditor) dwEditor.destroy();
  dwEditor = DA_NOTES.mount(host, page, { onChange: function (p) {
    DA.touchPage(p);
    var st = host.querySelector(".ne-status"); if (st) st.textContent = "Saved";
    var s2 = document.getElementById("dw-page");
    var opt = s2.querySelector('option[value="' + p.id + '"]');
    if (opt) opt.textContent = (p.icon || "📝") + " " + (p.title || "Untitled");
  }});
}
document.getElementById("notefab").onclick = function () { openDrawer(); };
document.getElementById("dw-close").onclick = closeDrawer;
scrim.onclick = closeDrawer;
document.getElementById("dw-new").onclick = function () {
  var ctx = currentContext();
  var p = DA.newPage(ctx, ctx ? ctx.label : "Untitled");
  dwPageId = p.id; paintDrawer();
};
document.getElementById("dw-page").onchange = function (e) { dwPageId = e.target.value; paintDrawer(); };

/* ---------------------------------------------------------------- router */
function route() {
  paintHud();
  var h = (location.hash || "#/").replace(/^#/, "");
  var p = h.split("/").filter(Boolean);
  if (!drawer.hidden) paintDrawer();
  if (!p.length) { setTab("home"); return viewHome(); }
  if (p[0] === "syllabus") {
    setTab("syllabus");
    if (p[1] && p[2] !== undefined) return viewLesson(p[1], parseInt(p[2], 10));
    if (p[1]) return viewModule(p[1]);
    return viewSyllabus();
  }
  if (p[0] === "quiz") {
    setTab("quiz");
    if (p[1] === "practice") return startSession("practice", null, null);
    if (p[1] && p[2] !== undefined) return startSession("unit", p[1], parseInt(p[2], 10));
    return viewQuizPath();
  }
  if (p[0] === "glossary") { setTab("glossary"); return viewGlossary(p[1] ? decodeURIComponent(p[1]) : null); }
  if (p[0] === "notes")    { setTab("notes");    return viewNotes(p[1] || null); }
  if (p[0] === "progress") { setTab("progress"); return viewProgress(); }
  location.hash = "#/";
}

/* ---------------------------------------------------------------- home */
function viewHome() {
  var t = totals(), g = DA.glossaryCounts();
  var nextMod = C.modules.filter(function (m) { return moduleReadPct(m) < 1; })[0] || C.modules[0];
  var goalPct = Math.min(100, Math.round((S().days[DA.todayKey()] || 0) / DAILY_GOAL * 100));
  render(
  '<div class="wrap">' +
    '<section class="hero">' +
      '<h1>How digital assets actually work</h1>' +
      '<p class="lede">A ' + C.modules.length + '-module syllabus, a ' + QB.length + '-question drill and a ' + GL.length + '-term glossary you unlock as you read. Written for someone who has to make decisions about this. Current to ' + C.updated + '.</p>' +
      '<div class="row">' +
        '<a class="btn" href="#/syllabus">' + (t.readN ? "Continue reading" : "Start the syllabus") + '</a>' +
        '<a class="btn btn-ghost" href="#/quiz">Go to the quiz</a>' +
      '</div>' +
      '<div class="hero-stats">' +
        '<div class="hero-stat"><b>' + t.readN + "/" + t.lessons + '</b><span>Lessons read</span></div>' +
        '<div class="hero-stat"><b>' + t.qzDone + "/" + t.qz + '</b><span>Quiz sets</span></div>' +
        '<div class="hero-stat"><b>' + g.unlocked + "/" + g.total + '</b><span>Glossary</span></div>' +
        '<div class="hero-stat"><b>' + DA.notes.pages.length + '</b><span>Notes</span></div>' +
        '<div class="hero-stat"><b>' + S().streak + '</b><span>Day streak</span></div>' +
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
        '<p class="muted" style="font-size:14.5px">' + (S().days[DA.todayKey()] || 0) + " / " + DAILY_GOAL + ' XP toward today&rsquo;s goal</p>' +
        '<div class="bar good" style="margin:12px 0 16px"><i style="width:' + goalPct + '%"></i></div>' +
        '<a class="btn btn-sm btn-ghost" href="#/quiz">Drill now</a>' +
      '</div>' +
    '</div>' +
    '<div class="card" style="margin-top:18px">' +
      '<h3>How to use this</h3>' +
      '<p style="font-size:15px;color:var(--ink2);max-width:70ch">Read a module, then clear its quiz unit. Marking a lesson read adds its terms to your <a href="#/glossary">glossary</a> — the definitions stay locked until you have read the lesson that introduces them. You have ' + MAX_HEARTS + ' hearts; a wrong answer costs one and the question comes back later in the same session. Hearts return one every ' + HEART_MINUTES + ' minutes.</p>' +
      '<p style="font-size:15px;color:var(--ink2);max-width:70ch;margin:0">Press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>J</kbd> anywhere — including mid-question — to pull up your notes. Everything is stored in this browser only.</p>' +
    '</div>' +
  '</div>');
}

/* ---------------------------------------------------------------- syllabus */
function viewSyllabus() {
  var cards = C.modules.map(function (m) {
    var pct = Math.round(moduleReadPct(m) * 100);
    var terms = m.lessons.reduce(function (n, l) { return n + DA.termsForLesson(l.id).length; }, 0);
    return '<button class="mod' + (pct === 100 ? " done" : "") + '" data-go="#/syllabus/' + m.id + '">' +
      '<div class="mod-top"><span class="mod-icon">' + m.icon + '</span>' +
        '<div><div class="mod-n">Module ' + m.number + '</div>' +
        '<div class="mod-title">' + esc(m.title) + '</div></div></div>' +
      '<p class="mod-tag">' + esc(m.tagline) + '</p>' +
      '<div class="bar" style="margin-top:6px"><i style="width:' + pct + '%"></i></div>' +
      '<div class="mod-meta"><span>' + m.lessons.length + ' lessons</span><span>' + m.minutes + ' min</span>' +
        '<span>' + terms + ' terms</span><span style="margin-left:auto">' + pct + '%</span></div>' +
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
    var n = DA.termsForLesson(l.id).length;
    return '<button class="mod" data-go="#/syllabus/' + m.id + "/" + i + '" style="flex-direction:row;align-items:center;gap:14px">' +
      '<span class="mod-icon">' + (S().read[l.id] ? "✓" : (i + 1)) + '</span>' +
      '<span style="flex:1"><span class="mod-title" style="display:block">' + esc(l.title) + '</span>' +
      '<span class="mod-tag" style="display:block">' + l.minutes + ' min · ' + n + ' term' + (n === 1 ? "" : "s") + '</span></span></button>';
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
      '<a class="btn btn-sm btn-ghost" href="#/quiz">Quiz this module</a>' +
      '<button class="btn btn-sm btn-ghost" data-note="1">Notes for this module</button></div>' +
    '</div>' +
    '<div class="mods">' + list + '</div></div>');
}

function viewLesson(mid, idx) {
  var m = moduleById(mid); if (!m) return (location.hash = "#/syllabus");
  if (isNaN(idx) || idx < 0 || idx >= m.lessons.length) idx = 0;
  var l = m.lessons[idx];
  var terms = DA.termsForLesson(l.id);
  var read = !!S().read[l.id];

  var toc = m.lessons.map(function (x, i) {
    return '<button class="' + (i === idx ? "on " : "") + (S().read[x.id] ? "done" : "") + '" data-go="#/syllabus/' + m.id + "/" + i + '">' +
      '<span class="tick">' + (S().read[x.id] ? "✓" : "○") + '</span><span>' + esc(x.title) + '</span></button>';
  }).join("");
  var prev = idx > 0 ? "#/syllabus/" + m.id + "/" + (idx - 1) : null;
  var nextMod = C.modules[m.number] ? C.modules[m.number] : null;
  var next = idx < m.lessons.length - 1 ? "#/syllabus/" + m.id + "/" + (idx + 1)
           : (nextMod ? "#/syllabus/" + nextMod.id + "/0" : "#/quiz");

  render('<div class="wrap"><div class="reader">' +
    '<aside class="toc"><h4>Module ' + m.number + '</h4>' + toc +
      '<div style="border-top:1px solid var(--line);margin-top:10px;padding-top:10px">' +
      '<button data-go="#/syllabus"><span class="tick">←</span><span>All modules</span></button>' +
      '<button data-go="#/quiz"><span class="tick">◆</span><span>Quiz this material</span></button>' +
      '<button data-note="1"><span class="tick">📝</span><span>Notes for this lesson</span></button></div></aside>' +
    '<article class="lesson">' +
      '<div class="eyebrow">Module ' + m.number + " · Lesson " + (idx + 1) + " of " + m.lessons.length + '</div>' +
      '<h1>' + esc(l.title) + '</h1>' +
      '<div class="lesson-body">' + l.body + '</div>' +
      '<div class="keypoints"><h4>Worth remembering</h4><ul>' +
        l.key.map(function (k) { return "<li>" + esc(k) + "</li>"; }).join("") + '</ul></div>' +
      (terms.length ? '<div class="termbox' + (read ? " open" : "") + '">' +
        '<h4>' + terms.length + ' glossary term' + (terms.length === 1 ? "" : "s") + ' ' + (read ? "unlocked by this lesson" : "unlock when you mark this read") + '</h4>' +
        '<div class="chips">' + terms.map(function (g) {
          return '<a class="chip' + (DA.isUnlocked(g.t) ? " on" : "") + '" href="#/glossary/' + encodeURIComponent(g.t) + '">' +
                 (DA.isUnlocked(g.t) ? "" : "🔒 ") + esc(g.t) + '</a>';
        }).join("") + '</div></div>' : "") +
      '<div id="unlockbox"></div>' +
      '<div class="lesson-nav">' +
        (prev ? '<a class="btn btn-ghost btn-sm" href="' + prev + '">&larr; Previous</a>' : "<span></span>") +
        '<div class="row">' +
          '<button class="btn btn-sm ' + (read ? "btn-ghost" : "btn-good") + '" id="mark">' +
            (read ? "✓ Marked as read" : "Mark as read") + "</button>" +
          '<a class="btn btn-sm" href="' + next + '">Next &rarr;</a>' +
        '</div>' +
      '</div>' +
    '</article></div></div>');

  document.getElementById("mark").addEventListener("click", function () {
    if (S().read[l.id]) { DA.unmarkRead(l.id); toast("Marked unread — its terms were removed from the glossary"); viewLesson(mid, idx); return; }
    var fresh = DA.markRead(l.id);
    DA.addXp(XP_READ);
    paintHud();
    viewLesson(mid, idx);
    var box = document.getElementById("unlockbox");
    if (fresh.length) {
      box.innerHTML = '<div class="unlocked pop"><h4>✓ Added ' + fresh.length + ' term' + (fresh.length === 1 ? "" : "s") + ' to your glossary</h4>' +
        '<ul>' + fresh.map(function (g) { return "<li><b>" + esc(g.t) + "</b> — " + esc(g.d) + "</li>"; }).join("") + "</ul>" +
        '<a class="btn btn-sm btn-ghost" href="#/glossary">Open the glossary</a></div>';
      toast("+" + XP_READ + " XP · " + fresh.length + " term" + (fresh.length === 1 ? "" : "s") + " added to your glossary");
      box.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      toast("+" + XP_READ + " XP · lesson marked as read");
    }
  });
}

/* ---------------------------------------------------------------- glossary */
var glFilter = { q: "", mode: "all", mod: "" };
function viewGlossary(focusTerm) {
  var g = DA.glossaryCounts();
  var q = norm(glFilter.q);
  var rows = GL.map(function (t, i) { return { t: t, i: i }; }).filter(function (x) {
    var g2 = x.t, unlocked = DA.isUnlocked(g2.t);
    if (glFilter.mode === "unlocked" && !unlocked) return false;
    if (glFilter.mode === "locked" && unlocked) return false;
    var ref = lessonRef(g2.l);
    if (glFilter.mod && (!ref || ref.m.id !== glFilter.mod)) return false;
    if (q && norm(g2.t + " " + (unlocked ? g2.d : "")).indexOf(q) < 0) return false;
    return true;
  });
  var byMod = {};
  rows.forEach(function (x) {
    var ref = lessonRef(x.t.l); var key = ref ? ref.m.id : "zz";
    (byMod[key] = byMod[key] || []).push(x.t);
  });
  var groups = C.modules.filter(function (m) { return byMod[m.id]; }).map(function (m) {
    return '<section class="glgroup"><h3>Module ' + m.number + " · " + esc(m.title) + '</h3><div class="glgrid">' +
      byMod[m.id].map(function (t) {
        var unlocked = DA.isUnlocked(t.t);
        var ref = lessonRef(t.l);
        return '<article class="gterm' + (unlocked ? "" : " locked") + (focusTerm === t.t ? " focus" : "") + '" id="t-' + encodeURIComponent(t.t) + '">' +
          '<h4>' + (unlocked ? "" : '<span class="lk">🔒</span>') + esc(t.t) + "</h4>" +
          (unlocked
            ? "<p>" + esc(t.d) + "</p>"
            : '<p class="gl-hidden">Unlocks when you read ' + (ref ? esc(ref.l.title) : "its lesson") + ".</p>") +
          (ref ? '<a class="gl-src" href="#/syllabus/' + ref.m.id + "/" + ref.i + '">' +
                 (unlocked ? "From " : "Read ") + esc(ref.l.title) + " &rarr;</a>" : "") +
        "</article>";
      }).join("") + "</div></section>";
  }).join("");

  render('<div class="wrap">' +
    '<h1>Glossary</h1>' +
    '<p class="lede">' + GL.length + ' terms. A definition unlocks when you mark the lesson that introduces it as read — so the glossary is a record of what you have actually covered, not a list you could have skimmed.</p>' +
    '<div class="card glbar">' +
      '<div class="glcount"><b>' + g.unlocked + "</b> of " + g.total + ' unlocked' +
        '<div class="bar good" style="margin-top:6px;width:160px"><i style="width:' + Math.round(g.unlocked / g.total * 100) + '%"></i></div></div>' +
      '<input class="tin" id="glq" placeholder="Search terms…" value="' + esc(glFilter.q) + '">' +
      '<select class="tin" id="glmode">' +
        '<option value="all">All</option><option value="unlocked">Unlocked</option><option value="locked">Locked</option></select>' +
      '<select class="tin" id="glmod"><option value="">Every module</option>' +
        C.modules.map(function (m) { return '<option value="' + m.id + '">Module ' + m.number + " · " + esc(m.title) + "</option>"; }).join("") +
      '</select>' +
    '</div>' +
    (groups || '<div class="empty-state"><div class="big">◎</div><h2>Nothing matches</h2><p>Try a different search or filter.</p></div>') +
  '</div>');

  var qi = document.getElementById("glq");
  qi.value = glFilter.q;
  qi.oninput = function () { glFilter.q = qi.value; var pos = qi.selectionStart; viewGlossary(); var n = document.getElementById("glq"); n.focus(); n.setSelectionRange(pos, pos); };
  var mo = document.getElementById("glmode"); mo.value = glFilter.mode;
  mo.onchange = function () { glFilter.mode = mo.value; viewGlossary(); };
  var md = document.getElementById("glmod"); md.value = glFilter.mod;
  md.onchange = function () { glFilter.mod = md.value; viewGlossary(); };

  if (focusTerm) {
    var node = document.getElementById("t-" + encodeURIComponent(focusTerm));
    if (node) node.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

/* ---------------------------------------------------------------- notes page */
var notesEditor = null;
function viewNotes(pageId) {
  var pages = DA.notes.pages;
  if (!pages.length) { var p0 = DA.newPage(null, "My first note"); pages = DA.notes.pages; pageId = p0.id; }
  var page = (pageId && DA.pageById(pageId)) || pages[0];

  var list = pages.map(function (p) {
    var prev = DA_NOTES.plain(p).slice(0, 60);
    return '<button class="nlist-i' + (p.id === page.id ? " on" : "") + '" data-page="' + p.id + '">' +
      '<span class="nl-ic">' + esc(p.icon || "📝") + '</span>' +
      '<span class="nl-tx"><b>' + esc(p.title || "Untitled") + "</b><i>" + esc(prev || "Empty") + "</i>" +
      (p.ref ? '<em class="nl-ref">' + esc(p.ref.label) + "</em>" : "") + "</span></button>";
  }).join("");

  render('<div class="wrap"><div class="notes-layout">' +
    '<aside class="nlist">' +
      '<div class="nlist-top"><h4>Notes</h4><button class="btn btn-sm" id="n-new">+ New</button></div>' +
      '<input class="tin" id="n-search" placeholder="Search notes…">' +
      '<div class="nlist-items">' + list + '</div>' +
      '<div class="nlist-foot muted">' + pages.length + ' note' + (pages.length === 1 ? "" : "s") + ' · saved in this browser</div>' +
    '</aside>' +
    '<div class="npage">' +
      '<div class="npage-bar">' +
        (page.ref && page.ref.href ? '<a class="btn btn-sm btn-ghost" href="' + page.ref.href + '">Go to ' + esc(page.ref.label) + "</a>" : "<span></span>") +
        '<div class="row"><button class="btn btn-sm btn-ghost" id="n-dl">Download .md</button>' +
        '<button class="btn btn-sm btn-ghost danger" id="n-del">Delete note</button></div>' +
      '</div>' +
      '<div id="n-host"></div>' +
    '</div></div></div>');

  view.querySelectorAll("[data-page]").forEach(function (b) {
    b.onclick = function () { location.hash = "#/notes/" + b.dataset.page; };
  });
  document.getElementById("n-new").onclick = function () {
    var p = DA.newPage(null, "Untitled"); location.hash = "#/notes/" + p.id;
  };
  document.getElementById("n-del").onclick = function () {
    if (!confirm("Delete this note? This cannot be undone.")) return;
    DA.deletePage(page.id);
    if (dwPageId === page.id) dwPageId = null;
    location.hash = "#/notes";
    if (location.hash === "#/notes") viewNotes(null);
  };
  document.getElementById("n-dl").onclick = function () { downloadMarkdown(page); };
  var search = document.getElementById("n-search");
  search.oninput = function () {
    var q = norm(search.value);
    view.querySelectorAll(".nlist-i").forEach(function (b) {
      var p = DA.pageById(b.dataset.page);
      var hay = norm((p.title || "") + " " + DA_NOTES.plain(p));
      b.style.display = !q || hay.indexOf(q) >= 0 ? "" : "none";
    });
  };

  if (notesEditor) notesEditor.destroy();
  notesEditor = DA_NOTES.mount(document.getElementById("n-host"), page, { onChange: function (p) {
    DA.touchPage(p);
    var host = document.getElementById("n-host");
    var st = host && host.querySelector(".ne-status"); if (st) st.textContent = "Saved";
    var side = view.querySelector('.nlist-i[data-page="' + p.id + '"] .nl-tx b');
    if (side) side.textContent = p.title || "Untitled";
    var ic = view.querySelector('.nlist-i[data-page="' + p.id + '"] .nl-ic');
    if (ic) ic.textContent = p.icon || "📝";
  }});
}
function downloadMarkdown(page) {
  var md = "# " + (page.title || "Untitled") + "\n\n";
  var n = 0;
  page.blocks.forEach(function (b, i) {
    var d = document.createElement("div"); d.innerHTML = DA_NOTES.clean(b.html || "");
    var t = d.textContent;
    if (b.type === "ol") { n = (i > 0 && page.blocks[i - 1].type === "ol") ? n + 1 : 1; }
    md += ({
      h1: "# " + t, h2: "## " + t, h3: "### " + t,
      ul: "- " + t, ol: n + ". " + t,
      todo: "- [" + (b.checked ? "x" : " ") + "] " + t,
      quote: "> " + t, callout: "> **" + t + "**",
      code: "```\n" + t + "\n```", divider: "---", p: t
    }[b.type] || t) + "\n\n";
  });
  var blob = new Blob([md], { type: "text/markdown" });
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = (page.title || "note").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + ".md";
  document.body.appendChild(a); a.click();
  setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}

/* ---------------------------------------------------------------- quiz path */
function viewQuizPath() {
  var missN = (S().mistakes || []).length;
  var units = C.modules.map(function (m, mi) {
    var open = unitUnlocked(mi);
    var n = unitLessons(m.id), doneN = 0, nodes = "";
    for (var i = 0; i < n; i++) {
      var stt = S().quiz[quizKey(m.id, i)] || {};
      if (stt.done) doneN++;
      var lockedNode = !open || (i > 0 && !(S().quiz[quizKey(m.id, i - 1)] || {}).done);
      var cls = lockedNode ? "locked" : stt.perfect ? "gold" : stt.done ? "done" : "";
      var glyph = lockedNode ? "🔒" : stt.perfect ? "★" : stt.done ? "✓" : (i + 1);
      var span = (window.innerWidth || 1024) < 480 ? 44 : 70;
      var off = [0, 1, 0, -1, 0, 1][i % 6] * span;
      nodes += '<div class="node-row"><div class="node-wrap" style="transform:translateX(' + off + 'px)">' +
        '<button class="node ' + cls + '"' + (lockedNode ? " disabled" : ' data-go="#/quiz/' + m.id + "/" + i + '"') + '>' +
        '<span class="node-ring"></span>' + glyph + "</button>" +
        '<span class="node-label">' + (lockedNode ? "Locked" : "Set " + (i + 1)) + "</span></div></div>";
    }
    var pct = Math.round(doneN / n * 100);
    return '<section class="unit">' +
      '<div class="unit-head' + (open ? "" : " locked") + '">' +
        '<span class="mod-icon">' + m.icon + "</span>" +
        "<div><h3>Unit " + m.number + " · " + esc(m.title) + "</h3><p>" + esc(m.tagline) + "</p></div>" +
        '<div class="unit-prog">' + doneN + "/" + n + '<div class="bar' + (pct === 100 ? " good" : "") + '"><i style="width:' + pct + '%"></i></div></div>' +
      "</div>" +
      (open ? '<div class="path">' + nodes + "</div>"
            : '<p class="muted" style="text-align:center;font-size:13.5px">Clear Unit ' + (m.number - 1) + " — or finish reading Module " + (m.number - 1) + " — to unlock.</p>") +
    "</section>";
  }).join("");

  var hin = DA.heartsIn();
  render('<div class="wrap-narrow">' +
    "<h1>Quiz</h1>" +
    '<p class="lede">Ten units following the syllabus. Clear a unit — or finish reading the matching module — to unlock the next one.</p>' +
    '<div class="card" style="margin-bottom:24px;display:flex;gap:16px;align-items:center;flex-wrap:wrap">' +
      '<div class="hearts">' + [0,1,2,3,4].map(function (i) { return '<span class="' + (i < S().hearts ? "on" : "") + '">♥</span>'; }).join("") + "</div>" +
      '<div style="font-size:14px;color:var(--ink2)">' +
        (S().hearts ? "<b>" + S().hearts + "</b> heart" + (S().hearts === 1 ? "" : "s") + " left"
                    : "<b>Out of hearts.</b> Practice mode still works and costs nothing.") +
        (hin ? " · next in " + hin + " min" : "") + "</div>" +
      '<a class="btn btn-sm btn-ghost" style="margin-left:auto" href="#/quiz/practice">' +
        "Practice mistakes" + (missN ? " (" + missN + ")" : "") + "</a>" +
    "</div>" + units + "</div>");
}

/* ---------------------------------------------------------------- session */
var Q = null;

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
    r.options = ["True", "False"]; r.answer = q.answer ? 0 : 1;
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
  DA.syncHearts();
  var list, title;
  if (mode === "practice") {
    list = (S().mistakes || []).map(function (id) {
      return QB.filter(function (q) { return q.id === id; })[0];
    }).filter(Boolean);
    if (!list.length) {
      render('<div class="wrap-narrow"><div class="empty-state"><div class="big">◎</div>' +
        "<h2>No mistakes saved yet</h2><p>Anything you get wrong lands here so you can drill it later.</p>" +
        '<p style="margin-top:18px"><a class="btn" href="#/quiz">Back to the path</a></p></div></div>');
      return;
    }
    list = shuffle(list).slice(0, 12);
    title = "Practice · your mistakes";
  } else {
    var m = moduleById(mid); if (!m) return (location.hash = "#/quiz");
    if (S().hearts <= 0) {
      var hin = DA.heartsIn();
      render('<div class="wrap-narrow"><div class="empty-state"><div class="big">♥</div>' +
        "<h2>Out of hearts</h2><p>One comes back every " + HEART_MINUTES + " minutes" + (hin ? " — next in " + hin + " min" : "") + ".<br>Practice mode costs nothing and still counts for XP.</p>" +
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
  Q = { mode: mode, mid: mid, idx: idx, title: title,
        queue: list.map(buildRuntime), requeue: [], total: list.length,
        answered: 0, firstTry: 0, xp: 0, wrongIds: [], t0: Date.now(), locked: false };
  paintQuestion();
}

function paintQuestion() {
  if (!Q.queue.length) {
    if (Q.requeue.length) { Q.queue = shuffle(Q.requeue); Q.requeue = []; }
    else return finishSession();
  }
  var r = Q.queue[0];
  var pct = Math.round(Q.answered / (Q.total + Q.wrongIds.length) * 100);
  var kind = { mc: "Choose one", multi: "Select all that apply", tf: "True or false",
               type: "Type the answer", match: "Match the pairs", order: "Put in order" }[r.type];
  var body = "";

  if (r.type === "mc" || r.type === "tf" || r.type === "multi") {
    body = '<div class="opts' + (r.type === "tf" ? " grid2" : "") + '" id="opts">' +
      r.options.map(function (o, i) {
        return '<button class="opt" data-i="' + i + '"><span class="kbd">' + (i + 1) + "</span><span>" + esc(o) + "</span></button>";
      }).join("") + "</div>";
  } else if (r.type === "type") {
    body = '<input class="typebox" id="typein" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type your answer">' +
           (r.hint ? '<p class="hintline">Hint: ' + esc(r.hint) + "</p>" : "");
  } else if (r.type === "match") {
    body = '<div class="matchgrid" id="matchgrid"><div class="mcol">' +
      r.left.map(function (t, i) { return '<button class="mitem" data-side="L" data-i="' + i + '">' + esc(t) + "</button>"; }).join("") +
      '</div><div class="mcol">' +
      r.right.map(function (t, i) { return '<button class="mitem" data-side="R" data-i="' + i + '">' + esc(t) + "</button>"; }).join("") +
      "</div></div>";
  } else if (r.type === "order") {
    body = '<div class="orderlist" id="orderlist"></div>';
  }

  render('<div class="session">' +
    '<div class="sess-top">' +
      '<button class="quit" id="quit" title="Leave">×</button>' +
      '<div class="bar"><i style="width:' + pct + '%"></i></div>' +
      (Q.mode === "practice" ? '<span class="pill">Practice</span>' :
        '<div class="hearts">' + [0,1,2,3,4].map(function (i) { return '<span class="' + (i < S().hearts ? "on" : "") + '">♥</span>'; }).join("") + "</div>") +
    "</div>" +
    '<div class="q-kind">' + kind + "</div>" +
    '<h2 class="q-text">' + esc(r.q) + "</h2>" +
    body +
    '<div class="row" style="justify-content:flex-end"><button class="btn" id="check" disabled>Check</button></div>' +
  "</div>");

  bindQuestion(r);
}

function bindQuestion(r) {
  var checkBtn = document.getElementById("check");
  document.getElementById("quit").onclick = function () { Q = null; location.hash = "#/quiz"; };
  var sel = { one: null, many: [], pairs: {}, pending: null, order: r.items ? r.items.slice() : null };
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
        if (sel.pending.dataset.side === side) { sel.pending.classList.remove("sel"); b.classList.add("sel"); sel.pending = b; return; }
        var L = side === "L" ? b : sel.pending, R = side === "R" ? b : sel.pending;
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
    (function repaint() {
      listEl.innerHTML = sel.order.map(function (t, i) {
        return '<div class="oitem" data-i="' + i + '"><span class="onum">' + (i + 1) + "</span>" +
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
    })();
    enable(true);
  }

  checkBtn.onclick = function () { grade(r, sel); };

  document.onkeydown = function (e) {
    if (!Q) return;
    if (isTyping(e.target)) return;                    // never steal keys from notes or inputs
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
function isTyping(t) {
  return isEditable(t) || isEditable(document.activeElement);
}
function isEditable(t) {
  if (!t || !t.closest) return false;
  if (t.closest("#drawer") || t.closest(".modal") || t.closest(".ne-slash") || t.closest(".ne-bmenu")) return true;
  var tag = (t.tagName || "").toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") return true;
  return !!t.closest("[contenteditable='true']");
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
      if (r.answers.indexOf(i) >= 0) b.classList.add("right");
      else if (sel.many.indexOf(i) >= 0) b.classList.add("wrong");
    });
  } else if (r.type === "type") {
    var v = norm(document.getElementById("typein").value);
    ok = r.accept.some(function (a) { return norm(a) === v; });
    var ti = document.getElementById("typein");
    ti.disabled = true; ti.style.borderColor = ok ? "var(--good)" : "var(--bad)";
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

  var id = r.src.id, st = S();
  st.seen[id] = st.seen[id] || { right: 0, wrong: 0 };
  var isRetry = Q.wrongIds.indexOf(id) >= 0;
  Q.answered++;

  if (ok) {
    st.seen[id].right++;
    if (!isRetry) { Q.firstTry++; Q.xp += XP_CORRECT; }
    var mi = st.mistakes.indexOf(id);
    if (mi >= 0 && st.seen[id].right >= 2) st.mistakes.splice(mi, 1);
  } else {
    st.seen[id].wrong++;
    if (!isRetry) Q.wrongIds.push(id);
    if (st.mistakes.indexOf(id) < 0) st.mistakes.unshift(id);
    if (st.mistakes.length > 60) st.mistakes.pop();
    if (Q.mode !== "practice") { DA.loseHeart(); paintHud(); }
    Q.requeue.push(r);
  }
  DA.save();

  var fb = el('<div class="feedback ' + (ok ? "ok" : "no") + ' pop"><div class="fb-inner">' +
    '<span class="fb-icon">' + (ok ? "✓" : "✕") + "</span>" +
    '<div class="fb-txt"><div class="fb-title">' + (ok ? pick(["Correct", "Exactly", "That's it", "Right"]) : "Not quite") + "</div>" +
    '<div class="fb-exp">' + esc(r.explain) + (marks ? "<br><b>" + esc(marks) + "</b>" : "") + "</div></div>" +
    '<button class="btn fb-btn ' + (ok ? "btn-good" : "btn-bad") + '" id="cont">Continue</button>' +
    "</div></div>");
  document.querySelector(".session").appendChild(fb);
  document.getElementById("check").style.display = "none";
  if (!ok) document.querySelector(".q-text").classList.add("shake");
  fb.scrollIntoView({ behavior: "smooth", block: "end" });

  document.getElementById("cont").onclick = function () {
    Q.locked = false;
    Q.queue.shift();
    if (S().hearts <= 0 && Q.mode !== "practice") return failSession();
    paintQuestion();
  };
  document.getElementById("cont").focus();
}

function failSession() {
  var hin = DA.heartsIn();
  render('<div class="wrap-narrow"><div class="result">' +
    '<div class="big">♥</div><h2>Out of hearts</h2>' +
    '<p class="muted">You got ' + Q.firstTry + " of " + Q.total + " right first time. The set was not saved.</p>" +
    '<p class="muted" style="font-size:14px">A heart returns every ' + HEART_MINUTES + " minutes" + (hin ? " — next in " + hin + " min" : "") + ". Practice mode never costs hearts.</p>" +
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
    var k = quizKey(Q.mid, Q.idx), prev = S().quiz[k] || {};
    S().quiz[k] = { done: true, best: Math.max(prev.best || 0, acc), perfect: prev.perfect || perfect };
  }
  DA.addXp(xp); paintHud();

  var m = Q.mode === "unit" ? moduleById(Q.mid) : null;
  var nextIdx = m ? Q.idx + 1 : -1;
  var hasNext = m && nextIdx < unitLessons(m.id);
  var nextHref = hasNext ? "#/quiz/" + m.id + "/" + nextIdx : "#/quiz";
  var goalPct = Math.min(100, Math.round((S().days[DA.todayKey()] || 0) / DAILY_GOAL * 100));

  render('<div class="wrap-narrow"><div class="result pop">' +
    '<div class="big">' + (perfect ? "★" : acc >= 80 ? "✓" : "◆") + "</div>" +
    "<h2>" + (perfect ? "Flawless set" : acc >= 80 ? "Set cleared" : "Set complete") + "</h2>" +
    '<p class="muted">' + esc(Q.title) + "</p>" +
    '<div class="rstats">' +
      '<div class="rstat xp"><b>+' + xp + "</b><span>XP</span></div>" +
      '<div class="rstat acc"><b>' + acc + "%</b><span>First try</span></div>" +
      '<div class="rstat"><b>' + (secs < 60 ? secs + "s" : Math.round(secs / 60) + "m") + "</b><span>Time</span></div>" +
    "</div>" +
    '<div style="text-align:left;margin-bottom:20px">' +
      '<div class="muted" style="font-size:12.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Today · ' + (S().days[DA.todayKey()] || 0) + "/" + DAILY_GOAL + " XP</div>" +
      '<div class="bar good"><i style="width:' + goalPct + '%"></i></div></div>' +
    (Q.wrongIds.length ? '<p class="muted" style="font-size:14px">' + Q.wrongIds.length + " question" + (Q.wrongIds.length === 1 ? "" : "s") + " saved to your mistakes for later practice.</p>" : "") +
    '<div class="row" style="justify-content:center;margin-top:18px">' +
      '<a class="btn" href="' + nextHref + '">' + (hasNext ? "Next set" : "Back to the path") + "</a>" +
      '<a class="btn btn-ghost" href="#/progress">See progress</a>' +
    "</div></div></div>");
  Q = null;
}

/* ---------------------------------------------------------------- progress */
function viewProgress() {
  var t = totals(), g = DA.glossaryCounts(), u = DA.activeUser();
  var rows = C.modules.map(function (m) {
    var read = Math.round(moduleReadPct(m) * 100), qz = Math.round(moduleQuizPct(m) * 100);
    var score = Math.round((read + qz) / 2);
    return '<div class="mrow"><span class="mnum">' + m.number + "</span>" +
      "<span>" + esc(m.title) + '<br><span class="muted" style="font-size:12px">read ' + read + "% · quiz " + qz + "%</span></span>" +
      '<span class="mbar"><span class="bar' + (score === 100 ? " good" : "") + '"><i style="width:' + score + '%"></i></span></span>' +
      '<span class="mval">' + score + "%</span></div>";
  }).join("");

  var days = [];
  for (var i = 13; i >= 0; i--) {
    var d = new Date(); d.setDate(d.getDate() - i);
    var k = DA.todayKey(d), got = S().days[k] || 0;
    days.push('<div title="' + k + ": " + got + ' XP" style="flex:1;text-align:center">' +
      '<div style="height:' + Math.max(4, Math.min(46, got / 2)) + "px;background:" + (got >= DAILY_GOAL ? "var(--good)" : got ? "var(--brand)" : "var(--line2)") +
      ';border-radius:4px;margin-bottom:4px"></div>' +
      '<span style="font-size:10px;color:var(--ink3)">' + "SMTWTFS"[d.getDay()] + "</span></div>");
  }

  var miss = (S().mistakes || []).slice(0, 12).map(function (id) {
    var q = QB.filter(function (x) { return x.id === id; })[0]; if (!q) return "";
    var m = moduleById(q.m);
    return '<div class="miss"><div class="mq">' + esc(q.q) + "</div>" +
      '<div class="ma"><span class="pill">Module ' + (m ? m.number : "?") + "</span> " + esc(q.explain) + "</div></div>";
  }).join("");

  render('<div class="wrap"><h1>Progress</h1>' +
    '<p class="lede">Profile <b>' + esc(u.name) + '</b>. Everything here lives in this browser only.</p>' +
    '<div class="statgrid">' +
      '<div class="stat"><b>' + S().xp + "</b><span>Total XP</span></div>" +
      '<div class="stat"><b>' + S().streak + "</b><span>Day streak</span></div>" +
      '<div class="stat"><b>' + t.readN + "/" + t.lessons + "</b><span>Lessons read</span></div>" +
      '<div class="stat"><b>' + t.qzDone + "/" + t.qz + "</b><span>Quiz sets cleared</span></div>" +
      '<div class="stat"><b>' + g.unlocked + "/" + g.total + "</b><span>Glossary unlocked</span></div>" +
      '<div class="stat"><b>' + t.acc + "%</b><span>Answer accuracy</span></div>" +
    "</div>" +
    '<div class="pair">' +
      '<div class="card"><h3 style="margin-top:0">Last 14 days</h3>' +
        '<div style="display:flex;gap:4px;align-items:flex-end;height:64px;margin-top:14px">' + days.join("") + "</div>" +
        '<p class="muted" style="font-size:12.5px;margin:12px 0 0">Green bars hit the ' + DAILY_GOAL + " XP daily goal.</p></div>" +
      '<div class="card"><h3 style="margin-top:0">Module mastery</h3>' +
        '<div class="mastery" style="margin-top:14px">' + rows + "</div></div>" +
    "</div>" +
    "<h2>Your mistakes" + ((S().mistakes || []).length ? " (" + S().mistakes.length + ")" : "") + "</h2>" +
    (miss ? '<p><a class="btn btn-sm" href="#/quiz/practice">Drill these now</a></p><div class="misslist">' + miss + "</div>"
          : '<p class="muted">Nothing yet. Questions you get wrong collect here and clear once you answer them right twice.</p>') +
    "<h2>This profile</h2>" +
    '<p class="muted" style="font-size:14.5px;max-width:70ch">Profiles are local to this browser — there is no account and no server. Export writes a JSON file containing this profile&rsquo;s progress, glossary and notes, which you can import on another device.</p>' +
    '<div class="row"><button class="btn btn-sm btn-ghost" id="pmenu">Manage profiles</button>' +
    '<button class="btn btn-sm btn-ghost" id="pexp">Export this profile</button>' +
    '<button class="btn btn-sm btn-ghost danger" id="reset">Reset this profile</button></div>' +
  "</div>");

  document.getElementById("pmenu").onclick = profileMenu;
  document.getElementById("pexp").onclick = function () { downloadJSON(DA.exportProfile()); };
  document.getElementById("reset").onclick = function () {
    if (!confirm("Reset " + u.name + "? This clears XP, streak, reading progress, quiz results, glossary and notes for this profile.")) return;
    DA.resetActive(); dwPageId = null; toast("Profile reset"); paintHud(); viewProgress();
  };
}

/* ---------------------------------------------------------------- backups */
function runBackupNow(userGesture) {
  return DA.writeBackupToFolder(!!userGesture)
    .then(function (folder) {
      hideBackupBar();
      toast("Backup saved to " + esc(folder));
      return true;
    })
    .catch(function () {
      // No folder, or permission withheld — fall back to a download.
      if (!userGesture) return false;
      downloadJSON(DA.exportProfile());
      DA.markBackedUp();
      hideBackupBar();
      toast("Backup downloaded");
      return true;
    });
}

function showBackupBar() {
  if (document.getElementById("backupbar")) return;
  var h = DA.hoursSinceBackup();
  var when = h === Infinity ? "You have never backed this profile up."
           : h < 48 ? "Your last backup was yesterday."
           : "Your last backup was " + Math.floor(h / 24) + " days ago.";
  var bar = el('<div class="backupbar" id="backupbar">' +
    '<span class="bb-i">↓</span>' +
    '<span class="bb-t"><b>Daily backup</b> · ' + when +
      ' Progress lives in this browser only, so a copy on disk is the safety net.</span>' +
    '<button class="btn btn-sm" id="bb-go">Back up now</button>' +
    (DA.backupSupported() ? '<button class="btn btn-sm btn-ghost" id="bb-folder">Pick a folder</button>' : "") +
    '<button class="bb-x" id="bb-later" title="Not now">×</button>' +
  '</div>');
  document.getElementById("app").insertBefore(bar, document.getElementById("view"));

  document.getElementById("bb-go").onclick = function () { runBackupNow(true); };
  document.getElementById("bb-later").onclick = hideBackupBar;
  var f = document.getElementById("bb-folder");
  if (f) f.onclick = function () {
    DA.chooseBackupDir()
      .then(function () { return runBackupNow(true); })
      .then(function () { toast("Backups will be written there automatically from now on"); })
      .catch(function (e) { if (e && e.name !== "AbortError") toast(esc(e.message || "Could not use that folder")); });
  };
}
function hideBackupBar() {
  var b = document.getElementById("backupbar");
  if (b) b.remove();
}

/* Fires on load. Writes silently if the browser still trusts the chosen
 * folder; otherwise surfaces a one-click bar. Never nags twice in a day. */
function maybeDailyBackup() {
  if (!DA.backupDue()) return;
  DA.getBackupDir().then(function (dir) {
    if (!dir) return showBackupBar();
    runBackupNow(false).then(function (done) { if (!done) showBackupBar(); });
  });
}

/* ---------------------------------------------------------------- boot */
document.getElementById("who").onclick = profileMenu;

document.addEventListener("click", function (e) {
  var note = e.target.closest("[data-note]");
  if (note) { e.preventDefault(); openDrawer(); return; }
  var go = e.target.closest("[data-go]");
  if (go) { e.preventDefault(); location.hash = go.dataset.go; return; }
  var nav = e.target.closest("[data-nav]");
  if (nav) { e.preventDefault(); var n = nav.dataset.nav; location.hash = n === "home" ? "#/" : "#/" + n; }
});
document.addEventListener("keydown", function (e) {
  if ((e.metaKey || e.ctrlKey) && (e.key === "j" || e.key === "J")) { e.preventDefault(); toggleDrawer(); }
  if (e.key === "Escape" && !drawer.hidden && drawer.classList.contains("on") && !document.querySelector(".ne-slash") && !document.querySelector(".ne-bmenu")) closeDrawer();
});
window.addEventListener("hashchange", function () { document.onkeydown = null; route(); });
setInterval(paintHud, 60000);
route();
setTimeout(maybeDailyBackup, 900);

})();
