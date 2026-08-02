/* ==========================================================================
   N. Jeeva — Premium Portfolio Renderer
   Reads content from content.js (getPortfolioContent) and builds the DOM.
   ========================================================================== */

const DATA = getPortfolioContent();

/* ---------------- Theme (applies admin-edited colors + light/dark mode) ---------------- */
if (DATA.theme){
  const root = document.documentElement.style;
  if (DATA.theme.accentFrom) root.setProperty("--accent-1", DATA.theme.accentFrom);
  if (DATA.theme.accentTo) root.setProperty("--accent-2", DATA.theme.accentTo);
  if (DATA.theme.gold) root.setProperty("--gold", DATA.theme.gold);
}
(function initThemeMode(){
  const saved = localStorage.getItem("jeeva_theme_mode");
  const mode = saved || (DATA.theme && DATA.theme.mode) || "dark";
  if (mode === "light") document.documentElement.setAttribute("data-theme", "light");
})();

function el(tag, className, html){
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

/* Renders either a remote brand-logo <img>, or (if icon starts with "text:")
   a self-contained colored monogram badge that never depends on an external
   CDN having that exact brand icon. Format: "text:LABEL:bgHex:fgHex" */
function renderIconHTML(iconVal, altName){
  if (iconVal && iconVal.indexOf("text:") === 0){
    const parts = iconVal.split(":");
    const label = (parts[1] || "?").slice(0, 4);
    const bg = parts[2] || "7c5cff";
    const fg = parts[3] || "ffffff";
    return `<div class="icon-badge" style="background:#${bg}; color:#${fg};">${label}</div>`;
  }
  return `<img src="${iconVal}" alt="${altName || ""}" loading="lazy" onerror="this.style.display='none'">`;
}

/* ---------------- Meta ---------------- */
document.title = DATA.meta.siteTitle;
const favLink = document.getElementById("favicon");
if (favLink && DATA.meta.favicon) favLink.href = DATA.meta.favicon;

/* ---------------- Navbar brand ---------------- */
document.getElementById("nav-avatar").src = DATA.contact.image || DATA.hero.heroImage;
document.getElementById("nav-name").textContent = DATA.hero.name;

/* ---------------- Hero ---------------- */
document.getElementById("hero-name").textContent = DATA.hero.name;
document.getElementById("hero-tagline").textContent = DATA.hero.tagline;
document.getElementById("hero-img").src = DATA.hero.heroImage;
document.getElementById("hero-cta-primary").textContent = DATA.hero.ctaPrimary.label;
document.getElementById("hero-cta-primary").href = DATA.hero.ctaPrimary.href;
document.getElementById("hero-cta-secondary").textContent = DATA.hero.ctaSecondary.label;
document.getElementById("hero-cta-secondary").href = DATA.hero.ctaSecondary.href;
if (DATA.hero.ctaResume && DATA.hero.ctaResume.href){
  const resumeBtn = document.getElementById("hero-cta-resume");
  resumeBtn.querySelector("span").textContent = DATA.hero.ctaResume.label || "Download Resume";
  resumeBtn.href = DATA.hero.ctaResume.href;
} else {
  document.getElementById("hero-cta-resume").style.display = "none";
}

// typing roles effect
(function typeRoles(){
  const roles = DATA.hero.roles || [];
  const target = document.getElementById("hero-roles-text");
  if (!roles.length || !target) return;
  let roleIdx = 0, charIdx = 0, deleting = false;

  function tick(){
    const current = roles[roleIdx];
    if (!deleting){
      charIdx++;
      target.textContent = current.slice(0, charIdx);
      if (charIdx === current.length){
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      charIdx--;
      target.textContent = current.slice(0, charIdx);
      if (charIdx === 0){
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 65);
  }
  tick();
})();

/* ---------------- Code typewriter intro (signature moment) ---------------- */
(function codeTypewriter(){
  const codeEl = document.getElementById("code-typed");
  if (!codeEl) return;
  const roles = (DATA.hero.roles && DATA.hero.roles[0]) || "Full-Stack Developer";
  const lines = [
    { text: "const developer = {", html: `<span class="tok-kw">const</span> developer = {` },
    { text: `  name: '${DATA.hero.name}',`, html: `&nbsp;&nbsp;<span class="tok-prop">name</span>: <span class="tok-str">'${DATA.hero.name}'</span>,` },
    { text: `  role: '${roles}',`, html: `&nbsp;&nbsp;<span class="tok-prop">role</span>: <span class="tok-str">'${roles}'</span>,` },
    { text: `  stack: ['Python', 'Django', 'React.js'],`, html: `&nbsp;&nbsp;<span class="tok-prop">stack</span>: [<span class="tok-str">'Python'</span>, <span class="tok-str">'Django'</span>, <span class="tok-str">'React.js'</span>],` },
    { text: `  experience: '7+ months, production',`, html: `&nbsp;&nbsp;<span class="tok-prop">experience</span>: <span class="tok-str">'7+ months, production'</span>,` },
    { text: `  availableForWork: true`, html: `&nbsp;&nbsp;<span class="tok-prop">availableForWork</span>: <span class="tok-kw">true</span>` },
    { text: `};`, html: `};` }
  ];
  let li = 0;
  function typeLine(){
    if (li >= lines.length) return;
    const line = lines[li];
    let ci = 0;
    const lineDiv = el("div", "code-line");
    codeEl.appendChild(lineDiv);
    (function typeChar(){
      lineDiv.textContent = line.text.slice(0, ci);
      if (ci <= line.text.length){
        ci++;
        setTimeout(typeChar, 16);
      } else {
        lineDiv.innerHTML = line.html;
        li++;
        setTimeout(typeLine, 140);
      }
    })();
  }
  typeLine();
})();

/* ---------------- Signature quote ---------------- */
if (DATA.quote){
  const qImg = document.getElementById("quote-img");
  const qText = document.getElementById("quote-text");
  const qName = document.getElementById("quote-name");
  const qRole = document.getElementById("quote-role");
  if (qImg) qImg.src = DATA.quote.image || DATA.about.image;
  if (qText) qText.textContent = DATA.quote.text;
  if (qName) qName.textContent = DATA.hero.name;
  if (qRole) qRole.textContent = DATA.hero.roles ? DATA.hero.roles[0] : "";
}

/* ---------------- About ---------------- */
document.getElementById("about-img").src = DATA.about.image;
const aboutTextWrap = document.getElementById("about-text");
DATA.about.paragraphs.forEach(p => aboutTextWrap.appendChild(el("p", null, p)));
const statsGrid = document.getElementById("stats-grid");
DATA.about.stats.forEach(s => {
  const match = String(s.value).match(/^(\d+)(.*)$/);
  const numTarget = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const card = el("div", "stat-card reveal");
  card.innerHTML = numTarget !== null
    ? `<div class="stat-value" data-target="${numTarget}" data-suffix="${suffix}">0${suffix}</div><div class="stat-label">${s.label}</div>`
    : `<div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div>`;
  statsGrid.appendChild(card);
});

/* ---------------- Tech Ticker ---------------- */
(function renderTicker(){
  const track = document.getElementById("ticker-track");
  if (!track) return;
  const allSkills = DATA.skills.categories.flatMap(c => c.items);
  const html = allSkills.map(s => `<div class="ticker-item">${renderIconHTML(s.icon, "")}${s.name}</div>`).join("");
  track.innerHTML = html + html; // duplicate for seamless loop
})();

/* ---------------- Services ---------------- */
if (DATA.services){
  document.getElementById("services-heading").textContent = DATA.services.heading;
  document.getElementById("services-sub").textContent = DATA.services.subheading;
  const servicesGrid = document.getElementById("services-grid");
  DATA.services.items.forEach(s => {
    const card = el("div", "service-card reveal tilt");
    card.innerHTML = `
      <div class="service-card-inner">
        <div class="service-icon">${renderIconHTML(s.icon, s.title)}</div>
        <div class="service-title">${s.title}</div>
        <div class="service-desc">${s.description}</div>
      </div>`;
    servicesGrid.appendChild(card);
  });
}

/* ---------------- Skills: interactive tab switcher with proficiency rings ---------------- */
(function renderSkillsPanel(){
  const tabsWrap = document.getElementById("skills-tabs");
  const bodyWrap = document.getElementById("skills-panel-body");
  if (!tabsWrap || !bodyWrap) return;

  const cats = DATA.skills.categories;
  const CIRC = 2 * Math.PI * 26;
  let active = 0;
  let autoTimer = null;

  function buildTabs(){
    tabsWrap.innerHTML = cats.map((cat, i) => `
      <button class="skill-tab${i === active ? " active" : ""}" data-i="${i}" style="--tab-clr:${cat.color || "var(--accent-1)"}">
        <span class="skill-tab-emoji">${cat.emoji || "✦"}</span>
        <span class="skill-tab-name">${cat.name}</span>
      </button>`).join("");
    tabsWrap.querySelectorAll(".skill-tab").forEach(btn => {
      btn.addEventListener("click", () => setActive(+btn.dataset.i, true));
    });
  }

  function buildBody(){
    const cat = cats[active];
    bodyWrap.style.setProperty("--panel-clr", cat.color || "var(--accent-1)");
    bodyWrap.innerHTML = `
      <div class="skills-panel-head">
        <div class="skills-panel-icon">${cat.emoji || "✦"}</div>
        <div>
          <div class="skills-panel-title">${cat.name}</div>
          <div class="skills-panel-desc">${cat.description || ""}</div>
        </div>
      </div>
      <div class="skill-item-grid">
        ${cat.items.map(item => {
          const level = item.level || 75;
          const offset = (CIRC - (CIRC * level / 100)).toFixed(2);
          return `
          <div class="skill-item-card">
            <div class="skill-ring">
              <svg viewBox="0 0 60 60">
                <circle class="ring-bg" cx="30" cy="30" r="26"></circle>
                <circle class="ring-fg" cx="30" cy="30" r="26" style="stroke-dasharray:${CIRC.toFixed(2)};stroke-dashoffset:${offset};"></circle>
              </svg>
              <span class="skill-ring-icon">${renderIconHTML(item.icon, item.name)}</span>
            </div>
            <div class="skill-item-name">${item.name}</div>
            <div class="skill-item-level">${level}%</div>
          </div>`;
        }).join("")}
      </div>`;
    /* restart the CSS entrance animation on every switch (pure CSS, safe default = fully visible) */
    bodyWrap.style.animation = "none";
    void bodyWrap.offsetWidth;
    bodyWrap.style.animation = "";
  }

  function setActive(i, userTriggered){
    active = i;
    tabsWrap.querySelectorAll(".skill-tab").forEach(btn => btn.classList.toggle("active", +btn.dataset.i === i));
    buildBody();
    if (userTriggered) restartAutoplay();
  }

  function restartAutoplay(){
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(() => setActive((active + 1) % cats.length, false), 5000);
  }

  buildTabs();
  buildBody();
  restartAutoplay();

  const panelHost = document.querySelector(".skills-panel");
  if (panelHost){
    panelHost.addEventListener("mouseenter", () => { if (autoTimer) clearInterval(autoTimer); });
    panelHost.addEventListener("mouseleave", restartAutoplay);
  }
})();

/* ---------------- Experience: alternating animated timeline ---------------- */
const timeline = document.getElementById("timeline");
const expIcons = ["💼", "🧑‍💻", "🚀", "⚙️", "📈", "🛠️"];
DATA.experience.items.forEach((exp, i) => {
  const item = el("div", "timeline-item reveal");
  item.style.transitionDelay = (i * 0.1) + "s";
  item.innerHTML = `
    <div class="timeline-dot-wrap"><span class="timeline-dot-pulse"></span><span class="timeline-dot"></span></div>
    <div class="timeline-card">
      <div class="timeline-role-row">
        <div class="timeline-icon">${expIcons[i % expIcons.length]}</div>
        <div class="timeline-role">${exp.role}</div>
      </div>
      <div class="timeline-meta">
        <span class="timeline-pill co">${exp.company}</span>
        <span class="timeline-pill">${exp.period}</span>
      </div>
      <ul>${exp.points.map(p => `<li>${p}</li>`).join("")}</ul>
    </div>`;
  timeline.appendChild(item);
});

/* Timeline center line fills once the section scrolls into view (decorative
   only — the neutral base line is always fully drawn via CSS, so this only
   ever adds an accent on top, never gates visibility). */
const timelineFillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add("in-view");
      timelineFillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
if (timeline) timelineFillObserver.observe(timeline);

/* ---------------- Projects: featured case study ---------------- */
if (DATA.projects.featured){
  const f = DATA.projects.featured;
  const featEl = document.getElementById("featured-case");
  if (featEl){
    featEl.innerHTML = `
      <span class="featured-case-tag">★ ${f.tag}</span>
      <div class="featured-case-title">${f.title}</div>
      <div class="featured-case-stack">${f.stack}</div>
      <div class="featured-case-grid">
        <div class="featured-case-col"><h4>The Challenge</h4><p>${f.challenge}</p></div>
        <div class="featured-case-col"><h4>What I Built</h4><p>${f.approach}</p></div>
        <div class="featured-case-col"><h4>The Result</h4><p>${f.result}</p></div>
      </div>
      ${f.link ? `<a class="btn btn-primary" href="${f.link}" target="_blank" rel="noopener">${f.linkLabel || "View Project"} →</a>` : ""}
    `;
  }
}

/* ---------------- Projects: simple clean cards ---------------- */
const projectGrid = document.getElementById("project-grid");
DATA.projects.items.forEach(p => {
  const card = el("div", "project-card reveal");
  card.innerHTML = `
    <span class="project-tag">${p.tag}</span>
    <div class="project-title">${p.title}</div>
    <div class="project-stack">${p.stack}</div>
    <p class="project-desc">${p.description}</p>
    ${p.link ? `<a class="project-link" href="${p.link}" target="_blank" rel="noopener"><span>${p.linkLabel || "View"}</span><span class="arrow">→</span></a>` : ""}
  `;
  projectGrid.appendChild(card);
});

/* ---------------- GitHub live stats (with graceful fallback) ---------------- */
if (DATA.contact.githubUsername){
  const u = DATA.contact.githubUsername;
  document.getElementById("github-stats-img").src = `https://github-readme-stats.vercel.app/api?username=${u}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=00000000&title_color=22d3ee&text_color=a6a8bb&icon_color=7c5cff`;
  document.getElementById("github-card-link").href = DATA.contact.github;
  const fallbackLink = document.getElementById("github-fallback-link");
  if (fallbackLink) fallbackLink.href = DATA.contact.github;
}

/* ---------------- Education: cinematic cards ---------------- */
const eduGrid = document.getElementById("edu-grid");
const eduIcons = ["🎓", "📘", "📜", "🏅", "🧭", "⭐"];
DATA.education.items.forEach((e2, i) => {
  const card = el("div", "edu-cine-card reveal");
  card.innerHTML = `
    <div class="edu-cine-num">0${i + 1}</div>
    <div class="edu-cine-icon">${eduIcons[i % eduIcons.length]}</div>
    <div class="edu-cine-body">
      <div class="edu-cine-title">${e2.title}</div>
      <div class="edu-cine-place">${e2.place}</div>
      <div class="edu-cine-meta"><span class="edu-cine-period">${e2.period}</span><span class="edu-cine-detail">${e2.detail}</span></div>
    </div>`;
  eduGrid.appendChild(card);
});
const strengthsWrap = document.getElementById("strengths-wrap");
DATA.education.strengths.forEach(s => strengthsWrap.appendChild(el("span", "strength-pill", s)));

/* ---------------- Contact ---------------- */
document.getElementById("contact-img").src = DATA.contact.image;
document.getElementById("contact-email").textContent = DATA.contact.email;
document.getElementById("contact-email").href = "mailto:" + DATA.contact.email;
document.getElementById("contact-phone").textContent = DATA.contact.phone;
document.getElementById("contact-phone").href = "tel:" + DATA.contact.phone.replace(/\s+/g,"");
document.getElementById("contact-location").textContent = DATA.contact.location;
document.getElementById("contact-linkedin").href = DATA.contact.linkedin;
document.getElementById("contact-github").href = DATA.contact.github;
document.getElementById("footer-year-name").textContent = DATA.hero.name;
const footerSig = document.getElementById("footer-signature");
if (footerSig) footerSig.textContent = DATA.hero.name;
const footerLinkedin = document.getElementById("footer-linkedin");
if (footerLinkedin) footerLinkedin.href = DATA.contact.linkedin;
const footerGithub = document.getElementById("footer-github");
if (footerGithub) footerGithub.href = DATA.contact.github;
const footerEmail = document.getElementById("footer-email");
if (footerEmail) footerEmail.href = "mailto:" + DATA.contact.email;
document.getElementById("year").textContent = new Date().getFullYear();

// hero socials
document.getElementById("hero-linkedin").href = DATA.contact.linkedin;
document.getElementById("hero-github").href = DATA.contact.github;
document.getElementById("hero-email").href = "mailto:" + DATA.contact.email;

// whatsapp fab
if (DATA.contact.whatsapp){
  document.getElementById("whatsapp-fab").href = `https://wa.me/${DATA.contact.whatsapp}?text=${encodeURIComponent("Hi " + DATA.hero.name + ", I saw your portfolio and would like to connect!")}`;
} else {
  document.getElementById("whatsapp-fab").style.display = "none";
}

/* ---------------- Contact form (AJAX via FormSubmit) ---------------- */
(function setupContactForm(){
  const form = document.getElementById("contact-form");
  if (!form) return;
  const statusEl = document.getElementById("form-status");
  const submitBtn = document.getElementById("contact-form-submit");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (form.querySelector('[name="_honey"]').value) return; // bot trap
    const endpoint = DATA.contact.formEndpoint;
    if (!endpoint){
      statusEl.textContent = "Message form isn't configured yet — email me directly instead.";
      statusEl.className = "form-status error";
      return;
    }
    submitBtn.classList.add("sending");
    statusEl.textContent = "";
    statusEl.className = "form-status";
    const fd = new FormData(form);
    fd.append("_subject", `New portfolio message from ${fd.get("name")}`);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: fd
      });
      if (res.ok){
        statusEl.textContent = "Thanks! Your message has been sent — I'll reply soon.";
        statusEl.className = "form-status success";
        form.reset();
        if (typeof fireConfetti === "function") fireConfetti();
      } else {
        throw new Error("Request failed");
      }
    } catch (err) {
      statusEl.textContent = "Couldn't send right now — please email me directly at " + DATA.contact.email;
      statusEl.className = "form-status error";
    } finally {
      submitBtn.classList.remove("sending");
    }
  });
})();

