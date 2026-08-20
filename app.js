(function(){
"use strict";

/* ---------------- installable on a phone ---------------- */
var ICON192="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAIAAADdvvtQAAABr0lEQVR42u3dsQmDQBSAYRXHSBnIBIJlyoyQNTKJa2SElCkFJxBSuoNwVTawkOPM5b5vAMHnz7N8dQhrBXs1RoCAEBACQkAgIASEgBAQCAgBISAEBAJCQAgIAYGAEBACQkAICASEgBAQAgIBISAExD9rYz3odDmbZl6W+WMD4ReGgBAQCAgBISAEBAJCQAgIAYGAEBACQkAgIASEgBAQAgIBISAERGlqZ7+xgRAQAkJAICAEhIAQEAgIASEgBAQCQkAICAGBgBAQAkJACAgERGrR7oV1j7tpbpuGpw0EAkJACAgBISAjQEAICAEhIBAQAkJACAgEhIAQEAICASEgBISAQEAIiGO5F4YNhIAQEAICASEgBISAQEAICAEhIBAQAkJACAgEhIAQEAJCQCAgkot2L+x17X//bW/v0Se3gRAQAgIBISAEhIAQEAgIASEgBAQCQkAICAGBgBAQAkJAICAEhIAQECVzLwwbCAEhIAQEAkJACAgBgYAQEAJCQCAgBISAEBAICAEhIASEgEBACAgBISAQEAJCQAgIBISAEBACAgEhIASEgBAQCAgBkaEv7roWL2d30JMAAAAASUVORK5CYII=";
var ICON512="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAIAAAB7GkOtAAAF6UlEQVR42u3XsQnCQBiG4Vy4MVIGnECwtMwIrpFJXMMRLC0FJxAs3eHgrxwigeS859ngvite/hRROgDa05sAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAEAAABAAAAQBAAAAQAAAEAAABAEAAANi/XPsDhsPoF4GtfN8fFwAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAIAAmABAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABABAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABACgdSmiWAHABQCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAACryrU/4Dhf/CIte11vRsAFAIAAACAAAAgAAAIAIAAmABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAANhSiihWAHABACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAwKpy7Q+4n09+sS7T42kEcAEAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAACIAJAAQAAAEAQAAAEAAA/keKKFYAcAEAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAs9gMb9xiveYI2DwAAAABJRU5ErkJggg==";
try{
  var mf={name:"Hours Ledger",short_name:"Hours",display:"standalone",orientation:"portrait",
    background_color:"#FAFAF7",theme_color:"#FAFAF7",start_url:".",scope:".",
    icons:[{src:ICON192,sizes:"192x192",type:"image/png",purpose:"any"},
           {src:ICON512,sizes:"512x512",type:"image/png",purpose:"any"}]};
  var ml=document.createElement("link");
  ml.rel="manifest";
  ml.href=URL.createObjectURL(new Blob([JSON.stringify(mf)],{type:"application/manifest+json"}));
  document.head.appendChild(ml);
}catch(e){}


/* ---------------- storage ---------------- */
var mem={}, storageOK=true;
try{ localStorage.setItem("__t","1"); localStorage.removeItem("__t"); }catch(e){ storageOK=false; }
function readStore(k){ try{ return storageOK?localStorage.getItem(k):(mem[k]||null); }catch(e){ return mem[k]||null; } }
function writeStore(k,v){ try{ storageOK?localStorage.setItem(k,v):(mem[k]=v); }catch(e){ mem[k]=v; } }

/* hltest=1 is only ever set by selftest.html, so it can exercise real save/undo
   logic without ever touching the real saved weeks under KEY/UKEY below */
var TEST_MODE=location.search.indexOf("hltest=1")>-1;
/* a real confirm() blocks on a dialog nothing in a headless run can click -
   auto-accept under TEST_MODE only, so Clear-this-week and the Drive
   connect flow's export nudge are actually reachable by a test instead of
   either hanging or silently auto-cancelling and making it look like the
   flow ran when it never got past the dialog */
if(TEST_MODE) window.confirm=function(){ return true; };
var KEY=TEST_MODE?"hours-ledger-selftest-v2":"hours-ledger-v2";
/* v1's category.verdict (one verdict, shared by every week) was replaced by
   weeklyVerdicts (one verdict per category per week) below - this is the
   real key-and-shape migration hard rule 1 asks for. v1 is read once here
   to carry existing verdicts forward as "this week"'s, then left untouched. */
var OLD_KEY="hours-ledger-v1";
/* validated categorical palette (picker redesign, 2026-08-20 - superseded
   its own first draft the same night: an earlier 19-color version, built
   around keeping the original 8 plus softer additions, is gone entirely -
   this replaced it, not extended it, once the brief changed to a fixed
   10-anchor-hue structure that the old 8 didn't fit). 15 presets total: 10
   named anchor hues (Red, Orange, Brown, Yellow, Green, Light blue, Blue,
   Dark blue, Purple, Light purple), each validated individually, plus 5
   second shades ("nuances") distributed one-per-family across 5 of the 7
   non-blue anchors - Light/Blue/Dark-blue already has 3 shades of one
   family by design (the cap this file uses everywhere: "no more than 3
   shades of any single family"), so blue was excluded from getting a 6th.
   Yellow and Purple ended up with only their one anchor shade, not by
   preference but because an exhaustive search over all 21 ways to choose
   5-of-7 families for a nuance found every combination that gave either of
   them a second shade scored worse (lower worst-adjacent-pair margin) than
   the winning combination (Red/Orange/Brown/Green/Light-purple) - a
   measured result, not eyeballed balance.
   Red is now a normal preset hue, not excluded - see CLAUDE.md's Design
   constraints section for the reversal and its reasoning (Hours Ledger has
   no "wrong" state for a reserved warning color to protect - the flag
   color itself is unchanged for destructive actions and stays Drift's
   default, but no hue is off-limits to category presets anymore).
   Chose the OKLCH L for each anchor with the paper surface's own
   contrast floor in mind, same finding as the previous draft: anything
   paler than L~0.65 fails the 3:1 contrast floor against paper (#FAFAF7,
   itself near-white at OKLCH L~0.98) regardless of hue, confirmed by
   direct sweep - which is why "Yellow" here reads as mustard/gold rather
   than a bright lemon yellow; true bright yellow cannot pass this app's
   own contrast rule at any hue. Light/Blue/Dark-blue and Purple/Light-
   purple lean on lightness, not a second hue, to differentiate within
   their family - same "light X / X / dark X" logic a name implies.
   PASSES CLEANLY, no floor-band reliance anywhere (contrast every other
   entry in this file's history where a WARN got shipped and flagged as
   fragile): worst adjacent CVD ΔE 18.2 (target ≥8), worst adjacent
   normal-vision ΔE 18.5 (gate ≥15) - real margin on both, not a knife
   edge. All 15 individually clear the lightness band and chroma floor too.
   Does NOT pass all-pairs CVD separation at this count, same as every
   version of this palette before it and the original 8 before that (see
   the dataviz skill's own documented limit: no ordering of even 8 hues
   clears all-pairs beyond 3) - this file has never claimed that standard.
   THE ORDER BELOW IS LOAD-BEARING: a locally-optimized "theme" (random-
   restart pairwise-swap search maximizing the worst adjacent pair, CVD
   prioritized over normal-vision margin since CVD has been the binding
   constraint throughout every version of this exercise), not hue-sorted
   or cosmetic. Never reorder, insert, or resort this array without
   re-running the six-check validator (dataviz skill's
   scripts/validate_palette.js) against the exact resulting adjacent
   sequence - and if red-hue exclusion is ever reinstated for some other
   reason, that's a new constraint to validate against, not a reason to
   assume this array still passes without re-running the check. */
var SWATCHES=["#418E47","#1F74BF","#9A2F00","#D36C6E","#823B15","#A28700","#B171B4","#C56C21",
  "#0999B2","#284E99","#519962","#8059BB","#B94642","#8C7ACB","#B26232"];
function uid(){ return Math.random().toString(36).slice(2,9); }

/* fixed ids (not uid()) so two fresh installs agree their starter
   categories are literally the same record, no reconciliation needed at
   all - see CLAUDE.md's "DEFAULTS is frozen" note for why the ids AND the
   names/colors below must never change without a migration once shipped.
   Names/colors were never random (uid() only ever touched id), but they
   HAVE changed across this app's own history (the palette validation
   work re-tuned every hex value here) - that's the actual root cause of
   the real duplication incident this file's sync tests are named after:
   two installs seeded under two different generations of this same
   object, with no way to tell "the same category, recolored" apart from
   "genuinely two different categories" by content alone. Fixed ids don't
   retroactively fix installs that already diverged before this line
   existed - that's what dedupeCategoriesByName() is for. */
var DEFAULTS={
  version:2,
  settings:{startHour:6,endHour:24},
  categories:[
    {id:"seed-studies",name:"Studies",color:"#2B52A1"},
    {id:"seed-work",name:"Work / income",color:"#27864F"},
    {id:"seed-side-projects",name:"Side projects",color:"#B18725"},
    {id:"seed-training",name:"Training",color:"#0E9DAA"},
    {id:"seed-people",name:"People",color:"#A63A9D"},
    {id:"seed-admin",name:"Admin & errands",color:"#1D669A"},
    {id:"seed-sleep",name:"Sleep",color:"#6C3BB0"},
    {id:"seed-drift",name:"Drift",color:"#B23A2F"}
  ],
  entries:{},
  weeklyVerdicts:{},
  weekCloseouts:{}
};

/* converts an old (or freshly-imported) state that stores verdict on each
   category into one using weeklyVerdicts, carrying each category's current
   verdict forward as this week's. No-op if already converted. */
function migrateVerdicts(s){
  if(!s.weeklyVerdicts) s.weeklyVerdicts={};
  var hasOldVerdicts=s.categories.some(function(c){ return "verdict" in c; });
  if(hasOldVerdicts){
    var thisWeek=iso(mondayOf(new Date()));
    if(!s.weeklyVerdicts[thisWeek]) s.weeklyVerdicts[thisWeek]={};
    s.categories.forEach(function(c){
      if(c.verdict) s.weeklyVerdicts[thisWeek][c.id]=c.verdict;
      delete c.verdict;
    });
  }
  return s;
}
/* Recent custom colors (picker redesign, 2026-08-20) - device-local only,
   deliberately: state.settings is never part of the Drive sync payload
   (syncEngine() only ever touches categories/entries/verdicts/closeouts -
   startHour/endHour have always been device-local too, same precedent),
   and a convenience list of recently-tapped colors is low-stakes enough
   that following that precedent beats inventing a new merge policy for a
   bare array with no per-record id/timestamp. Capped at 8 (same size as
   the original preset row), most-recent first, deduped by hex so re-picking
   an already-recent color just moves it to the front rather than
   duplicating it. */
var RECENT_COLORS_MAX=8;
function migrateRecentColors(s){
  if(!s.settings.recentColors) s.settings.recentColors=[];
  return s;
}
function pushRecentColor(hex){
  if(!state.settings.recentColors) state.settings.recentColors=[];
  var rc=state.settings.recentColors.filter(function(h){ return h!==hex; });
  rc.unshift(hex);
  state.settings.recentColors=rc.slice(0,RECENT_COLORS_MAX);
}
/* the Keep/Compress/Cut verdict scale became Increase/Keep/Cut (see
   CLAUDE.md) - "compress" has no honest translation onto the new scale,
   so any verdict still set to it is cleared outright rather than guessed
   at. Reuses setVerdict's own v=null branch, not an inline delete, so
   this is a REAL delete wherever sync fields already exist: a plain
   local removal would leave the old value looking untouched to any other
   device syncing against it, letting a stale un-updated device's
   "compress" write resurrect it right back (hard rule 7) - it needs a
   tombstone like any other delete. Called at the same three points
   migrateVerdicts() is (initial load, undo/redo, import) - that covers
   every device's own local data on its own next load. It does NOT by
   itself cover a stale device pushing a FRESH "compress" over sync after
   this has already run once here; see sweepCompressVerdicts() below,
   inside syncEngine(), for the continuous half of this fix. */
function migrateVerdictScale(s){
  Object.keys(s.weeklyVerdicts).forEach(function(weekIso){
    Object.keys(s.weeklyVerdicts[weekIso]).forEach(function(catId){
      if(s.weeklyVerdicts[weekIso][catId]==="compress") setVerdict(catId,weekIso,null);
    });
  });
  return s;
}
/* one-time repair for real data corrupted by the gap setVerdict's live-set
   branch had before its fix above: a key sitting live in weeklyVerdicts AND
   tombstoned in deletedVerdicts at once - most likely seeded by
   sweepCompressVerdicts converting an old "compress" leftover into a
   tombstone, then a later click setting a fresh verdict for that same key
   without clearing it (the exact gap the fix above closes going forward).
   flattenVerdicts' own guard (see its comment) would keep this from
   corrupting a live sync, but real stored data can already be sitting in
   this state right now from before either fix existed - this cleans that up
   directly, once, per device.

   Resolves each collision by comparing timestamps via verdictCollisionWinner,
   the same "newer wins, unknown stays live" principle mergeRecords uses -
   never a blind "tombstone always wins" or "live always wins" rule. The
   surviving record's own updatedAt/updatedBy is left exactly as it was; the
   loser is deleted outright rather than run back through setVerdict, which
   would fabricate a brand new timestamp/device for a fact that already has a
   real one.

   Called at the same three points migrateVerdicts()/migrateVerdictScale()
   are (initial load, undo/redo, import), after migrateVerdictScale
   specifically - a live "compress" value colliding with an old tombstone
   gets cleared by that migration's own setVerdict(...,null) call regardless
   of which side is newer, since compress has no honest value to keep either
   way; this migration only ever sees whatever collisions are left after
   that. Console-only, not a toast: unlike sweepCompressVerdicts (an ongoing
   process someone could otherwise never notice), this is a one-time repair
   that can't recur once every device is on the fix above. */
function migrateVerdictTombstoneCollisions(s){
  if(!s.deletedVerdicts) return s;
  Object.keys(s.deletedVerdicts).forEach(function(key){
    var sep=key.indexOf("|"),weekIso=key.slice(0,sep),catId=key.slice(sep+1);
    var live=s.weeklyVerdicts[weekIso]&&(catId in s.weeklyVerdicts[weekIso]);
    if(!live) return;
    var liveMeta=s.verdictMeta&&s.verdictMeta[key];
    var tombstone=s.deletedVerdicts[key];
    var winner=verdictCollisionWinner(liveMeta&&liveMeta.updatedAt,tombstone.updatedAt);
    if(winner==="tombstone"){
      console.log('Hours Ledger: resolved a verdict stuck both live and deleted at once (week '+
        weekIso+", category "+catId+') - the tombstone was newer, cleared the stale live value.');
      delete s.weeklyVerdicts[weekIso][catId];
      if(s.verdictMeta) delete s.verdictMeta[key];
    }else{
      console.log('Hours Ledger: resolved a verdict stuck both live and deleted at once (week '+
        weekIso+", category "+catId+') - the live value was newer (or had no timestamp to compare), cleared the stale tombstone.');
      delete s.deletedVerdicts[key];
    }
  });
  return s;
}
function migrateFromOldKey(){
  if(TEST_MODE) return null; /* test mode never reads or touches real data */
  var raw=readStore(OLD_KEY);
  if(!raw) return null;
  var old;
  try{ old=JSON.parse(raw); }catch(e){ return null; }
  if(!old||!old.categories) return null;
  migrateVerdicts(old);
  old.version=2;
  writeStore(KEY,JSON.stringify(old)); /* OLD_KEY itself is never written to */
  return old;
}

/* ---------------- sync engine (see CLAUDE.md hard rule 7 / SYNC-LESSONS.md) ----------------
   Everything in this section is pure - takes state in, returns a result, touches no
   globals except DEVICE_ID's own storage key and (under TEST_MODE only) FAKE_DRIVE.
   No network code lives here at all yet; that's the connect flow, a separate piece
   of work reviewed on its own before it exists. This section only has to be correct
   in isolation, which is exactly what makes it fully testable without a Drive
   account, real or fake OAuth, or any UI. */

/* DEVICE_ID lives outside synced state entirely, generated once per browser
   profile and never written by anything that came from a merge - it exists solely
   to tell "a stale echo of my own earlier push" apart from a genuine edit from
   another device (see mergeRecords below). Created lazily, the first time
   anything actually needs it (a migration or a merge), not at every page load -
   so a browser that never touches sync never gets even this one extra key. */
var DEVICE_KEY=TEST_MODE?"hours-ledger-device-id-TESTMODE":"hours-ledger-device-id";
function getDeviceId(){
  var id=readStore(DEVICE_KEY);
  if(!id){ id=uid()+uid(); writeStore(DEVICE_KEY,id); }
  return id;
}

function nowIso(){ return new Date().toISOString(); }

/* categories are mutated in place (rename, recolor) rather than replaced like
   an edited entry is, so - unlike entries - a stale updatedAt left over from
   a previous sync would otherwise outlive a real edit and let a later merge
   compare against the wrong moment. Entries don't need this: every edit
   already produces a brand new id with no prior updatedAt to go stale, so
   lazy migration at the next sync stamps it correctly regardless. Same
   state.deletedCategories gate as everywhere else - a no-op until this
   device has actually connected once. */
function bumpCategory(c){
  if(state.deletedCategories){ c.updatedAt=nowIso(); c.updatedBy=getDeviceId(); }
}

/* Stamps every entry/category that predates sync with updatedAt/updatedBy, and
   makes sure the two tombstone containers exist. Idempotent (checks !e.updatedAt
   per record, not a one-time flag) and safe to call on already-migrated data -
   it's the SAME function whether this is a device's first-ever connect or one
   that's synced for months, so there's no separate "already migrated" code path
   to keep in sync with this one.
   Deliberately NOT called from the three places migrateVerdicts() is (initial
   load, applyState, import) - unlike that migration, this one writes new fields
   into local storage, and a browser that never opts into sync should never see
   so much as one new byte from this feature. It only ever runs lazily, the
   moment something that actually needs sync fields calls it (the connect flow -
   not built yet - or a test/dry-run standing in for one). */
function migrateSyncFields(s){
  var stamp=nowIso(),dev=getDeviceId();
  Object.keys(s.entries).forEach(function(dateStr){
    s.entries[dateStr].forEach(function(e){
      if(!e.updatedAt){ e.updatedAt=stamp; e.updatedBy=dev; }
    });
  });
  s.categories.forEach(function(c){
    if(!c.updatedAt){ c.updatedAt=stamp; c.updatedBy=dev; }
  });
  if(!s.deletedEntries) s.deletedEntries={};
  if(!s.deletedCategories) s.deletedCategories={};

  /* verdicts: weeklyVerdicts[weekIso][catId] is a bare string ('keep'/
     'compress'/'cut'), not an object, so its sync metadata can't live
     inline the way it does on entries/categories - it lives in the
     side table verdictMeta, keyed by the same weekIso+"|"+catId composite
     id flattenVerdicts() uses. verdictMeta is invariant-only-for-live: a
     key is stamped here iff a live verdict exists for it, and pruned
     right after if it doesn't - covers both a truly orphaned entry (no
     live verdict, no tombstone; can only be drift, e.g. a hand-edited or
     pre-this-feature imported file) and a lingering entry left behind
     after a verdict was cleared (the tombstone already carries its own
     updatedAt/updatedBy, so a surviving verdictMeta copy would just be a
     second, potentially disagreeing, source of truth for the same fact).
     See CLAUDE.md's phase 2 divergence-handling note. */
  if(!s.verdictMeta) s.verdictMeta={};
  if(!s.deletedVerdicts) s.deletedVerdicts={};
  Object.keys(s.weeklyVerdicts).forEach(function(weekIso){
    Object.keys(s.weeklyVerdicts[weekIso]).forEach(function(catId){
      var key=weekIso+"|"+catId;
      if(!s.verdictMeta[key]) s.verdictMeta[key]={updatedAt:stamp,updatedBy:dev};
    });
  });
  Object.keys(s.verdictMeta).forEach(function(key){
    var sep=key.indexOf("|"),weekIso=key.slice(0,sep),catId=key.slice(sep+1);
    var live=s.weeklyVerdicts[weekIso]&&(catId in s.weeklyVerdicts[weekIso]);
    if(!live) delete s.verdictMeta[key];
  });

  /* close-outs: weekCloseouts[weekIso] is already an object, so its sync
     metadata goes inline, same as entries/categories - no side table, no
     tombstones (no delete/reopen-to-clear path exists for a close-out
     today; that gets designed when that capability does, not before). */
  Object.keys(s.weekCloseouts).forEach(function(weekIso){
    var c=s.weekCloseouts[weekIso];
    if(!c.updatedAt){ c.updatedAt=stamp; c.updatedBy=dev; }
  });

  return s;
}

/* entries live nested by date for every reader in the app (grid, totals, gaps -
   none of them know or care about sync). The sync engine's own unit is the
   individual entry, so these two functions are the ONLY place that shape
   conversion happens - flatten right before merging, unflatten right after,
   nowhere else. Tombstones never enter the nested shape at all; they live in
   their own side-channel (state.deletedEntries) so no reader anywhere has to
   learn to skip deleted:true records - see the design discussion this was
   settled in for why that's not just a style choice. */
var ENTRY_FIELDS=["date","label","cat","start","end","deleted","deletedAt"];
function flattenEntries(s){
  var out=[];
  Object.keys(s.entries).forEach(function(dateStr){
    s.entries[dateStr].forEach(function(e){
      out.push({id:e.id,date:dateStr,label:e.label,cat:e.cat,start:e.start,end:e.end,
        updatedAt:e.updatedAt,updatedBy:e.updatedBy,deleted:false,deletedAt:null});
    });
  });
  Object.keys(s.deletedEntries||{}).forEach(function(id){
    var t=s.deletedEntries[id];
    out.push({id:t.id,date:t.date,label:null,cat:null,start:null,end:null,
      updatedAt:t.updatedAt,updatedBy:t.updatedBy,deleted:true,deletedAt:t.deletedAt});
  });
  return out;
}
function unflattenEntries(flat){
  var entries={},deletedEntries={};
  flat.forEach(function(r){
    if(r.deleted){
      deletedEntries[r.id]={id:r.id,date:r.date,updatedAt:r.updatedAt,updatedBy:r.updatedBy,deletedAt:r.deletedAt};
    }else{
      if(!entries[r.date]) entries[r.date]=[];
      entries[r.date].push({id:r.id,label:r.label,cat:r.cat,start:r.start,end:r.end,
        updatedAt:r.updatedAt,updatedBy:r.updatedBy});
    }
  });
  return {entries:entries,deletedEntries:deletedEntries};
}

/* categories are already a flat array with ids, so this is a much smaller step -
   just folding the tombstone side-channel in and back out, same shape rule. */
var CATEGORY_FIELDS=["name","color","deleted","deletedAt"];
function flattenCategories(s){
  var out=(s.categories||[]).map(function(c){
    return {id:c.id,name:c.name,color:c.color,updatedAt:c.updatedAt,updatedBy:c.updatedBy,deleted:false,deletedAt:null};
  });
  Object.keys(s.deletedCategories||{}).forEach(function(id){
    var t=s.deletedCategories[id];
    out.push({id:t.id,name:null,color:null,updatedAt:t.updatedAt,updatedBy:t.updatedBy,deleted:true,deletedAt:t.deletedAt});
  });
  return out;
}
function unflattenCategories(flat){
  var categories=[],deletedCategories={};
  flat.forEach(function(r){
    if(r.deleted) deletedCategories[r.id]={id:r.id,updatedAt:r.updatedAt,updatedBy:r.updatedBy,deletedAt:r.deletedAt};
    else categories.push({id:r.id,name:r.name,color:r.color,updatedAt:r.updatedAt,updatedBy:r.updatedBy});
  });
  return {categories:categories,deletedCategories:deletedCategories};
}

/* ---------------- phase 2: weekly verdicts + week close-out sync ----------------
   weeklyVerdicts/weekCloseouts are nested maps keyed by week, with no record
   ids of their own - a genuinely different shape from entries/categories, and
   deliberately excluded from phase 1 for exactly that reason (see CLAUDE.md's
   phase 2 backlog note). The composite key below (weekIso+"|"+catId for
   verdicts, weekIso alone for close-outs) becomes each flat record's id, which
   is all mergeRecords() needs - the six-case merge logic itself is completely
   unmodified. */

/* a verdict's live value (weeklyVerdicts[weekIso][catId]) is a bare string,
   not an object, so unlike entries/categories its sync metadata can't live
   inline - it lives in the side table verdictMeta (see migrateSyncFields()).
   verdictMeta is only ever consulted here to enrich a record flattenVerdicts
   has already decided to emit from weeklyVerdicts/deletedVerdicts - it is
   never itself read as a signal that a record exists, so a stray or stale
   verdictMeta entry can't cause a wrong merge decision (migrateSyncFields()
   prunes those anyway, but flattenVerdicts doesn't depend on that pruning
   for correctness). */
var VERDICT_FIELDS=["verdict","deleted","deletedAt"];
/* the continuous half of the Keep/Compress/Cut -> Increase/Keep/Cut
   cleanup (see migrateVerdictScale() above for the load-time half).
   Without this, a device still on old code pushing a FRESH "compress"
   sometime after a device here has already migrated would just sit there
   until this device's own next full reload - worse, migrateVerdictScale
   alone can't even push the tombstone it writes back out to Drive in the
   SAME sync exchange it arrived in, since toPush is already computed by
   the time a plain state-level migration could run. Living here instead,
   on the merged flat records themselves, means it runs on every connect
   AND every ongoing sync, and the tombstone it produces flows into both
   newLocalState and toPush from the same array - so a stray "compress"
   self-heals within one sync round trip, the same always-on shape
   dedupeCategoriesByName already uses for its own self-heal, not a
   one-time fix that needs remembering to re-run.

   Reported via BOTH console.log (matching dedupeCategoriesByName's own
   precedent below, logged from inside this otherwise-pure function
   exactly the same way) AND a returned `swept` list, which the caller
   (runDriveSync - the only place with real UI access, since this whole
   engine is deliberately kept side-effect-free and independently
   testable, see syncEngine's own comment) turns into a toast. Console-only
   is what this app's own real-world use already proved insufficient: this
   exact mechanism silently cleared real verdicts for weeks before anyone
   noticed, because nothing surfaced outside DevTools. */
function sweepCompressVerdicts(flat,deviceId){
  var now=nowIso(),swept=[];
  var records=flat.map(function(r){
    if(r.deleted||r.verdict!=="compress") return r;
    swept.push({weekIso:r.weekIso,catId:r.catId});
    console.log('Hours Ledger sync: cleared a stale "compress" verdict (pre-rename Keep/Compress/Cut scale) - week '+
      r.weekIso+", category "+r.catId+".");
    return {id:r.id,weekIso:r.weekIso,catId:r.catId,verdict:null,
      updatedAt:now,updatedBy:deviceId,deleted:true,deletedAt:now};
  });
  return {records:records,swept:swept};
}
/* shared by flattenVerdicts' guard below and migrateVerdictTombstoneCollisions
   further down - same "newer wins" principle mergeRecords itself already uses,
   except when the live side's own timestamp is unknown (nothing has ever
   backfilled verdictMeta for it - can happen ahead of migrateSyncFields, see
   its own comment on why it isn't called at load/undo/import). There's
   nothing real to compare in that case, so it keeps live rather than
   deleting real data on a guess - this app's standing bias, same as
   mergeRecords' own ambiguity window. */
function verdictCollisionWinner(liveUpdatedAt,tombstoneUpdatedAt){
  if(!liveUpdatedAt) return "live";
  return Date.parse(tombstoneUpdatedAt)>Date.parse(liveUpdatedAt)?"tombstone":"live";
}
/* a key should never exist live in weeklyVerdicts AND tombstoned in
   deletedVerdicts at once - setVerdict's live-set branch clears the matching
   tombstone precisely so this can't happen (see its own comment) - but this
   guard exists so flattenVerdicts itself can't be fooled into emitting two
   records for one id even if some future path ever produces that state
   anyway. Without it, mergeRecords' byId construction (a plain forEach
   keyed by id) would silently keep whichever record got pushed here LAST -
   always the tombstone, since deletedVerdicts is walked after
   weeklyVerdicts - discarding a fresh live edit before the six-case merge
   logic ever ran. That's exactly the bug real Drive-account tracing found;
   see CLAUDE.md's backlog for the full trace. */
function flattenVerdicts(s){
  var out=[],indexById={};
  Object.keys(s.weeklyVerdicts).forEach(function(weekIso){
    Object.keys(s.weeklyVerdicts[weekIso]).forEach(function(catId){
      var key=weekIso+"|"+catId,meta=s.verdictMeta[key];
      indexById[key]=out.length;
      out.push({id:key,weekIso:weekIso,catId:catId,verdict:s.weeklyVerdicts[weekIso][catId],
        updatedAt:meta.updatedAt,updatedBy:meta.updatedBy,deleted:false,deletedAt:null});
    });
  });
  Object.keys(s.deletedVerdicts||{}).forEach(function(key){
    var t=s.deletedVerdicts[key];
    var tombstoneRec={id:key,weekIso:t.weekIso,catId:t.catId,verdict:null,
      updatedAt:t.updatedAt,updatedBy:t.updatedBy,deleted:true,deletedAt:t.deletedAt};
    if(key in indexById){
      var liveRec=out[indexById[key]];
      if(verdictCollisionWinner(liveRec.updatedAt,tombstoneRec.updatedAt)==="tombstone") out[indexById[key]]=tombstoneRec;
      return; /* never push the loser - exactly one record per id, always */
    }
    out.push(tombstoneRec);
  });
  return out;
}
function unflattenVerdicts(flat){
  var weeklyVerdicts={},verdictMeta={},deletedVerdicts={};
  flat.forEach(function(r){
    if(r.deleted){
      deletedVerdicts[r.id]={weekIso:r.weekIso,catId:r.catId,updatedAt:r.updatedAt,updatedBy:r.updatedBy,deletedAt:r.deletedAt};
    }else{
      if(!weeklyVerdicts[r.weekIso]) weeklyVerdicts[r.weekIso]={};
      weeklyVerdicts[r.weekIso][r.catId]=r.verdict;
      verdictMeta[r.id]={updatedAt:r.updatedAt,updatedBy:r.updatedBy};
    }
  });
  return {weeklyVerdicts:weeklyVerdicts,verdictMeta:verdictMeta,deletedVerdicts:deletedVerdicts};
}

/* a close-out's leaf (weekCloseouts[weekIso]) is already an object, so its
   sync metadata goes inline, same as entries/categories - no side table.
   No tombstones either: there is no delete/reopen-to-clear path for a
   close-out today, so every flattened record is unconditionally deleted:false.
   If that capability is ever added, tombstones get designed alongside it
   then, same rule as always - not retrofitted, and not built ahead of need. */
var CLOSEOUT_FIELDS=["note","closedAt"];
function flattenCloseouts(s){
  return Object.keys(s.weekCloseouts).map(function(weekIso){
    var c=s.weekCloseouts[weekIso];
    return {id:weekIso,weekIso:weekIso,note:c.note,closedAt:c.closedAt,
      updatedAt:c.updatedAt,updatedBy:c.updatedBy,deleted:false,deletedAt:null};
  });
}
function unflattenCloseouts(flat){
  var weekCloseouts={};
  flat.forEach(function(r){
    weekCloseouts[r.weekIso]={note:r.note,closedAt:r.closedAt,updatedAt:r.updatedAt,updatedBy:r.updatedBy};
  });
  return {weekCloseouts:weekCloseouts};
}

/* the merge itself - compares records, never files. Ported from Money Ledger's
   mergeRecords (see SYNC-LESSONS.md) with the same six-case shape; only the
   caller-supplied contentFields whitelist changes per record type. */
var AMBIGUITY_WINDOW_MS=5000;
function sameContent(a,b,contentFields){
  return contentFields.every(function(f){ return a[f]===b[f]; });
}
function mergeRecords(localArr,remoteArr,contentFields,deviceId){
  var byId={};
  localArr.forEach(function(r){ (byId[r.id]=byId[r.id]||{}).local=r; });
  remoteArr.forEach(function(r){ (byId[r.id]=byId[r.id]||{}).remote=r; });
  var merged=[];
  Object.keys(byId).forEach(function(id){
    var L=byId[id].local,R=byId[id].remote;
    if(L&&!R){ merged.push(L); return; }                  /* 1. present on one side only -> keep it */
    if(R&&!L){ merged.push(R); return; }
    if(sameContent(L,R,contentFields)){ merged.push(L); return; }  /* 2. same content -> nothing to decide */
    if(R.updatedBy===deviceId){ merged.push(L); return; }  /* 3. remote is my own stale echo -> trust local */
    var Lt=Date.parse(L.updatedAt),Rt=Date.parse(R.updatedAt),deltaMs=Math.abs(Lt-Rt);
    if(L.deleted!==R.deleted){                             /* 4. one deleted, one live */
      if(deltaMs<=AMBIGUITY_WINDOW_MS){ merged.push(L.deleted?R:L); return; } /* ambiguous -> live wins, never delete on a guess */
      merged.push(Lt>=Rt?L:R); return;                      /* otherwise newer wins */
    }
    if(L.deleted&&R.deleted){ merged.push(Lt>=Rt?L:R); return; } /* 5. redundant tombstones -> keep newer */
    merged.push(Lt>=Rt?L:R);                                /* 6. both live, genuinely differ -> last-write-wins */
  });
  return merged;
}

/* categories can't rely on ids to recognise "the same" category across two
   devices that have never synced before - every fresh install invents its
   own ids for anything the user names themselves (a "Muay Thai" created on
   two phones has no anchor at all), and even the 8 starter categories,
   fixed-id since the DEFAULTS comment above, can genuinely diverge for an
   install seeded before that line existed. This runs AFTER the ordinary
   id-based merge above, on its result, and collapses any LIVE categories
   that share a normalized name (case/whitespace-insensitive - a trailing
   space must not be the difference between matching and not) down to one
   survivor, reassigning any entry that pointed at a loser and tombstoning
   the losers - never just omitting them, so a third device (or this same
   device syncing again later) never mistakes the absence for "new" and
   resurrects it.

   Deliberately NOT id-matching, and deliberately NOT the exact-name-AND-
   color match this used to be (see SYNC-LESSONS.md/CLAUDE.md for the real
   incident this reverses a design decision over): color is a display
   preference the user can drag a slider to change at any time, and this
   app's own starter palette has already changed once across its history,
   so two genuinely-identical categories seeded under two different
   generations of DEFAULTS - or a single category a user simply recolored -
   would never match on color and would duplicate forever. Name-only is a
   real, deliberate loosening: two categories a user created on purpose
   with the same name but different meanings would now merge. That risk is
   accepted because the alternative just failed for real, and because a
   silent duplicate you'd never notice was assessed as the worse failure
   mode of the two once fixed ids narrowed how often this path fires at all
   (every install from here on shares the 8 defaults' ids outright - this
   only ever runs for a genuinely custom name-collision, or for healing
   data that diverged before today).

   The surviving id is whichever record is OLDER - arbitrary, but
   deterministic, and it means an established device's category doesn't
   churn its own id just because some other device connected to it (that
   other device's just-migrated records are almost always stamped "now,"
   so "newer wins the id" would flip the winner nearly every time a new
   device showed up). The surviving NAME/COLOR, though, come from whichever
   record was updated most recently - color and casing/whitespace are
   content, and content follows the same last-write-wins rule every other
   field in this app already does; only identity (which id survives) needs
   the stability rule. Runs on every sync, for everyone, automatically -
   idempotent (a no-op once nothing's left to collapse), which is what
   makes it a real fix for data that already diverged before this line
   existed, not just a guard against it happening again. */
function normalizeName(n){ return (n||"").trim().toLowerCase(); }
/* a verdict remapped onto a survivor's id can land on the SAME weekIso+catId
   as a verdict that survivor already had (both sides had independently set a
   verdict for the same category+week before ever sharing an id) - two flat
   records now claiming one composite id. Resolved by folding them together
   pairwise through mergeRecords() itself (same six-case logic, including
   last-write-wins) rather than inventing new conflict rules - see CLAUDE.md's
   phase 2 note. Groups that never collided (the overwhelming common case)
   cost one no-op pass through here. */
function collapseVerdictCollisions(verdictsFlat,deviceId){
  var groups={};
  verdictsFlat.forEach(function(v){ (groups[v.id]=groups[v.id]||[]).push(v); });
  return Object.keys(groups).map(function(id){
    return groups[id].reduce(function(acc,next){
      return mergeRecords([acc],[next],VERDICT_FIELDS,deviceId)[0];
    });
  });
}
function dedupeCategoriesByName(catsFlat,entriesFlat,verdictsFlat,deviceId){
  var groups={};
  catsFlat.filter(function(r){ return !r.deleted; }).forEach(function(r){
    var key=normalizeName(r.name);
    (groups[key]=groups[key]||[]).push(r);
  });
  var idRemap={},extraTombstones=[],fieldUpdates={},mergeLog=[];
  Object.keys(groups).forEach(function(key){
    if(groups[key].length<2) return;
    var byAge=groups[key].slice().sort(function(a,b){ return Date.parse(a.updatedAt)-Date.parse(b.updatedAt); });
    var winner=byAge[0],newest=byAge[byAge.length-1],losers=byAge.slice(1);
    if(newest.id!==winner.id&&(newest.name!==winner.name||newest.color!==winner.color)){
      fieldUpdates[winner.id]={name:newest.name,color:newest.color,updatedAt:newest.updatedAt,updatedBy:newest.updatedBy};
    }
    var reassignedCount=entriesFlat.filter(function(e){
      return !e.deleted&&e.cat&&losers.some(function(l){ return l.id===e.cat; });
    }).length;
    losers.forEach(function(loser){
      idRemap[loser.id]=winner.id;
      extraTombstones.push({id:loser.id,name:null,color:null,updatedAt:nowIso(),updatedBy:deviceId,deleted:true,deletedAt:nowIso()});
    });
    mergeLog.push({name:winner.name,survivorId:winner.id,mergedIds:losers.map(function(l){ return l.id; }),entriesReassigned:reassignedCount});
  });
  if(!mergeLog.length) return {categories:catsFlat,entries:entriesFlat,verdicts:verdictsFlat};

  mergeLog.forEach(function(g){
    console.log('Hours Ledger sync: merged duplicate category "'+g.name+'" - kept '+g.survivorId+
      ", removed "+g.mergedIds.length+" duplicate id(s) ("+g.mergedIds.join(", ")+"), reassigned "+
      g.entriesReassigned+" "+(g.entriesReassigned===1?"entry":"entries")+".");
  });
  var newEntries=entriesFlat.map(function(e){
    if(e.cat&&idRemap[e.cat]) return Object.assign({},e,{cat:idRemap[e.cat]});
    return e;
  });
  var newCats=catsFlat.filter(function(r){ return !(r.id in idRemap); }).map(function(r){
    var upd=fieldUpdates[r.id];
    return upd?Object.assign({},r,upd):r;
  }).concat(extraTombstones);
  var remappedVerdicts=verdictsFlat.map(function(v){
    if(!v.catId||!idRemap[v.catId]) return v;
    var newCatId=idRemap[v.catId];
    return Object.assign({},v,{catId:newCatId,id:v.weekIso+"|"+newCatId});
  });
  var newVerdicts=collapseVerdictCollisions(remappedVerdicts,deviceId);
  return {categories:newCats,entries:newEntries,verdicts:newVerdicts};
}

/* the whole engine in one call: migrate, merge all four collections by id
   (categories, entries, verdicts, close-outs), dedupe the merged categories
   by name (folding in any entry OR verdict that pointed at a category that
   just got collapsed away), hand back the two things a caller needs - the
   new local state ready to persist immediately, and the flat payload to
   push. Nothing here writes to state or to any storage itself; the caller
   decides when (write locally first, always, per SYNC-LESSONS.md's ordering -
   push only after, and only the connect flow ever risks the network call).
   remoteFile is null for a genuine first-ever sync (nothing to merge
   against, every local record trivially survives via case 1); its shape
   otherwise is {categories:[...flat...], entries:[...flat...],
   verdicts:[...flat...], closeouts:[...flat...]}, tombstones inline via
   deleted:true. */
function syncEngine(localStateIn,remoteFile,deviceId){
  /* migrateSyncFields mutates in place - clone first so a failure anywhere
     below (a bad remote file, a bug, anything) can never leave the CALLER's
     original object touched. The connect flow still has to honor "don't
     write the real state until this whole call has returned successfully,"
     but this function no longer works against that by mutating its input
     as a side effect no matter what happens after. */
  var localState=JSON.parse(JSON.stringify(localStateIn));
  migrateSyncFields(localState);
  var remote=remoteFile||{categories:[],entries:[],verdicts:[],closeouts:[]};

  var localCatsFlat=flattenCategories(localState);
  var mergedCatsFlat=mergeRecords(localCatsFlat,remote.categories,CATEGORY_FIELDS,deviceId);

  var localEntriesFlat=flattenEntries(localState);
  var remoteEntriesFlat=remote.entries||[];
  var mergedEntriesFlat=mergeRecords(localEntriesFlat,remoteEntriesFlat,ENTRY_FIELDS,deviceId);

  var localVerdictsFlat=flattenVerdicts(localState);
  var remoteVerdictsFlat=remote.verdicts||[];
  var mergedVerdictsFlat=mergeRecords(localVerdictsFlat,remoteVerdictsFlat,VERDICT_FIELDS,deviceId);

  var localCloseoutsFlat=flattenCloseouts(localState);
  var remoteCloseoutsFlat=remote.closeouts||[];
  var mergedCloseoutsFlat=mergeRecords(localCloseoutsFlat,remoteCloseoutsFlat,CLOSEOUT_FIELDS,deviceId);

  var deduped=dedupeCategoriesByName(mergedCatsFlat,mergedEntriesFlat,mergedVerdictsFlat,deviceId);
  mergedCatsFlat=deduped.categories;
  mergedEntriesFlat=deduped.entries;
  mergedVerdictsFlat=deduped.verdicts;
  var sweepResult=sweepCompressVerdicts(mergedVerdictsFlat,deviceId);
  mergedVerdictsFlat=sweepResult.records;

  var catsResult=unflattenCategories(mergedCatsFlat);
  var entriesResult=unflattenEntries(mergedEntriesFlat);
  var verdictsResult=unflattenVerdicts(mergedVerdictsFlat);
  var closeoutsResult=unflattenCloseouts(mergedCloseoutsFlat);

  return {
    newLocalState:Object.assign({},localState,{
      categories:catsResult.categories,deletedCategories:catsResult.deletedCategories,
      entries:entriesResult.entries,deletedEntries:entriesResult.deletedEntries,
      weeklyVerdicts:verdictsResult.weeklyVerdicts,verdictMeta:verdictsResult.verdictMeta,deletedVerdicts:verdictsResult.deletedVerdicts,
      weekCloseouts:closeoutsResult.weekCloseouts
    }),
    toPush:{categories:mergedCatsFlat,entries:mergedEntriesFlat,verdicts:mergedVerdictsFlat,closeouts:mergedCloseoutsFlat},
    /* surfaced separately from newLocalState/toPush - this is the ONE thing
       this otherwise-pure engine hands back specifically so its caller can
       tell the user something happened, not data the caller needs to apply.
       See sweepCompressVerdicts' own comment for why this exists at all. */
    sweptCompress:sweepResult.swept
  };
}

/* ---------------- fake Drive (TEST_MODE only) ----------------
   No real network function exists yet - the connect flow, OAuth, and the real
   fetch calls are separate work, reviewed before they're built. This exists
   now so the engine above and the dry-run tool have something to push to and
   pull from without a Google account, real or fake, ever being needed. Guarded
   at the top of every function, not just by convention at the call site - none
   of these can run for a real user by construction, because TEST_MODE itself
   only ever comes from selftest.html's own URL flag. */
var FAKE_DRIVE_KEY="hours-ledger-fakedrive-TESTMODE";
function fakeDriveRead(){
  if(!TEST_MODE) throw new Error("fakeDriveRead is TEST_MODE only");
  try{ return JSON.parse(readStore(FAKE_DRIVE_KEY)); }catch(e){ return null; }
}
function fakeDriveWrite(data){
  if(!TEST_MODE) throw new Error("fakeDriveWrite is TEST_MODE only");
  writeStore(FAKE_DRIVE_KEY,JSON.stringify(data));
}
function fakeDriveReset(){
  if(!TEST_MODE) throw new Error("fakeDriveReset is TEST_MODE only");
  writeStore(FAKE_DRIVE_KEY,JSON.stringify(null));
}

/* ---------------- Google Drive OAuth (Google Identity Services token client) ----------------
   Browser-side token flow only - no backend, no client secret ever exists to
   leak, since a server holding one is exactly the runtime dependency and the
   data-custody problem hard rules 2 and 4 forbid. GOOGLE_CLIENT_ID is a public
   identifier, safe to commit (see SYNC-LESSONS.md's OAuth setup notes - it's
   the Client ID, not a secret). Nothing in this block ever runs under
   TEST_MODE - not the script load, not the token request - so a test run
   can't prompt a real Google sign-in by construction, the same standard as
   the fake Drive functions above. */
var GOOGLE_CLIENT_ID="433503856869-1o7ut58622smr9rb7j8mqmsv6n2tfd4p.apps.googleusercontent.com";
var DRIVE_SCOPE="https://www.googleapis.com/auth/drive.file";
var DRIVE_FILE_NAME="hours-ledger-sync.json";
var ACCESS_TOKEN_KEY=TEST_MODE?"hours-ledger-access-token-TESTMODE":"hours-ledger-access-token";

function getCachedToken(){
  try{
    var t=JSON.parse(readStore(ACCESS_TOKEN_KEY));
    if(t&&t.expiresAt>Date.now()+30000) return t.token; /* 30s safety margin */
  }catch(e){}
  return null;
}
function cacheToken(token,expiresInSec){
  writeStore(ACCESS_TOKEN_KEY,JSON.stringify({token:token,expiresAt:Date.now()+expiresInSec*1000}));
}
/* null = no load in flight; an array = one is, and everything in it is
   waiting on the SAME script tag to settle. Without this, two callers
   landing close together (the page-load pre-warm below and a real
   interactive tap, most likely right after mobile Chrome silently
   discards and reloads a long-backgrounded tab - see CLAUDE.md's backlog
   for the real-device trace this came from) each fail the "already
   loaded" check and inject their OWN <script src="...gsi/client">, so
   Google's own setup code runs twice in one document - a plausible
   source of a malformed request neither caller intended. This queue is
   shared by both real callers and the TEST_MODE fake path below, so a
   test exercises the actual de-dup logic, not a copy of it. */
var gisScriptCallbacks=null;
/* TEST_MODE only - stand in for window.google.accounts.oauth2 existing
   and for "a real <script> tag would have been created here", since no
   real script (and no real network request) is ever allowed to load
   under TEST_MODE, same standard as every other real Google interaction
   in this file. TEST_MODE_GIS_LOAD_COUNT lets a test assert that two
   racing callers collapsed into exactly one load attempt, not two. */
var TEST_MODE_GIS_LOADED=false, TEST_MODE_GIS_LOAD_COUNT=0;
function gisScriptAlreadyLoaded(){
  return TEST_MODE?TEST_MODE_GIS_LOADED:!!(window.google&&window.google.accounts&&window.google.accounts.oauth2);
}
/* settles every callback queued behind the one load attempt, in order,
   then clears the queue BEFORE calling any of them - so if a queued
   callback itself calls loadGisScript again, it sees accurate state
   (this load already finished) rather than "still in flight" and
   deadlocks waiting on something that's already done. A script element's
   load/error events are a browser-guaranteed exactly-one-fires pair, so
   - unlike GIS's own token callback elsewhere in this file - no timeout
   backstop is needed here to guarantee this runs. */
function settleGisScriptLoad(err){
  var queued=gisScriptCallbacks;
  gisScriptCallbacks=null;
  queued.forEach(function(fn){ fn(err); });
}
/* TEST_MODE only - the test's own hand on the one thing that would
   otherwise be a real network event. Mirrors setTestHangToken's shape:
   nothing resolves on its own under TEST_MODE, only this. */
function resolveTestGisScriptLoad(err){
  if(!TEST_MODE) throw new Error("resolveTestGisScriptLoad is TEST_MODE only");
  if(!err) TEST_MODE_GIS_LOADED=true;
  settleGisScriptLoad(err||null);
}
function loadGisScript(cb){
  if(gisScriptAlreadyLoaded()){ cb(null); return; }
  if(gisScriptCallbacks){ gisScriptCallbacks.push(cb); return; } /* a load is already in flight - queue behind it, don't start a second one */
  gisScriptCallbacks=[cb];
  if(TEST_MODE){ TEST_MODE_GIS_LOAD_COUNT++; return; } /* only resolveTestGisScriptLoad() ever settles this */
  var s=document.createElement("script");
  s.src="https://accounts.google.com/gsi/client";
  s.onload=function(){ settleGisScriptLoad(null); };
  s.onerror=function(){ settleGisScriptLoad(new Error("Couldn't load Google's sign-in script - check your connection")); };
  document.head.appendChild(s);
}
/* cb(err, token). Caches the token in its own key, outside synced state,
   same pattern as DEVICE_ID - a page reload within the token's ~1hr life
   reuses it with no Google round-trip (GIS's silent-reauth path is
   increasingly unreliable behind third-party-cookie blocking; this
   sidesteps needing it at all for the common case, per SYNC-LESSONS.md).

   interactive controls whether a missing/expired token is allowed to open
   the real Google account picker. It must be false for every automatic
   caller (the page-load and post-edit debounced syncs in scheduleDriveSync)
   and true only for a real click (the connectDrive button, or the
   pointerdown-delegated reconnect listener below) - this is the one thing
   standing between "token expired" and an interactive OAuth prompt showing
   up with no gesture behind it, which is the exact bug this exists to
   close. A non-interactive caller with no valid cached token gets back an
   error flagged needsReconnect instead of ever reaching
   requestAccessToken(). */
var TEST_MODE_HANG_TOKEN=false, TEST_MODE_LATE_SUCCESS_MS=null;
/* GIS has no dedicated "the user closed the picker" signal - requestAccessToken's
   own callback only fires on an actual completion (a token, or an explicit
   access_denied from clicking something inside Google's own flow). Closing
   the picker directly instead - the browser/OS close control, not a button
   inside the Google page - means that callback can simply never come. See
   CLAUDE.md's guard-flag rule: this wraps cb so it is GUARANTEED to fire
   exactly once, regardless of whether the thing it's guarding ever finishes
   on its own - the reset path can't depend on the async call completing.

   10s, not the first version's 25s: a too-short timeout is safe here in a
   way it usually isn't, because a genuine-but-late success still gets
   cached by the real GIS callback regardless of whether this timeout beat
   it there (see the callback below) - so shortening this never loses a
   real sign-in, it only risks the rare case of needing one extra tap if a
   real flow is unusually slow. This is the GUARANTEED backstop; the focus
   fast path below is what makes the common case fast, not this number. */
var GIS_RECONNECT_TIMEOUT_MS=TEST_MODE?150:10000;
/* how long to wait after the window regains focus before treating that as
   a likely dismiss - long enough that a real callback arriving at nearly
   the same moment still wins the race and is used instead. */
var FOCUS_FASTPATH_GRACE_MS=TEST_MODE?20:500;
/* guarantees cb(err,token) fires exactly once, whichever comes first: the
   real callback, or this timeout. Only decides WHETHER cb gets called -
   callers still do their own caching etc. before calling the returned
   function, so a genuine-but-late success (arriving after the timeout
   already gave up) still gets cached even though cb won't fire a second
   time - the next attempt just works instead of prompting again.

   The returned function reports back whether THIS call was the one that
   actually won (true) or was discarded as a late/duplicate arrival
   (false) - callers that only cache on a late success and stop there
   leave the rest of the app's state (the button, driveNeedsReconnect,
   whether a sync actually ran) frozen at whatever it was when the early
   resolution fired, silently wrong until some unrelated future trigger
   happens to notice the cached token. See handleTokenSuccess below,
   which uses this to close that gap - caching alone isn't the same
   promise as the UI being honest about what just happened. */
function withGisTimeout(cb){
  var settled=false;
  console.log("[drive] withGisTimeout: armed, "+GIS_RECONNECT_TIMEOUT_MS+"ms backstop");
  var timeoutId=setTimeout(function(){
    if(settled){ console.log("[drive] withGisTimeout: timer fired but already settled - no-op"); return; }
    settled=true;
    console.log("[drive] withGisTimeout: BACKSTOP TIMEOUT FIRED - real callback never came, calling back with a dismissed error");
    var e=new Error("Drive sign-in didn't complete - closed or timed out");
    e.dismissed=true;
    cb(e);
  },GIS_RECONNECT_TIMEOUT_MS);
  return function(err,token){
    if(settled){ console.log("[drive] withGisTimeout: real callback arrived but this was already settled - discarding cb call (token, if any, was still cached by the caller)"); return false; }
    settled=true;
    clearTimeout(timeoutId);
    console.log("[drive] withGisTimeout: settled by "+(err?"an error: "+err.message:"a real token")+" - calling back now");
    cb(err,token);
    return true;
  };
}
function markSigningIn(){
  document.getElementById("connectDrive").disabled=true;
  document.getElementById("connectDrive").textContent="Drive: signing in…";
}
/* wraps an already-armed settle (from withGisTimeout) with the focus-
   regained fast path, and flips the button to "signing in" state.
   Shared by both TEST_MODE's hang simulation and the real branch below
   so a test genuinely exercises this exact code, not a re-implementation
   of it (see SYNC-LESSONS.md's test-isolation notes) - the first version
   of this had the fast path wired only into the real branch, so
   selftest.html's synthetic focus event had nothing listening for it and
   silently fell through to the backstop timeout instead, which would
   have hidden a real bug in the fast path if there ever was one.

   Fast path reasoning: the parent tab regaining focus normally means the
   popup just closed, since a real OAuth popup steals focus while it's
   open. This is a HINT, not the mechanism - the timeout inside
   withGisTimeout() is the actual guarantee. Two known ways this signal
   can mislead, both handled safely rather than avoided: (1) false
   positive - alt-tabbing away and back while the picker is still
   genuinely open looks identical to a close; harmless here because a
   genuine-but-late success still gets cached regardless of which path
   "gave up" first (see withGisTimeout's own doc comment), so a wrongly-
   early resolution never loses real sign-in work, it just means the
   button re-offers a tap that turns out to be unnecessary once the
   still-open flow finishes on its own. (2) doesn't fire at all if GIS
   ever uses FedCM instead of a real popup window in this browser - no
   separate window, no focus signal, no fast path - which is exactly why
   the timeout backstop has to stay regardless of how reliable this
   feels in testing. Do not delete the timeout on the theory that this
   makes it redundant. */
function armFocusFastPath(rawSettle){
  markSigningIn();
  var focusHandler=null;
  function clearFocusListener(){ if(focusHandler){ window.removeEventListener("focus",focusHandler); focusHandler=null; } }
  function settle(err,token){ clearFocusListener(); return rawSettle(err,token); }
  focusHandler=function(){
    clearFocusListener();
    setTimeout(function(){
      console.log("[drive] focus fast path: window regained focus - treating as a likely dismiss (no-op if something else already resolved this first)");
      var e=new Error("Drive sign-in didn't complete - closed or timed out");
      e.dismissed=true;
      e.viaFocus=true; /* distinguishes "the fast path resolved this" from "the backstop timeout resolved this" - both look like an ordinary dismissed error otherwise, and selftest.html needs to tell them apart rather than infer it from timing, which virtual-time test runs can't measure reliably */
      settle(e);
    },FOCUS_FASTPATH_GRACE_MS);
  };
  window.addEventListener("focus",focusHandler);
  return settle;
}
/* handles an arriving real token, whether it's the attempt's actual
   resolution or a genuine success that shows up after the fast path or
   backstop already gave up on it. Real-device testing found: caching the
   late token alone (the previous version of this) left the button
   reading "Drive: tap to resume syncing" - false - for an indefinite
   window after the user had actually finished signing in, until some
   unrelated future tap or a reload happened to notice the cached token.
   Same shape as the bug this whole flow exists to fix, just narrower:
   the app's own state lying about itself. settle()'s return value (true
   only for whichever call actually won) is what tells the two cases
   apart; on a late arrival, there's no cb left to call (the caller
   already moved on), so the only way to make the button honest again is
   to actually run a sync - runDriveSync(false) rather than
   scheduleDriveSync(), so it happens immediately instead of behind
   another debounce on top of however late this already was. Safe to
   call directly: driveSyncInFlight was already reset to false when the
   early resolution ran its own err branch. */
function handleTokenSuccess(settle,token,expiresInSec){
  cacheToken(token,expiresInSec);
  var wasFirst=settle(null,token);
  if(!wasFirst){
    console.log("[drive] handleTokenSuccess: a real token arrived after this attempt was already resolved (fast path or backstop) - cached, but the button was left showing the old state. Running a catch-up sync now instead of waiting for an unrelated future trigger to notice.");
    runDriveSync(false);
  }
}
function getAccessToken(cb,interactive){
  console.log("[drive] getAccessToken called: interactive="+interactive+" TEST_MODE="+TEST_MODE);
  if(TEST_MODE){
    if(interactive&&TEST_MODE_HANG_TOKEN){
      var settle0=armFocusFastPath(withGisTimeout(cb));
      /* simulates a real GIS callback that eventually arrives on its own,
         after the fast path or backstop has already resolved this attempt
         one way - exercises handleTokenSuccess's own late-arrival catch-up
         path with the real function, not a re-implementation of it */
      if(TEST_MODE_LATE_SUCCESS_MS!=null){
        setTimeout(function(){ handleTokenSuccess(settle0,"fake-late-token-"+getDeviceId(),3600); },TEST_MODE_LATE_SUCCESS_MS);
      }
      return; /* otherwise never resolves on its own - only the timeout (or a synthetic focus event, in tests) ever calls back */
    }
    cb(null,"fake-token-"+getDeviceId());
    return;
  }
  var cached=getCachedToken();
  console.log("[drive] getAccessToken: cached token "+(cached?"found, using it, no network/popup":"not found"));
  if(cached){ cb(null,cached); return; }
  if(!interactive){
    console.log("[drive] getAccessToken: non-interactive with no cached token - refusing to open the picker, returning needsReconnect");
    var needsReconnect=new Error("Drive needs you to reconnect");
    needsReconnect.needsReconnect=true;
    cb(needsReconnect);
    return;
  }
  console.log("[drive] getAccessToken: interactive, no cached token - proceeding to loadGisScript/requestAccessToken");
  var settle=armFocusFastPath(withGisTimeout(cb));
  loadGisScript(function(err){
    if(err){ console.log("[drive] getAccessToken: loadGisScript failed: "+err.message); settle(err); return; }
    try{
      var client=google.accounts.oauth2.initTokenClient({
        client_id:GOOGLE_CLIENT_ID,
        scope:DRIVE_SCOPE,
        callback:function(resp){
          if(resp.error){ console.log("[drive] getAccessToken: GIS callback fired with an error: "+resp.error); settle(new Error(resp.error)); return; }
          console.log("[drive] getAccessToken: GIS callback fired with a real token");
          handleTokenSuccess(settle,resp.access_token,resp.expires_in);
        }
      });
      console.log("[drive] getAccessToken: calling client.requestAccessToken() now - the picker should appear");
      client.requestAccessToken();
    }catch(e){ console.log("[drive] getAccessToken: requestAccessToken() threw synchronously: "+e.message); settle(e); }
  });
}

/* ---------------- Google Drive network calls ----------------
   Same TEST_MODE branch pattern as the fake Drive functions themselves -
   checked first, inside the function, before any fetch() is constructed.
   The file is found by searching on name every single time, never by
   trusting a cached id (SYNC-LESSONS.md) - if more than one match turns up,
   that's logged as a warning, not silently resolved, since it means two
   histories may need reconciling by hand. */
function driveFindFileId(token){
  if(TEST_MODE) return Promise.resolve(fakeDriveRead()!==null?"fake-file-id":null);
  var q="name='"+DRIVE_FILE_NAME+"' and trashed=false";
  return fetch("https://www.googleapis.com/drive/v3/files?q="+encodeURIComponent(q)+"&fields=files(id,name)",{
    headers:{Authorization:"Bearer "+token}
  }).then(function(r){
    if(!r.ok) throw new Error("Drive search failed ("+r.status+")");
    return r.json();
  }).then(function(data){
    var files=data.files||[];
    if(files.length>1) console.warn('Hours Ledger: found '+files.length+' Drive files named "'+DRIVE_FILE_NAME+'" - using the first; the rest may need reconciling by hand');
    return files.length?files[0].id:null;
  });
}
function driveReadFile(token,fileId){
  if(TEST_MODE) return Promise.resolve(fakeDriveRead());
  return fetch("https://www.googleapis.com/drive/v3/files/"+fileId+"?alt=media",{
    headers:{Authorization:"Bearer "+token}
  }).then(function(r){
    if(!r.ok) throw new Error("Drive read failed ("+r.status+")");
    return r.json();
  });
}
function driveWriteFile(token,fileId,data){
  if(TEST_MODE){ fakeDriveWrite(data); return Promise.resolve(fileId||"fake-file-id"); }
  var body=JSON.stringify(data);
  function uploadContent(id){
    return fetch("https://www.googleapis.com/upload/drive/v3/files/"+id+"?uploadType=media",{
      method:"PATCH",
      headers:{Authorization:"Bearer "+token,"Content-Type":"application/json"},
      body:body
    }).then(function(r){
      if(!r.ok) throw new Error("Drive upload failed ("+r.status+")");
      return id;
    });
  }
  if(fileId) return uploadContent(fileId);
  return fetch("https://www.googleapis.com/drive/v3/files",{
    method:"POST",
    headers:{Authorization:"Bearer "+token,"Content-Type":"application/json"},
    body:JSON.stringify({name:DRIVE_FILE_NAME})
  }).then(function(r){
    if(!r.ok) throw new Error("Drive file creation failed ("+r.status+")");
    return r.json();
  }).then(function(created){ return uploadContent(created.id); });
}

var state;
try{ state=JSON.parse(readStore(KEY))||null; }catch(e){ state=null; }
if(!state||!state.categories) state=migrateFromOldKey();
if(!state||!state.categories) state=JSON.parse(JSON.stringify(DEFAULTS));
if(!state.settings) state.settings={startHour:6,endHour:24};
if(!state.entries) state.entries={};
if(!state.weekCloseouts) state.weekCloseouts={};
migrateVerdicts(state);
migrateVerdictScale(state);
migrateVerdictTombstoneCollisions(state);
migrateRecentColors(state);

/* ---------------- file linking (Chrome / Edge) ---------------- */
var fileHandle=null, fileName="", writeTimer=null;

function idbOpen(cb){
  try{
    var r=indexedDB.open("hours-ledger",1);
    r.onupgradeneeded=function(){ r.result.createObjectStore("kv"); };
    r.onsuccess=function(){ cb(r.result); };
    r.onerror=function(){ cb(null); };
  }catch(e){ cb(null); }
}
function idbSet(k,v){ idbOpen(function(db){ if(db) try{ db.transaction("kv","readwrite").objectStore("kv").put(v,k); }catch(e){} }); }
function idbGet(k,cb){
  idbOpen(function(db){
    if(!db) return cb(null);
    try{
      var q=db.transaction("kv","readonly").objectStore("kv").get(k);
      q.onsuccess=function(){ cb(q.result||null); };
      q.onerror=function(){ cb(null); };
    }catch(e){ cb(null); }
  });
}

function writeLinkedFile(){
  if(!fileHandle) return;
  (async function(){
    try{
      var p=await fileHandle.queryPermission({mode:"readwrite"});
      if(p!=="granted") p=await fileHandle.requestPermission({mode:"readwrite"});
      if(p!=="granted"){ setStatus("File needs permission",true); return; }
      var w=await fileHandle.createWritable();
      await w.write(JSON.stringify(state,null,2));
      await w.close();
      setStatus("Saved to "+fileName);
    }catch(e){ setStatus("File write failed",true); }
  })();
}

function persist(){
  writeStore(KEY,JSON.stringify(state));
  setStatus(fileHandle?("Saving to "+fileName+"…"):"Saved "+clockNow());
  if(fileHandle){
    clearTimeout(writeTimer);
    writeTimer=setTimeout(writeLinkedFile,1200);
  }
  /* driveSyncApplyingRemote is true while runDriveSync() is writing a just-
     pulled/merged result back through this same function (so it gets the
     same status-line/linked-file behavior as any other save) - skipped here
     so applying a remote change never schedules syncing right back out
     again, which would otherwise loop forever between two devices */
  if(state.driveConnected&&!driveSyncApplyingRemote) scheduleDriveSync();
}
function clockNow(){
  var d=new Date();
  return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0");
}
function setStatus(txt,bad){
  document.getElementById("statusText").textContent=txt;
  document.getElementById("status").classList.toggle("stale",!!bad);
}
function refreshHint(){
  var el=document.getElementById("dataHint");
  if(fileHandle){
    el.innerHTML="Every change is written to <b>"+escapeHtml(fileName)+"</b> automatically. One file, no versions. Nothing leaves your machine.";
  }else if(storageOK){
    el.innerHTML="Every change saves to this browser automatically &mdash; there is nothing to press."+
      (window.showSaveFilePicker?" <b>Keep a file in sync</b> pins it to one file on your disk that overwrites itself, so you never end up with twelve copies.":"");
  }else{
    el.innerHTML="This browser won't let the page save on its own. Use <b>Export a copy</b> before you close the tab.";
  }
}

/* ---------------- Drive connect flow & ongoing sync ---------------- */
/* driveConnected lives INSIDE state (not a separate key like DEVICE_ID) on
   purpose: undoing "before Drive connect" - the snapshot connectDrive()
   takes as its very first action - should revert the whole operation,
   connection status included, not leave a device half-connected with data
   rolled back underneath it. It never gets pushed to Drive itself (the
   payload syncEngine builds only ever contains categories/entries/verdicts/
   closeouts); it just rides along through persist()/snapshot()/undo() like
   any other field. */
var driveSyncTimer=null,driveSyncInFlight=false,driveSyncApplyingRemote=false;
/* driveSyncApplyingRemote is only ever set true right before persist(), set
   false right after - both call sites below wrap that in try/finally so a
   persist() failure (a full localStorage, say) can't leave it stuck true.
   Stuck true would silently block every future scheduleDriveSync() call for
   the rest of the page's life (see persist()'s own guard), with the single
   triggering error being the only thing that ever showed on screen - the
   same silent-forever shape as the sync-on-load bug this file already
   fixed once, just from a different trigger. */

/* driveNeedsReconnect/driveReconnectAttemptedThisSession exist for the
   "reconnect on any tap" flow below (bug: an OAuth account picker appearing
   from an unrelated navigation, with no click on this app at all). Both are
   in-memory only, never persisted - a fresh page load always starts with a
   clean slate, same as driveSyncInFlight. driveReconnectAttemptedThisSession
   stays true only across a single failed/dismissed attempt, so one dismiss
   doesn't reprompt on the very next tap; it resets to false the moment a
   token is actually obtained (auto or manual), so a *later*, separate
   expiry can still resolve itself smoothly instead of requiring the button
   forever after the first time it was ever dismissed. */
var driveNeedsReconnect=false, driveReconnectAttemptedThisSession=false, lastDriveSyncErr=null;

function connectDrive(){
  console.log("[drive] connectDrive() click handler ran. driveConnected="+state.driveConnected+" driveSyncInFlight="+driveSyncInFlight+" driveNeedsReconnect="+driveNeedsReconnect);
  if(state.driveConnected){ console.log("[drive] connectDrive: already connected, delegating to runDriveSync(true)"); runDriveSync(true); return; } /* already connected - button doubles as "sync now" */
  hideToast();
  var proceed=confirm("Before connecting, it's worth exporting a copy as a backup first - Your data → Export a copy.\n\nContinue connecting Google Drive now?");
  if(!proceed) return;
  snapshot("before Drive connect");
  setStatus("Connecting to Drive…");
  document.getElementById("connectDrive").disabled=true;
  getAccessToken(function(err,token){
    if(err){ driveConnectFailed(err); return; }
    driveNeedsReconnect=false; driveReconnectAttemptedThisSession=false;
    driveFindFileId(token).then(function(fileId){
      return (fileId?driveReadFile(token,fileId):Promise.resolve(null)).then(function(remoteData){
        return {fileId:fileId,remoteData:remoteData};
      });
    }).then(function(res){
      var syncResult;
      try{ syncResult=syncEngine(state,res.remoteData,getDeviceId()); }
      catch(e){ driveConnectFailed(new Error("couldn't prepare to sync - nothing was changed")); return; }
      state=syncResult.newLocalState;
      state.driveConnected=true;
      driveSyncApplyingRemote=true;
      try{ persist(); } finally{ driveSyncApplyingRemote=false; }
      render(); refreshHint(); updateColophon();
      document.getElementById("connectDrive").disabled=false;
      document.getElementById("connectDrive").textContent="Drive: syncing…";
      /* appended to THIS toast, not a second showToast() call right after it -
         see describeCompressSweep's own comment for why a standalone second
         toast here would just silently clobber this one a moment later. The
         local sweep already happened (it's part of syncResult.newLocalState,
         already persisted above) regardless of whether the push below
         succeeds, so both branches mention it if it happened. */
      var sweptNote=(syncResult.sweptCompress&&syncResult.sweptCompress.length)?
        " "+describeCompressSweep(syncResult.sweptCompress):"";
      driveWriteFile(token,res.fileId,{categories:syncResult.toPush.categories,entries:syncResult.toPush.entries,verdicts:syncResult.toPush.verdicts,closeouts:syncResult.toPush.closeouts}).then(function(){
        setStatus("Synced with Drive");
        document.getElementById("connectDrive").textContent="Drive: synced";
        showToast("Connected — your weeks are syncing."+sweptNote,false);
      }).catch(function(){
        setStatus("Connected, first push failed",true);
        document.getElementById("connectDrive").textContent="Drive: sync failed";
        showToast("Connected, but the first push to Drive failed — it'll retry on the next change."+sweptNote,false);
      });
    }).catch(function(e){ driveConnectFailed(e); });
  },true);
}
function driveConnectFailed(e){
  document.getElementById("connectDrive").disabled=false;
  document.getElementById("connectDrive").textContent="Connect Drive"; /* markSigningIn() may have left "Drive: signing in…" behind - revert to the real pre-attempt default so a retry click looks right */
  setStatus("Couldn't connect to Drive",true);
  showToast("Couldn't connect to Google Drive: "+e.message,false);
}

/* returns just the text fragment, not a shown toast - connectDrive() and
   runDriveSync() each have their OWN existing toast at this exact point
   (or none at all, for an ordinary background sync), and showToast()
   replaces its own text rather than queuing, so firing a second,
   independent toast right after "Connected - your weeks are syncing."
   would just silently clobber it a moment later. Each caller decides
   whether to show this standalone or appended to a toast it's already
   showing. One toast per swept BATCH, not one per record, for the same
   reason - a real cleanup sync can sweep several at once. Every swept
   record still gets its own line in sweepCompressVerdicts' own
   console.log regardless of how many there are; this is a summary. */
function describeCompressSweep(swept){
  var names=swept.map(function(s){
    var cat=catById(s.catId),wk=parseIso(s.weekIso);
    return (cat?cat.name:"a deleted category")+" ("+fmtShort(wk)+"–"+fmtShort(addDays(wk,6))+")";
  });
  return names.length===1?
    names[0]+": verdict reset — it was stored in an old format":
    names.length+" old-format verdicts reset: "+names.slice(0,3).join(", ")+
      (names.length>3?", +"+(names.length-3)+" more":"");
}
var DRIVE_SYNC_DEBOUNCE_MS=TEST_MODE?50:2000; /* real debounce would make every test wait 2s for no reason */
function scheduleDriveSync(){
  clearTimeout(driveSyncTimer);
  driveSyncTimer=setTimeout(function(){ runDriveSync(false); },DRIVE_SYNC_DEBOUNCE_MS);
}
/* the same operation whether it's the debounced background sync after a
   normal edit or the button doubling as "sync now" once already connected -
   manual just skips the debounce and shows an immediate status change */
function runDriveSync(manual){
  console.log("[drive] runDriveSync("+manual+") called. driveConnected="+state.driveConnected+" driveSyncInFlight="+driveSyncInFlight);
  if(!state.driveConnected||driveSyncInFlight){
    console.log("[drive] runDriveSync: BLOCKED at the guard - "+(!state.driveConnected?"not connected":"driveSyncInFlight is already true")+". Nothing else in this call happens.");
    return;
  }
  driveSyncInFlight=true;
  console.log("[drive] runDriveSync: guard passed, driveSyncInFlight set true, calling getAccessToken(interactive="+manual+")");
  if(manual) setStatus("Syncing with Drive…");
  /* manual doubles as "interactive" here - true for a real click (the
     connectDrive button, or the pointerdown-delegated reconnect listener
     below), false for the automatic page-load/post-edit debounce, which
     must never be allowed to open the account picker on its own. */
  getAccessToken(function(err,token){
    console.log("[drive] runDriveSync: getAccessToken callback fired. err="+(err?err.message+" (needsReconnect="+!!err.needsReconnect+", dismissed="+!!err.dismissed+", viaFocus="+!!err.viaFocus+")":"none"));
    lastDriveSyncErr=err||null; /* exposed via __HL_TEST__ for tests that need to confirm WHICH mechanism resolved an attempt (focus fast path vs. backstop timeout), not just that something did */
    if(err){
      driveSyncInFlight=false;
      driveNeedsReconnect=true;
      console.log("[drive] runDriveSync: driveSyncInFlight reset to false. Button set to 'tap to resume syncing'.");
      /* only an actual attempted interactive flow "uses up" the one
         auto-retry per episode - a passive automatic skip (err.needsReconnect,
         manual===false) never even tried, so it shouldn't block the next
         real tap from trying */
      if(manual) driveReconnectAttemptedThisSession=true;
      document.getElementById("connectDrive").disabled=false; /* markSigningIn() may have disabled it - always reset here regardless of whether this particular attempt was interactive */
      document.getElementById("connectDrive").textContent="Drive: tap to resume syncing";
      setStatus(err.needsReconnect?"Drive: tap anywhere in the app to resume syncing":"Drive sync needs reconnecting",true);
      return;
    }
    console.log("[drive] runDriveSync: got a real token, proceeding to sync");
    driveNeedsReconnect=false;
    driveReconnectAttemptedThisSession=false;
    driveFindFileId(token).then(function(fileId){
      return (fileId?driveReadFile(token,fileId):Promise.resolve(null)).then(function(remoteData){
        return {fileId:fileId,remoteData:remoteData};
      });
    }).then(function(res){
      var syncResult;
      try{ syncResult=syncEngine(state,res.remoteData,getDeviceId()); }
      catch(e){
        driveSyncInFlight=false;
        document.getElementById("connectDrive").disabled=false;
        document.getElementById("connectDrive").textContent="Drive: sync failed";
        setStatus("Drive sync failed, will retry",true);
        return;
      }
      state=syncResult.newLocalState;
      state.driveConnected=true;
      driveSyncApplyingRemote=true;
      try{ persist(); } finally{ driveSyncApplyingRemote=false; }
      render();
      /* user-facing, not just the console.log already inside
         sweepCompressVerdicts itself - this exact self-heal ran silently
         for weeks in real use before anyone noticed, because nothing
         surfaced outside DevTools. state is already reassigned above, so
         catById resolves against the just-merged categories. */
      if(syncResult.sweptCompress&&syncResult.sweptCompress.length) showToast(describeCompressSweep(syncResult.sweptCompress),false);
      return driveWriteFile(token,res.fileId,{categories:syncResult.toPush.categories,entries:syncResult.toPush.entries,verdicts:syncResult.toPush.verdicts,closeouts:syncResult.toPush.closeouts}).then(function(){
        driveSyncInFlight=false;
        setStatus("Synced with Drive");
        document.getElementById("connectDrive").disabled=false;
        document.getElementById("connectDrive").textContent="Drive: synced";
      });
    }).catch(function(){
      driveSyncInFlight=false;
      document.getElementById("connectDrive").disabled=false;
      document.getElementById("connectDrive").textContent="Drive: sync failed";
      setStatus("Drive sync failed, will retry",true);
    });
  },manual);
}

/* keeps hard rule 4's colophon promise honest once sync is opted into -
   "nothing leaves the browser" stops being true the moment someone connects
   Drive, so the footer has to say something different for exactly that
   person rather than keep asserting something now false */
function updateColophon(){
  var el=document.getElementById("colophonPrivacy");
  if(!el) return;
  el.textContent=state.driveConnected?
    "Your week syncs to your own Google Drive, connected by you. Nothing else leaves this browser.":
    "Your week never leaves this browser. No account, no tracking, no server.";
}

/* ---------------- undo / redo ---------------- */
var UKEY=TEST_MODE?"hours-ledger-selftest-undo-v1":"hours-ledger-undo-v1";
var undoStack=[], redoStack=[];
try{ undoStack=JSON.parse(readStore(UKEY))||[]; }catch(e){ undoStack=[]; }

function snapshot(desc){
  undoStack.push({s:JSON.stringify(state),d:desc||"change"});
  if(undoStack.length>25) undoStack.shift();
  redoStack=[];
  writeStore(UKEY,JSON.stringify(undoStack.slice(-12)));
}
function applyState(json){
  state=JSON.parse(json);
  if(!state.settings) state.settings={startHour:6,endHour:24};
  if(!state.entries) state.entries={};
  if(!state.weekCloseouts) state.weekCloseouts={};
  migrateVerdicts(state);
  migrateVerdictScale(state);
  migrateVerdictTombstoneCollisions(state);
  migrateRecentColors(state);
  writeStore(KEY,JSON.stringify(state));
  if(fileHandle){ clearTimeout(writeTimer); writeTimer=setTimeout(writeLinkedFile,600); }
  render();
}
function undo(){
  if(!undoStack.length){ showToast("Nothing left to undo",false); return; }
  var step=undoStack.pop();
  redoStack.push({s:JSON.stringify(state),d:step.d});
  writeStore(UKEY,JSON.stringify(undoStack.slice(-12)));
  applyState(step.s);
  showToast("Undone: "+step.d,false);
}
function redo(){
  if(!redoStack.length) return;
  var step=redoStack.pop();
  undoStack.push({s:JSON.stringify(state),d:step.d});
  writeStore(UKEY,JSON.stringify(undoStack.slice(-12)));
  applyState(step.s);
  showToast("Redone: "+step.d,false);
}

var toastTimer=null, toastCollapseTimer=null, toastExpiresAt=0;
function showToast(text,withUndo){
  var t=document.getElementById("toast");
  document.getElementById("toastText").textContent=text;
  document.getElementById("toastText").hidden=false;
  document.getElementById("toastUndo").hidden=!withUndo;
  t.classList.add("on");
  var ms=withUndo?14000:4000;
  toastExpiresAt=Date.now()+ms;
  clearTimeout(toastTimer);
  clearTimeout(toastCollapseTimer);
  /* the message ("Deleted X") only needs to be read once — after a few
     seconds collapse down to just the Undo button, which stays clickable
     (and correctly still undoes the same change) for the rest of the window */
  if(withUndo) toastCollapseTimer=setTimeout(function(){ document.getElementById("toastText").hidden=true; },5000);
  toastTimer=setTimeout(hideToast,ms);
}
function hideToast(){
  clearTimeout(toastTimer);
  clearTimeout(toastCollapseTimer);
  document.getElementById("toast").classList.remove("on");
  document.getElementById("toastText").hidden=false;
}
/* mobile browsers pause timers while the tab is backgrounded (phone locked,
   switched apps) — if we come back after the toast should already have
   expired, clear it right away instead of leaving a stale "Undo" on screen */
document.addEventListener("visibilitychange",function(){
  if(!document.hidden&&toastExpiresAt&&Date.now()>=toastExpiresAt) hideToast();
});
document.getElementById("toastUndo").addEventListener("click",function(){
  hideToast();
  undo();
});
document.addEventListener("keydown",function(ev){
  var k=ev.key.toLowerCase();
  if((ev.ctrlKey||ev.metaKey)&&k==="z"&&!ev.shiftKey){ ev.preventDefault(); undo(); }
  else if((ev.ctrlKey||ev.metaKey)&&(k==="y"||(k==="z"&&ev.shiftKey))){ ev.preventDefault(); redo(); }
});

if(!storageOK){
  var w=document.getElementById("warn");
  w.innerHTML="This browser is blocking automatic saving. Your week is held in memory only &mdash; export a copy before closing.";
  w.style.display="block";
}

/* ---------------- dates ---------------- */
var DAYNAMES=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
var MONTHS=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function iso(d){ return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function parseIso(s){ var p=s.split("-"); return new Date(+p[0],+p[1]-1,+p[2]); }
function mondayOf(d){ var x=new Date(d.getFullYear(),d.getMonth(),d.getDate()); x.setDate(x.getDate()-((x.getDay()+6)%7)); return x; }
function addDays(d,n){ var x=new Date(d); x.setDate(x.getDate()+n); return x; }
var weekStart=mondayOf(new Date());
var viewMode=(typeof window!=="undefined"&&window.innerWidth<820)?"day":"week";
var focusDay=(new Date().getDay()+6)%7;
function visibleDays(){ return viewMode==="day"?[focusDay]:[0,1,2,3,4,5,6]; }
function weekDates(){ var o=[]; for(var i=0;i<7;i++) o.push(addDays(weekStart,i)); return o; }

/* ---------------- time ---------------- */
function toHM(m){ return String(Math.floor(m/60)).padStart(2,"0")+":"+String(m%60).padStart(2,"0"); }
function fromHM(s){ var p=s.split(":"); return (+p[0])*60+(+p[1]); }
function dur(m){ var h=Math.floor(m/60),r=m%60; if(!m) return "0h"; return (h?h+"h":"")+(r?(h?" ":"")+r+"m":""); }
function escapeHtml(s){ return String(s).replace(/[&<>"]/g,function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }

function entriesFor(d){ return state.entries[d]||[]; }
function catById(id){ if(!id) return null; for(var i=0;i<state.categories.length;i++) if(state.categories[i].id===id) return state.categories[i]; return null; }
function catColor(id){ var c=catById(id); return c?c.color:"#9AA5A0"; }
function getVerdict(catId,weekIso){ var wv=state.weeklyVerdicts[weekIso]; return (wv&&wv[catId])||null; }
/* clearing a verdict (v falsy - tapping the same verdict button twice, see
   the two callers) is a real delete, not just an internal state tidy-up:
   without a tombstone once this device has migrated, another device that
   never saw the clear would resurrect it on the next merge (case 1 -
   "present on one side only" - reads an omission as new, not deleted).
   Gated on state.deletedVerdicts existing, same signal removeEntry uses for
   state.deletedEntries - a device that's never migrated writes no footprint
   at all, identical to pre-sync behavior. verdictMeta is deleted in the SAME
   step the tombstone is written, not left to linger - the tombstone already
   carries its own updatedAt/updatedBy, so a surviving verdictMeta copy would
   just be a second, potentially disagreeing, copy of the same fact. */
function setVerdict(catId,weekIso,v){
  if(!state.weeklyVerdicts[weekIso]) state.weeklyVerdicts[weekIso]={};
  var key=weekIso+"|"+catId;
  if(v){
    state.weeklyVerdicts[weekIso][catId]=v;
    if(state.deletedVerdicts){
      if(!state.verdictMeta) state.verdictMeta={};
      state.verdictMeta[key]={updatedAt:nowIso(),updatedBy:getDeviceId()};
      /* root fix for the tombstone-collision bug (see flattenVerdicts'
         comment): a fresh verdict must never be left coexisting with a
         tombstone from an earlier clear/sweep for this same key - this is
         a real, deliberate local edit, not an inference from absence, so
         clearing it here doesn't conflict with hard rule 7. */
      delete state.deletedVerdicts[key];
    }
  }else{
    delete state.weeklyVerdicts[weekIso][catId];
    if(state.deletedVerdicts){
      if(state.verdictMeta) delete state.verdictMeta[key];
      state.deletedVerdicts[key]={weekIso:weekIso,catId:catId,updatedAt:nowIso(),updatedBy:getDeviceId(),deletedAt:nowIso()};
    }
  }
}

function putEntry(dateStr,label,catId,start,end,replaceId){
  if(replaceId) removeEntry(replaceId);
  if(end<=start){ push(dateStr,label,catId,start,1440); if(end>0) push(iso(addDays(parseIso(dateStr),1)),label,catId,0,end); }
  else push(dateStr,label,catId,start,end);
}
function push(d,label,catId,s,e){ if(!state.entries[d]) state.entries[d]=[]; state.entries[d].push({id:uid(),label:label,cat:catId,start:s,end:e}); }

/* splits one block around 1-3 breaks into activity/Break/activity/Break/...
   segments, skipping an activity segment if a break sits flush against an
   edge or against the previous break. Breaks are sorted here regardless of
   input order; caller must still ensure each falls within start-end with
   no overlaps (see saveSheet). */
function putEntryWithBreaks(dateStr,label,catId,start,end,breaks,replaceId){
  if(replaceId) removeEntry(replaceId);
  var cursor=start;
  breaks.slice().sort(function(a,b){ return a.start-b.start; }).forEach(function(b){
    if(b.start>cursor) push(dateStr,label,catId,cursor,b.start);
    push(dateStr,"Break",null,b.start,b.end);
    cursor=b.end;
  });
  if(cursor<end) push(dateStr,label,catId,cursor,end);
}
/* the one place any entry is ever removed from state.entries - explicit
   deletes AND every edit both go through here (putEntry's replaceId path
   below calls this before pushing the edited version back in as a new
   record with a new id, so from sync's perspective an edit already looks
   exactly like a delete-then-create). That makes this the single load-
   bearing choke point for tombstone-writing: skip it here and every edit,
   not just every explicit delete, would resurrect its own pre-edit content
   the next time an unsynced device merges in. Gated on state.deletedEntries
   existing - a device that's never touched sync has no such key, so this
   stays a no-op and the function does exactly what it always did. */
function removeEntry(id){
  var f=state.deletedEntries&&findEntry(id);
  for(var k in state.entries){
    state.entries[k]=state.entries[k].filter(function(e){ return e.id!==id; });
    if(!state.entries[k].length) delete state.entries[k];
  }
  if(f) state.deletedEntries[id]={id:id,date:f.date,updatedAt:nowIso(),updatedBy:getDeviceId(),deletedAt:nowIso()};
}
function findEntry(id){
  for(var k in state.entries) for(var i=0;i<state.entries[k].length;i++)
    if(state.entries[k][i].id===id) return {date:k,e:state.entries[k][i]};
  return null;
}
function recentLabels(){
  var seen={},out=[],keys=Object.keys(state.entries).sort().reverse();
  for(var i=0;i<keys.length&&out.length<8;i++){
    var list=state.entries[keys[i]];
    for(var j=list.length-1;j>=0&&out.length<8;j--){
      var l=list[j].label;
      if(l&&!seen[l.toLowerCase()]){ seen[l.toLowerCase()]=1; out.push({label:l,cat:list[j].cat}); }
    }
  }
  return out;
}

function layout(list){
  var s=list.slice().sort(function(a,b){ return a.start-b.start||a.end-b.end; });
  var clusters=[],cur=[],curEnd=-1;
  s.forEach(function(e){
    if(cur.length&&e.start>=curEnd){ clusters.push(cur); cur=[]; curEnd=-1; }
    cur.push(e); curEnd=Math.max(curEnd,e.end);
  });
  if(cur.length) clusters.push(cur);
  var out=[];
  clusters.forEach(function(c){
    var lanes=[];
    c.forEach(function(e){ var i=0; for(;i<lanes.length;i++){ if(lanes[i]<=e.start) break; } lanes[i]=e.end; e._lane=i; });
    c.forEach(function(e){ e._lanes=lanes.length; out.push(e); });
  });
  return out;
}

/* ---------------- render ---------------- */
/* must match --row in styles.css (same value CSS uses for .gutter .hr and
   .day .slot) or entry blocks drift out of alignment with the grid under
   them — read it from CSS instead of hardcoding it a third time */
var ROW=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--row"))||26;

function renderGrid(){
  var days=weekDates();
  document.getElementById("anchor").value=iso(weekStart);
  var todayStr=iso(new Date());
  var vis=visibleDays();
  var cols="56px repeat("+vis.length+",1fr)";
  var head=document.getElementById("dayhead");
  head.style.gridTemplateColumns=cols;
  document.getElementById("gridbody").style.gridTemplateColumns=cols;
  document.querySelector(".grid").style.minWidth=(vis.length>3?"720px":"0");
  head.innerHTML='<div></div>'+vis.map(function(i){
    var d=days[i];
    return '<div class="'+(iso(d)===todayStr?"today":"")+'"><b>'+DAYNAMES[i]+"</b>"+d.getDate()+" "+MONTHS[d.getMonth()]+"</div>";
  }).join("");

  var sh=state.settings.startHour, eh=state.settings.endHour, gut="";
  for(var h=sh;h<eh;h++) gut+='<div class="hr">'+String(h).padStart(2,"0")+":00</div>";
  var html='<div class="gutter">'+gut+"</div>";

  vis.forEach(function(di){
    var d=days[di];
    var slots="";
    for(var m=sh*60;m<eh*60;m+=30)
      slots+='<div class="slot'+((m%60)?" half":"")+((m%60)===30?" hour":"")+'" data-day="'+di+'" data-min="'+m+'"></div>';
    /* layout() annotates each entry with _lane/_lanes for side-by-side placement —
       copy the entries first so that scratch data never lands on the objects
       stored in state.entries (and from there into persist()/export/sync) */
    var blocks=layout(entriesFor(iso(d)).map(function(e){ return Object.assign({},e); })).map(function(e){
      if(e.end<=sh*60||e.start>=eh*60) return "";
      var top=Math.max(((e.start-sh*60)/30)*ROW,0);
      var hgt=((Math.min(e.end,eh*60)-Math.max(e.start,sh*60))/30)*ROW;
      var w=100/(e._lanes||1);
      return '<button class="entry" data-id="'+e.id+'" data-cat="'+(e.cat||"")+'" style="top:'+top+"px;height:"+Math.max(hgt-1,13)+"px;"+
        "left:calc("+(w*e._lane)+"% + 2px);width:calc("+w+"% - 4px);background:"+catColor(e.cat)+'">'+
        (hgt>=30?'<span class="t">'+toHM(e.start)+"&ndash;"+toHM(e.end)+"</span>":"")+escapeHtml(e.label||"Untitled")+"</button>";
    }).join("");
    html+='<div class="day" data-day="'+di+'">'+slots+blocks+"</div>";
  });
  document.getElementById("gridbody").innerHTML=html;
  document.getElementById("range").textContent=(sh===0&&eh===24)?"Show 06:00\u201324:00":"Show full 24h";
  document.getElementById("dayswitch").classList.toggle("on",viewMode==="day");
  document.getElementById("viewToggle").textContent=(viewMode==="day")?"Week view":"Day view";
  if(viewMode==="day"){
    var fd=days[focusDay];
    document.getElementById("dayLabel").textContent=DAYNAMES[focusDay]+" "+fd.getDate()+" "+MONTHS[fd.getMonth()];
  }
}

function recolorEntries(){
  [].forEach.call(document.querySelectorAll(".entry"),function(el){
    el.style.background=catColor(el.dataset.cat||null);
  });
}

/* collapses a set of [start,end) ranges into the fewest non-overlapping
   ranges that cover the same total time, sorted by start */
function mergeRanges(ranges){
  if(!ranges.length) return [];
  var sorted=ranges.slice().sort(function(a,b){ return a.start-b.start; });
  var out=[{start:sorted[0].start,end:sorted[0].end}];
  for(var i=1;i<sorted.length;i++){
    var r=sorted[i], last=out[out.length-1];
    if(r.start<=last.end) last.end=Math.max(last.end,r.end);
    else out.push({start:r.start,end:r.end});
  }
  return out;
}
/* sums the total time actually covered by a set of ranges, counting any
   overlap only once - two entries double-booking the same half hour
   don't make the week longer than 168 hours */
function unionMinutes(ranges){
  return mergeRanges(ranges).reduce(function(sum,r){ return sum+(r.end-r.start); },0);
}
/* how much of rangesA's own covered time is also covered by rangesB -
   used to show "23m of this also overlaps something else" per category */
function intersectionMinutes(rangesA,rangesB){
  var a=mergeRanges(rangesA), b=mergeRanges(rangesB);
  var i=0,j=0,total=0;
  while(i<a.length&&j<b.length){
    var s=Math.max(a[i].start,b[j].start), e=Math.min(a[i].end,b[j].end);
    if(s<e) total+=e-s;
    if(a[i].end<b[j].end) i++; else j++;
  }
  return total;
}
/* the unlogged stretches of a single day - the complement of its entries'
   merged coverage within the full 0-1440 range, used by the weekly
   close-out to name exactly where the blank time is, not just how much */
function dayGaps(dateStr){
  var ranges=entriesFor(dateStr).map(function(e){ return {start:e.start,end:e.end}; });
  var covered=mergeRanges(ranges);
  var gaps=[], cursor=0;
  covered.forEach(function(r){
    if(r.start>cursor) gaps.push({start:cursor,end:r.start});
    cursor=Math.max(cursor,r.end);
  });
  if(cursor<1440) gaps.push({start:cursor,end:1440});
  return gaps;
}
function weekTotals(ws){
  var days=ws?(function(){ var o=[]; for(var i=0;i<7;i++) o.push(addDays(ws,i)); return o; })():weekDates();
  var t={},none=0,ranges=[],byCat={},noneRanges=[];
  days.forEach(function(d,di){
    entriesFor(iso(d)).forEach(function(e){
      var m=e.end-e.start;
      /* offset by day so entries on different days at the same time of
         day are never mistaken for overlapping each other */
      var r={start:di*1440+e.start,end:di*1440+e.end};
      ranges.push(r);
      if(catById(e.cat)){
        t[e.cat]=(t[e.cat]||0)+m;
        (byCat[e.cat]=byCat[e.cat]||[]).push(r);
      }else{ none+=m; noneRanges.push(r); }
    });
  });
  /* how much of each category's own time is also covered by something
     else this week - a category's total stays an honest sum of what you
     logged for it, this just surfaces how much of that was multitasked */
  var overlap={};
  Object.keys(byCat).forEach(function(catId){
    var others=noneRanges.slice();
    Object.keys(byCat).forEach(function(otherId){
      if(otherId!==catId) others=others.concat(byCat[otherId]);
    });
    overlap[catId]=intersectionMinutes(byCat[catId],others);
  });
  if(noneRanges.length){
    var allCatRanges=[];
    Object.keys(byCat).forEach(function(id){ allCatRanges=allCatRanges.concat(byCat[id]); });
    overlap.none=intersectionMinutes(noneRanges,allCatRanges);
  }
  return {t:t,logged:unionMinutes(ranges),none:none,overlap:overlap};
}

function renderTotals(){
  var r=weekTotals(),max=r.none;
  state.categories.forEach(function(c){ max=Math.max(max,r.t[c.id]||0); });
  var thisWeek=iso(weekStart);

  var rows=state.categories.slice().sort(function(a,b){ return (r.t[b.id]||0)-(r.t[a.id]||0); }).map(function(c){
    var m=r.t[c.id]||0, pct=max?Math.round(m/max*100):0, v=getVerdict(c.id,thisWeek), ov=r.overlap[c.id]||0;
    return '<div class="tot"><div class="tot-top"><span class="dot" style="background:'+c.color+'"></span>'+
      escapeHtml(c.name)+'<span class="h">'+dur(m)+'</span></div>'+
      (ov>0?'<div class="tot-overlap">overlaps '+dur(ov)+' with another entry</div>':'')+
      '<div class="tot-bar"><i style="width:'+pct+"%;background:"+c.color+'"></i></div>'+
      '<div class="verdict" data-cat="'+c.id+'">'+["increase","keep","cut"].map(function(dv){
        return '<button data-v="'+dv+'" aria-pressed="'+(v===dv)+'">'+dv+"</button>";
      }).join("")+"</div></div>";
  }).join("");

  if(r.none>0){
    var noneOv=r.overlap.none||0;
    rows+='<div class="tot"><div class="tot-top"><span class="dot" style="background:var(--none)"></span>No category'+
      '<span class="h">'+dur(r.none)+'</span></div>'+
      (noneOv>0?'<div class="tot-overlap">overlaps '+dur(noneOv)+' with another entry</div>':'')+
      '<div class="tot-bar"><i style="width:'+(max?Math.round(r.none/max*100):0)+'%;background:var(--none)"></i></div></div>';
  }

  document.getElementById("totals").innerHTML=rows;
  document.getElementById("unlogged").textContent=dur(Math.max(10080-r.logged,0));

  var segs=state.categories.map(function(c){
    var m=r.t[c.id]||0;
    return m?'<div class="seg" style="width:'+(m/10080*100)+"%;background:"+c.color+'" data-name="'+escapeHtml(c.name)+'" data-dur="'+dur(m)+'"></div>':"";
  }).join("");
  if(r.none) segs+='<div class="seg" style="width:'+(r.none/10080*100)+'%;background:var(--none)" data-name="No category" data-dur="'+dur(r.none)+'"></div>';
  segs+='<div class="seg void" style="width:'+(Math.max(10080-r.logged,0)/10080*100)+'%"></div>';
  document.getElementById("bar").innerHTML=segs;
  document.getElementById("gaugeCount").innerHTML="<b>"+dur(r.logged)+"</b> logged &nbsp;/&nbsp; "+dur(Math.max(10080-r.logged,0))+" still blank";
}

/* hover tooltip on the 168-hour bar - one delegated listener on #bar
   rather than one per segment, since renderTotals() fully rebuilds the
   segments on every call. Gated behind matchMedia("hover: hover"),
   checked once here rather than left to the absence of touch events:
   some mobile browsers do synthesize a stray hover on tap, and doing
   nothing on touch is the explicit goal, not just an assumption about
   what events fire there. */
if(window.matchMedia&&window.matchMedia("(hover: hover)").matches){
  var barEl=document.getElementById("bar"),barTip=document.getElementById("barTip");
  /* barTip is a sibling of #bar, not a child - #bar's innerHTML is fully
     replaced on every renderTotals() call, which would silently delete a
     tooltip element living inside it. Position math below is done in
     offsetLeft/offsetWidth terms (bar's own position within its
     offsetParent, .gauge) rather than getBoundingClientRect on barTip
     itself, so it stays correct regardless of that split. */
  barEl.addEventListener("mousemove",function(ev){
    var seg=ev.target.closest(".seg:not(.void)");
    if(!seg){ barTip.hidden=true; return; }
    barTip.textContent=seg.dataset.name+", "+seg.dataset.dur;
    barTip.hidden=false;
    var x=ev.clientX-barEl.getBoundingClientRect().left, half=barTip.offsetWidth/2;
    barTip.style.left=(barEl.offsetLeft+Math.min(Math.max(x,half),barEl.offsetWidth-half))+"px";
  });
  barEl.addEventListener("mouseleave",function(){ barTip.hidden=true; });
}

function renderCats(){
  document.getElementById("cats").innerHTML=state.categories.map(function(c){
    var hsv=hsvOf(c.color);
    var recents=state.settings.recentColors||[];
    return '<div class="cat" data-cat="'+c.id+'">'+
      '<button class="sw" style="background:'+c.color+'" aria-label="Colour for '+escapeHtml(c.name)+'"></button>'+
      '<input class="nm" type="text" value="'+escapeHtml(c.name)+'" aria-label="Category name">'+
      '<button class="del" aria-label="Delete '+escapeHtml(c.name)+'">&times;</button>'+
      '<div class="picker" hidden>'+
        '<div class="presets">'+SWATCHES.map(function(s){ return '<button data-hex="'+s+'" style="background:'+s+'" aria-label="Use '+s+'"></button>'; }).join("")+"</div>"+
        '<div class="spectrum" style="--h:'+hsv[0]+'"><i class="dot" style="left:'+(hsv[1]*100)+'%;top:'+((1-hsv[2])*100)+'%"></i></div>'+
        '<input class="hue" type="range" min="0" max="360" value="'+hsv[0]+'" aria-label="Drag to change hue">'+
        (recents.length?'<div class="recents">'+recents.map(function(s){ return '<button data-hex="'+s+'" style="background:'+s+'" aria-label="Use '+s+'"></button>'; }).join("")+"</div>":"")+
        '<span class="pickhint">Drag the box or strip, or tap a swatch</span>'+
      "</div>"+
      '<div class="catdelete" hidden>'+
        '<p class="catdelete-msg"></p>'+
        '<select class="catdelete-target"></select>'+
        '<div class="catdelete-actions">'+
          '<button class="catdelete-confirm">Delete</button>'+
          '<button class="catdelete-cancel">Cancel</button>'+
        "</div>"+
      "</div></div>";
  }).join("");
}
function countCategoryEntries(catId){
  var n=0;
  Object.keys(state.entries).forEach(function(d){ state.entries[d].forEach(function(e){ if(e.cat===catId) n++; }); });
  return n;
}
/* reuses putEntry's own replaceId path (delete-then-recreate) for every
   affected entry, rather than mutating e.cat in place - keeps this on the
   exact same well-tested machinery every other entry edit already goes
   through, tombstone-writing included, instead of a second bespoke path
   that would need its own updatedAt-bumping logic to stay correct */
function reassignCategoryEntries(fromCatId,toCatId){
  var affected=[];
  Object.keys(state.entries).forEach(function(d){
    state.entries[d].forEach(function(e){ if(e.cat===fromCatId) affected.push({date:d,entry:e}); });
  });
  affected.forEach(function(a){
    putEntry(a.date,a.entry.label,toCatId,a.entry.start,a.entry.end,a.entry.id);
  });
}
/* reassignToId falsy = leave entries exactly as deleting always has (a
   dangling reference, invisible as "No category" until/unless the category
   ever resurfaces via sync - see the design discussion); a real id = move
   every affected entry there first, via reassignCategoryEntries above */
function doDeleteCategory(c,reassignToId){
  var n=countCategoryEntries(c.id);
  snapshot('delete category "'+c.name+'"');
  if(reassignToId) reassignCategoryEntries(c.id,reassignToId);
  if(state.deletedCategories) state.deletedCategories[c.id]={id:c.id,updatedAt:nowIso(),updatedBy:getDeviceId(),deletedAt:nowIso()};
  state.categories=state.categories.filter(function(x){ return x.id!==c.id; });
  persist(); render();
  var targetCat=reassignToId?catById(reassignToId):null;
  var msg='Deleted "'+(c.name||"category")+'"'+
    (reassignToId?(" — "+n+" "+(n===1?"entry":"entries")+' moved to "'+(targetCat?targetCat.name:"category")+'".'):
      (n?" — its entries moved to No category.":"."));
  showToast(msg,true);
}
function openCategoryDeleteChooser(row,c,n){
  [].forEach.call(cats.querySelectorAll(".picker"),function(p){ p.hidden=true; });
  [].forEach.call(cats.querySelectorAll(".catdelete"),function(p){ p.hidden=true; });
  var panel=row.querySelector(".catdelete");
  panel.querySelector(".catdelete-msg").textContent=
    n+" "+(n===1?"entry uses":"entries use")+' "'+(c.name||"this category")+'". Move '+(n===1?"it":"them")+
    " somewhere else, or leave "+(n===1?"it":"them")+" uncategorised:";
  panel.querySelector(".catdelete-target").innerHTML='<option value="">No category</option>'+
    state.categories.filter(function(x){ return x.id!==c.id; })
      .map(function(x){ return '<option value="'+x.id+'">'+escapeHtml(x.name||"Untitled")+"</option>"; }).join("");
  panel.hidden=false;
}

function render(){ renderGrid(); renderTotals(); renderCats(); refreshHint(); updateCloseoutAvailability(); updateColophon(); }

/* ---------------- colour ---------------- */
/* generalized from the old fixed-s/l hslHex(h) (picker redesign,
   2026-08-20) - the old function only ever produced one point on the hue
   wheel (s=0.70,l=0.40, chosen so it cleared OKLCH's chroma floor - see
   the s/l defaults below, unchanged). The spectrum box needs the full
   h/s/l range; the hue bar still only ever drives h, but must now hold s/l
   steady at whatever the box last set rather than reset them - see the
   hue input handler below for the actual fix. */
function hslToHex(h,s,l){
  var c=(1-Math.abs(2*l-1))*s, x=c*(1-Math.abs((h/60)%2-1)), m=l-c/2, r,g,b;
  if(h<60){r=c;g=x;b=0;} else if(h<120){r=x;g=c;b=0;} else if(h<180){r=0;g=c;b=x;}
  else if(h<240){r=0;g=x;b=c;} else if(h<300){r=x;g=0;b=c;} else {r=c;g=0;b=x;}
  return "#"+[r,g,b].map(function(v){ return String(Math.round((v+m)*255).toString(16)).padStart(2,"0"); }).join("").toUpperCase();
}
function hslHex(h){ return hslToHex(h,0.70,0.40); }
/* returns [h,s,l] (h in 0-360, s/l in 0-1) - the inverse of hslToHex,
   generalizing the old hueOf(hex) (kept as a thin wrapper below since
   nothing else in this file needs s/l on its own) */
function hslOf(hex){
  var r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;
  var mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn,h=0,l=(mx+mn)/2,s=0;
  if(d){
    s=d/(1-Math.abs(2*l-1));
    if(mx===r) h=60*(((g-b)/d)%6); else if(mx===g) h=60*((b-r)/d+2); else h=60*((r-g)/d+4);
  }
  return [(h+360)%360,s,l];
}
function hueOf(hex){ return Math.round(hslOf(hex)[0]); }
/* HSV, not HSL, for the spectrum box specifically - a saturation x
   lightness square wastes its top and bottom (everything near l=0 or l=1
   converges to black/white regardless of s, giving a diamond of useful
   area inside a square control), while saturation x value fills the whole
   box - the standard technique behind every reference picker this redesign
   is based on. Hue extraction is identical in both models (it depends only
   on which RGB channel is max/min), so this reuses hslOf's h rather than
   recomputing it; only s/v differ from HSL's s/l. The hue bar still edits
   the same h either model would report, so nothing else in the file needs
   to know HSV exists - only the box's own read/write boundary does. */
function hsvOf(hex){
  var r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;
  var mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn;
  var v=mx,s=mx===0?0:d/mx;
  return [hslOf(hex)[0],s,v];
}
function hsvToHex(h,s,v){
  var c=v*s, x=c*(1-Math.abs((h/60)%2-1)), m=v-c, r,g,b;
  if(h<60){r=c;g=x;b=0;} else if(h<120){r=x;g=c;b=0;} else if(h<180){r=0;g=c;b=x;}
  else if(h<240){r=0;g=x;b=c;} else if(h<300){r=x;g=0;b=c;} else {r=c;g=0;b=x;}
  return "#"+[r,g,b].map(function(v){ return String(Math.round((v+m)*255).toString(16)).padStart(2,"0"); }).join("").toUpperCase();
}

/* ---------------- modal ---------------- */
var editing=null, labelTouched=false, chosenCat=null;
var scrim=document.getElementById("scrim");
var fLabel=document.getElementById("fLabel");

function paintChips(){
  document.getElementById("fChips").innerHTML=state.categories.map(function(c){
    return '<button class="chip" data-cat="'+c.id+'" aria-pressed="'+(c.id===chosenCat)+'"><i style="background:'+c.color+'"></i>'+escapeHtml(c.name)+"</button>";
  }).join("");
}

function openSheet(dayIdx,start,end,entryId){
  hideToast();
  editing=entryId||null;
  chosenCat=null;
  labelTouched=false;
  var days=weekDates();
  document.getElementById("fDay").value=iso(days[dayIdx]);
  document.getElementById("fStart").value=toHM(start);
  document.getElementById("fEnd").value=toHM(Math.min(end,1439));
  document.getElementById("fBreakToggle").checked=false;
  document.getElementById("breakFields").hidden=true;
  document.getElementById("breakRows").innerHTML="";
  updateAddBreakVisibility();

  var lbl="";
  if(entryId){
    var f=findEntry(entryId);
    if(f){ lbl=f.e.label; chosenCat=f.e.cat||null; labelTouched=true; }
  }
  fLabel.value=lbl;
  document.getElementById("sheetTitle").textContent=entryId?"Edit entry":"What were you doing?";
  document.getElementById("fDelete").hidden=!entryId;
  document.getElementById("repeatField").hidden=!!entryId;
  paintChips();

  document.getElementById("fRepeat").innerHTML=DAYNAMES.map(function(n,i){
    return '<button data-d="'+i+'" aria-pressed="'+(i===dayIdx)+'">'+n+"</button>";
  }).join("");
  fDaySyncedIdx=dayIdx;

  var rec=recentLabels();
  document.getElementById("fRecent").innerHTML=entryId?"":rec.map(function(r){
    return '<button data-label="'+escapeHtml(r.label)+'" data-cat="'+(r.cat||"")+'">'+escapeHtml(r.label)+"</button>";
  }).join("");

  /* always reset to the top, not just on a fresh page load - nothing else
     in this function resets .sheet's own scroll position, and unlike every
     other field here it isn't naturally reset by a display:none/flex
     toggle (the browser preserves an element's scrollTop across that).
     Left alone, a sheet closed mid-scroll and reopened later in the same
     session opens wherever it was last scrolled to - surprising on its
     own (this is a new entry, not the one you scrolled), and it's also
     exactly the state that made the intermittent scroll-leak bug hard to
     pin down: whether the first touch starts at a genuine scroll boundary
     or mid-content became leftover-state-dependent instead of predictable.
     Resetting here makes "opens at the top" the one guaranteed starting
     condition, same as every other field this function already resets. */
  scrim.querySelector(".sheet").scrollTop=0;
  scrim.classList.add("on");
  lockBodyScroll();
  /* autofocus only where there's no on-screen keyboard to fight - on a phone
     it used to cover the category chips and time fields the instant the
     sheet opened, before the user got a chance to see them */
  if(window.innerWidth>=820) fLabel.focus();
}
function closeSheet(){ scrim.classList.remove("on"); editing=null; unlockBodyScroll(); }

fLabel.addEventListener("input",function(){ labelTouched=true; });

/* native <input type=time> doesn't self-close its picker/stepper once both
   segments are filled on some DESKTOP browsers - there's no custom picker
   in this codebase to control, so the best available fix is handing focus
   away once the value looks complete, which closes the native UI in most
   browsers. Delegated on scrim so this also covers the dynamically-added
   break-row time inputs without touching makeBreakRow().

   Desktop only, gated behind matchMedia("hover: hover") - same signal and
   same reasoning as the 168-hour bar's hover tooltip. A phone's native
   time picker is a wheel/scroll UI with its own confirm control; closing
   it out from under someone mid-scroll, on any guess at all, is simply
   wrong there, not just imprecise - real-device testing found exactly
   that: a 500ms debounce still fired while the user had only set the
   HOUR and was still moving to MINUTES, closing the picker before the
   second value could ever be set. Gating the whole mechanism off for
   touch removes it structurally rather than relying on touch events
   happening not to trigger it - the whole reason the bar tooltip was
   gated the same way, not left to matchMedia's absence being incidental.

   No property on a native time input's "input" event distinguishes "the
   user picked this from a dropdown" from "the user is mid-keystroke" -
   checked, not assumed; unlike <input type=text>'s InputEvent.inputType,
   time inputs don't expose that distinction in any standardized way.
   What IS available: comparing each "input" event's value against the
   value from THIS field's own previous "input" event tells you which
   half (hour or minute) changed. If the SAME half changes on two
   consecutive edits, that can only mean its second digit just landed - a
   2-digit segment has no third digit coming - so it's safe to close
   immediately: real, conclusive information, not a guess. Anything else
   (the first edit since focus, a different half changing, or both
   halves changing at once) stays genuinely ambiguous, and - per an
   explicit decision, not an oversight - is left open rather than closed
   on a timer. A single digit left mid-entry, or a native dropdown-style
   whole-value pick some desktop browsers offer (if its edits don't
   happen to land as two separate same-segment "input" events), both
   fall into this bucket now: staying open until a manual dismissal
   (click away, Tab, Enter - already wired to save/close the whole sheet)
   is judged better than closing on a guess that might be wrong. There is
   no timer fallback for the ambiguous case anymore - deliberately: a
   500ms guess was the mechanism that caused the phone regression above,
   and there's no correspondingly loose tolerance for it on desktop
   either once the conclusive signal (two same-segment edits) is
   available; see CLAUDE.md's backlog item 16.6 for the debounce this
   replaces and why. */
/* returns "hour", "minute", or null (both changed at once, or neither -
   not a normal single-digit edit) for which half differs between two
   "HH:MM" strings. null is deliberately treated as ambiguous by the
   caller, not as a third distinct case to fast-path on. */
function changedTimeSegment(oldVal,newVal){
  var o=(oldVal||"").split(":"),n=(newVal||"").split(":");
  if(o[0]!==n[0]&&o[1]===n[1]) return "hour";
  if(o[1]!==n[1]&&o[0]===n[0]) return "minute";
  return null;
}
if(window.matchMedia&&window.matchMedia("(hover: hover)").matches){
  scrim.addEventListener("focus",function(ev){
    if(!(ev.target.matches&&ev.target.matches('input[type="time"]'))) return;
    /* starts a fresh edit session so a same-segment match can't carry over
       from a much earlier edit across a blur-then-refocus gap */
    ev.target._lastChangedSegment=null;
    ev.target._lastTimeValue=ev.target.value;
  },true);
  scrim.addEventListener("input",function(ev){
    if(!(ev.target.matches&&ev.target.matches('input[type="time"]'))) return;
    if(!ev.target.value) return;
    var segment=changedTimeSegment(ev.target._lastTimeValue,ev.target.value);
    var closeNow=segment&&segment===ev.target._lastChangedSegment;
    ev.target._lastChangedSegment=segment;
    ev.target._lastTimeValue=ev.target.value;
    if(closeNow) ev.target.blur();
  });
}

document.getElementById("fChips").addEventListener("click",function(ev){
  var b=ev.target.closest(".chip"); if(!b) return;
  var was=chosenCat;
  chosenCat=(was===b.dataset.cat)?null:b.dataset.cat;
  paintChips();
  var prev=catById(was), now=catById(chosenCat);
  var v=fLabel.value.trim();
  /* only overwrite the label if the user never typed their own */
  if(!labelTouched||(prev&&v===prev.name)){
    fLabel.value=now?now.name:"";
    labelTouched=false;
  }
});

document.getElementById("fRecent").addEventListener("click",function(ev){
  var b=ev.target.closest("button"); if(!b) return;
  fLabel.value=b.dataset.label;
  labelTouched=true;
  chosenCat=b.dataset.cat||null;
  paintChips();
});

document.getElementById("fRepeat").addEventListener("click",function(ev){
  var b=ev.target.closest("button"); if(!b) return;
  b.setAttribute("aria-pressed",b.getAttribute("aria-pressed")==="true"?"false":"true");
  fDaySyncedIdx=null; /* the user is now driving Repeat directly - stop moving its toggle around under them */
});

/* "Also put it on" only makes sense for days inside the week the sheet
   opened on - it starts with the chosen Date's own day pre-toggled, standing
   in for "just this one day". If the user changes Date without ever
   touching Repeat themselves, move that same single toggle to match, so
   Date stays the thing that actually decides where a new entry lands (this
   was the bug: changing the day silently did nothing because Repeat's stale
   toggle from wherever the sheet was opened always won at save time).
   Picking a date outside that week hides Repeat entirely - repeating a date
   from three weeks ago onto "this week's Wednesday" isn't a real thing. */
var fDaySyncedIdx=null;
document.getElementById("fDay").addEventListener("change",function(){
  var days=weekDates(), val=this.value, newIdx=-1;
  days.forEach(function(d,i){ if(iso(d)===val) newIdx=i; });
  var inWeek=newIdx>-1;
  document.getElementById("repeatField").hidden=!!editing||!inWeek;
  if(inWeek){
    if(fDaySyncedIdx!==null){
      var oldBtn=document.querySelector('#fRepeat button[data-d="'+fDaySyncedIdx+'"]');
      if(oldBtn&&oldBtn.getAttribute("aria-pressed")==="true") oldBtn.setAttribute("aria-pressed","false");
    }
    var newBtn=document.querySelector('#fRepeat button[data-d="'+newIdx+'"]');
    if(newBtn) newBtn.setAttribute("aria-pressed","true");
    fDaySyncedIdx=newIdx;
  }else{
    [].forEach.call(document.querySelectorAll("#fRepeat button"),function(b){ b.setAttribute("aria-pressed","false"); });
    fDaySyncedIdx=null;
  }
});

/* up to 3 break rows, added/removed as individual DOM nodes so typing in
   one row is never disturbed by adding or removing another */
var MAX_BREAKS=3;
function makeBreakRow(){
  var row=document.createElement("div");
  row.className="breakrow";
  row.innerHTML=
    '<div class="two">'+
      '<div class="field"><label>Break from</label><input type="time" class="bstart" step="300"></div>'+
      '<div class="field"><label>Break to</label><input type="time" class="bend" step="300"></div>'+
    "</div>"+
    '<button type="button" class="delbreak">Remove this break</button>';
  row.querySelector(".delbreak").addEventListener("click",function(){
    row.remove();
    updateAddBreakVisibility();
  });
  return row;
}
function updateAddBreakVisibility(){
  var rows=document.getElementById("breakRows").children;
  document.getElementById("addBreakRow").hidden=rows.length>=MAX_BREAKS;
  [].forEach.call(rows,function(r){ r.querySelector(".delbreak").hidden=rows.length<2; });
}
document.getElementById("fBreakToggle").addEventListener("change",function(){
  document.getElementById("breakFields").hidden=!this.checked;
  if(this.checked&&!document.getElementById("breakRows").children.length){
    document.getElementById("breakRows").appendChild(makeBreakRow());
    updateAddBreakVisibility();
  }
});
document.getElementById("addBreakRow").addEventListener("click",function(){
  if(document.getElementById("breakRows").children.length>=MAX_BREAKS) return;
  document.getElementById("breakRows").appendChild(makeBreakRow());
  updateAddBreakVisibility();
});
function collectBreakRows(){
  return [].map.call(document.querySelectorAll("#breakRows .breakrow"),function(row){
    return {startRaw:row.querySelector(".bstart").value,endRaw:row.querySelector(".bend").value};
  }).filter(function(r){ return r.startRaw&&r.endRaw; })
    .map(function(r){ return {start:fromHM(r.startRaw),end:fromHM(r.endRaw)}; });
}

document.getElementById("fSave").addEventListener("click",saveSheet);
function saveSheet(){
  var fDayVal=document.getElementById("fDay").value;
  if(!fDayVal){ showToast("Pick a date",false); return; }
  var s=fromHM(document.getElementById("fStart").value||"00:00");
  var e=fromHM(document.getElementById("fEnd").value||"00:00");
  if(s===e){ showToast("Start and end time are the same — nothing saved",false); return; }

  var breakOn=document.getElementById("fBreakToggle").checked, breaks=[];
  if(breakOn){
    breaks=collectBreakRows();
    if(!breaks.length){ showToast("Add at least one break time, or uncheck 'Add a break'",false); return; }
    if(e<=s){ showToast("A break can't be added to an entry that crosses midnight",false); return; }
    breaks.sort(function(a,b){ return a.start-b.start; });
    for(var i=0;i<breaks.length;i++){
      var b=breaks[i];
      if(b.start>=b.end||b.start<s||b.end>e){ showToast("Each break has to fall inside the entry's start and end time",false); return; }
      if(i>0&&b.start<breaks[i-1].end){ showToast("Breaks can't overlap each other",false); return; }
    }
  }

  snapshot(editing?"edit entry":"add entry");
  var label=fLabel.value.trim();
  if(!label){ var c=catById(chosenCat); label=c?c.name:"Untitled"; }

  function writeDay(dateStr,replaceId){
    if(breakOn) putEntryWithBreaks(dateStr,label,chosenCat,s,e,breaks,replaceId);
    else putEntry(dateStr,label,chosenCat,s,e,replaceId);
  }

  if(editing){
    writeDay(fDayVal,editing);
  }else if(!document.getElementById("repeatField").hidden){
    var days=weekDates();
    var picked=[].filter.call(document.querySelectorAll("#fRepeat button"),function(b){ return b.getAttribute("aria-pressed")==="true"; })
                 .map(function(b){ return +b.dataset.d; });
    if(!picked.length){ var idx=-1; days.forEach(function(d,i){ if(iso(d)===fDayVal) idx=i; }); picked=[idx>-1?idx:0]; }
    picked.forEach(function(i){ writeDay(iso(days[i]),null); });
  }else{
    writeDay(fDayVal,null);
  }

  /* land wherever the entry actually went, even if that's a different week
     than the one on screen - otherwise a cross-week save would vanish from
     view with nothing but a toast to show for it */
  var savedDate=parseIso(fDayVal);
  weekStart=mondayOf(savedDate);
  focusDay=(savedDate.getDay()+6)%7;
  persist(); renderGrid(); renderTotals();
  closeSheet();
}
document.getElementById("fCancel").addEventListener("click",closeSheet);
document.getElementById("fDelete").addEventListener("click",function(){
  if(editing){
    var f=findEntry(editing), nm=f?f.e.label:"entry";
    snapshot("delete "+nm);
    removeEntry(editing); persist(); renderGrid(); renderTotals();
    showToast("Deleted "+nm,true);
  }
  closeSheet();
});
/* Body scroll lock, shared by every scrim/sheet pair - fixes touch
   scrolling behind an open modal leaking to the page underneath on iOS
   Safari (see CLAUDE.md's modal-scroll-lock entry for the full
   diagnosis). overflow:hidden on <body> is a well-known no-op for touch
   scroll on iOS Safari; position:fixed is the technique that actually
   works there, because it removes body from the scrollable flow entirely
   rather than asking WebKit to honour a property it doesn't for this
   purpose. width:100% is required alongside it - a fixed-position body
   otherwise collapses to its content's natural width, not the viewport's,
   which would visibly reflow whatever's underneath.

   A counter, not a plain boolean pair. Nothing today can open two scrims
   at once - every scrim is a full-viewport, pointer-events:auto overlay
   at the highest z-index in the app, so opening one physically blocks
   every tap that could open another (the Enter-to-log handler above even
   checks this explicitly before opening a fresh sheet). But a counter
   costs nothing extra over a boolean, and it means that invariant never
   has to be proven perfect for this code to stay safe. Two failure modes
   a plain boolean would have: locking twice would re-capture scrollY on
   the second call - and by then the page's real scrollY reads back as
   whatever a locked, position:fixed body reports (effectively 0), so a
   naive re-lock would silently overwrite the real saved position with
   0, and the eventual unlock would snap to the top instead of restoring
   it. Unlocking when never locked would call scrollTo with a stale or
   default saved value, jumping the page somewhere it was never at. The
   counter's guards below rule out both: only the 0->1 transition
   captures scrollY, and only the 1->0 transition restores it. */
var bodyScrollLockCount=0, bodyScrollLockY=0;
function lockBodyScroll(){
  bodyScrollLockCount++;
  if(bodyScrollLockCount>1) return;
  bodyScrollLockY=window.scrollY||window.pageYOffset||0;
  document.body.style.position="fixed";
  document.body.style.top=(-bodyScrollLockY)+"px";
  document.body.style.left="0";
  document.body.style.right="0";
  document.body.style.width="100%";
}
function unlockBodyScroll(){
  if(bodyScrollLockCount===0) return;
  bodyScrollLockCount--;
  if(bodyScrollLockCount>0) return;
  document.body.style.position="";
  document.body.style.top="";
  document.body.style.left="";
  document.body.style.right="";
  document.body.style.width="";
  window.scrollTo(0,bodyScrollLockY);
}
/* Defensive second line of defense, not the primary mechanism: with body
   genuinely locked above, a touch landing on the scrim's own bare
   background (not the sheet inside it) should already have nothing to
   scroll. This exists in case any WebKit quirk (e.g. address-bar
   collapse) lets a touch through the lock regardless. Gated on
   ev.target===scrimEl - the same check wireOutsideClose already uses
   just below - so it can never intercept a touch meant for the sheet's
   own internal, intentionally-scrollable content. */
function wireScrimTouchBlock(scrimEl){
  scrimEl.addEventListener("touchmove",function(ev){
    if(ev.target===scrimEl) ev.preventDefault();
  },{passive:false});
}
/* closing on a click outside a sheet needs to be a genuine click there,
   not just a click event that happens to resolve to the scrim - dragging to
   select text inside the sheet (e.g. the Activity field) and releasing the
   mouse outside it produces a "click" whose target is the nearest common
   ancestor of the mousedown and mouseup targets, which is the scrim itself,
   reading as an outside click even though the press began inside the
   sheet. Tracking where the press itself landed is what tells the two
   apart. Shared by every scrim/sheet pair in the app (the entry sheet and
   the close-out sheet so far) so a future fix to this logic can't be
   applied to one and missed on the other. */
function wireOutsideClose(scrimEl,closeFn){
  var pressed=false;
  scrimEl.addEventListener("mousedown",function(ev){ pressed=(ev.target===scrimEl); });
  scrimEl.addEventListener("click",function(ev){
    if(ev.target===scrimEl&&pressed) closeFn();
    pressed=false;
  });
}
wireOutsideClose(scrim,closeSheet);
wireScrimTouchBlock(scrim);
/* Enter does two jobs, gated so they can never both fire from one keypress:
   with the sheet open it saves and closes (unchanged from before); with
   nothing open at all it opens a fresh entry sheet from the main grid,
   reusing the exact same defaultAddDay()/defaultEntryTimes()/openSheet()
   path "Add entry" already uses below. Both live in this ONE handler with
   an early return after the "sheet is open" branch, rather than as two
   separate listeners - two listeners would each read scrim's state
   independently, so the save-branch closing the sheet mid-event could let
   a later listener see it as already closed and reopen one, the same
   keypress firing both actions. One handler with an early return rules
   that out structurally instead of by convention.

   Desktop only (matchMedia("hover: hover"), same signal as the bar tooltip
   and the time-input fast path above), and only when nothing else on
   screen could plausibly want that Enter instead: not while focused on any
   field/button/link (which either has its own native Enter behaviour to
   preserve, or - for a focused field - a native picker/dropdown that only
   ever shows for the currently-focused element, so excluding that
   element's own tag covers "typing" and "native picker open" as the same
   check), and not while Review, the close-out sheet, the intro modal, or a
   category colour/delete panel is open. Every check here reads live DOM
   state at the moment of the keypress, not a flag left over from a
   previous save - so this works from a cold start exactly as it does after
   ten saves in a row. */
document.addEventListener("keydown",function(ev){
  if(scrim.classList.contains("on")){
    if(ev.key==="Escape") closeSheet();
    else if(ev.key==="Enter"&&ev.target.tagName!=="BUTTON"){ ev.preventDefault(); saveSheet(); }
    return;
  }
  if(ev.key!=="Enter") return;
  if(!(window.matchMedia&&window.matchMedia("(hover: hover)").matches)) return;
  var tag=ev.target.tagName;
  if(tag==="INPUT"||tag==="TEXTAREA"||tag==="SELECT"||tag==="BUTTON"||tag==="A"||ev.target.isContentEditable) return;
  if(document.getElementById("closeoutScrim").classList.contains("on")) return;
  if(introEl.classList.contains("on")) return;
  if(!document.getElementById("reviewSection").hidden) return;
  if(cats.querySelector(".picker:not([hidden])")||cats.querySelector(".catdelete:not([hidden])")) return;
  ev.preventDefault();
  var dayIdx=defaultAddDay();
  var times=defaultEntryTimes(iso(weekDates()[dayIdx]));
  openSheet(dayIdx,times.start,times.end,null);
});

/* ---------------- grid interaction ---------------- */
var dragging=null, gridbody=document.getElementById("gridbody");
gridbody.addEventListener("mousedown",function(ev){
  var slot=ev.target.closest(".slot"); if(!slot) return;
  dragging={day:+slot.dataset.day,from:+slot.dataset.min,to:+slot.dataset.min}; paint(); ev.preventDefault();
});
gridbody.addEventListener("mouseover",function(ev){
  if(!dragging) return;
  var slot=ev.target.closest(".slot"); if(!slot||+slot.dataset.day!==dragging.day) return;
  dragging.to=+slot.dataset.min; paint();
});
document.addEventListener("mouseup",function(){
  if(!dragging) return;
  var a=Math.min(dragging.from,dragging.to), b=Math.max(dragging.from,dragging.to)+30, d=dragging.day;
  dragging=null; clearPaint(); openSheet(d,a,b,null);
});
function paint(){
  clearPaint(); if(!dragging) return;
  var a=Math.min(dragging.from,dragging.to), b=Math.max(dragging.from,dragging.to);
  var col=gridbody.querySelector('.day[data-day="'+dragging.day+'"]'); if(!col) return;
  [].forEach.call(col.querySelectorAll(".slot"),function(s){
    var m=+s.dataset.min; if(m>=a&&m<=b) s.classList.add("marked");
  });
}
function clearPaint(){ [].forEach.call(gridbody.querySelectorAll(".marked"),function(s){ s.classList.remove("marked"); }); }

gridbody.addEventListener("click",function(ev){
  var en=ev.target.closest(".entry"); if(!en) return;
  var f=findEntry(en.dataset.id); if(!f) return;
  var di=weekDates().map(iso).indexOf(f.date);
  openSheet(di<0?0:di,f.e.start,f.e.end,f.e.id);
});
/* touch is trickier than mouse: a finger moving down the grid could mean
   "scroll the page" or "drag-select a range", and there's no way to tell
   which until it happens. Convention used here (same as most mobile
   calendar apps): a quick tap opens a single slot, a normal swipe just
   scrolls the page like anywhere else, and holding still for ~350ms before
   moving is what commits to a drag-select — only then do we take over the
   gesture and stop the page scrolling under it. */
var touchStart=null, touchDragTimer=null, touchXY=null, autoScrollDir=0, autoScrollRAF=null;
var EDGE_ZONE=60, EDGE_SPEED=14;
function extendDragTo(x,y){
  var el=document.elementFromPoint(x,y);
  var slot=el&&el.closest&&el.closest(".slot");
  if(slot&&+slot.dataset.day===dragging.day){ dragging.to=+slot.dataset.min; paint(); }
}
/* while dragging, holding near the top/bottom edge of the screen scrolls the
   page so a range can extend past what's currently visible — touchmove only
   fires when the finger actually moves, so this runs on its own fixed-rate
   timer to keep scrolling (and keep extending the selection) while the
   finger sits still at the edge */
function autoScrollTick(){
  if(!dragging||!autoScrollDir){ clearInterval(autoScrollRAF); autoScrollRAF=null; return; }
  window.scrollBy(0,autoScrollDir*EDGE_SPEED);
  if(touchXY) extendDragTo(touchXY.x,touchXY.y);
}
gridbody.addEventListener("touchstart",function(ev){
  var slot=ev.target.closest(".slot"); if(!slot) return;
  var t=ev.touches[0];
  touchStart={x:t.clientX,y:t.clientY};
  var day=+slot.dataset.day, min=+slot.dataset.min;
  clearTimeout(touchDragTimer);
  touchDragTimer=setTimeout(function(){
    dragging={day:day,from:min,to:min};
    paint();
  },350);
},{passive:true});
gridbody.addEventListener("touchmove",function(ev){
  if(!touchStart) return;
  var t=ev.touches[0];
  if(!dragging){
    var movedFar=Math.abs(t.clientX-touchStart.x)>10||Math.abs(t.clientY-touchStart.y)>10;
    if(movedFar) clearTimeout(touchDragTimer); /* this is a scroll — let it scroll */
    return;
  }
  ev.preventDefault(); /* a drag has committed — take over from here */
  touchXY={x:t.clientX,y:t.clientY};
  autoScrollDir=t.clientY<EDGE_ZONE?-1:(t.clientY>window.innerHeight-EDGE_ZONE?1:0);
  if(autoScrollDir&&!autoScrollRAF) autoScrollRAF=setInterval(autoScrollTick,16);
  else if(!autoScrollDir&&autoScrollRAF){ clearInterval(autoScrollRAF); autoScrollRAF=null; }
  extendDragTo(t.clientX,t.clientY);
},{passive:false});
gridbody.addEventListener("touchend",function(ev){
  clearTimeout(touchDragTimer);
  autoScrollDir=0; touchXY=null; clearInterval(autoScrollRAF); autoScrollRAF=null;
  if(dragging){
    var a=Math.min(dragging.from,dragging.to), b=Math.max(dragging.from,dragging.to)+30, d=dragging.day;
    dragging=null; clearPaint(); touchStart=null;
    openSheet(d,a,b,null); ev.preventDefault();
    return;
  }
  var slot=ev.target.closest(".slot"); if(!slot||!touchStart){ touchStart=null; return; }
  var t=ev.changedTouches[0];
  var moved=Math.abs(t.clientX-touchStart.x)>10||Math.abs(t.clientY-touchStart.y)>10;
  touchStart=null;
  if(moved) return;
  openSheet(+slot.dataset.day,+slot.dataset.min,+slot.dataset.min+30,null); ev.preventDefault();
},{passive:false});

/* ---------------- rail ---------------- */
document.getElementById("totals").addEventListener("click",function(ev){
  var b=ev.target.closest(".verdict button"); if(!b) return;
  var c=catById(b.parentNode.dataset.cat); if(!c) return;
  var thisWeek=iso(weekStart);
  snapshot(c.name+" verdict");
  setVerdict(c.id,thisWeek,getVerdict(c.id,thisWeek)===b.dataset.v?null:b.dataset.v);
  persist(); renderTotals();
});

var cats=document.getElementById("cats");
var nameTimer=null;

/* typing a name must NOT rebuild the panel — that was what stole focus */
cats.addEventListener("input",function(ev){
  var row=ev.target.closest(".cat"); if(!row) return;
  var c=catById(row.dataset.cat); if(!c) return;
  if(ev.target.classList.contains("nm")){
    c.name=ev.target.value;
    bumpCategory(c);
    clearTimeout(nameTimer);
    nameTimer=setTimeout(function(){ persist(); renderTotals(); },400);
  }
  if(ev.target.classList.contains("hue")){
    /* preserves the box's current s/v instead of resetting them - the old
       hslHex(h) call here silently discarded whatever s/l a custom pick
       had, every time the hue strip moved; see the HSV comment above
       hsvOf() for why this reads back through HSV, not HSL */
    var hsv=hsvOf(c.color);
    c.color=hsvToHex(+ev.target.value,hsv[1],hsv[2]);
    bumpCategory(c);
    row.querySelector(".sw").style.background=c.color;
    row.querySelector(".spectrum").style.setProperty("--h",ev.target.value);
    recolorEntries();
    clearTimeout(nameTimer);
    nameTimer=setTimeout(function(){ persist(); renderTotals(); },250);
  }
});
/* "change" (not "input") fires once, on release - the same "commit only
   the final value, not every drag frame" rule the spectrum box's pointerup
   follows, so rotating the hue strip counts as a custom pick for recent
   colours exactly like a box drag does, and doesn't spam the list with
   every intermediate hue the strip passed through en route. */
cats.addEventListener("change",function(ev){
  if(!ev.target.classList.contains("hue")) return;
  var row=ev.target.closest(".cat"); if(!row) return;
  var c=catById(row.dataset.cat); if(!c) return;
  pushRecentColor(c.color);
  refreshRecentsRow(row);
});

/* keeps every piece of the open picker (swatch, box gradient + dot, hue
   strip) in sync with whatever the category's color actually is right now
   - called after any interaction that can change c.color, so there's one
   place that has to remember all four spots instead of four call sites
   each remembering to update the others */
/* last genuinely chromatic hue seen per category, this page session only -
   NOT state, NOT localStorage, NOT synced. Exists because a hue is not
   recoverable from an achromatic hex once one gets saved (S=0 or V=0
   collapses hsvToHex's output to r=g=b, and hsvOf/hslOf can only report
   h=0 for that, correctly - there really isn't a hue left to report) -
   see dragHue below for the within-one-gesture half of this; this is the
   across-separate-gestures half, for exactly the case dragHue can't cover:
   a drag that STARTS after a previous drag already committed an achromatic
   color, with nothing but that saved hex left to read from otherwise.
   Deliberately kept out of state: categories sync via Drive, and anything
   added to state.categories[i] inherits this file's full CRDT merge
   discipline (updatedAt/updatedBy, tombstones, mergeRecords' six cases -
   see SYNC-LESSONS.md) - disproportionate for a picker cosmetic that isn't
   real user data. Accepted, disclosed gap: a category already saved
   achromatic from a PAST session, touched for the first time this session
   by dragging straight to another achromatic point with no chromatic step
   in between, has nothing here to fall back to either - the hex genuinely
   carries no hue by that point, and there's nowhere left to recover one
   from short of the synced field this is deliberately not becoming. */
var lastRealHue={};
function syncPickerUI(row,hex){
  var hsv=hsvOf(hex);
  row.querySelector(".sw").style.background=hex;
  var box=row.querySelector(".spectrum");
  var dot=box.querySelector(".dot");
  /* an achromatic hex (S=0 or V=0) has no recoverable hue - hsvOf reports
     0 (red) for it, correctly (there genuinely isn't one to report), but
     writing that into the hue strip/box gradient here would jerk them to
     red just because the box is passing through black or grey, not
     because anything touched the hue strip. Skipping the hue-dependent
     writes leaves them exactly where the last genuinely chromatic frame
     put them - holds the last real position, same fix direction as
     dragHue below, applied to the display half of this bug. The dot IS
     still updated unconditionally: S and V are both perfectly well-defined
     at 0 - that's a real position, not an undefined one, unlike hue.
     Stashing into lastRealHue here too, on the same condition, is what
     makes it "kept fresh by literally every interaction that ever
     produces a real hue" rather than only at drag boundaries. */
  if(hsv[1]>0&&hsv[2]>0){
    row.querySelector(".hue").value=hsv[0];
    box.style.setProperty("--h",hsv[0]);
    lastRealHue[row.dataset.cat]=hsv[0];
  }
  dot.style.left=(hsv[1]*100)+"%";
  dot.style.top=((1-hsv[2])*100)+"%";
}
/* rebuilds just the recents row in place, not the whole picker via
   renderCats() - a fresh custom pick should show up in "recently used"
   right away (not just next time the panel happens to reopen), but a full
   renderCats() would close the panel the user is mid-drag in, same reason
   the preset-tap handler avoids it. Creates the row if this is the first
   recent color a session has ever had (the initial render skips it
   entirely when the list is empty). */
function refreshRecentsRow(row){
  var picker=row.querySelector(".picker");
  var recents=state.settings.recentColors||[];
  var el=picker.querySelector(".recents");
  if(!recents.length){ if(el) el.remove(); return; }
  var html=recents.map(function(s){ return '<button data-hex="'+s+'" style="background:'+s+'" aria-label="Use '+s+'"></button>'; }).join("");
  if(el){ el.innerHTML=html; return; }
  el=document.createElement("div");
  el.className="recents";
  el.innerHTML=html;
  picker.querySelector(".hue").insertAdjacentElement("afterend",el);
}

cats.addEventListener("click",function(ev){
  var row=ev.target.closest(".cat"); if(!row) return;
  var c=catById(row.dataset.cat); if(!c) return;

  if(ev.target.classList.contains("sw")){
    var open=row.querySelector(".picker");
    var wasHidden=open.hidden;
    [].forEach.call(cats.querySelectorAll(".picker"),function(p){ p.hidden=true; });
    open.hidden=!wasHidden;
    return;
  }
  var pre=ev.target.closest(".presets button");
  if(pre){
    c.color=pre.dataset.hex;
    bumpCategory(c);
    syncPickerUI(row,c.color);
    /* NOT renderCats() - rebuilding #cats would close the just-opened
       picker (fresh markup starts every .picker hidden), same reason the
       name-input handler above avoids it. The recents row (unaffected by
       a preset tap anyway, since presets never join recents) picks up any
       stale ordering next time the panel is naturally reopened. */
    recolorEntries(); persist(); renderTotals();
    return;
  }
  var rec=ev.target.closest(".recents button");
  if(rec){
    c.color=rec.dataset.hex;
    bumpCategory(c);
    pushRecentColor(c.color);
    syncPickerUI(row,c.color);
    refreshRecentsRow(row);
    recolorEntries(); persist(); renderTotals();
    return;
  }
  if(ev.target.classList.contains("del")){
    var n=countCategoryEntries(c.id);
    if(!n){ doDeleteCategory(c,null); return; }
    openCategoryDeleteChooser(row,c,n);
    return;
  }
  if(ev.target.classList.contains("catdelete-confirm")){
    doDeleteCategory(c,row.querySelector(".catdelete-target").value||null);
    return;
  }
  if(ev.target.classList.contains("catdelete-cancel")){
    row.querySelector(".catdelete").hidden=true;
    return;
  }
});

/* ---------------- spectrum box drag ---------------- */
/* Pointer Events (not the touch/mouse split the grid's own drag uses below)
   - this is new interaction logic with no existing gesture code to share
   (the grid's drag is a day/time-slot hold-then-commit, a different
   coordinate space entirely - see CLAUDE.md's note on this). setPointerCapture
   means .spectrum keeps receiving pointermove/pointerup for this pointer
   even if it leaves the box mid-drag, so a fast drag to the box's edge
   doesn't lose the gesture. touch-action:none on .spectrum (styles.css)
   is what stops the page from also trying to scroll/zoom a touch that
   started here - a plain CSS declaration, not a manual touchmove
   preventDefault(), because unlike the gridscroll bug in backlog item 10,
   .spectrum has no overflow/scroll of its own to accidentally become a
   competing scroll container; there's nothing here for touch-action:none
   to fight. */
var dragBox=null, dragHue=0, pickTimer=null;
function spectrumPointAt(box,ev){
  var r=box.getBoundingClientRect();
  var x=Math.min(Math.max((ev.clientX-r.left)/r.width,0),1);
  var y=Math.min(Math.max((ev.clientY-r.top)/r.height,0),1);
  return [x,1-y]; // [saturation, value] - value is inverted since y=0 is the box's top (brightest)
}
/* captures the hue ONCE, before a drag can ever touch an achromatic point -
   see applyBoxPoint below for why re-deriving it mid-drag was the actual
   bug. Split out from the pointerdown listener (not just inlined there) so
   a test can call the exact same capture step a real drag does.
   Trusts c.color's own hue only when c.color is CURRENTLY chromatic - a
   drag starting right after a previous one committed an achromatic color
   hits the identical "no recoverable hue" problem dragHue alone doesn't
   cover, since it only protects the inside of one gesture, not the start
   of the next one. Falls back to lastRealHue (see its own comment above)
   for exactly that case; 0 only if this category has never had a real hue
   observed this session either - an accepted, disclosed gap, not a fix
   left half-done. */
function beginSpectrumDrag(row){
  var c=row&&catById(row.dataset.cat); if(!c){ dragHue=0; return; }
  var hsv=hsvOf(c.color);
  dragHue=(hsv[1]>0&&hsv[2]>0)?hsv[0]:(lastRealHue[row.dataset.cat]!==undefined?lastRealHue[row.dataset.cat]:0);
}
/* the real per-frame state mutation, decoupled from spectrumPointAt's
   getBoundingClientRect so it's directly testable with a hand-picked [s,v]
   pair - this sandbox's iframe is display:none, which zeroes every
   element's layout rect (see the modal-scroll-lock note elsewhere in this
   file), so geometry-dependent input can't be exercised here, but the
   actual colour math can be, and that's what the achromatic-hue bug lived
   in, not the geometry.
   USES dragHue, NOT hsvOf(c.color)[0] - that was the bug. c.color's own
   hue is not recoverable once a drag frame lands on S=0 or V=0: hsvToHex
   collapses to an achromatic hex there (v*s=0 zeroes chroma regardless of
   h), and hsvOf/hslOf's hue math can only report h=0 for any achromatic
   RGB (r=g=b) - correct math, since an achromatic colour genuinely has no
   hue, but re-reading it as the source of truth for the NEXT frame meant
   one drag frame landing on black or grey silently snapped every
   following frame in that same gesture to red, corrupting c.color itself,
   not just a display value - a real hue never held past that point,
   confirmed by tracing rather than assumed. dragHue is captured once at
   drag-start (beginSpectrumDrag, called from pointerdown below) and reused
   for the whole gesture instead, so it can't be knocked out by anything
   the drag itself produces. */
function applyBoxPoint(row,sv,commit){
  var c=catById(row.dataset.cat); if(!c) return;
  c.color=hsvToHex(dragHue,sv[0],sv[1]);
  bumpCategory(c);
  syncPickerUI(row,c.color);
  recolorEntries();
  clearTimeout(pickTimer);
  if(commit){
    pushRecentColor(c.color);
    refreshRecentsRow(row);
    persist(); renderTotals();
  }else{
    pickTimer=setTimeout(function(){ persist(); renderTotals(); },250);
  }
}
function applyBoxDrag(box,ev,commit){
  var row=box.closest(".cat"); if(!row) return;
  applyBoxPoint(row,spectrumPointAt(box,ev),commit);
}
cats.addEventListener("pointerdown",function(ev){
  var box=ev.target.closest(".spectrum"); if(!box) return;
  ev.preventDefault();
  box.setPointerCapture(ev.pointerId);
  dragBox=box;
  beginSpectrumDrag(box.closest(".cat"));
  applyBoxDrag(box,ev,false);
});
cats.addEventListener("pointermove",function(ev){
  if(!dragBox) return;
  applyBoxDrag(dragBox,ev,false);
});
function endBoxDrag(ev){
  if(!dragBox) return;
  applyBoxDrag(dragBox,ev,true);
  dragBox=null;
}
cats.addEventListener("pointerup",endBoxDrag);
cats.addEventListener("pointercancel",endBoxDrag);

/* Dragging inside the box and releasing outside the row must not close the
   picker - the same shape as item 5's sheet-drag fix and the scrim's own
   wireOutsideClose (see app.js's other scrims), applied here to the
   document-level "click outside .cat closes every open picker" listener
   below, which - unlike wireOutsideClose's single scrim element - has no
   one fixed boundary element to check ev.target against, so this tracks
   where the PRESS started instead: a drag that starts inside .cat and
   resolves (via the browser's own mousedown/mouseup-common-ancestor rule)
   to a click target outside .cat must still not close the picker. */
var catPressedInside=false;
document.addEventListener("mousedown",function(ev){ catPressedInside=!!ev.target.closest(".cat"); });
document.addEventListener("click",function(ev){
  if(catPressedInside||ev.target.closest(".cat")){ catPressedInside=false; return; }
  catPressedInside=false;
  [].forEach.call(cats.querySelectorAll(".picker"),function(p){ p.hidden=true; });
  [].forEach.call(cats.querySelectorAll(".catdelete"),function(p){ p.hidden=true; });
});

document.getElementById("addCat").addEventListener("click",function(){
  var c={id:uid(),name:"",color:SWATCHES[state.categories.length%SWATCHES.length]};
  bumpCategory(c);
  state.categories.push(c);
  persist(); renderCats(); renderTotals();
  var last=cats.querySelector(".cat:last-child .nm");
  if(last){ last.placeholder="Name it…"; last.focus(); }
});

/* category name/colour edits are debounced (see nameTimer above) so typing
   doesn't spam persist(); flush any pending one immediately if the page is
   about to go away, so a fast tab-close can't drop the last edit */
function flushPendingCatEdit(){
  if(nameTimer){ clearTimeout(nameTimer); nameTimer=null; persist(); }
}
window.addEventListener("beforeunload",flushPendingCatEdit);
document.addEventListener("visibilitychange",function(){ if(document.hidden) flushPendingCatEdit(); });

/* ---------------- nav & tools ---------------- */
function goto(d){ weekStart=d; renderGrid(); renderTotals(); }
document.getElementById("prev").addEventListener("click",function(){ goto(addDays(weekStart,-7)); });
document.getElementById("next").addEventListener("click",function(){ goto(addDays(weekStart,7)); });
document.getElementById("thisweek").addEventListener("click",function(){ goto(mondayOf(new Date())); });
document.getElementById("anchor").addEventListener("change",function(){ if(this.value) goto(mondayOf(parseIso(this.value))); });

/* ---------------- weekly review ---------------- */
var REVIEW_WEEKS=4;
var reviewAnchor=mondayOf(new Date()); /* Monday of the most recent (rightmost) week shown */
function fmtShort(d){ return d.getDate()+" "+MONTHS[d.getMonth()]; }
/* the verdict shown for a category across several weeks is whichever
   verdict was set on the most weeks; a tie shows all tied verdicts
   (e.g. "keep/cut"); weeks with no verdict set don't count as a vote;
   empty if no visible week has one set at all */
function majorityVerdict(catId,cols){
  var counts={};
  cols.forEach(function(ws){
    var v=getVerdict(catId,iso(ws));
    if(v) counts[v]=(counts[v]||0)+1;
  });
  var order=["increase","keep","cut"];
  var present=order.filter(function(k){ return counts[k]; });
  if(!present.length) return "";
  var max=Math.max.apply(null,present.map(function(k){ return counts[k]; }));
  return order.filter(function(k){ return counts[k]===max; }).join("/");
}
function reviewCell(minutes,denom){
  var pct=denom?Math.round(minutes/denom*100):0;
  return "<td><div class=\"cell-h\">"+dur(minutes)+"</div>"+(minutes>0?"<div class=\"cell-pct\">"+pct+"%</div>":"")+"</td>";
}
function renderReview(){
  var cols=[];
  for(var i=REVIEW_WEEKS-1;i>=0;i--) cols.push(addDays(reviewAnchor,-7*i));
  var totals=cols.map(function(ws){ return weekTotals(ws); });
  /* categories can overlap each other, so their raw hours can add up to
     more than the week's actual logged time - percentages use whichever
     is bigger as the base, so an overlap-heavy week still reads sensibly
     instead of quietly exceeding 100% */
  totals.forEach(function(r){
    var rawSum=r.none;
    Object.keys(r.t).forEach(function(k){ rawSum+=r.t[k]; });
    r.rawSum=rawSum;
    r.denom=Math.max(r.logged,rawSum);
  });

  document.getElementById("reviewRange").textContent=
    fmtShort(cols[0])+" – "+fmtShort(addDays(cols[cols.length-1],6));

  var head="<tr><th>Category</th>"+cols.map(function(ws){
    var wk=iso(ws), closeable=wk<iso(mondayOf(new Date())), closed=!!state.weekCloseouts[wk];
    return "<th"+(closeable?' class="review-closeable" data-week="'+wk+'"':"")+">"+
      fmtShort(ws)+"&ndash;"+fmtShort(addDays(ws,6))+
      (closed?' <span class="closeout-mark" title="Closed out">&check;</span>':"")+"</th>";
  }).join("")+"<th>Verdict</th></tr>";

  var rows=state.categories.map(function(c){
    var cells=totals.map(function(r){ return reviewCell(r.t[c.id]||0,r.denom); }).join("");
    var vt=majorityVerdict(c.id,cols);
    return "<tr><td><span class=\"cat-cell\"><span class=\"dot\" style=\"background:"+c.color+"\"></span>"+escapeHtml(c.name)+"</span></td>"+
      cells+"<td class=\"verdict-tag"+(vt.indexOf("cut")>-1?" cut":"")+"\">"+vt+"</td></tr>";
  }).join("");

  if(totals.some(function(r){ return r.none>0; })){
    rows+="<tr><td>No category</td>"+totals.map(function(r){ return reviewCell(r.none,r.denom); }).join("")+"<td></td></tr>";
  }
  rows+="<tr class=\"review-unlogged\"><td>Unlogged</td>"+totals.map(function(r){
    return "<td>"+dur(Math.max(10080-r.logged,0))+"</td>";
  }).join("")+"<td></td></tr>";
  rows+="<tr class=\"review-multitask\"><td>Multi tasking</td>"+totals.map(function(r){
    return "<td>"+dur(r.rawSum-r.logged)+"</td>";
  }).join("")+"<td></td></tr>";

  document.getElementById("reviewTable").innerHTML="<thead>"+head+"</thead><tbody>"+rows+"</tbody>";
}
/* grid-only controls: anything meant to only appear over the main log,
   not Review. The FAB is position:fixed and sits outside weeknav/gauge/
   cols/reviewSection in the DOM, so it needs its own line here rather
   than being caught by any of those - checked at the time this was added
   and it's the only position:fixed control with that gap (toast and the
   scrims already gate their own visibility independently of Review). */
document.getElementById("reviewToggle").addEventListener("click",function(){
  document.getElementById("weeknav").hidden=true;
  document.getElementById("gauge").hidden=true;
  document.getElementById("cols").hidden=true;
  document.getElementById("fab").hidden=true;
  document.getElementById("reviewSection").hidden=false;
  reviewAnchor=mondayOf(new Date());
  renderReview();
});
document.getElementById("reviewClose").addEventListener("click",function(){
  document.getElementById("reviewSection").hidden=true;
  document.getElementById("weeknav").hidden=false;
  document.getElementById("gauge").hidden=false;
  document.getElementById("cols").hidden=false;
  document.getElementById("fab").hidden=false;
});

/* the logo returning to "the main page" in a single-page app means a home
   reset: back out of Review if it's open, drop out of Day view, close
   whatever sheet is open, and jump to the current week - the same "start
   from scratch" state a fresh load would show */
function goHome(){
  if(!document.getElementById("reviewSection").hidden) document.getElementById("reviewClose").click();
  if(scrim.classList.contains("on")) closeSheet();
  viewMode="week";
  weekStart=mondayOf(new Date());
  focusDay=(new Date().getDay()+6)%7;
  renderGrid(); renderTotals();
}
document.querySelector(".wordmark").addEventListener("click",goHome);
document.getElementById("reviewPrev").addEventListener("click",function(){
  reviewAnchor=addDays(reviewAnchor,-7*REVIEW_WEEKS); renderReview();
});
document.getElementById("reviewNext").addEventListener("click",function(){
  reviewAnchor=addDays(reviewAnchor,7*REVIEW_WEEKS); renderReview();
});

/* ---------------- weekly close-out ---------------- */
/* the ritual can only ever look at a week that has fully finished - never
   the one currently in progress, so "closing out" always means looking
   back at a complete week, not judging one that's still half-logged */
function lastCompleteWeekStart(){ return addDays(mondayOf(new Date()),-7); }
function weekHasEntries(ws){
  var days=[]; for(var i=0;i<7;i++) days.push(addDays(ws,i));
  return days.some(function(d){ return entriesFor(iso(d)).length>0; });
}
var closeoutWeek=null; /* Monday of the week currently open in the sheet, or null */
function openCloseout(ws){
  if(iso(ws)>=iso(mondayOf(new Date()))){
    showToast("Only a fully finished week can be closed out",false);
    return;
  }
  hideToast();
  closeoutWeek=ws;
  document.getElementById("closeoutRange").textContent=fmtShort(ws)+"–"+fmtShort(addDays(ws,6));
  renderCloseoutTotals();
  renderCloseoutGaps();
  var existing=state.weekCloseouts[iso(ws)];
  document.getElementById("closeoutNote").value=existing?existing.note:"";
  /* same reasoning as openSheet()'s identical reset above - content length
     varies by week (totals rows, unlogged-gap rows), and nothing else here
     resets this sheet's leftover scroll position from whichever week was
     open last. */
  document.getElementById("closeoutScrim").querySelector(".sheet").scrollTop=0;
  document.getElementById("closeoutScrim").classList.add("on");
  lockBodyScroll();
}
function closeCloseoutSheet(){ document.getElementById("closeoutScrim").classList.remove("on"); closeoutWeek=null; unlockBodyScroll(); }
wireOutsideClose(document.getElementById("closeoutScrim"),closeCloseoutSheet);
wireScrimTouchBlock(document.getElementById("closeoutScrim"));

function renderCloseoutTotals(){
  var wk=iso(closeoutWeek);
  var r=weekTotals(closeoutWeek), max=r.none;
  state.categories.forEach(function(c){ max=Math.max(max,r.t[c.id]||0); });
  var rows=state.categories.slice().sort(function(a,b){ return (r.t[b.id]||0)-(r.t[a.id]||0); }).map(function(c){
    var m=r.t[c.id]||0; if(!m) return "";
    var pct=max?Math.round(m/max*100):0, v=getVerdict(c.id,wk);
    return '<div class="tot"><div class="tot-top"><span class="dot" style="background:'+c.color+'"></span>'+
      escapeHtml(c.name)+'<span class="h">'+dur(m)+'</span></div>'+
      '<div class="tot-bar"><i style="width:'+pct+"%;background:"+c.color+'"></i></div>'+
      '<div class="verdict" data-cat="'+c.id+'">'+["increase","keep","cut"].map(function(dv){
        return '<button data-v="'+dv+'" aria-pressed="'+(v===dv)+'">'+dv+"</button>";
      }).join("")+"</div></div>";
  }).join("");
  document.getElementById("closeoutTotals").innerHTML=rows||'<p class="emptyhint">Nothing logged this week.</p>';
}
document.getElementById("closeoutTotals").addEventListener("click",function(ev){
  var b=ev.target.closest(".verdict button"); if(!b||!closeoutWeek) return;
  var catId=b.closest(".verdict").dataset.cat, wk=iso(closeoutWeek);
  var cur=getVerdict(catId,wk), v=b.dataset.v;
  var cat=catById(catId);
  snapshot((cat?cat.name:"category")+" verdict");
  setVerdict(catId,wk,cur===v?null:v);
  persist();
  renderCloseoutTotals();
});
function renderCloseoutGaps(){
  var days=[]; for(var i=0;i<7;i++) days.push(addDays(closeoutWeek,i));
  var rows="";
  days.forEach(function(d,di){
    dayGaps(iso(d)).forEach(function(g){
      if(g.end-g.start<30) return; /* skip slivers under half an hour - noise, not signal */
      rows+='<div class="gap-row"><b>'+DAYNAMES[di]+'</b> '+dur(g.end-g.start)+" unlogged, "+toHM(g.start)+"–"+toHM(g.end)+"</div>";
    });
  });
  document.getElementById("closeoutGaps").innerHTML=rows||'<div class="gap-row">Nothing unlogged this week.</div>';
}
document.getElementById("closeoutSave").addEventListener("click",function(){
  if(!closeoutWeek) return;
  var wk=iso(closeoutWeek), range=fmtShort(closeoutWeek)+"–"+fmtShort(addDays(closeoutWeek,6));
  state.weekCloseouts[wk]={note:document.getElementById("closeoutNote").value.trim(),closedAt:new Date().toISOString()};
  persist();
  closeCloseoutSheet();
  updateCloseoutAvailability();
  showToast("Closed out "+range,false);
});
document.getElementById("closeoutCancel").addEventListener("click",closeCloseoutSheet);
document.getElementById("closeoutBtn").addEventListener("click",function(){ openCloseout(lastCompleteWeekStart()); });
document.getElementById("closeoutBannerBtn").addEventListener("click",function(){ openCloseout(lastCompleteWeekStart()); });

/* the button stays available all week once last week has anything logged;
   the banner is louder and only earns its place on Monday, then gets out
   of the way for the rest of the week regardless of whether it was used */
function updateCloseoutAvailability(){
  var lw=lastCompleteWeekStart(), hasData=weekHasEntries(lw), closed=!!state.weekCloseouts[iso(lw)];
  /* closeoutBtn used to only check hasData, so it stayed visible forever
     once a week was already closed out - the banner right below it already
     had the closed check right; this just brings the button in line with it. */
  document.getElementById("closeoutBtn").hidden=!(hasData&&!closed);
  document.getElementById("closeoutBanner").hidden=!(new Date().getDay()===1&&hasData&&!closed);
}
document.getElementById("reviewTable").addEventListener("click",function(ev){
  var th=ev.target.closest(".review-closeable"); if(!th) return;
  openCloseout(parseIso(th.dataset.week));
});

/* which day "Add entry" should default to: the focused day in day view,
   today if the displayed week is the current one, else Monday */
function defaultAddDay(){
  if(viewMode==="day") return focusDay;
  var today=new Date();
  if(iso(mondayOf(today))===iso(weekStart)) return (today.getDay()+6)%7;
  return 0;
}
/* shared by "Add entry" and "Log now": continues from the day's last entry
   if there is one; on today specifically, also anchors the end (and, with
   no entries yet, the start) to the real current time instead of a flat
   60-minute block - otherwise a gap since your last entry silently isn't
   accounted for until you notice and fix the end time by hand. last is
   clamped to 23:30 so a day whose last entry runs to exactly midnight can't
   produce a zero-length next block. */
function defaultEntryTimes(dateStr){
  var entries=entriesFor(dateStr);
  var lastRaw=entries.length?Math.max.apply(null,entries.map(function(e){ return e.end; })):null;
  var last=(lastRaw!==null)?Math.min(lastRaw,23*60+30):null;
  var start,end;
  if(dateStr===iso(new Date())){
    var now=new Date();
    var mins=Math.min(Math.round((now.getHours()*60+now.getMinutes())/5)*5,1439);
    start=(last!==null)?last:Math.max(mins-30,0);
    end=(mins>start)?mins:start+30;
  }else{
    start=(last!==null)?last:9*60;
    end=Math.min(start+60,1440);
  }
  return {start:start,end:end};
}
document.getElementById("addBtn").addEventListener("click",function(){
  var dayIdx=defaultAddDay();
  var t=defaultEntryTimes(iso(weekDates()[dayIdx]));
  openSheet(dayIdx,t.start,t.end,null);
});
document.getElementById("range").addEventListener("click",function(){
  var s=state.settings;
  if(s.startHour===0&&s.endHour===24){ s.startHour=6; s.endHour=24; } else { s.startHour=0; s.endHour=24; }
  persist(); renderGrid();
});
document.getElementById("print").addEventListener("click",function(){ window.print(); });
document.getElementById("clear").addEventListener("click",function(){
  var days=weekDates(), n=0, mins=0;
  days.forEach(function(d){
    entriesFor(iso(d)).forEach(function(e){ n++; mins+=e.end-e.start; });
  });
  if(!n){ showToast("This week is already empty",false); return; }
  var span=days[0].getDate()+" "+MONTHS[days[0].getMonth()]+" – "+days[6].getDate()+" "+MONTHS[days[6].getMonth()];
  var ok=confirm("Delete "+n+" "+(n===1?"entry":"entries")+" ("+dur(mins)+" logged) from "+span+"?\n\n"+
                 "Other weeks and your categories are untouched.\nYou can undo this with Ctrl/\u2318 + Z.");
  if(!ok) return;
  snapshot("clear week of "+span);
  /* goes through removeEntry (not a direct delete of the day's key) so this
     produces the same tombstones an explicit per-entry delete would - a
     device that synced any of these entries before the clear needs to see
     them actually removed, not just re-add them all right back */
  days.forEach(function(d){
    entriesFor(iso(d)).slice().forEach(function(e){ removeEntry(e.id); });
  });
  persist(); renderGrid(); renderTotals();
  showToast("Cleared "+n+" "+(n===1?"entry":"entries")+" from "+span,true);
});

document.getElementById("linkFile").addEventListener("click",function(){
  if(!window.showSaveFilePicker){
    alert("Keeping a file in sync needs a feature only desktop Chrome or Edge have (not a phone or tablet browser, even Chrome). Use Export a copy instead.");
    return;
  }
  (async function(){
    try{
      var h=await window.showSaveFilePicker({
        suggestedName:"hours-ledger.json",
        types:[{description:"Hours Ledger",accept:{"application/json":[".json"]}}]
      });
      fileHandle=h; fileName=h.name; idbSet("handle",h);
      writeLinkedFile(); refreshHint();
      document.getElementById("linkFile").textContent="File in sync";
    }catch(e){}
  })();
});

document.getElementById("connectDrive").addEventListener("click",connectDrive);
if(state.driveConnected) document.getElementById("connectDrive").textContent="Drive: synced";

/* reconnect on any real tap in the app, not a dedicated button - a token
   silently expiring shouldn't mean hunting for the right button before the
   app is usable again. pointerdown (not click): the grid's own touch
   handlers call preventDefault() on touchend in several places, which
   suppresses the synthetic click that would otherwise follow, so a
   click-based listener would silently never fire for a tap that lands on
   the grid itself - the single biggest tappable surface in the app.
   pointerdown fires before any of that and carries the same "real user
   gesture" weight browsers use to decide whether a popup is allowed to
   open. Capture phase so it runs regardless of what any other handler
   does with the event afterward. Excludes the connectDrive button itself,
   which already has its own explicit click handler - no need to also
   race it from here. */
document.addEventListener("pointerdown",function(ev){
  if(ev.target&&ev.target.closest&&ev.target.closest("#connectDrive")){
    console.log("[drive] pointerdown listener: tap was on #connectDrive itself, deferring to its own click handler");
    return;
  }
  if(!state.driveConnected||!driveNeedsReconnect||driveReconnectAttemptedThisSession||driveSyncInFlight){
    console.log("[drive] pointerdown listener: not acting - driveConnected="+state.driveConnected+" driveNeedsReconnect="+driveNeedsReconnect+" driveReconnectAttemptedThisSession="+driveReconnectAttemptedThisSession+" driveSyncInFlight="+driveSyncInFlight);
    return;
  }
  console.log("[drive] pointerdown listener: reconnecting from this tap");
  driveReconnectAttemptedThisSession=true;
  runDriveSync(true);
},true);

/* not gated by TEST_MODE, unlike __HL_TEST__ below - this is for reading
   live state from a real, connected browser's own console while debugging
   the reconnect flow, not for tests. Read-only: type __driveDebug__.state()
   in DevTools at any point to see exactly what the [drive] log lines are
   reasoning from, rather than inferring it from timing. */
window.__driveDebug__={
  state:function(){
    return {driveConnected:state.driveConnected,driveSyncInFlight:driveSyncInFlight,
      driveNeedsReconnect:driveNeedsReconnect,
      driveReconnectAttemptedThisSession:driveReconnectAttemptedThisSession,
      cachedTokenValid:!!getCachedToken(),
      buttonText:document.getElementById("connectDrive").textContent,
      buttonDisabled:document.getElementById("connectDrive").disabled};
  }
};

document.getElementById("save").addEventListener("click",function(){
  var blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});
  var a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="hours-ledger-"+iso(weekStart)+".json";
  a.click();
  setTimeout(function(){ URL.revokeObjectURL(a.href); },1000);
});
document.getElementById("load").addEventListener("click",function(){ document.getElementById("fileInput").click(); });
/* pulled out of the FileReader callback so it's directly callable (and
   directly testable, synchronously, with no FileReader involved at all) -
   the reading-a-real-file part is genuinely async and belongs to the
   event handler below; parsing and loading a backup once its text is in
   hand isn't, and gains nothing from being async too */
function importBackupJson(jsonText){
  var d=JSON.parse(jsonText);
  if(!d.categories||!d.entries) throw new Error("bad");
  var wasDriveConnected=state.driveConnected===true;
  snapshot("open a copy");
  state=d;
  if(!state.settings) state.settings={startHour:6,endHour:24};
  if(!state.weekCloseouts) state.weekCloseouts={};
  migrateVerdicts(state);
  migrateVerdictScale(state);
  migrateVerdictTombstoneCollisions(state);
  migrateRecentColors(state);
  /* an imported file never carries sync connection forward, even if it
     says driveConnected:true - reconnecting is one click, but silently
     resuming a background network sync right after opening an arbitrary
     file, with no chance to reconsider first, is not a call this app
     gets to make for the user */
  state.driveConnected=false;
  persist(); render(); refreshHint(); updateColophon();
  /* the flip above is otherwise invisible: entries keep saving locally,
     nothing on screen changes, and the Drive button - the one persistent,
     always-visible piece of UI that speaks to sync state - just sits on
     whatever it said before the import (often "Drive: synced", now a lie).
     That's the same shape as the silent-loss bug this whole feature
     already shipped a fix for (see BUG 2 above): local state looking
     completely normal while Drive quietly stops hearing about it. Only
     worth saying anything if there was a real connection to lose - a
     device that was never connected already shows the correct default. */
  if(wasDriveConnected) document.getElementById("connectDrive").textContent="Drive: disconnected after import — reconnect to resume";
}
document.getElementById("fileInput").addEventListener("change",function(){
  var f=this.files[0]; if(!f) return;
  var r=new FileReader();
  r.onload=function(){
    try{ importBackupJson(r.result); }
    catch(e){ alert("That file isn't an Hours Ledger backup."); }
  };
  r.readAsText(f); this.value="";
});

/* restore a linked file from a previous session */
idbGet("handle",function(h){
  if(!h) return;
  fileHandle=h; fileName=h.name||"your file";
  document.getElementById("linkFile").textContent="File in sync";
  refreshHint();
  setStatus("Linked to "+fileName);
});

/* ---------------- view mode & intro ---------------- */
document.getElementById("viewToggle").addEventListener("click",function(){
  viewMode=(viewMode==="day")?"week":"day";
  renderGrid();
});
document.getElementById("dayPrev").addEventListener("click",function(){
  focusDay--;
  if(focusDay<0){ focusDay=6; weekStart=addDays(weekStart,-7); renderTotals(); }
  renderGrid();
});
document.getElementById("dayNext").addEventListener("click",function(){
  focusDay++;
  if(focusDay>6){ focusDay=0; weekStart=addDays(weekStart,7); renderTotals(); }
  renderGrid();
});

/* quick-log: continues from wherever the day you're actually looking at left
   off. On today, that's a gap up to right now; a day already fully logged
   past the current moment (e.g. bedtime prep logged ahead of time) picks up
   right after its own last entry instead of snapping back to "now". Any
   other day (nothing to measure "now" against) just continues from its own
   last entry, same as "Add entry" would. */
document.getElementById("fab").addEventListener("click",function(){
  var dateStr=iso(weekDates()[focusDay]);
  var t=defaultEntryTimes(dateStr);
  openSheet(focusDay,t.start,t.end,null);
});

var SEEN="hours-ledger-seen";
var introEl=document.getElementById("intro");
/* intro's own content is fixed and short (a 3-item list, one paragraph, one
   button) - it never overflows .sheet's max-height in practice, so unlike
   openSheet()/openCloseout() there's no leftover-scrollTop state worth
   resetting here. It still gets the body scroll lock and the defensive
   touchmove block below: the scrim-background-leaks-to-the-page symptom
   doesn't depend on the sheet's content height, so it applies here too. */
function openIntro(){ hideToast(); introEl.classList.add("on"); lockBodyScroll(); }
function closeIntro(){ introEl.classList.remove("on"); writeStore(SEEN,"1"); unlockBodyScroll(); }
document.getElementById("introGo").addEventListener("click",closeIntro);
document.getElementById("howto").addEventListener("click",openIntro);
/* NOT wireOutsideClose - this is the pre-existing asymmetry recorded in
   CLAUDE.md as a deferred known gap (item 13's neighbour), not something
   this batch fixes. Left exactly as it was. */
introEl.addEventListener("click",function(ev){ if(ev.target===introEl) closeIntro(); });
wireScrimTouchBlock(introEl);
document.addEventListener("keydown",function(ev){ if(ev.key==="Escape"&&introEl.classList.contains("on")) closeIntro(); });
if(!readStore(SEEN)) openIntro();

/* file sync needs the File System Access API, which no mobile browser
   (not even mobile Chrome) implements - hide the dead-end button rather
   than let someone tap it just to be told it can't work here */
if(!window.showSaveFilePicker) document.getElementById("linkFile").hidden=true;

render();
setStatus("Saved "+clockNow());
/* BUG 2 fix: a debounced sync scheduled by persist() dies with the page if
   the tab closes or reloads before it fires - nothing before this line
   ever re-scheduled one on the next load, so whatever was saved in the
   last few seconds of a session could sit locally, correctly saved, and
   never reach Drive until some unrelated future edit happened to trigger
   another sync. A device that's already connected always gets a catch-up
   sync scheduled here, on every load - if nothing was actually missed
   this is a harmless no-op merge (case 2: identical content, nothing to
   decide); if something was missed, this is what actually sends it. */
if(state.driveConnected) scheduleDriveSync();

/* pre-warm the GIS script (just the JS library fetch - no account/network-
   auth interaction, nothing shown, same script this page already fetched
   unconditionally as part of the line above today) so that if a reconnect
   is ever needed later this session, the delegated pointerdown listener's
   call to requestAccessToken() can run synchronously off that real tap
   instead of behind an async script-load gap - which is what popup
   blockers actually key their "was this a real user gesture" check on. */
if(!TEST_MODE&&state.driveConnected) loadGisScript(function(){});

/* only present when opened as index.html?hltest=1 — see selftest.html.
   Exposes real functions so tests exercise actual app logic instead of a
   copy of it; storage is already isolated above via TEST_MODE. */
if(TEST_MODE){
  window.__HL_TEST__={
    putEntry:putEntry,
    putEntryWithBreaks:putEntryWithBreaks,
    entriesFor:entriesFor,
    findEntry:findEntry,
    removeEntry:removeEntry,
    weekTotals:weekTotals,
    unionMinutes:unionMinutes,
    getVerdict:getVerdict,
    setVerdict:setVerdict,
    migrateVerdicts:migrateVerdicts,
    migrateVerdictScale:migrateVerdictScale,
    migrateVerdictTombstoneCollisions:migrateVerdictTombstoneCollisions,
    sweepCompressVerdicts:sweepCompressVerdicts,
    snapshot:snapshot,
    undo:undo,
    redo:redo,
    iso:iso,
    addDays:addDays,
    mondayOf:mondayOf,
    parseIso:parseIso,
    getState:function(){ return state; },
    setState:function(s){ state=s; },
    setWeekStart:function(d){ weekStart=d; },
    getWeekStart:function(){ return weekStart; },
    setFocusDay:function(i){ focusDay=i; },
    getFocusDay:function(){ return focusDay; },
    dayGaps:dayGaps,
    lastCompleteWeekStart:lastCompleteWeekStart,
    weekHasEntries:weekHasEntries,
    openCloseout:openCloseout,
    updateCloseoutAvailability:updateCloseoutAvailability,
    catById:catById,
    nowIso:nowIso,
    hslToHex:hslToHex,
    hslOf:hslOf,
    hueOf:hueOf,
    hsvOf:hsvOf,
    hsvToHex:hsvToHex,
    pushRecentColor:pushRecentColor,
    beginSpectrumDrag:beginSpectrumDrag,
    applyBoxPoint:applyBoxPoint,
    getRecentColors:function(){ return state.settings.recentColors; },
    getSwatches:function(){ return SWATCHES; },
    getDeviceId:getDeviceId,
    setDeviceId:function(id){ writeStore(DEVICE_KEY,id); },
    migrateSyncFields:migrateSyncFields,
    flattenEntries:flattenEntries,
    unflattenEntries:unflattenEntries,
    flattenCategories:flattenCategories,
    unflattenCategories:unflattenCategories,
    flattenVerdicts:flattenVerdicts,
    unflattenVerdicts:unflattenVerdicts,
    flattenCloseouts:flattenCloseouts,
    unflattenCloseouts:unflattenCloseouts,
    mergeRecords:mergeRecords,
    normalizeName:normalizeName,
    dedupeCategoriesByName:dedupeCategoriesByName,
    syncEngine:syncEngine,
    fakeDriveRead:fakeDriveRead,
    fakeDriveWrite:fakeDriveWrite,
    fakeDriveReset:fakeDriveReset,
    getAccessToken:getAccessToken,
    driveFindFileId:driveFindFileId,
    driveReadFile:driveReadFile,
    driveWriteFile:driveWriteFile,
    connectDrive:connectDrive,
    runDriveSync:runDriveSync,
    scheduleDriveSync:scheduleDriveSync,
    reassignCategoryEntries:reassignCategoryEntries,
    isDriveSyncInFlight:function(){ return driveSyncInFlight; },
    setDriveNeedsReconnect:function(v){ driveNeedsReconnect=v; },
    getDriveNeedsReconnect:function(){ return driveNeedsReconnect; },
    setDriveReconnectAttempted:function(v){ driveReconnectAttemptedThisSession=v; },
    setTestHangToken:function(v){ TEST_MODE_HANG_TOKEN=v; },
    setTestLateSuccessMs:function(v){ TEST_MODE_LATE_SUCCESS_MS=v; },
    loadGisScript:loadGisScript,
    resolveTestGisScriptLoad:resolveTestGisScriptLoad,
    getGisScriptLoadCount:function(){ return TEST_MODE_GIS_LOAD_COUNT; },
    isGisScriptLoadPending:function(){ return gisScriptCallbacks!==null; },
    getLastDriveSyncErr:function(){ return lastDriveSyncErr?{message:lastDriveSyncErr.message,needsReconnect:!!lastDriveSyncErr.needsReconnect,dismissed:!!lastDriveSyncErr.dismissed,viaFocus:!!lastDriveSyncErr.viaFocus}:null; },
    getDriveReconnectAttempted:function(){ return driveReconnectAttemptedThisSession; },
    clearLocalStateForTest:function(){
      try{ localStorage.removeItem(KEY); }catch(e){}
      try{ localStorage.removeItem(DEVICE_KEY); }catch(e){}
      try{ localStorage.removeItem(UKEY); }catch(e){}
    },
    persist:persist,
    doDeleteCategory:doDeleteCategory,
    countCategoryEntries:countCategoryEntries,
    render:render,
    importBackupJson:importBackupJson,
    lockBodyScroll:lockBodyScroll,
    unlockBodyScroll:unlockBodyScroll,
    getBodyScrollLockCount:function(){ return bodyScrollLockCount; },
    getBodyScrollLockY:function(){ return bodyScrollLockY; }
  };
}
})();
