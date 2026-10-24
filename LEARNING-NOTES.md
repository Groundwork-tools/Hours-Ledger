# Learning notes: how the suggestion detector works, and why

Written for you, Sebastian. Plain language, no code. The code is `detectPackages()` and `suggestPackages()` in `app.js`; the numbers' history and
every "ran / reasoned only" claim is in `OVERNIGHT-STATUS.md`. This replaces the earlier note about the removed one-block detector.

## What it is for

Logging should take as few taps as possible. If you do the same run of things at about the same time on many days (get ready, bike, Muay Thai),
the app can offer to save that run as a **session**, and a session can later be logged in one tap. The detector only ever **proposes** creating a
session. It never logs anything and never changes your entries.

## Step 1: is this a habit, or luck? (the noise filter)

Any big log contains coincidences: with 20 entries a day, some category will land in the same 15-minute stretch on several days by chance. So a
cluster of dates only counts if it is bigger than chance would produce **in a log like yours**.

- The app works out the threshold from **your own log**: how many entries each category has, how many days you logged, which weekdays.
  More days and more entries mean more chances for luck, so the bar rises as the log grows. A fixed number (the first version used 12 dates)
  was right for 88 days and wrong at 150: chance alone cleared 12 in three of four scrambled logs.
- Two tests, each allowed to be fooled 2.5% of the time, so at most 5% together: "many different days" (any weekday), or "many times on one
  weekday" (this is how a once-a-week habit is found after about six weeks).
- Below **35 logged days** nothing is suggested at all: the smallest log in which even a weekly habit logged every week could pass.
- The formula was checked against a simulation that scrambles the time of day of every day in your own export (weekday labels kept) and counts
  how often chance alone passes. At 35 to 250 days that came out 0.7% to 2.8%. `tools/validate-noise-filter.py` repeats the check on any export.

**What is not proven.** The simulation can only reuse your 88 real days, so numbers for logs longer than that rest on resampled days. They stay
unvalidated until a real log of 150+ days exists. And all of it comes from one person's log.

## Step 2: one night is one block (the midnight fold)

Sleep from 23:00 to 07:00 is stored as two entries (before and after midnight). For detection they are put back together as one Sleep block on
the evening's date, if both halves have the same category and the same label.

## Step 3: packages, not single blocks

A package starts from a first block that passed the filter. The detector then looks at what usually comes next (same category, about where the
previous block ended plus the usual gap) and keeps extending while the next block follows on at least half of the first block's days. The 50% is
chosen by comparing with your own "yes" labels, not derived from statistics. Two time variants of the same sequence within 30 minutes are merged;
a package that starts the same way as a higher-ranked one is dropped (absorbed). A package already covered by one of your sessions is not offered.

## Step 4: ranking by entries saved a week

Each package is ranked by how many entries it would save you per week: how often the whole package happened in the last 56 days, times its
number of blocks. A habit you stopped falls down the list and comes back up if you resume. The 56 days is a design choice, not a measurement.

A habit you stopped also fades out of the list entirely after a while, because the bar rises with the log while its old count stays the same
(the school package after about 16 weeks of nothing). That is deliberate: a chance filter, not a "hide forever" rule.

## What you see and what happens when you press

The Sessions sheet shows at most three cards: the exact clock time of every step, how many full days it happened, which weekdays, and about how many
entries a week it would save. "Create session from this" makes one session with all the blocks, no schedule, logs nothing, one undo step.
"Not now" hides it on this device only (never synced). If you later give a session a schedule, the banner asks "Did this happen?" and the Yes
button shows the exact times it will log, because a one-tap yes can quietly put the session's stored times into your log instead of what really
happened. Export week says so too, since it cannot tell those entries from hand-logged ones.

## What this cannot tell you

- That a suggestion is a good idea, or that it matches your intention. Only you can say "not now".
- Anything about other people's logs: one person's data built it. A second real log is needed before it is trusted.
- How it looks on a phone: nothing here has been seen on a real screen.
