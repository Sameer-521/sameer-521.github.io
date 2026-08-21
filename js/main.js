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
