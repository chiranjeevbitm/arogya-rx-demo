/* Landing-page motion for Arogya Rx. Runs after app.js; listens to its arx:* events.
   Everything here is decoration: if it fails, the page still reads in its final state. */
(function(){
'use strict';
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
const landing=()=>document.body.classList.contains('is-landing');

/* ---------- header: glass after scrolling, progress bar ---------- */
const top=$('#topbar'), bar=$('#progress');
let ticking=false;
function onScroll(){
  if(ticking)return; ticking=true;
  requestAnimationFrame(()=>{
    ticking=false;
    const y=window.scrollY, h=document.documentElement.scrollHeight-innerHeight;
    if(top)top.classList.toggle('scrolled',y>12);
    if(bar)bar.style.transform='scaleX('+(h>0?Math.min(1,y/h):0)+')';
  });
}
addEventListener('scroll',onScroll,{passive:true});

/* ---------- nav: active section + sliding pill ---------- */
const ind=$('#navInd');
const links=$$('#nav a[href^="#"]');
function moveInd(a){
  if(!ind)return;
  if(!a||!landing()){ind.style.opacity='0';return;}
  ind.style.opacity='1';ind.style.width=a.offsetWidth+'px';ind.style.transform='translateX('+a.offsetLeft+'px)';
}
let active=null;
function setActive(id){
  active=links.find(a=>a.getAttribute('href')==='#'+id)||null;
  links.forEach(a=>a.classList.toggle('on',a===active));
  moveInd(active);
}
if('IntersectionObserver' in window){
  const secObs=new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting)setActive(e.target.id);});
  },{rootMargin:'-45% 0px -50% 0px'});
  ['hero','how','features','security','pricing','more','contact'].forEach(id=>{const el=document.getElementById(id);if(el)secObs.observe(el);});
}
links.forEach(a=>{a.addEventListener('mouseenter',()=>moveInd(a));});
const nav=$('#nav'); if(nav)nav.addEventListener('mouseleave',()=>moveInd(active));
addEventListener('resize',()=>moveInd(active));

/* ---------- reveal on scroll ---------- */
let revObs=null;
function reveal(el){el.classList.add('in');el.querySelectorAll('[data-count]').forEach(countUp);}
function observeAll(){
  const els=$$('.rv:not(.in)');
  if(RM||!revObs){els.forEach(reveal);return;}
  els.forEach(el=>revObs.observe(el));
}
if('IntersectionObserver' in window&&!RM){
  revObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){reveal(e.target);revObs.unobserve(e.target);}});},{rootMargin:'0px 0px -12% 0px',threshold:.08});
}

/* ---------- count-up numbers ---------- */
function fmt(n){const hi=document.documentElement.lang==='hi';return Math.round(n).toLocaleString(hi?'en-IN':'en-US');}
function countUp(el){
  if(el.dataset.done)return; el.dataset.done='1';
  const to=+el.dataset.count, pre=el.dataset.prefix||'';
  if(RM||to<3){el.textContent=pre+fmt(to);return;}
  const dur=1400+Math.min(800,Math.log10(to)*160), t0=performance.now();
  (function step(t){const k=Math.min(1,(t-t0)/dur), e=1-Math.pow(1-k,4);el.textContent=pre+fmt(to*e);if(k<1)requestAnimationFrame(step);})(t0);
}

/* ---------- spotlight on tiles and plan cards ---------- */
document.addEventListener('pointermove',e=>{
  const t=e.target.closest&&e.target.closest('.tile');
  if(!t)return;
  const r=t.getBoundingClientRect();
  t.style.setProperty('--mx',(e.clientX-r.left)+'px');t.style.setProperty('--my',(e.clientY-r.top)+'px');
},{passive:true});

/* ---------- hero: headline reveal, parallax, looping consult ---------- */
const h1=$('#heroH1'), stage=$('#stage');
function replayHeadline(){if(!h1||RM)return;h1.classList.remove('go');void h1.offsetWidth;h1.classList.add('go');}

