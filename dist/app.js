const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let paused = reducedMotion.matches;
const motionButton = document.querySelector('#motion');
function updateMotion(){document.body.classList.toggle('paused',paused);motionButton.textContent=paused?'▶':'Ⅱ';motionButton.setAttribute('aria-label',paused?'Resume motion':'Pause motion');motionButton.setAttribute('aria-pressed',String(paused));}
updateMotion();
motionButton.addEventListener('click',()=>{paused=!paused;updateMotion();});
reducedMotion.addEventListener('change',event=>{paused=event.matches;updateMotion();});
if(!reducedMotion.matches){document.body.classList.add('js-motion');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.05});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
function updateClock(){document.querySelector('#local-time').textContent=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date())+' IST';}updateClock();setInterval(updateClock,60000);
const header=document.querySelector('header'),progress=document.querySelector('.progress');
const lightSections=[...document.querySelectorAll('.introduction,.about')];
function updateScroll(){const extent=document.documentElement.scrollHeight-innerHeight;progress.style.width=(extent>0?scrollY/extent*100:0)+'%';header.classList.toggle('scrolled',scrollY>80);header.classList.toggle('light',lightSections.some(s=>{const r=s.getBoundingClientRect();return r.top<35&&r.bottom>35;}));}addEventListener('scroll',updateScroll,{passive:true});updateScroll();
const welcome=document.querySelector('#welcome');
let entered=false;
welcome.showModal();
function enter(event){
  if(entered)return;
  entered=true;
  welcome.close();
  history.replaceState(null,'','#home');
  window.scrollTo({top:0,behavior:'instant'});
  heroVisible=true;
  playWelcome();
  // Transfer focus for keyboard/assistive activation, not a mouse click or tap.
  if(event.detail===0&&!event.pointerType){
    document.querySelector('.hero-bottom a').focus({preventScroll:true});
  }
}
document.querySelector('#enter').addEventListener('click',enter);
welcome.addEventListener('cancel',event=>event.preventDefault());
const menuToggle=document.querySelector('.menu-toggle');
function closeMenu(){menuToggle.setAttribute('aria-expanded','false');header.classList.remove('menu-open');}
menuToggle.addEventListener('click',()=>{
  const open=menuToggle.getAttribute('aria-expanded')!=='true';
  menuToggle.setAttribute('aria-expanded',String(open));header.classList.toggle('menu-open',open);
});
header.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeMenu();}});
document.addEventListener('click',event=>{if(!header.contains(event.target))closeMenu();});
const canvas=document.querySelector('#atmosphere'),ctx=canvas.getContext('2d');
if(ctx){let w=0,h=0,last=0,visible=true;const dots=Array.from({length:35},(_,i)=>({x:(i*.618)%1,y:(i*.317)%1,r:.5+(i%4)*.35,s:.000008+(i%3)*.000003}));
function resize(){const rect=canvas.getBoundingClientRect();w=rect.width;h=rect.height;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);}resize();addEventListener('resize',resize);
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;}).observe(canvas);
function draw(now){requestAnimationFrame(draw);if(!visible||document.hidden)return;if(now-last<40)return;const dt=Math.min(now-last,80);last=now;ctx.clearRect(0,0,w,h);for(const p of dots){if(!paused)p.y=(p.y-p.s*dt+1)%1;ctx.beginPath();ctx.fillStyle='rgba(255,194,104,.25)';ctx.arc(p.x*w,p.y*h,p.r,0,Math.PI*2);ctx.fill();}}requestAnimationFrame(draw);}
// Entry is the explicit user gesture that starts audible playback.
// Sound stays on through loops and section re-entry.
const introVideo=document.querySelector('#intro-video');
let videoReady=false,heroVisible=false;
let resetOnMetadata=false;
function resetIntro(){
  introVideo.pause();
  if(introVideo.readyState>0){introVideo.currentTime=0;resetOnMetadata=false;}
  else resetOnMetadata=true;
}
function playVideo(){
  const attempt=introVideo.play();
  if(attempt)attempt.catch(error=>{
    // Scrolling away can abort a pending play; leave audio state unchanged.
    if(error.name==='AbortError')return;
    if(error.name==='NotAllowedError'){
      paused=true;updateMotion();introVideo.pause();
    }
  });
}
function syncVideo(){
  if(!entered||paused||!heroVisible||document.hidden||welcome.open){introVideo.pause();return;}
  if(videoReady)playVideo();
}
function playWelcome(){
  paused=false;updateMotion();
  if(introVideo.readyState>0)introVideo.currentTime=0;
  else resetOnMetadata=true;
  introVideo.playsInline=true;
  introVideo.muted=false;
  introVideo.volume=1;
  playVideo();
}
introVideo.addEventListener('loadedmetadata',()=>{if(resetOnMetadata){introVideo.currentTime=0;resetOnMetadata=false;}});
introVideo.addEventListener('loadeddata',()=>{videoReady=true;introVideo.hidden=false;syncVideo();});
introVideo.addEventListener('ended',()=>{
  introVideo.currentTime=0;syncVideo();
});
introVideo.addEventListener('error',()=>{
  videoReady=false;introVideo.hidden=true;
});
introVideo.src='assets/intro-clean.mp4';
introVideo.load();
motionButton.addEventListener('click',syncVideo);
reducedMotion.addEventListener('change',syncVideo);
welcome.addEventListener('close',syncVideo);
document.addEventListener('visibilitychange',syncVideo);
window.addEventListener('pagehide',()=>introVideo.pause());
window.addEventListener('pageshow',syncVideo);
// Treat the hero as active when at least a quarter is visible. Reset only at
// section transitions, not on every scroll event or when using Pause/Resume.
new IntersectionObserver(entries=>{
  const entry=entries[0];
  const nextVisible=entry.isIntersecting&&entry.intersectionRatio>=0.25;
  if(nextVisible!==heroVisible){resetIntro();heroVisible=nextVisible;}
  syncVideo();
},{threshold:[0,0.25]}).observe(document.querySelector('.hero'));

// Fit the two contact lines using actual font metrics, including after fonts load.
const contactSection=document.querySelector('#contact');
function fitContactLines(){
  contactSection.querySelectorAll('.fit-line').forEach(line=>{
    const content=line.querySelector('.fit-content');
    const available=line.clientWidth;
    if(!available)return;
    let low=1,high=400;
    for(let i=0;i<14;i++){
      const size=(low+high)/2;
      line.style.fontSize=size+'px';
      if(content.getBoundingClientRect().width<=available-1)low=size;
      else high=size;
    }
    line.style.fontSize=low+'px';
  });
}
let contactWidth=0;
new ResizeObserver(entries=>{
  const width=entries[0].contentRect.width;
  if(Math.abs(width-contactWidth)>.5){contactWidth=width;fitContactLines();}
}).observe(contactSection);
document.fonts.ready.then(fitContactLines);

// Only text fragments receive the I-beam; links and buttons keep their pointer.
const textTargets='p,h1,h2,h3,h4,li,.signature,.footer-name,.certificate-issuer,footer>span';
const textWalker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{
  acceptNode(node){
    const parent=node.parentElement;
    return node.textContent.trim()&&parent?.closest(textTargets)&&
      !parent.closest('a,button,summary,input,textarea,[contenteditable],svg,script,style,.cursor-text')
      ?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
  }
});
const textFragments=[];
while(textWalker.nextNode())textFragments.push(textWalker.currentNode);
textFragments.forEach(node=>{
  const span=document.createElement('span');span.className='cursor-text';
  node.replaceWith(span);span.append(node);
});
