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
  const navAnchors = Array.prototype.slice.call(
    document.querySelectorAll(".nav-links a"),
  );
  const sectionMap = new Map();
  navAnchors.forEach(function (a) {
    const id = a.getAttribute("href").slice(1);
    const sec = document.getElementById(id);
    if (sec) sectionMap.set(sec, a);
  });

  if ("IntersectionObserver" in window && sectionMap.size) {
    const tracked = Array.from(sectionMap.keys()); // DOM order
    const visible = new Set();

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        });

        navAnchors.forEach(function (a) {
          a.classList.remove("active");
        });

        // Nothing in the observation band (e.g. back at the hero) -> no active link
        for (let i = 0; i < tracked.length; i++) {
          if (visible.has(tracked[i])) {
            const a = sectionMap.get(tracked[i]);
            if (a) a.classList.add("active");
            break; // topmost visible section wins
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    tracked.forEach(function (sec) {
      observer.observe(sec);
    });
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
    '<span class="probe-ring"></span>' + '<span class="probe-label">CH1</span>';
  document.body.appendChild(probe);

  let tx = 0,
    ty = 0,
    x = 0,
    y = 0,
    raf = null,
    started = false;

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

  window.addEventListener(
    "pointermove",
    function (e) {
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
    },
    { passive: true },
  );

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

/* Bench signal generator — ambient two-channel oscillator backdrop.
 * OFF by default: the SIG-GEN switch in the nav powers it on.
 * No pointer interaction by design. Skipped under reduced-motion. */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // Backdrop canvas
  var canvas = document.createElement("canvas");
  canvas.className = "osc-bg";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);
  var ctx = canvas.getContext("2d");

  var w = 0,
    h = 0;
  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!running) ctx.clearRect(0, 0, w, h);
  }
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  var running = false,
    raf = null,
    last = 0;

  function channel(color, k, amp, speed, t) {
    ctx.beginPath();
    var mid = h * 0.5;
    for (var x = 0; x <= w; x += 4) {
      var y = mid + amp * Math.sin(x * k + t * speed);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function frame(ts) {
    raf = requestAnimationFrame(frame);
    if (ts - last < 33) return; // ~30fps is plenty for a bench backdrop
    last = ts;
    var t = ts / 1000;
    ctx.clearRect(0, 0, w, h);
    var band = h * 0.24;
    channel("rgba(47, 208, 122, 0.12)", 0.045, band, 1.1, t); // CH1 — trace green
    channel("rgba(212, 163, 90, 0.08)", 0.031, band * 0.65, 0.7, t + 1.7); // CH2 — copper
  }

  // Power switch — injected only where the feature can actually run
  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "sig-toggle";
  btn.setAttribute("aria-pressed", "false");
  btn.innerHTML =
    '<span class="sig-icon" aria-hidden="true">~</span> <span class="sig-word">sig-gen</span> <span class="sig-state">off</span>';
  var navInner = document.querySelector(".nav-inner");
  if (navInner) navInner.appendChild(btn);

  function setPower(on) {
    running = on;
    canvas.classList.toggle("live", on);
    btn.classList.toggle("on", on);
    btn.setAttribute("aria-pressed", String(on));
    btn.querySelector(".sig-state").textContent = on ? "on" : "off";
    if (on) {
      last = 0;
      if (raf == null) raf = requestAnimationFrame(frame);
    } else {
      if (raf != null) cancelAnimationFrame(raf);
      raf = null;
      ctx.clearRect(0, 0, w, h);
    }
    try {
      localStorage.setItem("sig-gen", on ? "1" : "0");
    } catch (e) {
      /* private mode */
    }
  }

  btn.addEventListener("click", function () {
    setPower(!running);
  });

  var saved = null;
  try {
    saved = localStorage.getItem("sig-gen");
  } catch (e) {
    /* ignore */
  }
  if (saved === "1") setPower(true);

  resize();
})();
