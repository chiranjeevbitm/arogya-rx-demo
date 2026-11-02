/* Arogya Rx demo: router, language + theme, landing renderers, and the clinic app (home, schedule, intake, OPD, patients, settings). */
(function(){
'use strict';
const $=s=>document.querySelector(s);
const $$=s=>Array.from(document.querySelectorAll(s));
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
const X=window.ARX;const svg=X.svg;const C=window.ARXC;
const store={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(e){return d;}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}};

/* ---------------- language & theme ---------------- */
let LANG=(document.documentElement.lang==='hi')?'hi':'en';
const t=k=>(I18N[LANG]&&I18N[LANG][k])||I18N.en[k]||k;
const L=o=>o&&typeof o==='object'?(o[LANG]||o.en):o;
function applyLang(){
 document.documentElement.lang=LANG;
 $$('[data-i18n]').forEach(e=>{e.textContent=t(e.dataset.i18n);});
 $$('[data-i18n-ph]').forEach(e=>{e.placeholder=t(e.dataset.i18nPh);});
 $$('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===LANG?'true':'false'));
 renderLanding();
 if(!$('#page-app').hidden)renderApp();
 document.dispatchEvent(new Event('arx:lang'));
}
function setLang(l){LANG=l;try{localStorage.setItem('arx-lang',l);}catch(e){}applyLang();}
function setTheme(th){document.documentElement.setAttribute('data-theme',th);try{localStorage.setItem('arx-theme',th);}catch(e){}
 $('#themeBtn').innerHTML=th==='dark'?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';}

/* ---------------- landing ---------------- */
let ff='all',bill='m';
const OPEN=new Set();   // ids of expanded panels, kept across re-renders
const disc=(id,inner)=>`<div class="disc${OPEN.has(id)?' open':''}" id="${id}"${OPEN.has(id)?'':' inert'}><div class="disc-in">${inner}</div></div>`;
const hiOr=(en,hi)=>LANG==='hi'?hi:en;
const BENTO=[[0,'b1','amb'],[0,'b2','short'],[0,'b3','wa'],[0,'b4','hindi'],[0,'b5','photo'],[0,'b6','allergy']];
function bentoViz(k){
 if(k==='lh')return `<div class="mini-lh"><div class="mlh-hi">सिन्हा क्लिनिक</div><div class="mlh-en">SINHA CLINIC</div><div class="mlh-doc">Dr. Rakesh Sinha · MBBS, MD</div><div class="mlh-rule"></div><div class="mlh-body"><span class="mlh-rx">℞</span><div class="mlh-lines"><i></i><i></i><i></i><i></i><i></i></div></div></div><div class="inks"><i></i><i></i><i></i><i></i></div>`;
 if(k==='amb')return `<div class="mamb"><div class="ml d"><i>Dr</i><span>Pehle kisi dawa se reaction hua hai?</span></div><div class="ml p"><i>Pt</i><span>Haan, Septran se daane nikle the.</span></div><div class="ml s"><i>St</i><span>BP 124 by 80, temp 98.8</span></div><div class="mfacts"><span class="f1">BP 124/80</span><span class="f2">${esc(hiOr('Allergy: Sulfa','एलर्जी: सल्फ़ा'))}</span><span class="f3 mono">NITROFURANTOIN 100 · 1-0-1 · 5 d</span></div></div>`;
 if(k==='short')return `<div class="mshort"><span class="in mono">pcm tds 3d<i></i></span><span class="arw" aria-hidden="true">↓</span><span class="out"><b class="mono">TAB. PARACETAMOL 650 mg</b><small class="mono">1 – 1 – 1 · after food · 3 days</small></span></div>`;
 if(k==='wa')return `<div class="mwa"><span class="b1">${esc(hiOr('Token 9 booked ✔ Sat 10:40','टोकन 9 बुक ✔ शनि 10:40'))}</span><span class="b2">${esc(hiOr('Tomorrow 10:40','कल 10:40'))} · <u>${esc(hiOr('Reschedule','समय बदलें'))}</u></span><span class="b3">${esc(hiOr('2 patients ahead of you','आपसे पहले 2 मरीज़'))}</span></div>`;
 if(k==='hindi')return `<div class="mvn"><span class="play" aria-hidden="true">▶</span><span class="vbars">${Array.from({length:22},(_,i)=>`<i style="--k:${(i*29)%9}"></i>`).join('')}</span><span class="mono">0:24</span></div><div class="morph"><span class="m1 mono">1 – 0 – 1 · after food · 5 days</span><span class="m2">सुबह और रात · खाने के बाद · 5 दिन</span></div>`;
 if(k==='gen')return `<div class="bars"><div class="bar br"><span>${esc(t('viz.branded'))}</span><i></i><b class="mono">₹312</b></div><div class="bar ja"><span>${esc(t('viz.ja'))}</span><i></i><b class="mono">₹96</b></div><small>${esc(t('viz.sample'))}</small></div>`;
 if(k==='allergy')return `<div class="shield"><span class="rip"></span><span class="rip r2"></span>${svg('shield')}<span class="blk">${esc(t('viz.blocked'))}</span></div>`;
 if(k==='voice')return `<div class="vwave">${Array.from({length:28},(_,i)=>`<i style="--k:${(i*37)%11}"></i>`).join('')}</div><div class="vtx mono"><span>bukhar teen din se · PCM 650 SOS</span></div>`;
 if(k==='photo')return `<div class="pdoc"><i></i><i></i><i></i><i></i><i></i><span class="pscan"></span></div><div class="pchips mono"><span>HbA1c 7.2%</span><span>FBS 132</span><span>Hb 9.1</span></div>`;
 return '';}
function renderLanding(){
 const F=X.FEATURES;
 ['all','live','pilot','road'].forEach(k=>{const el=$('#fc-'+k);if(el)el.textContent=k==='all'?F.length:F.filter(f=>f.st===k).length;});
 const tot=$('#fc-total');if(tot)tot.textContent=F.length;
 const stLbl={live:t('feat.live'),pilot:t('feat.pilot'),road:t('feat.road')},stCls={live:'good',pilot:'acc',road:'warn'};
 const mq=$('#mq');if(mq){const row=X.MARQUEE.map(m=>`<span>${esc(L(m))}</span>`).join('');mq.innerHTML=row+row;}
 $('#bento').innerHTML=BENTO.map(([fi,key,viz],i)=>`<article class="tile t-${key} st" style="--i:${i}"><div class="viz viz-${viz}" aria-hidden="true">${bentoViz(viz)}</div><div class="tile-txt"><h3>${esc(t('bento.'+key+'t'))}</h3><p>${esc(t('bento.'+key+'d'))}</p></div></article>`).join('');
 $('#flist').innerHTML=F.map((f,idx)=>[f,idx]).filter(([f])=>ff==='all'||f.st===ff).map(([f,idx],i)=>{const id='fd-'+idx,o=OPEN.has(id);
  return `<div class="frow st" style="--i:${Math.min(i,10)}"><button class="frow-h" type="button" data-disc="${id}" aria-expanded="${o}" aria-controls="${id}"><span class="ic">${svg(f.ic)}</span><span class="t">${esc(L(f.t))}</span><span class="tag ${stCls[f.st]}">${esc(stLbl[f.st])}</span><span class="chev" aria-hidden="true"></span></button>${disc(id,`<p>${esc(L(f.d))}</p><span class="ph mono">${esc(f.ph)}</span>`)}</div>`;}).join('');
 $('#road').innerHTML=X.ROADMAP.map(r=>`<div class="ph4 ${r.now?'now':''}"><span class="dot" aria-hidden="true"></span><div class="when mono">${esc(r.when)}${r.now?` · <b>${hiOr('Now','अभी')}</b>`:''}</div><h3>${esc(L(r.t))}</h3><ul>${L(r.items).map(i=>`<li>${esc(i)}</li>`).join('')}</ul><div class="gate">${esc(L(r.gate))}</div></div>`).join('');
 $('#plans').innerHTML=X.PLANS.slice(0,3).map((p,i)=>{const price=bill==='m'?p.m:p.y;const per=bill==='m'?hiOr('/ month','/ महीना'):hiOr('/ year','/ साल');
  return `<div class="pcard ${p.feat?'feat':''} st" style="--i:${i}">${p.feat?`<span class="ribbon">${hiOr('Most clinics','ज़्यादातर क्लिनिक')}</span>`:''}<h3>${esc(L(p.t))}</h3><div class="pp"><span class="amt">₹${price.toLocaleString('en-IN')}</span><small>${price?per:hiOr('forever','हमेशा')}</small></div><p class="note">${esc(L(p.note))}</p><a class="btn ${p.feat?'primary':''} full" href="${p.m?'#contact':'#login'}">${p.m?hiOr('Book a demo visit','डेमो विज़िट माँगें'):hiOr('Start free','मुफ़्त शुरू करें')}</a>${disc('pl-'+i,`<ul class="checks">${L(p.items).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`)}</div>`;}).join('');
 $('#teamGrid').innerHTML=X.TEAM.map(m=>`<div class="mem"><span class="pic">${esc(m.ini)}</span><div><h3>${esc(m.name)}</h3><div class="role">${esc(L(m.role))}</div><p>${esc(L(m.bio))}</p>${m.links.length?`<div class="links">${m.links.map(l=>`<a href="${l[1]}" ${l[1].startsWith('http')||l[1].endsWith('.pdf')?'target="_blank" rel="noopener"':''}>${esc(l[0])} →</a>`).join('')}</div>`:''}</div></div>`).join('');
 const sl=$('#secList');if(sl&&X.SECURITY){const SL={in:['good',t('sec.in')],soon:['warn',t('sec.soon')]};
  sl.innerHTML=X.SECURITY.map((f,i)=>`<div class="srow st" style="--i:${Math.min(i,10)}"><span class="ic">${svg(f.ic)}</span><div><div class="srow-t"><b>${esc(L(f.t))}</b><span class="tag ${SL[f.st][0]}">${esc(SL[f.st][1])}</span></div><p>${esc(L(f.d))}</p></div></div>`).join('');
  const st=$('#sec-total');if(st)st.textContent=X.SECURITY.length;}
 $$('[data-ic]').forEach(e=>{if(!e.firstElementChild)e.innerHTML=svg(e.dataset.ic);});
 $('#faqGrid').innerHTML=X.FAQ.map((q,i)=>{const id='faq-'+i,o=OPEN.has(id);return `<div class="fq"><button class="fq-h" type="button" data-disc="${id}" aria-expanded="${o}" aria-controls="${id}"><span>${esc(L(q[0]))}</span><span class="chev" aria-hidden="true"></span></button>${disc(id,`<p>${esc(L(q[1]))}</p>`)}</div>`;}).join('');
 const hs=$('#hvSave');if(hs){const p=cur()||S.patients[2];hs.textContent=inr(cost(p.rx).s);}
 renderWhy();
 renderPapers();
 document.dispatchEvent(new Event('arx:render'));
}
const WIN=[
 ['wa',['Starts before the visit: WhatsApp booking with symptoms and old reports','मुलाक़ात से पहले शुरुआत: WhatsApp पर बुकिंग, तकलीफ़ और पुरानी रिपोर्ट'],['Booking link only','सिर्फ़ बुकिंग लिंक']],
 ['mic',['Listens to doctor and patient in Hinglish, drafts the parchi','डॉक्टर और मरीज़ की हिंग्लिश बातचीत सुनकर पर्ची का ड्राफ़्ट'],['Doctor types or dictates','डॉक्टर टाइप या डिक्टेट करते हैं']],
 ['cam',['Reads handwritten parchis and lab slips from a photo','हाथ से लिखी पर्ची और लैब रिपोर्ट फ़ोटो से पढ़ता है'],['Top plans only, if at all','सिर्फ़ महँगे प्लान में, अगर हो']],
 ['lang',['Hindi summary, answers and a voice note for the patient','मरीज़ के लिए हिंदी सारांश, जवाब और वॉइस नोट'],['English PDF','अंग्रेज़ी PDF']],
 ['tap',['“pcm tds 3d” fills the whole medicine line','“pcm tds 3d” से पूरी दवा की लाइन'],['Search, then three dropdowns','खोजें, फिर तीन ड्रॉपडाउन']],
 ['building',['Set up in your clinic, support in Hindi, in Bihar','आपके क्लिनिक में सेटअप, हिंदी में मदद, बिहार में'],['Phone and video support','फ़ोन और वीडियो सपोर्ट']]];
function renderWhy(){const c=$('#whyCharts'),w=$('#whyWin');if(!c||!w)return;
 const bars=(title,sub,rows,max,fmt)=>`<figure class="wc"><figcaption><b>${esc(title)}</b>${sub?`<small>${esc(sub)}</small>`:''}</figcaption>${rows.map((r,i)=>`<div class="wr ${r.us?'us':''}"><span class="wl">${esc(r.l)}</span><span class="wt"><i class="wb" style="--w:${(r.lo/max).toFixed(3)};--d:${i*.15}s"></i>${r.hi?`<i class="wx" style="--x:${(r.lo/max).toFixed(3)};--w:${((r.hi-r.lo)/max).toFixed(3)};--d:${i*.15+.4}s"></i>`:''}</span><b class="wv mono">${esc(fmt(r))}</b>${r.note?`<small class="wn">${esc(r.note)}</small>`:''}</div>`).join('')}</figure>`;
 const k=n=>n>=1000?'₹'+(n/1000).toFixed(n%1000?1:0).replace('.0','')+'k':'₹'+n;
 c.innerHTML=bars(t('why.c1'),t('why.c1s'),[{l:t('why.us'),lo:4999,us:1,note:t('why.found')},{l:t('why.them'),lo:12000,hi:19000}],19000,r=>r.hi?`${k(r.lo)}–${k(r.hi)}`:'₹'+r.lo.toLocaleString('en-IN'))
  +bars(t('why.c2'),'',[{l:t('why.us'),lo:.12,us:1},{l:t('why.them'),lo:.12,hi:1}],1,r=>r.hi?hiOr('up to ₹1','₹1 तक'):hiOr('≈ 12 paise','≈ 12 पैसे'));
 w.innerHTML=WIN.map((r,i)=>`<li class="st" style="--i:${i}"><span class="ic">${svg(r[0])}</span><span class="wt2">${esc(L({en:r[1][0],hi:r[1][1]}))}</span><span class="yes" aria-label="Arogya Rx: yes">✓</span><span class="them">${esc(L({en:r[2][0],hi:r[2][1]}))}</span></li>`).join('');}
function toggleDisc(b){const open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));
 b.dataset.disc.split(' ').forEach(id=>{if(open)OPEN.add(id);else OPEN.delete(id);const el=document.getElementById(id);if(el){el.classList.toggle('open',open);el.toggleAttribute('inert',!open);}});}

/* ---------------- clinic state ---------------- */
const FORM={tab:'TAB.',cap:'CAP.',syp:'SYP.',inh:'INH.',sach:'SACHET'};
const FREQ={'1-0-0':{en:'morning',hi:'सुबह',n:1},'0-1-0':{en:'afternoon',hi:'दोपहर',n:1},'0-0-1':{en:'night',hi:'रात को',n:1},'1-0-1':{en:'morning & night',hi:'सुबह और रात',n:2},'1-1-1':{en:'thrice daily',hi:'सुबह, दोपहर और रात',n:3},'SOS':{en:'when needed',hi:'ज़रूरत पड़ने पर',n:1},'Weekly':{en:'once a week',hi:'हफ़्ते में एक बार',n:1/7}};
const TIMING={after:{en:'after food',hi:'खाने के बाद'},before:{en:'before food',hi:'खाने से पहले'},empty:{en:'empty stomach',hi:'खाली पेट'},any:{en:'',hi:''}};
const DRUG=Object.fromEntries(X.DRUGS.map(d=>[d.id,d]));
const LH0={doctor:'Dr. Rakesh Sinha',doctorHi:'डॉ. राकेश सिन्हा',degrees:'MBBS, MD (General Medicine)',reg:'BCMR 00000 (sample)',clinic:'Sinha Clinic',clinicHi:'सिन्हा क्लिनिक',address:'Club Road, near Kalyani Chowk, Muzaffarpur, Bihar 842001',phone:'+91 90000 00000',timings:'सुबह 8–11 · शाम 5–8 · रविवार बंद',ink:'#1d3a8a',layout:'center',fee:500};
const INKS=[['#1d3a8a','Ink blue'],['#7a1f2b','Maroon'],['#1f5e46','Green'],['#23262e','Black']];
let uid=0;
const defDose=d=>d.f==='syp'?'10 ml':d.f==='inh'?'2 puffs':'1';
const mkMed=a=>({uid:++uid,id:a[0],freq:a[1],timing:a[2],days:a[3],dose:a[4]||defDose(DRUG[a[0]])});
const newRx=()=>({co:'',v:{bp:'',pulse:'',temp:'',spo2:'',wt:'',grbs:''},dx:'',meds:[],inv:[],adv:[],fu:0,hindi:true});
function rxFrom(key,co,v){const T=X.TPL[key];const r=newRx();r.co=co||'';Object.assign(r.v,v||{});r.dx=T.dx;r.meds=T.meds.map(mkMed);r.inv=T.inv.slice();r.adv=T.adv.slice();r.fu=T.fu;return r;}
function seed(){uid=0;
 const P=JSON.parse(JSON.stringify(X.PATIENTS));
 P.forEach(p=>{p.id='p'+p.tok;p.visits=p.visits||[];p.rx=p.tpl?rxFrom(p.tpl,p.co,p.v):newRx();if(!p.tpl)p.rx.co=p.co;});
 const r=P.find(p=>p.tok===3);r.rx=rxFrom('dm','Sugar follow-up. Tingling in both feet for 2 months.',{bp:'138/86',pulse:'82',spo2:'98',wt:'74',grbs:'186'});r.rx.dx='Type 2 DM with early peripheral neuropathy';r.rx.meds.push(mkMed(['bcomp','1-0-0','after',30]));r.rx.inv.push('Lipid profile');r.start=Date.now()-17000;
 const appts=P.map(p=>({id:'a'+p.tok,pid:p.id,name:p.name,phone:p.phone,day:0,time:p.slot,reason:p.co,src:p.src,status:p.status==='done'?'seen':'arrived'}));
 [['Kavita Sharma','10:40','Thyroid review, fatigue','WhatsApp',0],['Mahesh Yadav','11:00','HTN review','WhatsApp',1],['Rubi Khatoon','09:20','ANC follow-up','Walk-in',1],['Vinod Paswan','10:00','COPD review','WhatsApp',2],['Neha Gupta','08:40','Acne, PCOS review','WhatsApp',3]].forEach((a,i)=>appts.push({id:'b'+i,pid:null,name:a[0],phone:'9xxxxx'+(1200+i*37),day:a[4],time:a[1],reason:a[2],src:a[3],status:'booked'}));
 return {lh:Object.assign({},LH0,store.get('arx-lh',{})),patients:P,appts,cur:'p3',sent:3,doc:'rx',userShot:false,chat:[],chatDone:false};}
let S=seed();
const cur=()=>S.patients.find(p=>p.id===S.cur);

/* helpers */
const today=new Date();
const addDays=n=>{const d=new Date(today);d.setDate(d.getDate()+n);return d;};
const fmtD=d=>d.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
const fmtHi=d=>{try{return d.toLocaleDateString('hi-IN',{day:'numeric',month:'long'});}catch(e){return fmtD(d);}};
const fmtT=s=>{s=Math.max(0,Math.round(s));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');};
const inr=n=>'₹'+Math.round(n).toLocaleString('en-IN');
const doseNum=m=>m.dose==='½'?0.5:(parseFloat(m.dose)||1);
function qty(m){const d=DRUG[m.id];if(d.f==='syp'||d.f==='inh')return 1;if(m.freq==='Weekly')return Math.ceil(m.days/7);return Math.ceil((FREQ[m.freq]||{n:1}).n*m.days*doseNum(m));}
function cost(rx){let b=0,j=0;rx.meds.forEach(m=>{const d=DRUG[m.id],q=qty(m);b+=q*d.bp;j+=q*d.jp;});return {b,j,s:b-j};}
const sigCode=m=>/^\d-\d-\d$/.test(m.freq)?m.freq.split('-').join(' – '):m.freq;
function doseEn(m,d){if(d.f==='tab')return m.dose+' tab';if(d.f==='cap')return m.dose+' cap';if(d.f==='sach')return '1 sachet in 1 L water';return m.dose;}
function doseHi(m,d){if(d.f==='tab')return m.dose+' गोली';if(d.f==='cap')return m.dose+' कैप्सूल';if(d.f==='inh')return m.dose.replace('puffs','पफ');if(d.f==='sach')return '1 पैकेट, 1 लीटर पानी में घोलकर';return m.dose;}
const daysHi=m=>m.freq==='Weekly'?Math.round(m.days/7)+' हफ़्ते':m.days+' दिन';
const daysEn=m=>m.freq==='Weekly'?Math.round(m.days/7)+' weeks':m.days+' days';
function vflag(k,val){val=String(val||'').trim();if(!val)return '';
 if(k==='bp'){const p=val.split('/').map(Number);if(p.length<2||isNaN(p[0])||isNaN(p[1]))return '';if(p[0]>=180||p[1]>=110)return 'crit';if(p[0]>=140||p[1]>=90||p[0]<90)return 'warn';return 'ok';}
 const n=parseFloat(val);if(isNaN(n))return '';
 if(k==='pulse')return n>120||n<50?'crit':(n>100||n<60?'warn':'ok');
 if(k==='temp')return n>=103?'crit':(n>=99.5?'warn':'ok');
 if(k==='spo2')return n<90?'crit':(n<95?'warn':'ok');
 if(k==='grbs')return n>300||n<70?'crit':(n>180?'warn':'ok');return '';}
function alertsFor(p){const out=[];const rx=p.rx;
 rx.meds.forEach(m=>{const d=DRUG[m.id];
  if(p.all.includes('Sulfa')&&d.cls==='sulfa')out.push(['crit',`Allergy: ${p.name} is allergic to sulfa drugs. ${d.g} contains sulfamethoxazole. Remove it or confirm.`]);
  if(p.all.includes('Penicillin')&&d.cls==='pen')out.push(['crit',`Allergy: ${p.name} is allergic to penicillin. ${d.g} is a penicillin. Consider azithromycin or cefixime.`]);});
 const g={ah:'antihistamines',ppi:'acid reducers',pcm:'paracetamol-containing medicines',nsaid:'painkillers'};
 Object.keys(g).forEach(c=>{const ms=rx.meds.filter(m=>DRUG[m.id].cls===c);if(ms.length>1)out.push(['warn',`Duplicate: ${ms.length} ${g[c]} (${ms.map(m=>DRUG[m.id].g).join(', ')}).`]);});
 const seen={};rx.meds.forEach(m=>{if(seen[m.id])out.push(['warn',DRUG[m.id].g+' is listed twice.']);seen[m.id]=1;});
 if(p.cond.some(c=>c.startsWith('T2DM'))&&rx.meds.some(m=>DRUG[m.id].cls==='nsaid'))out.push(['warn','NSAID in a diabetic patient: check kidney function.']);
 const has=c=>rx.meds.filter(m=>DRUG[m.id].cls===c||(c==='nsaid'&&m.id==='diclopcm')||(c==='nsaid'&&m.id==='dicymef'));
 const ns=has('nsaid');
 if(ns.length&&p.noNsaid)out.push(['crit',`${DRUG[ns[0].id].g}: you noted “no painkillers until dengue is ruled out”. Use paracetamol only.`]);
 if(ns.length>1)out.push(['warn',`Two painkillers: ${ns.map(m=>DRUG[m.id].g).join(' and ')}. Keep one.`]);
 if(ns.length&&has('arb').length)out.push(['warn',`Interaction: ${DRUG[ns[0].id].g} with ${DRUG[has('arb')[0].id].g} can raise BP and strain the kidneys. Prefer paracetamol.`]);
 if(rx.meds.some(m=>m.id==='clop75')&&rx.meds.some(m=>m.id==='ome20'))out.push(['warn','Interaction: omeprazole weakens clopidogrel. Pantoprazole is the safer acid reducer.']);
 if(rx.meds.some(m=>m.id==='asp75')&&ns.length)out.push(['warn',`Bleeding risk: aspirin with ${DRUG[ns[0].id].g}.`]);
 const PCM={pcm650:650,diclopcm:325};const mg=rx.meds.reduce((t,m)=>t+(PCM[m.id]&&m.freq!=='SOS'?PCM[m.id]*doseNum(m)*(FREQ[m.freq]||{n:1}).n:0),0);
 if(mg>4000)out.push(['crit',`Paracetamol ${mg.toLocaleString('en-IN')} mg a day is above the 4,000 mg daily limit.`]);
 return out;}
function nmcHTML(p){const rx=p.rx,Lh=S.lh,al=alertsFor(p);
 const rows=[[rx.meds.length>0,'Generic names, in CAPITALS'],[!!(Lh.reg&&Lh.reg.trim()),'Registration number on the letterhead'],[!!p.name&&!!p.age,'Patient name, age, sex and date'],[true,'Printed, so it is legible'],[!al.some(a=>a[0]==='crit'),al.some(a=>a[0]==='crit')?'Safety check: fix the red alert':al.length?`Safety check: ${al.length} note${al.length>1?'s':''} to review`:'Allergy, interaction and dose checks passed']];
 const ok=rows.every(r=>r[0]);
 return `<div class="nmc ${ok?'ok':''}"><div class="nmc-h">${svg('shield')}<b>${ok?'NMC-ready parchi':'Before you print'}</b></div><ul>${rows.map(r=>`<li class="${r[0]?'y':'n'}"><i>${r[0]?'✓':'!'}</i>${esc(r[1])}</li>`).join('')}</ul></div>`;}

/* ---------------- the paper ---------------- */
function parchi(p){const Lh=S.lh,rx=p.rx,v=rx.v,fuDate=rx.fu?addDays(rx.fu):null;
 const vit=[['BP',v.bp,'bp','mmHg'],['Pulse',v.pulse,'pulse','/min'],['Temp',v.temp,'temp','°F'],['SpO₂',v.spo2,'spo2','%'],['GRBS',v.grbs,'grbs','mg/dL']].filter(x=>x[1]);
 const head=Lh.layout==='left'
  ?`<div class="lh left"><div class="lh-logo">℞</div><div><div class="lh-names"><span class="lh-hi">${esc(Lh.clinicHi)}</span><span class="lh-en">${esc(Lh.clinic)}</span></div><div class="lh-doc">${esc(Lh.doctor)} <span style="font-weight:500">· ${esc(Lh.doctorHi)}</span></div><div class="lh-deg">${esc(Lh.degrees)} · Reg. ${esc(Lh.reg)}</div><div class="lh-contact">${esc(Lh.address)} · ${esc(Lh.phone)}<br>${esc(Lh.timings)}</div></div></div>`
  :`<div class="lh center"><div class="lh-names"><span class="lh-hi">${esc(Lh.clinicHi)}</span><span class="lh-en">| ${esc(Lh.clinic)}</span></div><div class="lh-doc">${esc(Lh.doctor)}</div><div class="lh-deg">${esc(Lh.degrees)} · Reg. No. ${esc(Lh.reg)}</div><div class="lh-contact">${esc(Lh.address)} · ${esc(Lh.phone)}</div><div class="lh-contact">${esc(Lh.timings)}</div></div>`;
 const meds=rx.meds.length?rx.meds.map(m=>{const d=DRUG[m.id],tm=TIMING[m.timing]||TIMING.any;
  return `<li><div class="m-en"><b>${FORM[d.f]} ${esc(d.g)} ${esc(d.s.toUpperCase())}</b> <small>(${esc(d.b)})</small></div><div class="m-sig">${esc(doseEn(m,d))} · ${esc(sigCode(m))} · ${esc([FREQ[m.freq]?FREQ[m.freq].en:'',tm.en].filter(Boolean).join(', '))} · ${esc(daysEn(m))}</div>${rx.hindi?`<div class="m-hi">${esc(doseHi(m,d))} · ${esc(FREQ[m.freq]?FREQ[m.freq].hi:'')}${tm.hi?' · '+tm.hi:''} · ${esc(daysHi(m))}</div>`:''}</li>`;}).join('')
  :'<li style="list-style:none;color:var(--paper-muted)">Medicines appear here as you add them.</li>';
 return `<div class="parchi" style="--lh:${esc(Lh.ink)}"><div class="wm">DEMO · Chiranjeev Kumar</div>${head}
 <div class="prow"><div><span>Name</span><b>${esc(p.name)}</b></div><div><span>Age/Sex</span>${esc(p.age)} / ${esc(p.sex)}</div><div><span>Date</span>${fmtD(today)}</div><div><span>UHID</span>${esc(p.uhid||'—')}</div><div><span>Wt</span>${v.wt?esc(v.wt)+' kg':'—'}</div><div><span>Token</span>${esc(p.tok)}</div></div>
 <div class="pbody"><div class="pleft">
  ${rx.co?`<div><h5>C/O</h5><p>${esc(rx.co)}</p></div>`:''}
  ${vit.length?`<div><h5>O/E</h5><div class="pv">${vit.map(x=>`<span>${x[0]}</span><span class="${['crit','warn'].includes(vflag(x[2],x[1]))?'hi':''}">${esc(x[1])} ${x[3]}</span>`).join('')}</div></div>`:''}
  ${p.all.length?`<div><h5>Allergy</h5><p style="color:#B2261E;font-weight:600">${esc(p.all.join(', '))}</p></div>`:''}
  ${rx.dx?`<div><h5>Diagnosis</h5><p><b>${esc(rx.dx)}</b></p></div>`:''}
  ${rx.inv.length?`<div><h5>Investigations</h5><p>${esc(rx.inv.join(', '))}</p></div>`:''}
 </div><div class="pright" style="display:flex;flex-direction:column;gap:8px"><div class="rxs">℞</div><ol class="pmeds">${meds}</ol>
  ${rx.adv.length?`<div class="padv"><h5>Advice</h5>${rx.adv.map(i=>`<div>• ${esc(X.ADVICE[i].en)}${rx.hindi?` <span class="hi">/ ${esc(X.ADVICE[i].hi)}</span>`:''}</div>`).join('')}</div>`:''}
 </div></div>
 <div class="pfu"><div class="fu">${fuDate?`Follow-up: ${fmtD(fuDate)}${rx.hindi?` <span style="color:var(--lh)">(${esc(fmtHi(fuDate))} को दिखाएँ)</span>`:''}`:'&nbsp;'}</div><div class="sign"><div class="s">${esc(Lh.doctor)}</div><div class="l">${esc(Lh.doctor)} · ${esc(Lh.reg)}</div></div></div>
 <div class="pfoot"><span>Generic names as per NMC guidance · Valid for 7 days</span><span>Made with Arogya Rx</span></div></div>`;}
function renderPapers(){const p=cur()||S.patients[2];const h=parchi(p);['#heroPaper','#shotPaper','#sidePaper','#studioPaper'].forEach(s=>{const e=$(s);if(e)e.innerHTML=h;});const n=$('#nmc');if(n&&cur())n.innerHTML=nmcHTML(cur());}

/* ---------------- app shell ---------------- */
const VIEWS=[['home','home'],['schedule','cal'],['intake','wa'],['opd','rx'],['patients','users'],['security','lock'],['settings','gear']];
let VIEW='home';
function renderApp(){
 $('#sidebar').innerHTML=VIEWS.map(v=>`<button data-go="${v[0]}" ${VIEW===v[0]?'aria-current="page"':''}>${svg(v[1])}<span>${esc(t('app.'+v[0]))}</span></button>`).join('')+
  `<button data-act="logout">${svg('out')}<span>${esc(t('app.logout'))}</span></button><div class="doc"><span class="av">${esc(S.lh.doctor.replace(/^Dr\.?\s*/,'').split(' ').map(w=>w[0]).join('').slice(0,2))}</span><span><b>${esc(S.lh.doctor)}</b>${esc(S.lh.clinic)}</span></div>`;
 ({home:vHome,schedule:vSchedule,intake:vIntake,opd:vOpd,patients:vPatients,security:vSecurity,settings:vSettings})[VIEW]();
}
function go(v){VIEW=v;location.hash='#app-'+v;}

/* HOME */
const QUICK=['Diabetic patients with HbA1c above 7','Who is due for follow-up this week?','Summarise Ramesh Prasad','How many patients came on WhatsApp today?','Patients with allergies'];
let chatLog=[];
function answer(q){const s=q.toLowerCase();const P=S.patients;
 if(/hba1c|diabet|sugar/.test(s)){const r=P.filter(p=>p.hba1c&&p.hba1c>7||p.cond.some(c=>/T2DM/.test(c))&&(p.hba1c||0)>7);return `Found ${r.length} diabetic patients with HbA1c above 7%:<ul>${r.map(p=>`<li><b>${esc(p.name)}</b>, ${p.age}${p.sex}, HbA1c ${p.hba1c}% · token ${p.tok}</li>`).join('')}</ul>`;}
 if(/follow|due|recall/.test(s)){return `5 follow-ups are due in the next 5 days:<ul>${[['Ramesh Prasad','T2DM review',1],['Kavita Sharma','Thyroid review',2],['Mahesh Yadav','HTN review',2],['Rubi Khatoon','ANC follow-up',4],['Vinod Paswan','COPD review',5]].map(f=>`<li><b>${f[0]}</b> · ${f[1]} · ${fmtD(addDays(f[2]))}</li>`).join('')}</ul>WhatsApp reminders go out automatically the day before.`;}
 if(/ramesh|summar/.test(s)){const p=P.find(x=>x.tok===3);return `<b>Ramesh Prasad, 52M</b> · T2DM 6 years, HTN. HbA1c falling: 8.4 → 7.2% since February. Today: tingling in both feet for 2 months, GRBS 186. Consider screening for peripheral neuropathy. Current: Metformin SR 500 BD, Glimepiride 1 mg OD, Atorvastatin 10 HS.`;}
 if(/whatsapp|online|book/.test(s)){const n=S.appts.filter(a=>a.day===0&&a.src==='WhatsApp').length;return `${n} of today's ${S.appts.filter(a=>a.day===0).length} appointments were booked on WhatsApp.`;}
 if(/allerg/.test(s)){const r=P.filter(p=>p.all.length);return `${r.length} patients today have recorded allergies:<ul>${r.map(p=>`<li><b>${esc(p.name)}</b>: ${esc(p.all.join(', '))}</li>`).join('')}</ul>`;}
 const hit=P.filter(p=>s.split(/\s+/).some(w=>w.length>2&&(p.name.toLowerCase().includes(w)||p.co.toLowerCase().includes(w)||p.cond.join(' ').toLowerCase().includes(w))));
 if(hit.length)return `Matching patients:<ul>${hit.map(p=>`<li><b>${esc(p.name)}</b> · ${esc(p.co)}</li>`).join('')}</ul>`;
 return 'In the full product, Ask Arogya searches all your records in plain language. In this demo, try one of the suggestions.';}
function vHome(){const P=S.patients;const done=P.filter(p=>p.status==='done');const todays=S.appts.filter(a=>a.day===0&&a.status!=='cancelled').sort((a,b)=>a.time.localeCompare(b.time));
 const avg=done.length?done.reduce((s,p)=>s+p.time,0)/done.length:0;
 $('#view').innerHTML=`<div class="view-h"><div><h2>${esc(t('home.hi'))} ${esc(S.lh.doctor.split(' ').slice(0,2).join(' '))}, ${esc(t('home.help'))}</h2><p>${today.toLocaleDateString(LANG==='hi'?'hi-IN':'en-IN',{weekday:'long',day:'numeric',month:'long'})} · ${esc(S.lh.clinic)}</p></div><button class="btn primary" data-go="opd">${svg('rx')} ${LANG==='hi'?'OPD खोलें':'Open OPD'}</button></div>
 <div class="kpis"><div class="kpi"><span>${LANG==='hi'?'आज देखे':'Seen today'}</span><b class="mono">${done.length}</b><small>of ${todays.length} appointments</small></div><div class="kpi"><span>${LANG==='hi'?'औसत समय':'Avg time per parchi'}</span><b class="mono">${fmtT(avg)}</b><small>save to save</small></div><div class="kpi"><span>WhatsApp</span><b class="mono">${S.sent}</b><small>parchis sent in Hindi</small></div><div class="kpi"><span>${LANG==='hi'?'मरीज़ों की बचत':'Patients saved'}</span><b class="mono">${inr(done.reduce((s,p)=>s+cost(p.rx).s,0))}</b><small>generics vs brands</small></div></div>
 <div class="grid2"><div class="card assistant"><h3>✦ Ask Arogya</h3><form class="q" id="askForm"><input class="inp" id="askIn" placeholder="${esc(t('home.ask'))}" autocomplete="off"><button class="btn primary" type="submit">Ask</button></form>
  <div class="chips" style="margin-top:10px">${QUICK.map(q=>`<button class="chip" data-ask="${esc(q)}">${esc(q)}</button>`).join('')}</div>
  <div class="ans" id="ans">${chatLog.map(m=>`<div class="msg ${m[0]}">${m[1]}</div>`).join('')||'<div class="msg ai">Ask about your patients in plain words. Try a suggestion above.</div>'}</div></div>
  <div class="card"><h3>${esc(t('home.today'))}</h3>${todays.map(a=>{const p=a.pid&&P.find(x=>x.id===a.pid);return `<div class="appt"><span class="av">${esc(a.name.split(' ').map(w=>w[0]).join('').slice(0,2))}</span><span style="min-width:0"><b>${esc(a.name)}</b><br><small style="color:var(--muted)">${esc(a.time)} · ${esc(a.reason)} · ${esc(a.src)}</small></span>${p?(p.status==='done'?'<span class="tag good">Seen</span>':`<button class="btn sm" data-start="${p.id}">${esc(t('home.start'))}</button>`):`<span class="tag">${esc(a.status)}</span>`}</div>`;}).join('')}</div></div>`;
 $('#askForm').addEventListener('submit',e=>{e.preventDefault();ask($('#askIn').value);});}
function ask(q){q=(q||'').trim();if(!q)return;chatLog.push(['me',esc(q)]);chatLog.push(['ai',answer(q)]);chatLog=chatLog.slice(-6);vHome();}

/* SCHEDULE */
let sDay=0;
function vSchedule(){const list=S.appts.filter(a=>a.day===sDay).sort((a,b)=>a.time.localeCompare(b.time));
 $('#view').innerHTML=`<div class="view-h"><div><h2>${esc(t('app.schedule'))}</h2><p>Patients book on WhatsApp or at the desk. Arrived patients get a token in your OPD queue.</p></div></div>
 <div class="dates">${[0,1,2,3,4,5,6].map(d=>{const dt=addDays(d);return `<button class="date" data-day="${d}" aria-pressed="${d===sDay}"><small>${dt.toLocaleDateString('en-IN',{weekday:'short'})}</small><b>${dt.getDate()}</b><small>${S.appts.filter(a=>a.day===d&&a.status!=='cancelled').length} appts</small></button>`;}).join('')}</div>
 <div class="card"><h3>${fmtD(addDays(sDay))} · ${list.length} appointments</h3>${list.length?list.map(a=>`<div class="slot ${a.status==='cancelled'?'cancelled':''}"><b class="mono">${esc(a.time)}</b><span class="av">${esc(a.name.split(' ').map(w=>w[0]).join('').slice(0,2))}</span><span style="min-width:0"><b>${esc(a.name)}</b> <span class="tag ${a.src==='WhatsApp'?'good':''}">${esc(a.src)}</span><br><small style="color:var(--muted)">${esc(a.reason)} · ${esc(a.phone)}</small></span><span class="acts">${a.status==='booked'?`<button class="btn sm primary" data-arrive="${a.id}">Mark arrived</button><button class="btn sm" data-resched="${a.id}">+1 day</button><button class="btn sm" data-cancel="${a.id}">Cancel</button>`:`<span class="tag ${a.status==='seen'?'good':a.status==='cancelled'?'crit':'acc'}">${esc(a.status)}</span>`}</span></div>`).join(''):'<div class="empty">No appointments. Add one below.</div>'}</div>
 <form class="card addform" id="apptForm"><div class="field"><label for="ap-name">Patient name</label><input class="inp" id="ap-name" required></div><div class="field"><label for="ap-phone">Mobile</label><input class="inp" id="ap-phone"></div><div class="field"><label for="ap-time">Time</label><input class="inp" id="ap-time" type="time" value="11:20" required></div><div class="field"><label for="ap-reason">Reason</label><input class="inp" id="ap-reason" placeholder="e.g. fever, BP check"></div><button class="btn primary" type="submit">${esc(t('common.add'))}</button></form>`;
 $('#apptForm').addEventListener('submit',e=>{e.preventDefault();S.appts.push({id:'n'+Date.now(),pid:null,name:$('#ap-name').value.trim(),phone:$('#ap-phone').value||'—',day:sDay,time:$('#ap-time').value,reason:$('#ap-reason').value||'General check-up',src:'Desk',status:'booked'});toast('Appointment added. WhatsApp confirmation sent (demo).');vSchedule();});}
function arrive(id){const a=S.appts.find(x=>x.id===id);if(!a)return;const tok=Math.max(...S.patients.map(p=>p.tok))+1;
 const p={tok,id:'p'+tok,name:a.name,age:35,sex:'F',phone:a.phone,uhid:'SC-0'+(600+tok),status:'waiting',co:a.reason,cond:[],all:[],visits:[],rx:newRx(),slot:a.time,src:a.src};p.rx.co=a.reason;
 p.voice={text:'Teen din se bukhar aur body ache. BP 120 by 80, temp 100.6. Viral fever. Paracetamol 650 teen baar, cetirizine raat ko. CBC. Teen din baad.',tpl:'fever',co:a.reason,v:{bp:'120/80',temp:'100.6'},dx:'Acute febrile illness (viral)'};
 if(/thyroid/i.test(a.reason)){p.cond=['Hypothyroid'];p.age=38;}
 S.patients.push(p);a.pid=p.id;a.status='arrived';a.day=0;toast(`Token ${tok} created for ${a.name}`);}

/* WHATSAPP HUB: inbox, automations, recall, photo scan */
let WAT='inbox',WATH='kavita',RSEG='hba1c',RSENT=null;
const AUTO=Object.fromEntries(X.WA_AUTO.map(a=>[a[0],a[1]]));
function waTabs(){const T=[['inbox',hiOr('Inbox','इनबॉक्स'),X.WA_THREADS.length],['auto',hiOr('Automations','ऑटोमेशन'),Object.values(AUTO).filter(Boolean).length],['recall',hiOr('Recall','रिकॉल'),''],['scan',hiOr('Photo scan','फ़ोटो स्कैन'),'']];
 return `<div class="watabs" role="tablist">${T.map(x=>`<button role="tab" data-wat="${x[0]}" aria-selected="${WAT===x[0]}">${esc(x[1])}${x[2]!==''?` <span class="n">${x[2]}</span>`:''}</button>`).join('')}</div>`;}
function vIntake(){
 const H=(en,hi)=>LANG==='hi'?hi:en;
 const body=WAT==='inbox'?waInbox():WAT==='auto'?waAuto():WAT==='recall'?waRecall():waScan();
 $('#view').innerHTML=`<div class="view-h"><div><h2>WhatsApp</h2><p>${H('Your clinic number answers, books, reminds and follows up in Hindi. You see only what needs you.','आपका क्लिनिक नंबर हिंदी में जवाब, बुकिंग, रिमाइंडर और फ़ॉलो-अप करता है। आपके पास सिर्फ़ वही आता है जिसमें आपकी ज़रूरत है।')}</p></div><span class="tag good">${svg('wa')} ${H('Business number connected (demo)','बिज़नेस नंबर जुड़ा है (डेमो)')}</span></div>${waTabs()}${body}`;
 if(WAT==='scan'){sampleShot();const dz=$('#dropZone');['dragenter','dragover'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add('over');}));['dragleave','drop'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove('over');}));dz.addEventListener('drop',e=>{const f=e.dataTransfer&&e.dataTransfer.files[0];if(f)readFile(f);});}
 const b=$('#waBody');if(b)b.scrollTop=b.scrollHeight;}
