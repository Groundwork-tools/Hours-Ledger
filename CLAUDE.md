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
   anything. The colophon promises this in writing; keep it true. (A plain
   outbound `<a>` link the user chooses to click — like the Money Ledger link
   in the footer — isn't the app sending data; nothing is transmitted
   automatically. Google Drive sync — merged to `main` and live since
   2026-08-14, see the backlog — is the one deliberate exception, and only for someone who
   explicitly presses "Connect Google Drive": the colophon's privacy line
   itself changes for that person specifically, via `updateColophon()`, so
   the promise stays true rather than silently wrong for whoever opts in.)
5. **Every destructive action must be undoable.** Deleting an entry, deleting a
   category, clearing a week, importing over existing data — all go through
   `snapshot()` before mutating. New destructive features do too.
6. **Ask before restructuring.** Propose the change and wait. Do not refactor
   broadly in a session that was asked for a small fix.
7. **No sync operation may remove or overwrite an unacknowledged record.** Every
   syncable record (entries, categories) carries per-record `updatedAt`/`updatedBy`;
   sync decisions are made per-record, never by comparing one timestamp for a
   whole file. A record absent from one side is never treated as a deletion —
   only an explicit tombstone is. This rule is written *before* any sync code
   exists, as a spec to build against, not extracted afterward from an incident —
   see `SYNC-LESSONS.md`, the record of the incident that happened when a sibling
   project (Money Ledger) got this wrong the first time. Nobody who never presses
   "Connect Google Drive" is exposed to any of this — see hard rule 4.
8. **`DEFAULTS`' category ids, names, and colors are frozen once shipped — changing
   any of them requires a migration, the same as hard rule 1.** This isn't
   theoretical: it's the direct cause of a real duplication bug (see the data
   model's sync-fields entry below for the full story). `DEFAULTS`' hex colors
   were re-tuned once already, during earlier palette-validation work, before
   sync existed to make that dangerous. Do it again without a migration and
   every existing install duplicates its own starter categories the next time
   it syncs against a fresh one.

## Testing before you claim it works

`selftest.html` runs the app's real logic in isolation (see "How the code is
organised" below) — run it before deploying anything that touches `app.js`, and
say what it reported, not just that you ran it. For anything a script can't
reach, verify manually and say which you actually did:

- Log an entry, reload the page, confirm it is still there.
- Log something that crosses midnight (23:30–07:00) and confirm it splits across
  two days and appears correctly in both.
- Check the week totals still add up after your change.
- Resize below 820px and confirm the day view and the "Log now" button behave.
- Undo something destructive with Ctrl/Cmd+Z.

For sync/merge code specifically: a test lands in the *same commit* as the code
it covers, written and watched to fail against the old code first, not added
afterward as cleanup — this is the specific discipline that was missing for the
first ~24 hours of Money Ledger's sync existing, and it's why both of that
incident's data-loss bugs shipped before any test could have caught them.

## Deploy

Push to `main`. GitHub Pages redeploys automatically, usually within a minute or
two, and caches for up to ten. There is nothing else to run.

## What's live and verified

A running note of what's actually been confirmed working, and how — useful
for picking this back up cold. Suite passing is not the same claim as
"seen working on a real device with real data"; both are listed separately
on purpose.

- **Core grid/entries/undo/close-out/review**: covered by `selftest.html`'s
  automated suite (169 tests as of the Drive sync merge below), run before
  every change that touches `app.js`. Manually verified on real usage over
  the life of the app (midnight-crossing entries, mobile resize, etc. — see
  "Testing before you claim it works" above).
