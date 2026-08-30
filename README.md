# Academy

A self-contained learning app that holds **many courses**. Digital Assets Academy is the one that ships with it; everything else you make yourself — from a topic, from your own files and notes, or from a course file someone sent you.

Each course gets the same machinery:

- **Syllabus** — modules and lessons you read, mark off, highlight and comment on.
- **Quiz** — a Duolingo-style path with hearts, XP, day streaks, unit unlocking and a mistakes queue. Six question formats: multiple choice, select-all, true/false, typed answer, matching pairs and ordering.
- **Glossary** — terms that unlock as you read the lesson that introduces them.
- **Flashcards** — any unlocked term, reviewed on a Leitner schedule.
- **Notes** — a Notion-style block editor with a slide-over drawer.

Progress, glossary, highlights, flashcards and notes are tracked **per course, per profile**.

## The bundled course

**Digital Assets Academy** — 10 modules, 52 lessons, 244 questions and 192 glossary terms on how digital assets work, current to **August 2026**. Taxonomy, cryptography and consensus, programmability, scaling, stablecoins, the tokenised money hierarchy, asset tokenisation, market structure and custody, risk and capital, and a 2026 field map. Every figure is sourced in [sources.md](sources.md).

## Making a course

Three routes, in **Courses → New course**:

**From a topic.** Say what you want to learn and how deep to go. Generation calls Claude directly from the browser using **your own Anthropic API key**, entered once and kept in this browser.

Why your key: the app is static and the repo is public, so there is no server to hold a secret and no way to ship one safely. Bring-your-own-key is the pattern Anthropic's direct browser access header exists for. The key is stored under its own storage key, outside your profile, so it is **never written into a backup**, and it is sent to nobody but Anthropic. Remove it any time from the builder.

**From your own material.** Paste text, or add `.txt`, `.md`, `.csv`, `.json` or `.html` files. The material is given priority over the model's own knowledge. PDFs and Word documents are not read yet — convert or paste them. URLs are attempted, but almost every site blocks cross-origin reads, so pasting the text is far more reliable.

**Without a key at all.** **Download a brief** writes your topic, material and settings to a Markdown file with the course JSON schema attached. Hand it to any assistant, then bring the result back through **Import a course file**.