function waInbox(){const th=X.WA_THREADS.find(x=>x.id===WATH)||X.WA_THREADS[0];
 const msgs=th.play?S.chat:th.msgs;
 return `<div class="wa-hub"><div class="threads">${X.WA_THREADS.map(x=>`<button class="thread ${x.id===th.id?'on':''}" data-wath="${x.id}"><span class="av">${esc(x.name.replace(/^\+.*/,'#').split(' ').map(w=>w[0]).join('').slice(0,2))}</span><span class="th-m"><span class="th-t"><b>${esc(x.name)}</b><small class="mono">${x.time}</small></span><span class="th-l">${esc(x.id==='kavita'&&S.chat.length?S.chat[S.chat.length-1][1]:x.last)}</span><span class="tag ${x.tcls}">${esc(x.tag)}</span></span></button>`).join('')}</div>
 <div class="th-view"><div class="phone"><div class="wa-top"><span class="av"></span><span><b>${esc(th.name)}</b><small>${esc(S.lh.clinic)} · auto-replies on</small></span></div><div class="wa-body" id="waBody">${msgs.map(bubble).join('')||'<div class="wa-hint">Press “Play an incoming booking”.</div>'}</div></div>
  <div class="th-side">${th.play?`<p>${H2('A new patient books on WhatsApp. The assistant offers slots, takes symptoms and reports, and prepares a summary for you.','नया मरीज़ WhatsApp पर बुक करता है। सहायक समय देता है, तकलीफ़ और रिपोर्ट लेता है और आपके लिए सारांश बनाता है।')}</p>
   <div class="row-btn"><button class="btn primary" data-act="play-chat" ${S.chatDone||S.chat.length?'disabled':''}>${S.chatDone?'Booking received':S.chat.length?'Receiving…':'Play an incoming booking'}</button>${S.chatDone?'<button class="btn" data-act="reset-chat">Replay</button>':''}</div>
   ${S.chatDone?`<div class="summary"><b>Pre-visit summary · Kavita Sharma, 38F · token 9 · 10:40</b><br>Known hypothyroid on levothyroxine. Fatigue and hair fall for 2 weeks. TSH report attached (7.8 mIU/L, high). Suggest reviewing thyroxine dose.<div style="margin-top:8px"><button class="btn sm primary" data-act="chat-to-queue">Add to today's queue</button></div></div>`:''}`
   :`<p class="th-note">${svg('shield')} ${esc(th.note||'Sent automatically from your clinic’s WhatsApp Business number.')}</p>`}</div></div></div>`;}
