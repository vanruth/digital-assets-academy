# Digital Assets Academy

A self-contained learning app on how digital assets work, written for people who have to make decisions about them — not for people who want a glossary. Content is current to **August 2026**.

Two halves:

- **Syllabus** — 10 modules, 52 lessons. Taxonomy, cryptography and consensus, programmability, scaling and the multi-chain landscape, stablecoins, the tokenised money hierarchy, asset tokenisation, market structure and custody, risk and capital, and a 2026 field map.
- **Quiz** — 244 questions across 10 units in a Duolingo-style path: hearts, XP, day streaks, a daily goal, unit unlocking, and a mistakes queue you can drill separately.

Six question formats: multiple choice, select-all, true/false, typed answer, matching pairs and ordering.

## Running it

There is no build step, no framework and no dependencies. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
```

Then visit http://localhost:8080.

## Deploying

The whole thing is static files, so any static host works with no configuration.

**Vercel** — import the repository and accept the defaults. `vercel.json` sets the framework to none and the output to the repo root.

**Netlify** — import the repository and accept the defaults. `netlify.toml` sets the publish directory to the repo root and leaves the build command empty.

Neither needs environment variables, and there is no server side.

## Structure

```
index.html                       app shell
assets/css/styles.css            all styling, light and dark
assets/js/app.js                 router, quiz engine, progress tracking
assets/js/data/curriculum.js     10 modules, 52 lessons
assets/js/data/questions.js      244 questions
sources.md                       every figure and date, with links
```

## Progress and privacy

Everything — XP, streak, hearts, reading progress, quiz results, saved mistakes — is stored in `localStorage` under the key `da-academy-v1`. Nothing is sent anywhere; there are no analytics, no cookies and no network calls. Clearing site data resets progress, and there is a reset button on the Progress page.

## Editing the content

`curriculum.js` and `questions.js` are plain JavaScript objects with no build step between them and the page. To add a lesson, append to a module's `lessons` array. To add questions, append to the array in `questions.js` with the matching `m` (module id) and `l` (lesson id) — quiz units are chunked automatically at six questions per set, so the path adjusts itself.

## A note on the figures

Market sizes, licence counts and legislative dates are point-in-time as of August 2026. Several were moving fast when written — the GENIUS Act rulemaking, the CLARITY Act's Senate progress, the MiCA review, and tokenised RWA AUM in particular. `sources.md` lists where each came from. Check before relying on any of them.

Not investment advice.
