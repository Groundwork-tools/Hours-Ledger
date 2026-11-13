# Phone bugs diagnosis (Phase 1: investigation only)

Branch `hours-ledger-phone-bugs`, written 2026-11-10. Changes on the branch: this file and one intentionally failing test in `selftest.html`. `app.js`, `styles.css` and `index.html` are untouched. Nothing is committed or pushed.

**Short version**
- Bug 3: the leading hypothesis (expired token) is **refuted as the cause of the "sync failed" message**. An expired cached token shows "Drive: tap to resume syncing", never "sync failed". "Sync failed" comes from one `.catch`, reached when the token looked valid and the request or the merge then failed. The real defect is that **nothing ever retries after that**, so a later token expiry turned a short network hiccup into a stuck entry that needed a Google sign-in. Reproduced in TEST_MODE (failing test below).
- Bug 2: most likely the fixed full-screen modal does not fit the visible area on a phone (`vh` units, no keyboard handling, Save is the last element). The **label presets deployed on 2026-10-27 made the sheet taller**, and that is a deploy in your window.
- Bug 1: underspecified. Code review rules out forms, hash, `href`, history and explicit reloads. One in-app navigation is by design and may be what you see. I need three answers from you (section 7).

---

## 1. What I ran vs what I only reasoned through

**Ran**
- `git log`, `grep` and file reads of `CLAUDE.md`, `SYNC-LESSONS.md`, `app.js`, `styles.css`, `index.html`, `selftest.html`.
- Full `selftest.html` in headless Chrome against the unmodified app (`app.js`, `index.html`, `styles.css` as on `main` at `c35d017`; the page was loaded before I added the new test block): **`PASS - 0 failing / 1799 total`**.
- The new test alone, in a scratch copy of `selftest.html` that runs only that block: **`FAIL - 2 failing / 6 total`**. One failure is the intended row; the other is the row-count guard, which trips by design in a scratch copy that runs one block. Output in section 4.
- A throwaway mutation of a scratch copy of `app.js` (retry a sync on `visibilitychange` when a cached token is valid): the intended row turns green (`on Drive: true; button: Drive: synced`). So the test flips when the behaviour changes.
- I have **not** re-run the full suite with the new block included. Expect `FAIL - 1 failing / 1804 total` (1799 + 5 rows; `EXPECTED_MIN_ROWS` stays 1799, so the guard is satisfied).

**Reasoned from code only, not run** (everything not listed above)
- All of bug 1 and bug 2: no phone, no Android keyboard, no Chrome-update behaviour was available. Desktop emulation does not reproduce the keyboard resize and the `selftest.html` iframe cannot hold focus, so neither counts.
- Real Google token behaviour: expiry, 401 responses, clock skew, popup blocking, silent re-auth. TEST_MODE returns a fake token before it reads the cache (`getAccessToken`, `app.js:1993`), so **the expired-cached-token branch cannot be run in TEST_MODE without changing `app.js`**. I did not invent a variation.
- Which Chrome version changed what on your phone. I did not look it up and do not know.

---

## 2. Bug 2: Save entry not visible after typing a note

**Deploy check (Step 1).** The last deploy to `main` was 2026-10-27 15:25 (`c35d017`, 14 days ago; `origin/main` is the same commit). It included **label presets** (`.labelpresets`, up to 8 extra chip rows inside the entry sheet) and a chips cap. You said you know of no deploy in the window; that one touched exactly this sheet. Whether it lines up with the Chrome update depends on dates I do not have (question 1). Everything else below is unchanged since August (modal scroll lock) or earlier.

