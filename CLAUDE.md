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
  automated suite (199 tests as of the phase 2 sync merge below), run before
  every change that touches `app.js`. Manually verified on real usage over
  the life of the app (midnight-crossing entries, mobile resize, etc. — see
  "Testing before you claim it works" above).
- **Google Drive sync, phase 1 — entries + categories** (2026-08-14): merged
  to `main` and live. Verified on two real devices (a laptop and a phone)
  with real account data, both directions:
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
- **Google Drive sync, phase 2 — weekly verdicts + week close-outs**
  (2026-08-15): merged to `main` and live. Verified on the same two real
  devices, both directions:
  - Verdict set on the phone appeared on the laptop after connect.
  - A verdict cleared on the laptop stayed cleared — the specific case this
    phase existed to get right (an absence must never be misread as "new"
    and resurrected; see hard rule 7).
  - A close-out note written on the laptop appeared on the phone.
  - All weeks and entries stayed intact throughout — no regression to
    phase 1's coverage.
  - A second look at what first appeared to be a duplication (16 categories
    shown vs. 14 expected) turned out to be a stale page, not a bug — the
    live Drive file itself held exactly 14 live categories with the two
    stale ones correctly tombstoned; a reload resolved it. Worth remembering
    this shape specifically: before treating a category-count mismatch as a
    sync bug, check the Drive file directly, since a stale local render can
    look identical to a real duplication from the screen alone.

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
  payload `syncEngine()` builds only ever contains categories, entries,
  verdicts, and close-outs.
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
- **Weekly verdicts and week close-outs sync too, as of the phase 2 work
  (see the backlog)** — `weeklyVerdicts`/`weekCloseouts` are nested maps
  keyed by week with no record ids of their own, a different shape from
  entries/categories, so their sync unit is a composite key instead:
  `weekIso+"|"+categoryId` for a verdict, `weekIso` alone for a close-out.
  A verdict's live value is a bare string, so its sync metadata can't live
  inline the way it does on an entry or category — it lives in a side
  table, `verdictMeta`, keyed by that same composite key. `verdictMeta` is
  never itself read as a signal that a record exists — `flattenVerdicts()`
  only ever iterates `weeklyVerdicts` (live) and `deletedVerdicts`
  (tombstones), and only *consults* `verdictMeta` to enrich a record it's
  already decided to emit — so a stray or stale `verdictMeta` entry can't
  cause a wrong merge decision. The invariant `migrateSyncFields()`
  maintains is stricter than "don't misread garbage," though: a
  `verdictMeta` entry is pruned whenever there's no live verdict behind it,
  even if a tombstone exists — a tombstone carries its own
  `updatedAt`/`updatedBy`, so a lingering `verdictMeta` copy for the same
  key would just be a second, potentially disagreeing, source of truth for
  the same fact. Verdicts get real tombstones (`deletedVerdicts`) because
  clearing one — tapping the same verdict button twice — is a real,
  reachable delete path today. Close-outs don't: their leaf
  (`weekCloseouts[weekIso]`) is already an object, so `updatedAt`/
  `updatedBy` go inline, same as entries/categories, and there's no
  tombstone container because no delete/reopen-to-clear path exists for a
  close-out yet — if one is ever added, tombstones get designed alongside
  it then, same rule as always, not retrofitted and not built ahead of
  need. `dedupeCategoriesByName()` also remaps any verdict pointing at a
  category id that loses a name-collision merge, the same way it already
  remaps `entries.cat` — required, not optional, once verdicts sync:
  without it, a verdict silently orphans on a dead category id the next
  time two devices' same-named categories collapse to one survivor. When
  that remap causes two verdicts (one from each side of the collision) to
  land on the same composite key, they're resolved by folding them
  through `mergeRecords()` itself, pairwise — the same six-case logic,
  including last-write-wins, rather than inventing a second conflict rule.

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
12. **Google Drive sync.** Shipping in two phases — tracked here explicitly
    because "sync is done" reading as "everything syncs" is exactly what let
    the phase 2 gap go unwritten-down the first time.
    - **Phase 1 (entries + categories): ~~done~~ — merged to `main` and live
      since 2026-08-14.** What shipped: the per-record merge engine (see hard
      rule 7, `SYNC-LESSONS.md`), an opt-in connect flow (a "Connect Google
      Drive" button — nothing before that click touches Google, an OAuth
      script, or the network), name-based category dedup for devices that
      have never synced before, including an automatic self-heal for
      categories that already diverged (see hard rules 7–8 and the data
      model's sync-fields entries), and a delete-with-reassignment picker so
      a duplicate category never has to be resolved by hand-editing entries.
      Verified against a real Google account across two real devices, both
      before and after the merge — see "What's live and verified" above for
      the full post-merge check. Genuinely conflicts with hard rules 2 and 4
      for anyone who opts in — both rules now carry the exact carve-out (see
      hard rule 4's note and the data model section's sync-fields entries)
      rather than being quietly broken.
    - **Phase 2 (weekly verdicts + week close-outs): ~~done~~ — merged to
      `main` and live since 2026-08-15.** Deliberately excluded from phase 1
      — `weeklyVerdicts`/`weekCloseouts` are nested maps keyed by week with
      no record ids, a different shape from entries/categories, and that
      exclusion was a real scope decision made at phase 1's design time, not
      an oversight discovered later. Composite key (`weekIso|categoryId` for
      verdicts, `weekIso` alone for close-outs) reuses `mergeRecords()`
      unmodified. Verdicts get a `verdictMeta` side table (metadata can't
      live inline because a verdict's live value is a bare string, not an
      object) plus real tombstones (`deletedVerdicts` — clearing a verdict by
      tapping it twice is a real, reachable delete path today). Close-outs
      get `updatedAt`/`updatedBy` inline (their leaf is already an object)
      and no tombstones (no delete/reopen-to-clear path exists yet — same
      rule as always, tombstones get designed *when* that capability is
      added, not before). Also required: `dedupeCategoriesByName()` extended
      to remap verdicts pointing at a category id that loses a name-collision
      merge, the same way it already remaps `entries.cat` — otherwise a
      verdict silently orphans on a dead category id, the same invisible-loss
      shape phase 1 kept finding. Verified on two real devices, both
      directions — see "What's live and verified" above.
13. **Friend's laptop feedback.** A friend is using Hours Ledger day-to-day
    on a laptop and has feedback on things that need attention. Specifics
    not yet gathered — placeholder so it isn't lost; fill in and re-slot
    into the ordered list once the actual items are known.
14. **Web app manifest logs two console warnings** — `"Manifest: property
    'start_url' ignored, URL is invalid"` and the same for `'scope'`. The
    manifest is built as a blob URL at runtime, so relative paths in it can't
    resolve against it. Harmless today (nothing currently depends on either
    field), but it affects Add to Home Screen, which needs a resolvable
    `start_url` to install as anything more than a bookmark. Not urgent —
    noted from real usage on the live site.
15. **Tombstone accumulation.** `deletedCategories`/`deletedVerdicts` (and
    to a lesser extent `deletedEntries`) only ever grow — nothing currently
    prunes an old tombstone. Observed for real: one real Drive file holds
    roughly 40 tombstones against 14 live categories after phase 1 and
    phase 2 testing. Harmless at this size (nothing reads them but the merge
    engine itself), but the file has no ceiling. Genuinely open question, not
    a known answer yet: is there a safe point at which an old tombstone can
    be dropped — e.g. once every device sharing a file has demonstrably seen
    it (how would that even be confirmed, with devices that sync
    intermittently and no server to track "last seen" per device?) — or does
    any pruning rule reintroduce exactly the resurrection risk tombstones
    exist to prevent (hard rule 7)? Needs its own design discussion before
    any code, same discipline as phases 1 and 2 — not a quick fix.

16. **Real-user bug batch (reported 2026-08-15)** — one real friend using
    Hours Ledger day-to-day on a laptop, plus Sebastian's own list. Logged
    here in full before any of it was built, per the project's own rule
    about surviving a `/clear`. Investigate-before-fix findings included
    where already known; build in the order below (bugs, then interaction,
    then polish), tests in the same commit wherever the testing section
    above requires one.
    - **(1) "Also put it on" can block saving.** Reported: today is Monday
      the 10th; picking Tuesday the 11th on the entry sheet's Date field
      deselects Monday in "Also put it on" without selecting Tuesday, and
      the sheet won't save with nothing picked. **Investigated, not yet
      reproduced from static reading**: the `fDay` `change` handler
      (`app.js`, the `fDaySyncedIdx` block) already does exactly the right
      thing on paper — it was written for this exact bug on 2026-08-10
      (`ba2fd57`) and moves the single Repeat toggle to match Date whenever
      the user hasn't touched Repeat directly. `saveSheet()` also already
      has a fallback for zero days picked (falls back to whichever day
      matches the Date field, or day 0) — so on today's code, saving
      shouldn't actually be blockable this way at all. Nothing since
      `ba2fd57` has touched this code. Needs a live repro (real browser or
      a jsdom harness against the real `openSheet`/`fDay`-change/`saveSheet`
      functions, not a reimplementation — see `SYNC-LESSONS.md`'s test
      isolation notes) before concluding whether this is stale-deployed-JS
      (`SYNC-LESSONS.md`'s "confirm the code under test is actually the
      code that's deployed") or a real remaining edge case. Build the repro
      first, same discipline as sync work.
    - **(2) Add entry (laptop) only fills one hour forward — root cause
      found.** The `addBtn` click handler always sets `end = start + 60`,
      full stop. The FAB's ("Log now") handler is the one that anchors to
      the actual current time when the target day is today
      (`mins = now rounded to 5min; end = mins if mins > start`) — that's
      why phone (which only exposes the FAB pre-fix, see item 7) behaves
      correctly and laptop (which only exposes `addBtn`) doesn't. Fix:
      give `addBtn` the same "anchor to now, if today" logic the FAB
      already has, rather than a flat +60. Once item 7 ships a desktop FAB
      using the same shared logic, this may collapse into "both buttons
      call the same helper" rather than staying two copies of the anchoring
      logic.
    - **(3) "Add a break" bar is an invisible full-width click target —
      root cause found.** `.breaktoggle` is a `<label>` (wrapping the
      checkbox and the "Add a break" text) styled `display:flex`, which
      makes it a block-level box that stretches to the sheet's full
      content width — and a `<label>` toggles its checkbox on a click
      anywhere in its own box, not just its visible content. Fix:
      constrain the label to its content width (e.g. `width:fit-content`
      or `display:inline-flex`) so only the checkbox and its text are
      clickable, per the report.
    - **(4) Can Hours Ledger ever trigger an interactive OAuth prompt
      without a click? Investigated — yes, and this is a real bug to
      fix.** `getAccessToken()` is the only path that can call the actual
      interactive `google.accounts.oauth2...client.requestAccessToken()`,
      and it is **not** gated behind a click: `scheduleDriveSync()` (which
      calls it via `runDriveSync()`) fires automatically after every
      `persist()` while `driveConnected` (line ~729) *and* unconditionally
      on every page load if `driveConnected` (line ~2126, `if
      (state.driveConnected) scheduleDriveSync();`). `getAccessToken()`
      only skips the network/Google entirely when a cached token is still
      valid (~1hr life, see `getCachedToken`); once that cache expires,
      the next debounced sync or the next page load calls
      `requestAccessToken()` with no user gesture anywhere in that call
      stack. Per `SYNC-LESSONS.md`'s own OAuth notes, GIS's silent-reauth
      increasingly fails under third-party-cookie blocking, meaning that
      call can surface real account-picker/consent UI — exactly the
      phone/Amazon symptom described — on a timer, not a press. This
      directly contradicts "the app should never initiate sign-in except
      from a deliberate button press." Fix direction (not yet built): when
      `getAccessToken()` has no valid cached token, the *automatic*
      (debounce/page-load) sync path should stop short of
      `requestAccessToken()` and instead surface a "Drive: reconnect
      needed" state on the existing button (same pattern already used for
      `driveSyncInFlight`/failure states) — only a real click should ever
      be allowed to open the interactive picker. The explicit
      "connectDrive" button click (already-connected "sync now" case) is a
      real gesture and can keep calling it as today.
    - **(5) Drag-selecting text in the entry sheet closes the sheet —
      root cause found.** `scrim`'s `click` listener closes on
      `ev.target===scrim`, but when a mousedown starts inside the sheet
      (e.g. dragging to select text in the Activity field) and the mouseup
      lands outside the sheet, the browser resolves the resulting `click`
      event's target to the nearest common ancestor of the two — `scrim`
      itself — so it reads as a genuine outside click. Fix: track whether
      `mousedown` itself landed on `scrim` and only close if both the
      press and the release did.
    - **(6) Native time picker doesn't self-close on laptop.** `fStart`/
      `fEnd`/break-row times are plain `<input type="time">` — there is no
      custom picker in this codebase to control. Whatever popup/stepper UI
      is staying open is the browser's own, largely outside page JS's
      reach. Best available fix: once a field's value is a complete valid
      time, call `.blur()` to hand focus (and, in most browsers, the
      native popup) away — needs verifying by hand in the actual browser
      involved, since this isn't observable in `selftest.html`'s
      real-logic harness (no native picker UI exists in that environment).
    - **(7) No floating "Log now" button on laptop.** `.fab` is
      `display:none` by default and only flips to `display:block` under
      `@media(max-width:820px)` (`styles.css`). The FAB's own click handler
      already has the correct "continue from now" logic (see item 2) —
      showing it above 820px too, positioned the same fixed
      bottom-right way, is mostly a CSS change; worth checking it doesn't
      collide with anything else fixed-positioned at desktop widths first.
    - **(8) Logo doesn't return to the main page.** `.wordmark` (`<h1>` in
      the masthead) has no click handler. Since this is a single-page app
      with no separate "pages," "return to main page" means a "home reset"
      action: close Review if open, drop back to week view, jump
      `weekStart` to the current week, close any open sheet.
    - **(9) "Connect Google Drive" button text overflows on phone.** Every
      *other* Drive-button state already uses a short "Drive: …" phrasing
      (`Drive: synced`, `Drive: syncing…`, `Drive: sync failed`, `Drive:
      disconnected after import…`) — only the initial, unclicked label in
      `index.html` is the longer "Connect Google Drive." Simplest fix
      consistent with the existing convention: shorten the default label
      itself (e.g. "Connect Drive") rather than a CSS-only patch.
    - **(10) Scroll trapping inside the log grid on phone — investigated,
      repro found.** Root cause is a timing gap in the grid's touch
      handling (`gridbody`'s `touchstart`/`touchmove` in `app.js`), not
      the `.gridscroll{overflow-x:auto}` container itself: `touchstart`
      arms a 350ms timer that commits to `dragging` (drag-select mode)
      purely on **holding still**, before any movement happens. If the
      user's finger is still resting on a slot when that timer fires, the
      very next `touchmove` — even the first frame of what the user means
      as an ordinary scroll swipe — hits `touchmove` with `dragging`
      already truthy, skips the "did this move far/fast enough to be a
      scroll" check entirely, and goes straight to `ev.preventDefault()`,
      capturing the rest of that touch gesture and blocking the page's
      native scroll for it. Direction can't disambiguate the two cases —
      a real drag-select and a real scroll both start as vertical motion —
      so this is a genuine ambiguity in the current heuristic, not a
      simple typo. **Deliberate repro, reproducible on demand regardless
      of zoom/device**: rest a finger motionless on any grid slot for
      over ~350ms *before* starting to swipe, then swipe down. This should
      trap the scroll every time. The zoom-level correlation in the
      original report is very likely incidental: zoomed-out slots are
      smaller and more fiddly to land a finger on precisely, which makes a
      brief involuntary pause before swiping more likely, not because zoom
      itself changes any of this code's behavior. Fix needs a decision,
      not just a patch — options include raising the 350ms threshold,
      requiring a minimum post-hold movement within a short window before
      fully committing to drag-select, or a visible cue the instant
      drag-mode arms (so an accidental hold can be released before it eats
      a scroll) — worth discussing before building rather than picking one
      unilaterally.

Do not add features that are not on this list without discussing them first.
Feature creep is the known failure mode of this project.
