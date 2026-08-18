# Hours Ledger

A weekly time tracker. You log the week you actually had in half-hour resolution,
see the totals per category, and decide what to increase, keep or cut.
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
9. **A boolean guard flag must always have a reset path that doesn't depend
   on the async operation it's guarding actually completing.** `flag=true`
   right before an async call, with the only `flag=false` living inside
   that call's own success/callback path, means the flag is stuck `true`
   forever the moment that call simply never calls back — not errors,
   silence. Hit twice in three days on real, reachable code, not a
   hypothetical: `driveSyncApplyingRemote` stuck `true` when `persist()`
   threw (fixed with `try/finally`, since `persist()` is synchronous - an
   exception is guaranteed to unwind through a `finally`), and
   `driveSyncInFlight`/the `connectDrive` button's own `disabled` state
   stuck `true` when Google's account picker was dismissed by closing it
   directly rather than clicking anything inside Google's own flow -
   GIS's `requestAccessToken()` callback only fires on an actual
   completion (a token, or an explicit `access_denied`), never on a
   silent close, so nothing was left to ever flip the flag back
   (`getAccessToken`'s `withGisTimeout` wrapper, added 2026-08-15, closes
   this one - see the backlog batch below). `try/finally` is the right
   tool when the guarded operation is synchronous; a **timeout** is the
   right tool when it's async and the third-party API gives no reliable
   "this will never complete" signal of its own. Audited every boolean
   guard flag in `app.js` against this rule when the second instance was
   found: exactly these two existed, both now safe. Check this rule
   before adding any new one.

   **A fast path is not a substitute for the guaranteed reset, even a
   good one.** `withGisTimeout`'s 25s original backstop made the flag
   technically unstuck, but a real person watching a dead-looking button
   for 25 silent seconds reasonably concludes it's broken — which is
   exactly what happened, twice, on a real device, even after the stuck-
   flag bug itself was genuinely fixed. The fix for *that* isn't a
   shorter number alone: `getAccessToken`'s `armFocusFastPath` listens
   for the parent tab regaining focus (a real OAuth popup closing
   normally hands focus back) and resolves in under a second in the
   common case — but this is a **hint, not the mechanism**. It has two
   known ways to mislead: a false positive (alt-tabbing away and back
   while the picker is still genuinely open looks identical to a close)
   and a total miss (no separate popup window, hence no focus signal at
   all, if this browser ever routes GIS through FedCM instead). Both are
   harmless *specifically because* the timeout backstop's own
   "genuine-but-late success still gets cached" behavior means an
   over-eager fast-path resolution never loses real sign-in work — it
   just means the button re-offers a tap that turns out to be
   unnecessary once the still-open flow finishes on its own a moment
   later. **Do not remove the backstop timeout on the theory that the
   focus fast path already handles this** — the fast path's own
   reliability depends on the backstop catching every case it misses,
   not the other way around. If the backstop is ever removed, the FedCM
   case (no popup, no focus signal) reintroduces the original stuck-
   forever bug from a different angle. The button also now visibly
   reflects the in-flight state itself (`disabled`, "Drive: signing
   in…") rather than looking tappable while silently doing nothing if
   pressed — the same "state lied about itself" shape as `driveConnected`
   /`driveNeedsReconnect` above, just for a shorter-lived state.

   **One more instance of the identical shape, found by real-device
   testing of the fast path itself**: a genuine sign-in completing
   *after* the fast path or backstop had already given up left the
   button reading "Drive: tap to resume syncing" — false — for an
   indefinite window, until an unrelated future tap or a reload
   happened to notice the token `withGisTimeout` had already cached.
   Caching alone isn't the same promise as the UI being honest about
   what just happened. `handleTokenSuccess` closes this: `settle()`'s
   return value distinguishes "this call actually won" from "this
   arrived after something else already resolved it," and on a late
   arrival — with no `cb` left to call, the original caller already
   moved on — it runs `runDriveSync(false)` directly so the button
   catches up immediately instead of waiting for whatever happens to
   trigger the next sync. Every new async resolution path added to this
   flow needs this same question asked of it: not just "does the data
   end up correct" but "does anything visible ever go stale in between."

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

For anything touching touch behavior or mobile layout specifically: verify on
a real device via a branch preview *before* merging, not after. Both the
grid's scroll trap and the time input's auto-close were shipped once already
as phone fixes verified only on a laptop — `selftest.html` and a desktop
browser can exercise the JS logic and the DOM, but neither can reproduce real
touch dispatch or a real device's rendering engine (a headless Chromium
sandbox is a different engine from mobile Safari's WebKit, and doesn't
promote layers or dispatch touch the same way — see the item 10 saga in the
backlog for exactly what that gap let through twice). `raw.githack.com` off
a feature branch serves the real files uncached, so a fresh push is testable
within moments — use it for this category of change specifically, not just
whenever convenient.

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
- **Real-user bug batch** (2026-08-15): merged to `main` and live. Items
  1–9 and 11 confirmed by Sebastian on a real device before the merge —
  item 1 as a closed non-issue (cache artifact), the rest as working
  fixes; item 4 specifically went three real-device rounds (the stuck
  `driveSyncInFlight` flag, the 25s-silence-reads-as-broken UX, the
  late-token-leaves-the-button-lying bug) before it was actually done —
  see `SYNC-LESSONS.md` for why the suite staying green throughout all
  three wasn't evidence either way for that one code path. **Item 10
  (`touch-action:pan-x` on `.gridscroll`) merged unverified, by explicit
  decision** — Sebastian judged waiting on his friend's schedule wasn't
  worth blocking eleven already-verified fixes for a single, isolated
  CSS property whose failure mode is "no change," not breakage. **Update,
  2026-08-17: the friend's device confirmation did land, and it found a
  real regression, not a confirmation** — see the backlog's item 10
  continuation below for the full story (the fix's own `touch-action`
  property was blocking a fresh touch from scrolling the page at all when
  it started inside the grid). Now properly fixed and verified on both
  Sebastian's device and his friend's — see the entry below.
- **Six-item real-user batch — close-out button visibility, Review's FAB,
  close-out sheet outside-click, verdict scale rename, bar hover tooltip,
  weekday ticks removed** (2026-08-16): merged to `main` and live. All
  six confirmed by Sebastian directly on the branch before merge: the
  close-out button correctly disappears once last week is closed; Log
  now hides in Review and returns via Back to log; the close-out sheet
  closes on an outside click while a drag-select-release-outside still
  leaves it open; Increase/Keep/Cut renders in the right order including
  in Review's own tally; the bar's hover tooltip is smooth and positioned
  correctly; the weekday labels/ticks are gone. `selftest.html`:
  259/259, including fail-first-confirmed coverage for the close-out
  button fix and the verdict-scale sync self-heal (a stale un-updated
  device pushing a fresh "compress" now clears within the same sync
  exchange it arrives in, not on a later reload — see the data model's
  verdict-fields entry).
