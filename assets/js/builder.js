/* Digital Assets Academy — course builder
 *
 * Turns a topic and whatever material you give it into a course.
 *
 * The app is static and public, so there is no server to hold an API key.
 * Generation therefore uses *your own* key, kept in this browser and sent
 * only to Anthropic — the bring-your-own-key pattern the direct browser
 * access header exists for. The key is deliberately stored outside the
 * profile so it is never written into a backup.
 */
window.DA_BUILD = (function () {
"use strict";

var KEY_STORE = "da-academy-anthropic-key";
var API = "https://api.anthropic.com/v1/messages";
var MODEL = "claude-opus-5";

function getKey() { try { return localStorage.getItem(KEY_STORE) || ""; } catch (e) { return ""; } }
function setKey(k) { try { k ? localStorage.setItem(KEY_STORE, k.trim()) : localStorage.removeItem(KEY_STORE); } catch (e) {} }
function hasKey() { return !!getKey(); }

/* ------------------------------------------------------------ material */
var TEXT_EXT = /\.(txt|md|markdown|csv|tsv|json|html?|rtf)$/i;

function readFile(file) {
  return new Promise(function (res, rej) {
    if (/^application\/pdf$/i.test(file.type) || /\.pdf$/i.test(file.name))
      return rej(new Error(file.name + " is a PDF. This build reads text files only — export it as .txt or .md, or paste the text."));
    if (/\.(docx?|pptx?|xlsx?)$/i.test(file.name))
      return rej(new Error(file.name + " is an Office document. Save it as .txt or .md, or paste the text."));
    if (file.size > 2 * 1024 * 1024)
      return rej(new Error(file.name + " is larger than 2 MB. Trim it or split it up."));
    var r = new FileReader();
    r.onload = function () {
      var text = String(r.result || "");
      if (/\.html?$/i.test(file.name)) {
        var d = document.createElement("div"); d.innerHTML = text;
        d.querySelectorAll("script,style").forEach(function (x) { x.remove(); });
        text = d.textContent;
      }
      res({ name: file.name, kind: "file", text: text.replace(/\s+\n/g, "\n").trim() });
    };
    r.onerror = function () { rej(new Error("Could not read " + file.name)); };
    r.readAsText(file);
  });
}

/* Most sites do not send CORS headers, so a browser simply cannot read them.
 * We try, and say so plainly when it fails rather than pretending. */
function readUrl(url) {
  return fetch(url, { mode: "cors" })
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.text();
    })
    .then(function (html) {
      var d = document.createElement("div");
      d.innerHTML = html;
      d.querySelectorAll("script,style,nav,footer,header,aside").forEach(function (x) { x.remove(); });
      var text = (d.querySelector("article") || d.querySelector("main") || d).textContent;
      return { name: url, kind: "url", text: text.replace(/\n{3,}/g, "\n\n").trim() };
    })
    .catch(function () {
      throw new Error("That site will not let a browser read it — almost all of them block cross-origin requests. Open the page, copy the text, and paste it into the material box instead.");
    });
}

/* ------------------------------------------------------------ API */
function call(messages, maxTokens, signal) {
  var key = getKey();
  if (!key) return Promise.reject(new Error("No Anthropic API key set."));
  return fetch(API, {
    method: "POST",
    signal: signal,
    headers: {
      "content-type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens || 16000,
      thinking: { type: "adaptive" },
      messages: messages
    })
  }).then(function (r) {
    return r.json().then(function (j) {
      if (!r.ok) {
        var msg = (j && j.error && j.error.message) || ("HTTP " + r.status);
        if (r.status === 401) msg = "That API key was rejected. Check it in Settings.";
        if (r.status === 429) msg = "Rate limited by the API. Wait a moment and try again.";
        throw new Error(msg);
      }
      if (j.stop_reason === "refusal")
        throw new Error("The model declined to produce this course.");
      // Adaptive thinking is on, so the response carries thinking blocks too.
      var text = (j.content || []).filter(function (b) { return b.type === "text"; })
                                  .map(function (b) { return b.text; }).join("");
      if (!text) throw new Error("The model returned nothing usable.");
      return text;
    });
  });
}

