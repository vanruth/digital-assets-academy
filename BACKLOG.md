# Backlog

Where work on this app gets written down. Add to it whenever something occurs to you — half-formed is fine, that is what **Inbox** is for.

Claude reads this file at the start of a session, so anything here can be picked up without re-explaining it.

**How to add something:** put it under the right heading, give it an ID from the next free number in that section, and write it however you like. The templates below are a prompt, not a rule.

---

## Inbox

Anything not yet thought through. No format required — a sentence is enough.

- _(empty)_

---

## User stories

> **US-n — Short title**
> As a **[who]**, I want **[what]**, so that **[why]**.
> **Acceptance criteria**
> - [ ] Something observable that must be true
> **Notes:** anything that would otherwise get lost.

### US-1 — Sync progress across devices
As a learner, I want my progress to follow me between my laptop and my phone, so that I can study in gaps without losing my streak.
**Acceptance criteria**
- [ ] Signing in on a second device restores XP, streak, reading progress, glossary, highlights, cards and notes
- [ ] Signed-out use still works exactly as it does today
- [ ] Existing local profiles migrate up on first sign-in without loss
**Notes:** Supabase design already scoped — magic-link auth, one `profiles` row per profile with `jsonb` state, one row per note, RLS on `auth.uid()`. Needs a Supabase project (Ruth's account) before anything can be built. Parked 2026-08-29, not rejected.

### US-2 — Notes live in Notion
As someone who already runs their study life in Notion, I want my app notes to be real Notion pages, so that they sit alongside everything else instead of being trapped in one browser.
**Acceptance criteria**
- [ ] Each note maps to a Notion page; headings, bullets, to-dos, quotes, callouts and code survive the round trip
- [ ] Editing in either place converges rather than clobbering
**Notes:** needs a Vercel serverless function — Notion's API blocks browser calls and the token cannot be shipped client-side. Good fit for notes, poor fit for progress state (2,000-char property limit, ~3 req/sec).

### US-3 — Backup watchdog
As someone who studies in bursts, I want to be told when my backups have gone stale, so that I find out before a browser wipe rather than after.
**Acceptance criteria**
- [ ] A scheduled job checks the backup folder each morning
- [ ] It alerts only when the newest file is older than a set threshold
**Notes:** blocked on choosing a backup folder in the app first. This is the only part of a scheduled task that can do real work, since `localStorage` is unreachable from outside the browser.

---

## Technical debt

> **TD-n — Short title** · _impact_ · what it costs us and what fixing it involves.

### TD-1 — No tests at all
Every change is verified by hand in a browser. The quiz engine, the offset maths behind highlights, and the profile merge on import are all logic that deserves tests and has none. A regression would be found by Ruth, not by CI.
**Fix:** the pure functions come out first — offsets, Leitner scheduling, merge, markdown detection — under any small runner. Needs a decision on whether a `package.json` is acceptable in a repo that currently has no build step.

### TD-2 — Manual cache-busting
`index.html` carries a hand-written `?v=` on every asset. It has been bumped by hand on every release so far and forgetting it ships stale JavaScript to anyone with a warm cache.
**Fix:** either a tiny build step that hashes filenames, or accept it and add a release checklist. Currently the single most likely way to ship a "it works locally" bug.

### TD-3 — `app.js` is one big file
~70 KB holding the router, six views, the quiz engine, the profile dialog and the backup UI. Navigating it is getting slow and merge conflicts would be ugly with more than one author.
**Fix:** split views into modules. No bundler needed — plain `<script>` tags already work.

### TD-4 — Content is point-in-time
Every figure in the syllabus and glossary is August 2026. Market sizes, licence counts and legislative dates will rot, and nothing in the app signals age beyond a footer line.
**Fix:** consider per-figure dating, or a "last reviewed" stamp per module, plus a periodic refresh pass against `sources.md`.

### TD-5 — Safari evicts storage after 7 days
Safari clears script-written storage for sites not visited in a week, so a gap in study can wipe a profile. Mitigated by backups, not solved.
**Fix:** properly solved only by US-1. Until then the app could warn Safari users explicitly rather than relying on the README.

### TD-6 — Annotator rebuilds the lesson body on every repaint
`DA_ANN` resets `innerHTML` to pristine and re-wraps all marks on each change. Fine at current lesson sizes, wasteful in principle, and it forces `wrapTables()` to run again afterwards.
**Fix:** only if a lesson ever gets long enough to feel it. Listed so the coupling with `wrapTables` is not a surprise later.

### TD-7 — No offline support
The app is fully static and stores everything locally, so it *could* work offline, but there is no service worker and a cold load with no network fails.
**Fix:** a small service worker caching the shell and data files.

---

## Bugs

> **BUG-n — Short title** · steps · expected · actual · status

### BUG-1 — Notes made from the Notes tab are not linked to a lesson
**Steps:** Notes tab → **+ New** → title it after a lesson.
**Expected:** arguably it should offer to link to the lesson you were last reading.
**Actual:** `ref` is null, so the drawer will not surface it when you return to that lesson.
**Status:** open, low. Working as designed — only the drawer links notes — but it surprised Ruth on the first real note, which is usually a sign the design is wrong.

---

## Done

Kept so the history of decisions is visible.

- **Editor listener leak** — `DA_NOTES.mount()` added document and window listeners on every call and `destroy()` never removed them; they accumulated on every note switch and drawer repaint. Fixed 2026-08-29, and `destroy()` now flushes a pending save rather than dropping it.
- **Title not editable** — click-to-focus for the area below the blocks fired on the title too and bounced the caret into the body. Fixed 2026-08-29.
- **Title would not wrap** — was an `<input>`; now an auto-growing textarea. Fixed 2026-08-29.
- **Placeholder appeared to duplicate** — shown on every empty block; now only the focused one, plus the first block while the note is blank. Fixed 2026-08-29.
- **Hearts made you wait** — replaced the 20-minute refill with recovery rounds, a heart for reading a lesson, and a switch to turn hearts off. 2026-08-29.
- **Imported profiles collided by name** — two profiles both called "You" with no way to tell them apart. Fixed 2026-08-29.