- **Phone scroll trap + time-input auto-close, two regressions from
  earlier fixes** (2026-08-17): merged to `main` and live. Both were
  phone bugs that had only been verified on a laptop the first time
  around — see the process note in "Testing before you claim it works"
  above, added because of exactly this. Verified on **two** real
  devices (Sebastian's and his friend's), via a `raw.githack.com`
  preview off the feature branch before merging: the grid no longer
  traps vertical scroll starting from inside it, stop-and-resume works,
  the original item 10 symptom hasn't returned, horizontal scroll is
  intact at both a 6–24 and a full 24h day range, and the native time
  picker no longer auto-closes on phone at all (desktop keeps closing
  only on the conclusive two-same-segment-digits signal, no timer).
  `selftest.html`: 259/259.
- **Modal scroll lock (iOS Safari)** (2026-08-18): merged to `main` and
  live. See backlog item 17 for the full diagnosis and the design
  decisions (counter-based lock, `overscroll-behavior:contain`,
  `scrollTop` reset on open, the `.scrim`-as-terminator fallback on
  record). Verified via a `raw.githack.com` preview before merging, on a
  real iPhone (Chrome/WebKit) and a laptop: all three original leak
  symptoms fixed, outside-tap-to-close still works, the on-screen
  keyboard doesn't interfere, repeated open/close is stable, the grid's
  drag-to-log is unaffected, and the close-out sheet's nested scroll
  behaves correctly. `selftest.html`: 292/292.
- **Weekly verdicts silently reverting, compress-sweep toast, undo
  coverage** (2026-08-18): merged to `main` and live. See backlog item 18
  for the full diagnosis, including a real fix that only turned out to
  be a partial one on first pass (a test-harness race patched at two
  call sites, then found to affect four more and fixed at its actual
  source). Verified before merge: the real Drive file and both real
  devices' local storage checked directly and found clean of the stale
  `"compress"` records that caused this; undo confirmed on a real device
  across every category in a real week, all deselecting correctly with
  no reappearance. `selftest.html`: 302/302, re-run three times for
  flakiness and fail-first re-confirmed with the corrected test harness.

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
    "2026-07-27": { categoryId: 'increase'|'keep'|'cut' }   // keyed by that week's Monday
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
- **`driveNeedsReconnect`/`driveReconnectAttemptedThisSession` (both
  in-memory only, never persisted, reset on every load)** exist for the
  same silent-desync shape one more time, from a third direction: a Drive
  access token silently expiring (~1hr life) mid-session, on a device that
  still looks fully connected. Without this, the automatic sync paths
  (page-load catch-up, the post-edit debounce) would either open an
  interactive Google account picker with no click behind it (the actual
  bug — see the backlog batch below) or, once that's closed off, would
  otherwise just quietly stop reaching Drive with nothing on screen to
  say so, the same "entries save locally, nothing hints they've stopped
  syncing" shape as the import and `driveSyncApplyingRemote` fixes above.
  `driveNeedsReconnect` flips the `connectDrive` button to a visible
  "Drive: tap to resume syncing" state instead of failing silently; a
  capture-phase `pointerdown` listener on `document` resolves it from
  whatever the user taps next anywhere in the app — deliberately not a
  dedicated button, since requiring one defeats the point of a ledger
  that's supposed to stay out of the way. Both fields are session-scoped
  on purpose, same as `driveSyncInFlight`: a fresh load always starts
  clean, and a dismissed/failed attempt only suppresses auto-retry for
  that one episode, not forever, so a later, separate expiry can still
  resolve itself smoothly.
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
   still worth doing eventually, not a dead item. **Interacts with backlog item
   16.11**: `app.js` is now deliberately never browser-cached (a `?v=`+`Date.now()`
   bust on every load, to close a stale-JS bug that had cost three separate
   debugging sessions) — a service worker's own cache strategy for offline use
   has to be designed against that decision on purpose (e.g. the service worker
   itself becomes the one place `app.js` gets cached, with its own explicit
   invalidation on deploy) rather than either fighting the no-cache bootstrap or
   silently reintroducing the staleness risk item 16.11 exists to close. Read
   that item's reasoning before starting this one.
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

