/* ==========================================================================
   N. Jeeva — Admin Panel Logic
   Everything is saved into localStorage ("jeeva_portfolio_content") in THIS
   browser. index.html reads that override automatically. Use Export/Import
   to move your data between browsers or back it up.
   ========================================================================== */

const PW_KEY = "jeeva_admin_pw";
const CONTENT_KEY = "jeeva_portfolio_content";
const DEFAULT_PW = "jeeva2026";

let content = null;
let dirty = false;

/* ---------------- Auth ---------------- */
function getStoredPw(){ return localStorage.getItem(PW_KEY) || DEFAULT_PW; }

document.getElementById("login-btn").addEventListener("click", tryLogin);
document.getElementById("login-pw").addEventListener("keydown", e => { if (e.key === "Enter") tryLogin(); });

function tryLogin(){
  const val = document.getElementById("login-pw").value;
  if (val === getStoredPw()){
    sessionStorage.setItem("jeeva_admin_auth", "1");
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("admin-app").style.display = "flex";
    boot();
  } else {
    document.getElementById("login-error").textContent = "Wrong password. Try again.";
  }
}

if (sessionStorage.getItem("jeeva_admin_auth") === "1"){
  document.getElementById("login-screen").style.display = "none";
  document.getElementById("admin-app").style.display = "flex";
  boot();
}

document.getElementById("btn-logout").addEventListener("click", () => {
  sessionStorage.removeItem("jeeva_admin_auth");
  location.reload();
});

/* ---------------- Boot ---------------- */
function boot(){
  content = JSON.parse(JSON.stringify(getPortfolioContent()));
  bindSimpleFields();
  renderStats();
  renderServices();
  renderSkillCategories();
  renderExperience();
  renderProjects();
  renderEducation();
  renderImages();
  renderTheme();
  refreshRawJson();
  setupTabs();
  setupTopbar();
  setupResumeUpload();
}

function renderAll(){
  bindSimpleFields();
  renderStats(); renderServices(); renderSkillCategories(); renderExperience();
  renderProjects(); renderEducation(); renderImages(); renderTheme(); refreshRawJson();
}

function markDirty(){
  dirty = true;
  const el = document.getElementById("topbar-status");
  el.textContent = "Unsaved changes";
  el.classList.add("dirty");
}
function markClean(){
  dirty = false;
  const el = document.getElementById("topbar-status");
  el.textContent = "All changes saved";
  el.classList.remove("dirty");
}

/* ---------------- Tabs ---------------- */
function setupTabs(){
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("panel-" + btn.dataset.tab).classList.add("active");
      if (btn.dataset.tab === "advanced") refreshRawJson();
    });
  });
}

/* ---------------- Simple field binding ---------------- */
function bind(id, getVal, setVal){
  const el = document.getElementById(id);
  el.value = getVal();
  el.addEventListener("input", () => { setVal(el.value); markDirty(); });
}