const H2=(en,hi)=>LANG==='hi'?hi:en;
function waAuto(){const on=X.WA_AUTO.filter(a=>AUTO[a[0]]);
 const per={confirm:1,remind:2,turn:1,rx:1,voice:1,refill:.3,followup:.6,reports:1};
 const msgs=Math.round(40*26*on.reduce((t,a)=>t+(per[a[0]]||1),0));
 return `<div class="auto-sum card"><div><b class="mono">${on.length}/${X.WA_AUTO.length}</b><small>${H2('automations on','ऑटोमेशन चालू')}</small></div><div><b class="mono">${msgs.toLocaleString('en-IN')}</b><small>${H2('messages a month at 40 patients a day','संदेश हर महीने, रोज़ 40 मरीज़ पर')}</small></div><div><b class="mono">≈ ${inr(msgs*0.115)}</b><small>${H2('WhatsApp fees at about 12 paise each','लगभग 12 पैसे प्रति संदेश')}</small></div></div>
 <div class="autos">${X.WA_AUTO.map(a=>{const id='au-'+a[0],o=OPEN.has(id);return `<div class="auto ${AUTO[a[0]]?'':'off'}"><div class="auto-h"><label class="toggle"><input type="checkbox" data-auto="${a[0]}" ${AUTO[a[0]]?'checked':''} aria-label="${esc(a[2])}"></label><span class="auto-t"><b>${esc(LANG==='hi'?a[3]:a[2])}</b><small>${esc(a[4])}</small></span><button class="btn sm ghost" type="button" data-disc="${id}" aria-expanded="${o}" aria-controls="${id}">${H2('Preview','देखें')}</button></div>${disc(id,`<div class="auto-prev"><div class="bub">${esc(a[5])}<div class="tm">✓✓</div></div></div>`)}</div>`;}).join('')}</div>
 <p class="fine-note">${H2('Patients opt in at booking. Reminders use Meta’s low-cost “utility” templates; offers and greetings are never sent.','मरीज़ बुकिंग के समय सहमति देते हैं। रिमाइंडर Meta के सस्ते “utility” टेम्पलेट से जाते हैं; ऑफ़र या शुभकामना संदेश नहीं भेजे जाते।')}</p>`;}
