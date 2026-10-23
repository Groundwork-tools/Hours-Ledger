# OVERNIGHT-STATUS.md — feature/sessions

Branch `feature/sessions`, cut from `main` at `7f69904`. Nothing here is pushed, merged or deployed.
Everything runs in TEST_MODE (fake Drive, fake token). No real Drive, no real OAuth.

**Legend:** RAN = I executed it this session and the output is quoted. REASONED ONLY = read from code, not run.

## Summary (read this first)

All three stages built, each gated on a full `selftest.html` run: 853 -> 985 -> 1064 -> 1132 rows, 0 failing at every gate and on the final tree.
No stop condition was hit. `selftest.html` CAN be run here. Nothing is pushed, merged or deployed. Nothing has been seen on a real device
or against real Drive: scroll to "MORNING CHECKLIST" at the bottom.
One number changed after I had used it: `DETECT_MIN_DATES` 11 -> 12 (stage 3 log explains why; Questions item 6).

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
| 3 detection | DONE, gate passed (see below) |

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

## Stage 3 log — pattern detection (pure function, ranked top 3, proposes creating a session only)

**Fail-first (RAN)** against the stage-2 code (scratch harness, detection block only): `FAIL - 19 failing / 291 total`.
Verbatim: `D00: scenario threw before finishing [observed: h.getDetectConstants is not a function]`,
`D01: ... [observed: h.detectPatterns is not a function]` (and 13 more scenarios, same cause),
`D14 with the planted history the sheet offers at most 3 suggestions ... [observed: 0 undefined]` (UI assertion),
`D15 privacy.html says that spotting patterns happens in the browser and only ever proposes a session` (static assertion).

**First runs with the code (RAN):** `FAIL - 1 failing / 337` — `D01b ... [observed: [0,0,13,0,12,1,0]]`: my fixture
arithmetic, not the detector (an 88-day span from a Monday holds 13 Wednesdays and 12 Fridays; the observation is exactly
right). Corrected the expected counts. Then my D12 restructure left a stale "two dismissals stored" assertion after an
intermediate clear; re-dismissed both before it (intent unchanged). Then `PASS - 0 failing / 338`.

**Design, fixed BEFORE looking at numbers:** per category, the 15-minute window (inclusive) holding the most DISTINCT DATES is a
cluster; remove and repeat; one occurrence per date (its earliest start); excluded: uncategorised, unknown category, entries
starting at 00:00. Rank by weekday concentration p = min(1, 7 x P(Bin(n,1/7) >= busiest weekday count)); ties: more dates,
earlier start, category id. No p cutoff. `suggestSessions` = detect, minus device-local dismissals, top 3. Accepting creates one
one-block session with no schedule and logs nothing. I replaced "window anchored at the first start" with "densest window"
while writing the tests: a stray entry just before a real cluster would otherwise split the cluster's own jitter.

### Deriving the minimum-dates number (RAN, read-only copy of the real export, never committed)
Rule written down BEFORE running: shift each day's entries by an independent random offset (keeps each day's contents, breaks
time-of-day alignment), 15-minute tolerance, N seeds; the minimum number of dates is the smallest k such that, in at most 5% of
seeds, chance produces ANY same-category start-time cluster of k dates.
- First run (anchored clustering, 300 seeds): k=9 46.3%, k=10 13.3%, **k=11 2.3%**, k=12 0.3% -> 11.
- Rebuilt with the detector's real (densest-window) clustering, 300 seeds: k=10 22.7%, k=11 4.7%, k=12 0.7% -> 11 (borderline).
- Same, **1000 seeds**: k=9 (not printed), k=10 22.3%, **k=11 5.2%**, k=12 1.1%, k=13 0.5% -> the rule gives **12**.
- Result: `DETECT_MIN_DATES = 12`. **I changed this number after having used 11** (D00/D06 and the code comment moved with it). Reason:
  the pre-declared rule, applied to the detector's own clustering with enough seeds to resolve 4.7% vs 5.3%. It was not changed
  to get a test green (the tests pass with either; they were updated to match).
- Caveat that matters: this is a property of ~88 logged days. More days -> bigger chance clusters.
  **CORRECTION 2026-10-23 (RAN, same null, 1000 scrambles per size; sizes above 88 resample the real 88 days):** the false-positive rate
  at the fixed k=12 is 1.0% at 88 days, 3.3% at 100, 8.3% at 110, 20.5% at 120, 75.3% at 150 and 100% at 250. It crosses the 5% line at
  about 105 logged days, i.e. in WEEKS (about early November 2026 for a ledger logged every day since 2026-07-25), not "every few months".
  The smallest k within 5% is 11-12 at 88 days, 12 at 100, 13 at 110, 14 at 120, 15 at 150, 21 at 250. (An earlier version of this line said
  to re-run `tools/derive-min-dates.py` every few months; that understated the problem by an order of magnitude.) The fixed 12 is
  being replaced: the threshold has to depend on the length of the log.
