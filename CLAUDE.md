# Hours Ledger

A weekly time tracker. You log the week you actually had in half-hour resolution,
see the totals per category, and decide what to keep, compress or cut.
Deployed as a static site on GitHub Pages. No backend, no accounts, no analytics.

Built and maintained by Sebastian Poulsen, who is learning to work with Claude Code
through this project. **Explain your reasoning as you go.** When there is more than
one sensible way to do something, say what the options were and why you picked one.
Teaching matters here as much as shipping.

---

## Hard rules — do not break these

1. **Never change the localStorage key `hours-ledger-v2` or the shape of the saved
   state without writing a migration first.** Real logged weeks live in that key.
   Silently orphaning them is the worst thing this codebase can do to its user.
   If the schema must change, bump to the next `-vN`, read the old key, convert,
   and keep it untouched until the new one is verified. (`hours-ledger-v1` is the
   retired predecessor, kept only as the source a one-time migration reads from —
   see `migrateFromOldKey()`/`migrateVerdicts()` in `app.js`.)
2. **No runtime dependencies.** No npm packages shipped to the browser, no
   frameworks, no CDN scripts. Google Fonts is the only external request and it
   must degrade cleanly when offline.
3. **No build step.** Files must be servable as-is by GitHub Pages. What is in the
   repo is what runs.
4. **No data leaves the browser.** No telemetry, no error reporting, no fetch to
   anything. The colophon promises this in writing; keep it true.
5. **Every destructive action must be undoable.** Deleting an entry, deleting a
   category, clearing a week, importing over existing data — all go through
   `snapshot()` before mutating. New destructive features do too.
6. **Ask before restructuring.** Propose the change and wait. Do not refactor
   broadly in a session that was asked for a small fix.

## Testing before you claim it works

There is no test suite. Verify manually, and say which you actually did:

- Log an entry, reload the page, confirm it is still there.
- Log something that crosses midnight (23:30–07:00) and confirm it splits across
  two days and appears correctly in both.
- Check the week totals still add up after your change.
- Resize below 820px and confirm the day view and the "Log now" button behave.
- Undo something destructive with Ctrl/Cmd+Z.

## Deploy

Push to `main`. GitHub Pages redeploys automatically, usually within a minute or
two, and caches for up to ten. There is nothing else to run.

---

## The data model

```js
{
  version: 2,
  settings: { startHour: 6, endHour: 24 },
  categories: [ { id, name, color } ],
  entries: {
    "2026-07-27": [ { id, label, cat, start, end } ]   // start/end = minutes from midnight
  },
  weeklyVerdicts: {
    "2026-07-27": { categoryId: 'keep'|'compress'|'cut' }   // keyed by that week's Monday
  }
}
```

- Entries are keyed by real date, so every week ever logged is retained.
- `cat` may be `null` — an uncategorised entry is deliberate, not an error state.
- Times are minutes since midnight, `0`–`1440`. Never store strings.
- A verdict is per category *per week* (keyed by that week's Monday), not global —
  cutting a category one week doesn't cut it the next. The weekly review view
  shows whichever verdict is set on the most weeks, ties shown as `"keep/cut"`
  etc., blank if none of the visible weeks have one set. A category with no key
  under a given week just means no verdict was chosen that week.
- Undo history lives separately under `hours-ledger-undo-v1`, last 12 states.

## How the code is organised

Three files: `index.html` (markup only), `styles.css`, and `app.js` — a single
IIFE containing storage → dates → time helpers → entry CRUD → render → colour →
modal → grid interaction → rail → nav/tools → weekly review.

It was one file because it originally had to survive being downloaded. It is
hosted now, so that constraint is gone, and it has already been split. `selftest.html`
(never linked from the real app) exercises the app's real logic in isolation via
a `TEST_MODE` switch — open it by hand before deploying anything that touches
`app.js`.

## Design constraints

The look is deliberate — accounting ledger paper. Do not drift toward generic
dashboard styling.

- Paper `#FAFAF7`, ledger stripe `#E8EFE6`, ink `#16211B`, rule `#C2CDC1`,
  muted `#6C7A70`, flag red `#B23A2F` (destructive and Drift only), grey `#9AA5A0`
  (uncategorised only).
- Type: Archivo for display, Spline Sans Mono for anything numeric or label-like.
  Numbers are always monospaced.
- Square corners everywhere. No border-radius, no drop shadows except the one on
  the mobile button.
- The grid itself stays plain. Decoration goes around it, never in it.
- The 168-hour bar at the top is the signature element. Unlogged time renders as
  visibly blank, not hidden and not excluded from the denominator. That discomfort
  is the product working as intended — do not "fix" it.

---

## Backlog, roughly in order

1. ~~Split into three files.~~ Done.
2. **Offline support.** A service worker so it opens on the train with no signal.
   Deliberately deprioritized for now (not a workflow gap for the current user) —
   still worth doing eventually, not a dead item.
3. ~~Weekly review view.~~ Done — last 4 weeks side by side, paged by full 4-week
   windows, majority verdict per category, % of that week's logged time per cell.
4. **Ideal-week layer.** A second grid where chosen blocks are placed first and
   everything else fits around them. This was in the original design and never got
   built. Arguably the whole point.
5. ~~Touch drag on the grid.~~ Done, including auto-scroll near the screen edge
   while dragging.
6. **Duplicate a week** as a starting point for the next one.
7. **Expand the color palette.** More options beyond the current 8 validated
   presets/hue-slider range. Low priority — a someday item, not a workflow gap.
8. **Recruit test people.** Share the link with a handful of real users, get
   structured feedback after a week or two of actual use. Do this *before*
   committing to any of the bigger items below — it should decide whether
   they're worth building at all, not the other way around.
9. **Account system + cross-device sync.** A genuine architectural pivot, not
   a feature — needs a backend, auth, and a database, and turns "no accounts,
   nothing leaves your browser" into "true unless you opt in." This directly
   conflicts with hard rules 2 and 4 above; if it moves forward, revisit those
   rules explicitly rather than quietly break them, and keep local-only mode
   working for anyone who doesn't want an account. Sequence after item 8.
10. **Native app store listing.** Probably a wrapped version of the existing
    web app (e.g. Capacitor) rather than a rewrite — only worth it if push
    notifications or app-store discoverability specifically matter. Depends on
    item 9: a phone app and a laptop both need the same sync layer underneath.
11. **Energy-level tracking.** An hourly energy check-in, separate from the
    time log, to spot patterns between energy and task timing. Real risk of
    scope drift — this is a different axis of data (how you felt, not what you
    did). If built, keep it a clearly optional layer beside the grid, not
    merged into it, or treat it as its own separate experiment entirely.

Do not add features that are not on this list without discussing them first.
Feature creep is the known failure mode of this project.
