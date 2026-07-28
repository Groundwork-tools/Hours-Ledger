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
var KEY=TEST_MODE?"hours-ledger-selftest-v1":"hours-ledger-v1";
var SWATCHES=["#2B4C7E","#2F6B4F","#A8762A","#3E7F87","#6E4B7A","#B23A2F","#5A6570","#7A7B32"];
function uid(){ return Math.random().toString(36).slice(2,9); }

var DEFAULTS={
  version:2,
  settings:{startHour:6,endHour:24},
  categories:[
    {id:uid(),name:"Studies",color:"#2B4C7E",verdict:null},
    {id:uid(),name:"Work / income",color:"#2F6B4F",verdict:null},
    {id:uid(),name:"Side projects",color:"#A8762A",verdict:null},
    {id:uid(),name:"Training",color:"#3E7F87",verdict:null},
    {id:uid(),name:"People",color:"#6E4B7A",verdict:null},
    {id:uid(),name:"Admin & errands",color:"#5A6570",verdict:null},
    {id:uid(),name:"Sleep",color:"#7A7B32",verdict:null},
    {id:uid(),name:"Drift",color:"#B23A2F",verdict:null}
  ],
  entries:{}
};

var state;
try{ state=JSON.parse(readStore(KEY))||null; }catch(e){ state=null; }
if(!state||!state.categories) state=JSON.parse(JSON.stringify(DEFAULTS));
if(!state.settings) state.settings={startHour:6,endHour:24};
if(!state.entries) state.entries={};

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
    el.innerHTML="Every change saves to this browser automatically &mdash; there is nothing to press. <b>Keep a file in sync</b> pins it to one file on your disk that overwrites itself, so you never end up with twelve copies.";
  }else{
    el.innerHTML="This browser won't let the page save on its own. Use <b>Export a copy</b> before you close the tab.";
  }
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
function removeEntry(id){
  for(var k in state.entries){
    state.entries[k]=state.entries[k].filter(function(e){ return e.id!==id; });
    if(!state.entries[k].length) delete state.entries[k];
  }
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

function weekTotals(ws){
  var days=ws?(function(){ var o=[]; for(var i=0;i<7;i++) o.push(addDays(ws,i)); return o; })():weekDates();
  var t={},logged=0,none=0;
  days.forEach(function(d){
    entriesFor(iso(d)).forEach(function(e){
      var m=e.end-e.start; logged+=m;
      if(catById(e.cat)) t[e.cat]=(t[e.cat]||0)+m; else none+=m;
    });
  });
  return {t:t,logged:logged,none:none};
}

function renderTotals(){
  var r=weekTotals(),max=r.none;
  state.categories.forEach(function(c){ max=Math.max(max,r.t[c.id]||0); });

  var rows=state.categories.slice().sort(function(a,b){ return (r.t[b.id]||0)-(r.t[a.id]||0); }).map(function(c){
    var m=r.t[c.id]||0, pct=max?Math.round(m/max*100):0;
    return '<div class="tot"><div class="tot-top"><span class="dot" style="background:'+c.color+'"></span>'+
      escapeHtml(c.name)+'<span class="h">'+dur(m)+'</span></div>'+
      '<div class="tot-bar"><i style="width:'+pct+"%;background:"+c.color+'"></i></div>'+
      '<div class="verdict" data-cat="'+c.id+'">'+["keep","compress","cut"].map(function(v){
        return '<button data-v="'+v+'" aria-pressed="'+(c.verdict===v)+'">'+v+"</button>";
      }).join("")+"</div></div>";
  }).join("");

  if(r.none>0){
    rows+='<div class="tot"><div class="tot-top"><span class="dot" style="background:var(--none)"></span>No category'+
      '<span class="h">'+dur(r.none)+'</span></div>'+
      '<div class="tot-bar"><i style="width:'+(max?Math.round(r.none/max*100):0)+'%;background:var(--none)"></i></div></div>';
  }

  document.getElementById("totals").innerHTML=rows;
  document.getElementById("unlogged").textContent=dur(Math.max(10080-r.logged,0));

  var segs=state.categories.map(function(c){
    var m=r.t[c.id]||0;
    return m?'<div class="seg" style="width:'+(m/10080*100)+"%;background:"+c.color+'" title="'+escapeHtml(c.name)+" "+dur(m)+'"></div>':"";
  }).join("");
  if(r.none) segs+='<div class="seg" style="width:'+(r.none/10080*100)+'%;background:var(--none)" title="No category"></div>';
  segs+='<div class="seg void" style="width:'+(Math.max(10080-r.logged,0)/10080*100)+'%"></div>';
  document.getElementById("bar").innerHTML=segs;
  document.getElementById("gaugeCount").innerHTML="<b>"+dur(r.logged)+"</b> logged &nbsp;/&nbsp; "+dur(Math.max(10080-r.logged,0))+" still blank";
  document.getElementById("ticks").innerHTML=DAYNAMES.map(function(n){ return "<span>"+n.toUpperCase()+"</span>"; }).join("");
}

function renderCats(){
  document.getElementById("cats").innerHTML=state.categories.map(function(c){
    return '<div class="cat" data-cat="'+c.id+'">'+
      '<button class="sw" style="background:'+c.color+'" aria-label="Colour for '+escapeHtml(c.name)+'"></button>'+
      '<input class="nm" type="text" value="'+escapeHtml(c.name)+'" aria-label="Category name">'+
      '<button class="del" aria-label="Delete '+escapeHtml(c.name)+'">&times;</button>'+
      '<div class="picker" hidden>'+
        '<div class="presets">'+SWATCHES.map(function(s){ return '<button data-hex="'+s+'" style="background:'+s+'" aria-label="Use '+s+'"></button>'; }).join("")+"</div>"+
        '<input class="hue" type="range" min="0" max="360" value="'+hueOf(c.color)+'" aria-label="Drag to change colour">'+
        '<span class="pickhint">Drag the strip, or tap a swatch</span>'+
      "</div></div>";
  }).join("");
}

function render(){ renderGrid(); renderTotals(); renderCats(); refreshHint(); }

/* ---------------- colour ---------------- */
function hslHex(h){
  var s=0.40,l=0.36;
  var c=(1-Math.abs(2*l-1))*s, x=c*(1-Math.abs((h/60)%2-1)), m=l-c/2, r,g,b;
  if(h<60){r=c;g=x;b=0;} else if(h<120){r=x;g=c;b=0;} else if(h<180){r=0;g=c;b=x;}
  else if(h<240){r=0;g=x;b=c;} else if(h<300){r=x;g=0;b=c;} else {r=c;g=0;b=x;}
  return "#"+[r,g,b].map(function(v){ return String(Math.round((v+m)*255).toString(16)).padStart(2,"0"); }).join("").toUpperCase();
}
function hueOf(hex){
  var r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;
  var mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn,h=0;
  if(!d) return 0;
  if(mx===r) h=60*(((g-b)/d)%6); else if(mx===g) h=60*((b-r)/d+2); else h=60*((r-g)/d+4);
  return Math.round((h+360)%360);
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
  document.getElementById("fDay").innerHTML=days.map(function(d,i){
    return '<option value="'+i+'"'+(i===dayIdx?" selected":"")+">"+DAYNAMES[i]+" "+d.getDate()+" "+MONTHS[d.getMonth()]+"</option>";
  }).join("");
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

  var rec=recentLabels();
  document.getElementById("fRecent").innerHTML=entryId?"":rec.map(function(r){
    return '<button data-label="'+escapeHtml(r.label)+'" data-cat="'+(r.cat||"")+'">'+escapeHtml(r.label)+"</button>";
  }).join("");

  scrim.classList.add("on");
  fLabel.focus();
}
function closeSheet(){ scrim.classList.remove("on"); editing=null; }

fLabel.addEventListener("input",function(){ labelTouched=true; });

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
  var days=weekDates();

  function writeDay(dateStr,replaceId){
    if(breakOn) putEntryWithBreaks(dateStr,label,chosenCat,s,e,breaks,replaceId);
    else putEntry(dateStr,label,chosenCat,s,e,replaceId);
  }

  if(editing){
    writeDay(iso(days[+document.getElementById("fDay").value]),editing);
  }else{
    var picked=[].filter.call(document.querySelectorAll("#fRepeat button"),function(b){ return b.getAttribute("aria-pressed")==="true"; })
                 .map(function(b){ return +b.dataset.d; });
    if(!picked.length) picked=[+document.getElementById("fDay").value];
    picked.forEach(function(i){ writeDay(iso(days[i]),null); });
  }
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
scrim.addEventListener("click",function(ev){ if(ev.target===scrim) closeSheet(); });
document.addEventListener("keydown",function(ev){
  if(!scrim.classList.contains("on")) return;
  if(ev.key==="Escape") closeSheet();
  if(ev.key==="Enter"&&ev.target.tagName!=="BUTTON"){ ev.preventDefault(); saveSheet(); }
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
  c.verdict=(c.verdict===b.dataset.v)?null:b.dataset.v;
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
    clearTimeout(nameTimer);
    nameTimer=setTimeout(function(){ persist(); renderTotals(); },400);
  }
  if(ev.target.classList.contains("hue")){
    c.color=hslHex(+ev.target.value);
    row.querySelector(".sw").style.background=c.color;
    recolorEntries();
    clearTimeout(nameTimer);
    nameTimer=setTimeout(function(){ persist(); renderTotals(); },250);
  }
});

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
    row.querySelector(".sw").style.background=c.color;
    row.querySelector(".hue").value=hueOf(c.color);
    recolorEntries(); persist(); renderTotals();
    return;
  }
  if(ev.target.classList.contains("del")){
    snapshot('delete category "'+c.name+'"');
    state.categories=state.categories.filter(function(x){ return x.id!==c.id; });
    persist(); render();
    showToast('Deleted "'+(c.name||"category")+'". Its entries moved to No category.',true);
  }
});
document.addEventListener("click",function(ev){
  if(ev.target.closest(".cat")) return;
  [].forEach.call(cats.querySelectorAll(".picker"),function(p){ p.hidden=true; });
});