function waRecall(){const seg=X.RECALL.find(r=>r.id===RSEG);
 return `<div class="recall"><div class="rc-segs">${X.RECALL.map(r=>`<button class="rc-seg ${r.id===RSEG?'on':''}" data-rseg="${r.id}"><b class="mono">${r.n}</b><span>${esc(LANG==='hi'?r.hi:r.en)}</span></button>`).join('')}
  <div class="rc-send"><button class="btn primary" data-act="recall-send" ${RSENT===RSEG?'disabled':''}>${svg('wa')} ${RSENT===RSEG?H2('Sent','भेजा गया'):H2(`Send to ${seg.n} patients`,`${seg.n} मरीज़ों को भेजें`)}</button><small>${H2('Each patient gets their own name and a one-tap booking reply.','हर मरीज़ को उसके नाम से संदेश और एक टैप में बुकिंग।')}</small></div>
  ${RSENT===RSEG?`<div class="rc-res" id="rcRes">${[['Delivered',.96],['Read',.81],['Booked a token',.34]].map(x=>`<div><b class="mono" data-to="${Math.round(seg.n*x[1])}">0</b><small>${x[0]}</small></div>`).join('')}<p class="fine-note">${H2('Sample result for the demo.','डेमो के लिए सैंपल नतीजा।')}</p></div>`:''}</div>
  <div class="phone sm"><div class="wa-top"><span class="av"></span><span><b>${esc(S.lh.clinic)}</b><small>${H2('Preview','पूर्वावलोकन')}</small></span></div><div class="wa-body"><div class="bub">${esc(seg.msg.replace('{name}','रमेश'))}<div class="tm">✓✓</div></div><div class="bub in">1</div><div class="bub">टोकन बुक हो गया ✔ गुरुवार सुबह 8:40।<div class="tm">✓✓</div></div></div></div></div>`;}
function waScan(){return `<div class="grid2 scan-grid"><div class="card"><h3>Photo intake</h3><div class="seg" role="group" aria-label="Document type" style="margin-bottom:10px"><button data-doc="rx" aria-pressed="${S.doc==='rx'}">Old prescription</button><button data-doc="lab" aria-pressed="${S.doc==='lab'}">Lab report</button></div>
  <div class="drop-zone" id="dropZone"><div class="shot-img" id="shotWrap"></div><div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center"><label class="btn primary" for="fileIn">Upload a photo</label><input id="fileIn" type="file" accept="image/*" capture="environment" hidden><button class="btn" data-act="sample-shot">Use sample photo</button></div><small style="color:var(--muted)">Drop a JPG or PNG here. On a phone, this opens the camera. Patients can also send it on WhatsApp.</small></div></div>
 <div class="card"><div class="fs-h"><span class="lbl">Extracted for ${esc((cur()||{}).name||'—')}</span><span class="tag" id="intakeState">Waiting</span></div><div id="extract"></div></div></div>`;}
function recallCount(){const r=$('#rcRes');if(!r)return;r.querySelectorAll('[data-to]').forEach(b=>{const to=+b.dataset.to,t0=performance.now();(function st(t){const k=Math.min(1,(t-t0)/(reduce?1:1200));b.textContent=Math.round(to*k);if(k<1)requestAnimationFrame(st);})(t0);});}
function bubble(m){return `<div class="bub ${m[0]==='in'?'in':''}">${esc(m[1])}<div class="tm">${m[0]==='in'?'':'✓✓'}</div></div>`;}
function playChat(){S.chat=[];S.chatDone=false;WAT='inbox';WATH='kavita';vIntake();let i=0;const step=()=>{if(i>=X.INTAKE_CHAT.length){S.chatDone=true;if(VIEW==='intake'&&WAT==='inbox')vIntake();return;}S.chat.push(X.INTAKE_CHAT[i++]);const b=$('#waBody');if(b){b.insertAdjacentHTML('beforeend',bubble(S.chat[S.chat.length-1]));b.scrollTop=b.scrollHeight;}setTimeout(step,reduce?0:900);};step();}
const SAMPLE={
 rx:{title:'Handwritten prescription · 3 Mar 2026',lines:['C/O cough, fever x 4 days','Rx','1) T. Azee 500   1-0-0 x 3d','2) T. Pan D       1-0-0 BF x 10d','3) Syp Ascoril LS  2 tsp TDS','4) T. Dolo 650   SOS','Adv: CBC, steam'],
  items:[['Medicine','AZITHROMYCIN 500 mg · 1-0-0 · 3 days',96,'azi500'],['Medicine','PANTOPRAZOLE + DOMPERIDONE · before food · 10 days',91,'rabdsr'],['Medicine','AMBROXOL + LEVOSALBUTAMOL syrup · 10 ml thrice daily',88,'coughls'],['Medicine','PARACETAMOL 650 mg · when needed',97,'pcm650'],['Complaint','Cough and fever for 4 days',93,null],['Test','CBC',90,null]]},
 lab:{title:'Lab report · Shree Diagnostics · 22 Oct 2026',lines:['Test            Result    Ref range','Haemoglobin     9.1 g/dL  12-15','HbA1c           7.2 %     <5.7','FBS             132 mg/dL 70-100','S. Creatinine   1.1 mg/dL 0.6-1.2','TSH             3.4 mIU/L 0.4-4.0'],
  items:[['Lab','Haemoglobin 9.1 g/dL · low (12–15)',98,'low'],['Lab','HbA1c 7.2% · high (<5.7)',97,'high'],['Lab','FBS 132 mg/dL · high (70–100)',96,'high'],['Lab','S. creatinine 1.1 mg/dL · normal',95,'ok'],['Lab','TSH 3.4 mIU/L · normal',94,'ok']]}};
function sampleCanvas(kind){const c=document.createElement('canvas');c.width=640;c.height=kind==='rx'?470:400;const g=c.getContext('2d');const p=cur();
 g.fillStyle='#fbfaf6';g.fillRect(0,0,c.width,c.height);
 if(kind==='rx'){g.strokeStyle='#c9cfdc';for(let y=110;y<c.height;y+=42){g.beginPath();g.moveTo(24,y);g.lineTo(616,y);g.stroke();}
  g.fillStyle='#7a1f2b';g.font='700 26px Georgia, serif';g.fillText('Jha Clinic',24,46);g.font='15px Georgia, serif';g.fillText('Dr. S. N. Jha, MBBS · Sitamarhi',24,72);
  g.fillStyle='#22306b';g.font='500 30px Caveat, "Segoe Print", cursive';let y=104;g.fillText((p?p.name+'   '+p.age+'/'+p.sex:'Patient'),40,y);y+=42;
  SAMPLE.rx.lines.forEach((ln,i)=>{g.save();g.translate(40+(i%2)*4,y);g.rotate((i%3-1)*0.006);g.fillText(ln,0,0);g.restore();y+=42;});}
 else{g.fillStyle='#0f3d6e';g.fillRect(0,0,c.width,64);g.fillStyle='#fff';g.font='700 22px Arial, sans-serif';g.fillText('SHREE DIAGNOSTICS',24,40);g.font='13px Arial';g.fillText('Muzaffarpur',520,40);
  g.fillStyle='#222';g.font='15px Arial';g.fillText('Patient: '+(p?p.name+'  '+p.age+'/'+p.sex:'—')+'      Date: 22-10-2026',24,96);
  let y=140;SAMPLE.lab.lines.forEach((ln,i)=>{g.font=(i?'':'600 ')+'15px "Courier New", monospace';g.fillText(ln,24,y);if(!i)g.fillRect(24,y+8,592,1);y+=40;});
  g.font='italic 12px Arial';g.fillStyle='#777';g.fillText('Sample report for demo only',24,c.height-18);}
 return c;}
function showShot(src){const w=$('#shotWrap');if(!w)return;w.innerHTML='';if(src instanceof HTMLCanvasElement)w.appendChild(src);else{const im=new Image();im.alt='Uploaded document';im.src=src;w.appendChild(im);}
 const sl=document.createElement('div');sl.className='scanline';w.appendChild(sl);$('#intakeState').className='tag acc';$('#intakeState').textContent='Reading…';$('#extract').innerHTML='<p style="color:var(--muted);font-size:14px">Finding text, separating medicines from notes, matching names to the catalogue…</p>';
 setTimeout(()=>{sl.remove();renderExtract();},reduce?0:1400);}
function renderExtract(){const s=SAMPLE[S.doc];const p=cur();const st=$('#intakeState');if(!st)return;st.className='tag good';st.textContent='Done · '+s.items.length+' items';
 $('#extract').innerHTML=`<div style="font-weight:600;margin:6px 0 4px">${esc(s.title)}</div>${S.userShot?'<p style="font-size:13px;color:var(--warn)">Demo: your photo is shown, but the result below is a sample. The real app reads it with document AI.</p>':''}
 ${s.items.map(it=>`<div class="ex-row"><span class="tag ${it[0]==='Lab'?(['low','high'].includes(it[3])?'warn':'good'):'acc'}">${it[0]}</span><span>${esc(it[1])}</span><span class="conf">${it[2]}%</span></div>`).join('')}
 <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><button class="btn primary sm" data-act="intake-history">Add to ${esc(p?p.name:'patient')}'s history</button><button class="btn sm" data-act="intake-rx">${S.doc==='rx'?'Continue these medicines today':'Add abnormal values to notes'}</button></div>`;}