function bindSimpleFields(){
  bind("f-hero-name", () => content.hero.name, v => content.hero.name = v);
  bind("f-hero-greeting", () => content.hero.greeting, v => content.hero.greeting = v);
  bind("f-hero-roles", () => (content.hero.roles || []).join("\n"), v => content.hero.roles = v.split("\n").map(s=>s.trim()).filter(Boolean));
  bind("f-hero-tagline", () => content.hero.tagline, v => content.hero.tagline = v);
  bind("f-hero-cta1-label", () => content.hero.ctaPrimary.label, v => content.hero.ctaPrimary.label = v);
  bind("f-hero-cta1-href", () => content.hero.ctaPrimary.href, v => content.hero.ctaPrimary.href = v);
  bind("f-hero-cta2-label", () => content.hero.ctaSecondary.label, v => content.hero.ctaSecondary.label = v);
  bind("f-hero-cta2-href", () => content.hero.ctaSecondary.href, v => content.hero.ctaSecondary.href = v);
  if (!content.hero.ctaResume) content.hero.ctaResume = { label: "Download Resume", href: "" };
  bind("f-hero-resume-label", () => content.hero.ctaResume.label, v => content.hero.ctaResume.label = v);
  bind("f-hero-resume-href", () => content.hero.ctaResume.href, v => content.hero.ctaResume.href = v);

  bind("f-about-heading", () => content.about.heading, v => content.about.heading = v);
  bind("f-about-paragraphs", () => (content.about.paragraphs||[]).join("\n"), v => content.about.paragraphs = v.split("\n").map(s=>s.trim()).filter(Boolean));

  if (!content.services) content.services = { heading: "What I Do", subheading: "", items: [] };
  bind("f-services-heading", () => content.services.heading, v => content.services.heading = v);
  bind("f-services-sub", () => content.services.subheading, v => content.services.subheading = v);

  bind("f-skills-heading", () => content.skills.heading, v => content.skills.heading = v);
  bind("f-skills-sub", () => content.skills.subheading, v => content.skills.subheading = v);

  bind("f-exp-heading", () => content.experience.heading, v => content.experience.heading = v);
  bind("f-projects-heading", () => content.projects.heading, v => content.projects.heading = v);
  bind("f-projects-sub", () => content.projects.subheading, v => content.projects.subheading = v);
  bind("f-edu-heading", () => content.education.heading, v => content.education.heading = v);
  bind("f-strengths", () => (content.education.strengths||[]).join(", "), v => content.education.strengths = v.split(",").map(s=>s.trim()).filter(Boolean));

  bind("f-contact-heading", () => content.contact.heading, v => content.contact.heading = v);
  bind("f-contact-sub", () => content.contact.subheading, v => content.contact.subheading = v);
  bind("f-contact-email", () => content.contact.email, v => content.contact.email = v);
  bind("f-contact-phone", () => content.contact.phone, v => content.contact.phone = v);
  bind("f-contact-linkedin", () => content.contact.linkedin, v => content.contact.linkedin = v);
  bind("f-contact-github", () => content.contact.github, v => content.contact.github = v);
  bind("f-contact-githubuser", () => content.contact.githubUsername || "", v => content.contact.githubUsername = v);
  bind("f-contact-location", () => content.contact.location, v => content.contact.location = v);
  bind("f-contact-whatsapp", () => content.contact.whatsapp || "", v => content.contact.whatsapp = v);
  bind("f-contact-formendpoint", () => content.contact.formEndpoint || "", v => content.contact.formEndpoint = v);
}

/* ---------------- Services repeater ---------------- */
function renderServices(){
  const wrap = document.getElementById("repeater-services");
  wrap.innerHTML = "";
  content.services.items.forEach((s, i) => {
    const card = document.createElement("div");
    card.className = "rep-card";
    card.innerHTML = `
      <div class="rep-card-head"><span class="rep-card-title">${s.title || "Service"}</span><button class="rep-remove" data-i="${i}">Remove</button></div>
      <div class="field-row">
        <div class="field"><label>Title</label><input class="svc-title" data-i="${i}" value="${escAttr(s.title)}"></div>
        <div class="field"><label>Icon URL</label><input class="svc-icon" data-i="${i}" value="${escAttr(s.icon)}"></div>
      </div>
      <div class="field"><label>Description</label><textarea class="svc-desc" rows="2" data-i="${i}">${escHtml(s.description)}</textarea></div>`;
    wrap.appendChild(card);
  });
  wrap.querySelectorAll(".rep-remove").forEach(b => b.addEventListener("click", () => {
    content.services.items.splice(+b.dataset.i, 1); markDirty(); renderServices();
  }));
  wrap.querySelectorAll(".svc-title").forEach(inp => inp.addEventListener("input", () => { content.services.items[+inp.dataset.i].title = inp.value; markDirty(); }));
  wrap.querySelectorAll(".svc-icon").forEach(inp => inp.addEventListener("input", () => { content.services.items[+inp.dataset.i].icon = inp.value; markDirty(); }));
  wrap.querySelectorAll(".svc-desc").forEach(inp => inp.addEventListener("input", () => { content.services.items[+inp.dataset.i].description = inp.value; markDirty(); }));
}
document.getElementById("add-service").addEventListener("click", () => {
  content.services.items.push({ title: "New Service", icon: "https://cdn.simpleicons.org/starship/ffffff", description: "" });
  markDirty(); renderServices();
});

/* ---------------- Resume upload ---------------- */
function setupResumeUpload(){
  const inp = document.getElementById("f-hero-resume-upload");
  inp.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      content.hero.ctaResume.href = reader.result;
      content.hero.resumeFile = reader.result;
      document.getElementById("f-hero-resume-href").value = "(uploaded file — stored in browser)";
      markDirty();
      showToast("Resume uploaded. Click Save Changes to publish.");
    };
    reader.readAsDataURL(file);
  });
}