**Facts from the code**
- `.scrim{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;padding:20px}` (`styles.css:243`).
- `.sheet{max-height:92vh;overflow:auto;overscroll-behavior:contain}` (`styles.css:251`). Save/Cancel are the last block of the sheet (`index.html:~190`, `.sheet-actions`), below presets, categories, date, times, break and repeat.
- The page body is `position:fixed` while the sheet is open (`lockBodyScroll`, `app.js:3946`).
- No `visualViewport`, `dvh`, `svh`, `interactive-widget` or `env()` anywhere (grep). Viewport meta is plain `width=device-width, initial-scale=1`.
- The activity field is not auto-focused on phones (`app.js:3676`, only `innerWidth>=820`), so the keyboard appears only when you tap the field, which matches "after typing a note".

**Ranked candidates**

1. **The sheet is taller than the area you can see, and the keyboard covers its bottom (most likely).** The on-screen keyboard covers the lower part of a `position:fixed` overlay without resizing it in current Chrome Android defaults (reasoned from general knowledge of the `interactive-widget` default; not verified against your Chrome version). Save is the last thing in a ~700px sheet, and no code reacts to the keyboard. Presets add up to ~178px (CLAUDE.md measured 4 rows at 375px, keyboard closed). Supports: all facts above. Weakens: the sheet scrolls internally (`overflow:auto`), so you could scroll to Save; if you can, this is "hidden", not "unreachable". A Chrome update changing how the keyboard interacts with fixed elements would explain the timing, but I cannot confirm one happened.
2. **`92vh` is taller than the visible area when the URL bar is showing.** `vh` is the large viewport on Chrome Android, while `inset:0` on a fixed element tracks the visible area. A sheet capped at `92vh` can then be taller than its container, and with `align-items:center` the overflow goes off both the top and the bottom of the screen, where the sheet's own scrolling cannot reach it. Supports: `vh` with no `dvh` fallback. Weakens: reasoned about Chrome's unit behaviour, not measured. Independent of the keyboard, so check it with the keyboard closed.
3. **The presets row made the sheet cross the fold** (a contributor to 1 and 2, not a separate mechanism). Test: Uncategorised shows no presets (`PS-07`), so a sheet with no category chosen is ~180px shorter.
4. **Non-scrollable modal: weakened.** The sheet scrolls and the scrim touch-block only fires for touches on the bare scrim (`wireScrimTouchBlock`).
5. **Fixed footer: refuted by code.** The only other fixed element is the Log now button (`z-index:35`, under the scrim's `40`). The toast is `z-index:60` but sits at the top.

**What to check on your phone** (each line separates candidates)
- Open the sheet from Log now and do **not** tap the field. Is Save visible without scrolling? No = candidate 2/3 (no keyboard involved).
- Pick a category with presets, then without one (Uncategorised). Does Save appear when there are no presets? Yes = presets tipped it over.
- Tap the field so the keyboard opens. Scroll inside the sheet. Can you reach Save? No = the sheet's bottom is off-screen (2); yes = it was only covered (1).
- Is the URL bar showing or hidden? Does the problem change when you scroll the page to hide it before opening the sheet?
- If you can attach a desktop (`chrome://inspect`), in the console with the keyboard open: `[innerHeight, visualViewport.height, document.getElementById('fSave').getBoundingClientRect().bottom, document.querySelector('#scrim .sheet').getBoundingClientRect().height]`. If the Save bottom is greater than `visualViewport.height`, it is off-screen or covered.

**Smallest fix I would propose (Phase 2, after your approval)**
- CSS only: keep `max-height:92vh` as the fallback and add `max-height:calc(100dvh - 40px)` after it, and make the actions row `position:sticky;bottom:0;background:var(--paper)` so Save stays inside the sheet's visible scroll window. Two lines. Each can be tested on its own on the phone.
- Optional second step, only if the keyboard still covers it: `interactive-widget=resizes-content` in the viewport meta so the fixed overlay shrinks with the keyboard. I would not do both at once, so we learn which one worked.
- Needs a `HL_ASSET_VERSION` bump (stylesheet change).

---

## 3. Bug 1: logging an entry moves me to a different page

**Underspecified**, so the ranking is by how well each candidate fits "sometimes, after a Chrome update, when logging".

**Ruled out by grep of `app.js` / `index.html`**: no `<form>`, no submit button; no `location.href`/`assign`/`reload`/`hash` writes (the only `location` use reads the `?hltest=1` query); no `history.pushState`/`popstate`/`hashchange`; no `window.open`; the only `<a href>` elements are the privacy link (same tab), the Money Ledger link (`target=_blank`) and blob downloads.

**Ranked candidates**

1. **An in-app view change that is by design.** `saveSheet` ends with `weekStart=mondayOf(savedDate); focusDay=...` (`app.js:3903`): after Save, the view jumps to the week and day of the entry's Date. If you open the sheet from Log now or a grid tap while looking at another day, or change the Date field, the screen moves to that date. The Log now button uses the day you are looking at (`app.js:5067`), so this happens when the sheet's Date and the view differ. Supports: it is explicit code. Weakens: it has existed for a long time and has no tie to a Chrome update. `Log today` from the Sessions sheet also closes the sheet and re-renders.
2. **The tab was discarded or reloaded while you typed.** CLAUDE.md backlog 19 recorded that your phone's Chrome discards backgrounded tabs and silently reloads them. If you leave the app mid-note (copy something, answer a message) and come back, you get a fresh load: unsaved sheet gone, current week shown. Looks like "moved to a different page". Supports: a prior real-device trace on this phone. Weakens: no obvious tie to saving.
3. **Pull-to-refresh on a downward swipe at the top of the page.** No `overscroll-behavior` on `html`/`body` (only on `.sheet` and `.closeout-gaps`). A drag-to-log swipe that starts before the 350ms commit timer, or a plain scroll at the top, can trigger Chrome's pull-to-refresh, which reloads the page. Supports: missing CSS. Weakens: a committed drag calls `preventDefault()` on `touchmove`, which suppresses it.
4. **Edge swipe back.** The app creates no history entries, so Chrome's back gesture leaves the app for the previous page. A drag-to-log that starts at a screen edge could trigger it. Plausible with a Chrome gesture-navigation change, which I cannot confirm.
5. **Scroll jump on close.** `unlockBodyScroll` calls `scrollTo(0, savedY)`. With the keyboard open or closing, a wrong saved Y could shift the page. Visible as "the page moved", but the same page. Lowest.

**What to check on your phone**
- When it happens, does the URL change or does the page just look different (different week/day, scrolled elsewhere)? Does the unsaved sheet vanish?
- Does the new entry exist afterwards, and on which date? (Tells candidate 1 from the rest.)
- Does it happen only for drag-to-log, only for Log now, or for both? Only when the sheet's Date was changed?
- With desktop `chrome://inspect`: before the action run `window.__m=1`; after it, `window.__m` is `undefined` if the page reloaded or was discarded; `performance.getEntriesByType('navigation')[0].type` says `reload` / `back_forward` / `navigate`.

**Smallest fix I would propose** (only after I know which): for 3, `html{overscroll-behavior-y:contain}` (one line); for 1, either keep the jump but show a toast naming the date ("Saved on Tue 3 Nov"), or stay on the current view when the saved date is in the current week. That second one reverses a documented decision (section 9), so I would ask first. For 2/4 there is nothing to fix in the app beyond what is already saved locally.

**What I need from you:** the three answers in section 7 (what changes, when it started, which phone).

---

## 4. Bug 3: sync failed, then missing on the laptop

**Verdict: hypothesis refuted for the first failure, confirmed as the reason it stayed stuck.**

### a. Path from "entry saved" to "sync failed"

1. `saveSheet` → `persist()` (`app.js:2183`). The entry is written to `localStorage` synchronously before anything else, so the phone's copy is safe. That matches what you saw.
2. If `state.driveConnected` and not applying a remote result, `persist()` calls `scheduleDriveSync()` (`app.js:2373`): a 2000ms `setTimeout`, reset by every further save.
3. `runDriveSync(false)` (`app.js:2380`) → `getAccessToken(cb, false)` (`app.js:1991`). Non-interactive.
4. `getAccessToken` reads the cache with `getCachedToken()` (`app.js:1779`): the token is valid if `expiresAt > now + 30s`. **The expiry is checked before the request, from the stored timestamp**, not after a 401. If valid, it is used. If not, and the call is non-interactive, it refuses (`needsReconnect`). **Silent re-auth is never attempted** (no `prompt:""` call anywhere).
5. Refused path: the callback sets the button to "Drive: tap to resume syncing" and the status to "tap anywhere in the app to resume syncing" (`app.js:2397-2407`). It does not say "sync failed".
6. Valid-token path: find file, read, `syncEngine` merge, `persist()`, render, then `driveWriteFile`. "Sync failed" is set in exactly three places: `syncEngine` throws (`app.js:2423`), or **the final `.catch`** (`app.js:2444`), which catches anything thrown or rejected after the token was obtained, including a network error, a non-OK response from the search/read/write calls (401/403/5xx), or an exception in `renderMaybeDeferred()`/`showToast()` before the write. That `.catch` has no parameter: **the cause is discarded**, nothing is logged, and the UI cannot tell offline from 401 from a render bug.

So "sync failed" at the moment you saved means the token was **not** expired by the cache's clock. The failure was something else: network (a phone's radio is unreliable right after a wake), an HTTP error, or an exception. The 1h20 gap then let the token cross its expiry, which is why recovery needed a Google sign-in. I cannot tell from the evidence which of network, HTTP error or exception it was (reasoned; a possible cause I cannot rule out is the phone's clock being ahead of Google's, which would make a token look valid after Google had expired it).

