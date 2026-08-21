/* projects.js — render project, circuit, and skill cards from data.js */

(function () {
  const DATA = window.PORTFOLIO_DATA;
  if (!DATA) return;

  function el(tag, attrs) {
    const node = document.createElement(tag);
    if (attrs) {
      for (const key in attrs) {
        const val = attrs[key];
        if (val == null || val === false) continue;
        if (key === "class") node.className = val;
        else if (key === "text") node.textContent = val;
        else node.setAttribute(key, val);
      }
    }
    for (let i = 2; i < arguments.length; i++) {
      const c = arguments[i];
      if (c == null || c === false) continue;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return node;
  }

  // Escape HTML, then render `code` spans. Safe because data is author-controlled.
  function desc(text) {
    const esc = String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const html = esc.replace(/`([^`]+)`/g, "<code>$1</code>");
    const p = document.createElement("p");
    p.className = "card-desc";
    p.innerHTML = html;
    return p;
  }

  function titleRow(item, langClass) {
    const title = el("h3", { class: "card-title" }, item.title);
    if (item.lang) title.appendChild(el("span", { class: "badge " + (langClass || ""), text: item.lang }));
    if (item.practice) title.appendChild(el("span", { class: "tag-practice", text: "practice" }));
    if (item.local) title.appendChild(el("span", { class: "tag-local", text: "local" }));
    if (item.status) title.appendChild(el("span", { class: "status", text: item.status }));
    return title;
  }

  function projectCard(p) {
    const foot = el("div", { class: "card-foot" });
    if (p.repo) {
      foot.appendChild(el("a", { class: "card-link", href: p.repo, target: "_blank", rel: "noopener noreferrer", text: "repo \u2192" }));
    }
    return el("article", { class: "card" },
      titleRow(p, p.lang === "C" ? "badge--c" : ""),
      desc(p.desc),
      foot
    );
  }

  function circuitCard(c) {
    const foot = el("div", { class: "card-foot" });
    if (c.repo) {
      foot.appendChild(el("a", { class: "card-link", href: c.repo, target: "_blank", rel: "noopener noreferrer", text: "repo \u2192" }));
    }
    return el("article", { class: "card" },
      titleRow(c, ""),
      desc(c.desc),
      foot
    );
  }

  function skillGroup(g) {
    const ul = el("ul", { class: "skill-chips" });
    g.items.forEach(function (s) {
      ul.appendChild(el("li", { class: "chip", text: s }));
    });
    return el("div", { class: "skill-group" }, el("h3", { text: g.label }), ul);
  }

  function fill(id, items, make) {
    const host = document.getElementById(id);
    if (!host) return;
    items.forEach(function (item) {
      host.appendChild(make(item));
    });
  }

  fill("py-grid", DATA.python, projectCard);
  fill("c-grid", DATA.c, projectCard);
  fill("circuits-grid", DATA.circuits, circuitCard);
  fill("skills", DATA.skills, skillGroup);
})();