/* ---------------- Stats repeater ---------------- */
function renderStats(){
  const wrap = document.getElementById("repeater-stats");
  wrap.innerHTML = "";
  content.about.stats.forEach((stat, i) => {
    const card = document.createElement("div");
    card.className = "rep-card";
    card.innerHTML = `
      <div class="rep-card-head"><span class="rep-card-title">Stat ${i+1}</span><button class="rep-remove" data-i="${i}">Remove</button></div>
      <div class="field-row">
        <div class="field"><label>Value</label><input class="stat-value-in" data-i="${i}" value="${escAttr(stat.value)}"></div>
        <div class="field"><label>Label</label><input class="stat-label-in" data-i="${i}" value="${escAttr(stat.label)}"></div>
      </div>`;
    wrap.appendChild(card);
  });
  wrap.querySelectorAll(".rep-remove").forEach(b => b.addEventListener("click", () => {
    content.about.stats.splice(+b.dataset.i, 1); markDirty(); renderStats();
  }));
  wrap.querySelectorAll(".stat-value-in").forEach(inp => inp.addEventListener("input", () => {
    content.about.stats[+inp.dataset.i].value = inp.value; markDirty();
  }));
  wrap.querySelectorAll(".stat-label-in").forEach(inp => inp.addEventListener("input", () => {
    content.about.stats[+inp.dataset.i].label = inp.value; markDirty();
  }));
}
document.getElementById("add-stat").addEventListener("click", () => {
  content.about.stats.push({ value: "0", label: "New Stat" }); markDirty(); renderStats();
});

/* ---------------- Skills repeater (nested) ---------------- */
function renderSkillCategories(){
  const wrap = document.getElementById("repeater-skill-categories");
  wrap.innerHTML = "";
  content.skills.categories.forEach((cat, ci) => {
    const card = document.createElement("div");
    card.className = "rep-card";
    card.innerHTML = `
      <div class="rep-card-head">
        <input class="cat-name-in" data-ci="${ci}" value="${escAttr(cat.name)}" style="max-width:260px;font-weight:700;">
        <button class="rep-remove" data-ci="${ci}">Remove Category</button>
      </div>
      <div class="nested-box">
        <div class="sub-repeater" data-ci="${ci}"></div>
        <button class="btn-outline sub-add" data-ci="${ci}">+ Add Skill</button>
      </div>`;
    wrap.appendChild(card);
    const subWrap = card.querySelector(".sub-repeater");
    cat.items.forEach((item, ii) => {
      const row = document.createElement("div");
      row.className = "sub-rep-row";
      row.innerHTML = `
        <input placeholder="Skill name" class="skill-name-in" data-ci="${ci}" data-ii="${ii}" value="${escAttr(item.name)}">
        <input placeholder="Icon URL" class="skill-icon-in" data-ci="${ci}" data-ii="${ii}" value="${escAttr(item.icon)}">
        <input placeholder="Level %" type="number" min="0" max="100" class="skill-level-in" data-ci="${ci}" data-ii="${ii}" value="${item.level != null ? item.level : 75}" style="max-width:80px;">
        <button class="sub-remove" data-ci="${ci}" data-ii="${ii}">✕</button>`;
      subWrap.appendChild(row);
    });
  });

  wrap.querySelectorAll(".cat-name-in").forEach(inp => inp.addEventListener("input", () => {
    content.skills.categories[+inp.dataset.ci].name = inp.value; markDirty();
  }));
  wrap.querySelectorAll(".rep-remove").forEach(b => b.addEventListener("click", () => {
    content.skills.categories.splice(+b.dataset.ci, 1); markDirty(); renderSkillCategories();
  }));
  wrap.querySelectorAll(".skill-name-in").forEach(inp => inp.addEventListener("input", () => {
    content.skills.categories[+inp.dataset.ci].items[+inp.dataset.ii].name = inp.value; markDirty();
  }));
  wrap.querySelectorAll(".skill-icon-in").forEach(inp => inp.addEventListener("input", () => {
    content.skills.categories[+inp.dataset.ci].items[+inp.dataset.ii].icon = inp.value; markDirty();
  }));
  wrap.querySelectorAll(".skill-level-in").forEach(inp => inp.addEventListener("input", () => {
    let v = parseInt(inp.value, 10);
    if (isNaN(v)) v = 75;
    v = Math.max(0, Math.min(100, v));
    content.skills.categories[+inp.dataset.ci].items[+inp.dataset.ii].level = v; markDirty();
  }));
  wrap.querySelectorAll(".sub-remove").forEach(b => b.addEventListener("click", () => {
    content.skills.categories[+b.dataset.ci].items.splice(+b.dataset.ii, 1); markDirty(); renderSkillCategories();
  }));
  wrap.querySelectorAll(".sub-add").forEach(b => b.addEventListener("click", () => {
    content.skills.categories[+b.dataset.ci].items.push({ name: "New Skill", icon: "https://cdn.simpleicons.org/starship/ffffff", level: 75 });
    markDirty(); renderSkillCategories();
  }));
}
document.getElementById("add-skill-category").addEventListener("click", () => {
  content.skills.categories.push({ name: "New Category", items: [] }); markDirty(); renderSkillCategories();
});