/* Models are asked for bare JSON, but fences and preamble still happen. */
function parseJSON(text, what) {
  var t = String(text).trim();
  var fence = t.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) t = fence[1].trim();
  else {
    var a = t.indexOf("{"), b = t.lastIndexOf("}");
    if (a > 0 && b > a) t = t.slice(a, b + 1);
  }
  try { return JSON.parse(t); }
  catch (e) { throw new Error("Could not read the " + what + " the model returned. Try generating again."); }
}

function materialBlock(material, limit) {
  if (!material.length) return "";
  var out = "", budget = limit || 120000;
  material.forEach(function (m) {
    if (budget <= 0) return;
    var slice = m.text.slice(0, budget);
    budget -= slice.length;
    out += "\n\n--- " + m.name + " ---\n" + slice;
  });
  return "\n\nUse the following material as the primary source. Prefer it over general knowledge, and do not invent facts that contradict it." + out;
}

/* ------------------------------------------------------------ generation */
var OUTLINE_RULES =
  "You are building a rigorous self-study course for one adult learner. " +
  "Write for someone who has to make decisions about this subject, not for someone who wants a glossary. " +
  "Be specific: name things, give numbers and dates where they matter, and prefer the mechanism over the summary. " +
  "Never pad. Never use marketing language.";

function outline(brief, material, shape, signal) {
  var prompt =
    OUTLINE_RULES + "\n\n" +
    "Design the outline for a course titled \"" + brief.title + "\".\n" +
    "What the learner wants: " + brief.topic + "\n" +
    (brief.level ? "Assumed level: " + brief.level + "\n" : "") +
    "Produce exactly " + shape.modules + " modules, each with " + shape.lessons + " lessons." +
    materialBlock(material, 60000) + "\n\n" +
    "Respond with only a JSON object, no prose and no code fence:\n" +
    '{"subtitle":"one line, under 90 chars","icon":"a single unicode symbol",' +
    '"modules":[{"title":"","tagline":"short","summary":"2-3 sentences","icon":"unicode symbol",' +
    '"outcomes":["what the learner can do, 3-4 items"],' +
    '"lessons":[{"title":"","minutes":8}]}]}';
  return call([{ role: "user", content: prompt }], 8000, signal)
    .then(function (t) { return parseJSON(t, "outline"); });
}

function moduleContent(brief, mod, index, total, material, shape, signal) {
  var lessonList = mod.lessons.map(function (l, i) { return (i + 1) + ". " + l.title; }).join("\n");
  var prompt =
    OUTLINE_RULES + "\n\n" +
    "Course: \"" + brief.title + "\" — " + brief.topic + "\n" +
    "You are writing module " + index + " of " + total + ': "' + mod.title + '".\n' +
    "Module summary: " + (mod.summary || "") + "\n" +
    "Its lessons, in order:\n" + lessonList + "\n" +
    materialBlock(material, 40000) + "\n\n" +
    "For each lesson write a substantial body of 350-700 words as simple HTML using only " +
    "<p>, <h4>, <ul>, <ol>, <li>, <strong>, <em>, and <table class=\"data\"> where a comparison genuinely helps. " +
    "You may use <div class=\"callout\"> for a single key insight per lesson. No headings above <h4>, no images, no links.\n" +
    "Also write, for each lesson, 3-5 'key' takeaway lines worth remembering, " +
    "and " + shape.terms + " glossary terms it introduces with one-sentence definitions.\n" +
    "Then write " + shape.questions + " questions across the whole module that test judgement and specifics, not vocabulary recall. " +
    "Vary the types. Every question needs a one-or-two sentence explanation of why the answer is right.\n\n" +
    "Question shapes (use the exact field names):\n" +
    '{"type":"mc","q":"","options":["","","",""],"answer":0,"explain":""}\n' +
    '{"type":"multi","q":"","options":["","","",""],"answers":[0,2],"explain":""}\n' +
    '{"type":"tf","q":"","answer":true,"explain":""}\n' +
    '{"type":"type","q":"","accept":["lowercase acceptable answers"],"hint":"","explain":""}\n' +
    '{"type":"match","q":"","pairs":[["left","right"],["left","right"]],"explain":""}\n' +
    '{"type":"order","q":"","items":["in the correct order"],"explain":""}\n\n' +
    "Respond with only a JSON object, no prose and no code fence:\n" +
    '{"lessons":[{"title":"must match the lesson title given","body":"<p>...</p>","key":["",""],' +
    '"terms":[{"t":"term","d":"definition"}]}],"questions":[ ... ]}';
  return call([{ role: "user", content: prompt }], 16000, signal)
    .then(function (t) { return parseJSON(t, "module " + index); });
}