/* ---------------- Section titles (so admin edits propagate) ---------------- */
document.getElementById("about-heading").textContent = DATA.about.heading;
document.getElementById("skills-heading").textContent = DATA.skills.heading;
document.getElementById("skills-sub").textContent = DATA.skills.subheading;
document.getElementById("exp-heading").textContent = DATA.experience.heading;
document.getElementById("projects-heading").textContent = DATA.projects.heading;
document.getElementById("projects-sub").textContent = DATA.projects.subheading;
document.getElementById("edu-heading").textContent = DATA.education.heading;
document.getElementById("contact-heading").textContent = DATA.contact.heading;
document.getElementById("contact-sub").textContent = DATA.contact.subheading;

/* ---------------- Navbar scroll state ---------------- */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
  document.getElementById("to-top").classList.toggle("show", window.scrollY > 600);
});

/* ---------------- Mobile nav ---------------- */
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  navToggle.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

/* ---------------- Back to top ---------------- */
document.getElementById("to-top").addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

/* ---------------- Cursor glow ---------------- */
const glow = document.getElementById("cursor-glow");
window.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* ---------------- Scroll reveal + counters ---------------- */
function animateCounter(elx){
  const target = parseInt(elx.dataset.target, 10);
  const suffix = elx.dataset.suffix || "";
  if (isNaN(target)) return;
  const duration = 1400;
  const start = performance.now();
  function frame(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    elx.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add("in");
      const counter = entry.target.querySelector(".stat-value[data-target]");
      if (counter) animateCounter(counter);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(elx => revealObserver.observe(elx));

/* Note: image wipe-reveal (.clip-reveal) is handled purely via CSS
   animation in style.css — no JS needed, so photos always end up visible
   even if something else on the page errors. */

/* ---------------- Dynamic time-of-day greeting ---------------- */
(function greeting(){
  const wordEl = document.getElementById("hero-greeting-word");
  if (!wordEl) return;
  const hour = new Date().getHours();
  let word = "Hi";
  if (hour >= 5 && hour < 12) word = "Good morning";
  else if (hour >= 12 && hour < 17) word = "Good afternoon";
  else if (hour >= 17 && hour < 22) word = "Good evening";
  else word = "Vanakkam";
  wordEl.textContent = word;
})();

/* ---------------- Copy email button ---------------- */
(function copyEmail(){
  const btn = document.getElementById("copy-email-btn");
  const tooltip = document.getElementById("copy-tooltip");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(DATA.contact.email);
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = DATA.contact.email;
      document.body.appendChild(ta); ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    tooltip.classList.add("show");
    setTimeout(() => tooltip.classList.remove("show"), 1500);
  });
})();