if(stage&&!RM&&matchMedia('(pointer:fine)').matches){
  const hero=$('#hero');
  hero.addEventListener('pointermove',e=>{
    const r=stage.getBoundingClientRect();
    const px=((e.clientX-r.left)/r.width-.5)*2, py=((e.clientY-r.top)/r.height-.5)*2;
    stage.style.setProperty('--px',Math.max(-1,Math.min(1,px)).toFixed(3));
    stage.style.setProperty('--py',Math.max(-1,Math.min(1,py)).toFixed(3));
  },{passive:true});
  hero.addEventListener('pointerleave',()=>{stage.style.setProperty('--px',0);stage.style.setProperty('--py',0);});
}

const HI_LINE='1 गोली · सुबह और रात · खाने के बाद · 30 दिन';
const graphemes=s=>{try{return Array.from(new Intl.Segmenter('hi',{granularity:'grapheme'}).segment(s),x=>x.segment);}catch(e){return s.split(' ').map((w,i,a)=>w+(i<a.length-1?' ':''));}};
let timers=[], running=false, visible=true;
const later=(fn,ms)=>timers.push(setTimeout(fn,ms));
function clearSeq(){timers.forEach(clearTimeout);timers=[];}
function setTimer(sec,frac){
  const tm=$('#hvTimer'), ring=$('.fc-timer .ring');
  if(tm)tm.textContent='0:'+String(Math.floor(sec)).padStart(2,'0');
  if(ring){ring.style.setProperty('--off',(97.4*(1-frac)).toFixed(1));ring.style.setProperty('--ok',frac>=1?1:0);}
}
function cycle(){
  clearSeq(); if(!stage||!visible||!landing()){running=false;return;}
  running=true;
  const cards=$$('#stage .fc'), hi=$('#hvHi');
  const paper=stage.querySelector('.stage-paper');
  if(paper)stage.style.setProperty('--sh',paper.offsetHeight+'px');
  cards.forEach(c=>c.classList.remove('show'));
  stage.classList.remove('play');void stage.offsetWidth;stage.classList.add('play');
  setTimer(0,0); if(hi)hi.textContent='';
  later(()=>cards[0]&&cards[0].classList.add('show'),250);
  const T0=350, TL=2300;
  for(let i=0;i<=24;i++)later(()=>setTimer(i,i/24),T0+TL*(i/24));
  later(()=>cards[1]&&cards[1].classList.add('show'),3000);
  later(()=>{
    if(!cards[2]||!hi)return; cards[2].classList.add('show');
    const g=graphemes(HI_LINE); let k=0;
    const typeNext=()=>{k++;hi.innerHTML='';hi.append(g.slice(0,k).join(''));if(k<g.length){const c=document.createElement('span');c.className='caret';hi.append(c);later(typeNext,45);}};
    later(typeNext,380);
  },3700);
  later(()=>cards.forEach(c=>c.classList.remove('show')),10200);
  later(cycle,11000);
}
function staticHero(){
  if(!stage)return; stage.classList.remove('seq','play');
  setTimer(24,1); const hi=$('#hvHi'); if(hi)hi.textContent=HI_LINE;
  $$('#stage .fc').forEach(c=>c.classList.add('show'));
}
if(stage){
  if(RM){staticHero();}
  else{
    stage.classList.add('seq');
    if('IntersectionObserver' in window){
      new IntersectionObserver(es=>{es.forEach(e=>{visible=e.isIntersecting;if(visible&&!running)cycle();if(!visible){clearSeq();running=false;}});},{threshold:.2}).observe(stage);
    }else cycle();
    document.addEventListener('visibilitychange',()=>{if(document.hidden){clearSeq();running=false;}else if(visible&&!running)cycle();});
  }
}

/* ---------- wiring with app.js ---------- */
document.addEventListener('arx:render',observeAll);
document.addEventListener('arx:lang',()=>{replayHeadline();$$('[data-count]').forEach(el=>{if(el.dataset.done)el.textContent=(el.dataset.prefix||'')+fmt(+el.dataset.count);});});
document.addEventListener('arx:route',()=>{onScroll();moveInd(active);if(landing()&&stage&&!RM&&visible&&!running)cycle();});

/* boot */
observeAll(); replayHeadline(); onScroll();
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>moveInd(active));
})();
