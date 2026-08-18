/* H Heuristics — "No Income Source" report
   Chart.js figures + scroll behavior (TOC scroll-spy, reading progress). */

(function () {
  "use strict";

  var C = {
    navy: "#1f4270",
    navyLight: "#9bb5d6",
    gold: "#b89b5e",
    blue: "#2f6fb3",
    teal: "#2ca6a4",
    green: "#3fa36a",
    amber: "#d99a2b",
    orange: "#d9722d",
    red: "#c04a3a",
    purple: "#7a5ba6",
    pink: "#c65a8a",
    grid: "#e7eaee",
    ink: "#55606e"
  };

  var BASE_FONT = "'Source Sans 3', system-ui, sans-serif";
  var MONO_FONT = "'JetBrains Mono', ui-monospace, monospace";

  function baseOpts() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#0f1f33",
          titleFont: { family: MONO_FONT, size: 11, weight: "600" },
          bodyFont: { family: BASE_FONT, size: 13 },
          padding: 10,
          cornerRadius: 6,
          displayColors: true,
          boxPadding: 3
        }
      },
      scales: {
        x: {
          grid: { color: C.grid },
          ticks: { color: C.ink, font: { family: BASE_FONT, size: 11 } },
          border: { color: C.grid }
        },
        y: {
          grid: { display: false },
          ticks: { color: C.ink, font: { family: BASE_FONT, size: 11 } },
          border: { color: C.grid }
        }
      }
    };
  }

  function fmtT(v) { return "$" + v + "T"; }
  function fmtB(v) { return v + "B"; }
  function fmtMoney(v) { return "$" + v.toLocaleString("en-US"); }

  function buildCharts() {
    if (typeof Chart === "undefined") return;

    Chart.defaults.font.family = BASE_FONT;
    Chart.defaults.color = C.ink;

    /* ---- Figure 1: wealth concentration ---- */
    new Chart(document.getElementById("chart-wealth"), {
      type: "bar",
      data: {
        labels: ["Top 0.001%  (≈ 500,000 people)", "Bottom 50%  (≈ 4 billion people)"],
        datasets: [{
          data: [60, 9],
          backgroundColor: [C.gold, C.navyLight],
          borderRadius: 5,
          maxBarThickness: 64
        }]
      },
      options: Object.assign(baseOpts(), {
        indexAxis: "y",
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#0f1f33",
            titleFont: { family: MONO_FONT, size: 11, weight: "600" },
            bodyFont: { family: BASE_FONT, size: 13 },
            padding: 10, cornerRadius: 6,
            callbacks: { label: function (c) { return " " + fmtT(c.parsed.x) + " held"; } }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: { color: C.grid },
            ticks: { color: C.ink, font: { family: BASE_FONT, size: 11 }, callback: function (v) { return "$" + v + "T"; } },
            title: { display: true, text: "US$ trillion of global wealth", color: C.ink, font: { family: MONO_FONT, size: 10 } },
            border: { color: C.grid }
          },
          y: { grid: { display: false }, ticks: { color: "#17202b", font: { family: BASE_FONT, size: 11.5, weight: "600" } }, border: { color: C.grid } }
        }
      })
    });

    /* ---- Figure 2: 2050 exposure band ---- */
    new Chart(document.getElementById("chart-scale"), {
      type: "bar",
      data: {
        labels: ["Global population, 2050", "Without stable income (estimate)"],
        datasets: [{
          data: [9.7, [1.5, 2.0]],
          backgroundColor: [C.navyLight, C.orange],
          borderRadius: 5,
          maxBarThickness: 64
        }]
      },
      options: Object.assign(baseOpts(), {
        indexAxis: "y",
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#0f1f33",
            titleFont: { family: MONO_FONT, size: 11, weight: "600" },
            bodyFont: { family: BASE_FONT, size: 13 },
            padding: 10, cornerRadius: 6,
            callbacks: { label: function (c) { return c.dataIndex === 1 ? " 1.5–2.0B people" : " 9.7B people"; } }
          }
        },
        scales: {
          x: {
            beginAtZero: true, max: 10,
            grid: { color: C.grid },
            ticks: { color: C.ink, font: { family: BASE_FONT, size: 11 }, callback: function (v) { return v + "B"; } },
            title: { display: true, text: "billions of people", color: C.ink, font: { family: MONO_FONT, size: 10 } },
            border: { color: C.grid }
          },
          y: { grid: { display: false }, ticks: { color: "#17202b", font: { family: BASE_FONT, size: 11.5, weight: "600" } }, border: { color: C.grid } }
        }
      })
    });

    /* ---- Figure 3: freelance workforce growth ---- */
    new Chart(document.getElementById("chart-gig"), {
      type: "line",
      data: {
        labels: ["2014", "2017", "2020", "2023", "2027*"],
        datasets: [{
          data: [53, 57, 59, 64, 86],
          borderColor: C.navy,
          backgroundColor: "rgba(31,66,112,0.08)",
          pointBackgroundColor: C.gold,
          pointBorderColor: C.navy,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 2.5,
          tension: 0.3,
          fill: true
        }]
      },
      options: Object.assign(baseOpts(), {
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#0f1f33",
            titleFont: { family: MONO_FONT, size: 11, weight: "600" },
            bodyFont: { family: BASE_FONT, size: 13 },
            padding: 10, cornerRadius: 6,
            callbacks: { label: function (c) { return " " + c.parsed.y + "M freelancers"; } }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: C.ink, font: { family: BASE_FONT, size: 11.5 } }, border: { color: C.grid } },
          y: {
            beginAtZero: true, max: 100,
            grid: { color: C.grid },
            ticks: { color: C.ink, font: { family: BASE_FONT, size: 11 }, callback: function (v) { return v + "M"; } },
            title: { display: true, text: "millions of U.S. workers", color: C.ink, font: { family: MONO_FONT, size: 10 } },
            border: { color: C.grid }
          }
        }
      })
    });

    /* ---- Figure 4: $500/mo budget ---- */
    new Chart(document.getElementById("chart-budget"), {
      type: "bar",
      data: {
        labels: ["Baseline month"],
        datasets: [
          { label: "Housing", data: [180], backgroundColor: C.navy, borderRadius: 0 },
          { label: "Food", data: [140], backgroundColor: C.blue, borderRadius: 0 },
          { label: "Healthcare", data: [45], backgroundColor: C.teal, borderRadius: 0 },
          { label: "Utilities & energy", data: [40], backgroundColor: C.green, borderRadius: 0 },
          { label: "Transport", data: [30], backgroundColor: C.amber, borderRadius: 0 },
          { label: "Connectivity", data: [25], backgroundColor: C.orange, borderRadius: 0 },
          { label: "Contingency", data: [40], backgroundColor: C.purple, borderRadius: { topRight: 5, bottomRight: 5 } }
        ]
      },
      options: Object.assign(baseOpts(), {
        indexAxis: "y",
        scales: {
          x: {
            stacked: true, beginAtZero: true, max: 500,
            grid: { color: C.grid },
            ticks: { color: C.ink, font: { family: BASE_FONT, size: 11 }, callback: function (v) { return "$" + v; } },
            title: { display: true, text: "US$ per month", color: C.ink, font: { family: MONO_FONT, size: 10 } },
            border: { color: C.grid }
          },
          y: { stacked: true, grid: { display: false }, ticks: { color: "#17202b", font: { family: BASE_FONT, size: 11.5, weight: "600" } }, border: { color: C.grid } }
        },
        plugins: {
          legend: {
            display: true, position: "bottom",
            labels: { color: C.ink, font: { family: BASE_FONT, size: 11 }, boxWidth: 12, boxHeight: 12, usePointStyle: true, pointStyle: "rectRounded", padding: 14 }
          },
          tooltip: {
            backgroundColor: "#0f1f33",
            titleFont: { family: MONO_FONT, size: 11, weight: "600" },
            bodyFont: { family: BASE_FONT, size: 13 },
            padding: 10, cornerRadius: 6,
            callbacks: { label: function (c) { return " " + c.dataset.label + ": " + fmtMoney(c.parsed.x); } }
          }
        }
      })
    });

    /* ---- Figure 5: cost floor leverage ---- */
    new Chart(document.getElementById("chart-cost"), {
      type: "bar",
      data: {
        labels: ["High-cost city", "Mid-cost city", "Baseline"],
        datasets: [{
          data: [3000, 1500, 500],
          backgroundColor: [C.red, C.amber, C.green],
          borderRadius: 5,
          maxBarThickness: 72
        }]
      },
      options: Object.assign(baseOpts(), {
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#0f1f33",
            titleFont: { family: MONO_FONT, size: 11, weight: "600" },
            bodyFont: { family: BASE_FONT, size: 13 },
            padding: 10, cornerRadius: 6,
            callbacks: { label: function (c) { return " " + fmtMoney(c.parsed.y) + " / month"; } }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#17202b", font: { family: BASE_FONT, size: 11.5, weight: "600" } }, border: { color: C.grid } },
          y: {
            beginAtZero: true, max: 3200,
            grid: { color: C.grid },
            ticks: { color: C.ink, font: { family: BASE_FONT, size: 11 }, callback: function (v) { return "$" + v.toLocaleString("en-US"); } },
            title: { display: true, text: "income needed to clear the floor", color: C.ink, font: { family: MONO_FONT, size: 10 } },
            border: { color: C.grid }
          }
        }
      })
    });
  }

  /* ---- Reading progress bar ---- */
  function initProgress() {
    var bar = document.getElementById("progressBar");
    if (!bar) return;
    var onScroll = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      bar.style.width = pct + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- TOC scroll-spy ---- */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".toc a"));
    var map = {};
    links.forEach(function (a) {
      var id = a.getAttribute("href");
      if (id && id.charAt(0) === "#") map[id.slice(1)] = a;
    });
    var ids = Object.keys(map);
    if (!ids.length || !("IntersectionObserver" in window)) return;

    var setActive = function (id) {
      links.forEach(function (a) { a.classList.remove("active"); });
      if (map[id]) map[id].classList.add("active");
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: "-20% 0px -70% 0px", threshold: 0 });

    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  function init() {
    buildCharts();
    initProgress();
    initScrollSpy();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