/* ---------------- Scrollspy ---------------- */
(function scrollspy(){
  const links = document.querySelectorAll(".nav-links a[href^='#']");
  const sections = Array.from(links).map(l => document.querySelector(l.getAttribute("href"))).filter(Boolean);
  if (!sections.length) return;
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = "#" + entry.target.id;
      const link = document.querySelector(`.nav-links a[href='${id}']`);
      if (!link) return;
      if (entry.isIntersecting){
        links.forEach(l => l.classList.remove("active-link"));
        link.classList.add("active-link");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
  sections.forEach(s => spyObserver.observe(s));
})();

/* ---------------- Magnetic buttons ---------------- */
(function magnetic(){
  if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
  const targets = document.querySelectorAll(".btn-primary, .btn-outline, .social-icon, .nav-cta, .theme-toggle");
  targets.forEach(t => {
    t.classList.add("magnetic");
    t.addEventListener("mousemove", (e) => {
      const rect = t.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      t.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    t.addEventListener("mouseleave", () => { t.style.transform = ""; });
  });
})();

/* ---------------- Text scramble heading reveal ---------------- */
(function scrambleHeadings(){
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&";
  function scramble(elx){
    const final = elx.textContent;
    if (!final.trim()) return;
    let frame = 0;
    const totalFrames = 18;
    const revealCount = final.length;
    function tick(){
      frame++;
      let out = "";
      for (let i = 0; i < revealCount; i++){
        if (i < (frame / totalFrames) * revealCount){
          out += final[i];
        } else {
          out += final[i] === " " ? " " : chars[Math.floor(Math.random() * chars.length)];
        }
      }
      elx.textContent = out;
      if (frame < totalFrames){
        requestAnimationFrame(tick);
      } else {
        elx.textContent = final;
      }
    }
    tick();
  }
  const headings = document.querySelectorAll(".section-title");
  const headObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.textContent.trim()){
        scramble(entry.target);
        headObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  // wait a tick so text content (set synchronously above) is present before observing
  setTimeout(() => headings.forEach(h => headObserver.observe(h)), 50);
})();

/* ---------------- Confetti burst ---------------- */
function fireConfetti(){
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ["#7c5cff", "#22d3ee", "#ec4899", "#d4af37", "#34d399"];
  const pieces = Array.from({ length: 140 }, () => ({
    x: canvas.width / 2, y: canvas.height / 2,
    vx: (Math.random() - 0.5) * 14, vy: (Math.random() - 1.6) * 14,
    size: Math.random() * 7 + 4, color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * 360, vr: (Math.random() - 0.5) * 12, life: 100
  }));
  function frame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    pieces.forEach(p => {
      if (p.life <= 0) return;
      alive = true;
      p.vy += 0.35; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= 1.2;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(p.life / 100, 0);
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });
    if (alive) requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  frame();
}

/* ---------------- Parallax orbs ---------------- */
(function parallaxOrbs(){
  const orbs = document.querySelector(".bg-orbs");
  if (!orbs) return;
  window.addEventListener("scroll", () => {
    orbs.style.transform = `translateY(${window.scrollY * -0.12}px)`;
  });
})();

/* ---------------- Konami code easter egg ---------------- */
(function konami(){
  const seq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  let pos = 0;
  window.addEventListener("keydown", (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === seq[pos]){
      pos++;
      if (pos === seq.length){
        pos = 0;
        fireConfetti();
        showEasterEggToast();
      }
    } else {
      pos = (key === seq[0]) ? 1 : 0;
    }
  });
  function showEasterEggToast(){
    const t = document.createElement("div");
    t.textContent = "You found the easter egg! Thanks for exploring the whole site 🎉";
    t.style.cssText = "position:fixed;bottom:26px;left:50%;transform:translateX(-50%);background:var(--surface);border:1px solid var(--accent-2);padding:14px 24px;border-radius:12px;font-weight:700;font-size:0.88rem;z-index:1000;box-shadow:0 10px 30px rgba(0,0,0,0.4);";
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3500);
  }
})();

/* ---------------- Theme toggle ---------------- */
document.getElementById("theme-toggle").addEventListener("click", () => {
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  if (isLight){
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("jeeva_theme_mode", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("jeeva_theme_mode", "light");
  }
});

/* ---------------- Preloader ---------------- */
(function preloader(){
  const pre = document.getElementById("preloader");
  const fill = document.getElementById("preloader-fill");
  const pct = document.getElementById("preloader-pct");
  if (!pre) return;
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100){
      progress = 100;
      clearInterval(interval);
      fill.style.width = "100%";
      pct.textContent = "100%";
      setTimeout(() => {
        pre.classList.add("done");
        setTimeout(() => pre.remove(), 700);
      }, 250);
      return;
    }
    fill.style.width = progress + "%";
    pct.textContent = Math.round(progress) + "%";
  }, 140);
})();