16. **Real-user bug batch (reported 2026-08-15) — ~~merged to `main`,
    live~~.** One real friend using Hours Ledger day-to-day on a laptop,
    plus Sebastian's own list. Items 1–9 and 11 confirmed by Sebastian on
    a real device before merging — see "What's live and verified" above.
    **Item 10 is the one exception**, merged unverified by explicit
    decision rather than blocked on the friend's schedule for a single,
    low-risk CSS property; still needs his confirmation to count as done
    by this file's own standard, same as everywhere else here.
    - **(1) "Also put it on" — investigated, not reproduced, confirmed
      closed.** Static reading found the `fDay`-change/`saveSheet`
      fallback logic already correct. Built an actual repro instead of
      trusting that reading: ran the full suite headless (0/199 failing)
      via a real Chrome binary, then added two direct assertions on the
      Repeat toggle's own `aria-pressed` state (not just the save outcome,
      which an existing test already covered) for the exact scenario
      reported — Monday deselects, Tuesday should auto-select. Both pass
      against current code. Per the standing rule this project already
      follows for a passing repro: not fixed, because nothing was broken.
      **Confirmed by Sebastian on a hard-refreshed browser: picking
      another day does auto-select it.** Cache artifact, not a bug — this
      exact shape is the reason item 11 below exists. Closed; the two new
      assertions stay in as permanent regression coverage.
    - **(2) Add entry (laptop) only filled one hour forward — fixed.**
      `addBtn`'s handler always set `end = start + 60`; the FAB's handler
      already anchored `end` to the real current time on today. Extracted
      the FAB's logic into a shared `defaultEntryTimes(dateStr)` and had
      both `addBtn` and `fab` call it, so the two entry points can't drift
      apart again — also folded in `addBtn`'s existing 23:30 clamp on the
      last entry's end, fixing a latent zero-length-entry edge case that
      existed in both copies once a day's last entry runs to exactly
      midnight. New real-clock `selftest.html` cases, same pattern as the
      FAB's own existing clock-dependent tests.
    - **(3) "Add a break" full-width click target — fixed.** `.breaktoggle`
      is a `<label>` that was `display:flex`, stretching to the sheet's
      full width; a label toggles its checkbox on a click anywhere in its
      own box. Swapped to `display:inline-flex` so only the checkbox and
      text are clickable. CSS-only.
    - **(4) Interactive OAuth without a click — fixed, and expanded beyond
      the original ask.** Confirmed the automatic sync paths (page-load
      catch-up, post-edit debounce) could reach the real
      `requestAccessToken()` with no gesture at all, whenever the cached
      token (~1hr life) had expired — the root cause of the phone/Amazon
      incident. Sebastian rejected a dedicated-button-only fix as adding
      friction; what's built instead: `getAccessToken(cb, interactive)`
      now refuses to call `requestAccessToken()` when `interactive` is
      false, and a capture-phase `pointerdown` listener on `document`
      resolves a pending reconnect from *whatever the user taps next,
      anywhere in the app* — not a dedicated button. `pointerdown` (not
      `click`) specifically because the grid's own touch handlers call
      `preventDefault()` on `touchend` in several places, which suppresses
      the synthetic `click` that would otherwise follow, so a click-based
      listener would have silently never fired for a tap on the grid
      itself — the single largest tappable surface in the app. Excludes
      the `connectDrive` button (has its own handler) and won't reprompt
      again this session after a dismissed/failed attempt until a token is
      actually obtained (`driveNeedsReconnect`/
      `driveReconnectAttemptedThisSession`, both in-memory only). The GIS
      script is pre-warmed on page load (the same inert JS-library fetch
      that already happened unconditionally before this change — no
      account interaction, nothing shown) so the eventual
      `requestAccessToken()` call runs synchronously off the real tap
      rather than behind an async script-load gap, which is what actually
      determines whether a browser treats a popup as gesture-backed.
      Verified by construction, not just by reasoning: grepped afterward
      and confirmed `requestAccessToken()` has exactly one call site
      (inside `getAccessToken`'s interactive branch) and
      `getAccessToken(..., true)` is only ever reached from the
      `connectDrive` button's own click or the pointerdown listener — no
      timer, no page-load path reaches it, by construction rather than by
      promise. `selftest.html` covers the listener's gating (fires on a
      real tap, excluded on the `connectDrive` button itself, doesn't
      reprompt twice in one episode) under `TEST_MODE`'s always-succeeds
      fake token; the interactive popup itself isn't testable that way by
      design (see `SYNC-LESSONS.md`) and needs a real connected device.
      **Real-device testing (2026-08-15) found a second, worse bug in
      this same flow**: dismissing the account picker by closing it
      directly (not clicking anything inside Google's own UI) left the
      `connectDrive` button doing nothing at all afterward — no popup, no
      reaction, permanently, until a full reload. Root cause: GIS's
      `requestAccessToken()` callback only fires on an actual completion
      (a token, or an explicit `access_denied`), never on a silent close,
      so nothing ever reset `driveSyncInFlight` back to `false` -
      `runDriveSync`'s own first line then blocked every future call,
      including the button's manual retry. Same class as
      `driveSyncApplyingRemote`'s earlier fix, now written up as hard
      rule 9. Fixed with `withGisTimeout()`, a wrapper guaranteeing
      `getAccessToken`'s callback fires exactly once regardless of
      whether GIS's own callback ever does (25s timeout; a genuine-but-
      late success past that window is still cached, so the very next
      attempt just works instead of prompting again). This also silently
      fixes a second, previously-unreported instance of the identical
      bug: `connectDrive`'s own first-ever-connect flow disables the
      button and only re-enables it inside the same never-guaranteed
      callback. Fail-first verified: a `TEST_MODE`-only hang simulation
      (`setTestHangToken`) reproduced the stuck flag against the
      pre-fix code (1/218 failing, the intended assertion), then passed
      once the timeout wrapper was added (0/218 failing).
      **Deliberate reproduction, precise**: get the button into "Drive:
      tap to resume syncing" (expire the cached token, then let an
      automatic sync attempt run), tap anything to raise the picker, then
      close the picker using the browser/OS's own close control — the
      window's X, a back-gesture, swiping it away — specifically *not*
      a "Cancel" or "Deny" link if Google's own screen offers one, since
      that path *does* fire the callback (with `access_denied`) and
      doesn't reproduce this. Pre-fix, the button goes permanently dead.
      **Confirmed working by Sebastian on a real device**, but the 25s
      wait itself was reported as broken, twice — silence for 25 seconds
      after a tap is indistinguishable from dead, so the fix wasn't
      "correct" until it was also fast and honest about its own state.
      Landed together, not separately (see hard rule 9's own addendum
      for the full reasoning): the backstop dropped to 10s (safe to
      shorten because a genuine-but-late success still gets cached
      regardless of the timeout — see `withGisTimeout`'s doc comment);
      `armFocusFastPath` resolves the common explicit-dismiss case in
      under a second via the parent tab regaining focus, as a hint
      layered in front of the backstop, not a replacement for it; and
      the button itself now shows `disabled`, "Drive: signing in…" for
      the duration of a live attempt, so a tap during that window simply
      can't happen rather than silently doing nothing — no toast needed,
      since a real `disabled` button never dispatches `click` at all.
      **What's automated vs. what needs a real device**: the guard-flag
      fix, the shortened backstop, the button's disabled/text state
      during an attempt, and the focus listener's own wiring (via a
      synthetic `focus` event dispatched at the real registered
      listener, distinguished from the backstop by a `viaFocus` flag on
      the resulting error rather than by timing, since headless virtual-
      time runs can't measure wall-clock elapsed time reliably) are all
      covered by `selftest.html`. What can't be: whether a *real* popup
      closing in a *real* browser actually fires a real `focus` event
      reliably enough to matter, which only a real device can confirm.
      Manual check: reach "Drive: signing in…" (expire the cached token,
      trigger a reconnect attempt), close the picker with the window's
      own X, and confirm the button flips to "Drive: tap to resume
      syncing" in well under a second rather than the old 10s wait.
      Deliberate false-positive check for the backstop specifically:
      reach "Drive: signing in…" again, but this time **don't close the
      picker** — alt-tab/Cmd-tab away to a different application entirely
      and back. The fast path should fire from the refocus alone (the
      button flips to "tap to resume" almost immediately) even though
      the real picker is still genuinely open in the background; then
      actually complete the sign-in in that still-open picker.
      **Confirmed by Sebastian, twice, real device**: no data was lost —
      the token really was cached — but the button stayed on "tap to
      resume syncing" indefinitely afterward, only updating once he
      tapped again or reloaded. `handleTokenSuccess` (added 2026-08-15)
      closes this: a late-arriving real success now runs
      `runDriveSync(false)` itself when nothing else is left to call it
      forward, so the button catches up to "Drive: synced" on its own
      within moments of the sign-in actually completing, not on the next
      unrelated trigger. Automated this time (`selftest.html`'s
      `setTestLateSuccessMs`, exercising the real `handleTokenSuccess`),
      fail-first confirmed (2/231 failing with the catch-up call
      disabled, 0/231 with it restored) — the false-positive repro above
      still needs a real device to confirm the button visibly catches up
      in practice, not just that the test suite is satisfied.
    - **(5) Drag-selecting text in the entry sheet closed the sheet —
      fixed.** `scrim`'s `click` listener checked `ev.target===scrim`, but
      a `click` event's target resolves to the nearest common ancestor of
      the `mousedown`/`mouseup` targets — a drag starting inside the sheet
      and releasing outside it resolves to `scrim` itself. Now tracks
      whether `mousedown` itself landed on `scrim` and only closes if both
      the press and the release did. New `selftest.html` case simulates
      the browser's actual click-target resolution for a drag-out gesture
      without needing a real drag.
    - **(6) Native time picker doesn't self-close on laptop — fixed, then
      found to have a real regression, then fixed again with a debounce.**
      No custom picker exists in this codebase to control. First version:
      once a time field's value becomes a complete valid `HH:MM`, `.blur()`
      hands focus away, closing the native popup in most browsers.
      **Real regression found afterward, on the same laptop**: clicking
      directly into a two-digit segment (no dropdown involved at all) and
      typing normally — e.g. minutes reads `00`, click it, type `1` then
      `0` for `:10` — lost the second keystroke. Cause, confirmed against
      the real handler rather than assumed: a native time input's `.value`
      can become a complete-looking `HH:MM` after a *single* keystroke on
      an ordinary typing cadence (typing `1` into a two-digit minute
      segment can commit to `:01` before a second digit arrives, not just
      on a fast type) — dispatching one synthetic `input` event shaped
      like that single keystroke made the old handler blur immediately,
      reproducing the exact symptom before touching any code. **Checked
      whether the two cases (dropdown pick vs. mid-keystroke) could be
      told apart directly before reaching for a debounce, not defaulted
      to one**: no property on a time input's `input` event distinguishes
      them — unlike `<input type=text>`'s `InputEvent.inputType`, time
      inputs expose no equivalent. If this is ever revisited, re-confirm
      that gap still holds before trying to build a "smarter" per-path
      check; it was a real dead end once already, not an oversight.
      Fix: debounce instead of blur-immediately —
      `TIME_INPUT_BLUR_DEBOUNCE_MS` (a single named constant, 500ms,
      chosen as a guess about typing speed and expected to need tuning
      either direction) — wait that long with no further `input` event on
      *that specific field* before blurring; another edit within the
      window cancels and reschedules. The debounce id lives on the
      element itself, not one shared timer, since `fStart`/`fEnd`/break
      rows can all be mid-edit independently. Tabbing between a field's
      own hour/minute segments fires no `input` event at all (confirmed,
      not assumed), so it never disturbs a pending timer either way — one
      of the four paths this had to keep working (single-digit minute,
      two-digit minute, tabbing between segments, a completed dropdown
      pick) turned out to need no special handling because the debounce's
      own trigger condition (an `input` event) never fires for it.
      **Testable this time, differently than the first version**:
      `document.activeElement` is meaningless inside `selftest.html`'s
      `display:none` sandbox iframe (the exact trap flagged in the first
      version of this entry, and documented in `SYNC-LESSONS.md`) — so
      the regression test spies on the `.blur()` *method call* itself
      instead of real focus state, which tests exactly what this fix's
      logic controls without needing real browser focus this environment
      structurally can't provide. Fail-first confirmed both ways: the new
      assertions fail against the pre-debounce code (2/234), and the
      original item 6 case — a completed value with no further edit —
      still resolves via the same debounce, one dropdown-shaped `input`
      event followed by silence. What's still not covered by the suite,
      same as the first version: whether a real native picker's own
      keystroke-by-keystroke internals actually behave the way this
      fix assumes on a real device — synthetic events can't drive that,
      only trusted OS-level input can, which needs a human typing at a
      real keyboard.

      **Fast path added on top (2026-08-16), after Sebastian confirmed
      the debounce worked but felt slow for ordinary two-digit entry.**
      No direct API exists for "how many digits have been typed" (no
      `selectionStart`/segment index for a time input), but there's an
      indirect signal that works: `changedTimeSegment()` compares each
      `input` event's value against that field's own previous value and
      reports which half — hour or minute — actually changed. If the
      *same* half changes on two consecutive edits, that can only mean
      its second digit just landed (a 2-digit segment has no third digit
      coming) — close immediately, no need to wait. Anything else (first
      edit since focus, a different half changing, or both changing at
      once) stays genuinely ambiguous and falls through to the debounce
      exactly as before. Known, accepted gap: a keystroke that doesn't
      actually change `.value` (e.g. minutes already reads `00` and the
      first digit typed is also `0`) fires no `input` event, so it can't
      count toward "two edits to the same half" — that case still takes
      the full debounce, same as before the fast path existed, not a
      new regression, just not improved by this either.

      **The debounce is the backstop, not superseded by the fast path —
      same reasoning as the OAuth reconnect flow's focus-fast-path/
      timeout-backstop split (see hard rule 9's addendum), recorded here
      for the same reason: so `TIME_INPUT_BLUR_DEBOUNCE_MS` isn't deleted
      later on the theory that the fast path now covers everything.** It
      doesn't — a genuinely single-digit entry and a dropdown pick both
      depend on the debounce entirely; the fast path only ever fires for
      the specific case of two consecutive same-segment edits.
      Fail-first confirmed the same way as the debounce itself: disabled
      `closeNow`'s condition, watched the new fast-path assertion fail
      (1/237) while everything else stayed green, restored it (0/237).

      **What changes by feel vs. what stays the same, for Sebastian's
      own manual check**: typing a full two-digit value into either
      segment (e.g. `00`→`10`) should now close *immediately* on the
      second digit — a felt difference from before. A genuinely
      single-digit entry, tabbing between segments, and a completed
      dropdown pick should all feel *exactly as they did* right after
      the debounce fix landed — same ~500ms wait, nothing sped up for
      those three, because none of them ever produces two consecutive
      edits to the same half.
    - **(7) No floating "Log now" button on laptop — fixed.** `.fab` was
      `display:none` by default, only `display:block` under
      `@media(max-width:820px)`. Now always `display:block`, same fixed
      bottom-right position at every width — nothing else fixed-positioned
      shares that corner. CSS-only; the FAB's click handler already had
      the correct anchoring logic (shared with item 2's fix).
    - **(8) Logo now returns to the main page — fixed.** Single-page app,
      so "return to main page" is a `goHome()` reset: closes Review if
      open (reuses `reviewClose`'s own handler), drops out of Day view,
      closes any open entry sheet, jumps `weekStart` to the current week —
      the same state a fresh load starts in.
    - **(9) "Connect Google Drive" button text overflowed on phone —
      fixed.** Every other state this button shows already used a short
      "Drive: …" phrasing; only the unclicked default label was the longer
      "Connect Google Drive." Shortened the label itself to "Connect
      Drive" to match the existing convention, rather than a CSS-only
      patch — fixes the overflow and the inconsistency together.
    - **(10) Scroll trapping inside the log grid on phone — root cause
      corrected mid-investigation, fixed.** The first pass here (based on
      static reading alone) blamed the grid's 350ms drag-select-commit
      timer. Sebastian's friend's own screenshots disproved that: a
      captured drag blocks scroll entirely via `preventDefault()` — it
      cannot produce a scrolling *visual* — and what was actually reported
      is the grid's own interior genuinely scrolling (hours disappearing
      off the top) while the header and everything below stay fixed,
      exactly like a second, independent scroll container. The real root
      cause: `.gridscroll` has `overflow-x:auto` and **no `touch-action`
      declared at all**, leaving the browser free to also decide it owns
      vertical panning for that element — a known WebKit behavior where
      such an element can get promoted to its own scrolling/compositing
      layer under certain content-size/zoom conditions (plausibly
      explaining the "zoomed fully out" correlation in both reports, and
      why it varies by device) and capture a vertical swipe that should
      have chained through to the page. Fix: `touch-action:pan-x` on
      `.gridscroll`, telling the browser explicitly this element only
      handles horizontal touch panning — horizontal scroll for the seven
      day columns is unaffected. **Not reproducible or verifiable from
      here**: this is real WebKit touch-dispatch/layer-promotion behavior
      on an actual iOS device; Chrome DevTools' device toolbar emulates
      viewport size and synthesizes touch on Blink, a different rendering
      engine, and will not reproduce it. `selftest.html` confirms no
      regression (0/213 failing) but can't confirm the fix itself — the
      friend's own device, after this branch is verified and merged, is
      the actual test. See the message Sebastian is sending them for
      exactly what to try and what they should see.
    - **(10) continued, 2026-08-17 — the friend's device confirmation
      surfaced a real regression from the fix above, not just a
      confirmation of it: fixed properly this time, verified on both his
      device and Sebastian's.** `touch-action:pan-x` stopped the original
      WebKit layer-capture bug, but it did it by disabling the browser's
      default vertical-pan behavior for any touch *starting* on
      `.gridscroll` at all — not just locally, but for the whole gesture,
      including chaining a scroll up to the page. Symptom: a finger
      landing outside the grid scrolled fine and could continue scrolling
      through the grid once already in motion, but a fresh touch starting
      *inside* the grid didn't move the page at all; stopping mid-scroll
      with a finger still down inside it re-triggered the same dead
      state. **Real root cause, found via `getComputedStyle` rather than
      the stylesheet** (Sebastian's own instruction, since the stylesheet
      alone had already misled the first pass at this bug): `.gridscroll`
      set `overflow-x:auto` with no `overflow-y` declared, and CSS
      silently computes `overflow-y` as `auto` too whenever the other
      axis is a scrolling value and this one is left at its default
      `visible` — confirmed directly (`overflow-y` read back as `"auto"`
      despite never being set), not inferred from the spec alone.
      `.gridscroll` had been an accidental *vertical* scroll container
      this entire time, and that's almost certainly what the *original*
      item 10 report was really seeing too — an element WebKit will
      promote to its own independently-scrolling compositing layer under
      certain zoom/content conditions is exactly an `overflow:auto`
      element, needing no separate explanation once this was found.
      **Fix:** `overflow-y:hidden` (an explicit non-`visible` value isn't
      subject to the auto-coercion, so this genuinely removes the
      scroll-container status rather than hiding its effects) and
      `touch-action:pan-x` removed outright — with the real cause gone,
      there's nothing left for it to guard against, and its own side
      effect was the regression. The grid's existing JS drag-select logic
      (a 350ms hold-then-commit, `passive:true` on `touchstart`, only
      calling `preventDefault()` once a drag has actually committed)
      already resolves the scroll-vs-drag-select ambiguity correctly on
      its own and needed no changes. **Verified for real this time**: a
      preview branch (`raw.githack.com` off the feature branch, confirmed
      to reflect a fresh push immediately, not cached) let Sebastian
      reproduce the *original* live-site bug first (finger inside the
      grid, doesn't move at all) as a baseline, then confirm the fix
      resolves it — identical feel starting inside or outside the grid,
      stop-and-resume works, the original item 10 symptom (hours
      disappearing off the top) hasn't returned, horizontal scroll intact
      at both a 6–24 and a full 24h day range — and his friend confirmed
      the same independently on his own device. **CSS gotcha worth
      remembering on its own**: this is the second time in two batches a
      computed style diverged from what the stylesheet appeared to say,
      after `.breaktoggle`'s `display:flex`-on-a-label specificity bug
      earlier in the same real-user batch. When a CSS-driven bug doesn't
      make sense from the stylesheet alone, check the *computed* style in
      a real browser before theorizing further — the stylesheet is what
      was written, not what the browser actually did with it.
    - **Split out separately, not fixed in this batch**: the grid's 350ms
      drag-select-commit timer really is ambiguous on its own terms — a
      finger resting motionless on a slot for over ~350ms before it starts
      moving can still get captured by the *drag-select* path even after
      item 10's fix above, because direction alone can't tell a deliberate
      long-press-then-drag apart from an unhurried scroll swipe that
      happened to pause first. Real, reproducible on demand (rest a finger
      on any slot for >350ms before swiping, then swipe — no dependency on
      `.gridscroll`, zoom, or device), but a distinct, much smaller issue
      from item 10's WebKit-layer bug, and explicitly not conflated with
      it per Sebastian's own instruction. Options if this gets picked up:
      raise the 350ms threshold, require a minimum post-hold movement
      within a short window before fully committing to drag-select, or a
      visible cue the instant drag-mode arms so an accidental hold can be
      released before it eats a scroll — needs a decision, not built yet.
    - **(11) Cache-bust `app.js` on every load — fixed, deliberate
      decision.** Closing item 1 above (a report that ultimately turned
      out to be stale deployed JS, not a real bug) was the *third* time
      this exact shape has cost real debugging time — `SYNC-LESSONS.md`
      documents two prior incidents in this project's sibling (Money
      Ledger) and explicitly notes the first didn't produce a habit that
      prevented the second; it hadn't prevented a third either, this time
      in Hours Ledger itself. `index.html`'s plain
      `<script src="app.js">` let a browser's disk cache keep serving an
      old `app.js` indefinitely, with nothing to force a re-fetch. Fixed
      structurally rather than with another "be more careful" note:
      replaced with a two-line bootstrap
      (`var s=document.createElement("script");
      s.src="app.js?v="+Date.now(); document.body.appendChild(s);`) that
      cache-busts on every single load, no manual version string to
      remember to bump, no build step, no git hook — the repo file does
      its own busting at runtime, so hard rule 3 ("what's in the repo is
      what runs") stays exactly true. `selftest.html`'s own iframe loads
      (both the initial sandbox and `freshSandbox()`'s reload-simulation)
      got the identical treatment — its `?hltest=1` was static, not
      actually cache-busting despite `SYNC-LESSONS.md`'s note (written
      about Money Ledger's harness, before Hours Ledger's own harness
      existed to check the pattern had actually carried over — it hadn't;
      corrected here rather than assumed).
      **Rejected alternative**: a version string bumped by hand on every
      `app.js`-touching commit (e.g. `?v=2026-08-15a`). Rejected because
      it reintroduces the exact "remember to do this every time" manual
      step that had already failed twice before this fix — a note to be
      careful a third time wasn't judged good enough once the pattern was
      that consistent.
      **Accepted tradeoff, decided deliberately**: `app.js` is now never
      cached between opens — every load re-fetches it fresh from GitHub
      Pages' CDN instead of reusing a valid cached copy. For a small file
      opened a handful of times a day this is a negligible cost against
      three lost debugging sessions. **This interacts with backlog item 2
      (offline support) below** — a service worker built later needs to
      reconcile with "never cache `app.js`" deliberately rather than
      silently fighting it or quietly reintroducing the staleness risk
      this item exists to close; flagged there too so whoever builds
      offline support hits this as a known interaction, not a surprise
      mid-build.
17. **Modal scroll lock (iOS Safari) — merged to `main` and live, verified
    on a real device.** Reported bug: with
    any of the three scrims open (entry sheet, close-out sheet, intro),
    touch scrolling on an iPhone (Chrome, i.e. WebKit) often scrolled the
    page underneath instead of the modal's own content — a touch on the
    bare scrim background, a touch inside the sheet when its content
    genuinely didn't need to scroll, and a scroll that ran the sheet's own
    content out and kept going, all leaked to the page. The page's scroll
    position also stayed wherever it leaked to after the modal closed,
    since nothing restored it.

    **Root cause, diagnosed from code before any fix was written**: none
    of `.scrim`/`.sheet`/`<body>` had `overscroll-behavior` set anywhere,
    so a scroll that exhausted `.sheet`'s own limit chained straight to
    the page by the browser's default behaviour; there was no body scroll
    lock at all (`overflow:hidden` on `<body>` is a well-known no-op for
    touch scroll on iOS Safari specifically, not attempted here); and
    `openSheet()`/`openCloseout()` never reset `.sheet`'s own `scrollTop`,
    so a sheet reopened later in the same session could start mid-content
    instead of at a predictable boundary, making which direction leaked
    depend on session history rather than being consistent.

    **Fix**: `lockBodyScroll()`/`unlockBodyScroll()`, shared across all
    three scrims (`app.js`, next to `wireOutsideClose`) — `position:fixed`
    on `<body>` with the pre-open `scrollY` captured as a negative `top`
    offset and `width:100%` (fixed positioning otherwise collapses body to
    content width, reflowing whatever's underneath), removed and restored
    via `scrollTo` on close. `overflow:hidden` on body was rejected as the
    technique itself, not just skipped as redundant — it doesn't work on
    iOS Safari, the exact browser this bug was reported on; general
    WebKit knowledge, not something re-derived from this codebase.
    **A counter, not a plain boolean pair**: nothing in the reachable UI
    can open two scrims at once (every scrim is a full-viewport,
    highest-z-index, `pointer-events:auto` overlay, so opening one
    physically blocks every tap that could open another — the existing
    Enter-to-log handler already checks this explicitly before opening a
    fresh sheet), but proving that invariant perfectly was judged not
    worth the risk: a failed unlock leaves the page permanently
    unscrollable until reload, worse than the bug it fixes. The counter
    costs nothing extra over a boolean and stays correct even if that
    invariant is ever wrong. Two failure modes a boolean would have
    gotten wrong, both closed by the counter's guards: locking twice
    would re-capture `scrollY` on the second call — and a locked body
    reports `scrollY` as 0 regardless of the real saved position, so a
    naive re-lock would silently overwrite the real value with 0, and the
    eventual unlock would snap to the top instead of restoring it;
    unlocking when never locked would call `scrollTo` with a stale or
    default value, jumping the page somewhere it was never at. (This was
    caught for real, not just reasoned about: the self-test suite's
    pre-existing setup left the intro modal open for its entire run on a
    genuinely fresh profile — see below — which surfaced exactly the
    "opened twice, closed once" shape the counter exists to survive.)

    `overscroll-behavior:contain` added to `.sheet` and separately to
    `.closeout-gaps` (a second, nested scroll container inside the
    close-out sheet — its own chain link needs the same containment, or a
    scroll exhausted there chains straight past `.sheet` to the page).
    Real on desktop too, not iOS-specific: without it, a mouse wheel
    scrolled past either container's own limit already scrolls the page
    underneath on every platform, so this is a genuine (if smaller,
    less-noticed) desktop fix as well as a phone one. A defensive
    `touchmove` block on each scrim's own background, gated on
    `ev.target===scrimEl` (the same check `wireOutsideClose` already
    uses, so it can never intercept a touch meant for the sheet's own
    scroll) — likely redundant once the body lock holds, kept as a cheap
    second line of defense specifically against any WebKit quirk (e.g.
    address-bar collapse) that might let a touch through the lock.

    **`.sheet`'s `scrollTop` now resets to 0 on every open**
    (`openSheet()`, `openCloseout()`) — a real decision this
    investigation surfaced, not a given. Argued for: every other field
    `openSheet()` touches is already reset to a known state on open
    (`fDay`, `fStart`/`fEnd`, `fBreakToggle`, `breakRows`, `fLabel`,
    `chosenCat`) — leftover scroll position was the one piece of UI state
    that wasn't following that existing convention, not a deliberate
    design choice. It also directly closes the leftover-scrollTop
    ambiguity above: with every open starting at the same, predictable
    position, "opens at a boundary" is a clean, singular starting
    condition instead of depending on whatever a previous session left
    behind. Argued against and rejected: preserving scroll position
    across a close/reopen isn't a feature this app has ever had anywhere
    else, and `openSheet()`/`openCloseout()` already represent fresh data
    (a different entry, a different week) even when reopened quickly, so
    there's nothing meaningful being "resumed" by keeping it. `#intro` was
    deliberately left alone — its content is fixed and short, never
    genuinely overflows `.sheet`'s `max-height`, so there's no leftover
    state to reset there in the first place.

    **`#intro`'s outside-click asymmetry — known gap, deferred, not fixed
    in this batch.** `#intro`'s outside-click-to-close is a plain
    `if(ev.target===introEl) closeIntro()` listener, not
    `wireOutsideClose()` — meaning it doesn't have the entry/close-out
    sheets' fix for a drag that starts inside the sheet and releases on
    the scrim (see the real-user bug batch's item 5 above), which would
    read as a false outside-click on `#intro` the same way it once did on
    the other two. Left as-is deliberately: testing it properly needs
    dismissing the intro modal on a real phone, which means clearing
    `hours-ledger-seen` on that device first — a real step, not a
    trivial one to fold into this batch's already-planned device-testing
    pass. Revisit together with a real-device round, not as a silent
    side effect of this fix.

    **Alternative considered and rejected as the primary mechanism,
    recorded as the fallback**: making `.scrim` itself the scroll-chain
    terminator (`overflow:hidden` plus `overscroll-behavior:contain` on
    `.scrim`, no body lock at all). Simpler in one real way — it never
    touches `<body>`'s own position or layout, so there's no `scrollY`
    save/restore to get wrong and no interaction with Safari's
    address-bar collapse/expand to worry about. Not used as the primary
    fix because its reliability is less certain: `overscroll-behavior` is
    specified to govern chaining out of a genuine scroll container, and
    `.scrim` with `overflow:hidden` isn't one — it has no scrollable
    content of its own, so a touch landing there likely still gets routed
    past it to the next real scrollable ancestor by the browser's normal
    hit-testing, the same as today. Making this reliable would likely
    mean turning `.scrim` into an actual (even if invisible,
    exactly-viewport-sized) scroll container purely to give it something
    to contain — a hackier, less-precedented pattern than the
    well-documented `position:fixed` body lock. Kept on record as the
    fallback specifically for the risk named above: if the body lock
    proves flaky under Safari's address-bar collapse on real-device
    testing, try this next, not as a co-equal first option.

    **Verification split, stated explicitly per the project's own
    standing rule**: `selftest.html` (292/292 as of this entry) covers
    mechanism only — the lock/unlock wiring fires on every one of the six
    open/close paths, the counter's double-lock and unlock-when-never-
    locked edge cases, `overscroll-behavior:contain`'s presence in
    computed style, the touchmove block's target-gating logic, and the
    `scrollTop` reset. None of that proves scrolling actually stays
    contained on a real device — this sandbox iframe is `display:none`
    with no real touch dispatch or scroll physics, the same limitation
    already true of every other touch-handling test in this file. Adding
    these tests surfaced a genuine, previously-invisible gap in the test
    harness itself: the pre-existing suite never dismissed the intro
    modal that auto-opens on a genuinely fresh profile (no persisted
    `hours-ledger-seen`), which cost nothing observable before this work
    since nothing tracked intro's open state — now fixed by dismissing it
    once, right after the suite's own state reset, before any other test
    runs. **Real-device verification (2026-08-18), confirmed by Sebastian
    on an actual iPhone (Chrome/WebKit) and a laptop, via a
    `raw.githack.com` preview off `fix/modal-scroll-lock`, before
    merging** — per the project's standing rule for anything touching
    touch or mobile layout, not DevTools emulation: all three original
    symptoms fixed; outside-tap-to-close still works on all three scrims;
    the on-screen keyboard doesn't interfere; repeated open/close is
    stable (no stuck lock, matching the counter design's own goal); the
    grid's drag-to-log is unaffected (it lives behind the scrim and
    shares no code with this fix, but was re-verified anyway, same
    discipline item 10 required); and the close-out sheet's own nested
    scroll (`.closeout-gaps`) behaves correctly. Merged to `main`
    2026-08-18.

18. **Weekly verdicts silently reverting — merged to `main` and live,
    verified before merge.** Reported bug: setting a verdict appeared to work,
    stayed selected for roughly 4-5 seconds, then deselected on its own -
    affecting a different set of categories week to week, only on weeks
    with pre-existing data, always a full deselect rather than a switch
    to a different verdict.

    **Root cause, confirmed by real-device testing, not just code
    reading**: `sweepCompressVerdicts()` (the continuous half of the
    Keep/Compress/Cut -> Increase/Keep/Cut cleanup - see hard rule 8's
    neighbour and the data model's verdict-fields entry) runs on every
    Drive sync, converts any surviving `"compress"` string in the merged
    verdict set into a tombstone, and pushes that tombstone straight back
    to Drive in the same round. It's a real, working self-heal - but it
    was entirely silent. A batch of pre-existing stale `"compress"`
    records already sitting in the real Drive file (most likely pushed
    during this app's own Drive-sync development, before the
    Increase/Keep/Cut rename existed) meant that the first time *any*
    device touched a given week+category since that rename, its freshly
    set verdict lost to the stale remote value in `mergeRecords()`'s
    last-write-wins case, then got swept to a tombstone by the very same
    sync - visually indistinguishable from "I set it and it silently
    cleared itself." Each affected key only ever misfires once (the
    tombstone that sync produces protects all of that key's *future*
    edits via `mergeRecords()`'s case 3, "remote is my own echo, trust
    local") - which is exactly why the affected set kept changing rather
    than repeating: it wasn't the same categories failing over and over,
    it was different pre-existing leftovers each getting hit for the
    first time as Sebastian happened to touch them.

    **A separate, confirmed-real risk, investigated because it was a
    plausible source of the stale batch: opening `index.html` from
    `localhost:8000` with no query parameter runs against real data, not
    test data.** `TEST_MODE` (`app.js`'s very first meaningful line) is
    gated purely on the literal `?hltest=1` query string - there is no
    hostname check anywhere in the file. A local dev checkout that ever
    had "Connect Drive" clicked becomes a permanent, independent sync
    participant against the real Drive file (Drive finds the sync file by
    name, not by web origin - any origin, any account session, the same
    account, finds the same file), running whatever code happened to be
    checked out at the time, on every load, indefinitely, until
    disconnected. Confirmed as a real standing risk from reading the code;
    **ruled out as the ONGOING source of this specific recurrence** by
    Sebastian closing that tab entirely and reproducing the bug again
    anyway - consistent with the leftover-batch explanation above (closing
    a tab can't retroactively un-push what it already wrote), not with an
    actively-reintroducing source. Whether it ever *was* connected, and
    therefore whether this habit was unsafe in the past, is a fact only
    checkable in that origin's own localStorage - not resolved here either
    way.

    **Fix, three parts:**
    - **A stale `"compress"` sweep now surfaces to the user, not just
      `console.log`** (which is all it ever did before, exactly why this
      went unnoticed for weeks). `sweepCompressVerdicts()` now returns
      `{records, swept}` instead of a bare array; `syncEngine()` threads
      `swept` through as a new `sweptCompress` field on its return value
      (additive - `newLocalState`/`toPush`, everything every existing
      caller already depended on, are unchanged). The actual `showToast()`
      call lives in the caller, not inside the engine - `syncEngine()` and
      its helpers are deliberately kept side-effect-free and independently
      testable (see `sync-dryrun.html`, and every synchronous test in
      `selftest.html` that calls `syncEngine()` directly), and a toast
      needs real DOM the engine has no business assuming exists.
      **Discovered while wiring this in, not anticipated up front:
      `connectDrive()` has its own separate, undocumented first-connect
      implementation that doesn't call `runDriveSync()` at all** - so the
      toast had to be added to two call sites, not one, or a stale
      `"compress"` swept on a device's very first connect (exactly the
      scenario a genuinely fresh device is most likely to hit) would have
      shipped with the fix silently not covering it. That duplication
      between `connectDrive()`'s first-connect path and `runDriveSync()`'s
      ongoing-sync path is a real, separate piece of debt this fix did
      not take on unifying - flagged here rather than fixed, since
      unifying it wasn't what was asked and is exactly the kind of
      broadening hard rule 6 exists to stop. `connectDrive()` already
      shows its own toast on success/failure ("Connected - your weeks are
      syncing." / "...first push to Drive failed...") - a second,
      independent `showToast()` call right after would just silently
      clobber it a moment later (`showToast()` replaces its text, it
      doesn't queue), so the sweep summary is *appended* to whichever of
      those two messages fires, not shown standalone there. On an
      ordinary background sync (`runDriveSync()`), which shows no toast
      of its own, it's a standalone toast. Every swept record still gets
      its own `console.log` line inside `sweepCompressVerdicts()` itself
      regardless - the toast is a user-facing summary layered on top, not
      a replacement for the existing trace.
    - **One-time cleanup of the real Drive file - confirmed clean,
      before this fix even merged.** `sweepCompressVerdicts()` already
      self-heals idempotently on every sync (same always-on shape
      `dedupeCategoriesByName()` uses), so no separate cleanup *code* was
      needed. Sebastian downloaded `hours-ledger-sync.json` directly from
      Drive and searched its raw text for `"compress"` - zero matches -
      and separately checked `localStorage.getItem('hours-ledger-v2')`'s
      `weeklyVerdicts` on both real devices (laptop and a separate Chrome
      window) for the same string, also zero. All three real-data checks
      were already clean before this branch merged, meaning the specific
      leftover batch behind the original report had already fully
      self-healed by the time of this check - not something this session
      could verify itself, no Google account access exists here.
    - **`snapshot()` now precedes both `setVerdict()` call sites** (the
      week rail and the close-out sheet's own verdict buttons) - a real,
      separate gap against hard rule 5 found during this investigation,
      not a side effect of the sync bug: neither handler ever snapshotted
      before this fix, so `Ctrl+Z` could never recover a verdict change,
      going back to before verdicts synced at all. Matches the existing
      description-string convention exactly (`c.name+" verdict"`, same
      style as `"delete "+nm` / `"edit entry"`).

    **Test coverage, fail-first confirmed against the true pre-fix
    baseline (`git stash` on `app.js` alone, both before this batch and
    isolated per-fix) - `selftest.html`: 302/302 with the fix, 4/302
    failing without it.** Two of those four are a synchronous
    `syncEngine()` check (does it report the right week/category swept -
    extends the existing item-D compress test rather than duplicating its
    setup); one is a full async connect-through-fakeDrive test confirming
    the actual toast text; one drives the real rail click handler through
    to `undo()` confirming a verdict change now actually reverts.

    **Two more bugs found by the testing process itself, not anticipated
    up front - exactly the value fail-first discipline is supposed to
    provide.** First found narrow, then found to be systemic on being
    asked to confirm it wasn't just worked around - recorded as it
    actually happened, not cleaned up to look like it was caught in one
    pass:
    - The Drive-toast test's fresh sandbox iframe loaded with
      `driveConnected=true` already inherited from an earlier test's
      *shared, same-origin* `TEST_MODE` localStorage, firing that
      device's own automatic page-load catch-up sync (`scheduleDriveSync()`
      at `app.js`'s own bottom) before the test's own seeded fake-Drive
      data had a chance to matter - the test's `waitFor("Drive: synced")`
      was satisfied by that unrelated race, not by the sync under test.
      The undo/snapshot test failed the identical way, for the identical
      reason, on the undo stack (`UKEY`) instead of `driveConnected`: a
      fresh sandbox could inherit an unrelated leftover snapshot and have
      `undo()` pop *that* instead of the test's own click, landing on
      "verdict reads null afterward" for the wrong reason entirely - it
      passed even with the real `snapshot()` fix reverted.
    - **First fix, and its own gap**: both were patched at their own call
      site only - clearing storage via the *outer*, already-loaded sandbox
      (or, for the undo stack, `localStorage` directly, deliberately not
      through `clearLocalStateForTest()` - that hook lives in `app.js`,
      and stashing `app.js` to fail-first-isolate the `snapshot()` fix
      would have silently reverted the hook's own fix for this too,
      contaminating the very check meant to isolate it) *before* creating
      the fresh sandbox, not after - clearing after only touches
      localStorage, not the fresh iframe's in-memory `state`/`undoStack`,
      both already parsed at load time. That fixed both tests. **It did
      not fix the bug** - asked directly whether this was fixed in the
      harness itself or worked around, checking honestly turned up four
      *pre-existing* `freshSandbox()` call sites (the
      `driveSyncApplyingRemote`, `driveSyncInFlight`, focus-fast-path, and
      late-success-catch-up tests) using the exact same "clear after"
      pattern, equally exposed, not fixed by patching only the two new
      tests that happened to surface it.
    - **Real fix**: `freshSandbox()` itself now takes a `clean` argument -
      `true` wipes every `TEST_MODE` storage key *before* the iframe is
      created, using this test file's own top-level `localStorage`
      directly (same origin as every sandbox) rather than any app.js hook,
      for the same stash-isolation reason as above. All five
      "connect from a blank slate" call sites now pass `clean:true` and
      dropped their now-redundant post-load `fakeDriveReset()`/
      `clearLocalStateForTest()` calls. `clean` defaults to `false`,
      deliberately, not `true`: `killSandboxAndOpenFresh()` (the
      close-tab/reopen simulation covering BUG 2's real fix - an entry
      saved right before a reload reaching Drive on the next load's
      catch-up sync) exists specifically to verify state *survives* a
      simulated reload; wiping storage there would break the exact thing
      that test checks. Re-ran the full suite (not just the previously-
      failing tests) three times after this fix, consistently 302/302 -
      and re-confirmed fail-first against the true pre-fix `app.js`
      (checked out from its parent commit, not stashed, since `app.js`
      was already committed by this point) with the *corrected* harness:
      still exactly the same 4/302 failing, now for real.

    **Real-device verification, confirmed by Sebastian on the branch
    preview before merging**: set a verdict on every category in a real
    week deliberately (not a random subset), pressed Ctrl+Z - all
    deselected correctly and stayed deselected, none reappeared. The
    toast itself couldn't be field-tested against genuine stale data,
    since the real Drive file and both real devices were already clean by
    the time of this check (see the cleanup entry above) - covered
    instead by `selftest.html`'s fake-stale-record test, walked through
    line by line and re-run live on request before merge. Merged to
    `main` 2026-08-18.

Feature creep is the known failure mode of this project.
