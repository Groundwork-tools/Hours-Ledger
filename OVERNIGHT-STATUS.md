# OVERNIGHT-STATUS.md — feature/sessions

Branch `feature/sessions`, cut from `main` at `7f69904`. Nothing here is pushed, merged or deployed.
Everything runs in TEST_MODE (fake Drive, fake token). No real Drive, no real OAuth.

**Legend:** RAN = I executed it this session and the output is quoted. REASONED ONLY = read from code, not run.

## Top of file: can selftest.html be run?

YES. RAN: headless Chrome (`/Applications/Google Chrome.app`, outside the repo) + `python3 -m http.server`,
as CLAUDE.md describes. Baseline on `main` before any change:
`PASS - 0 failing / 853 total` (command: `/private/tmp/hl-run/run.sh 8801 /private/tmp/hl-run/base.html`,
a script outside the repo that serves the repo, runs Chrome `--headless=new --virtual-time-budget=300000 --dump-dom`
and reads `id="summary"`).

## Stage status

| Stage | State |
|---|---|
| 1 sessions | DONE, gate passed (see below) |
| 2 schedule + banner | DONE, gate passed (see below) |
| 3 detection | not started |

## Log

## Stage 1 log — sessions (data, sync, save-as-session, apply, undo, remaps, privacy line)

**Fail-first (RAN).** The new `runSessionTests()` block was written and run against the UNCHANGED `app.js`
(scratch harness, sessions block only): `FAIL - 24 failing / 301 total`. Examples, verbatim:
`S01: scenario threw before finishing [observed: h.migrateSessions is not a function]`,
`S01b loading a stored ledger that predates this feature gives an empty sessions map (ledger intact)`,
`S01b ...malformed stored session drops only that one [observed: {"x":"nope","y":{...}}]`,
`S10 the Sessions button exists in the data tools`,
`S11 privacy.html says what sessions are, that they sync with the rest only if Drive is connected`.
Most rows fail because the hook does not exist yet (a scenario that cannot run becomes ONE failing row naming
the missing hook, the precedent in `runDayHighlightTests`); the load-path, button and privacy rows fail on a real assertion.

**First run with the code (RAN):** `FAIL - 1 failing / 403 total` — `S07 A deletes: Drive holds a tombstone and B
applies the delete [observed: Renamed on B]`. Diagnosis: B's edit and A's delete were within mergeRecords' 5 s
ambiguity window (live beats tombstone by design), i.e. a wrong fixture, the documented back-dating trap.
Fixed the SETUP (stamps 10 min / 5 min old); the assertion is unchanged. Not an app bug.
After: `PASS - 0 failing / 403 total` (sessions-only harness; 403 = 277 always-run synchronous rows + 126 session rows).

**Mutation checks (RAN, 34 mutants, each a scratch copy of app.js with one real behaviour broken, run against
the sessions block; a mutant is "killed" when at least one row flips):**
first pass 31 killed, 3 SURVIVED — M13 (own stale echo logged as superseded), M20 (forward undo without the owner
guard), M22 (forward undo keeping the snapshot's old stamp). All three were weaknesses in MY tests (the fixture
could not tell the broken behaviour from the real one: the echo had identical content so nothing is logged either
way; the snapshot was taken AFTER the other device's edit so there was nothing to protect; the stamp inside the
snapshot was not old so "fresh" equalled "kept"). Strengthened the three fixtures, re-ran: M13 `FAIL - 1`,
M20 `FAIL - 2`, M22 `FAIL - 2`, unmutated code `PASS - 0 failing / 403`. Final: all 34 killed.

