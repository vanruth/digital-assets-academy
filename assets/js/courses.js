/* Digital Assets Academy — course registry
 *
 * A course is data: modules, questions, glossary. Digital Assets is simply
 * the one that ships with the app; everything else is created by the user
 * and stored per-browser alongside it.
 */
window.DA_COURSES = (function () {
"use strict";

var REG_KEY = "da-academy-courses-v1";
var courseKey = function (id) { return "da-academy-course-v1:" + id; };
var BUILTIN_ID = "digital-assets";

function readJSON(k, f) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : f; } catch (e) { return f; } }
function writeJSON(k, v) {
  try { localStorage.setItem(k, JSON.stringify(v)); return true; }
  catch (e) {
    if (e && (e.name === "QuotaExceededError" || e.code === 22))
      throw new Error("This browser is out of storage. Delete a course you no longer need, or export it first.");
    throw e;
  }
}
function slug(s) {
  return String(s || "course").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "course";
}

/* The bundled course, assembled from the data files it has always used. */
function builtin() {
  var c = window.DA_CURRICULUM;
  return {
    id: BUILTIN_ID,
    title: "Digital Assets Academy",
    subtitle: "How digital assets work, current to " + (c ? c.updated : "2026"),
    icon: "◈",
    builtin: true,
    updated: c ? c.updated : "",
    modules: c ? c.modules : [],
    questions: window.DA_QUESTIONS || [],
    glossary: window.DA_GLOSSARY || []
  };
}

var reg = readJSON(REG_KEY, null);
if (!reg || !reg.length) {
  reg = [{ id: BUILTIN_ID, title: "Digital Assets Academy", builtin: true, created: new Date().toISOString() }];
  writeJSON(REG_KEY, reg);
}
if (!reg.some(function (r) { return r.id === BUILTIN_ID; })) {
  reg.unshift({ id: BUILTIN_ID, title: "Digital Assets Academy", builtin: true, created: new Date().toISOString() });
  writeJSON(REG_KEY, reg);
}

var cache = {};

function list() {
  return reg.map(function (r) {
    if (r.id === BUILTIN_ID) {
      var b = builtin();
      return { id: b.id, title: b.title, subtitle: b.subtitle, icon: b.icon, builtin: true,
               modules: b.modules.length, questions: b.questions.length, glossary: b.glossary.length,
               created: r.created, source: { kind: "builtin" } };
    }
    var c = get(r.id);
    return { id: r.id, title: r.title, subtitle: c ? c.subtitle : "", icon: c ? c.icon : "◆", builtin: false,
             modules: c ? c.modules.length : 0, questions: c ? c.questions.length : 0,
             glossary: c ? c.glossary.length : 0, created: r.created, source: c ? c.source : null,
             broken: !c };
  });
}
function get(id) {
  if (id === BUILTIN_ID) return builtin();
  if (cache[id]) return cache[id];
  var c = readJSON(courseKey(id), null);
  if (c) cache[id] = c;
  return c;
}
function exists(id) { return reg.some(function (r) { return r.id === id; }); }

function add(course) {
  var base = slug(course.title), id = base, n = 2;
  while (exists(id)) id = base + "-" + n++;
  course.id = id;
  course.created = course.created || new Date().toISOString();
  writeJSON(courseKey(id), course);
  cache[id] = course;
  reg.push({ id: id, title: course.title, builtin: false, created: course.created });
  writeJSON(REG_KEY, reg);
  return course;
}
function update(course) {
  if (course.id === BUILTIN_ID) return false;
  writeJSON(courseKey(course.id), course);
  cache[course.id] = course;
  reg.forEach(function (r) { if (r.id === course.id) r.title = course.title; });
  writeJSON(REG_KEY, reg);
  return true;
}
function remove(id) {
  if (id === BUILTIN_ID) return false;
  reg = reg.filter(function (r) { return r.id !== id; });
  writeJSON(REG_KEY, reg);
  delete cache[id];
  try { localStorage.removeItem(courseKey(id)); } catch (e) {}
  return true;
}

/* ------------------------------------------------------------ validation */
function validate(c) {
  var problems = [];
  if (!c || typeof c !== "object") return ["That file is not a course."];
  if (!c.title) problems.push("missing a title");
  if (!Array.isArray(c.modules) || !c.modules.length) problems.push("no modules");
  (c.modules || []).forEach(function (m, i) {
    if (!m.id) problems.push("module " + (i + 1) + " has no id");
    if (!Array.isArray(m.lessons) || !m.lessons.length) problems.push("module " + (i + 1) + " has no lessons");
  });
  if (!Array.isArray(c.questions)) problems.push("questions is not a list");
  if (!Array.isArray(c.glossary)) problems.push("glossary is not a list");
  return problems;
}

/* Fills in anything a generated or hand-written course left out, so the app
 * never has to defend against half-formed data at render time. */
function normalise(c) {
  c.icon = c.icon || "◆";
  c.subtitle = c.subtitle || "";
  c.source = c.source || { kind: "imported" };
  c.questions = Array.isArray(c.questions) ? c.questions : [];
  c.glossary = Array.isArray(c.glossary) ? c.glossary : [];
  (c.modules || []).forEach(function (m, mi) {
    m.id = m.id || "m" + (mi + 1);
    m.number = mi + 1;
    m.icon = m.icon || "◆";
    m.tagline = m.tagline || "";
    m.summary = m.summary || "";
    m.outcomes = Array.isArray(m.outcomes) ? m.outcomes : [];
    m.lessons = Array.isArray(m.lessons) ? m.lessons : [];
    m.minutes = m.minutes || m.lessons.reduce(function (n, l) { return n + (l.minutes || 8); }, 0);
    m.lessons.forEach(function (l, li) {
      l.id = l.id || m.id + "l" + (li + 1);
      l.title = l.title || "Lesson " + (li + 1);
      l.minutes = l.minutes || 8;
      l.body = l.body || "";
      l.key = Array.isArray(l.key) ? l.key : [];
    });
  });
  var seen = {};
  c.questions = c.questions.filter(function (q, i) {
    if (!q || !q.type || !q.q) return false;
    q.id = q.id || "q" + (i + 1);
    if (seen[q.id]) q.id = q.id + "-" + i;
    seen[q.id] = true;
    return true;
  });
  c.glossary = c.glossary.filter(function (g) { return g && g.t && g.d; });
  return c;
}

function exportCourse(id) {
  var c = get(id);
  if (!c) return null;
  return { format: "digital-assets-academy/course", version: 1, exported: new Date().toISOString(),
           course: { title: c.title, subtitle: c.subtitle, icon: c.icon, updated: c.updated,
                     source: c.source, modules: c.modules, questions: c.questions, glossary: c.glossary } };
}
function importCourse(obj) {
  var c = obj && obj.format === "digital-assets-academy/course" ? obj.course : obj;
  var problems = validate(c);
  if (problems.length) throw new Error("That course could not be read: " + problems.join(", ") + ".");
  return add(normalise(JSON.parse(JSON.stringify(c))));
}

return {
  BUILTIN_ID: BUILTIN_ID,
  list: list, get: get, add: add, update: update, remove: remove, exists: exists,
  validate: validate, normalise: normalise,
  exportCourse: exportCourse, importCourse: importCourse
};
})();
