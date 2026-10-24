#!/usr/bin/env python3
"""Check the in-app noise filter (app.js: noiseThresholds / clusterQualifies) against a simulation, on YOUR export.

    python3 -I tools/validate-noise-filter.py <export.json> [scrambles] [sizes]
        e.g.  python3 -I tools/validate-noise-filter.py my-export.json 300 35,60,88

Not part of the app: nothing in the browser loads this, and it contains no data. Run it on a COPY of your own
export ("Export a copy"); it only reads. It replaces tools/derive-min-dates.py (the fixed-12 number it derived was
only right for ~88 logged days).

What it does, for each size N (a random N-day subset of your logged days; resampled with replacement if N is larger
than your log):
  1. computes the app's closed-form thresholds kAll / kWd for that subset (the same formula as app.js, with the same
     constants: c0_all 4.0, c0_wd 3.25, alpha 2.5% each, 16-minute window);
  2. scrambles every day's times of day by a random offset (weekday labels kept, so a real habit is destroyed but the
     log's size, density and weekday mix are not) and checks whether chance alone makes a cluster that clears
     kAll (any weekday) or kWd (one weekday);
  3. prints how often that happened over the scrambles = the COMBINED false-positive rate at the closed-form pair
     (design target: at most 5%, two tests of 2.5% each). It also prints the smallest k the simulation itself would
     pick for each test, so you can see how far the closed form is from it (it should be within 1).
Sizes above your log's length rest on resampled days and say less than a real log of that length would (CLAUDE.md:
thresholds above 150 days are unvalidated until a real 150+ day log exists).
"""
import json, math, random, sys, collections, datetime as dt

TOL, W = 15, 16
C0_ALL, C0_WD, ALPHA = 4.0, 3.25, 0.025

def pois_tail(l, k):
    if l <= 0: return 0.0
    t, term = 0.0, math.exp(-l)
    for i in range(k):
        t += term; term *= l / (i + 1)
    return max(0.0, 1 - t)

def thresholds(days):
    la, lw = collections.defaultdict(float), collections.defaultdict(float)
    for wd, es in days:
        for c, m in collections.Counter(c for c, s in es).items():
            p = 1 - (1 - W / 1440) ** m
            la[c] += p; lw[(wd, c)] += p
    def pick(lams, c0):
        for k in range(2, 400):
            if 1 - math.exp(-c0 * (1440 / W) * sum(pois_tail(l, k) for l in lams.values())) <= ALPHA: return k
        return 400
    return pick(la, C0_ALL), pick(lw, C0_WD)

def sweep(occ):
    occ.sort(); cnt = collections.Counter(); dist = j = best = 0
    for i in range(len(occ)):
        while j < len(occ) and occ[j][0] - occ[i][0] <= TOL:
            if cnt[occ[j][1]] == 0: dist += 1
            cnt[occ[j][1]] += 1; j += 1
        best = max(best, dist); cnt[occ[i][1]] -= 1
        if cnt[occ[i][1]] == 0: dist -= 1
    return best

def biggest(days):
    a, w = collections.defaultdict(list), collections.defaultdict(list)
    for k, (wd, es) in enumerate(days):
        for c, s in es:
            a[c].append((s, k)); w[(wd, c)].append((s, k))
    return max(sweep(o) for o in a.values()), max(sweep(o) for o in w.values())

def main():
    export = sys.argv[1]
    seeds = int(sys.argv[2]) if len(sys.argv) > 2 else 300
    state = json.load(open(export))
    known = {c['id'] for c in state['categories']}
    real = []
    for d, es in sorted(state['entries'].items()):
        es = [(e['cat'], e['start']) for e in es if e.get('cat') in known and e['start'] > 0 and e['end'] > e['start']]
        if es: real.append((dt.date.fromisoformat(d).weekday(), es))
    sizes = [int(x) for x in sys.argv[3].split(',')] if len(sys.argv) > 3 else [35, 60, 88]
    print('logged days with usable entries: %d' % len(real))
    for N in sizes:
        r = random.Random(N)
        if N > len(real): print('N=%d: resampled from %d real days (unvalidated beyond the real log)' % (N, len(real)))
        hits, ka_all, kw_all, ma_all, mw_all = 0, [], [], [], []
        for s in range(seeds):
            days = r.sample(real, N) if N <= len(real) else [real[r.randrange(len(real))] for _ in range(N)]
            ka, kw = thresholds(days)
            scr = []
            for wd, es in days:
                off = r.randrange(1440); scr.append((wd, [(c, (st + off) % 1440) for c, st in es]))
            ma, mw = biggest(scr)
            hits += (ma >= ka or mw >= kw)
            ka_all.append(ka); kw_all.append(kw); ma_all.append(ma); mw_all.append(mw)
        def q(v, p): v = sorted(v); return v[min(len(v) - 1, int(p * len(v)))]
        sim_ka = q(ma_all, 1 - ALPHA) + 1; sim_kw = q(mw_all, 1 - ALPHA) + 1
        print('N=%3d  closed form kAll %d..%d  kWd %d..%d | simulation would pick kAll %d, kWd %d | combined false-positive rate at the closed-form pair: %.1f%% (%d scrambles; target <= 5%%)'
              % (N, min(ka_all), max(ka_all), min(kw_all), max(kw_all), sim_ka, sim_kw, 100.0 * hits / seeds, seeds))

if __name__ == '__main__':
    main()
