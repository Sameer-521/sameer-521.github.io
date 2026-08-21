/* main.js — mobile nav toggle, smooth-scroll, active-section highlight, year */

(function () {
  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Active section highlight via IntersectionObserver
  const navAnchors = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
  const sectionMap = new Map();
  navAnchors.forEach(function (a) {
    const id = a.getAttribute("href").slice(1);
    const sec = document.getElementById(id);
    if (sec) sectionMap.set(sec, a);
  });

  if ("IntersectionObserver" in window && sectionMap.size) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          navAnchors.forEach(function (a) { a.classList.remove("active"); });
          const a = sectionMap.get(e.target);
          if (a) a.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sectionMap.forEach(function (_, sec) { observer.observe(sec); });
  }

  // Current year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

/* Probe tip cursor — scope-probe reticle trailing the pointer.
 * Trails behind the CSS-skinned cursor. Skipped on touch / reduced-motion. */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const probe = document.createElement("div");
  probe.className = "probe";
  probe.setAttribute("aria-hidden", "true");
  probe.innerHTML =
    '<span class="probe-ring"></span>' +
    '<span class="probe-label">CH1</span>';
  document.body.appendChild(probe);

  let tx = 0, ty = 0, x = 0, y = 0, raf = null, started = false;

  function tick() {
    x += (tx - x) * 0.3;
    y += (ty - y) * 0.3;
    probe.style.transform = "translate3d(" + x + "px," + y + "px,0)";
    if (Math.abs(tx - x) > 0.2 || Math.abs(ty - y) > 0.2) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = null;
    }
  }

  function wake() {
    if (raf == null) raf = requestAnimationFrame(tick);
  }

  window.addEventListener("pointermove", function (e) {
    if (e.pointerType !== "mouse") return;
    tx = e.clientX;
    ty = e.clientY;
    if (!started) {
      started = true;
      x = tx;
      y = ty;
      probe.classList.add("visible");
    }
    wake();
  }, { passive: true });

  document.addEventListener("pointerleave", function () {
    probe.classList.remove("visible");
    started = false;
  });

  document.addEventListener("pointerover", function (e) {
    if (e.target.closest && e.target.closest("a, button")) {
      probe.classList.add("probe--lock");
    }
  });
  document.addEventListener("pointerout", function (e) {
    if (e.target.closest && e.target.closest("a, button")) {
      probe.classList.remove("probe--lock");
    }
  });
})();
