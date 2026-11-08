/* data.js — projects, circuits, skills */

const PORTFOLIO_DATA = {
  profile: {
    name: "Sameer Aminu Umar",
    tagline: "Electrical Engineering student \u2022 Python & C developer",
    fact: "300-level EEE student at UDUSOK. Building tools in Python since late 2024 and learning C since early 2026.",
    github: "https://github.com/Sameer-521",
  },

  skills: [
    {
      label: "Python",
      items: ["FastAPI", "SQLite", "stdlib tooling"],
    },
    {
      label: "C",
      items: ["Data structures (intermediate)", "Processes", "Custom allocators", "GDB"],
    },
    {
      label: "EE tooling",
      items: ["ngspice", "Qucs circuit simulation"],
    },
  ],

  python: [
    {
      title: "system-monitor",
      lang: "Python",
      desc: "FastAPI server exposing system metrics, with alerting for common conditions.",
      repo: "https://github.com/Sameer-521/system-monitor",
    },
    {
      title: "crun",
      lang: "Python",
      desc: "Compile and run a C file in one command, like `go run` but for C. Tracks header dependencies, compiles in parallel, and only rebuilds what changed.",
      repo: "https://github.com/Sameer-521/utils/tree/main/crun",
    },
    {
      title: "library-mgmt-system-API",
      lang: "Python",
      desc: "REST API for a library management system, FastAPI + aiosqlite.",
      repo: "https://github.com/Sameer-521/library-mgmt-system-API",
    },
    {
      title: "pokedex-cli",
      lang: "Python",
      desc: "Terminal Pokédex in Python + Rich. 1025 Pokémon, in-terminal sprite rendering, stat bars, an 18×18 type-effectiveness heatmap, and side-by-side comparisons.",
      repo: "https://github.com/Sameer-521/pokedex-cli",
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
      title: "ashx",
      lang: "C",
      desc: "A hobby linux shell. My first big C project. Its not done yet.",
      repo: "https://github.com/Sameer-521/ashx",
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
  ],
};

window.PORTFOLIO_DATA = PORTFOLIO_DATA;