**Written into the repo.** A course committed under `assets/js/data/courses/` is part of the deployment: it appears on every device, survives a cleared browser, and costs nothing against the storage budget that user-made courses share. See [that folder's README](assets/js/data/courses/README.md) for the shape, and validate before committing:

```bash
python3 tools/validate-course.py
```

Courses can also be exported and imported as JSON, so one can be shared or moved between browsers.

## Running it

No build step, no framework, no dependencies. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
```

## Deploying

Static files only, so any static host works with no configuration.

**Vercel** — import the repository and accept the defaults. `vercel.json` sets the framework to none and the output to the repo root.

**Netlify** — import the repository and accept the defaults. `netlify.toml` sets the publish directory to the repo root and leaves the build command empty.

Neither needs environment variables, and there is no server side.

## Notes

The editor is block-based: each block is its own type, and you can convert between them freely.

- **Markdown shortcuts** at the start of a block: `#`, `##`, `###` for headings, `-` for a bullet, `1.` for a numbered item, `[]` for a to-do, `>` for a quote, `!!` for a callout, ` ``` ` for code, `---` for a divider.
- **Slash menu** — press `/` in an empty block to pick a block type.
- **Block handle** — the `⠿` on hover opens turn-into, move, duplicate and delete.
- **Enter** splits a block; **Backspace** at the start of a block resets its type, then merges it into the one above. In a code block, Enter makes a newline and Escape exits.
- **Cmd/Ctrl + J** opens the notes drawer from anywhere, including mid-question. Keyboard input inside the drawer never reaches the quiz.
- Notes auto-save as you type. A note opened from a lesson or module is linked to it, and the drawer offers to create one when the page you are on does not have a note yet.
- Any note can be downloaded as Markdown.

## Hearts

Hearts are a stake, not a timer — **nothing refills by waiting.** A wrong answer costs one and the question returns later in the same set. Run out and you clear a **recovery round**: three questions you have already missed, drawn from your mistakes queue. Clear it and all five hearts come back immediately. Reading a lesson also returns one.

If you would rather drill without any stake, turn hearts off in the profile dialog. Wrong answers then cost nothing and questions simply repeat until you get them right.

## Highlights and comments

Select any passage in a lesson to get a toolbar: four highlight colours, a comment, or copy. Click an existing highlight to edit its comment, change its colour or remove it. Everything is listed in a panel under the lesson, and **Send to my notes** drops the lot into that lesson's note as quotes with your comments underneath.

Highlights are stored as character offsets into the lesson text plus the quoted passage itself. If the wording of a lesson is ever edited, a highlight relocates itself by searching for its quote, and is flagged in the panel rather than silently dropped if it cannot be found.

## Profiles

There is no server, so there are no accounts in the authenticated sense — **profiles are local to one browser on one device.** Each profile keeps its own XP, streak, hearts, reading progress, quiz results, glossary and notes, and switching between them is instant. Click the profile chip in the top right to add, rename, switch, delete, export or import.

To move a profile to another browser or machine, **export** it — that writes a JSON file containing everything — and **import** it on the other side. That is the honest limit of a static site; making progress follow you around automatically would need a backend (an auth provider plus a database), which this deliberately does not have.

## Backups

Progress lives in one browser, so the app backs itself up rather than relying on a scheduled job — nothing outside the browser can read `localStorage`, so a cron on your machine would have nothing to export.

**A backup covers every course under the profile** — progress on all of them, plus the full content of any course you made, so restoring on a new machine brings back courses that only ever existed in the old browser. Your API key is deliberately excluded.

When you open the app and the last backup is more than 24 hours old, a bar appears offering a one-click backup. In Chrome and Edge you can **choose a folder once** (`Profile → Backups → Choose folder…`), after which backups are written there automatically with no click, for as long as the browser keeps the permission. Otherwise it hands you a download. Either way it fires at most once a day, and it only fires on days you actually open the app — which are the only days your progress changes.

Files are named `digital-assets-academy-<profile>-<date>.json` and are the same format as a manual export, so they import straight back through `Profile → Import file…`.

Turn it off with the `Daily backup` checkbox in the profile dialog.

## Structure

```
index.html                       app shell
assets/css/styles.css            all styling, light and dark
assets/js/courses.js             course registry, import/export, validation
assets/js/builder.js             material intake and course generation
assets/js/store.js               profiles, per-course state, glossary unlocking, backups
assets/js/notes.js               block editor
assets/js/app.js                 router, views, quiz engine
assets/js/annotate.js            highlights and margin comments
assets/js/data/*.js              the bundled Digital Assets course
sources.md                       every figure and date, with links
```

Asset URLs carry a `?v=` query in `index.html`. **Bump it when you deploy a change**, otherwise browsers will keep serving the previous JavaScript.

## Storage and privacy

Everything lives in `localStorage`: `da-academy-users-v1` for the profile list, `da-academy-courses-v1` for the course registry, `da-academy-course-v1:<courseId>` for course content, `da-academy-state-v1:<profileId>:<courseId>` for progress, and `da-academy-notes-v1:<profileId>` for notes. An Anthropic key, if you set one, lives at `da-academy-anthropic-key` and is excluded from exports. Nothing is sent anywhere — no analytics, no cookies, no network calls. Clearing site data resets everything; there is a per-profile reset on the Progress page.

## Editing the content

`curriculum.js`, `questions.js` and `glossary.js` are plain JavaScript objects with no build step between them and the page.

- **A lesson** — append to a module's `lessons` array.
- **A question** — append to `questions.js` with the matching `m` (module id) and `l` (lesson id). Quiz units chunk automatically at six questions per set, so the path resizes itself.
- **A glossary term** — append `{t, l, d}` to `glossary.js`, where `l` is the lesson id that should unlock it. The lesson page and the glossary both pick it up with no other changes.

## A note on the figures

Market sizes, licence counts and legislative dates are point-in-time as of August 2026. Several were moving fast when written — the GENIUS Act rulemaking, the CLARITY Act's Senate progress, the MiCA review, and tokenised RWA AUM in particular. `sources.md` lists where each came from. Check before relying on any of them.

Not investment advice.
