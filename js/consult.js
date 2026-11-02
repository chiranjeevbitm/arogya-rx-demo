/* Arogya Rx demo: shorthand medicine parsing, live-speech fact extraction and Hindi voice notes.
   Pure helpers with no DOM work; app.js wires them into the screens. Exposed as window.ARXC. */
(function(){
'use strict';
const X=window.ARX;

/* ---------- shorthand: "pcm 650 tds 3d af" ---------- */
const FREQ_SH={od:'1-0-0',qd:'1-0-0',om:'1-0-0',morning:'1-0-0',stat:'1-0-0',bd:'1-0-1',bid:'1-0-1',twice:'1-0-1',tds:'1-1-1',tid:'1-1-1',thrice:'1-1-1',hs:'0-0-1',night:'0-0-1',noon:'0-1-0',sos:'SOS',prn:'SOS',weekly:'Weekly',wk:'Weekly'};
const FREQ_OK=['1-0-0','0-1-0','0-0-1','1-0-1','1-1-1','SOS','Weekly'];
const TIME_SH={af:'after',pc:'after',after:'after',bf:'before',ac:'before',before:'before',bbf:'before',es:'empty',empty:'empty'};
const NUMW={ek:1,one:1,do:2,two:2,teen:3,three:3,char:4,chaar:4,four:4,paanch:5,panch:5,five:5,chhe:6,six:6,saat:7,seven:7,aath:8,eight:8,das:10,ten:10,pandrah:15,fifteen:15,bees:20,twenty:20,tees:30,thirty:30};

function lev(a,b){if(a===b)return 0;const m=a.length,n=b.length;if(!m)return n;if(!n)return m;let p=Array.from({length:n+1},(_,j)=>j);
 for(let i=1;i<=m;i++){const c=[i];for(let j=1;j<=n;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c;}return p[n];}

function parse(q){
 const toks=String(q||'').toLowerCase().replace(/[,;]/g,' ').split(/\s+/).filter(Boolean);
 const o={freq:null,timing:null,days:null,dose:null,words:[],nums:[]};
 const isFreq=w=>!!(w&&(FREQ_SH[w]||/^[01]-[01]-[01]$/.test(w)));
 toks.forEach((w,i)=>{let m;
  if(/^[12]$/.test(w)&&isFreq(toks[i+1])&&!o.dose){o.dose=w;return;}
  const D=n=>{if(o.days==null)o.days=n;};
  if(FREQ_SH[w]){if(!o.freq)o.freq=FREQ_SH[w];return;}
  if(/^[01]-[01]-[01]$/.test(w)){if(FREQ_OK.includes(w)&&!o.freq)o.freq=w;return;}
  if(TIME_SH[w]){if(!o.timing)o.timing=TIME_SH[w];return;}
  if((m=w.match(/^x?(\d+)(d|day|days|din)$/))){D(+m[1]);return;}
  if((m=w.match(/^(\d+)(w|wk|wks|week|weeks)$/))){D(+m[1]*7);return;}
  if((m=w.match(/^(\d+)(m|mo|month|months)$/))){D(+m[1]*30);return;}
  if((m=w.match(/^x(\d+)$/))){D(+m[1]);return;}
  if(w==='half'||w==='½'){o.dose='½';return;}
  if(/^\d+(\.\d+)?(mg|mcg)?$/.test(w)){o.nums.push(w.replace(/mg|mcg/,''));return;}
  o.words.push(w);});
 return o;}

function wordScore(d,w){
 const g=d.g.toLowerCase(),gw=g.split(/[^a-z0-9]+/).filter(Boolean),b=d.b.toLowerCase(),bw=b.split(/[^a-z0-9]+/).filter(Boolean);
 if(d.al.includes(w))return 100;
 if(w.length>=2&&d.al.some(a=>a.startsWith(w)))return 86;
 if(w.length>=2&&gw.some(x=>x.startsWith(w)))return 78;
 if(w.length>=2&&bw.some(x=>x.startsWith(w)))return 72;
 if(w.length>=4&&(g.includes(w)||b.includes(w)))return 50;
 if(w.length>=4){const lim=w.length>=7?2:1;const pool=gw.concat(bw,d.al);
  if(pool.some(x=>lev(x,w)<=lim||(x.length>w.length&&lev(x.slice(0,w.length),w)<=lim)))return 36;}
 return 0;}
function bonus(d,w){const first=d.g.toLowerCase().split(/[^a-z0-9]+/)[0];let b=0;if(first.startsWith(w)||(w.length>=4&&lev(first,w)<=2))b+=6;if(!/\+/.test(d.g))b+=2;return b;}

/* best matches for a typed line; returns {parsed, list:[{d,score}]} */
function match(q){
 const p=parse(q);if(!p.words.length)return {parsed:p,list:[]};
 const list=X.DRUGS.map(d=>{let sc=0;for(const w of p.words){const s=wordScore(d,w);if(!s)return {d,score:0};sc+=s+bonus(d,w);}
  const sn=(d.s.replace(/,/g,'').match(/\d+(\.\d+)?/g)||[]);if(p.nums.some(n=>sn.includes(n)))sc+=24;return {d,score:sc};}).filter(r=>r.score>0).sort((a,b)=>b.score-a.score);
 /* a bare number that is not a strength of the top match reads as days */
 const top=list[0];if(top&&p.days==null){const sn=(top.d.s.replace(/,/g,'').match(/\d+(\.\d+)?/g)||[]);const n=p.nums.find(n=>!sn.includes(n)&&+n>0&&+n<=90);if(n)p.days=+n;}
 return {parsed:p,list:list.slice(0,8)};}

/* default sig for a drug, overridden by whatever was typed */
function sigFor(d,p){p=p||{};
 const freq=p.freq||(d.f==='inh'?'SOS':d.f==='syp'?'1-1-1':d.cls==='bg'?'1-0-1':['arb','ccb','statin','thy','antiplt','bb','su'].includes(d.cls)?(d.cls==='statin'?'0-0-1':'1-0-0'):'1-0-1');
 const timing=p.timing||(d.cls==='ppi'||d.cls==='su'?'before':d.cls==='thy'?'empty':['arb','ccb'].includes(d.cls)?'any':'after');
 const chronic=['bg','su','arb','ccb','statin','thy','antiplt','bb'].includes(d.cls);
 const days=p.days||(chronic?30:5);
 return [d.id,freq==='Weekly'&&!p.days?'Weekly':freq,timing,freq==='Weekly'&&!p.days?56:days,p.dose||undefined];}

/* ---------- live speech: words to facts ---------- */
function norm(t){t=' '+String(t).toLowerCase().replace(/(\d)\.(\d)/g,'$1\u2027$2').replace(/[.,!?]/g,' ').replace(/\u2027/g,'.')+' ';
 const R=[[/ subah (aur )?shaam /g,' bd '],[/ do baar /g,' bd '],[/ twice a day /g,' bd '],[/ teen baar /g,' tds '],[/ din mein teen /g,' tds '],[/ three times( a day)? /g,' tds '],
  [/ raat (ko|mein) /g,' hs '],[/ at night /g,' hs '],[/ dopahar /g,' noon '],[/ subah /g,' od '],[/ in the morning /g,' od '],[/ zaroorat (par|padne par) /g,' sos '],[/ when needed /g,' sos '],
  [/ (khana )?khane ke baad /g,' af '],[/ after food /g,' af '],[/ after meals? /g,' af '],[/ (khane|nashte) se pehle /g,' bf '],[/ before food /g,' bf '],[/ khaali pet /g,' es '],[/ empty stomach /g,' es '],
  [/ (by|over|upon) /g,' / ']];
 R.forEach(r=>{t=t.replace(r[0],r[1]);});
 t=t.replace(/ (\w+) (din|days?) /g,(m,a,b)=>{const n=NUMW[a]||(+a||0);return n?` ${n}d `:m;});
 t=t.replace(/ (\w+) (hafte|weeks?) /g,(m,a)=>{const n=NUMW[a]||(+a||0);return n?` ${n}w `:m;});
 t=t.replace(/ (ek )?mahin[ae] /g,' 1m ');
 return t.replace(/\s+/g,' ');}

const SYM=[[/bukhar|fever/,'Fever'],[/khansi|cough/,'Cough'],[/sir (me |mein )?dard|headache/,'Headache'],[/badan dard|body ?ache/,'Body ache'],[/ulti|vomit/,'Vomiting'],[/dast|loose motion|diarrh/,'Loose motions'],
 [/peshab|urin|jalan|burning/,'Burning urination'],[/chakkar|giddi|dizz/,'Giddiness'],[/kamzori|weakness/,'Weakness'],[/chheenk|sneez/,'Sneezing'],[/pet (me |mein )?dard|abdominal pain|stomach pain/,'Abdominal pain'],[/gal(a|e)|throat/,'Sore throat'],[/saans|breathless/,'Breathlessness'],[/jhunjhuni|tingling|numb/,'Tingling']];
const TESTS=[[/\bcbc\b|blood count/,'CBC'],[/ns1|dengue/,'Dengue NS1'],[/\bfbs\b|fasting/,'FBS'],[/ppbs/,'PPBS'],[/hba1c|a1c/,'HbA1c'],[/lipid/,'Lipid profile'],[/creatinine|kidney test/,'S. creatinine'],[/urine (routine|r ?m)/,'Urine R/M'],[/culture/,'Urine C/S'],[/\btsh\b|thyroid test/,'TSH'],[/ferritin/,'S. ferritin'],[/x ?ray/,'Chest X-ray'],[/\becg\b/,'ECG']];

function extract(text){
 const raw=String(text||'').toLowerCase(),t=norm(text),facts=[];let m;
 if((m=t.match(/bp (\d{2,3}) ?\/ ?(\d{2,3})/)))facts.push(['v','bp',m[1]+'/'+m[2]]);
 if((m=t.match(/pulse (\d{2,3})/)))facts.push(['v','pulse',m[1]]);
 if((m=t.match(/(temp|temperature|tapman) (\d{2,3}(\.\d)?)/)))facts.push(['v','temp',m[2]]);
 if((m=t.match(/(spo2|oxygen|saturation) (\d{2,3})/)))facts.push(['v','spo2',m[2]]);
 if((m=t.match(/(sugar|grbs) (random )?(\d{2,3})/)))facts.push(['v','grbs',m[3]]);
 if((m=t.match(/(weight|wajan) (\d{2,3})/)))facts.push(['v','wt',m[2]]);
 const syms=SYM.filter(s=>s[0].test(raw)).map(s=>s[1]);
 if(syms.length){const dur=t.match(/ (\d+)(d|w) se /)||raw.match(/(\d+) (days?|weeks?)/);facts.push(['co',syms.join(', ')+(dur?` for ${dur[1]} ${/w|week/.test(dur[2])?'weeks':'days'}`:'')]);}
 TESTS.forEach(x=>{if(x[0].test(raw))facts.push(['inv',x[1]]);});
 /* allergies: a sentence that says allergy/reaction and names a drug */
 const seen={};const drugIn=w=>{if(w.length<3)return null;let best=null,bs=0;X.DRUGS.forEach(d=>{const s=wordScore(d,w);if(s>bs){bs=s;best=d;}});return best&&(bs>=100||(w.length>=4&&bs>=72))?best:null;};
 raw.split(/[.!?\n]+/).filter(x=>/allerg|reaction|daane|rash/.test(x)).forEach(sn=>{sn.split(/[^a-z0-9]+/).forEach(w=>{const d=drugIn(w);if(d&&!seen[d.id]){seen[d.id]=1;facts.push(['all',d.cls==='sulfa'?'Sulfa':d.cls==='pen'?'Penicillin':d.g]);}});});
 /* medicines: find each drug word, then read the sig from the words up to the next drug */
 const toks=t.trim().split(' ');
 for(let i=0;i<toks.length;i++){const best=drugIn(toks[i]);if(!best||seen[best.id])continue;
  const win=toks.slice(i,i+8);const stop=win.findIndex((x,k)=>k>0&&drugIn(x));
  const p=parse((stop>0?win.slice(0,stop):win).join(' '));
  seen[best.id]=1;const sg=sigFor(best,p);facts.push(['med',sg[0],sg[1],sg[2],sg[3]]);}
 if((m=t.match(/ (\d+)(d|w) baad /)||t.match(/after (\d+)(d|w)/)||t.match(/follow ?up (in )?(\d+)(d|w)/))){const n=+(m[2]&&/\d/.test(m[2])?m[2]:m[1]);const u=(m[3]||m[2]);facts.push(['fu',u==='w'?n*7:n]);}
 return facts;}

/* ---------- Hindi voice note (browser speech synthesis) ---------- */
let speaking=false;
function voices(){try{return speechSynthesis.getVoices();}catch(e){return [];}}
function speak(text,onEnd){
 if(!('speechSynthesis' in window))return false;
 try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='hi-IN';u.rate=.95;
  const v=voices().find(v=>/^hi/i.test(v.lang));if(v)u.voice=v;
  u.onend=u.onerror=()=>{speaking=false;onEnd&&onEnd();};speaking=true;speechSynthesis.speak(u);return true;}catch(e){return false;}}
function stop(){try{speechSynthesis.cancel();}catch(e){}speaking=false;}
const isSpeaking=()=>speaking;
const SR=window.SpeechRecognition||window.webkitSpeechRecognition||null;

window.ARXC={parse,match,sigFor,extract,speak,stop,isSpeaking,SR,lev};
})();