/* Drives the whole build, reporting progress as it goes. */
function build(brief, material, shape, onProgress, signal) {
  var course = {
    title: brief.title, subtitle: "", icon: "◆",
    updated: new Date().toISOString().slice(0, 10),
    source: {
      kind: "generated", topic: brief.topic, model: MODEL,
      material: material.map(function (m) { return m.name; }),
      built: new Date().toISOString()
    },
    modules: [], questions: [], glossary: []
  };
  var step = 0, steps = shape.modules + 1;
  function report(msg) { onProgress({ done: step, total: steps, message: msg }); }

  report("Designing the outline…");
  return outline(brief, material, shape, signal).then(function (o) {
    course.subtitle = o.subtitle || "";
    course.icon = (o.icon || "◆").slice(0, 2);
    step = 1; report("Outline ready · " + (o.modules || []).length + " modules");

    var mods = (o.modules || []).slice(0, shape.modules);
    var chain = Promise.resolve();
    mods.forEach(function (m, i) {
      chain = chain.then(function () {
        if (signal && signal.aborted) throw new Error("Cancelled");
        report("Writing module " + (i + 1) + " of " + mods.length + " — " + m.title);
        return moduleContent(brief, m, i + 1, mods.length, material, shape, signal).then(function (c) {
          var mid = "m" + (i + 1);
          var lessons = (c.lessons || []).map(function (l, li) {
            var lid = mid + "l" + (li + 1);
            (l.terms || []).forEach(function (t) {
              if (t && t.t && t.d) course.glossary.push({ t: t.t, l: lid, d: t.d });
            });
            return { id: lid, title: l.title || (m.lessons[li] && m.lessons[li].title) || "Lesson " + (li + 1),
                     minutes: (m.lessons[li] && m.lessons[li].minutes) || 8,
                     body: l.body || "", key: l.key || [] };
          });
          course.modules.push({
            id: mid, number: i + 1, title: m.title, tagline: m.tagline || "",
            icon: (m.icon || "◆").slice(0, 2), summary: m.summary || "",
            outcomes: m.outcomes || [], lessons: lessons,
            minutes: lessons.reduce(function (n, l) { return n + (l.minutes || 8); }, 0)
          });
          (c.questions || []).forEach(function (q, qi) {
            q.id = "q" + (i + 1) + "_" + (qi + 1);
            q.m = mid;
            q.l = (lessons[qi % Math.max(1, lessons.length)] || {}).id || mid + "l1";
            course.questions.push(q);
          });
          step++; report("Module " + (i + 1) + " done");
        });
      });
    });
    return chain;
  }).then(function () {
    if (!course.modules.length) throw new Error("The model produced no usable modules.");
    return DA_COURSES.normalise(course);
  });
}

return {
  getKey: getKey, setKey: setKey, hasKey: hasKey,
  readFile: readFile, readUrl: readUrl,
  build: build, MODEL: MODEL
};
})();
