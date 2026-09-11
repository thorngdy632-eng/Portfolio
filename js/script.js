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

  // Initialize EmailJS
  if (window.emailjs) {
    emailjs.init("MmD1yASRrNg3MsdlE");
  }

  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initScrollProgress();
    initCursorGlow();
    initParticles();
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
      status.textContent = "Sending...";

      // Send email via EmailJS
      emailjs.sendForm("service_nhivipf", "template_qqn2hv5", form)
        .then(() => {
          status.textContent = "Message sent successfully!";
          status.style.color = "var(--neon-cyan)";
          form.reset();
        })
        .catch((error) => {
          status.textContent = "Failed to send. Please try again.";
          status.style.color = "var(--neon-pink)";
          console.error("EmailJS error:", error);
        });
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