| Mutant | Rows that flipped |
|---|---|
| M01 flatten emits raw arrays | S06, S06b, S07, S07b, S09, S09b |
| M02 tombstone for a session that doesn't exist | S02b |
| M03 setSession leaves the id's tombstone | S02b |
| M04 both records emitted when id in both containers | S06b |
| M05 unstamped live loses to a tombstone | S06b |
| M06 `blocks` out of the whitelist | S06 |
| M07 `schedule` out of the whitelist | S06 |
| M08 syncEngine ignores remote sessions | S06b, S07, S09, S09b |
| M09 syncEngine does not push sessions | S06b, S07, S07b, S09, S09b |
| M10 connectDrive push site omits sessions | S07b |
| M11 runDriveSync push site omits sessions | S07, S09, S09b |
| M12 superseded text not logged | S06b |
| M13 own stale echo logged | S06b (after strengthening) |
| M14 remap doesn't restamp | S08 |
| M15 dedupe doesn't remap sessions | S08 |
| M16 dedupe restamps untouched sessions | S08 |
| M17 category delete doesn't move blocks | S08b, S08c |
| M18 category-delete remap doesn't restamp | S08c |
| M19 undo not a forward edit | S09 |
| M20 no owner guard | S09b (after strengthening) |
| M21 pre-feature snapshot wipes sessions | S09c |
| M22 forward undo keeps old stamp | S09 (after strengthening) |
| M23 apply takes no snapshot | S04, S10 |
| M24 no midnight split | S04b, S05 |
| M25 preview counts touching edges | S05 |
| M26 no double-submit guard | S10 |
| M27 applySession makes a network call | S11 |
| M28 unflatten doesn't guard malformed synced session | S06b |
| M29 migrateSyncFields doesn't stamp sessions | S07b |
| M30 stamps on a never-connected device | S02 |
| M31 save takes no snapshot | S03, S09, S10 |
| M32 delete takes no snapshot | S09 |
| M33 blocks not in canonical order | S02 |
| M34 tombstones dropped on unflatten | S06b, S07 |

**Gate (RAN):** full `selftest.html` via headless Chrome, scratch copy of the repo outside the repo:
`PASS - 0 failing / 985 total`. (An earlier full run showed `FAIL - 7 failing / 946 total`, all "quota frame
loaded"/quota-chain rows: my scratch harness had not copied `selftest-quota-frame.html`. Fixed the harness, not
a test; the re-run above is the real number.) `EXPECTED_MIN_ROWS` raised 853 -> 985 in the same commit. The run
above was made with the constant still at 853; the only later change is that constant (REASONED ONLY that this
cannot change a result).

**Cut from stage 1 (smallest shippable):** hand-built session editor, rename in the UI (the edit primitive
`setSession` exists and is what the sync tests use), reorder, a save range that crosses midnight (apply handles
midnight; save takes one calendar day).

**Not verified on any real device (everything above is headless Chrome, TEST_MODE):** the Sessions sheet layout on
a phone, the date/time pickers, tap targets, the toast on a phone, real Drive, real two-device sync. The test
iframe is `display:none`, so it cannot prove layout.

## Stage 2 log — schedule and the "Did this happen?" banner