- **Google Drive sync** (2026-08-14): merged to `main` and live. Verified on
  two real devices (a laptop and a phone) with real account data, both
  directions:
  - Non-sync path on the laptop: clean, no console errors, entries persist —
    confirming the merge changed nothing for someone who never connects.
  - Phone connect: all 14 categories and all four logged weeks intact, one
    Drive file created, three newly-logged entries all reached it.
  - Laptop connect: pulled everything down, including an entry logged a
    minute earlier on the phone.
  - Both directions confirmed live: laptop→phone and phone→laptop edits
    both propagate.
  - The known pre-tombstone resurfacing case (see the data model's
    sync-fields entry on `dedupeCategoriesByName()`) was hit exactly as
    predicted — two already-diverged categories reappeared once on a fresh
    device's first connect — and resolved by deleting them once real
    tombstones exist; confirmed gone for good after a reload.

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
  },
  weekCloseouts: {
    "2026-07-27": { note: string, closedAt: isoString }   // keyed by that week's Monday
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
- A close-out is keyed the same way, one per week, written only when the user
  actually closes that week out. `note` is a single optional freeform line —
  there is deliberately no separate notes-browsing view; it only ever surfaces
  back inside that week's own close-out sheet. Only a week strictly before the
  current one can ever be opened for close-out (see `openCloseout()` in
  `app.js`) — the ritual looks back at a finished week, never judges one still
  in progress.
- Undo history lives separately under `hours-ledger-undo-v1`, last 12 states.
- **Sync fields exist only once a device has connected Google Drive sync at
  least once — a device that never does sees none of this, ever.** Once
  connected, every entry and category gains `updatedAt` (ISO string) and
  `updatedBy` (a `DEVICE_ID`, itself in its own untracked localStorage key,
  never part of synced state); two new top-level maps, `deletedEntries` and
  `deletedCategories`, hold tombstones (`{id, date?, updatedAt, updatedBy,
  deletedAt}`) for anything removed after that point — a deleted record is
  never just omitted, because an omission and an intentional delete look
  identical to a merge that has no other way to tell them apart. See
  `migrateSyncFields()`/`syncEngine()` in `app.js` and `SYNC-LESSONS.md` for
  the reasoning; hard rule 7 is the constraint this data shape exists to
  satisfy.
- **Categories from two devices that have never shared an id are reconciled by
  name alone** — `normalizeName()` (trimmed, lowercased) then
  `dedupeCategoriesByName()`, run in `syncEngine()` immediately after the
  ordinary id-based merge, on the merged result. This is a deliberate
  *reversal* of the checkpoint-1 design, which matched on exact name **and**
  color and refused anything less, on purpose — "err toward under-merging":
  a missed match just leaves two visible categories to sort out by hand,
  while a wrong match silently reassigns real entries, so the checkpoint-1
  design took the safer failure mode. That held up under extensive testing —
  until real second-device testing (not synthetic tests) surfaced a genuine
  duplication bug: 8 identically-named default categories duplicated on a
  second device's first connect. The cause wasn't seeding or id randomness —
  it was that `DEFAULTS`' colors had actually changed across this app's own
  history (the earlier palette-validation pass), so a months-old install and
  a freshly-seeded one disagreed on hex color for every untouched default,
  and exact name+color matching correctly refused to merge them. The
  circumstances that justified "err toward under-merging" no longer held:
  color is a display preference the user can change with a hue slider at
  any time, never a stable identity signal, and — once hard rule 8 fixes
  `DEFAULTS`' ids and colors going forward — the only records left for this
  path to ever see are genuine user-created name collisions, which is a
  narrower, more acceptable risk than the duplication that was actually
  shipping. Matching is case/whitespace-insensitive because real data
  contains exactly this kind of variance (a category literally named
  `"Errands / Shower "`, trailing space and all, that must still match
  `"errands / shower"`). Two decoupled tie-break rules, not one: the
  surviving **id** is whichever record is *older* (minimizes churn — a
  freshly-migrated device's records get stamped "now" during migration, so
  "newest wins the id" would flip the survivor practically every time a new
  device connects, the opposite of the goal), while the surviving
  **name/color** come from whichever record was updated most *recently*
  (display fields should reflect the latest real edit, same as everywhere
  else in this app). Because this is one always-on mechanism rather than a
  one-time reconciliation step, it doubles as an automatic, idempotent
  self-heal for categories that had already diverged before this fix
  existed — no manual repair action needed, it collapses on the very next
  ordinary sync. Every merge it performs is logged via `console.log`
  (category name, surviving id, merged-away ids, entries reassigned) so a
  total that looks wrong can be traced without a UI.
- **`driveConnected` (boolean) lives inside `state` itself, not a separate
  key like `DEVICE_ID`** — so undoing "before Drive connect" (the snapshot
  `connectDrive()` takes as its first action) reverts the whole operation,
  connection status included, rather than leaving a device half-connected
  with its data rolled back underneath it. It never travels to Drive; the
  payload `syncEngine()` builds only ever contains categories and entries.
  An imported file's `driveConnected` is deliberately never honored on
  import, even if the file says `true` — see the import handler in
  `app.js` — so opening an arbitrary backup can never silently resume a
  background network sync. When that import turns an actually-connected
  device's `driveConnected` from `true` back to `false`, `importBackupJson()`
  says so on the Drive button itself (`"Drive: disconnected after import —
  reconnect to resume"`) rather than leaving it on whatever it said before —
  found from real usage, the same silent-desync shape as the sync-on-load
  fix above: local saves keep working normally, so nothing else on screen
  would have hinted that Drive had stopped hearing about them. Only fires
  when there was a real connection to lose; importing into a device that
  was never connected leaves the button on its correct default.
- **Known, accepted gap: undo/redo while connected doesn't itself trigger a
  Drive push.** `undo()`/`redo()` go through `applyState()`, which writes
  straight to `localStorage` and never calls `persist()` — so the specific
  change an undo/redo just reverted isn't, by itself, what schedules the
  next sync. Deliberately left as-is rather than fixed alongside the import
  and `driveSyncApplyingRemote` fixes above: unlike those two, this one
  self-heals on its own within one step — either the next edit's ordinary
  `persist()` call (which syncs whatever `state` currently is, not a diff,
  so the reverted content goes up regardless) or the next page load (the
  sync-on-load catch-up already covers this). The only genuinely silent
  window is undo/redo followed by neither — leaving the tab open indefinitely
  with no further edit and no reload — judged too narrow to be worth the
  same treatment. If this ever needs revisiting, it's not a new bug; it's
  this exact tradeoff being reconsidered.

## How the code is organised

Three files: `index.html` (markup only), `styles.css`, and `app.js` — a single
IIFE containing storage → dates → time helpers → sync engine → Drive OAuth →
Drive network calls → entry CRUD → render → colour → modal → grid interaction
→ rail (category delete-with-reassignment lives here) → nav/tools → weekly
review → weekly close-out → Drive connect flow & ongoing sync.

It was one file because it originally had to survive being downloaded. It is
hosted now, so that constraint is gone, and it has already been split. `selftest.html`
(never linked from the real app) exercises the app's real logic in isolation via
a `TEST_MODE` switch — open it by hand before deploying anything that touches
`app.js`. `sync-dryrun.html` (same isolation, also never linked) runs migration
and a first push/pull against a copy of a real export, entirely inside
`TEST_MODE` storage — see the Google Drive sync backlog item and
`SYNC-LESSONS.md` for why this exists as its own tool rather than folded into
`selftest.html`'s automated suite (it's a manual, one-real-file-at-a-time check,
not a repeatable assertion).

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
8. **Account system + cross-device sync.** A genuine architectural pivot, not
   a feature — needs a backend, auth, and a database, and turns "no accounts,
   nothing leaves your browser" into "true unless you opt in." This directly
   conflicts with hard rules 2 and 4 above; if it moves forward, revisit those
   rules explicitly rather than quietly break them, and keep local-only mode
   working for anyone who doesn't want an account.