/* ---------------- Experience repeater (nested points) ---------------- */
function renderExperience(){
  const wrap = document.getElementById("repeater-experience");
  wrap.innerHTML = "";
  content.experience.items.forEach((exp, i) => {
    const card = document.createElement("div");
    card.className = "rep-card";
    card.innerHTML = `
      <div class="rep-card-head"><span class="rep-card-title">${exp.role || "Role"}</span><button class="rep-remove" data-i="${i}">Remove</button></div>
      <div class="field-row">
        <div class="field"><label>Role</label><input class="exp-role" data-i="${i}" value="${escAttr(exp.role)}"></div>
        <div class="field"><label>Company</label><input class="exp-company" data-i="${i}" value="${escAttr(exp.company)}"></div>
      </div>
      <div class="field"><label>Period</label><input class="exp-period" data-i="${i}" value="${escAttr(exp.period)}"></div>
      <div class="field"><label>Bullet Points (one per line)</label><textarea class="exp-points" rows="4" data-i="${i}">${escHtml((exp.points||[]).join("\n"))}</textarea></div>`;
    wrap.appendChild(card);
  });
  wrap.querySelectorAll(".rep-remove").forEach(b => b.addEventListener("click", () => {
    content.experience.items.splice(+b.dataset.i, 1); markDirty(); renderExperience();
  }));
  wrap.querySelectorAll(".exp-role").forEach(inp => inp.addEventListener("input", () => { content.experience.items[+inp.dataset.i].role = inp.value; markDirty(); }));
  wrap.querySelectorAll(".exp-company").forEach(inp => inp.addEventListener("input", () => { content.experience.items[+inp.dataset.i].company = inp.value; markDirty(); }));
  wrap.querySelectorAll(".exp-period").forEach(inp => inp.addEventListener("input", () => { content.experience.items[+inp.dataset.i].period = inp.value; markDirty(); }));
  wrap.querySelectorAll(".exp-points").forEach(inp => inp.addEventListener("input", () => {
    content.experience.items[+inp.dataset.i].points = inp.value.split("\n").map(s=>s.trim()).filter(Boolean); markDirty();
  }));
}
document.getElementById("add-experience").addEventListener("click", () => {
  content.experience.items.push({ role: "New Role", company: "Company", period: "2026", points: [] });
  markDirty(); renderExperience();
});