### b. Does anything retry after "sync failed"?

No. Reasoned from code, and reproduced in TEST_MODE (below).
- Timer: none. The only timer is the 2s debounce, and it fires once per save.
- `visibilitychange` / `focus` / `pageshow`: they call `recheckDriveToken()` (`app.js:4943`), which only shows "tap to resume" if the cached token has lapsed. It never starts a sync. With a valid token it does nothing.
- Next save: yes, the next `persist()` schedules a sync that pushes the whole state (`toPush` is rebuilt from the full state each time). That is the only automatic recovery.
- Page load: a connected device with a valid token schedules a catch-up sync. With an expired token it deliberately does not (`app.js:5128`).

Recovery today: log another entry (if the token is still valid), or reload with a valid token, or press the Drive button (a gesture), which opens Google's sign-in if the token has lapsed.

### c. What can run without a user gesture

- **Known from code**: a retry that uses a still-valid cached token needs no gesture. It is just `fetch` calls.
- **Known from code**: obtaining a new token (`requestAccessToken`) has exactly one call site, reached only from a tap (`connectDrive` button or the `pointerdown` listener), by design.
- **Guess / general browser knowledge, not tested here**: Chrome blocks the Google sign-in popup unless it follows a user gesture. Silent re-auth without a popup may succeed if Google's session cookie is readable in your browser, but SYNC-LESSONS item 7 says this increasingly fails; it is not something to build on. No refresh token is possible without a backend (hard rule 4).
- So a fix can retry **while the token is valid** with no gesture. After expiry the best it can do is say so clearly and make the next tap complete it, which the app already does once it knows.

