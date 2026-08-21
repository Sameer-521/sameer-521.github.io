/* data.js — single source of truth for projects, circuits, skills */

const PORTFOLIO_DATA = {
  profile: {
    name: "Sameer Aminu Umar",
    tagline: "Electrical Engineering student \u2022 Python & C developer",
    fact: "200-level EEE student at UDUSOK. Building tools in Python for ~2 years and learning C for ~8 months.",
    github: "https://github.com/Sameer-521",
  },

  skills: [
    {
      label: "Languages",
      items: ["Python", "C (learning)"],
    },
    {
      label: "Python",
      items: ["FastAPI", "SQLite", "Rich (TUI)", "stdlib tooling"],
    },
    {
      label: "C",
      items: [
        "K.N. King coursework",
        "small systems (sqlite-style REPL)",
        "bit ops",
        "GDB",
      ],
    },
    {
      label: "EE tooling",
      items: ["ngspice", "Qucs circuit simulation"],
    },
    {
      label: "Embedded",
      items: [
        "STM32CubeIDE (early exploration \u2014 on hold, no hardware yet)",
      ],
    },
    {
      label: "Editor / tooling",
      items: ["Neovim (Lazyvim)", "Fish shell", "Linux/KDE"],
    },
  ],

  python: [
    {
      title: "pokedex-cli",
      lang: "Python",
      desc: "Terminal Pok\u00e9dex in Python + Rich. 1025 Pok\u00e9mon, in-terminal sprite rendering, stat bars, an 18\u00d718 type-effectiveness heatmap, and side-by-side comparisons.",
      repo: "https://github.com/Sameer-521/pokedex-cli",
    },
    {
      title: "system-monitor",
      lang: "Python",
      desc: "FastAPI server exposing system metrics with CPU alerting.",
      repo: "https://github.com/Sameer-521/system-monitor",
    },
    {
      title: "crun",
      lang: "Python",
      desc: "Compiles, runs, and cleans up a C source file in a single command \u2014 like go run, but for C. Caches binaries in ~/.cache/crun/ to skip recompilation, forwards exit codes, and reports signal crashes (e.g. SIGSEGV).",
      repo: "https://github.com/Sameer-521/utils/tree/main/crun",
    },
    {
      title: "library-mgmt-system-API",
      lang: "Python",
      desc: "REST API for a library management system, FastAPI + SQLite.",
      repo: "https://github.com/Sameer-521/library-mgmt-system-API",
    },
    {
      title: "sqli_playground",
      lang: "Python",
      desc: "Interactive CLI game for learning SQL injection; 12 levels with a plugin-based loader, pure stdlib + in-memory SQLite.",
      local: true,
    },
    {
      title: "sql_tutorial",
      lang: "Python",
      desc: "Interactive CLI SQL tutorial: 10 modules, 34 lessons, in-memory SQLite, 192 tests, pure stdlib.",
      local: true,
    },
    {
      title: "chat_app",
      lang: "Python",
      desc: "Client/server chat app with a terminal (TUI) client.",
      local: true,
    },
  ],

  c: [
    {
      title: "K.N-King-Projects-Solutions",
      lang: "C",
      desc: 'Solutions to the programming projects in "C Programming: A Modern Approach" (2nd ed.) by K. N. King.',
      repo: "https://github.com/Sameer-521/K.N-King-Projects-Solutions",
    },
    {
      title: "sqlite3_clone",
      lang: "C",
      desc: "A minimal SQLite-style REPL in C: statement parsing and types, following a build-your-own-database exercise.",
      local: true,
    },
    {
      title: "c_scripts",
      lang: "C",
      desc: "C learning exercises: bit operations, ciphers, linked lists, arrays, functions, plus GDB cheatsheets.",
      local: true,
    },
  ],

  circuits: [
    {
      title: "my_circuits",
      desc: "ngspice/Qucs simulation practice: op-amp, rectifier, transformer, transistor amplifier, Y-resistor network, armature short-circuit.",
      practice: true,
      local: true,
    },
    {
      title: "Experiments-Guides",
      desc: "A DC generator experiment writeup done in Qucs, plus a zener-vs-GnP diode comparison in ngspice.",
      practice: true,
      local: true,
    },
    {
      title: "Complex Variables roadmap",
      desc: "A self-study topic roadmap for Functions of a Complex Variable (Laplace's equation, Cauchy\u2013Riemann, harmonic functions).",
      practice: true,
      local: true,
    },
    {
      title: "STM32 embedded",
      desc: "Early exploration with STM32CubeIDE; paused until hardware is available.",
      practice: true,
      status: "in progress / on hold",
    },
  ],
};

window.PORTFOLIO_DATA = PORTFOLIO_DATA;
