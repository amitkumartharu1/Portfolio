const body = document.body;

/* Verified profile URLs supplied by Amit Kumar Tharu. */
const PROFILE_LINKS = {
  linkedin: "https://www.linkedin.com/in/amit-kumar-t-2b4a711b0/",
  github: "https://github.com/amitkumartharu1"
};

function setupProfileLink(id, url) {
  const el = document.getElementById(id);
  if (!el || !url) return;
  el.href = url;
  el.target = "_blank";
  el.rel = "noopener noreferrer";
}

setupProfileLink("linkedinLink", PROFILE_LINKS.linkedin);
setupProfileLink("githubLink", PROFILE_LINKS.github);
setupProfileLink("linkedinTextLink", PROFILE_LINKS.linkedin);
setupProfileLink("githubTextLink", PROFILE_LINKS.github);

/* Mobile navigation */
const mobileMenu = document.getElementById("mobileMenu");
const primaryNav = document.getElementById("primaryNav");
function closeMobileNav() {
  if (!mobileMenu || !primaryNav) return;
  mobileMenu.classList.remove("open");
  primaryNav.classList.remove("open");
  mobileMenu.setAttribute("aria-expanded", "false");
  mobileMenu.setAttribute("aria-label", "Open navigation");
}
if (mobileMenu && primaryNav) {
  mobileMenu.addEventListener("click", () => {
    const open = !primaryNav.classList.contains("open");
    primaryNav.classList.toggle("open", open);
    mobileMenu.classList.toggle("open", open);
    mobileMenu.setAttribute("aria-expanded", String(open));
    mobileMenu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  primaryNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMobileNav));
  window.addEventListener("resize", () => { if (window.innerWidth > 950) closeMobileNav(); });
}

/* Theme */
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("akt-theme");
if (savedTheme === "dark") body.classList.add("dark");
if (themeToggle) {
  themeToggle.setAttribute("aria-pressed", body.classList.contains("dark") ? "true" : "false");
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const dark = body.classList.contains("dark");
    localStorage.setItem("akt-theme", dark ? "dark" : "light");
    themeToggle.setAttribute("aria-pressed", dark ? "true" : "false");
  });
}

/* Skill accordion */
document.querySelectorAll(".skill-group").forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.dataset.skill;
    document.querySelectorAll(".skill-group").forEach((x) => x.classList.remove("active"));
    document.querySelectorAll(".skill-detail").forEach((x) => x.classList.remove("active"));
    document.querySelectorAll(".skill-group").forEach((x) => x.setAttribute("aria-expanded", "false"));
    button.classList.add("active");
    button.setAttribute("aria-expanded", "true");
    const detail = document.getElementById(id);
    if (detail) detail.classList.add("active");
  });
});
const firstSkill = document.querySelector(".skill-group.active");
if (firstSkill) firstSkill.setAttribute("aria-expanded", "true");

/* Work/project modal */
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalKicker = document.getElementById("modalKicker");
const modalFacts = document.getElementById("modalFacts");
let lastFocusedElement = null;