### d. Flush on `visibilitychange` / `pagehide`? Link to bug 1?

- No Drive flush exists: the `visibilitychange` handlers at `app.js:2810`, `4468`, `4943`, `5446`, `5520` handle toast, category edit, token recheck and Sessions UI; `beforeunload` only flushes a category-name edit. A pending 2s debounce dies with the page (timers are paused or lost when a mobile tab is hidden or discarded).
- A flush on hide would not be reliable anyway: the push is a fetch of a few hundred KB and may not complete (`keepalive` fetches are capped at 64 KB). Not recommended.
- The local copy is already saved before the timer, and the next load schedules a catch-up sync (valid token), which covers a reload right after a save.
- **Could bugs 1 and 3 share a root cause?** Not on the evidence. In bug 3 the app showed "sync failed", so the page was alive and the sync code reached its `.catch`; a reload or navigation would have shown nothing of the kind. They could share a trigger (something the Chrome update changed about networking or tab lifecycle), but I have no evidence for that and I am not claiming it.

### e. Other ways a push is skipped or fails with no visible sign

| Case | What the UI shows | Source |
|---|---|---|
| Edit made while a sync is in flight: the 2s timer fires, `runDriveSync` returns at its guard, nothing reschedules | "Drive: synced" | `app.js:2382`; reasoned, no test seam (backlog 23e) |
| A Drive request that never settles (no timeout on `fetch`): `driveSyncInFlight` stays true, every later sync is silently blocked until reload | whatever it said before (usually "synced") | backlog 23f; same shape as hard rule 9; reasoned |
| Debounce timer lost: tab hidden, frozen or discarded within 2s of the save | "Saved HH:MM" / "Drive: synced" | reasoned; a valid-token reload recovers it |
| Exception after a good token but before the write (render, toast) | "Drive: sync failed", every time, until fixed | `app.js:2445`; reasoned |
| A 401 with a cached token Google already revoked: `.catch` shows "sync failed", pressing the button reuses the same cached token, fails again; **the cache is never cleared on a 401** | "Drive: sync failed" until the stored expiry passes | reasoned from `getAccessToken` and the `.catch`; worth testing in Phase 2 |
| Expired cached token | "tap to resume syncing" (visible) | `app.js:2397` |
| Local write fails (full storage) | "Not saved on this device" + red box | backlog 24 |
| Not connected / disconnected after an import | button says so only after an import | `importBackupJson` |

