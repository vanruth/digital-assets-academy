/* Digital Assets Academy — block editor
 * A small Notion-style editor: one contenteditable per block, markdown
 * shortcuts, a slash menu, and debounced auto-save.
 */
window.DA_NOTES = (function () {
"use strict";

var TYPES = [
  { k: "p",       label: "Text",           hint: "Plain paragraph",        md: "",       icon: "¶" },
  { k: "h1",      label: "Heading 1",      hint: "Big section heading",    md: "# ",     icon: "H1" },
  { k: "h2",      label: "Heading 2",      hint: "Medium heading",         md: "## ",    icon: "H2" },
  { k: "h3",      label: "Heading 3",      hint: "Small heading",          md: "### ",   icon: "H3" },
  { k: "ul",      label: "Bulleted list",  hint: "Simple bullet",          md: "- ",     icon: "•" },
  { k: "ol",      label: "Numbered list",  hint: "Ordered list",           md: "1. ",    icon: "1." },
  { k: "todo",    label: "To-do",          hint: "Checkbox",               md: "[] ",    icon: "☐" },
  { k: "quote",   label: "Quote",          hint: "Set-apart passage",      md: "> ",     icon: "❝" },
  { k: "callout", label: "Callout",        hint: "Boxed note",             md: "!! ",    icon: "★" },
  { k: "code",    label: "Code",           hint: "Monospaced block",       md: "```",    icon: "{}" },
  { k: "divider", label: "Divider",        hint: "Horizontal rule",        md: "---",    icon: "—" }
];
var PLACEHOLDER = {
  p: "Write something, or press / for blocks",
  h1: "Heading 1", h2: "Heading 2", h3: "Heading 3",
  ul: "List item", ol: "List item", todo: "To-do",
  quote: "Quote", callout: "Callout", code: "Code"
};

/* ------------------------------------------------------------ sanitise */
var OK_TAGS = { B:1, STRONG:1, I:1, EM:1, U:1, S:1, STRIKE:1, CODE:1, BR:1, SPAN:1, A:1 };
function clean(html) {
  var d = document.createElement("div");
  d.innerHTML = String(html == null ? "" : html);
  (function walk(node) {
    var kids = [].slice.call(node.childNodes);
    kids.forEach(function (c) {
      if (c.nodeType === 3) return;
      if (c.nodeType !== 1) { c.remove(); return; }
      if (!OK_TAGS[c.tagName]) {
        while (c.firstChild) c.parentNode.insertBefore(c.firstChild, c);
        c.remove(); return;
      }
      [].slice.call(c.attributes).forEach(function (a) {
        var n = a.name.toLowerCase();
        var keep = (c.tagName === "A" && n === "href" && /^https?:/i.test(a.value));
        if (!keep) c.removeAttribute(a.name);
      });
      if (c.tagName === "A") { c.setAttribute("rel", "noopener noreferrer"); c.setAttribute("target", "_blank"); }
      walk(c);
    });
  })(d);
  return d.innerHTML;
}
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }

/* ------------------------------------------------------------ caret */
function placeCaret(el, atStart) {
  if (!el) return;
  el.focus();
  var r = document.createRange(), s = window.getSelection();
  r.selectNodeContents(el);
  r.collapse(!!atStart);
  s.removeAllRanges(); s.addRange(r);
}
function caretOffsetIsStart(el) {
  var s = window.getSelection();
  if (!s.rangeCount) return false;
  var r = s.getRangeAt(0);
  if (!r.collapsed) return false;
  var pre = r.cloneRange(); pre.selectNodeContents(el); pre.setEnd(r.startContainer, r.startOffset);
  return pre.toString().length === 0;
}
function caretOffsetIsEnd(el) {
  var s = window.getSelection();
  if (!s.rangeCount) return false;
  var r = s.getRangeAt(0);
  if (!r.collapsed) return false;
  var post = r.cloneRange(); post.selectNodeContents(el); post.setStart(r.endContainer, r.endOffset);
  return post.toString().length === 0;
}
function splitAtCaret(el) {
  var s = window.getSelection();
  if (!s.rangeCount) return "";
  var r = s.getRangeAt(0);
  var after = r.cloneRange();
  after.selectNodeContents(el);
  after.setStart(r.endContainer, r.endOffset);
  var frag = after.extractContents();
  var tmp = document.createElement("div"); tmp.appendChild(frag);
  return tmp.innerHTML;
}

/* ------------------------------------------------------------ editor */
function mount(root, page, opts) {
  opts = opts || {};
  var saveTimer = null, slash = null;

  function bid() { return window.DA ? DA.bid() : "b" + Math.random().toString(36).slice(2, 9); }
  function idx(id) { for (var i = 0; i < page.blocks.length; i++) if (page.blocks[i].id === id) return i; return -1; }
  function blk(id) { var i = idx(id); return i < 0 ? null : page.blocks[i]; }

  function touch(now) {
    clearTimeout(saveTimer);
    if (now) { if (opts.onChange) opts.onChange(page); return; }
    setStatus("Saving…");
    saveTimer = setTimeout(function () { if (opts.onChange) opts.onChange(page); }, 400);
  }
  function setStatus(t) {
    var s = root.querySelector(".ne-status");
    if (s) s.textContent = t;
  }

  /* ---------------------------------------------------------- render */
  function blockHTML(b, i) {
    var marker = "";
    if (b.type === "ul") marker = '<span class="nb-m">•</span>';
    if (b.type === "ol") {
      var n = 1;
      for (var j = i - 1; j >= 0 && page.blocks[j].type === "ol"; j--) n++;
      marker = '<span class="nb-m nb-num">' + n + '.</span>';
    }
    if (b.type === "todo") marker = '<button class="nb-m nb-check' + (b.checked ? " on" : "") + '" data-check="' + b.id + '" aria-label="Toggle"></button>';
    if (b.type === "divider")
      return '<div class="nb" data-id="' + b.id + '" data-type="divider">' +
             '<button class="nb-h" data-handle="' + b.id + '" title="Block options">⠿</button>' +
             '<div class="nb-body"><div class="nb-c nb-hr" contenteditable="false"><hr></div></div></div>';
    return '<div class="nb" data-id="' + b.id + '" data-type="' + b.type + '">' +
      '<button class="nb-h" data-handle="' + b.id + '" title="Block options">⠿</button>' +
      '<div class="nb-body">' + marker +
      '<div class="nb-c" contenteditable="true" spellcheck="true" data-ph="' + esc(PLACEHOLDER[b.type] || "") + '">' +
      clean(b.html) + '</div></div></div>';
  }

  function renderBlocks(focusId, atStart) {
    var host = root.querySelector(".ne-blocks");
    host.innerHTML = page.blocks.map(blockHTML).join("");
    if (focusId) {
      var target = host.querySelector('.nb[data-id="' + focusId + '"] .nb-c');
      if (target) {
        var mark = target.querySelector("#__caret");
        if (mark) {
          var r = document.createRange(), s = window.getSelection();
          r.setStartBefore(mark); r.collapse(true);
          mark.remove();
          target.focus(); s.removeAllRanges(); s.addRange(r);
        } else placeCaret(target, atStart);
      }
    }
  }

  function renderShell() {
    root.innerHTML =
      '<div class="ne">' +
        '<div class="ne-head">' +
          '<button class="ne-icon" title="Change icon">' + (page.icon || "📝") + '</button>' +
          '<textarea class="ne-title" rows="1" placeholder="Untitled" maxlength="120" spellcheck="false">' + esc(page.title || "") + '</textarea>' +
        '</div>' +
        (page.ref ? '<div class="ne-ref">Linked to ' + esc(page.ref.label || page.ref.id) +
                    (page.ref.href ? ' · <a href="' + page.ref.href + '">open</a>' : "") + '</div>' : "") +
        '<div class="ne-blocks"></div>' +
        '<button class="ne-add">+ Add a block</button>' +
        '<div class="ne-foot"><span class="ne-status">Saved</span>' +
        '<span class="ne-tip">Markdown shortcuts work: # ## ### - 1. [] &gt; !! ``` ---  ·  press / for blocks</span></div>' +
      '</div>';
    renderBlocks();
  }

  /* ---------------------------------------------------------- slash menu */
  function openSlash(blockId, anchorEl) {
    closeSlash();
    var m = document.createElement("div");
    m.className = "ne-slash";
    m.innerHTML = '<input class="ne-slash-q" placeholder="Filter blocks…"><div class="ne-slash-list"></div>';
    document.body.appendChild(m);
    var r = anchorEl.getBoundingClientRect();
    var top = r.bottom + 6, left = r.left;
    if (top + 300 > window.innerHeight) top = Math.max(10, r.top - 306);
    m.style.top = top + "px"; m.style.left = Math.min(left, window.innerWidth - 280) + "px";
    slash = { el: m, blockId: blockId, q: "", sel: 0 };
    paintSlash();
    var q = m.querySelector(".ne-slash-q");
    q.addEventListener("input", function () { slash.q = q.value; slash.sel = 0; paintSlash(); });
    q.addEventListener("keydown", slashKey);
    q.focus();
  }
  function slashItems() {
    var q = (slash.q || "").toLowerCase();
    return TYPES.filter(function (t) { return !q || t.label.toLowerCase().indexOf(q) >= 0 || t.k.indexOf(q) >= 0; });
  }
  function paintSlash() {
    if (!slash) return;
    var items = slashItems();
    slash.el.querySelector(".ne-slash-list").innerHTML = items.length
      ? items.map(function (t, i) {
          return '<button class="ne-slash-i' + (i === slash.sel ? " on" : "") + '" data-k="' + t.k + '">' +
                 '<span class="ne-slash-ic">' + t.icon + '</span><span><b>' + t.label + '</b><i>' + t.hint + '</i></span></button>';
        }).join("")
      : '<div class="ne-slash-empty">No matching block</div>';
    [].forEach.call(slash.el.querySelectorAll(".ne-slash-i"), function (b) {
      b.addEventListener("mousedown", function (e) { e.preventDefault(); applySlash(b.dataset.k); });
    });
  }
  function slashKey(e) {
    if (!slash) return;
    var items = slashItems();
    if (e.key === "ArrowDown") { e.preventDefault(); slash.sel = Math.min(items.length - 1, slash.sel + 1); paintSlash(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); slash.sel = Math.max(0, slash.sel - 1); paintSlash(); }
    else if (e.key === "Enter") { e.preventDefault(); if (items[slash.sel]) applySlash(items[slash.sel].k); }
    else if (e.key === "Escape") { e.preventDefault(); var id = slash.blockId; closeSlash(); refocus(id); }
  }
  function applySlash(k) {
    var id = slash.blockId, b = blk(id);
    closeSlash();
    if (!b) return;
    var el = root.querySelector('.nb[data-id="' + id + '"] .nb-c');
    if (el) { b.html = el.innerHTML.replace(/^\/[^<]*/, ""); }
    setType(b, k);
    if (k === "divider") {
      var nb = { id: bid(), type: "p", html: "" };
      page.blocks.splice(idx(id) + 1, 0, nb);
      renderBlocks(nb.id); touch();
      return;
    }
    renderBlocks(id); touch();
  }
  function closeSlash() { if (slash) { slash.el.remove(); slash = null; } }
  function refocus(id) { var el = root.querySelector('.nb[data-id="' + id + '"] .nb-c'); if (el) placeCaret(el); }

  function setType(b, k) {
    b.type = k;
    if (k === "divider") b.html = "";
    if (k !== "todo") delete b.checked;
  }

  /* ---------------------------------------------------------- markdown */
  function tryMarkdown(b, el) {
    var txt = el.textContent;
    for (var i = 0; i < TYPES.length; i++) {
      var t = TYPES[i];
      if (!t.md) continue;
      if (txt === t.md || (t.md.slice(-1) === " " && txt.indexOf(t.md) === 0 && txt.length >= t.md.length)) {
        if (txt.indexOf(t.md) !== 0) continue;
        var rest = txt.slice(t.md.length);
        if (t.k === "divider" && txt !== "---") continue;
        if (t.k === "code" && txt !== "```") continue;
        b.html = t.k === "divider" || t.k === "code" ? "" : esc(rest);
        setType(b, t.k);
        if (t.k === "divider") {
          var nb = { id: bid(), type: "p", html: "" };
          page.blocks.splice(idx(b.id) + 1, 0, nb);
          renderBlocks(nb.id);
        } else renderBlocks(b.id, false);
        touch();
        return true;
      }
    }
    return false;
  }

  /* ---------------------------------------------------------- events */
  root.addEventListener("input", function (e) {
    var c = e.target.closest(".nb-c"); if (!c) return;
    var id = c.closest(".nb").dataset.id, b = blk(id); if (!b) return;

    if (!slash && c.textContent === "/") { openSlash(id, c); }
    // Browsers leave a lone <br> behind when a block is emptied, which breaks
    // the :empty placeholder. Clear it so the hint can come back.
    if (!c.textContent.length && /^(?:<br\s*\/?>)+$/i.test(c.innerHTML.trim())) c.innerHTML = "";
    b.html = c.innerHTML;
    if (b.type !== "code" && tryMarkdown(b, c)) return;
    touch();
  });

  root.addEventListener("keydown", function (e) {
    var c = e.target.closest(".nb-c"); if (!c) return;
    var wrap = c.closest(".nb"), id = wrap.dataset.id, i = idx(id), b = page.blocks[i];
    if (!b) return;

    if (e.key === "Escape" && b.type === "code") {
      e.preventDefault();
      var nb0 = { id: bid(), type: "p", html: "" };
      page.blocks.splice(i + 1, 0, nb0); renderBlocks(nb0.id); touch(); return;
    }

    if (e.key === "Enter" && !e.shiftKey) {
      if (b.type === "code") return;                       // newline inside code
      e.preventDefault();
      b.html = c.innerHTML;
      if ((b.type === "ul" || b.type === "ol" || b.type === "todo") && !c.textContent.trim()) {
        setType(b, "p"); b.html = ""; renderBlocks(id); touch(); return;
      }
      var tail = splitAtCaret(c);
      b.html = c.innerHTML;
      var nextType = (b.type === "h1" || b.type === "h2" || b.type === "h3" || b.type === "quote" || b.type === "callout") ? "p" : b.type;
      var nb = { id: bid(), type: nextType, html: tail };
      if (nextType === "todo") nb.checked = false;
      page.blocks.splice(i + 1, 0, nb);
      renderBlocks(nb.id, true); touch(); return;
    }

    if (e.key === "Backspace" && caretOffsetIsStart(c)) {
      if (b.type !== "p") { e.preventDefault(); setType(b, "p"); b.html = c.innerHTML; renderBlocks(id, true); touch(); return; }
      if (i > 0) {
        var prev = page.blocks[i - 1];
        e.preventDefault();
        if (prev.type === "divider") { page.blocks.splice(i - 1, 1); renderBlocks(id, true); touch(); return; }
        prev.html = clean(prev.html) + '<span id="__caret"></span>' + clean(c.innerHTML);
        page.blocks.splice(i, 1);
        renderBlocks(prev.id); touch(); return;
      }
    }

    if (e.key === "ArrowUp" && caretOffsetIsStart(c) && i > 0) {
      e.preventDefault();
      var p = root.querySelector('.nb[data-id="' + page.blocks[i - 1].id + '"] .nb-c');
      if (p) placeCaret(p, false); return;
    }
    if (e.key === "ArrowDown" && caretOffsetIsEnd(c) && i < page.blocks.length - 1) {
      e.preventDefault();
      var n = root.querySelector('.nb[data-id="' + page.blocks[i + 1].id + '"] .nb-c');
      if (n) placeCaret(n, true); return;
    }
  });

  root.addEventListener("paste", function (e) {
    var c = e.target.closest(".nb-c"); if (!c) return;
    e.preventDefault();
    var text = (e.clipboardData || window.clipboardData).getData("text/plain") || "";
    var lines = text.split(/\r?\n/);
    if (lines.length === 1) { document.execCommand("insertText", false, text); return; }
    var id = c.closest(".nb").dataset.id, i = idx(id), b = page.blocks[i];
    b.html = clean(c.innerHTML) + esc(lines[0]);
    var add = [];
    for (var j = 1; j < lines.length; j++) {
      if (!lines[j].trim() && j === lines.length - 1) continue;
      add.push({ id: bid(), type: "p", html: esc(lines[j]) });
    }
    page.blocks.splice.apply(page.blocks, [i + 1, 0].concat(add));
    renderBlocks(add.length ? add[add.length - 1].id : id, false);
    touch();
  });

  root.addEventListener("click", function (e) {
    var chk = e.target.closest("[data-check]");
    if (chk) {
      var b = blk(chk.dataset.check);
      if (b) { b.checked = !b.checked; chk.classList.toggle("on", b.checked); touch(); }
      return;
    }
    var h = e.target.closest("[data-handle]");
    if (h) { e.preventDefault(); openBlockMenu(h.dataset.handle, h); return; }
    if (e.target.closest(".ne-add")) {
      var nb = { id: bid(), type: "p", html: "" };
      page.blocks.push(nb); renderBlocks(nb.id); touch(); return;
    }
    if (e.target.closest(".ne-icon")) { pickIcon(e.target.closest(".ne-icon")); return; }
    // Click the empty space below the blocks to resume writing. Must be the
    // container itself — clicking the title used to land here and steal focus.
    if (e.target.classList && e.target.classList.contains("ne-blocks")) {
      var last = page.blocks[page.blocks.length - 1];
      if (last && last.type === "p" && !clean(last.html).trim()) { refocus(last.id); return; }
      var nb = { id: bid(), type: "p", html: "" };
      page.blocks.push(nb); renderBlocks(nb.id); touch();
    }
  });

  root.addEventListener("blur", function (e) {
    var c = e.target.closest && e.target.closest(".nb-c");
    if (!c || !c.isConnected) return;      // ignore blur from re-rendered nodes
    var wrap = c.closest(".nb"); if (!wrap) return;
    var b = blk(wrap.dataset.id);
    if (b) { b.html = c.innerHTML; touch(); }
  }, true);

  /* ---------------------------------------------------------- block menu */
  function openBlockMenu(id, anchor) {
    closeMenus();
    var b = blk(id); if (!b) return;
    var m = document.createElement("div");
    m.className = "ne-bmenu";
    m.innerHTML =
      '<div class="ne-bm-sec">Turn into</div>' +
      '<div class="ne-bm-types">' + TYPES.map(function (t) {
        return '<button data-turn="' + t.k + '"' + (t.k === b.type ? ' class="on"' : "") + '>' + t.icon + " " + t.label + "</button>";
      }).join("") + '</div>' +
      '<div class="ne-bm-sec">Block</div>' +
      '<button data-act="up">↑ Move up</button>' +
      '<button data-act="down">↓ Move down</button>' +
      '<button data-act="dup">⧉ Duplicate</button>' +
      '<button data-act="del" class="danger">✕ Delete</button>';
    document.body.appendChild(m);
    var r = anchor.getBoundingClientRect();
    var top = r.bottom + 6;
    if (top + 330 > window.innerHeight) top = Math.max(10, window.innerHeight - 340);
    m.style.top = top + "px";
    m.style.left = Math.min(r.left, window.innerWidth - 250) + "px";

    m.addEventListener("click", function (e) {
      var t = e.target.closest("[data-turn]"), a = e.target.closest("[data-act]");
      var i = idx(id);
      if (t) { setType(b, t.dataset.turn); closeMenus(); renderBlocks(id); touch(true); return; }
      if (!a) return;
      var act = a.dataset.act;
      if (act === "up" && i > 0) { page.blocks.splice(i - 1, 0, page.blocks.splice(i, 1)[0]); }
      if (act === "down" && i < page.blocks.length - 1) { page.blocks.splice(i + 1, 0, page.blocks.splice(i, 1)[0]); }
      if (act === "dup") { var c2 = JSON.parse(JSON.stringify(b)); c2.id = bid(); page.blocks.splice(i + 1, 0, c2); }
      if (act === "del") {
        page.blocks.splice(i, 1);
        if (!page.blocks.length) page.blocks.push({ id: bid(), type: "p", html: "" });
      }
      closeMenus(); renderBlocks(); touch(true);
    });
  }
  function pickIcon(anchor) {
    closeMenus();
    var set = ["📝","📌","💡","⚖️","🏦","🔑","📊","🧠","⚠️","✅","🔗","📅","🧾","🌍","🪙","🧩"];
    var m = document.createElement("div");
    m.className = "ne-bmenu ne-icons";
    m.innerHTML = set.map(function (s) { return '<button data-ic="' + s + '">' + s + "</button>"; }).join("");
    document.body.appendChild(m);
    var r = anchor.getBoundingClientRect();
    m.style.top = (r.bottom + 6) + "px"; m.style.left = Math.min(r.left, window.innerWidth - 230) + "px";
    m.addEventListener("click", function (e) {
      var b = e.target.closest("[data-ic]"); if (!b) return;
      page.icon = b.dataset.ic; anchor.textContent = page.icon; closeMenus(); touch(true);
    });
  }
  function closeMenus() {
    [].forEach.call(document.querySelectorAll(".ne-bmenu"), function (x) { x.remove(); });
  }
  // Held so destroy() can detach it — mount() runs again on every note
  // switch and drawer repaint, and these would otherwise pile up.
  function onDocDown(e) {
    if (!e.target.closest(".ne-bmenu") && !e.target.closest("[data-handle]") && !e.target.closest(".ne-icon")) closeMenus();
    if (slash && !e.target.closest(".ne-slash") && !e.target.closest(".nb-c")) closeSlash();
  }
  document.addEventListener("mousedown", onDocDown);

  renderShell();

  var titleEl = root.querySelector(".ne-title");
  function autosize() { titleEl.style.height = "auto"; titleEl.style.height = titleEl.scrollHeight + "px"; }
  autosize();
  titleEl.addEventListener("input", function () {
    page.title = titleEl.value.replace(/\n/g, " ");
    autosize(); touch();
  });
  titleEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); if (page.blocks[0]) refocus(page.blocks[0].id); }
    if (e.key === "ArrowDown" && titleEl.selectionStart === titleEl.value.length && page.blocks[0]) {
      e.preventDefault(); refocus(page.blocks[0].id);
    }
  });
  window.addEventListener("resize", autosize);

  return {
    focusFirst: function () { if (page.blocks[0]) refocus(page.blocks[0].id); },
    destroy: function () {
      clearTimeout(saveTimer);
      if (opts.onChange) opts.onChange(page);          // never lose a pending save
      closeSlash(); closeMenus();
      document.removeEventListener("mousedown", onDocDown);
      window.removeEventListener("resize", autosize);
    }
  };
}

/* ------------------------------------------------------------ preview */
function plain(page) {
  return (page.blocks || []).map(function (b) {
    var d = document.createElement("div"); d.innerHTML = clean(b.html || "");
    return d.textContent;
  }).join(" ").replace(/\s+/g, " ").trim();
}
function wordCount(page) { var t = plain(page); return t ? t.split(/\s+/).length : 0; }

return { mount: mount, TYPES: TYPES, plain: plain, wordCount: wordCount, clean: clean };
})();