/* ---------------- Projects repeater ---------------- */
function renderProjects(){
  const wrap = document.getElementById("repeater-projects");
  wrap.innerHTML = "";
  content.projects.items.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "rep-card";
    card.innerHTML = `
      <div class="rep-card-head"><span class="rep-card-title">${p.title || "Project"}</span><button class="rep-remove" data-i="${i}">Remove</button></div>
      <div class="field-row">
        <div class="field"><label>Title</label><input class="pj-title" data-i="${i}" value="${escAttr(p.title)}"></div>
        <div class="field"><label>Tag</label><input class="pj-tag" data-i="${i}" value="${escAttr(p.tag)}"></div>
      </div>
      <div class="field"><label>Tech Stack</label><input class="pj-stack" data-i="${i}" value="${escAttr(p.stack)}"></div>
      <div class="field"><label>Description</label><textarea class="pj-desc" rows="3" data-i="${i}">${escHtml(p.description)}</textarea></div>
      <div class="field-row">
        <div class="field"><label>Link (optional)</label><input class="pj-link" data-i="${i}" value="${escAttr(p.link)}"></div>
        <div class="field"><label>Link Label</label><input class="pj-linklabel" data-i="${i}" value="${escAttr(p.linkLabel)}"></div>
      </div>`;
    wrap.appendChild(card);
  });
  wrap.querySelectorAll(".rep-remove").forEach(b => b.addEventListener("click", () => {
    content.projects.items.splice(+b.dataset.i, 1); markDirty(); renderProjects();
  }));
  wrap.querySelectorAll(".pj-title").forEach(inp => inp.addEventListener("input", () => { content.projects.items[+inp.dataset.i].title = inp.value; markDirty(); }));
  wrap.querySelectorAll(".pj-tag").forEach(inp => inp.addEventListener("input", () => { content.projects.items[+inp.dataset.i].tag = inp.value; markDirty(); }));
  wrap.querySelectorAll(".pj-stack").forEach(inp => inp.addEventListener("input", () => { content.projects.items[+inp.dataset.i].stack = inp.value; markDirty(); }));
  wrap.querySelectorAll(".pj-desc").forEach(inp => inp.addEventListener("input", () => { content.projects.items[+inp.dataset.i].description = inp.value; markDirty(); }));
  wrap.querySelectorAll(".pj-link").forEach(inp => inp.addEventListener("input", () => { content.projects.items[+inp.dataset.i].link = inp.value; markDirty(); }));
  wrap.querySelectorAll(".pj-linklabel").forEach(inp => inp.addEventListener("input", () => { content.projects.items[+inp.dataset.i].linkLabel = inp.value; markDirty(); }));
}
document.getElementById("add-project").addEventListener("click", () => {
  content.projects.items.push({ title: "New Project", tag: "Project", stack: "", description: "", link: "", linkLabel: "" });
  markDirty(); renderProjects();
});

/* ---------------- Education repeater ---------------- */
function renderEducation(){
  const wrap = document.getElementById("repeater-education");
  wrap.innerHTML = "";
  content.education.items.forEach((e, i) => {
    const card = document.createElement("div");
    card.className = "rep-card";
    card.innerHTML = `
      <div class="rep-card-head"><span class="rep-card-title">${e.title || "Education"}</span><button class="rep-remove" data-i="${i}">Remove</button></div>
      <div class="field-row">
        <div class="field"><label>Title</label><input class="ed-title" data-i="${i}" value="${escAttr(e.title)}"></div>
        <div class="field"><label>Place</label><input class="ed-place" data-i="${i}" value="${escAttr(e.place)}"></div>
      </div>
      <div class="field-row">
        <div class="field"><label>Period</label><input class="ed-period" data-i="${i}" value="${escAttr(e.period)}"></div>
        <div class="field"><label>Detail</label><input class="ed-detail" data-i="${i}" value="${escAttr(e.detail)}"></div>
      </div>`;
    wrap.appendChild(card);
  });
  wrap.querySelectorAll(".rep-remove").forEach(b => b.addEventListener("click", () => {
    content.education.items.splice(+b.dataset.i, 1); markDirty(); renderEducation();
  }));
  wrap.querySelectorAll(".ed-title").forEach(inp => inp.addEventListener("input", () => { content.education.items[+inp.dataset.i].title = inp.value; markDirty(); }));
  wrap.querySelectorAll(".ed-place").forEach(inp => inp.addEventListener("input", () => { content.education.items[+inp.dataset.i].place = inp.value; markDirty(); }));
  wrap.querySelectorAll(".ed-period").forEach(inp => inp.addEventListener("input", () => { content.education.items[+inp.dataset.i].period = inp.value; markDirty(); }));
  wrap.querySelectorAll(".ed-detail").forEach(inp => inp.addEventListener("input", () => { content.education.items[+inp.dataset.i].detail = inp.value; markDirty(); }));
}
document.getElementById("add-education").addEventListener("click", () => {
  content.education.items.push({ title: "New Qualification", place: "", period: "", detail: "" });
  markDirty(); renderEducation();
});