document.getElementById("addCat").addEventListener("click",function(){
  state.categories.push({id:uid(),name:"",color:SWATCHES[state.categories.length%SWATCHES.length],verdict:null});
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
function renderReview(){
  var cols=[];
  for(var i=REVIEW_WEEKS-1;i>=0;i--) cols.push(addDays(reviewAnchor,-7*i));
  var totals=cols.map(function(ws){ return weekTotals(ws); });

  document.getElementById("reviewRange").textContent=
    fmtShort(cols[0])+" – "+fmtShort(addDays(cols[cols.length-1],6));

  var head="<tr><th>Category</th>"+cols.map(function(ws){ return "<th>"+fmtShort(ws)+"</th>"; }).join("")+"<th>Verdict</th></tr>";

  var rows=state.categories.map(function(c){
    var cells=totals.map(function(r){ return "<td>"+dur(r.t[c.id]||0)+"</td>"; }).join("");
    return "<tr><td><span class=\"cat-cell\"><span class=\"dot\" style=\"background:"+c.color+"\"></span>"+escapeHtml(c.name)+"</span></td>"+
      cells+"<td class=\"verdict-tag"+(c.verdict==="cut"?" cut":"")+"\">"+(c.verdict||"")+"</td></tr>";
  }).join("");

  if(totals.some(function(r){ return r.none>0; })){
    rows+="<tr><td>No category</td>"+totals.map(function(r){ return "<td>"+dur(r.none)+"</td>"; }).join("")+"<td></td></tr>";
  }
  rows+="<tr class=\"unlogged\"><td>Unlogged</td>"+totals.map(function(r){
    return "<td>"+dur(Math.max(10080-r.logged,0))+"</td>";
  }).join("")+"<td></td></tr>";

  document.getElementById("reviewTable").innerHTML="<thead>"+head+"</thead><tbody>"+rows+"</tbody>";
}
document.getElementById("reviewToggle").addEventListener("click",function(){
  document.getElementById("gauge").hidden=true;
  document.getElementById("cols").hidden=true;
  document.getElementById("reviewSection").hidden=false;
  reviewAnchor=mondayOf(new Date());
  renderReview();
});
document.getElementById("reviewClose").addEventListener("click",function(){
  document.getElementById("reviewSection").hidden=true;
  document.getElementById("gauge").hidden=false;
  document.getElementById("cols").hidden=false;
});
document.getElementById("reviewPrev").addEventListener("click",function(){
  reviewAnchor=addDays(reviewAnchor,-7*REVIEW_WEEKS); renderReview();
});
document.getElementById("reviewNext").addEventListener("click",function(){
  reviewAnchor=addDays(reviewAnchor,7*REVIEW_WEEKS); renderReview();
});
/* which day "Add entry" should default to: the focused day in day view,
   today if the displayed week is the current one, else Monday */
function defaultAddDay(){
  if(viewMode==="day") return focusDay;
  var today=new Date();
  if(iso(mondayOf(today))===iso(weekStart)) return (today.getDay()+6)%7;
  return 0;
}
document.getElementById("addBtn").addEventListener("click",function(){
  var dayIdx=defaultAddDay();
  var entries=entriesFor(iso(weekDates()[dayIdx]));
  var last=entries.length?Math.max.apply(null,entries.map(function(e){ return e.end; })):null;
  var start=(last!==null)?Math.min(last,23*60+30):9*60;
  var end=Math.min(start+60,1440);
  openSheet(dayIdx,start,end,null);
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
  days.forEach(function(d){ delete state.entries[iso(d)]; });
  persist(); renderGrid(); renderTotals();
  showToast("Cleared "+n+" "+(n===1?"entry":"entries")+" from "+span,true);
});

document.getElementById("linkFile").addEventListener("click",function(){
  if(!window.showSaveFilePicker){
    alert("Your browser can't keep a file in sync (Chrome or Edge can). Use Export a copy instead.");
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

document.getElementById("save").addEventListener("click",function(){
  var blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});
  var a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="hours-ledger-"+iso(weekStart)+".json";
  a.click();
  setTimeout(function(){ URL.revokeObjectURL(a.href); },1000);
});
document.getElementById("load").addEventListener("click",function(){ document.getElementById("fileInput").click(); });
document.getElementById("fileInput").addEventListener("change",function(){
  var f=this.files[0]; if(!f) return;
  var r=new FileReader();
  r.onload=function(){
    try{
      var d=JSON.parse(r.result);
      if(!d.categories||!d.entries) throw new Error("bad");
      snapshot("open a copy");
      state=d;
      if(!state.settings) state.settings={startHour:6,endHour:24};
      persist(); render();
    }catch(e){ alert("That file isn't an Hours Ledger backup."); }
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

/* quick-log: fills the gap between your last entry and right now */
document.getElementById("fab").addEventListener("click",function(){
  var now=new Date();
  var mins=Math.min(Math.round((now.getHours()*60+now.getMinutes())/5)*5,1439);
  weekStart=mondayOf(now);
  focusDay=(now.getDay()+6)%7;
  var last=0;
  entriesFor(iso(now)).forEach(function(e){ if(e.end<=mins&&e.end>last) last=e.end; });
  var start=(last&&(mins-last)<=360)?last:Math.max(mins-30,0);
  var end=(mins>start)?mins:start+30;
  renderGrid(); renderTotals();
  openSheet(focusDay,start,end,null);
});

var SEEN="hours-ledger-seen";
var introEl=document.getElementById("intro");
function openIntro(){ hideToast(); introEl.classList.add("on"); }
function closeIntro(){ introEl.classList.remove("on"); writeStore(SEEN,"1"); }
document.getElementById("introGo").addEventListener("click",closeIntro);
document.getElementById("howto").addEventListener("click",openIntro);
introEl.addEventListener("click",function(ev){ if(ev.target===introEl) closeIntro(); });
document.addEventListener("keydown",function(ev){ if(ev.key==="Escape"&&introEl.classList.contains("on")) closeIntro(); });
if(!readStore(SEEN)) openIntro();

render();
setStatus("Saved "+clockNow());

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
    snapshot:snapshot,
    undo:undo,
    redo:redo,
    iso:iso,
    addDays:addDays,
    mondayOf:mondayOf,
    parseIso:parseIso,
    getState:function(){ return state; },
    setState:function(s){ state=s; },
    setWeekStart:function(d){ weekStart=d; }
  };
}
})();
