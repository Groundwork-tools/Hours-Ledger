# Learning notes: how the pattern detector works, and why

Written for you, Sebastian, after building stage 3 of sessions. Plain language, no code. The code is
`detectPatterns()` in `app.js`; the numbers' history is in `OVERNIGHT-STATUS.md`.

## The question the detector asks

"Is there something I log, in the same category, at about the same time of day, on many different days?"
That is all. It does not know what you were doing, only the category and the start time you logged. It
proposes creating a session. It never logs anything for you.

## Step 1: finding a cluster (the 15-minute window)

For each category, imagine all the start times laid out on one line from 00:00 to 24:00. A cluster is a
15-minute stretch of that line that touches the most **different days**. The detector finds the busiest
15-minute stretch, takes it as one cluster, removes those entries, and looks for the next busiest.

- **Why 15 minutes?** Your real Muay Thai started anywhere from 06:15 to 06:25. A window narrower than that
  would cut one habit into two. This is the number I am least sure about: it comes from **one** real habit.
  A second habit would tell us whether 15 is right in general.
- **Why "most different days" and not "most entries"?** Two entries on one day are still one day. Counting
  days is what "I do this regularly" means.
- **Why the busiest window and not "start at the first entry and look 15 minutes ahead"?** A stray entry
  just before a real cluster would become the starting point and slice the cluster's natural wobble in two.
  The busiest-window version is not fooled by that. (A test, mutation `P31`, checks this.)

## Step 2: how many days is enough (the minimum)

A cluster needs at least **12 distinct days**. This number was not guessed; it was measured, like this:

1. Take your real log. Keep every day's entries exactly as they are, but slide each day's times by a
   random amount (a different amount for each day). Now no habit is tied to a time of day any more: if a
   cluster still shows up, **pure chance** made it.
2. Count the biggest cluster chance produced. Do that 1000 times.
3. Pick the smallest k where chance reached k days in at most 5 out of every 100 tries.

The answer was 12 (at 11 days chance got there 5.2% of the time, just over the line; at 12, 1.1%).

**Honest note about that number.** My first pass said 11, using a simpler way of finding clusters and only
300 tries. When I rebuilt it with the detector's real method and 1000 tries, 11 turned out to be just on
the wrong side of my own 5% rule, so I followed the rule and used 12. Nobody changed it to make a test
pass; the tests were updated to match. That is also a lesson: 300 tries could not tell 4.7% from 5.3%.

**Limit.** This 12 only fits about 88 logged days. With more history, chance gets more opportunities and the
biggest chance cluster grows. **And it grows fast: in weeks, not months.** I measured it (2026-10-23): with the
fixed 12, chance alone makes a cluster that big in 1% of scrambled logs at 88 days, 8% at 110 days, 75% at 150 days
and always at 250 days. The 5% line is crossed at about 105 logged days. So a fixed number is wrong; the threshold
has to be worked out from the length (and shape) of your own log. (An earlier version of this note said "every few
months", which was wrong.)

## Step 3: ranking, "weekday concentration"

Suppose a thing happened on 14 days. If weekdays did not matter, each of those days would land on any
given weekday with chance 1 in 7. So we expect about 2 per weekday. Your Muay Thai get-ready happened on 14
days and **7 of them were Fridays**. How surprising is 7 Fridays out of 14? That is a standard calculation
(a binomial tail). The answer is the **p-value**: the chance of seeing a weekday that busy if weekdays were
irrelevant. Small = the habit is tied to particular weekdays. Big (close to 1) = it just happens whenever.

- I multiply by 7 because I am allowed to look at **any** of the 7 weekdays and say "that one looks busy".
  Looking at seven options and picking the best makes a lucky result more likely, so I pay for it. (This
  makes the p-value cautious: it can only be too big, never too small.)
- A routine you do **every day** (sleep, breakfast) has no favourite weekday, so its p is near 1 and it
  ranks last. That is deliberate: a big every-day cluster should not outrank a smaller weekly habit, because
  the weekly one is the more interesting to schedule.

## Why there is no cut-off ("only show it if p is under 0.05")

I tested this on your real data by shuffling which weekday each day was labelled as (that destroys real
weekday habits but keeps everything else) and asking "how small a p does chance alone give for the best
candidate?" The shuffled data's best p was often 0.01 or lower, and your real Muay Thai came out at about
0.0035-0.0115. So the real habit was **better than a typical shuffle but not clearly outside the shuffles'
range**. Any cut-off would either hide Muay Thai or let noise through. So instead of a pass/fail gate the
detector gives a ranked list, you look at the evidence (the dates and weekdays are shown), and you decide.

## What the "null" is, and why it exists

A **null** is a pretend world where the thing you are looking for does not exist, built from your own data
so it has the same size and texture. You run the detector there and see what it "finds". Whatever it finds
in the pretend world is what chance produces, and your real result only means something if it beats that.
Two nulls were used here:

- **Time-shift null** (scramble the time of day): used to pick the minimum number of days (Step 2).
- **Weekday-shuffle null** (scramble which weekday a day was): used to check how far the weekday ranking can
  be trusted (above).

## What this can and cannot tell you

- It can say "these entries line up in time, and lean toward these weekdays". It cannot say you *intend*
  to do it, or that it is a good habit.
- It was fitted on **one** real habit (Muay Thai) in 88 days. The 15 minutes and the 12 days should be
  re-checked when a second habit shows up.
- A habit that crosses midnight is not found (entries starting at 00:00 are left out, because those are
  the morning half of something that started the evening before).
- Habits shorter than 12 days old are not found yet. That is the price of not suggesting chance.
- The test suite proves the code does what it is described to do on generated data. It does not prove
  the suggestions feel useful. Only you using it can show that.