- Tolerance 15: from ONE real pattern (Muay Thai start spread 10 min). n=1; weakest number in the design.

### What the detector finds in the real data (RAN: a faithful Python replica of detectPatterns on the read-only export copy; NOT the JS on real data)
At MIN=12: 25 candidates. Top two, p = 0.0115, n = 14 days each, Mon..Sun = [2,2,3,0,7,0,0] and [2,3,2,0,7,0,0]:
Errands/Shower ~05:50 ("get ready for muay thai") and Training ~06:10 ("bike to muay thai"). Everything after has p >= 0.257.
At MIN=11 a third (Training ~08:00 "bike home", n=11, p=0.09) also appears; k=12 drops it. So: the real Muay Thai habit IS ranked first;
the habit appears as TWO suggestions (its get-ready and its bike), not as one three-block session (grouping blocks into one session is
the cut multi-block step). The main "Muay Thai" block shares the 06:10 cluster with the bike entry on the same dates, so the
Training suggestion is labelled by its most frequent label ("bike to muay thai"), not "Muay Thai".

### Test results on generated fixtures (RAN)
- D01 (a): a pattern planted on every Friday of 88 noisy days + 3 daily routines is ranked first in **30 of 30** seeded fixtures.
- D02 (b): **0 of 200** pure-noise fixtures (88 days x 21 entries x 19 categories) produced any candidate; stated bound <= 5% (10).
  Precondition: fixtures non-empty (min 1848 entries) and 20 of 20 planted-pattern fixtures DO produce a candidate.
- D03 (b2): routine-only fixtures: the 3 routines are seen in **200 of 200**; **0 of 200** had a candidate at p <= 0.05; bound 3 x 5% = 15% (30).
  The margins are wide (0 observed vs 10/30 allowed); the mutation table below is what shows these rows can still flip (P02).

### Mutation checks (RAN, final code, 31 mutants, all killed; 0 survivors; unmutated `PASS - 0 failing / 339`)
First pass on the k=11 code: 28 killed, 1 SURVIVED (P29, no tie-break after p): my tie fixture had the "right" order by insertion alone.
Rebuilt with the order inverted (earlier start at a later category id; more dates at an earlier category id), and added P29b/P29c
(tie-break parts in the wrong order). Then the threshold moved to 12 and the whole set was re-run against the final code.

| Mutant | Rows that flipped |
|---|---|
| P01 min dates 11 / P02 min dates 3 | D00, D06 / D00, D02, D03, D06, D08 |
| P03 tolerance 16 / P04 tolerance 14 | D00, D06, D12 / D00, D06 |
| P06 rank by count not p | D01, D01b, D09 |
| P07 no union-bound factor | D09, D10 |
| P08 weekday numbering Sunday=0 | D01, D01b, D14 |
| P09 no per-date dedupe | D01, D08 |
| P10 uncategorised / P11 start 00:00 / P12 unknown category included | D07 (each) |
| P13 latest instead of earliest per date / P14 first label not most frequent | D08 (each) |
| P15 sessions never cover / P16 scheduled coverage by label | D11, D14 / D11 |
| P18 detect reorders its input | D04, D12, D14 |
| P19 no top 3 / P20 gate on p<=0.05 | D10 / D10 |
| P21 exact-start dismissal / P22 uncapped | D12 / D12 |
| P23 accept also logs an entry / P24 no snapshot / P25 sets a schedule | D13, D14 / D13, D14 / D13 |
| P26 no double-submit guard on Save | D14 |
| P27 network call / P28 writes a dismissal | D15 / D04, D12 |
| P29, P29b, P29c tie-break variants | D09 (each) |
| P30 occurrences unsorted / P31 first-found window | D01, D01b, D02, D05, D08 / D01, D01b, D02, D03, D04, D05 |

**Gate (RAN):** full `selftest.html`: `PASS - 0 failing / 1132 total` (1064 + 68). `EXPECTED_MIN_ROWS` raised 1064 -> 1132 in the
same commit; the run was made with the constant at 1064.

**Cut from stage 3 (smallest shippable):** grouping the clusters of one habit into one multi-block session; the dead-pattern filter
(a habit you stopped is still proposed while it has 12+ dates); patterns that cross midnight; duration as part of the key;
schedule suggestion on accept (accepting never sets one).

