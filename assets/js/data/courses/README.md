# Bundled courses

Courses written into the repo. Unlike a course you build in the app, these are
part of the deployment: they appear on **every device** you open the app on,
survive a cleared browser, and cost nothing against the ~5 MB `localStorage`
budget that user-made courses share.

They cannot be deleted from inside the app — a profile that does not want one
hides it instead, from the library.

## Adding one

1. Write `assets/js/data/courses/<id>.js` in this shape:

   ```js
   /* Bundled course — validate with tools/validate-course.py before committing. */
   (window.DA_BUNDLED = window.DA_BUNDLED || []).push(
   { "id": "trade-finance", "title": "...", ... }
   );
   ```

   `tools/example-course.js` is a complete, valid example.

2. Add one line to `index.html`, next to the commented placeholder:

   ```html
   <script src="assets/js/data/courses/<id>.js?v=X.Y.Z"></script>
   ```

3. Validate before committing:

   ```bash
   python3 tools/validate-course.py
   ```

4. Bump the `?v=` on every asset in `index.html`, or browsers will serve the
   old JavaScript.

## Shape

```
id          lowercase, hyphens only — also the storage key for progress
title       shown in the library and header
subtitle    one line
icon        a single unicode symbol
source      { "kind": "bundled", "note": "shown in the footer" }
modules[]   id, title, tagline, icon, summary, outcomes[], lessons[]
lessons[]   id, title, minutes, body (HTML), key[]
questions[] id, m (module id), l (lesson id), type, ... , explain
glossary[]  t (term), l (lesson id that unlocks it), d (definition)
```

Lesson bodies use `<p> <h4> <ul> <ol> <li> <strong> <em>`, `<table class="data">`
for comparisons, and `<div class="callout">` for a single key insight. Anything
else is unstyled — the validator warns about it.

Question types and their required fields:

| type | fields |
|---|---|
| `mc` | `options[]`, `answer` (index) |
| `multi` | `options[]`, `answers[]` (indexes) |
| `tf` | `answer` (boolean) |
| `type` | `accept[]` (lowercase), `hint` |
| `match` | `pairs[[left, right]]` |
| `order` | `items[]` in the correct order |

Every question needs `explain`. Quiz units chunk at six questions per set, so
twelve questions on a module gives two sets.