/* ---------------- Theme ---------------- */
function renderTheme(){
  document.getElementById("f-theme-from").value = content.theme.accentFrom;
  document.getElementById("f-theme-to").value = content.theme.accentTo;
  document.getElementById("f-theme-gold").value = content.theme.gold;
  document.getElementById("f-theme-mode").value = content.theme.mode || "dark";
  document.getElementById("f-theme-from").addEventListener("input", e => { content.theme.accentFrom = e.target.value; markDirty(); });
  document.getElementById("f-theme-to").addEventListener("input", e => { content.theme.accentTo = e.target.value; markDirty(); });
  document.getElementById("f-theme-gold").addEventListener("input", e => { content.theme.gold = e.target.value; markDirty(); });
  document.getElementById("f-theme-mode").addEventListener("change", e => { content.theme.mode = e.target.value; markDirty(); });
}

/* ---------------- Images ---------------- */
const IMAGE_SLOTS = [
  { key: "hero.heroImage", label: "Hero Photo", get: () => content.hero.heroImage, set: v => content.hero.heroImage = v },
  { key: "about.image", label: "About Photo", get: () => content.about.image, set: v => content.about.image = v },
  { key: "contact.image", label: "Contact Photo", get: () => content.contact.image, set: v => content.contact.image = v },
  { key: "meta.favicon", label: "Site Icon / Avatar", get: () => content.meta.favicon, set: v => content.meta.favicon = v }
];

function renderImages(){
  const wrap = document.getElementById("image-slots");
  wrap.innerHTML = "";
  IMAGE_SLOTS.forEach((slot, i) => {
    const div = document.createElement("div");
    div.className = "image-slot";
    div.innerHTML = `
      <img src="${slot.get()}" alt="${slot.label}">
      <label>${slot.label}</label>
      <input type="file" accept="image/*" data-i="${i}">`;
    wrap.appendChild(div);
  });
  wrap.querySelectorAll("input[type=file]").forEach(inp => {
    inp.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        IMAGE_SLOTS[+inp.dataset.i].set(reader.result);
        markDirty();
        renderImages();
      };
      reader.readAsDataURL(file);
    });
  });
}

/* ---------------- Advanced JSON ---------------- */
function refreshRawJson(){
  document.getElementById("raw-json").value = JSON.stringify(content, null, 2);
}
document.getElementById("apply-json").addEventListener("click", () => {
  const errEl = document.getElementById("json-error");
  try {
    const parsed = JSON.parse(document.getElementById("raw-json").value);
    content = parsed;
    errEl.textContent = "";
    renderAll();
    markDirty();
    showToast("JSON applied. Click Save Changes to publish.");
  } catch (e) {
    errEl.textContent = "Invalid JSON: " + e.message;
  }
});

/* ---------------- Topbar actions ---------------- */
function setupTopbar(){
  document.getElementById("btn-save").addEventListener("click", () => {
    localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
    markClean();
    showToast("Saved! Refresh the live site to see changes.");
  });

  document.getElementById("btn-export").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "jeeva-portfolio-content.json";
    a.click();
  });

  document.getElementById("btn-import").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        content = JSON.parse(reader.result);
        renderAll();
        markDirty();
        showToast("Imported. Click Save Changes to publish.");
      } catch (err) {
        alert("Could not read that file: " + err.message);
      }
    };
    reader.readAsText(file);
  });

  document.getElementById("btn-reset").addEventListener("click", () => {
    if (!confirm("Reset ALL content back to the original default? This cannot be undone.")) return;
    localStorage.removeItem(CONTENT_KEY);
    content = JSON.parse(JSON.stringify(DEFAULT_CONTENT));
    renderAll();
    markClean();
    showToast("Reset to default content.");
  });

  document.getElementById("btn-change-pw").addEventListener("click", () => {
    const val = document.getElementById("f-new-pw").value.trim();
    if (val.length < 4){ alert("Password should be at least 4 characters."); return; }
    localStorage.setItem(PW_KEY, val);
    document.getElementById("f-new-pw").value = "";
    showToast("Password updated.");
  });
}

/* ---------------- Utils ---------------- */
function escAttr(str){ return (str||"").toString().replace(/"/g,"&quot;"); }
function escHtml(str){ return (str||"").toString().replace(/</g,"&lt;"); }

function showToast(msg){
  let t = document.querySelector(".toast");
  if (!t){ t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}
