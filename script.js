// Navbar scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => { navbar.classList.toggle("scrolled", window.scrollY > 50); });

// Theme toggle
const themeBtn = document.getElementById("theme-toggle");
const saved = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", saved);
themeBtn.textContent = saved === "dark" ? "🌙" : "☀️";
themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  themeBtn.textContent = next === "dark" ? "🌙" : "☀️";
});

// Mobile hamburger
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const spans = hamburger.querySelectorAll("span");
  if (navLinks.classList.contains("open")) {
    spans[0].style.transform = "rotate(45deg) translate(5px,5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(5px,-5px)";
  } else {
    spans.forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
  }
});
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    hamburger.querySelectorAll("span").forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll(".section-header,.about-text,.about-info-card,.stat-card,.skill-category,.timeline-item,.project-card,.cert-card,.edu-card,.contact-card");
revealEls.forEach(el => el.classList.add("reveal"));
const ro = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add("visible"); ro.unobserve(e.target); }});
}, {threshold:0.1});
revealEls.forEach(el => ro.observe(el));

// Active nav
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-link");
const ao = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ navItems.forEach(l => { l.style.color=""; if(l.getAttribute("href")==="#"+e.target.id) l.style.color="var(--primary)"; }); }});
}, {threshold:0.4});
sections.forEach(s => ao.observe(s));

// Typing effect
const sub = document.querySelector(".hero-subtitle");
if(sub){
  const roles=["Information Science Graduate","Aspiring UI/UX Designer","Web & Mobile Developer","Detail-Oriented Problem Solver"];
  let ri=0,ci=0,del=false;
  function type(){
    const cur=roles[ri];
    sub.textContent=del?cur.substring(0,ci-1):cur.substring(0,ci+1);
    del?ci--:ci++;
    let d=del?50:80;
    if(!del&&ci===cur.length){d=2000;del=true;}
    else if(del&&ci===0){del=false;ri=(ri+1)%roles.length;d=400;}
    setTimeout(type,d);
  }
  setTimeout(type,1200);
}

// Smooth scroll
document.querySelectorAll("a[href^=\"#\"]").forEach(a => {
  a.addEventListener("click", e => {
    const t = document.querySelector(a.getAttribute("href"));
    if(t){ e.preventDefault(); window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-80,behavior:"smooth"}); }
  });
});