/* ---------------- Scroll progress bar ---------------- */
(function scrollProgress(){
  const fill = document.getElementById("scroll-progress-fill");
  if (!fill) return;
  window.addEventListener("scroll", () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    fill.style.width = scrolled + "%";
  });
})();

/* ---------------- Custom cursor ---------------- */
(function customCursor(){
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  if (!dot || !ring || !window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
  let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + "px"; dot.style.top = mouseY + "px";
  });
  function loop(){
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = ringX + "px"; ring.style.top = ringY + "px";
    requestAnimationFrame(loop);
  }
  loop();
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest("a, button, input, textarea, .skill-card, .project-card, .service-card")){
      ring.classList.add("active");
    }
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest("a, button, input, textarea, .skill-card, .project-card, .service-card")){
      ring.classList.remove("active");
    }
  });
})();

/* ---------------- Particle network canvas (hero) ---------------- */
(function particles(){
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, particlesArr = [];
  const hero = canvas.closest(".hero");
  let mouse = { x: null, y: null };

  function resize(){
    w = canvas.width = hero.offsetWidth;
    h = canvas.height = hero.offsetHeight;
    const count = Math.min(70, Math.floor((w * h) / 18000));
    particlesArr = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, r: Math.random() * 1.6 + 0.6
    }));
  }
  window.addEventListener("resize", resize);
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
  });
  hero.addEventListener("mouseleave", () => { mouse.x = null; mouse.y = null; });

  function draw(){
    ctx.clearRect(0, 0, w, h);
    particlesArr.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      if (mouse.x !== null){
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120){ p.x += dx / dist * 0.6; p.y += dy / dist * 0.6; }
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(124,92,255,0.55)";
      ctx.fill();
    });
    for (let i = 0; i < particlesArr.length; i++){
      for (let j = i + 1; j < particlesArr.length; j++){
        const a = particlesArr[i], b = particlesArr[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 130){
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(34,211,238,${0.18 * (1 - dist / 130)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  resize();
  draw();
})();

/* ---------------- 3D tilt on cards ---------------- */
(function tiltCards(){
  if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
  function attachTilt(elx, strength){
    elx.addEventListener("mousemove", (e) => {
      const rect = elx.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      elx.style.transform = `perspective(800px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) translateY(-6px)`;
    });
    elx.addEventListener("mouseleave", () => { elx.style.transform = ""; });
  }
  setTimeout(() => {
    document.querySelectorAll(".project-card").forEach(c => attachTilt(c, 6));
    document.querySelectorAll(".service-card").forEach(c => attachTilt(c, 8));
    document.querySelectorAll(".timeline-card").forEach(c => attachTilt(c, 3));
  }, 300);
})();

/* ---------------- Quick Nav / Command Palette (new feature) ----------------
   Ctrl/Cmd+K or "/" opens a searchable jump-to-section + quick-action menu.
   Trigger button is always fully visible; the overlay is a standard modal
   (closed by default is expected UX here — not a hidden-content risk),
   so if this script fails nothing else on the page is affected. */
(function commandPalette(){
  const trigger = document.getElementById("cmdk-trigger");
  const overlay = document.getElementById("cmdk-overlay");
  const input = document.getElementById("cmdk-input");
  const list = document.getElementById("cmdk-list");
  if (!trigger || !overlay || !input || !list) return;

  function scrollToHash(hash){
    const target = document.querySelector(hash);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const items = [
    { icon: "🏠", label: "Home", hint: "Back to top", action: () => scrollToHash("#home") },
    { icon: "👤", label: "About", hint: "Section", action: () => scrollToHash("#about") },
    { icon: "🛠️", label: "Services", hint: "Section", action: () => scrollToHash("#services") },
    { icon: "💡", label: "Skills & Tools", hint: "Section", action: () => scrollToHash("#skills") },
    { icon: "💼", label: "Experience", hint: "Section", action: () => scrollToHash("#experience") },
    { icon: "🚀", label: "Projects", hint: "Section", action: () => scrollToHash("#projects") },
    { icon: "🎓", label: "Education", hint: "Section", action: () => scrollToHash("#education") },
    { icon: "✉️", label: "Contact", hint: "Section", action: () => scrollToHash("#contact") },
    { icon: "⬇️", label: "Download Resume", hint: "Action", action: () => {
        const a = document.createElement("a"); a.href = DATA.hero.resumeFile; a.download = ""; a.click();
      } },
    { icon: "📧", label: "Email Me", hint: DATA.contact.email || "", action: () => { window.location.href = "mailto:" + DATA.contact.email; } },
    { icon: "🐙", label: "View GitHub", hint: "Opens in new tab", action: () => window.open(DATA.contact.github, "_blank", "noopener") },
    { icon: "in", label: "View LinkedIn", hint: "Opens in new tab", action: () => window.open(DATA.contact.linkedin, "_blank", "noopener") },
    { icon: "🌓", label: "Toggle Theme", hint: "Light / Dark mode", action: () => { const t = document.getElementById("theme-toggle"); if (t) t.click(); } }
  ];
  if (DATA.contact.whatsapp){
    items.push({ icon: "💬", label: "Chat on WhatsApp", hint: "Opens in new tab", action: () => {
        const fab = document.getElementById("whatsapp-fab");
        if (fab && fab.href) window.open(fab.href, "_blank", "noopener");
      } });
  }

  let filtered = items.slice();
  let activeIndex = 0;

  function render(){
    const q = input.value.trim().toLowerCase();
    filtered = q ? items.filter(it => it.label.toLowerCase().includes(q)) : items.slice();
    activeIndex = 0;
    if (!filtered.length){
      list.innerHTML = `<div class="cmdk-empty">No matches — try another search.</div>`;
      return;
    }
    list.innerHTML = filtered.map((it, i) => `
      <div class="cmdk-item${i === activeIndex ? " active" : ""}" data-i="${i}">
        <span class="cmdk-item-icon">${it.icon}</span>
        <div><div class="cmdk-item-label">${it.label}</div><div class="cmdk-item-hint">${it.hint}</div></div>
      </div>`).join("");
    list.querySelectorAll(".cmdk-item").forEach(row => {
      row.addEventListener("click", () => runItem(+row.dataset.i));
      row.addEventListener("mouseenter", () => { activeIndex = +row.dataset.i; updateActive(); });
    });
  }

  function updateActive(){
    list.querySelectorAll(".cmdk-item").forEach((row, i) => row.classList.toggle("active", i === activeIndex));
  }

  function runItem(i){
    const it = filtered[i];
    if (!it) return;
    close();
    setTimeout(() => it.action(), 150);
  }

  function open(){
    overlay.classList.add("open");
    input.value = "";
    render();
    setTimeout(() => input.focus(), 50);
    document.body.style.overflow = "hidden";
  }
  function close(){
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  trigger.addEventListener("click", open);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  input.addEventListener("input", render);
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown"){ e.preventDefault(); activeIndex = Math.min(activeIndex + 1, filtered.length - 1); updateActive(); }
    else if (e.key === "ArrowUp"){ e.preventDefault(); activeIndex = Math.max(activeIndex - 1, 0); updateActive(); }
    else if (e.key === "Enter"){ e.preventDefault(); runItem(activeIndex); }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")){ close(); return; }
    const tag = (e.target.tagName || "").toLowerCase();
    const typing = tag === "input" || tag === "textarea" || e.target.isContentEditable;
    if ((e.key === "k" || e.key === "K") && (e.ctrlKey || e.metaKey)){
      e.preventDefault(); open();
    } else if (e.key === "/" && !typing){
      e.preventDefault(); open();
    }
  });
})();
