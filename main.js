/* ==========================================================================
   DIVA AI OFFICIAL — site behaviour
   Vanilla JS only. No frameworks, no backend, no external APIs.
   ========================================================================== */
(function () {
  "use strict";

  var CFG = window.DIVA_CONFIG || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------------------------------------------------------------- 1. Config */
  function applyConfig() {
    // APK links
    $$("[data-apk-link]").forEach(function (a) {
      if (CFG.apkUrl) a.setAttribute("href", CFG.apkUrl);
      a.setAttribute("download", "");
      a.setAttribute("rel", "noopener");
      var fn = CFG.apkUrl ? CFG.apkUrl.split("/").pop().split("?")[0] : "";
      if (fn) a.setAttribute("download", fn);
    });

    // Text tokens
    var map = {
      version: CFG.version,
      size: CFG.fileSize,
      date: CFG.releaseDate,
      min: CFG.minAndroid,
      tested: CFG.testedUpTo,
      arch: CFG.architecture,
      pkg: CFG.packageName,
      filename: CFG.apkUrl ? CFG.apkUrl.split("/").pop().split("?")[0] : "",
      year: new Date().getFullYear()
    };
    Object.keys(map).forEach(function (key) {
      if (!map[key]) return;
      $$('[data-cfg="' + key + '"]').forEach(function (el) {
        el.textContent = map[key];
      });
    });

    // Optional SHA-256 row
    var shaWrap = $("[data-sha-wrap]");
    if (shaWrap) {
      if (CFG.sha256) {
        shaWrap.style.display = "";
        var shaEl = $("[data-cfg='sha256']", shaWrap);
        if (shaEl) shaEl.textContent = CFG.sha256;
      } else {
        shaWrap.style.display = "none";
      }
    }

    // Email / social links
    $$("[data-email]").forEach(function (el) {
      if (!CFG.contactEmail) return;
      var subj = el.getAttribute("data-email-subject");
      el.setAttribute("href", "mailto:" + CFG.contactEmail + (subj ? "?subject=" + encodeURIComponent(subj) : ""));
      if (el.hasAttribute("data-email-text")) el.textContent = CFG.contactEmail;
    });
    $$("[data-social]").forEach(function (el) {
      var k = el.getAttribute("data-social");
      if (CFG[k]) { el.setAttribute("href", CFG[k]); el.setAttribute("target", "_blank"); }
      else { el.style.display = "none"; }
    });

    // Canonical + og:url for the future custom domain
    if (CFG.siteUrl) {
      var base = CFG.siteUrl.replace(/\/$/, "");
      var path = location.pathname.split("/").pop() || "index.html";
      var url = base + "/" + path;
      var link = $('link[rel="canonical"]');
      if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
      link.href = url;
      var og = $('meta[property="og:url"]');
      if (og) og.setAttribute("content", url);
    }
  }

  /* ------------------------------------------------------------ 2. Navigation */
  function initNav() {
    var header = $("#siteHeader");
    var toggle = $(".nav-toggle");
    var nav = $("#primaryNav");
    var backdrop = $(".nav-backdrop");

    function close() {
      if (!nav || !toggle) return;
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      if (backdrop) backdrop.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    }
    function open() {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
      if (backdrop) backdrop.classList.add("is-open");
      document.body.classList.add("nav-open");
    }

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        if (nav.classList.contains("is-open")) close(); else open();
      });
    }
    if (backdrop) backdrop.addEventListener("click", close);
    $$(".nav a").forEach(function (a) { a.addEventListener("click", close); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    window.addEventListener("resize", function () { if (window.innerWidth >= 900) close(); });

    // scroll states
    var progress = $(".scroll-progress");
    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;
      if (header) header.classList.toggle("is-scrolled", y > 12);
      if (progress) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* -------------------------------------------------------------- 3. Reveals */
  function initReveals() {
    var items = $$("[data-reveal]");
    if (!items.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------- 4. Chat demo */
  function initChat() {
    var form = $("#chatForm");
    if (!form) return;
    var input = $("#chatInput");
    var body = $("#chatBody");

    var replies = [
      { k: ["hi", "hello", "hey", "namaste", "hii", "yo"], r: "Hey! I'm DIVA 💜 Your personal AI assistant. Ask me anything — in English, Hindi or Hinglish." },
      { k: ["hindi", "language", "hinglish", "english", "bhasha"], r: "Main Hindi, English aur Hinglish — teeno mein baat kar sakti hoon. Bas apni language mein likho ya bolo! ✨" },
      { k: ["voice", "speak", "sun", "audio", "mic"], r: "I have a natural female voice. Tap the mic in the app, speak your command, and I'll reply out loud with text-to-speech." },
      { k: ["download", "apk", "install", "app"], r: "You can grab the DIVA AI APK on the Download page — version 1.0.0, works on Android 7.0 and above." },
      { k: ["who", "your name", "diva", "about you"], r: "I'm DIVA — a friendly AI assistant built to chat, help and keep you company. Think of me as your always-awake companion." },
      { k: ["feature", "what can you do", "help me", "work"], r: "I can chat, answer questions, take voice commands, read replies aloud, remember context in a conversation and switch between three languages on the fly." },
      { k: ["study", "homework", "exam"], r: "Send me a topic and I'll explain it simply — with examples. Perfect for last-minute revision sessions." },
      { k: ["thanks", "thank you", "shukriya", "dhanyavad"], r: "Anytime! That's literally what I'm here for 😊" },
      { k: ["bye", "goodbye", "alvida"], r: "Bye for now — I'll be right here whenever you need me. 💜" }
    ];
    var fallbacks = [
      "Interesting! Tell me a bit more and I'll help you out properly.",
      "I hear you. In the real app I'd dig into that instantly — this page is just a preview. 💜",
      "Good question! The full DIVA AI app handles that with smarter, context-aware replies.",
      "Got it. Want me to break that down step by step?"
    ];
    var fbIndex = 0;

    function scrollDown() {
      if (body) body.scrollTop = body.scrollHeight;
    }

    function addBubble(text, who) {
      var b = document.createElement("div");
      b.className = "bubble bubble--" + who;
      b.textContent = text;
      body.appendChild(b);
      scrollDown();
      return b;
    }

    function addTyping() {
      var b = document.createElement("div");
      b.className = "bubble bubble--ai bubble--typing";
      b.innerHTML = "<i></i><i></i><i></i>";
      body.appendChild(b);
      scrollDown();
      return b;
    }

    function answer(text) {
      var q = text.toLowerCase();
      for (var i = 0; i < replies.length; i++) {
        for (var j = 0; j < replies[i].k.length; j++) {
          if (q.indexOf(replies[i].k[j]) !== -1) return replies[i].r;
        }
      }
      var r = fallbacks[fbIndex % fallbacks.length];
      fbIndex++;
      return r;
    }

    function send(text) {
      var msg = (text || "").trim();
      if (!msg) return;
      addBubble(msg, "user");
      if (input) input.value = "";
      var typing = addTyping();
      var reply = answer(msg);
      window.setTimeout(function () {
        typing.remove();
        addBubble(reply, "ai");
      }, reduceMotion ? 260 : 700 + Math.min(msg.length * 12, 700));
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      send(input ? input.value : "");
    });

    $$(".chat-suggest .chip").forEach(function (chip) {
      chip.addEventListener("click", function () { send(chip.textContent); });
    });
  }

  /* --------------------------------------------------------- 5. APK URL check */
  function initApkCheck() {
    var status = $("[data-apk-status]");
    if (!status || !CFG.apkUrl) return;
    if (location.protocol === "file:") return;

    fetch(CFG.apkUrl, { method: "HEAD", cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error(res.status);
        status.classList.remove("is-visible");
      })
      .catch(function () {
        status.textContent =
          "This build isn't live at the download link yet — please check back soon, or contact support and we'll send it to you directly.";
        status.classList.add("is-visible");
        if (window.console && console.info) {
          console.info(
            "[DIVA AI] No APK found at -> " + CFG.apkUrl +
            "\nSite owner: upload your APK to that path, or set apkUrl in assets/js/config.js to its public URL."
          );
        }
      });
  }

  /* ---------------------------------------------------------- 6. Misc bits */
  function initMisc() {
    // contact form → opens the user's mail app with the message prefilled
    var cform = $("#contactForm");
    if (cform) {
      cform.addEventListener("submit", function (e) {
        e.preventDefault();
        var name = ($("#cName") || {}).value || "";
        var from = ($("#cEmail") || {}).value || "";
        var topic = ($("#cTopic") || {}).value || "General question";
        var msg = ($("#cMessage") || {}).value || "";
        var body = "Name: " + name + "\nEmail: " + from + "\nTopic: " + topic + "\n\n" + msg;
        var mailto = "mailto:" + (CFG.contactEmail || "") +
          "?subject=" + encodeURIComponent("[DIVA AI] " + topic) +
          "&body=" + encodeURIComponent(body);
        cform.dataset.mailto = mailto;
        window.location.href = mailto;
      });
    }

    // gentle pointer parallax on the avatar stage (desktop only)
    var stage = $(".stage");
    if (stage && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
      var raf = null;
      stage.addEventListener("pointermove", function (e) {
        var r = stage.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        if (raf) return;
        raf = requestAnimationFrame(function () {
          stage.style.transform = "perspective(1100px) rotateY(" + (x * 7).toFixed(2) + "deg) rotateX(" + (-y * 7).toFixed(2) + "deg)";
          raf = null;
        });
      });
      stage.addEventListener("pointerleave", function () { stage.style.transform = ""; });
    }
  }

  /* ---------------------------------------------------------------- boot */
  function boot() {
    applyConfig();
    initNav();
    initReveals();
    initChat();
    initApkCheck();
    initMisc();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