const workData = {
  blind: {
    kicker: "01 / GROUP PROJECT",
    title: "Smart Blind Glass",
    text: "An innovative wearable concept designed to assist visually impaired individuals in navigating their surroundings safely and independently. The glasses use sensors to detect nearby obstacles and alert the user through vibration or audio feedback. The project focuses on mobility, reduced dependency and practical smart technology.",
    facts: ["Sensors", "Obstacle detection", "Vibration / audio feedback", "Accessibility"]
  },
  wholesale: {
    kicker: "02 / PYTHON PROJECT",
    title: "Python-Based Product Wholesale System",
    text: "A console-based wholesale management system developed using Python. It supports product inventory, bulk sales, invoices and returns, with file handling for data storage and a “Buy 3 Get 1 Free” offer logic.",
    facts: ["Python", "Inventory", "Bulk sales", "Invoices", "File handling"]
  },
  support: {
    kicker: "03 / IT SUPPORT INTERNSHIP",
    title: "InfraSoft Solutions Pvt. Ltd.",
    text: "From 24 July 2024 to 10 November 2024, I gained practical experience supporting staff with technical needs, troubleshooting system issues, software setup and basic network tasks.",
    facts: ["Troubleshooting", "Software setup", "IT support", "Basic networking"]
  },
  travel: {
    kicker: "04 / DIGITAL OPERATIONS",
    title: "Western Travel Mart Nepal",
    text: "Supported digitalisation of operations by managing travel bookings, improving customer communication and organising data using office and IT tools.",
    facts: ["Bookings", "Data organisation", "Customer communication", "Office & IT tools"]
  },
  teaching: {
    kicker: "06 / CURRENT ROLE",
    title: "Adarsh Madhyamik Vidyalaya",
    text: "Currently teaching +2 students in Nepalgunj. The role brings practical computing and IT knowledge into the classroom through clear explanation, structured learning and practical understanding.",
    facts: ["Teaching", "+2 students", "Computer & IT", "Communication"]
  },
  threatwatch: {
    kicker: "01 / SECURITY PLATFORM",
    title: "Hybrid Network Threat Intelligence Platform",
    text: "A mini-SOC platform that captures live traffic, builds conversation flows, detects threats through rule-based, IOC and ML methods, scores risk and presents findings in a security dashboard.",
    facts: ["Python", "Flask", "Scapy", "IOC detection", "ML anomaly detection"]
  },
  phishing: {
    kicker: "02 / FINAL-YEAR PROJECT",
    title: "Intelligent Email Phishing Detection Gateway",
    text: "A production-style webmail system with layered phishing detection using rule-based scoring, ML classification and dataset matching, with quarantine, reports and security controls.",
    facts: ["Python", "Flask", "RandomForest", "SPF / DKIM / DMARC", "Email security"]
  },
  nexcart: {
    kicker: "03 / WEB APPLICATION",
    title: "NexCart",
    text: "A public Next.js application repository with a structured app, components, Prisma data layer, authentication configuration and supporting TypeScript files.",
    facts: ["Next.js", "TypeScript", "Prisma", "Authentication"]
  }
};

function openModal(key, trigger) {
  const data = workData[key];
  if (!modal || !data) return;
  lastFocusedElement = trigger || document.activeElement;
  modalKicker.textContent = data.kicker;
  modalTitle.textContent = data.title;
  modalText.textContent = data.text;
  modalFacts.innerHTML = data.facts.map((item) => `<span>${item}</span>`).join("");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  const closeButton = modal.querySelector(".modal-close");
  if (closeButton) closeButton.focus();
}

function closeModal() {
  if (!modal || !modal.classList.contains("open")) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") lastFocusedElement.focus();
  lastFocusedElement = null;
}

document.querySelectorAll("[data-project]").forEach((card) => {
  card.addEventListener("click", (event) => {
    /* External repository links must navigate without opening the case modal. */
    if (event.target.closest("a")) return;
    const trigger = event.target.closest(".case-link") || card;
    openModal(card.dataset.project, trigger);
  });
});
document.querySelectorAll("[data-close]").forEach((element) => element.addEventListener("click", closeModal));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    closeMobileNav();
  }
  if (event.key === "Tab" && modal && modal.classList.contains("open")) {
    const focusables = modal.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

/* Reveal-on-scroll: content stays visible if JavaScript is unavailable. */
const revealEls = document.querySelectorAll(".section-heading,.timeline-card,.project-card,.journey-card,.reference-card,.contact-copy,.contact-panel,.work-card");
if ("IntersectionObserver" in window) {
  revealEls.forEach((element) => element.classList.add("reveal-ready"));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((element) => observer.observe(element));
} else {
  revealEls.forEach((element) => element.classList.add("revealed"));
}

/* Scroll progress */
const progress = document.getElementById("scrollProgress");
function updateScrollProgress() {
  if (!progress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}
window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

/* Gentle pointer glow */
const glow = document.getElementById("cursorGlow");
if (glow && window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive: true });
}

/* Work filters */
document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    const filter = button.dataset.filter;
    document.querySelectorAll(".work-card").forEach((card) => {
      const visible = filter === "all" || card.dataset.type === filter;
      card.classList.toggle("hidden", !visible);
    });
  });
});

/* Slight 3D depth effect on desktop pointer devices only. */
if (window.matchMedia("(pointer:fine)").matches) {
  document.querySelectorAll(".work-card,.project-card,.portrait-frame").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      if (card.classList.contains("work-card")) {
        card.style.transform = `perspective(900px) rotateX(${-y * 2}deg) rotateY(${x * 2}deg) translateY(-5px)`;
      }
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });
}