function sampleShot(){S.userShot=false;showShot(sampleCanvas(S.doc));}
function readFile(f){if(!/^image\//.test(f.type)){toast('Please choose a photo (JPG or PNG)');return;}const r=new FileReader();r.onload=()=>{S.userShot=true;showShot(r.result);};r.readAsDataURL(f);}
function intakeTo(kind){const p=cur();if(!p){toast('Open a patient in OPD first');return;}const s=SAMPLE[S.doc];
 if(kind==='history'){p.visits.unshift([S.doc==='rx'?'3 Mar 2026':'22 Oct 2026',S.doc==='rx'?'Old prescription (scanned)':'Lab report (scanned)',s.items.map(i=>i[1].split(' · ')[0]).join(', ')]);toast(`Added to ${p.name}'s history`);}
 else{if(S.doc==='rx'){s.items.filter(i=>i[3]&&DRUG[i[3]]).forEach(i=>p.rx.meds.push(mkMed([i[3],i[3]==='pcm650'?'SOS':i[3]==='coughls'?'1-1-1':'1-0-0',i[3]==='rabdsr'?'before':'after',5])));toast("Medicines added to today's parchi");}
  else{const ab=s.items.filter(i=>['low','high'].includes(i[3])).map(i=>i[1].split(' · ')[0]);p.rx.co=(p.rx.co?p.rx.co+' ':'')+'Reports: '+ab.join(', ')+'.';toast('Abnormal values added to complaints');}
  go('opd');}}

/* OPD */
function vOpd(){$('#view').innerHTML=`<div class="view-h"><div><h2>${esc(t('app.opd'))}</h2><p>Call a token and press <b>Listen</b>: Arogya follows the doctor–patient conversation and drafts the parchi. Or type shorthand like <span class="mono">pcm tds 3d</span>.</p></div><button class="btn" data-act="reset">Reset demo</button></div>
 <div class="opd"><aside class="queue"><h3><span>Tokens</span><span class="mono" id="qCount"></span></h3><div class="q-list" id="qList"></div></aside><div class="consult" id="consult"></div><aside class="side"><div class="side-h"><b>Live parchi</b><span class="tag acc">updates as you type</span></div><div id="nmc"></div><div id="sidePaper"></div></aside></div>`;
 renderQueue();renderConsult();}
function renderQueue(){const P=S.patients;const q=$('#qList');if(!q)return;$('#qCount').textContent=P.filter(p=>p.status==='done').length+'/'+P.length;
 q.innerHTML=P.map(p=>`<button class="q-item ${p.id===S.cur?'on':''} ${p.status==='done'?'done':''}" data-open="${p.id}"><span class="q-tok">${p.tok}</span><span style="min-width:0"><span class="q-name">${esc(p.name)} ${p.all.length?'<span class="tag crit" style="font-size:10px">ALLERGY</span>':''}</span><span class="q-sub">${p.status==='done'?'Done · '+fmtT(p.time):p.status==='with'?'With doctor':esc(p.age+p.sex+' · '+p.co)}</span></span></button>`).join('');}
function renderConsult(){const p=cur();const el=$('#consult');if(!el)return;
 if(!p){el.innerHTML='<div class="empty">All tokens seen.</div>';renderPapers();return;}const rx=p.rx;
 el.innerHTML=`<div class="pt-head"><div><div class="pt-name">${esc(p.name)}</div><div class="pt-meta">${esc(p.age)} yrs · ${p.sex==='M'?'Male':'Female'} · Token ${p.tok} · ${esc(p.uhid)} · ${esc(p.phone)}</div>
  <div class="pt-tags">${p.cond.map(c=>`<span class="tag acc">${esc(c)}</span>`).join('')}${p.all.map(a=>`<span class="tag crit">Allergic: ${esc(a)}</span>`).join('')}${!p.cond.length&&!p.all.length?'<span class="tag">No known conditions</span>':''}</div></div>
  <div class="timer"><span class="mono" id="tmr">0:00</span><small>${p.status==='done'?'final time':'time on this parchi'}</small></div></div>
 ${p.summary?`<div class="summary"><b>Summary of past visits:</b> ${esc(p.summary)}</div>`:''}
 <div class="tools"><button class="tool tool-amb" data-act="amb-open" ${p.status==='done'?'disabled':''}><span class="ic">${svg('mic')}</span><span><b>Listen to the consult</b><span>Doctor, patient and staff talk in Hinglish; Arogya drafts the parchi</span></span><span class="tool-new">New</span></button><button class="tool" data-act="goscan"><span class="ic">${svg('cam')}</span><span><b>Scan old parchi or report</b><span>Photo to medicines and lab values</span></span></button></div>
 <div id="amb"></div>
 <fieldset class="fs" id="f-co"><div class="fs-h"><label for="in-co">Complaints</label></div><textarea class="inp" id="in-co" data-bind="co" rows="2">${esc(rx.co)}</textarea><div class="chips">${X.COMPLAINTS.map(c=>`<button class="chip" data-addco="${esc(c)}">+ ${esc(c)}</button>`).join('')}</div></fieldset>
 <fieldset class="fs" id="f-v"><div class="fs-h"><span class="lbl">Vitals</span><span class="tag">flags update as you type</span></div><div class="vitals">${[['bp','BP','120/80'],['pulse','Pulse','72'],['temp','Temp °F','98.6'],['spo2','SpO₂ %','98'],['grbs','GRBS','110'],['wt','Weight kg','60']].map(x=>`<label class="vital"><span>${x[1]}</span><input data-bind="v.${x[0]}" value="${esc(rx.v[x[0]])}" placeholder="${x[2]}" class="${vflag(x[0],rx.v[x[0]])}" inputmode="decimal"></label>`).join('')}</div></fieldset>
 <fieldset class="fs" id="f-dx"><div class="fs-h"><label for="in-dx">Diagnosis · one-tap templates</label></div><div class="chips">${Object.keys(X.TPL).map(k=>`<button class="chip" data-tpl="${k}">${esc(X.TPL[k].name)} <span class="n">${X.TPL[k].meds.length} Rx</span></button>`).join('')}</div><input class="inp" id="in-dx" data-bind="dx" value="${esc(rx.dx)}" placeholder="Provisional diagnosis"></fieldset>
 <fieldset class="fs" id="f-meds"><div class="fs-h"><label for="medSearch">Medicines</label><span class="tag good">Jan Aushadhi price shown</span></div><div class="search"><input class="inp mono-in" id="medSearch" placeholder="Shorthand works: pcm tds 3d · azi od 3 · pan bf 14d" autocomplete="off" spellcheck="false"><div class="drop" id="drop" hidden></div></div>
 <div class="shint"><span>od · bd · tds · hs · sos</span><span>af · bf</span><span>5d · 2w · 1m</span><span>typos are fine</span></div>
 <div class="favs"><span class="lbl">Your usual</span>${X.FAVS.map(id=>`<button class="chip" data-fav="${id}">${esc(DRUG[id].al[0]||DRUG[id].g)}</button>`).join('')}${X.LASTRX[p.tok]&&p.status!=='done'?`<button class="chip rep" data-act="repeat">${svg('next')} Repeat ${esc(X.LASTRX[p.tok].date)} (${X.LASTRX[p.tok].meds.length})</button>`:''}</div><div class="meds-wrap" id="medsTable"></div><div class="alerts" id="alerts"></div><div class="cost" id="cost"></div></fieldset>
 <div class="two"><fieldset class="fs"><div class="fs-h"><span class="lbl">Investigations</span></div><div class="chips">${X.INV.map(i=>`<button class="chip ${rx.inv.includes(i)?'on':''}" data-inv="${esc(i)}">${esc(i)}</button>`).join('')}</div></fieldset>
 <fieldset class="fs"><div class="fs-h"><span class="lbl">Advice (English + हिंदी)</span></div><div class="chips">${X.ADVICE.map((a,i)=>`<button class="chip ${rx.adv.includes(i)?'on':''}" data-adv="${i}" title="${esc(a.hi)}">${esc(LANG==='hi'?a.hi:a.en)}</button>`).join('')}</div></fieldset></div>
 <fieldset class="fs" id="f-fu"><div class="fs-h"><span class="lbl">Follow-up</span></div><div class="chips">${[0,3,5,7,10,14,30].map(d=>`<button class="chip ${rx.fu===d?'on':''}" data-fu="${d}">${d?d+' days':'None'}</button>`).join('')}</div></fieldset>
 <div class="actions"><label class="toggle"><input type="checkbox" id="hindiTgl" ${rx.hindi?'checked':''}> Hindi line for patient</label><span style="flex:1"></span><button class="btn" data-act="print">${svg('print')} Print A5</button><button class="btn" data-act="wa">${svg('wa')} WhatsApp</button><button class="btn primary" data-act="next" ${p.status==='done'?'disabled':''}>${svg('next')} Save & call next</button></div>`;
 renderMeds();renderAmb();renderPapers();tick();}
function renderMeds(){const p=cur();const el=$('#medsTable');if(!p||!el)return;const rx=p.rx;
 el.innerHTML=rx.meds.length?`<table class="meds"><thead><tr><th>Medicine (generic first)</th><th>Dose</th><th>When</th><th>Food</th><th>Days</th><th>Qty</th><th></th></tr></thead><tbody>${rx.meds.map(m=>{const d=DRUG[m.id];return `<tr data-uid="${m.uid}" id="mr-${m.uid}"><td class="drug"><b>${FORM[d.f]} ${esc(d.g)}</b><small>${esc(d.s)} · ${esc(d.b)}</small></td><td>${['tab','cap'].includes(d.f)?`<select data-mf="dose" aria-label="Dose">${['½','1','2'].map(x=>`<option ${m.dose===x?'selected':''}>${x}</option>`).join('')}</select>`:`<span class="mono">${esc(m.dose)}</span>`}</td><td><select data-mf="freq" aria-label="Frequency">${Object.keys(FREQ).map(f=>`<option value="${f}" ${m.freq===f?'selected':''}>${f}</option>`).join('')}</select></td><td><select data-mf="timing" aria-label="Food">${Object.keys(TIMING).map(x=>`<option value="${x}" ${m.timing===x?'selected':''}>${x==='any'?'—':TIMING[x].en}</option>`).join('')}</select></td><td><input type="number" min="1" max="365" data-mf="days" value="${m.days}" aria-label="Days"></td><td class="mono">${qty(m)}</td><td><button class="rm" data-rm="${m.uid}" aria-label="Remove">×</button></td></tr>`;}).join('')}</tbody></table>`:'<div class="empty">No medicines yet. Tap a template above or search.</div>';renderAlerts();}
function renderAlerts(){const p=cur();if(!p||!$('#alerts'))return;$('#alerts').innerHTML=alertsFor(p).map(a=>`<div class="alert ${a[0]}"><span class="ic">!</span><span>${esc(a[1])}</span></div>`).join('');const c=cost(p.rx);$('#cost').innerHTML=`<div><span>Branded</span><b>${inr(c.b)}</b></div><div><span>Jan Aushadhi</span><b>${inr(c.j)}</b></div><div class="save"><span>Patient saves</span><b>${inr(c.s)}</b></div>`;}
function tick(){const p=cur();const tm=$('#tmr');if(!p||!tm)return;if(p.status==='done'){tm.textContent=fmtT(p.time);return;}if(!p.start)p.start=Date.now();tm.textContent=fmtT((Date.now()-p.start)/1000);}
setInterval(tick,1000);
function openPatient(id){const prev=cur();if(prev&&prev.id!==id&&AMB[prev.id]){const a=AMB[prev.id];if(a.rec){try{a.rec.stop();}catch(e){}a.rec=null;}if(['listening','live'].includes(a.state))a.state='paused';}if(prev&&prev.status==='with'&&prev.id!==id)prev.status='waiting';S.cur=id;const p=cur();if(p.status==='waiting'){p.status='with';p.start=Date.now();}if(VIEW!=='opd')go('opd');else{renderQueue();renderConsult();}}
function fl(id){const e=document.getElementById(id);if(!e)return;e.classList.remove('flashbox');void e.offsetWidth;e.classList.add('flashbox');}
function applyTpl(k){const p=cur(),T=X.TPL[k],rx=p.rx;rx.dx=T.dx;rx.meds=T.meds.map(mkMed);rx.inv=T.inv.slice();rx.adv=T.adv.slice();rx.fu=T.fu;renderConsult();['f-dx','f-meds','f-fu'].forEach(fl);toast(`${T.name}: ${T.meds.length} medicines, tests and advice filled`);}
function addDrug(id,parsed){const p=cur(),d=DRUG[id];if(p.rx.meds.some(m=>m.id===id)){toast(d.g+' is already on the parchi');return;}const m=mkMed(C.sigFor(d,parsed));p.rx.meds.push(m);renderMeds();renderPapers();const r=document.getElementById('mr-'+m.uid);if(r)r.classList.add('flash');if(alertsFor(p).some(a=>a[0]==='crit'))toast('Allergy check triggered');}
function saveNext(){const p=cur();if(!p)return;if(!p.rx.meds.length){toast('Add at least one medicine first');return;}if(alertsFor(p).some(a=>a[0]==='crit')){toast('Resolve the allergy alert before saving');fl('f-meds');return;}
 p.time=(Date.now()-(p.start||Date.now()))/1000;p.status='done';S.sent++;const a=S.appts.find(x=>x.pid===p.id);if(a)a.status='seen';
 const nx=S.patients.find(x=>x.status==='waiting');toast(`Saved in ${fmtT(p.time)}. Parchi, Hindi schedule${AUTO.voice?' and voice note':''} sent to ${p.name} on WhatsApp${nx?`. Token ${nx.tok} told “your turn”`:''}.`);if(nx)openPatient(nx.id);else{renderQueue();renderConsult();}}
/* ---------- ambient consult: listen to doctor, patient and staff; draft the parchi ---------- */
const AMB={};          // per patient: {state, i, lines:[[sp,text]], facts:[], t0, live}
const SPK={D:['Dr','Doctor'],P:['Pt','Patient'],S:['St','Compounder'],Y:['🎙','You (live)']};
const SHORT={ors:'ORS',coughls:'Cough syrup',ferro:'Iron',vitd:'Vitamin D3',bcomp:'B-complex',calc:'Calcium',montlevo:'Montelukast',rabdsr:'Rabeprazole',amoxclav:'Amoxyclav',cotri:'Cotrimoxazole',diclopcm:'Diclofenac',dicymef:'Meftal-Spas'};
const shortName=d=>SHORT[d.id]||(w=>w.charAt(0)+w.slice(1).toLowerCase())(d.g.split(' ')[0]);
const DXHI={'Type 2 DM with early peripheral neuropathy':'शुगर (टाइप 2) का पैरों की नसों पर शुरुआती असर','Lower urinary tract infection':'पेशाब का संक्रमण (UTI)','Acute febrile illness (viral), dengue to be ruled out':'वायरल बुखार, डेंगू की जाँच होनी है','Acute febrile illness (viral)':'वायरल बुखार','Iron deficiency anaemia':'खून की कमी (आयरन की कमी)','Essential hypertension, uncontrolled':'BP कंट्रोल में नहीं है','Allergic rhinitis':'नाक की एलर्जी'};
const ambOf=p=>AMB[p.id]||(AMB[p.id]={state:'idle',i:0,lines:[],facts:[],t0:0});
const scriptOf=p=>X.CONVO[p.tok]||X.CONVO_GENERIC;
function factChip(f){const v={bp:'BP',pulse:'Pulse',temp:'Temp',spo2:'SpO₂',grbs:'Sugar',wt:'Wt'};
 if(f[0]==='v')return `${v[f[1]]} ${esc(f[2])}`;
 if(f[0]==='med'){const d=DRUG[f[1]];const tm=TIMING[f[3]]||TIMING.any;return `<b>${FORM[d.f]} ${esc(d.g)}</b> ${esc(d.s)} · ${esc(f[2])}${tm.en?' · '+tm.en:''} · ${f[4]} d`;}
 if(f[0]==='adv')return esc(X.ADVICE[f[1]].en);
 if(f[0]==='fu')return `In ${f[1]} days · ${fmtD(addDays(f[1]))}`;
 if(f[0]==='ask')return `“${esc(f[1])}” <span class="ans-hi">→ ${esc(f[3])}</span>`;
 return esc(f[1]);}
const GROUPS=[['co','Complaints'],['hx','History'],['v','Vitals'],['all','Allergy'],['dx','Diagnosis'],['med','Medicines'],['inv','Tests'],['adv','Advice'],['fu','Follow-up'],['ask','Patient asked'],['flag','Safety']];
function factsHTML(a){if(!a.facts.length)return `<div class="amb-empty">${a.state==='live'?'Speak a line such as “bukhar teen din se, BP 120 by 80, pcm teen baar khane ke baad teen din”.':'Facts appear here as they are heard.'}</div>`;
 return GROUPS.map(g=>{const fs=a.facts.filter(f=>f[0]===g[0]);if(!fs.length)return '';return `<div class="fg fg-${g[0]}"><span class="fg-h">${g[1]}</span>${fs.map(f=>`<span class="fact">${factChip(f)}</span>`).join('')}</div>`;}).join('');}
function lineHTML(l,typing){return `<div class="aline sp-${l[0]}"><span class="who" title="${SPK[l[0]][1]}">${SPK[l[0]][0]}</span><p>${esc(l[1])}${typing?'<i class="caret"></i>':''}</p></div>`;}
function hindiSummary(p){const rx=p.rx,a=ambOf(p),fuD=rx.fu?addDays(rx.fu):null;
 const meds=rx.meds.map(m=>{const d=DRUG[m.id],tm=TIMING[m.timing]||TIMING.any;return `${shortName(d)}: ${doseHi(m,d)}, ${FREQ[m.freq].hi}${tm.hi?', '+tm.hi:''}, ${daysHi(m)}`;});
 const asks=a.facts.filter(f=>f[0]==='ask').map(f=>f[3]);
 return {text:`नमस्ते ${p.name} जी। आज की जाँच: ${DXHI[rx.dx]||rx.dx||'—'}।`,meds,tests:rx.inv,asks,fu:fuD?`${fmtHi(fuD)} को दोबारा दिखाएँ।`:'',
  voice:`नमस्ते ${p.name} जी। आपकी दवाइयाँ ऐसे लेनी हैं। `+meds.join('। ')+'। '+(asks.length?'आपके सवाल का जवाब: '+asks.join(' ')+' ':'')+(fuD?`${fmtHi(fuD)} को दोबारा दिखाएँ।`:'')};}
function outboxHTML(p){const h=hindiSummary(p);
 return `<div class="outbox"><div class="ob-h"><b>${svg('wa')} Goes to ${esc(p.name)} on WhatsApp when you save</b><span class="tag good">Hindi</span></div>
 <div class="ob-grid"><div class="ob-msg"><p>${esc(h.text)}</p><ul>${h.meds.map(m=>`<li>${esc(m)}</li>`).join('')}</ul>${h.tests.length?`<p>जाँच: ${esc(h.tests.join(', '))}</p>`:''}${h.asks.length?`<p class="ob-ask">आपके सवाल का जवाब: ${esc(h.asks.join(' '))}</p>`:''}${h.fu?`<p><b>${esc(h.fu)}</b></p>`:''}</div>
 <div class="ob-side"><button class="btn sm primary" data-act="voice-note">${svg('mic')} <span id="vnLbl">Hear the voice note</span></button><small>Played on the patient’s phone, for those who can’t read the parchi.</small>${p.rx.fu?`<small>${svg('bell')} Reminder set for ${fmtD(addDays(p.rx.fu-1))}</small>`:''}${p.rx.inv.length?`<small>${svg('lab')} Test list sent to the lab</small>`:''}</div></div></div>`;}
function renderAmb(){const p=cur(),el=$('#amb');if(!el||!p)return;const a=ambOf(p);
 if(a.state==='idle'){el.innerHTML='';return;}
 if(a.state==='consent'){el.innerHTML=`<div class="amb consent"><div class="cs-ic">${svg('mic')}</div><div><b>Ask the patient first</b><p class="hi-say">“आपकी बातचीत सुनकर पर्ची बनेगी। आवाज़ सेव नहीं होगी। ठीक है?”</p><p class="fine-note">Audio becomes text and is discarded; only what you approve is saved. Demo: the conversation is scripted.</p><div class="cs-act"><button class="btn primary" data-act="amb-start">Patient agreed · start listening</button>${C.SR?`<button class="btn" data-act="amb-live">Try with my own voice</button>`:''}<button class="btn ghost" data-act="amb-close">Not now</button></div></div></div>`;return;}
 const lab={listening:['Listening','on'],paused:['Paused',''],done:['Draft ready','done'],live:['Listening to you','on']}[a.state]||['',''];
 el.innerHTML=`<div class="amb"><div class="amb-h"><span class="rec ${lab[1]}"><i></i>${lab[0]}</span><span class="mono amb-t" id="ambT">${fmtT(((a.tEnd||Date.now())-a.t0)/1000)}</span><span class="amb-who">${(a.state==='live'?['Y']:['D','P','S']).map(k=>`<span class="sp sp-${k}">${SPK[k][1]}</span>`).join('')}</span><span style="flex:1"></span>
  ${a.state==='listening'?'<button class="btn sm" data-act="amb-pause">Pause</button>':''}${a.state==='paused'?'<button class="btn sm" data-act="amb-resume">Resume</button>':''}${['listening','paused','live'].includes(a.state)?'<button class="btn sm primary" data-act="amb-stop">Stop & draft</button>':''}${a.state==='done'?'<button class="btn sm" data-act="amb-replay">Replay</button><button class="btn sm ghost" data-act="amb-close">Hide</button>':''}</div>
  <div class="amb-grid"><div class="amb-tx" id="ambTx">${a.lines.map(l=>lineHTML(l)).join('')}${a.typing?lineHTML(a.typing,true):''}${a.interim?`<div class="aline sp-Y interim"><span class="who">…</span><p>${esc(a.interim)}</p></div>`:''}</div><div class="amb-f" id="ambF"><div class="amb-fh">${svg('spark')} What Arogya heard</div>${factsHTML(a)}</div></div>
  ${a.state==='live'?`<p class="fine-note">${svg('lock')} Your browser’s speech service turns this into text (Chrome sends audio to Google). Use sample words, not real patient details.</p>`:''}
  ${a.state==='done'&&p.rx.meds.length?outboxHTML(p):''}</div>`;
 const tx=$('#ambTx');if(tx)tx.scrollTop=tx.scrollHeight;}
let ambTimer=null;
function ambStep(p){const a=ambOf(p),sc=scriptOf(p);clearTimeout(ambTimer);
 if(a.state!=='listening'||S.cur!==p.id)return;
 if(a.i>=sc.length){ambFinish(p);return;}
 const ln=sc[a.i];let k=0;a.typing=[ln[0],''];
 const type=()=>{if(a.state!=='listening'||S.cur!==p.id)return;k+=reduce?ln[1].length:4;a.typing=[ln[0],ln[1].slice(0,k)];
  const tx=$('#ambTx');if(tx){const last=tx.querySelector('.aline:last-child');const html=lineHTML(a.typing,true);if(last&&last.dataset.typing)last.outerHTML=html.replace('<div class="aline','<div data-typing="1" class="aline');else tx.insertAdjacentHTML('beforeend',html.replace('<div class="aline','<div data-typing="1" class="aline'));tx.scrollTop=tx.scrollHeight;}
  if(k<ln[1].length){ambTimer=setTimeout(type,reduce?0:22);return;}
  a.typing=null;a.lines.push([ln[0],ln[1]]);a.i++;
  if(ln[2].length){a.facts=a.facts.concat(ln[2]);const f=$('#ambF');if(f){f.innerHTML=`<div class="amb-fh">${svg('spark')} What Arogya heard</div>`+factsHTML(a);ln[2].forEach(x=>{const g=f.querySelector('.fg-'+x[0]);if(g)g.classList.add('pop');});}}
  if(tx){const t=tx.querySelector('[data-typing]');if(t)t.removeAttribute('data-typing');const c=t&&t.querySelector('.caret');if(c)c.remove();}
  ambTimer=setTimeout(()=>ambStep(p),reduce?0:520);};
 type();}
function applyFacts(p,facts){const rx=p.rx,co=[],hx=[];rx.meds=[];rx.inv=[];rx.adv=[];
 facts.forEach(f=>{switch(f[0]){
  case 'co':co.push(f[1]);break;case 'hx':hx.push(f[1]);break;case 'v':rx.v[f[1]]=f[2];break;
  case 'all':if(!p.all.includes(f[1]))p.all.push(f[1]);break;case 'dx':rx.dx=f[1];break;
  case 'med':if(DRUG[f[1]]&&!rx.meds.some(m=>m.id===f[1]))rx.meds.push(mkMed([f[1],f[2],f[3],f[4]]));break;
  case 'inv':if(!rx.inv.includes(f[1]))rx.inv.push(f[1]);break;case 'adv':if(!rx.adv.includes(f[1]))rx.adv.push(f[1]);break;
  case 'fu':rx.fu=f[1];break;case 'flag':if(/NSAID|painkiller/i.test(f[1]))p.noNsaid=true;break;}});
 if(co.length||hx.length)rx.co=co.concat(hx).join('. ')+'.';}
function ambFinish(p){const a=ambOf(p);clearTimeout(ambTimer);if(a.rec){try{a.rec.stop();}catch(e){}a.rec=null;}
 a.state='done';a.tEnd=Date.now();a.typing=null;a.interim='';
 if(a.facts.length){applyFacts(p,a.facts);renderConsult();['f-co','f-v','f-dx','f-meds','f-fu'].forEach(fl);toast(`Draft filled from the conversation: ${p.rx.meds.length} medicines. Check it, then save.`);}
 else{renderAmb();toast('Nothing was picked up. Try again or type the medicines.');}}
function ambOpen(){const p=cur();if(!p)return;const a=ambOf(p);if(['listening','live'].includes(a.state))return;Object.assign(a,{state:'consent',i:0,lines:[],facts:[],typing:null,tEnd:0});renderAmb();}
function ambStart(){const p=cur();const a=ambOf(p);Object.assign(a,{state:'listening',i:0,lines:[],facts:[],t0:Date.now(),tEnd:0});renderAmb();ambStep(p);}
function ambLive(){const p=cur(),a=ambOf(p);if(!C.SR)return;Object.assign(a,{state:'live',i:0,lines:[],facts:[],t0:Date.now(),tEnd:0,interim:''});
 const rec=new C.SR();rec.lang=LANG==='hi'?'hi-IN':'en-IN';rec.continuous=true;rec.interimResults=true;a.rec=rec;
 rec.onresult=e=>{let fin='',im='';for(let i=e.resultIndex;i<e.results.length;i++){const r=e.results[i];if(r.isFinal)fin+=r[0].transcript;else im+=r[0].transcript;}
  if(fin.trim()){a.lines.push(['Y',fin.trim()]);a.facts=C.extract(a.lines.map(l=>l[1]).join('. '));}a.interim=im;renderAmb();};
 rec.onerror=e=>{toast(e.error==='not-allowed'?'Microphone blocked. Allow it in the browser to try live listening.':'Live listening stopped: '+e.error);};
 rec.onend=()=>{if(a.state==='live'&&a.rec===rec){try{rec.start();}catch(e){}}};
 try{rec.start();}catch(e){toast('Could not start the microphone.');a.state='consent';}renderAmb();}
setInterval(()=>{const p=cur(),t=$('#ambT');if(!p||!t)return;const a=ambOf(p);if(['listening','live'].includes(a.state))t.textContent=fmtT((Date.now()-a.t0)/1000);},1000);
function voiceNote(){const p=cur();if(!p)return;const lbl=$('#vnLbl');
 if(C.isSpeaking()){C.stop();if(lbl)lbl.textContent='Hear the voice note';return;}
 const ok=C.speak(hindiSummary(p).voice,()=>{const l=$('#vnLbl');if(l)l.textContent='Hear the voice note';});
 if(!ok){toast('This browser cannot play speech. On a phone the patient gets an audio file.');return;}if(lbl)lbl.textContent='Stop';}

/* ---------- medicines: shorthand search ---------- */
let hl=0,lastQ=null;
function sigText(sg){const d=DRUG[sg[0]],tm=TIMING[sg[2]]||TIMING.any;return `${sg[4]?sg[4]+(['tab','cap'].includes(d.f)?(d.f==='tab'?' tab':' cap'):'')+' · ':''}${sigCode({freq:sg[1]})} · ${[FREQ[sg[1]]?FREQ[sg[1]].en:'',tm.en].filter(Boolean).join(', ')} · ${sg[1]==='Weekly'?Math.round(sg[3]/7)+' weeks':sg[3]+' days'}`;}
function doSearch(q){const dd=$('#drop');q=q.trim();if(q.length<2){dd.hidden=true;lastQ=null;return;}
 const r=C.match(q);lastQ=r;hl=0;const typed=r.parsed.freq||r.parsed.timing||r.parsed.days;
 if(!r.list.length){dd.innerHTML='<div class="head">No match in the demo list. Try a short name like pcm, azi, pan, telmi.</div>';dd.hidden=false;return;}
 dd.innerHTML=`<div class="head">${typed?'Shorthand understood · Enter adds the full line':r.list.length+' matches · demo list (full catalogue: 205,507)'}</div>`+r.list.map((x,i)=>{const d=x.d,sg=C.sigFor(d,r.parsed);
  return `<button type="button" data-pick="${d.id}" class="${i?'':'hl'} ${i===0&&typed?'smart':''}"><span><span class="g">${FORM[d.f]} ${esc(d.g)} ${esc(d.s)}</span><br><span class="b">${i===0||typed?`<span class="sig mono">${esc(sigText(sg))}</span> · `:''}${esc(d.b)}${d.cls==='sulfa'?' · sulfa':''}${d.cls==='pen'?' · penicillin':''}${x.score<50?' · did you mean?':''}</span></span><span class="pr">Brand ₹${d.bp}<br><span class="ja">JA ₹${d.jp}</span> / unit</span></button>`;}).join('');dd.hidden=false;}

/* PATIENTS */
let pSel='p3',pq='';
function trendSVG(tr){const W=560,H=200,l=44,r=20,tp=24,b=34;const vals=tr.pts.map(x=>x[1]).concat([tr.target]);let mn=Math.min(...vals),mx=Math.max(...vals);const pad=(mx-mn)*0.2||1;mn-=pad;mx+=pad;
 const Xs=i=>l+i*(W-l-r)/(tr.pts.length-1),Y=v=>tp+(mx-v)/(mx-mn)*(H-tp-b);const pts=tr.pts.map((p,i)=>Xs(i)+','+Y(p[1])).join(' ');
 return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(tr.label)} trend"><line class="ax" x1="${l}" x2="${W-r}" y1="${H-b}" y2="${H-b}"/><line class="tgt" x1="${l}" x2="${W-r}" y1="${Y(tr.target)}" y2="${Y(tr.target)}"/><text class="tg" x="${W-r}" y="${Y(tr.target)-6}" text-anchor="end">target ${tr.target}</text><path class="ar" d="M${Xs(0)},${H-b} L${tr.pts.map((p,i)=>Xs(i)+','+Y(p[1])).join(' L')} L${Xs(tr.pts.length-1)},${H-b} Z"/><polyline class="ln" points="${pts}"/>${tr.pts.map((p,i)=>`<circle class="${i===tr.pts.length-1?'last':'pt'}" cx="${Xs(i)}" cy="${Y(p[1])}" r="${i===tr.pts.length-1?5:4}"/><text class="v" x="${Xs(i)}" y="${Y(p[1])-10}" text-anchor="middle">${p[1]}</text><text x="${Xs(i)}" y="${H-12}" text-anchor="middle">${p[0]}</text>`).join('')}</svg>`;}
function vPatients(){const list=S.patients.filter(p=>!pq||(p.name+' '+p.uhid+' '+p.phone+' '+p.cond.join(' ')+' '+p.co).toLowerCase().includes(pq));const p=S.patients.find(x=>x.id===pSel)||S.patients[0];
 $('#view').innerHTML=`<div class="view-h"><div><h2>${esc(t('app.patients'))}</h2><p>${S.patients.length} patients · search by name, UHID, phone or condition</p></div></div>
 <div class="pview"><div class="plist"><input class="inp" id="pSearch" placeholder="e.g. Sita, SC-0412, T2DM" value="${esc(pq)}">${list.map(x=>`<button class="q-item ${x.id===p.id?'on':''}" data-psel="${x.id}"><span class="q-tok">${esc(x.name.split(' ').map(w=>w[0]).join('').slice(0,2))}</span><span style="min-width:0"><span class="q-name">${esc(x.name)}</span><span class="q-sub">${esc(x.uhid)} · ${esc(x.age+x.sex)} · ${x.visits.length+(x.status==='done'?1:0)} visits</span></span></button>`).join('')||'<div class="empty">No match.</div>'}</div>
 <div class="card" style="display:flex;flex-direction:column;gap:16px"><div class="pt-head"><div><div class="pt-name">${esc(p.name)}</div><div class="pt-meta">${esc(p.age)} yrs · ${p.sex==='M'?'Male':'Female'} · ${esc(p.uhid)} · ${esc(p.phone)} · ABHA: not linked</div><div class="pt-tags">${p.cond.map(c=>`<span class="tag acc">${esc(c)}</span>`).join('')}${p.all.map(a=>`<span class="tag crit">Allergic: ${esc(a)}</span>`).join('')}</div></div><button class="btn sm primary" data-open="${p.id}">Open in OPD</button></div>
  ${p.trend?`<div><div class="fs-h"><span class="lbl">${esc(p.trend.label)} · last 5 visits</span><span class="tag ${p.trend.pts.at(-1)[1]<=p.trend.target?'good':'warn'}">${p.trend.pts.at(-1)[1]<=p.trend.target?'at target':'above target'}</span></div>${trendSVG(p.trend)}</div>`:'<p style="color:var(--muted);font-size:14px">Trend charts appear once a patient has repeat BP, sugar or HbA1c readings.</p>'}
  <div><div class="fs-h" style="margin-bottom:8px"><span class="lbl">Visit history</span></div><div class="timeline">${['done','with'].includes(p.status)?`<div class="tl"><div class="d">${fmtD(today)} · today</div><b>${esc(p.rx.dx||'In progress')}</b><p>${esc(p.rx.meds.map(m=>DRUG[m.id].g).join(', ')||'—')}</p></div>`:''}${p.visits.map(v=>`<div class="tl"><div class="d">${esc(v[0])}</div><b>${esc(v[1])}</b><p>${esc(v[2])}</p></div>`).join('')||'<div class="tl"><b>First visit</b><p>No earlier records. Use photo intake to add old prescriptions.</p></div>'}</div></div></div></div>`;}

/* SETTINGS */
function vSettings(){const l=S.lh;
 $('#view').innerHTML=`<div class="view-h"><div><h2>${esc(t('app.settings'))} · Letterhead</h2><p>Type your details. Every parchi, the hero on the website and the WhatsApp PDF update at once. Saved in this browser.</p></div><button class="btn" data-act="lh-reset">Reset</button></div>
 <div class="studio"><form class="card studio-form" id="studio" autocomplete="off">${[['doctor',"Doctor's name"],['doctorHi','नाम (हिंदी)'],['degrees','Degrees','full'],['clinic','Clinic name'],['clinicHi','क्लिनिक का नाम (हिंदी)'],['reg','Registration no.'],['phone','Clinic phone'],['address','Address','full'],['timings','Timings','full']].map(f=>`<div class="field ${f[2]||''}"><label for="lh-${f[0]}">${f[1]}</label><input class="inp" id="lh-${f[0]}" data-lh="${f[0]}" value="${esc(l[f[0]])}"></div>`).join('')}
  <div class="field"><label>Ink colour</label><div class="swatches">${INKS.map(k=>`<button type="button" class="sw" style="background:${k[0]}" data-ink="${k[0]}" aria-label="${k[1]}" aria-pressed="${l.ink===k[0]}"></button>`).join('')}</div></div>
  <div class="field"><label>Layout</label><div class="seg"><button type="button" data-layout="center" aria-pressed="${l.layout==='center'}">Centred</button><button type="button" data-layout="left" aria-pressed="${l.layout==='left'}">Logo left</button></div></div></form>
 <div id="studioPaper"></div></div>`;renderPapers();}

/* modal, WhatsApp, print */
function openModal(title,html){$('#modalTitle').textContent=title;$('#modalBody').innerHTML=html;$('#modal').hidden=false;$('#modal .btn').focus();}
function closeModal(){$('#modal').hidden=true;}

/* ---------------- security (sample data; the real app enforces this on the server) ---------------- */
const nowT=()=>new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
const SEC={
 staff:[{id:'s1',name:'',role:'Doctor · Admin',scope:'full',active:true,you:true,dev:2},{id:'s2',name:'Sunita Kumari',role:'Reception',scope:'desk',active:true,dev:1},{id:'s3',name:'Ramesh Prasad',role:'Reception',scope:'desk',active:true,dev:1}],
 log:[['10:41','Dr. (you)','Printed prescription · Sita Devi','This laptop'],['10:38','Sunita Kumari','Recorded vitals · token 4','Reception PC'],['10:22','Sunita Kumari','Registered new patient · Kavita Sharma','Reception PC'],['09:58','Dr. (you)','Opened history · Ram Prasad Singh','This laptop'],['09:31','Sunita Kumari','Logged in','Reception PC'],['09:30','Dr. (you)','Logged in','This laptop']],
 sessions:[['This laptop · Chrome','Muzaffarpur · active now',true],['Android phone · Chrome','Muzaffarpur · 2 hours ago',false]]
};
function secLog(who,what,where){SEC.log.unshift([nowT(),who,what,where||'This laptop']);}
function vSecurity(){const H=(en,hi)=>LANG==='hi'?hi:en;
 const me=SEC.staff[0];me.name=S.lh.doctor;
 const tick='<span class="perm y" aria-label="yes">✓</span>',dash='<span class="perm n" aria-label="no">—</span>';
 const M=[[H('Prescriptions and visit history','पर्ची और पुराना इलाज'),1,0],[H('Lab reports and scans','लैब रिपोर्ट और स्कैन'),1,0],[H('Registration, queue and vitals','रजिस्ट्रेशन, कतार और वाइटल्स'),1,1],[H('Appointments and bills','अपॉइंटमेंट और बिल'),1,1],[H('Staff logins and settings','स्टाफ़ लॉगिन और सेटिंग्स'),1,0],[H('Activity log','ऑडिट लॉग'),1,0]];
 $('#view').innerHTML=`<div class="view-h"><div><h2>${esc(t('app.security'))}</h2><p>${H('Only your clinic’s logins can open these records. You are the admin. Sample data in this demo.','रिकॉर्ड सिर्फ़ आपके क्लिनिक के लॉगिन से खुलते हैं। एडमिन आप हैं। डेमो में सैंपल डेटा।')}</p></div><span class="sec-ok">${svg('shield')} ${H('Protected','सुरक्षित')}</span></div>
 <div class="kpis sec-kpis">${[['building',H('Stored in India','डेटा भारत में'),H('Mumbai data centre','मुंबई डेटा सेंटर')],['lock',H('Encrypted','एन्क्रिप्टेड'),H('HTTPS · AES-256 at rest','HTTPS · डिस्क पर AES-256')],['logs',H('Activity log','ऑडिट लॉग'),H('Cannot be edited','बदला नहीं जा सकता')],['clock',H('Auto log-out','अपने-आप लॉग आउट'),H('After 14 hours','14 घंटे बाद')]].map(k=>`<div class="kpi sk"><span class="ic">${svg(k[0])}</span><div><b>${esc(k[1])}</b><small>${esc(k[2])}</small></div></div>`).join('')}</div>
 <div class="two sec-two">
  <div class="card"><div class="card-h"><h3>${H('Staff and access','स्टाफ़ और पहुँच')}</h3><button class="btn sm" data-act="sec-add">+ ${H('Add staff','स्टाफ़ जोड़ें')}</button></div>
   ${SEC.staff.map(u=>`<div class="staff ${u.active?'':'off'}"><span class="av">${esc(u.name.replace(/^Dr\.?\s*/,'').split(' ').map(w=>w[0]).join('').slice(0,2))}</span><span style="min-width:0"><b>${esc(u.name)}</b>${u.you?` <span class="tag acc">${H('You','आप')}</span>`:''}<br><small>${esc(u.role)} · ${u.scope==='full'?H('Full access','पूरी पहुँच'):H('Front desk only','सिर्फ़ फ़्रंट डेस्क')}${u.active?'':' · '+H('Switched off','बंद')}</small></span>${u.you?'<span class="tag good">Admin</span>':`<button class="btn sm ${u.active?'':'primary'}" data-staff="${u.id}">${u.active?H('Switch off','बंद करें'):H('Switch on','चालू करें')}</button>`}</div>`).join('')}
   <p class="fine-note">${H('Switching a login off signs that person out of every device at once.','लॉगिन बंद करते ही वह व्यक्ति हर डिवाइस से तुरंत लॉग आउट हो जाता है।')}</p></div>
  <div class="card"><h3>${H('Who can see what','कौन क्या देख सकता है')}</h3>
   <table class="perm-t"><thead><tr><th></th><th>${H('Doctor · Admin','डॉक्टर · एडमिन')}</th><th>${H('Reception','रिसेप्शन')}</th></tr></thead><tbody>${M.map(r=>`<tr><td>${esc(r[0])}</td><td>${r[1]?tick:dash}</td><td>${r[2]?tick:dash}</td></tr>`).join('')}<tr class="ext"><td>${H('Other clinics, anyone on the internet','दूसरे क्लिनिक, इंटरनेट पर कोई भी')}</td><td colspan="2"><span class="perm x">✕ ${H('No access','पहुँच नहीं')}</span></td></tr></tbody></table></div>
 </div>
 <div class="two sec-two">
  <div class="card"><div class="card-h"><h3>${H('Activity log','ऑडिट लॉग')}</h3><span class="tag">${H('Read-only','सिर्फ़ पढ़ने के लिए')}</span></div>
   <div class="alog">${SEC.log.slice(0,8).map(l=>`<div class="arow"><b class="mono">${esc(l[0])}</b><span style="min-width:0"><b>${esc(l[1])}</b> · ${esc(l[2])}<br><small>${esc(l[3])}</small></span></div>`).join('')}</div>
   <p class="fine-note">${H('Every login, view, change and print is recorded. Entries cannot be edited or deleted, not even by the admin.','हर लॉगिन, देखना, बदलाव और प्रिंट दर्ज होता है। ये प्रविष्टियाँ बदली या मिटाई नहीं जा सकतीं, एडमिन भी नहीं।')}</p></div>
  <div class="card"><h3>${H('Your sessions','आपके सत्र')}</h3>
   ${SEC.sessions.map(x=>`<div class="staff"><span class="av">${svg(x[0].startsWith('Android')?'phone':'home')}</span><span style="min-width:0"><b>${esc(x[0])}</b><br><small>${esc(x[1])}</small></span>${x[2]?`<span class="tag good">${H('This device','यह डिवाइस')}</span>`:''}</div>`).join('')}
   <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><button class="btn sm" data-act="sec-out" ${SEC.sessions.length<2?'disabled':''}>${H('Log out all other devices','बाकी सभी डिवाइस से लॉग आउट')}</button><button class="btn sm" data-act="sec-pass">${H('Change password','पासवर्ड बदलें')}</button></div>
   <p class="fine-note">${H('Passwords are stored only as a one-way hash, so nobody can read them. Repeated wrong passwords slow the login down.','पासवर्ड सिर्फ़ एकतरफ़ा हैश के रूप में रखे जाते हैं, कोई उन्हें पढ़ नहीं सकता। बार-बार गलत पासवर्ड पर लॉगिन धीमा हो जाता है।')}</p></div>
 </div>`;}
function printView(){const p=cur();openModal('A5 print preview · '+p.name,`<p style="color:var(--muted);font-size:14px;margin-bottom:12px">In the clinic this goes to your printer on A5, or onto your pre-printed pad with the header switched off.</p><div class="a5">${parchi(p)}</div><div style="text-align:center;margin-top:12px"><button class="btn primary" data-act="real-print">${svg('print')} Print now</button></div>`);}
function waView(){const p=cur(),rx=p.rx,Lh=S.lh;if(!rx.meds.length){toast('Add medicines first');return;}const fuD=rx.fu?addDays(rx.fu):null;S.sent++;
 const lines=rx.meds.map(m=>{const d=DRUG[m.id],tm=TIMING[m.timing];return `<li><b>${esc(shortName(d))}</b>: ${esc(doseHi(m,d))}, ${esc(FREQ[m.freq].hi)}${tm.hi?', '+tm.hi:''}, ${esc(daysHi(m))}</li>`;}).join('');
 openModal('WhatsApp preview · '+p.phone,`<div class="wa-grid"><div><p>The patient gets the PDF and a Hindi schedule they can read at home. A reminder goes out the day before follow-up.</p><ul style="color:var(--muted);font-size:14px;margin-top:10px;padding-left:18px"><li>From your clinic's WhatsApp Business number</li><li>About 12 paise per message (Meta utility rate)</li><li>Sent only after the patient agrees at reception</li></ul><div style="margin-top:12px"><button class="btn sm primary" data-act="voice-note">${svg('mic')} <span id="vnLbl">Hear the voice note</span></button></div><p style="font-size:13px;color:var(--warn);margin-top:12px">Demo: nothing is actually sent.</p></div>
 <div class="phone"><div class="wa-top"><span class="av"></span><span><b>${esc(Lh.clinic)}</b><small>Business account</small></span></div><div class="wa-body"><div class="bub"><div class="pdf"><span class="ic">PDF</span><span><b>Parchi_${esc(p.name.replace(/[^A-Za-z]/g,''))}.pdf</b><br><small>1 page · ${esc(Lh.doctor)}</small></span></div><div class="tm">✓✓</div></div>
 <div class="bub">नमस्ते ${esc(p.name)} जी, ${esc(Lh.doctor)} की पर्ची ऊपर है। दवा ऐसे लें:<ul class="wa-meds">${lines}</ul>${rx.adv.length?'<div style="margin-top:6px">सलाह: '+rx.adv.map(i=>esc(X.ADVICE[i].hi)).join(', ')+'</div>':''}${fuD?`<div style="margin-top:6px"><b>${esc(fmtHi(fuD))}</b> को दोबारा दिखाएँ। 1 लिखकर भेजें, टोकन बुक हो जाएगा।</div>`:''}<div class="tm">✓✓</div></div>
 <div class="bub in">1</div><div class="bub">टोकन बुक हो गया ✔ ${fuD?esc(fmtHi(fuD))+', सुबह 8 बजे के बाद।':''}<div class="tm">✓✓</div></div></div></div></div>`);}

/* toast */
let tt;function toast(m){const e=$('#toast');e.textContent=m;e.hidden=false;clearTimeout(tt);tt=setTimeout(()=>e.hidden=true,3200);}

/* ---------------- router ---------------- */
function route(){const h=location.hash||'#top';
 const authed=store.get('arx-auth',false);
 const isApp=h.startsWith('#app-'),isLogin=h==='#login';
 $('#page-landing').hidden=isApp||isLogin;$('#page-login').hidden=!isLogin;$('#page-app').hidden=!isApp;$('#footer').hidden=isApp;
 $('#loginBtn').textContent=authed?(LANG==='hi'?'डैशबोर्ड':'Dashboard'):t('nav.login');$('#loginBtn').setAttribute('href',authed?'#app-home':'#login');
 $('#nav').classList.remove('open');document.body.classList.toggle('is-landing',!isApp&&!isLogin);
 if(isApp){if(!authed){location.hash='#login';return;}const v=h.slice(5);VIEW=VIEWS.some(x=>x[0]===v)?v:'home';renderApp();window.scrollTo(0,0);}
 else if(isLogin){window.scrollTo(0,0);}
 else if(h.length>1){const el=document.getElementById(h.slice(1));
  if(el){const ab=el.classList.contains('acc-item')&&el.querySelector('.acc-h');if(ab&&ab.getAttribute('aria-expanded')!=='true')toggleDisc(ab);
   setTimeout(()=>el.scrollIntoView({behavior:reduce?'auto':'smooth'}),0);}}
 document.dispatchEvent(new Event('arx:route'));
}

/* ---------------- events ---------------- */
document.addEventListener('click',e=>{const b=e.target.closest('button,[data-open]');if(!b)return;const d=b.dataset;
 if(d.disc){toggleDisc(b);return;}
 if(d.lang){setLang(d.lang);return;}
 if(d.ff){ff=d.ff;$$('[data-ff]').forEach(x=>x.classList.toggle('on',x.dataset.ff===ff));renderLanding();return;}
 if(d.bill){bill=d.bill;$$('[data-bill]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.bill===bill?'true':'false'));renderLanding();return;}
 if(d.go){go(d.go);return;}
 if(d.start){openPatient(d.start);return;}
 if(d.open){openPatient(d.open);return;}
 if(d.ask){ask(d.ask);return;}
 if(d.day!==undefined){sDay=+d.day;vSchedule();return;}
 if(d.arrive){arrive(d.arrive);vSchedule();return;}
 if(d.resched){const a=S.appts.find(x=>x.id===d.resched);a.day=Math.min(6,a.day+1);toast(`${a.name} moved to ${fmtD(addDays(a.day))}. WhatsApp update sent (demo).`);vSchedule();return;}
 if(d.cancel){const a=S.appts.find(x=>x.id===d.cancel);a.status='cancelled';toast('Cancelled. Slot is free again.');vSchedule();return;}
 if(d.psel){pSel=d.psel;vPatients();return;}
 if(d.tpl){applyTpl(d.tpl);return;}
 if(d.pick){addDrug(d.pick,lastQ&&lastQ.parsed);lastQ=null;$('#medSearch').value='';$('#drop').hidden=true;$('#medSearch').focus();return;}
 if(d.fav){addDrug(d.fav);return;}
 if(d.wat){WAT=d.wat;vIntake();return;}
 if(d.wath){WATH=d.wath;vIntake();return;}
 if(d.rseg){RSEG=d.rseg;vIntake();return;}
 if(d.rm){const p=cur();p.rx.meds=p.rx.meds.filter(m=>m.uid!=+d.rm);renderMeds();renderPapers();return;}
 if(d.inv){const rx=cur().rx;rx.inv=rx.inv.includes(d.inv)?rx.inv.filter(x=>x!==d.inv):rx.inv.concat(d.inv);b.classList.toggle('on');renderPapers();return;}
 if(d.adv){const rx=cur().rx,i=+d.adv;rx.adv=rx.adv.includes(i)?rx.adv.filter(x=>x!==i):rx.adv.concat(i);b.classList.toggle('on');renderPapers();return;}
 if(d.fu!==undefined){const rx=cur().rx;rx.fu=+d.fu;$$('[data-fu]').forEach(x=>x.classList.toggle('on',+x.dataset.fu===rx.fu));renderPapers();return;}
 if(d.addco){const rx=cur().rx;rx.co=rx.co?rx.co.replace(/\.?\s*$/,', ')+d.addco.toLowerCase():d.addco;$('#in-co').value=rx.co;renderPapers();return;}
 if(d.ink){S.lh.ink=d.ink;store.set('arx-lh',S.lh);$$('[data-ink]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.ink===d.ink?'true':'false'));renderPapers();return;}
 if(d.layout){S.lh.layout=d.layout;store.set('arx-lh',S.lh);$$('[data-layout]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.layout===d.layout?'true':'false'));renderPapers();return;}
 if(d.doc){S.doc=d.doc;$$('[data-doc]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.doc===S.doc?'true':'false'));sampleShot();return;}
 if(d.staff){const u=SEC.staff.find(x=>x.id===d.staff);u.active=!u.active;secLog('Dr. (you)',(u.active?'Switched on login · ':'Switched off login · ')+u.name);toast(u.active?`${u.name} can log in again.`:`${u.name}'s login is off. Logged out of ${u.dev} device${u.dev>1?'s':''} (demo).`);vSecurity();return;}
 const a=d.act;if(!a)return;
 const ACT={'amb-open':ambOpen,'amb-start':ambStart,'amb-live':ambLive,'amb-stop':()=>ambFinish(cur()),'amb-pause':()=>{const a=ambOf(cur());a.state='paused';clearTimeout(ambTimer);renderAmb();},'amb-resume':()=>{const p=cur(),a=ambOf(p);a.state='listening';renderAmb();ambStep(p);},'amb-replay':()=>{ambOpen();ambStart();},'amb-close':()=>{const a=ambOf(cur());if(a.rec){try{a.rec.stop();}catch(e){}a.rec=null;}a.state='idle';renderAmb();},'voice-note':voiceNote,
  goscan:()=>{WAT='scan';go('intake');},'recall-send':()=>{RSENT=RSEG;vIntake();recallCount();toast(LANG==='hi'?'भेजा गया (डेमो)':'Sent (demo): each patient got a personal Hindi message.');},
  repeat:()=>{const p=cur(),L0=X.LASTRX[p.tok];L0.meds.forEach(m=>{if(!p.rx.meds.some(x=>x.id===m[0]))p.rx.meds.push(mkMed(m));});renderMeds();renderPapers();fl('f-meds');toast(`Repeated ${L0.meds.length} medicines from ${L0.date}`);},next:saveNext,print:printView,wa:waView,close:closeModal,'real-print':()=>window.print(),'sample-shot':sampleShot,'intake-history':()=>intakeTo('history'),'intake-rx':()=>intakeTo('rx'),'play-chat':playChat,'reset-chat':()=>{S.chat=[];S.chatDone=false;vIntake();},
  'chat-to-queue':()=>{const ap=S.appts.find(x=>x.name==='Kavita Sharma');if(ap&&ap.status==='booked'){arrive(ap.id);const p=S.patients.at(-1);p.cond=['Hypothyroid'];p.age=38;p.co='Fatigue and hair fall for 2 weeks. TSH 7.8 (high).';p.rx.co=p.co;p.rx.inv=['TSH'];}else toast('Already in the queue');},
  logout:()=>{store.set('arx-auth',false);location.hash='#top';toast('Logged out');},
  reset:()=>{const lh=S.lh;Object.keys(AMB).forEach(k=>{if(AMB[k].rec)try{AMB[k].rec.stop();}catch(e){}delete AMB[k];});clearTimeout(ambTimer);C.stop();S=seed();S.lh=lh;chatLog=[];vOpd();toast('Demo reset');},
  'sec-add':()=>toast(LANG==='hi'?'डेमो: असली ऐप में नाम, मोबाइल और भूमिका डालकर स्टाफ़ जोड़ते हैं।':'Demo: in the real app you add a name, mobile number and role.'),
  'sec-out':()=>{SEC.sessions=SEC.sessions.filter(x=>x[2]);secLog('Dr. (you)','Logged out all other devices');toast(LANG==='hi'?'बाकी सभी डिवाइस से लॉग आउट हो गया (डेमो)।':'All other devices are logged out (demo).');vSecurity();},
  'sec-pass':()=>toast(LANG==='hi'?'डेमो: पासवर्ड बदलते ही बाकी डिवाइस अपने-आप लॉग आउट हो जाते हैं।':'Demo: changing your password logs out every other device.'),
  'lh-reset':()=>{S.lh=Object.assign({},LH0);store.set('arx-lh',{});vSettings();}};
 if(ACT[a])ACT[a]();
});
document.addEventListener('input',e=>{const el=e.target,d=el.dataset;
 if(d.bind){const p=cur();if(!p)return;if(d.bind.startsWith('v.')){const f=d.bind.slice(2);p.rx.v[f]=el.value;el.className=vflag(f,el.value);}else p.rx[d.bind]=el.value;renderPapers();return;}
 if(d.mf){const p=cur(),u=+el.closest('tr').dataset.uid,m=p.rx.meds.find(x=>x.uid===u);if(!m)return;m[d.mf]=d.mf==='days'?Math.max(1,parseInt(el.value)||1):el.value;const q=el.closest('tr').querySelector('td.mono');if(q)q.textContent=qty(m);renderAlerts();renderPapers();return;}
 if(d.lh){S.lh[d.lh]=el.value;store.set('arx-lh',S.lh);renderPapers();return;}
 if(el.id==='medSearch'){doSearch(el.value);return;}
 if(el.id==='pSearch'){pq=el.value.toLowerCase();const pos=el.selectionStart;vPatients();const n=$('#pSearch');n.focus();n.setSelectionRange(pos,pos);}
});
document.addEventListener('change',e=>{if(e.target.dataset&&e.target.dataset.auto){AUTO[e.target.dataset.auto]=e.target.checked;vIntake();return;}if(e.target.id==='hindiTgl'){cur().rx.hindi=e.target.checked;renderPapers();}if(e.target.id==='fileIn'&&e.target.files[0])readFile(e.target.files[0]);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();const dd=$('#drop');if(dd)dd.hidden=true;$('#creditPop').hidden=true;}
 if(e.target.id==='medSearch'){const items=$$('#drop [data-pick]');if(!items.length)return;if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();hl=(hl+(e.key==='ArrowDown'?1:-1)+items.length)%items.length;items.forEach((x,i)=>x.classList.toggle('hl',i===hl));}if(e.key==='Enter'){e.preventDefault();items[hl].click();}}});
document.addEventListener('focusout',e=>{if(e.target.id==='medSearch')setTimeout(()=>{const dd=$('#drop');if(dd&&!(document.activeElement&&document.activeElement.closest('#drop')))dd.hidden=true;},150);});
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal();});
$('#themeBtn').addEventListener('click',()=>setTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark'));
$('#menuBtn').addEventListener('click',()=>{const n=$('#nav');n.classList.toggle('open');$('#menuBtn').setAttribute('aria-expanded',String(n.classList.contains('open')));});
$('#creditBtn').addEventListener('click',()=>{const p=$('#creditPop');p.hidden=!p.hidden;$('#creditBtn').setAttribute('aria-expanded',String(!p.hidden));});
$('#loginForm').addEventListener('submit',e=>{e.preventDefault();store.set('arx-auth',true);toast(LANG==='hi'?'लॉग इन हो गया':'Logged in to the demo clinic');location.hash='#app-home';});
$('#leadForm').addEventListener('submit',e=>{e.preventDefault();const n=$('#lf-name').value,c=$('#lf-clinic').value,ph=$('#lf-phone').value,pt=$('#lf-pts').value;
 const msg=`Hello Chiranjeev, I'd like an Arogya Rx demo.\nDoctor: ${n}\nClinic: ${c}\nMobile: ${ph}\nPatients per day: ${pt}`;
 const done=$('#leadDone');done.hidden=false;done.innerHTML=`<span>${esc(t('form.done'))}</span><span style="display:flex;gap:8px;flex-wrap:wrap"><a class="btn primary sm" href="https://wa.me/919546519953?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener">WhatsApp</a><a class="btn sm" href="mailto:chiranjeevkumar47@gmail.com?subject=${encodeURIComponent('Arogya Rx demo request')}&body=${encodeURIComponent(msg)}">Email</a></span>`;});
window.addEventListener('hashchange',route);

/* boot */
setTheme(document.documentElement.getAttribute('data-theme')||'light');
applyLang();route();
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{if(VIEW==='intake'&&!$('#page-app').hidden&&!S.userShot)sampleShot();});
})();
