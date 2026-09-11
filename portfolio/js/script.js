/* ==========================================================================
   IAN THORNG DY — PORTFOLIO SCRIPT
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Data model (kept editable in one place) ---------- */
  const portfolioData = {
    name: "IAN THORNG DY",
    title: "IT Student / Computer Teacher Applicant",
    email: "thorngdy632@gmail.com",
    phone: "+885 067 267 968",
    location: "Serei Saophoan City, Banteay Meanchey Province, Cambodia"
  };
  window.portfolioData = portfolioData; // exposed for easy console editing

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initScrollProgress();
    initCursorGlow();
    initParticles();
    initProfilePhoto();
    initCounters();
    initRevealAnimations();
    initGSAPHero();
    initContactForm();
    initBackToTop();
  });

  /* ============ NAVIGATION ============ */
  function initNav() {
    const nav = document.getElementById("mainNav");
    const navLinks = document.querySelectorAll(".nav-link[data-section]");
    const sections = Array.from(navLinks)
      .map((l) => document.getElementById(l.dataset.section))
      .filter(Boolean);

    function onScroll() {
      if (window.scrollY > 40) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");

      let currentId = sections[0] ? sections[0].id : null;
      const scrollPos = window.scrollY + 140;
      sections.forEach((sec) => {
        if (sec.offsetTop <= scrollPos) currentId = sec.id;
      });
      navLinks.forEach((l) => {
        l.classList.toggle("active", l.dataset.section === currentId);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Close mobile menu after clicking a link
    const collapseEl = document.getElementById("navMenu");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (collapseEl.classList.contains("show") && window.bootstrap) {
          const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(collapseEl);
          bsCollapse.hide();
        }
      });
    });
  }

  /* ============ SCROLL PROGRESS BAR ============ */
  function initScrollProgress() {
    const bar = document.getElementById("scrollProgress");
    if (!bar) return;
    function update() {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      const pct = height > 0 ? (scrolled / height) * 100 : 0;
      bar.style.width = pct + "%";
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ============ CURSOR GLOW (desktop only) ============ */
  function initCursorGlow() {
    const glow = document.getElementById("cursorGlow");
    if (!glow || prefersReducedMotion) return;
    if (window.matchMedia("(hover: none)").matches) return; // skip touch devices

    window.addEventListener("mousemove", (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    });
  }

  /* ============ PARTICLES ============ */
  function initParticles() {
    const container = document.getElementById("particles");
    if (!container) return;
    const count = window.innerWidth < 768 ? 18 : 34;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("span");
      dot.className = "particle-dot";
      dot.style.left = Math.random() * 100 + "%";
      dot.style.top = Math.random() * 100 + "%";
      dot.style.opacity = (0.2 + Math.random() * 0.5).toFixed(2);
      const size = (1.5 + Math.random() * 2.5).toFixed(1);
      dot.style.width = size + "px";
      dot.style.height = size + "px";
      container.appendChild(dot);

      if (!prefersReducedMotion && window.gsap) {
        gsap.to(dot, {
          y: (Math.random() - 0.5) * 60,
          x: (Math.random() - 0.5) * 40,
          duration: 6 + Math.random() * 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 4
        });
      }
    }
  }

  /* ============ PROFILE PHOTO UPLOAD ============ */
  function initProfilePhoto() {
    const frame = document.getElementById("profileFrame");
    const img = document.getElementById("profileImg");
    const input = document.getElementById("photoInput");
    const changeBtn = document.getElementById("changePhotoBtn");
    const resetBtn = document.getElementById("resetPhotoBtn");
    if (!frame || !img || !input) return;

    const STORAGE_KEY = "ian-portfolio-profile-photo";
    const DEFAULT_SRC = img.getAttribute("src");

    // Detect if default image fails to load (e.g. placeholder not supplied)
    img.addEventListener("error", () => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        frame.classList.add("no-image");
      }
    });

    // Restore saved photo on load
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        img.src = saved;
        frame.classList.remove("no-image");
        resetBtn.classList.remove("d-none");
      }
    } catch (e) {
      /* localStorage unavailable — ignore silently */
    }

    changeBtn.addEventListener("click", () => input.click());

    input.addEventListener("change", () => {
      const file = input.files && input.files[0];
      if (!file) return;

      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        alert("Please choose a JPG, PNG, or WEBP image.");
        input.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        img.src = dataUrl;
        frame.classList.remove("no-image");
        resetBtn.classList.remove("d-none");
        try {
          localStorage.setItem(STORAGE_KEY, dataUrl);
        } catch (err) {
          console.warn("Could not save photo to localStorage (file may be too large).");
        }
      };
      reader.readAsDataURL(file);
    });

    resetBtn.addEventListener("click", () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) { /* ignore */ }
      img.src = DEFAULT_SRC;
      resetBtn.classList.add("d-none");
      input.value = "";
    });
  }

  /* ============ COUNTER ANIMATION ============ */
  function initCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => observer.observe(c));

    function animateCounter(el) {
      const target = parseInt(el.dataset.counter, 10) || 0;
      if (prefersReducedMotion) {
        el.textContent = target;
        return;
      }
      let current = 0;
      const duration = 900;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        current = Math.floor(progress * target);
        el.textContent = current;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }
      requestAnimationFrame(tick);
    }
  }

  /* ============ SCROLL REVEAL (IntersectionObserver) ============ */
  function initRevealAnimations() {
    document.body.classList.add("reveal-ready");
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (prefersReducedMotion) {
      items.forEach((el) => el.classList.add("revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || "0", 10) * 90;
            setTimeout(() => entry.target.classList.add("revealed"), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    items.forEach((el) => observer.observe(el));
  }

  /* ============ GSAP HERO ENTRANCE ============ */
  function initGSAPHero() {
    if (!window.gsap || prefersReducedMotion) return;

    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".badge-pill", { y: -16, opacity: 0, duration: 0.6 })
      .from(".hero-title .line", { y: 40, opacity: 0, duration: 0.8 }, "-=0.3")
      .from(".hero-subtitle", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
      .from(".hero-desc", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
      .from(".hero-cta .btn-neon", { y: 20, opacity: 0, duration: 0.5, stagger: 0.12 }, "-=0.35")
      .from(".hero-meta > div", { y: 16, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.3")
      .from(".profile-hud-wrap", { scale: 0.85, opacity: 0, duration: 0.9 }, "-=1.1");
  }

  /* ============ CONTACT FORM ============ */
  function initContactForm() {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      const fields = form.querySelectorAll(".form-control-custom");
      fields.forEach((field) => {
        field.classList.remove("is-invalid");
        if (!field.value.trim()) {
          field.classList.add("is-invalid");
          valid = false;
        } else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
          field.classList.add("is-invalid");
          valid = false;
        }
      });

      if (!valid) {
        status.textContent = "Please fill in all fields correctly.";
        status.style.color = "var(--neon-pink)";
        return;
      }

      status.style.color = "var(--neon-cyan)";
      status.textContent = "Thank you! Your message has been prepared.";
      form.reset();

      // Optional mailto fallback for convenience
      const name = encodeURIComponent(form.name.value);
      const subject = encodeURIComponent(form.subject.value);
      const body = encodeURIComponent(
        `From: ${form.name.value} (${form.email.value})\n\n${form.message.value}`
      );
      const mailtoLink = document.createElement("a");
      mailtoLink.href = `mailto:${portfolioData.email}?subject=${subject}&body=${body}`;
      // Not auto-clicked to avoid unexpected mail client popups; stored for reference only.
      form.dataset.mailto = mailtoLink.href;
    });
  }

  /* ============ BACK TO TOP ============ */
  function initBackToTop() {
    const btn = document.getElementById("backToTop");
    if (!btn) return;
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }
})();
