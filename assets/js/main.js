(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- staggered reveal on scroll ---------- */
  var revealTargets = document.querySelectorAll(
    ".pillar, .specimen, .proof-cell, .workflow-step, .arch-note, .docs-callout, .chain-panel"
  );
  if (!reduceMotion && "IntersectionObserver" in window) {
    revealTargets.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 4) * 70 + "ms";
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- audit chain ticker (decorative illustration) ---------- */
  var feed = document.getElementById("chainfeed");
  if (!feed || reduceMotion) return;

  var actions = [
    { cls: "approve", label: "APPROVE" },
    { cls: "revoke",  label: "REVOKE"  },
    { cls: "create",  label: "CREATE"  },
    { cls: "sync",    label: "SYNC"    }
  ];
  var seq = 3;

  function hash() {
    var hex = "0123456789abcdef", s = "";
    for (var i = 0; i < 4; i++) s += hex[Math.floor(Math.random() * 16)];
    s += "\u2026";
    for (var j = 0; j < 4; j++) s += hex[Math.floor(Math.random() * 16)];
    return s;
  }

  function row() {
    var a = actions[Math.floor(Math.random() * actions.length)];
    var el = document.createElement("div");
    el.className = "chain-row";
    var seqSpan = document.createElement("span");
    seqSpan.className = "seq";
    seqSpan.textContent = "#" + String(seq++).padStart(4, "0");
    var hashSpan = document.createElement("span");
    hashSpan.className = "hash";
    hashSpan.textContent = hash();
    var act = document.createElement("span");
    act.className = "act " + a.cls;
    act.textContent = a.label;
    el.appendChild(seqSpan);
    el.appendChild(hashSpan);
    el.appendChild(act);
    return el;
  }

  setInterval(function () {
    feed.appendChild(row());
    while (feed.children.length > 7) feed.removeChild(feed.firstChild);
  }, 2600);
})();
