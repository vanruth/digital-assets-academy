# Digital Assets Academy

A self-contained learning app on how digital assets work, written for people who have to make decisions about them — not for people who want a glossary. Content is current to **August 2026**.

Five parts:

- **Syllabus** — 10 modules, 52 lessons. Taxonomy, cryptography and consensus, programmability, scaling and the multi-chain landscape, stablecoins, the tokenised money hierarchy, asset tokenisation, market structure and custody, risk and capital, and a 2026 field map.
- **Quiz** — 244 questions across 10 units in a Duolingo-style path: hearts, XP, day streaks, a daily goal, unit unlocking, and a mistakes queue you can drill separately. Six question formats: multiple choice, select-all, true/false, typed answer, matching pairs and ordering.
- **Flashcards** — turn any unlocked glossary term into a card and review it on a Leitner schedule. Grade Again / Good / Easy; right answers push a card further out, wrong ones bring it straight back.
- **Glossary** — 192 terms. Each definition stays locked until you mark the lesson that introduces it as read; marking a lesson read tells you exactly which terms it just added.
- **Notes** — a Notion-style block editor with a slide-over drawer you can pull up while reading or mid-question. Lesson text can also be **highlighted and commented on**, and highlights can be sent straight into a note.

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

When you open the app and the last backup is more than 24 hours old, a bar appears offering a one-click backup. In Chrome and Edge you can **choose a folder once** (`Profile → Backups → Choose folder…`), after which backups are written there automatically with no click, for as long as the browser keeps the permission. Otherwise it hands you a download. Either way it fires at most once a day, and it only fires on days you actually open the app — which are the only days your progress changes.

Files are named `digital-assets-academy-<profile>-<date>.json` and are the same format as a manual export, so they import straight back through `Profile → Import file…`.

Turn it off with the `Daily backup` checkbox in the profile dialog.

## Structure

```
index.html                       app shell
assets/css/styles.css            all styling, light and dark
assets/js/store.js               profiles, per-profile state, glossary unlocking, backups
assets/js/notes.js               block editor
assets/js/app.js                 router, views, quiz engine
assets/js/data/curriculum.js     10 modules, 52 lessons
assets/js/data/questions.js      244 questions
assets/js/data/glossary.js       192 terms, each mapped to its lesson
sources.md                       every figure and date, with links
```

Asset URLs carry a `?v=` query in `index.html`. **Bump it when you deploy a change**, otherwise browsers will keep serving the previous JavaScript.

## Storage and privacy

Everything lives in `localStorage`: `da-academy-users-v1` for the profile list, then `da-academy-state-v1:<id>` and `da-academy-notes-v1:<id>` per profile. Nothing is sent anywhere — no analytics, no cookies, no network calls. Clearing site data resets everything; there is a per-profile reset on the Progress page.

## Editing the content

`curriculum.js`, `questions.js` and `glossary.js` are plain JavaScript objects with no build step between them and the page.

- **A lesson** — append to a module's `lessons` array.
- **A question** — append to `questions.js` with the matching `m` (module id) and `l` (lesson id). Quiz units chunk automatically at six questions per set, so the path resizes itself.
- **A glossary term** — append `{t, l, d}` to `glossary.js`, where `l` is the lesson id that should unlock it. The lesson page and the glossary both pick it up with no other changes.

## A note on the figures

Market sizes, licence counts and legislative dates are point-in-time as of August 2026. Several were moving fast when written — the GENIUS Act rulemaking, the CLARITY Act's Senate progress, the MiCA review, and tokenised RWA AUM in particular. `sources.md` lists where each came from. Check before relying on any of them.

Not investment advice.
