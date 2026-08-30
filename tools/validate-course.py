#!/usr/bin/env python3
"""Check a bundled course file before it is committed.

Usage:  python3 tools/validate-course.py assets/js/data/courses/*.js
        python3 tools/validate-course.py            # every bundled course

Catches the things that break the app at render or grade time: missing ids,
questions pointing at lessons that do not exist, answer indexes out of range,
glossary terms attached to nothing, duplicate ids, and empty bodies.
"""
import json, re, sys, glob, os

QUESTION_FIELDS = {
    "mc":    ["options", "answer"],
    "multi": ["options", "answers"],
    "tf":    ["answer"],
    "type":  ["accept"],
    "match": ["pairs"],
    "order": ["items"],
}
ALLOWED_TAGS = {"p","h4","ul","ol","li","strong","em","br","table","thead","tbody","tr","th","td","div","q","code"}

def extract(path):
    src = open(path, encoding="utf-8").read()
    i = src.find("push(")
    if i < 0:
        raise ValueError("not a bundled course file: no push( found")
    start = src.index("{", i)
    end = src.rindex("}")
    return json.loads(src[start:end + 1])

def check(course, path):
    errs, warns = [], []
    def E(m): errs.append(m)
    def W(m): warns.append(m)

    for f in ("id", "title", "modules"):
        if not course.get(f):
            E(f"missing {f}")
    if errs:
        return errs, warns

    if not re.fullmatch(r"[a-z0-9][a-z0-9-]*", course["id"]):
        E(f"id {course['id']!r} must be lowercase letters, digits and hyphens")

    lesson_ids, module_ids = set(), set()
    for mi, m in enumerate(course.get("modules", []), 1):
        if not m.get("id"):
            E(f"module {mi} has no id"); continue
        if m["id"] in module_ids:
            E(f"duplicate module id {m['id']}")
        module_ids.add(m["id"])
        if not m.get("title"):
            E(f"module {m['id']} has no title")
        lessons = m.get("lessons") or []
        if not lessons:
            E(f"module {m['id']} has no lessons")
        for li, l in enumerate(lessons, 1):
            if not l.get("id"):
                E(f"module {m['id']} lesson {li} has no id"); continue
            if l["id"] in lesson_ids:
                E(f"duplicate lesson id {l['id']}")
            lesson_ids.add(l["id"])
            if not l.get("title"):
                E(f"lesson {l['id']} has no title")
            body = (l.get("body") or "").strip()
            if not body:
                E(f"lesson {l['id']} has an empty body")
            elif len(body) < 200:
                W(f"lesson {l['id']} body is only {len(body)} chars")
            for tag in set(re.findall(r"<\s*([a-zA-Z0-9]+)", body)):
                if tag.lower() not in ALLOWED_TAGS:
                    W(f"lesson {l['id']} uses <{tag}>, which the stylesheet does not style")
            if not l.get("key"):
                W(f"lesson {l['id']} has no key takeaways")

    qids = set()
    for qi, q in enumerate(course.get("questions") or [], 1):
        tag = q.get("id") or f"#{qi}"
        if not q.get("id"):
            E(f"question {tag} has no id")
        elif q["id"] in qids:
            E(f"duplicate question id {q['id']}")
        qids.add(q.get("id"))
        t = q.get("type")
        if t not in QUESTION_FIELDS:
            E(f"question {tag} has unknown type {t!r}"); continue
        if not q.get("q"):
            E(f"question {tag} has no text")
        if not q.get("explain"):
            W(f"question {tag} has no explanation")
        for f in QUESTION_FIELDS[t]:
            if f not in q:
                E(f"question {tag} ({t}) is missing {f}")
        if q.get("m") and q["m"] not in module_ids:
            E(f"question {tag} points at module {q['m']}, which does not exist")
        if q.get("l") and q["l"] not in lesson_ids:
            E(f"question {tag} points at lesson {q['l']}, which does not exist")
        opts = q.get("options") or []
        if t == "mc":
            if not isinstance(q.get("answer"), int) or not (0 <= q["answer"] < len(opts)):
                E(f"question {tag} answer index is out of range")
            if len(opts) < 2:
                E(f"question {tag} needs at least two options")
        if t == "multi":
            ans = q.get("answers") or []
            if not ans:
                E(f"question {tag} has no correct answers")
            for a in ans:
                if not isinstance(a, int) or not (0 <= a < len(opts)):
                    E(f"question {tag} answer index {a} is out of range")
            if len(ans) == len(opts):
                W(f"question {tag} marks every option correct")
        if t == "tf" and not isinstance(q.get("answer"), bool):
            E(f"question {tag} answer must be true or false")
        if t == "type" and not [a for a in (q.get("accept") or []) if str(a).strip()]:
            E(f"question {tag} has no acceptable answers")
        if t == "match":
            pairs = q.get("pairs") or []
            if len(pairs) < 2:
                E(f"question {tag} needs at least two pairs")
            for pr in pairs:
                if not isinstance(pr, list) or len(pr) != 2:
                    E(f"question {tag} has a malformed pair")
        if t == "order" and len(q.get("items") or []) < 2:
            E(f"question {tag} needs at least two items to order")

    terms = set()
    for g in course.get("glossary") or []:
        if not g.get("t") or not g.get("d"):
            E("a glossary entry is missing its term or definition"); continue
        if g["t"] in terms:
            W(f"glossary term {g['t']!r} appears twice")
        terms.add(g["t"])
        if g.get("l") and g["l"] not in lesson_ids:
            E(f"glossary term {g['t']!r} unlocks on lesson {g['l']}, which does not exist")
        elif not g.get("l"):
            W(f"glossary term {g['t']!r} has no lesson, so it can never unlock")

    for m in course.get("modules", []):
        if not any(q.get("m") == m.get("id") for q in course.get("questions") or []):
            W(f"module {m.get('id')} has no questions, so its quiz unit will be empty")

    return errs, warns

def main():
    paths = sys.argv[1:] or sorted(glob.glob("assets/js/data/courses/*.js"))
    if not paths:
        print("No bundled courses found. Nothing to check.")
        return 0
    bad = 0
    for path in paths:
        name = os.path.basename(path)
        try:
            course = extract(path)
        except Exception as e:
            print(f"✗ {name}: {e}")
            bad += 1
            continue
        errs, warns = check(course, path)
        lessons = sum(len(m.get("lessons") or []) for m in course.get("modules", []))
        head = (f"{name}: {len(course.get('modules', []))} modules, {lessons} lessons, "
                f"{len(course.get('questions') or [])} questions, {len(course.get('glossary') or [])} terms")
        if errs:
            bad += 1
            print(f"✗ {head}")
            for e in errs:
                print(f"    ERROR  {e}")
        else:
            print(f"✓ {head}")
        for w in warns:
            print(f"    warn   {w}")
    return 1 if bad else 0

if __name__ == "__main__":
    sys.exit(main())
