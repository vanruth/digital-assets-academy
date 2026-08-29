/* Digital Assets Academy — highlights and margin comments
 *
 * A mark is stored as character offsets into the lesson body's plain text,
 * plus the quoted text itself. Lesson HTML is a constant, so offsets are
 * stable; the quote is kept as a fallback so a mark can relocate itself if
 * the wording is ever edited, and is flagged rather than silently dropped
 * if it cannot be found at all.
 */
window.DA_ANN = (function () {
"use strict";

var COLORS = [
  { k: "yellow", label: "Yellow" },
  { k: "green",  label: "Green"  },
  { k: "blue",   label: "Blue"   },
  { k: "pink",   label: "Pink"   }
];

function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
function uid() { return "a" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

/* Walk the text nodes, recording where each one starts in the flat string. */
function textIndex(root) {
  var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  var nodes = [], pos = 0, n;
  while ((n = walker.nextNode())) {
    var len = n.nodeValue.length;
    if (!len) continue;
    nodes.push({ node: n, start: pos, end: pos + len });
    pos += len;
  }
  return { nodes: nodes, length: pos };
}
function flatText(root) {
  var idx = textIndex(root), s = "";
  idx.nodes.forEach(function (e) { s += e.node.nodeValue; });
  return s;
}
/* Selection -> offsets in the flat string. */
function rangeOffsets(root, range) {
  var pre = range.cloneRange();
  pre.selectNodeContents(root);
  pre.setEnd(range.startContainer, range.startOffset);
  var start = pre.toString().length;
  return { start: start, end: start + range.toString().length };
}

function wrapRange(root, start, end, mark) {
  var idx = textIndex(root), hits = [];
  idx.nodes.forEach(function (e) {
    if (e.end <= start || e.start >= end) return;
    hits.push({ node: e.node, s: Math.max(0, start - e.start), e: Math.min(e.node.nodeValue.length, end - e.start) });
  });
  hits.forEach(function (h) {
    var node = h.node;
    if (h.e < node.nodeValue.length) node.splitText(h.e);
    var mid = h.s > 0 ? node.splitText(h.s) : node;
    var m = document.createElement("mark");
    m.className = "hl hl-" + (mark.color || "yellow") + (mark.note ? " hl-note" : "");
    m.setAttribute("data-mid", mark.id);
    m.title = mark.note ? mark.note : "";
    mid.parentNode.insertBefore(m, mid);
    m.appendChild(mid);
  });
  return hits.length > 0;
}

/* ------------------------------------------------------------------ mount */
function mount(body, marks, opts) {
  opts = opts || {};
  var pristine = body.innerHTML;
  var bar = null, pop = null;

  function save() { if (opts.onChange) opts.onChange(marks); }

  function repaint() {
    body.innerHTML = pristine;
    var text = flatText(body);
    marks.forEach(function (m) {
      m.orphan = false;
      if (text.slice(m.start, m.end) !== m.text) {          // wording moved?
        var at = text.indexOf(m.text);
        if (at >= 0 && m.text) { m.start = at; m.end = at + m.text.length; }
        else { m.orphan = true; return; }
      }
      if (!wrapRange(body, m.start, m.end, m)) m.orphan = true;
    });
    if (opts.onRepaint) opts.onRepaint(marks);
  }

  function closeUI() {
    if (bar) { bar.remove(); bar = null; }
    if (pop) { pop.remove(); pop = null; }
  }

  /* --- selection toolbar --- */
  function showBar(range) {
    closeUI();
    var r = range.getBoundingClientRect();
    bar = document.createElement("div");
    bar.className = "annbar";
    bar.innerHTML =
      COLORS.map(function (c) { return '<button class="annswatch sw-' + c.k + '" data-color="' + c.k + '" title="' + c.label + '"></button>'; }).join("") +
      '<span class="annsep"></span>' +
      '<button class="annbtn" data-act="comment">💬 Comment</button>' +
      '<button class="annbtn" data-act="copy">Copy</button>';
    document.body.appendChild(bar);
    place(bar, r);
    var off = rangeOffsets(body, range), quoted = range.toString();

    bar.addEventListener("mousedown", function (e) { e.preventDefault(); });
    bar.addEventListener("click", function (e) {
      var c = e.target.closest("[data-color]"), a = e.target.closest("[data-act]");
      if (c) { add(off, quoted, c.dataset.color, ""); return; }
      if (!a) return;
      if (a.dataset.act === "copy") {
        (navigator.clipboard ? navigator.clipboard.writeText(quoted) : Promise.reject()).catch(function () {});
        closeUI(); window.getSelection().removeAllRanges();
        if (opts.onToast) opts.onToast("Copied");
        return;
      }
      if (a.dataset.act === "comment") {
        var m = add(off, quoted, "yellow", "", true);
        if (m) setTimeout(function () { openPopup(m.id, true); }, 30);
      }
    });
  }
  function place(elm, r) {
    var top = r.top + window.scrollY - elm.offsetHeight - 10;
    if (r.top - elm.offsetHeight - 10 < 4) top = r.bottom + window.scrollY + 10;
    var left = r.left + window.scrollX + r.width / 2 - elm.offsetWidth / 2;
    left = Math.max(10, Math.min(left, window.scrollX + document.documentElement.clientWidth - elm.offsetWidth - 10));
    elm.style.top = top + "px"; elm.style.left = left + "px";
  }

  function add(off, quoted, color, note, quiet) {
    if (off.end <= off.start) return null;
    var m = { id: uid(), start: off.start, end: off.end, text: quoted, color: color, note: note || "", created: new Date().toISOString() };
    marks.push(m);
    marks.sort(function (a, b) { return a.start - b.start; });
    save(); repaint(); closeUI();
    window.getSelection().removeAllRanges();
    if (!quiet && opts.onToast) opts.onToast("Highlighted");
    return m;
  }
  function byId(id) { for (var i = 0; i < marks.length; i++) if (marks[i].id === id) return marks[i]; return null; }

  /* --- popup on an existing highlight --- */
  function openPopup(id, focus) {
    closeUI();
    var m = byId(id); if (!m) return;
    var target = body.querySelector('mark[data-mid="' + id + '"]');
    pop = document.createElement("div");
    pop.className = "annpop";
    pop.innerHTML =
      '<div class="annpop-q">' + esc(m.text.length > 160 ? m.text.slice(0, 160) + "…" : m.text) + '</div>' +
      '<textarea class="annpop-note" rows="3" placeholder="Add a comment…">' + esc(m.note || "") + '</textarea>' +
      '<div class="annpop-row">' +
        COLORS.map(function (c) { return '<button class="annswatch sw-' + c.k + (c.k === m.color ? " on" : "") + '" data-color="' + c.k + '" title="' + c.label + '"></button>'; }).join("") +
        '<button class="annbtn danger" data-act="del" style="margin-left:auto">Delete</button>' +
        '<button class="annbtn" data-act="done">Done</button>' +
      '</div>';
    document.body.appendChild(pop);
    if (target) place(pop, target.getBoundingClientRect());
    var ta = pop.querySelector(".annpop-note");
    if (focus) ta.focus();
    ta.addEventListener("input", function () { m.note = ta.value; save(); });
    pop.addEventListener("click", function (e) {
      var c = e.target.closest("[data-color]"), a = e.target.closest("[data-act]");
      if (c) { m.color = c.dataset.color; save(); repaint(); openPopup(id); return; }
      if (!a) return;
      if (a.dataset.act === "del") {
        marks.splice(marks.indexOf(m), 1); save(); repaint(); closeUI();
        if (opts.onToast) opts.onToast("Highlight removed");
      } else { save(); repaint(); closeUI(); }
    });
  }

  /* --- wiring --- */
  body.addEventListener("mouseup", function () {
    setTimeout(function () {
      var sel = window.getSelection();
      if (!sel.rangeCount || sel.isCollapsed) return;
      var r = sel.getRangeAt(0);
      if (!body.contains(r.commonAncestorContainer)) return;
      if (!r.toString().trim()) return;
      showBar(r);
    }, 10);
  });
  body.addEventListener("click", function (e) {
    var m = e.target.closest("mark[data-mid]");
    if (m) { e.preventDefault(); openPopup(m.getAttribute("data-mid")); }
  });
  document.addEventListener("mousedown", function (e) {
    if (e.target.closest(".annbar") || e.target.closest(".annpop") || e.target.closest("mark[data-mid]")) return;
    closeUI();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeUI(); });

  repaint();
  return { repaint: repaint, open: openPopup, close: closeUI, COLORS: COLORS };
}

return { mount: mount, COLORS: COLORS, flatText: flatText };
})();
