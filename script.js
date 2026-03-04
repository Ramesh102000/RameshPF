/* ═══════════════════════════════════════════
   RAMESH K GURAV — PORTFOLIO SCRIPT
═══════════════════════════════════════════ */

"use strict";

/* ─── Typewriter Effect ─── */
(function initTypewriter() {
  const el = document.getElementById("typed-text");
  if (!el) return;

  const titles = ["Data Analyst", "BI Developer", "SQL Engineer", "Dashboard Architect"];
  let titleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const current = titles[titleIndex];

    if (!deleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
      setTimeout(type, 80);
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(type, 300);
        return;
      }
      setTimeout(type, 40);
    }
  }

  type();
})();

/* ─── Navbar Scroll Effect ─── */
(function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }, { passive: true });
})();

/* ─── Active Nav Link on Scroll ─── */
(function initActiveNav() {
  const navBtns = document.querySelectorAll(".nav-btn");
  const sectionIds = ["home", "projects", "certificates", "skills", "profile"];

  function updateActive() {
    const scrollY = window.scrollY + 200;
    let current = "home";

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) {
        current = id;
      }
    });

    navBtns.forEach(btn => {
      const section = btn.getAttribute("data-section");
      btn.classList.toggle("active", section === current);
    });
  }

  window.addEventListener("scroll", updateActive, { passive: true });
  updateActive();
})();

/* ─── Smooth Scroll on Nav Click ─── */
(function initNavScroll() {
  const navBtns = document.querySelectorAll(".nav-btn");

  navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-section");
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
})();

/* ─── Scroll Reveal Animation ─── */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay for sibling elements
          const siblings = entry.target.parentElement
            ? [...entry.target.parentElement.querySelectorAll(".reveal:not(.visible)")]
            : [];
          const delay = siblings.indexOf(entry.target);

          setTimeout(() => {
            entry.target.classList.add("visible");
          }, Math.max(0, delay * 80));

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach(el => observer.observe(el));
})();

/* ─── Project Card Color Accent ─── */
(function initProjectHover() {
  const cards = document.querySelectorAll(".project-card");

  cards.forEach(card => {
    const color = card.getAttribute("data-color");
    if (!color) return;

    card.addEventListener("mouseenter", () => {
      card.style.borderColor = color + "35";
    });

    card.addEventListener("mouseleave", () => {
      card.style.borderColor = "";
    });
  });
})();

/* ─── Cert Card Color Accent ─── */
(function initCertHover() {
  const cards = document.querySelectorAll(".cert-card");

  cards.forEach(card => {
    const color = card.getAttribute("data-color");
    if (!color) return;

    card.addEventListener("mouseenter", () => {
      card.style.borderColor = color + "30";
    });

    card.addEventListener("mouseleave", () => {
      card.style.borderColor = "";
    });
  });
})();

/* ─── Stat Cards Stagger Reveal ─── */
(function initStatReveal() {
  const stats = document.querySelectorAll(".stat-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = [...stats].indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, idx * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  stats.forEach(el => observer.observe(el));
})();

/* ─── Animated Number Counter for Stats ─── */
(function initCounters() {
  const statVals = document.querySelectorAll(".stat-val");

  const rawValues = {
    "1.5+": { end: 1.5, suffix: "+", decimals: 1 },
    "10+":  { end: 10,  suffix: "+", decimals: 0 },
    "15%":  { end: 15,  suffix: "%", decimals: 0 },
    "50%":  { end: 50,  suffix: "%", decimals: 0 },
  };

  function animateCount(el, end, suffix, decimals, duration = 1200) {
    let start = 0;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = eased * end;
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const original = el.textContent.trim();
          const config = rawValues[original];
          if (config) {
            animateCount(el, config.end, config.suffix, config.decimals);
          }
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statVals.forEach(el => observer.observe(el));
})();

/* ─── Skill Tag Ripple Hover ─── */
(function initSkillHover() {
  const tags = document.querySelectorAll(".skill-tag");

  tags.forEach(tag => {
    tag.addEventListener("mouseenter", () => {
      tag.style.transform = "translateY(-2px)";
    });
    tag.addEventListener("mouseleave", () => {
      tag.style.transform = "";
    });
  });
})();

/* ─── Tool Icon Hover Lift ─── */
(function initToolHover() {
  const tools = document.querySelectorAll(".tool-item");

  tools.forEach(tool => {
    tool.addEventListener("mouseenter", () => {
      tool.style.transform = "translateY(-5px)";
      tool.style.transition = "transform 0.2s ease";
    });
    tool.addEventListener("mouseleave", () => {
      tool.style.transform = "";
    });
  });
})();