9. **Native app store listing.** Probably a wrapped version of the existing
   web app (e.g. Capacitor) rather than a rewrite — only worth it if push
   notifications or app-store discoverability specifically matter. Depends on
   item 8: a phone app and a laptop both need the same sync layer underneath.
10. **Energy-level tracking.** An hourly energy check-in, separate from the
    time log, to spot patterns between energy and task timing. Real risk of
    scope drift — this is a different axis of data (how you felt, not what you
    did). If built, keep it a clearly optional layer beside the grid, not
    merged into it, or treat it as its own separate experiment entirely.
11. ~~Weekly close-out ritual.~~ Done — a "Close out last week" entry point
    (masthead button, a Monday-only banner that's gone by Tuesday, and
    reopening a past week from Review) that shows that week's totals with
    verdict-setting, exactly where its unlogged time fell, and one optional
    freeform note. Only ever opens a week that's actually finished, never the
    one still in progress. Added outside the numbered order above after an
    explicit "is this actually needed or will it cloud the purpose" check —
    kept deliberately narrow (no notes-browsing view, no required action) so
    it stays a look-back ritual and not a second product.
12. ~~Google Drive sync.~~ **Done — merged to `main` and live since
    2026-08-14.** What shipped: the per-record merge engine (see hard rule 7,
    `SYNC-LESSONS.md`), an opt-in connect flow (a "Connect Google Drive"
    button — nothing before that click touches Google, an OAuth script, or
    the network), name-based category dedup for devices that have never
    synced before, including an automatic self-heal for categories that
    already diverged (see hard rules 7–8 and the data model's sync-fields
    entries), and a delete-with-reassignment picker so a duplicate category
    never has to be resolved by hand-editing entries. Verified against a
    real Google account across two real devices, both before and after the
    merge — see "What's live and verified" above for the full post-merge
    check. Genuinely conflicts with hard rules 2 and 4 for anyone who opts
    in — both rules now carry the exact carve-out (see hard rule 4's note
    and the data model section's sync-fields entries) rather than being
    quietly broken.
13. **Friend's laptop feedback.** A friend is using Hours Ledger day-to-day
    on a laptop and has feedback on things that need attention. Specifics
    not yet gathered — placeholder so it isn't lost; fill in and re-slot
    into the ordered list once the actual items are known.

Do not add features that are not on this list without discussing them first.
Feature creep is the known failure mode of this project.