### f. Is there a view of how many changes have not reached Drive?

No. Nothing records "local differs from Drive" (backlog 23b); `toPush` is rebuilt from the full state at each sync. The status line and the Drive button sit **below** the grid on a phone (backlog 23c).

**Smallest honest signal (proposal only, not built, not on the backlog):** a device-local key (not synced, not part of `hours-ledger-v2`) holding the **time of the oldest edit not yet confirmed on Drive**. It is set on `persist()` if empty, and cleared only when a push is confirmed whose start is later than that time (a comparison of timestamps, not a boolean that can stick; hard rule 9). When it is older than ~60s, or a sync failed, show a one-line bar directly under the masthead (visible without scrolling on a phone): "Not on Drive yet since 14:32. Tap to sync." Tapping it calls `runDriveSync(true)` (a gesture, so it can open sign-in). No backend, no refresh tokens, no new data leaves the device. I would also have the `.catch` keep the error text and status code in that bar and in the console, so the next report says which of network/401/exception it was.

### g. Merge semantics and hard rule 7

None of the proposed fixes change `syncEngine`, `mergeRecords`, the payload shape or the tombstone logic. A retry only calls `runDriveSync` again, which already pushes full state through the same merge. The indicator reads timestamps and writes a separate device-local key. Rule 7 is untouched. (Hard rule 1: a new device-local key does not change `hours-ledger-v2` or its shape. Hard rule 10: it is a few bytes.)

### Reproduction (Step 4)

Test: `runPhoneBug3RecoveryTests()` in `selftest.html`, labelled **INTENTIONALLY FAILING**. Sequence: connect to the fake Drive; make the push throw; save an entry (button reads "Drive: sync failed", entry local only); clear the failure; seed a valid cached token (a real phone has one at this point; TEST_MODE never caches one, and without it the foreground event flips the button to "tap to resume", a test-mode artifact I hit and removed); fire `visibilitychange`, `focus`, `pageshow` (what a phone does when picked up); wait 5 seconds; assert the entry is on the fake Drive with no edit and no tap.