**Fail-first (RAN)** against the stage-1 `app.js` (scratch harness, schedule block only):
`FAIL - 12 failing` (+1 GUARD row from my scratch harness's row-count constant, since fixed). Verbatim examples:
`B01 weekdays are sorted and de-duplicated [observed: {"weekdays":[4,0,4,2],"start":370,"since":"2026-10-01"}]`,
`B01 a malformed schedule found in stored state is dropped by the load migration, the blocks stay [observed: {"weekdays":[9],"start":5,"since":"x"}]`,
`B02: scenario threw before finishing [observed: h.setTestNow is not a function]` (9 scenarios, same cause: the injectable clock does not exist yet).

**First run with the code (RAN):** `FAIL - 1 failing / 344 total` — `B04 it survives a reload [observed: ]`. Diagnosis: my
test called `setSession` (the in-memory primitive; the UI paths call `persist()` themselves) and never saved, so the
reloaded page legitimately had no session. Test setup bug; assertion unchanged, `h.persist()` added before the reload.
After: `PASS - 0 failing / 344 total` (schedule-only harness; 344 = 277 always-run + 67 schedule rows).

**Mutation checks (RAN, 22 mutants).** First pass: 19 killed, 3 SURVIVED — N15, N23, N25. All three were weaknesses in
my tests: N23 (prompts mutating state) — my "changes nothing" row took its snapshot AFTER earlier calls had already
done the mutation; N25 (coverage ignoring other devices' entries) — B05's entries were authored by the sandbox's own
device so the mutation made no difference; N15 (Yes does not re-check) — a double click on a detached DOM node never
reaches the delegated handler, so the re-check was untested; the case it exists for is a STALE row whose window was
filled (e.g. by a sync) after it rendered. Added B03d (pure, snapshot before the first call), a dev-X variant in B05,
and B06c (stale row). Re-ran those three mutants: N15 `FAIL - 1`, N23 `FAIL - 1`, N25 `FAIL - 1`; unmutated `PASS - 0 failing / 350`.
Final: all 22 killed.

| Mutant | Rows that flipped |
|---|---|
| N01 prompt fires AT the window end (>=) | B03 |
| N02 schedule.since ignored | B03 |
| N03 lookback 3 days | B03 |
| N04 lookback 1 day | B03, B03c, B04 |
| N05 edge-touching entry counts as covering | B03b, B03c |
| N06 coverage ignores the next-date part of the window | B03c |
| N07 weekday check removed | B03, B03b, B05, B06 |
| N09 dismissals ignored | B04, B06 |
| N10 dismissal also written into synced state | B04 |
| N11 dismissal list not capped | B04 |
| N12 setSessionSchedule takes no snapshot | B02, B06b |
| N13 since is not today | B02, B06b |
| N14 window end = start + last block only | B03 |
| N15 Yes does not re-derive before acting | B06c (after strengthening) |
| N16 Yes logs at 00:00 not the scheduled start | B06 |
| N17 render() does not refresh the banner | B06 |
| N19 computing prompts makes a network call | B07 |
| N20 cleanSchedule accepts start 1440 | B01, B02 |
| N21 weekdays not sorted | B01, B02 |
| N23 computing prompts mutates state | B03d (after strengthening) |
| N25 coverage ignores other devices' entries | B05 (after strengthening) |
| N26 "No" does not dismiss | B06 |

**Gate (RAN):** full `selftest.html`: `PASS - 0 failing / 1064 total` (985 + 79). `EXPECTED_MIN_ROWS` raised 985 -> 1064
in the same commit (run made with the constant at 985; the only later change is the constant).

**Not verified on any real device:** the banner's layout on a phone, the schedule panel's day checkboxes, the 60 s
timer and the focus/visibility refresh (they are skipped under TEST_MODE on purpose, so they are REASONED ONLY),
real clock behaviour around midnight, real Drive.


## Open issues (decided NOT to fix, listed only)

- **Future entries count as logged.** Applying a session to a future date creates ordinary entries, so the
  current week's 168-hour bar, week totals, and Export week count not-yet-happened time as logged, and an agent
  reading Export week cannot tell a block that happened from one that is only scheduled. By instruction:
  no marker, no new entry field. REASONED ONLY (read from `weekTotals`, `buildWeekExport`; not run).

## Questions (decisions not covered by the brief; conservative option taken)

1. **schedule.since = the day the schedule is declared (today), and that day counts.** Not covered by the brief ("schedule.since
   respected"). Alternative: tomorrow (never ask about the day you set it up). Chose today because the morning checklist
   needs a banner to be verifiable in one sitting, and a prompt needs an empty window anyway. Cost: declaring a schedule at
   10:00 for a 06:00 session you did not log can raise a banner immediately. One constant-free line in `setSessionSchedule`.
2. **Dismissal list cap = 50, lookback = today and yesterday (2 days).** The brief said "capped" and "lookback today and
   yesterday"; the number 50 is mine (the banner can only ever look 2 days back, so 50 is far more than needed). Named constants
   `SESSION_DISMISSED_MAX`, `SESSION_PROMPT_LOOKBACK_DAYS`.
3. **Weekday numbering Mon=0..Sun=6** in `schedule.weekdays`, matching `DAYNAMES` and the rest of the app.
4. **The save-as-session range is one calendar day** (apply handles midnight; saving a range across midnight is cut).
5. **Entries created by the banner's Yes use the scheduled start.** The toast tells the person to adjust; the typical
   duration is logged as if it were exact until they do. (Same "log reality" tension as the open issue above.)