**Not verified on any real device:** the Suggestions cards and the prefill form on a phone, and whether the proposals FEEL useful
(only use shows that; the test suite cannot).


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
6. **`DETECT_MIN_DATES` was changed from 11 to 12 during stage 3** (see the derivation above) - flagged here because I used 11 first.
7. **A suggestion for a habit that has stopped** is still proposed while it holds 12+ dates (no recency filter; cut).
8. **tools/derive-min-dates.py is new in the repo** (a dev tool, loaded by nothing, no data in it). Delete it if you would rather keep the repo to the three app files.
5. **Entries created by the banner's Yes use the scheduled start.** The toast tells the person to adjust; the typical
   duration is logged as if it were exact until they do. (Same "log reality" tension as the open issue above.)

## Final state and what is NOT proven

Branch `feature/sessions` has three stage commits on top of `main` (7f69904). Nothing pushed, merged or deployed.
**Final full run on the final committed tree (RAN, row-count guard at 1132, headless Chrome, scratch copy of the repo outside it): `PASS - 0 failing / 1132 total`.** Branch head at that run: `1754934`.

**Verified (RAN, headless Chrome, TEST_MODE, fake Drive):** every claim in the three stage logs above.
**Not verified on any real device, any real Drive, or by any person using it:**
- The Sessions sheet, its Apply/Schedule/Suggestion panels, the banner and the toast: layout, tap targets, the date and time
  pickers, the on-screen keyboard, a phone below 820 px. The test iframe is `display:none`; it reads DOM and state only.
- Real two-device Drive sync of sessions, schedules and tombstones. The tests use the real `syncEngine()` for "device B" against a
  fake Drive; Google sign-in only completes on the production origin and on localhost.
- The 60-second banner refresh and the focus/visibility refresh (deliberately off under TEST_MODE).
- Behaviour around a real midnight with the real clock (the clock is injected in tests).
- Whether the suggestions are useful, and whether `schedule.since = today` feels right.
- Any browser other than headless Chrome (no Safari, no WebKit).

## MORNING CHECKLIST — do these before anything merges

**Setup.** Do NOT test against your real ledger or the real Drive file from a branch you have not backed up. Take a downloaded
copy of `hours-ledger-sync.json` and an "Export a copy" on each device first. Serve the branch from the laptop on a port other than
8000 and use `?hltest=1` on the phone (`http://<laptop-LAN-IP>:<port>/index.html?hltest=1`): test-mode storage is suffixed and the
Drive functions never reach the network. Real Drive sign-in does not work on a preview origin, so the two-device check below needs
either `localhost` in a fresh incognito window against a throwaway Google account/Drive file, or waiting until after a merge.

1. [ ] **Sessions sheet, phone and laptop.** Open Sessions. Save a session from a logged stretch of a real day (date, from, to, name).
   It appears in the list. Layout is readable below 820 px; the time pickers do not auto-close mid-entry.
2. [ ] **Apply a FUTURE session.** Apply it to tomorrow at a start time. Check the entries on tomorrow's grid, one undo step removes
   them all, and see what the 168-hour bar does for the current week (the open issue: this should NOT be hidden from you).
3. [ ] **Overlap.** Apply onto a day that already has entries: the preview names the overlap, the entries all stay, undo works.
4. [ ] **Midnight.** Apply a 22:00 start with a block of 3 hours: two entries on two dates, totals right.
5. [ ] **Delete and undo.** Delete a session, press Undo in the toast and with Ctrl/Cmd+Z; the session comes back.
6. [ ] **Banner.** Schedule a session whose window ends in a few minutes (today's weekday, start a few minutes ago) with nothing logged in
   it. The banner appears only AFTER the window ends. "Yes, log it" logs at the scheduled time and offers Undo; "No" makes it go away and
   it does not return after a reload. Then log something inside the window by hand and confirm the banner disappears without pressing anything.
7. [ ] **Two real devices (needs the real Drive path, after a backup).** Create a session on device A; it reaches B. Edit its name on B;
   A gets it. Delete it on A; B loses it. Apply it ahead on A, sync, and confirm B shows no banner for that window. Ctrl+Z an apply on
   A and confirm no ghost entries come back from Drive.
8. [ ] **A suggestion.** Open Sessions on a device with your real history: the Muay Thai get-ready and bike entries should be the
   top proposals (expected from the read-only replica; not seen in the app). "Create session from this" opens a prefilled form; saving
   makes a one-block session and logs NOTHING; "Not now" hides it and it stays hidden after a reload.
9. [ ] **Old tab.** With a pre-branch build still open in another tab, confirm you understand the known gap: that tab's next save drops
   `sessions` from the local ledger (connected devices recover them from Drive).
10. [ ] **Decide the open questions** above (esp. 1, 5, 6) and the open issue about future entries counting as logged.
