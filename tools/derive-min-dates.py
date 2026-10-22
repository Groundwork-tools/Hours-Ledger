#!/usr/bin/env python3
"""Re-derive DETECT_MIN_DATES (app.js) from a full Hours Ledger export ("Export a copy").

    python3 -I tools/derive-min-dates.py <export.json> [seeds]

Not part of the app: nothing in the browser loads this, and it contains no data. Run it on a COPY of your
own export (it only reads). It answers one question: "if each day's entries kept their contents but their
times of day were scrambled, how big a same-category, same-time-of-day cluster of distinct dates would
chance alone produce?" The minimum-dates number is the smallest k for which chance produced a cluster of
k dates in at most 5% of the scrambles. More logged days make chance clusters bigger, so re-run it as the
ledger grows; the value in app.js (12) was derived from 88 logged days and 1000 scrambles.

The clustering mirrors detectPatterns(): per category, the 15-minute window (inclusive) holding the most
distinct dates, entries starting at 00:00 left out.
"""
import json, random, sys, collections

TOL = 15
export, seeds = sys.argv[1], int(sys.argv[2]) if len(sys.argv) > 2 else 300
days = {d: [(e['cat'], e['start']) for e in es] for d, es in json.load(open(export))['entries'].items()}

def biggest(day_map):
    per_cat = collections.defaultdict(list)
    for date, es in day_map.items():
        for cat, start in es:
            if cat and start > 0:
                per_cat[cat].append((start, date))
    best = 0
    for occ in per_cat.values():
        occ.sort()
        cnt, dist, j = collections.Counter(), 0, 0
        for i in range(len(occ)):
            while j < len(occ) and occ[j][0] - occ[i][0] <= TOL:
                if cnt[occ[j][1]] == 0: dist += 1
                cnt[occ[j][1]] += 1; j += 1
            best = max(best, dist)
            cnt[occ[i][1]] -= 1
            if cnt[occ[i][1]] == 0: dist -= 1
    return best

maxima = []
for seed in range(seeds):
    r = random.Random(seed)
    shifted = {}
    for date, es in days.items():
        off = r.randrange(1440)
        shifted[date] = [(c, (s + off) % 1440) for c, s in es]
    maxima.append(biggest(shifted))
print('logged days:', len(days), ' scrambles:', seeds)
chosen = None
for k in range(3, 40):
    p = sum(1 for m in maxima if m >= k) / seeds
    if k <= 20: print('  k=%2d  chance produces a cluster of >= k dates in %5.1f%% of scrambles' % (k, 100 * p))
    if chosen is None and p <= 0.05: chosen = k
print('smallest k at or under 5%%: %s   (real data\'s biggest cluster: %d dates)' % (chosen, biggest(days)))