Actual output (scratch copy running only this block):

```
FAIL - 2 failing / 6 total
PASS  setup: fake Drive connect completed
PASS  setup: the push failed and the button reads 'Drive: sync failed'  [observed: Drive: sync failed]
PASS  setup: the entry is saved locally but not on Drive
FAIL  INTENTIONALLY FAILING (phone bug 3 repro): 5s after the failure cleared and the app was brought back to the foreground, with no edit and no tap, the entry is on Drive  [observed: on Drive: false; button: Drive: sync failed]
PASS  control: a later edit pushes the stuck entry
FAIL  GUARD: the run produced 5 rows, expected at least 1799 - tests did not all run (or were removed without lowering EXPECTED_MIN_ROWS)
```

The GUARD row is only the scratch copy running one block. The one real failure is the fourth row.

**Would the assertion flip if the real behaviour changed?** Yes, shown: with a throwaway "sync on `visibilitychange` when a valid token is cached" patch in a scratch copy of `app.js`, the same row passes (`on Drive: true; button: Drive: synced`). It would also flip for a short-timer retry (window is 5s). It would **not** flip for a wording change or an indicator only. It does not test the expired-token path (unreachable in TEST_MODE, section 1), which is why it targets the part of the report I could actually reproduce.

**Proposed fix and UX (Phase 2)**
1. In the `.catch` (and the `syncEngine` failure), record the error (status code or message) in the console and in the status text, and arm a retry: when the page becomes visible or regains focus **and** a valid cached token exists, run `runDriveSync(false)` once; plus a short backoff timer (e.g. 30s, then 2 min, capped) while the page is open. Reset by a successful sync, so no flag can stay stuck (hard rule 9: the retry is driven by events and a timer, not by a boolean set before an async call).
2. If the push fails with a 401, clear the cached token so the next attempt takes the "tap to resume" path instead of reusing a dead token.
3. The "not on Drive yet" bar from section 4f.
4. Do not flush on page hide (section 4d).

---

## 5. Are bugs 1 and 3 linked?

Not on the evidence. Bug 3's "sync failed" proves the page was running and the sync code reached its `.catch`. A navigation or reload before the sync would not show that message. A reload right after a save would, at worst, drop the 2s debounce, and the next load's catch-up sync covers it when the token is valid. They might share a trigger (a Chrome change affecting networking or tab lifecycle), but that is a guess I cannot support from this repo.

---

## 6. Other places this could fail silently (adjacent findings)

- The bare `.catch(function(){...})` in `runDriveSync` and in `connectDrive` discards the error; the sync log lines only cover the token step.
- `__driveDebug__.state()` is the right tool on a phone via remote debugging but does not include the last error.
- The "Drive: synced" label is set at page load before the first sync finishes (`app.js:5136`), and stays while a request is hung.
- A hung fetch is not covered by the hard-rule-9 audit (backlog 23f).
- Cached 401 token is reused until its stored expiry (section 4e).
- `CLAUDE.md` says the current release string is `sessions1`; `index.html` has `sessions4` (set in `829869c`). Documentation drift only.
- The Drive button and status line live below the grid on a phone (backlog 23c), so none of the above is visible while logging.

---

## 7. Questions for Sebastian

