// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if(hamburger && navLinks){
  hamburger.addEventListener('click',()=>navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));
}

// Active nav link
const current = window.location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('.nav-links a').forEach(a=>{
  if(a.getAttribute('href')===current) a.classList.add('active');
});

// Fade-up on scroll
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:0.12});
document.querySelectorAll('.fade-up').forEach(el=>observer.observe(el));

// Animated counter for hero stats
function animateCounter(el,target,duration=1800){
  let start=0,step=target/60;
  const timer=setInterval(()=>{
    start+=step;
    if(start>=target){start=target;clearInterval(timer)}
    el.textContent=Math.floor(start)+(el.dataset.suffix||'');
  },duration/60);
}
const statsObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.stat-number').forEach(n=>{
        animateCounter(n,parseInt(n.dataset.count),1600);
      });
      statsObserver.unobserve(e.target);
    }
  });
},{threshold:0.5});
document.querySelectorAll('.hero-stats').forEach(el=>statsObserver.observe(el));

// Contact form handler
const form = document.getElementById('contact-form');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const toast=document.querySelector('.success-toast');
    if(toast){toast.style.display='block';setTimeout(()=>toast.style.display='none',4000)}
    form.reset();
  });
}

// Smooth typewriter effect for hero subtitle (optional enhancement)
const typeEl = document.querySelector('.typewriter');
if(typeEl){
  const words=['AI/ML Engineer','Full Stack Developer','Computer Vision Specialist','Problem Solver'];
  let wi=0,ci=0,del=false;
  function type(){
    const word=words[wi];
    typeEl.textContent=del?word.slice(0,ci--):word.slice(0,ci++);
    if(!del&&ci>word.length){del=true;setTimeout(type,1400);return}
    if(del&&ci<0){del=false;wi=(wi+1)%words.length;ci=0}
    setTimeout(type,del?60:90);
  }
  type();
}
