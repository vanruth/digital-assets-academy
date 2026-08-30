#!/usr/bin/env python3
"""Catch references to things that no longer exist.

Twice during development an edit removed a block of functions that other code
still called, and the app only failed at runtime. This is a deliberately
simple static check: collect every name each file defines, then flag calls and
identifiers that nothing defines and that are not browser or project globals.

Heuristic, not a type checker. It exists to catch deletions, not to be clever.

Usage:  python3 tools/check-js.py
"""
import re, sys, glob, os

FILES = [
    "assets/js/store.js", "assets/js/courses.js", "assets/js/notes.js",
    "assets/js/annotate.js", "assets/js/builder.js", "assets/js/app.js",
]

BROWSER = {
    "window","document","localStorage","sessionStorage","indexedDB","location","navigator","history",
    "console","JSON","Math","Date","Object","Array","String","Number","Boolean","RegExp","Error","Promise",
    "Map","Set","WeakMap","Symbol","parseInt","parseFloat","isNaN","isFinite","encodeURIComponent",
    "decodeURIComponent","setTimeout","setInterval","clearTimeout","clearInterval","requestAnimationFrame",
    "fetch","Blob","File","FileReader","FormData","URL","URLSearchParams","AbortController","Event",
    "CustomEvent","MouseEvent","KeyboardEvent","InputEvent","DataTransfer","Node","NodeFilter","Range",
    "getSelection","alert","confirm","prompt","atob","btoa","structuredClone","TextEncoder","TextDecoder",
    "Intl","Function","undefined","NaN","Infinity","arguments","this","typeof","instanceof","IntersectionObserver",
    "true","false","null",
    "MutationObserver","ResizeObserver","performance","crypto","DocumentFragment","HTMLElement","Element",
    "HTMLAnchorElement","Uint8Array","ArrayBuffer",
}
PROJECT_GLOBALS = {
    "DA","DA_COURSES","DA_NOTES","DA_ANN","DA_BUILD","DA_CURRICULUM","DA_QUESTIONS","DA_GLOSSARY","DA_BUNDLED",
}
KEYWORDS = {
    "if","for","while","switch","catch","return","function","var","let","const","new","delete","void",
    "typeof","in","of","do","else","try","finally","throw","case","break","continue","default","with",
    "class","extends","super","yield","await","async","static","get","set",
}

def defined_names(src):
    names = set()
    names |= set(re.findall(r"\bfunction\s+([A-Za-z_$][\w$]*)", src))
    names |= set(re.findall(r"\b(?:var|let|const)\s+([A-Za-z_$][\w$]*)", src))
    # var a = 1, b = 2;
    for chunk in re.findall(r"\b(?:var|let|const)\s+([^;\n]+)", src):
        for part in chunk.split(","):
            m = re.match(r"\s*([A-Za-z_$][\w$]*)", part)
            if m:
                names.add(m.group(1))
    # parameters
    for params in re.findall(r"function[^(]*\(([^)]*)\)", src):
        for p in params.split(","):
            p = p.strip()
            if re.fullmatch(r"[A-Za-z_$][\w$]*", p):
                names.add(p)
    # object literal method shorthand: name: function
    names |= set(re.findall(r"([A-Za-z_$][\w$]*)\s*:\s*function", src))
    return names

def strip_noise(src):
    """Blank out comments and string bodies with a left-to-right scan.

    Regex passes are not safe here: an apostrophe inside a double-quoted
    string, or "//" inside a URL, makes them swallow real code. Newlines are
    preserved so reported line numbers stay honest.
    """
    out, i, n = [], 0, len(src)
    while i < n:
        c = src[i]
        nxt = src[i + 1] if i + 1 < n else ""
        if c == "/" and nxt == "/":
            while i < n and src[i] != "\n":
                i += 1
            continue
        if c == "/" and nxt == "*":
            i += 2
            while i < n and not (src[i] == "*" and i + 1 < n and src[i + 1] == "/"):
                out.append("\n" if src[i] == "\n" else " ")
                i += 1
            i += 2
            continue
        if c in "\"'`":
            # Only template literals may span lines. If a quote is not closed
            # on its own line it was not a string opener, so give up on it and
            # resync rather than swallowing the rest of the file.
            quote, j, multiline = c, i + 1, (c == "`")
            while j < n and src[j] != quote:
                if src[j] == "\\":
                    j += 2
                    continue
                if src[j] == "\n" and not multiline:
                    break
                j += 1
            if j >= n or src[j] != quote:
                out.append(" ")
                i += 1
                continue
            out.append('""')
            out.append("\n" * src.count("\n", i, j))
            i = j + 1
            continue
        out.append(c)
        i += 1
    return "".join(out)

def main():
    all_defined = set()
    sources = {}
    for f in FILES:
        if not os.path.exists(f):
            print(f"✗ missing file: {f}")
            return 1
        raw = open(f, encoding="utf-8").read()
        src = strip_noise(raw)
        sources[f] = src
        all_defined |= defined_names(src)

    known = all_defined | BROWSER | PROJECT_GLOBALS | KEYWORDS
    problems = 0
    for f, src in sources.items():
        seen = {}

        # 1. Called: name(
        for m in re.finditer(r"(?<![.\w$])([A-Za-z_$][\w$]*)\s*\(", src):
            name = m.group(1)
            if name in known:
                continue
            before = src[max(0, m.start() - 6):m.start()]
            if re.search(r"\b(?:get|set)\s+$", before):      # object literal accessor
                continue
            seen.setdefault(name, (src.count("\n", 0, m.start()) + 1, "calls %s()" % name))

        # 2. Passed or assigned as a value: setTimeout(fn, x), x = fn;, {k: fn}
        #    This is the shape that bit us — a deleted function referenced but
        #    never called with parentheses.
        for m in re.finditer(r"(?:[(,=:]|\breturn)\s*([A-Za-z_$][\w$]*)\s*(?=[,);\]])", src):
            name = m.group(1)
            if name in known:
                continue
            seen.setdefault(name, (src.count("\n", 0, m.start()) + 1, "references %s" % name))

        for name, (line, what) in sorted(seen.items(), key=lambda kv: kv[1][0]):
            print(f"✗ {f}:{line}  {what}, which nothing defines")
            problems += 1

    if problems:
        print(f"\n{problems} unresolved reference(s).")
        return 1
    print(f"✓ {len(FILES)} files, no unresolved references ({len(all_defined)} names defined)")
    return 0

if __name__ == "__main__":
    sys.exit(main())