1. When did bugs 1 and 2 start (date), and which phone/OS is it (Android Chrome or iPhone Chrome)? The keyboard behaviour differs between them, and the last deploy was 2026-10-27.
2. Bug 1, what exactly changes: the URL, the visible week/day, the app reloading (unsaved sheet gone), or leaving the app for another page? Does the entry get saved? Does it happen after dragging on the grid, after Log now, or both?
3. Bug 2: does Save show if you do not tap the text field? Does it show when no category (so no presets) is chosen?
4. Bug 3: do you remember whether the phone was online when "sync failed" appeared (Wi-Fi/mobile data)? Was the Drive button showing "sync failed" or "tap to resume syncing" at the moment you saved?
5. Are you willing to attach the phone to the laptop with `chrome://inspect` for one session? It would turn several "reasoned" items above into "ran".
6. Phase 2 scope: fix the retry (4.1), the 401 cache clear (4.2) and the "not on Drive yet" bar (4.3) together, or the retry first?
7. For the save-jump (bug 1, candidate 1): keep the jump and add a toast naming the date, or stay on the current view? (Reverses a documented decision.)

---

## 8. Real-phone verification steps for each fix

Phone verification comes before anything is pushed to `main` (CLAUDE.md standing rule for touch/mobile layout). Real Google sign-in only works on the live origin and on `localhost`, so a sync fix can only be fully verified on the live site or via `localhost` with a tunnel; the layout fixes can use a LAN URL with `?hltest=1`. Say which you did.

**Forcing an expired token on the phone without waiting an hour**
- Easiest, needs the remote console (`chrome://inspect` on the laptop): `localStorage.setItem('hours-ledger-access-token', JSON.stringify({token:'x', expiresAt: Date.now()-1000}))`, then reload. The app should show "Drive: tap to resume syncing". 
- Without a console: sign out of the Google account on the phone, or revoke access at myaccount.google.com → Security → third-party access, then log an entry. The next sync uses the cached (now invalid) token and should hit the 401 path; this is the best way to test fix 4.2. Re-connect afterwards.
- To force "sync failed" with a valid token: turn on airplane mode, log an entry, wait for the button to read "sync failed", turn it off, bring the app to the foreground, and check that the entry reaches Drive without another edit (fix 4.1). Confirm on the laptop after a reload.

**Fix 4.1 (retry):** airplane-mode sequence above; also wait 2+ minutes with the app open to see the timer retry; also leave it ≥1h after the failure to confirm the app then says "tap to resume" (not "sync failed") and the next tap completes the sync.
**Fix 4.2 (401):** revoke access as above; press the Drive button twice; the second press should open sign-in, not fail the same way.
**Fix 4.3 (bar):** airplane mode, log an entry, confirm the bar appears under the masthead without scrolling, shows the time, tapping it syncs; confirm it disappears only after the entry is on Drive (check the laptop).
**Bug 2 fix:** repeat the checks in section 2 with the keyboard open and closed, with and without a category, URL bar shown and hidden, portrait and landscape. Save must be visible or reachable in every case.
**Bug 1 fix:** depends on the cause; first reproduce on the live site, then repeat the exact steps on the branch preview.
**Always:** hard reload the phone after a release (`HL_ASSET_VERSION` bumped), then log an entry, reload, confirm it is still there; undo works.

---

## 9. Anything that reverses an earlier design decision (flag, don't flip)

- **Retry after a failed push.** Backlog 23, decided 2026-10-05: "no retry, no pending indicator now", with the trigger "a second reproducible occurrence, or evidence that other people use sync". This report is a second occurrence with a stuck entry. Building 4.1 and 4.3 reverses that decision. Needs your explicit go.
- **No flush on page hide** is consistent with current behaviour; I recommend keeping it.
- **Save jumps to the entry's week** (`saveSheet`, comment "land wherever the entry actually went"). Changing it reverses that comment's decision.
- **Hard rule 6 (no restructuring):** all proposals are small and local; none restructures.
- **Hard rule 9:** the retry design above avoids a boolean guard; keep it that way.
- **CLAUDE.md "no sync indicator below the fold" (backlog 23c)** is an open item; the bar in 4.3 would resolve part of it.

---

## Files changed on this branch

- `DIAGNOSIS.md` (new)
- `selftest.html`: `runPhoneBug3RecoveryTests()` (+76 lines), added to the async chain after `runFailedPushTests()`. Intentionally failing until Phase 2.
