const menu=document.querySelector('.menu'), nav=document.querySelector('#nav');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open?'true':'false')});
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
window.addEventListener('scroll',()=>document.querySelector('.site-header')?.classList.toggle('scrolled',scrollY>8));

// Proyectos: un proyecto grande por vez, con navegación anterior/siguiente y filtros.
const projectCards=[...document.querySelectorAll('.project-slider .card')];
let projectIndex=0;
function visibleProjects(){
  return projectCards.filter(c=>!c.classList.contains('filter-hidden'));
}
function showProject(index){
  const cards=visibleProjects(); if(!cards.length)return;
  projectIndex=(index+cards.length)%cards.length;
  projectCards.forEach(c=>c.classList.remove('active'));
  cards[projectIndex].classList.add('active');
}
showProject(0);
document.querySelector('.project-prev')?.addEventListener('click',()=>showProject(projectIndex-1));
document.querySelector('.project-next')?.addEventListener('click',()=>showProject(projectIndex+1));

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  const f=btn.dataset.filter;
  projectCards.forEach(c=>c.classList.toggle('filter-hidden',f!=='todos' && !(c.dataset.category||'').split(/\s+/).includes(f)));
  projectIndex=0; showProject(0);
}));

// Servicios: carrusel de una tarjeta por vez.
const serviceCards=[...document.querySelectorAll('.service-track .service-card')];
let serviceIndex=0;
function showService(i){if(!serviceCards.length)return;serviceIndex=(i+serviceCards.length)%serviceCards.length;serviceCards.forEach(c=>c.classList.remove('active'));serviceCards[serviceIndex].classList.add('active');}
showService(0);
document.querySelector('.service-prev')?.addEventListener('click',()=>showService(serviceIndex-1));
document.querySelector('.service-next')?.addEventListener('click',()=>showService(serviceIndex+1));

// Aparición dinámica de imágenes y bloques al entrar en pantalla.
const animatedBlocks=document.querySelectorAll('.reveal, .process-card, .sustain-item');
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver((entries,obs)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');obs.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
 animatedBlocks.forEach(el=>observer.observe(el));
}else animatedBlocks.forEach(el=>el.classList.add('visible'));

// Formulario de cotización a WhatsApp.
document.querySelector('#quote-form')?.addEventListener('submit',(event)=>{
 event.preventDefault();const data=new FormData(event.currentTarget);
 const message=['Hola IBR Estructuras S.A.C., quiero cotizar un proyecto.','',`Nombre / empresa: ${data.get('name')}`,`DNI: ${data.get('dni')}`,`Correo: ${data.get('email')}`,`Celular: ${data.get('phone')}`,'',`Mensaje: ${data.get('message')}`].join('\n');
 window.open(`https://wa.me/51916693425?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');
});
