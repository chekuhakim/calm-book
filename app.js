(function () {
  "use strict";

  var SETTINGS_KEY = "calm-book-settings";
  var TALLY_KEY = "calm-book-tally";
  var KINDS = ["recall", "sequence", "inference", "vocabulary", "feelings", "predict", "retell"];
  var TEXT_STEPS = [0.8, 1, 1.2, 1.4];
  var RATE_STEPS = [0.6, 0.75, 0.9, 1, 1.15, 1.3, 1.5];
  var AUTO_PAUSE_STORY_MS = 900;
  var AUTO_PAUSE_QUESTION_MS = 4000;

  var app = document.getElementById("app");
  var state = {
    screen: "menu",
    story: null,
    index: 0,
    leaving: false,
    track: -1,
    spotlight: false,
    answerOpen: false,
    speaking: false,
    tallyFlash: null,
    talliedPage: null,
    autoplay: false,
    toast: null
  };
  var autoTimer = 0;
  var toastTimer = 0;
  var currentUtter = null;

  var settings = loadSettings();
  applySettings();

  function loadSettings() {
    try {
      var raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        return {
          dim: !!parsed.dim,
          textMult: typeof parsed.textMult === "number" ? parsed.textMult : 1,
          rate: RATE_STEPS.indexOf(parsed.rate) !== -1 ? parsed.rate : 1
        };
      }
    } catch (e) {}
    return { dim: false, textMult: 1, rate: 1 };
  }

  function saveSettings() {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {}
  }

  function applySettings() {
    document.documentElement.classList.toggle("dim", settings.dim);
    document.documentElement.style.setProperty("--text-mult", String(settings.textMult));
  }

  function loadTally() {
    try {
      var raw = localStorage.getItem(TALLY_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {};
  }

  function saveTally(data) {
    try {
      localStorage.setItem(TALLY_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function reducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function phoneLayout() {
    return window.matchMedia("(max-width: 760px), (max-height: 520px) and (pointer: coarse)").matches;
  }

  function fadeMs() {
    if (reducedMotion()) return 0;
    var raw = getComputedStyle(document.documentElement).getPropertyValue("--fade");
    var n = parseInt(raw, 10);
    return isNaN(n) ? 300 : n;
  }

  function stories() {
    return window.STORIES || [];
  }

  function optimizedSrc(src, size) {
    if (!src || src.indexOf("art/") !== 0) return src;
    var name = src.replace(/^art\//, "").replace(/\.(jpe?g|png)$/i, "");
    if (size === "thumb") return "art/thumb/" + name + ".webp";
    return "art/web/" + name + ".webp";
  }

  function artHtml(id, size) {
    var art = window.ART || {};
    var src = art[id];
    if (!src) return "";
    if (src.indexOf("<svg") === 0 || src.indexOf("<SVG") === 0) return src;
    var out = optimizedSrc(src, size);
    var dim = (window.ART_DIMS || {})[out];
    var html = '<img src="' + out + '" alt="" decoding="async"';
    if (size === "thumb") html += ' loading="lazy"';
    if (dim) html += ' width="' + dim[0] + '" height="' + dim[1] + '"';
    return html + ">";
  }

  function pageArtIds(p) {
    if (!p) return [];
    if (p.arts && p.arts.length) return p.arts;
    if (p.art) return [p.art];
    return ["listen"];
  }

  function preloadUpcoming() {
    if (!state.story || state.screen !== "read") return;
    var pages = state.story.pages;
    var n;
    for (n = 1; n <= 2; n++) {
      var p = pages[state.index + n];
      if (!p) break;
      pageArtIds(p).forEach(function (id) {
        var src = optimizedSrc((window.ART || {})[id] || "");
        if (!src || src.indexOf("<svg") === 0) return;
        var img = new Image();
        img.src = src;
      });
    }
  }

  function page() {
    if (!state.story) return null;
    return state.story.pages[state.index] || null;
  }

  function pageType(p) {
    if (!p) return "story";
    return p.type || "story";
  }

  function spokenText(p) {
    if (!p) return "";
    if (p.type === "question") return p.q || "";
    if (p.type === "predict") return p.text || p.q || "What do you think happens next?";
    if (p.type === "retell") return p.text || "Tell the story in order.";
    return p.text || "";
  }

  function spotlightEntry(p) {
    if (!p || !p.word) return null;
    var keys = Object.keys(p.word);
    if (!keys.length) return null;
    return { word: keys[0], meaning: p.word[keys[0]] };
  }

  function tokenize(text, spotWord) {
    var tokens = [];
    var re = /(\s+)|([A-Za-z][A-Za-z']*)|([^A-Za-z\s]+)/g;
    var m;
    var wordIndex = 0;
    var spot = spotWord ? spotWord.toLowerCase() : "";
    while ((m = re.exec(text))) {
      if (m[1]) {
        tokens.push({ type: "space", text: m[1] });
      } else if (m[2]) {
        tokens.push({
          type: "word",
          text: m[2],
          i: wordIndex,
          spot: spot && m[2].toLowerCase() === spot
        });
        wordIndex += 1;
      } else {
        tokens.push({ type: "punct", text: m[3] });
      }
    }
    return tokens;
  }

  function wordCount(tokens) {
    var n = 0;
    for (var i = 0; i < tokens.length; i++) if (tokens[i].type === "word") n++;
    return n;
  }

  var narrationAudio = null;
  var narrationFrame = 0;

  function stopSpeech() {
    state.speaking = false;
    currentUtter = null;
    if (narrationFrame) {
      cancelAnimationFrame(narrationFrame);
      narrationFrame = 0;
    }
    if (narrationAudio) {
      var audio = narrationAudio;
      narrationAudio = null;
      audio.onended = null;
      audio.onerror = null;
      audio.pause();
    }
    if (window.speechSynthesis) speechSynthesis.cancel();
  }

  function wordAtChar(tokens, charIndex) {
    var pos = 0;
    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i];
      var next = pos + t.text.length;
      if (t.type === "word" && charIndex >= pos && charIndex < next) return t.i;
      pos = next;
    }
    var last = -1;
    for (var j = 0; j < tokens.length; j++) {
      if (tokens[j].type === "word") last = tokens[j].i;
    }
    return last;
  }

  function narrationClip(text) {
    var book = window.NARRATION;
    if (!book || !text) return null;
    var clip = book[text];
    if (!clip || !clip.src) return null;
    return clip;
  }

  function speakWithBrowser(text) {
    if (!window.speechSynthesis) {
      state.speaking = false;
      render();
      narrationDone();
      return;
    }
    var p = page();
    var tokens = tokenize(text, spotlightEntry(p) && spotlightEntry(p).word);
    var utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.92 * settings.rate;
    utter.pitch = 1;
    state.speaking = true;
    state.track = 0;
    utter.onboundary = function (e) {
      if (e.name !== "word") return;
      state.track = wordAtChar(tokens, e.charIndex);
      paintWords();
    };
    var finish = function () {
      if (currentUtter !== utter) return;
      currentUtter = null;
      state.speaking = false;
      render();
      narrationDone();
    };
    utter.onend = finish;
    utter.onerror = finish;
    speechSynthesis.cancel();
    currentUtter = utter;
    speechSynthesis.speak(utter);
    render();
  }

  function playNarration(text, clip) {
    var starts = clip.starts || [];
    var audio = new Audio(clip.src);
    audio.preservesPitch = true;
    audio.playbackRate = settings.rate;
    narrationAudio = audio;
    state.speaking = true;
    state.track = 0;
    render();

    function tick() {
      if (narrationAudio !== audio || !state.speaking) return;
      var t = audio.currentTime;
      var idx = -1;
      for (var i = 0; i < starts.length; i++) {
        if (t + 0.03 >= starts[i]) idx = i;
        else break;
      }
      if (idx !== state.track) {
        state.track = idx;
        paintWords();
      }
      narrationFrame = requestAnimationFrame(tick);
    }

    audio.onended = function () {
      if (narrationAudio !== audio) return;
      narrationAudio = null;
      state.speaking = false;
      state.track = -1;
      render();
      narrationDone();
    };
    audio.onerror = function () {
      if (narrationAudio !== audio) return;
      narrationAudio = null;
      speakWithBrowser(text);
    };
    audio.play().then(function () {
      if (narrationAudio !== audio) return;
      narrationFrame = requestAnimationFrame(tick);
    }).catch(function () {
      if (narrationAudio !== audio) return;
      narrationAudio = null;
      speakWithBrowser(text);
    });
  }

  function readPage() {
    var text = spokenText(page());
    if (!text) {
      narrationDone();
      return;
    }
    var clip = narrationClip(text);
    if (clip) {
      playNarration(text, clip);
      return;
    }
    speakWithBrowser(text);
  }

  function toggleReadAloud() {
    if (state.speaking) {
      stopAutoplay();
      stopSpeech();
      render();
      return;
    }
    readPage();
  }

  function clearAutoTimer() {
    if (autoTimer) {
      window.clearTimeout(autoTimer);
      autoTimer = 0;
    }
  }

  function narrationDone() {
    if (!state.autoplay || state.screen !== "read") return;
    clearAutoTimer();
    var t = pageType(page());
    var wait = t === "story" ? AUTO_PAUSE_STORY_MS : AUTO_PAUSE_QUESTION_MS;
    autoTimer = window.setTimeout(function () {
      autoTimer = 0;
      if (state.autoplay) autoAdvance();
    }, wait);
  }

  function autoAdvance() {
    if (!state.story) return;
    if (state.index < state.story.pages.length - 1) {
      goTo(state.index + 1);
      return;
    }
    var list = stories();
    var nextStory = list[list.indexOf(state.story) + 1];
    if (nextStory) {
      prepareStory(nextStory);
      goTo(0, nextStory);
      return;
    }
    stopAutoplay();
    state.screen = "menu";
    render();
    showToast("Finished all the books");
  }

  function startAutoplay() {
    state.autoplay = true;
    if (state.screen !== "read" || !state.story) {
      var first = stories()[0];
      if (!first) {
        state.autoplay = false;
        return;
      }
      prepareStory(first);
      showToast("Autoplay on");
      goTo(0, first);
      return;
    }
    showToast("Autoplay on");
    stopSpeech();
    readPage();
  }

  function stopAutoplay() {
    state.autoplay = false;
    clearAutoTimer();
  }

  function toggleAutoplay() {
    if (state.autoplay) {
      stopAutoplay();
      stopSpeech();
      render();
      showToast("Autoplay off");
      return;
    }
    startAutoplay();
  }

  function showToast(message) {
    state.toast = message;
    if (toastTimer) window.clearTimeout(toastTimer);
    paintToast();
    toastTimer = window.setTimeout(function () {
      toastTimer = 0;
      state.toast = null;
      paintToast();
    }, 1600);
  }

  function paintToast() {
    var el = document.getElementById("toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = state.toast || "";
    el.classList.toggle("is-on", !!state.toast);
  }

  function setRate(rate) {
    settings.rate = rate;
    saveSettings();
    if (narrationAudio) narrationAudio.playbackRate = rate;
    showToast("Reading speed " + rate + "×");
  }

  function changeRate(dir) {
    var i = RATE_STEPS.indexOf(settings.rate);
    if (i < 0) i = RATE_STEPS.indexOf(1);
    i = Math.max(0, Math.min(RATE_STEPS.length - 1, i + dir));
    setRate(RATE_STEPS[i]);
  }

  function paintWords() {
    var nodes = app.querySelectorAll(".word[data-i]");
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      var idx = Number(n.getAttribute("data-i"));
      n.classList.toggle("is-track", !state.speaking && idx === state.track);
      n.classList.toggle("is-speak", state.speaking && idx === state.track);
    }
  }

  function resetPageLocal() {
    state.track = -1;
    state.spotlight = false;
    state.answerOpen = false;
    state.tallyFlash = null;
    clearAutoTimer();
    stopSpeech();
  }

  function goTo(index, story) {
    if (state.leaving) return;
    var nextStory = story || state.story;
    if (!nextStory) return;
    var max = nextStory.pages.length - 1;
    var next = Math.max(0, Math.min(max, index));
    if (story === state.story && next === state.index && state.screen === "read") return;

    var apply = function () {
      state.leaving = false;
      state.story = nextStory;
      state.index = next;
      state.screen = "read";
      resetPageLocal();
      render();
      if (state.autoplay) readPage();
    };

    if (state.screen === "read" && !reducedMotion()) {
      state.leaving = true;
      var el = app.querySelector(".page");
      if (el) el.classList.add("is-leaving");
      window.setTimeout(apply, fadeMs());
    } else {
      apply();
    }
  }

  function openStory(story) {
    goTo(0, story);
  }

  function nextPage() {
    if (!state.story) return;
    if (state.index >= state.story.pages.length - 1) {
      stopAutoplay();
      state.screen = "menu";
      resetPageLocal();
      render();
      return;
    }
    goTo(state.index + 1);
  }

  function prevPage() {
    if (!state.story) return;
    if (state.index <= 0) {
      stopAutoplay();
      state.screen = "menu";
      resetPageLocal();
      render();
      return;
    }
    goTo(state.index - 1);
  }

  function bumpTrack() {
    var p = page();
    if (!p) return;
    var tokens = tokenize(spokenText(p), spotlightEntry(p) && spotlightEntry(p).word);
    var n = wordCount(tokens);
    if (!n) return;
    state.track = state.track + 1;
    if (state.track >= n) state.track = -1;
    paintWords();
    if (state.track === -1) render();
  }

  function changeText(dir) {
    var i = TEXT_STEPS.indexOf(settings.textMult);
    if (i < 0) i = 1;
    i = Math.max(0, Math.min(TEXT_STEPS.length - 1, i + dir));
    settings.textMult = TEXT_STEPS[i];
    saveSettings();
    applySettings();
  }

  function toggleDim() {
    settings.dim = !settings.dim;
    saveSettings();
    applySettings();
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  function recordTally(gotIt) {
    var p = page();
    if (!p) return;
    var t = pageType(p);
    if (t !== "question" && t !== "predict" && t !== "retell") return;
    var kind = p.kind || t;
    var data = loadTally();
    var sid = state.story.id;
    if (!data[sid]) data[sid] = [];
    data[sid].push({
      kind: kind,
      result: gotIt ? "got" : "help",
      page: state.index,
      ts: Date.now()
    });
    saveTally(data);
    state.talliedPage = state.index;
    state.tallyFlash = gotIt ? "ok" : "help";
    render();
    window.setTimeout(function () {
      if (state.tallyFlash) {
        state.tallyFlash = null;
        var mark = app.querySelector(".tally-mark");
        if (mark) mark.classList.remove("is-on");
      }
    }, 1600);
  }

  function tallySummary(storyId) {
    var data = loadTally();
    var rows = data[storyId] || [];
    var out = {};
    KINDS.forEach(function (k) {
      out[k] = { got: 0, help: 0 };
    });
    rows.forEach(function (r) {
      if (!out[r.kind]) out[r.kind] = { got: 0, help: 0 };
      if (r.result === "got") out[r.kind].got += 1;
      else out[r.kind].help += 1;
    });
    return { rows: rows, byKind: out };
  }

  function clearTally(storyId) {
    var data = loadTally();
    if (storyId) delete data[storyId];
    else data = {};
    saveTally(data);
    render();
  }

  function keyHelpHtml() {
    return (
      '<div class="keys">' +
      "<div><kbd>→</kbd> or <kbd>Space</kbd> next &nbsp; <kbd>←</kbd> back</div>" +
      "<div><kbd>W</kbd> tracking line &nbsp; <kbd>S</kbd> word meaning &nbsp; <kbd>R</kbd> read aloud</div>" +
      "<div><kbd>P</kbd> autoplay all books &nbsp; <kbd>+</kbd> <kbd>−</kbd> reading speed &nbsp; <kbd>0</kbd> normal speed</div>" +
      "<div><kbd>A</kbd> show answer &nbsp; <kbd>1</kbd> got it &nbsp; <kbd>2</kbd> needed help</div>" +
      "<div><kbd>[</kbd> <kbd>]</kbd> text size &nbsp; <kbd>D</kbd> dim &nbsp; <kbd>F</kbd> full screen</div>" +
      "<div><kbd>M</kbd> stories &nbsp; <kbd>G</kbd> grown-up panel</div>" +
      '<p class="touch-hint">On a phone, swipe sideways to turn the page. The buttons along the bottom go back, ahead, and read aloud.</p>' +
      "</div>"
    );
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderWords(text, spotWord) {
    var tokens = tokenize(text, spotWord);
    var html = "";
    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i];
      if (t.type === "word") {
        var cls = "word";
        if (t.i === state.track) cls += state.speaking ? " is-speak" : " is-track";
        if (t.spot) cls += " is-spot";
        html +=
          '<span class="' +
          cls +
          '" data-i="' +
          t.i +
          '"' +
          (t.spot ? ' data-spot="1"' : "") +
          ">" +
          escapeHtml(t.text) +
          "</span>";
      } else {
        html += escapeHtml(t.text);
      }
    }
    return html;
  }

  function coverArt(s) {
    var first = s.pages[0] || {};
    return artHtml(first.art || (first.arts && first.arts[0]) || "", "thumb");
  }

  function renderMenu() {
    var list = stories()
      .map(function (s, i) {
        return (
          '<div class="slot"><button class="book" data-open="' +
          i +
          '" style="--book-tilt:' +
          ((i % 3) - 1) * 0.6 +
          'deg">' +
          '<span class="book-cover">' +
          coverArt(s) +
          "</span>" +
          '<span class="book-band"><span class="title">' +
          escapeHtml(s.title) +
          '</span><span class="meta">' +
          s.pages.length +
          " pages</span></span></button></div>"
        );
      })
      .join("");
    if (!list) list = '<p class="empty">No stories loaded.</p>';
    app.innerHTML =
      '<div class="screen menu">' +
      '<div class="brand">Calm Book</div>' +
      "<h1>Pick a book</h1>" +
      '<p class="lede">Choose a cover to start reading.</p>' +
      '<div class="mobile-actions">' +
      '<button type="button" data-act="autoplay">Play all books</button>' +
      '<button type="button" data-act="parent">Grown-up panel</button>' +
      "</div>" +
      '<div class="shelf">' +
      list +
      "</div>" +
      '<details class="grown-ups"><summary>Keys for grown-ups</summary>' +
      keyHelpHtml() +
      "</details>" +
      "</div>";
  }

  function parentAnswer(p) {
    var t = pageType(p);
    if (t === "question") {
      return { kind: p.kind || "question", answer: p.answer || "", hint: p.hint || "" };
    }
    if (t === "predict") {
      return {
        kind: "predict",
        answer: p.answer || "Any thoughtful guess is good. Then turn the page.",
        hint: p.hint || "No wrong answer."
      };
    }
    if (t === "retell") {
      return {
        kind: "retell",
        answer: p.answer || (p.arts || []).join(" → "),
        hint: p.hint || "Ask him to point at each picture as he talks."
      };
    }
    return null;
  }

  function renderRetell(p) {
    var arts = p.displayArts || p.arts || [];
    var labels = "ABCD";
    var cells = arts
      .map(function (id, i) {
        return (
          '<div class="art-cell">' +
          artHtml(id) +
          '<div class="art-label">' +
          labels.charAt(i) +
          "</div></div>"
        );
      })
      .join("");
    return '<div class="art"><div class="art-grid">' + cells + "</div></div>";
  }

  function renderRead() {
    var p = page();
    if (!p) {
      renderMenu();
      return;
    }
    var t = pageType(p);
    var spot = spotlightEntry(p);
    var spoken = spokenText(p);
    var dots = state.story.pages
      .map(function (_, i) {
        var cls = "dot";
        if (i === state.index) cls += " is-now";
        else if (i < state.index) cls += " is-done";
        return '<span class="' + cls + '"></span>';
      })
      .join("");

    var artBlock = "";
    if (t === "retell") artBlock = renderRetell(p);
    else if (p.art) artBlock = '<div class="art">' + artHtml(p.art) + "</div>";
    else artBlock = '<div class="art">' + artHtml("listen") + "</div>";

    var kicker = "";
    if (t === "predict") kicker = '<div class="card-kicker">What happens next?</div>';
    if (t === "question") kicker = '<div class="card-kicker">' + escapeHtml(p.kind || "think") + "</div>";
    if (t === "retell") kicker = '<div class="card-kicker">Retell</div>';

    var extra = "";
    if (state.spotlight && spot) {
      extra =
        '<div class="spotlight"><strong>' +
        escapeHtml(spot.word) +
        "</strong> — " +
        escapeHtml(spot.meaning) +
        "</div>";
    }

    var pa = parentAnswer(p);
    var strip = "";
    if (pa) {
      strip =
        '<div class="parent-strip' +
        (state.answerOpen ? " is-open" : "") +
        '"><div class="kind">' +
        escapeHtml(pa.kind) +
        '</div><div class="answer">' +
        escapeHtml(pa.answer) +
        "</div>" +
        (pa.hint ? '<div class="hint">Hint: ' + escapeHtml(pa.hint) + "</div>" : "") +
        "</div>";
    }

    var flash = "";
    if (state.tallyFlash) {
      flash =
        '<div class="tally-mark is-on ' +
        state.tallyFlash +
        '">' +
        (state.tallyFlash === "ok" ? "got it" : "needed help") +
        "</div>";
    }

    var textClass = "text " + t;
    app.innerHTML =
      '<div class="screen">' +
      '<div class="progress">' +
      dots +
      "</div>" +
      '<div class="page' +
      (state.leaving ? " is-leaving" : "") +
      '">' +
      artBlock +
      '<div class="' +
      textClass +
      '">' +
      kicker +
      renderWords(spoken, spot && spot.word) +
      extra +
      "</div>" +
      strip +
      "</div>" +
      '<div class="edge edge-left" data-edge="prev"></div>' +
      '<div class="edge edge-right" data-edge="next"></div>' +
      flash +
      (state.autoplay
        ? '<div class="auto-pill">Autoplay' + (phoneLayout() ? "" : " · press P to stop") + "</div>"
        : "") +
      "</div>" +
      touchNavHtml(!!pa);
    preloadUpcoming();
  }

  function touchNavHtml(hasAnswer) {
    var quiet = "";
    if (hasAnswer) {
      quiet =
        '<div class="touch-row touch-row-quiet">' +
        '<button type="button" class="touch-btn" data-act="answer">' +
        (state.answerOpen ? "Hide" : "Answer") +
        "</button>" +
        '<button type="button" class="touch-btn" data-act="got">Got it</button>' +
        '<button type="button" class="touch-btn" data-act="help">Help</button>' +
        "</div>";
    }
    var readLabel = state.autoplay || state.speaking ? "Stop" : "Read";
    var readAct = state.autoplay ? "autoplay" : "speak";
    return (
      '<nav class="touch-nav" aria-label="Reading controls">' +
      '<div class="touch-row">' +
      '<button type="button" class="touch-btn" data-act="stories">Stories</button>' +
      '<button type="button" class="touch-btn" data-edge="prev">Back</button>' +
      '<button type="button" class="touch-btn touch-btn-next" data-edge="next">Next</button>' +
      '<button type="button" class="touch-btn" data-act="' +
      readAct +
      '">' +
      readLabel +
      "</button>" +
      "</div>" +
      quiet +
      "</nav>"
    );
  }

  function renderParent() {
    var currentId = state.story ? state.story.id : stories()[0] && stories()[0].id;
    var summary = currentId ? tallySummary(currentId) : { rows: [], byKind: {} };
    var rows = KINDS.map(function (k) {
      var b = summary.byKind[k] || { got: 0, help: 0 };
      var total = b.got + b.help;
      if (!total) return "";
      return (
        "<tr><td>" +
        escapeHtml(k) +
        "</td><td>" +
        b.got +
        "</td><td>" +
        b.help +
        "</td></tr>"
      );
    }).join("");
    if (!rows) rows = '<tr><td colspan="3" class="empty">No tallies yet. On a question page press 1 or 2.</td></tr>';

    var storyName = state.story ? state.story.title : "All stories";
    app.innerHTML =
      '<div class="screen"><div class="panel">' +
      '<button class="ghost" data-act="back">← back</button>' +
      "<h1>Parent</h1>" +
      '<div class="row"><span>Dim evening colours</span><button data-act="dim">' +
      (settings.dim ? "On" : "Off") +
      "</button></div>" +
      '<div class="row"><span>Text size</span><span><button data-act="smaller">−</button> ' +
      settings.textMult.toFixed(1) +
      '× <button data-act="bigger">+</button></span></div>' +
      '<div class="row"><span>Reading speed</span><span><button data-act="slower">−</button> ' +
      settings.rate +
      '× <button data-act="faster">+</button> <button data-act="normal-rate">Normal</button></span></div>' +
      '<div class="row"><span>Full screen</span><button data-act="full">Toggle</button></div>' +
      '<div class="stats"><h2>Tally — ' +
      escapeHtml(storyName) +
      "</h2>" +
      "<table><thead><tr><th>Kind</th><th>Got it</th><th>Help</th></tr></thead><tbody>" +
      rows +
      "</tbody></table></div>" +
      '<div class="row" style="margin-top:1rem"><span>Clear this story\'s tally</span><button data-act="clear">Clear</button></div>' +
      keyHelpHtml() +
      "</div></div>";
  }

  function render() {
    if (state.screen === "menu") renderMenu();
    else if (state.screen === "parent") renderParent();
    else renderRead();
  }

  function shuffleCopy(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  function prepareStory(story) {
    story.pages.forEach(function (p) {
      if (p.type === "retell" && p.arts && !p.displayArts) {
        var mixed = shuffleCopy(p.arts);
        if (mixed.join() === p.arts.join() && mixed.length > 1) {
          mixed = mixed.slice(1).concat(mixed[0]);
        }
        p.displayArts = mixed;
      }
    });
  }

  function onKey(e) {
    var key = e.key;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (
      key === " " ||
      key === "ArrowRight" ||
      key === "ArrowLeft" ||
      key === "+" ||
      key === "=" ||
      key === "-" ||
      key === "_" ||
      key === "0"
    ) {
      e.preventDefault();
    }

    if (key === "m" || key === "M") {
      stopAutoplay();
      stopSpeech();
      state.screen = "menu";
      render();
      return;
    }
    if (key === "g" || key === "G") {
      stopAutoplay();
      stopSpeech();
      state.screen = state.screen === "parent" ? (state.story ? "read" : "menu") : "parent";
      render();
      return;
    }
    if (key === "p" || key === "P") {
      if (state.screen === "parent") return;
      toggleAutoplay();
      return;
    }
    if (key === "+" || key === "=") {
      changeRate(1);
      return;
    }
    if (key === "-" || key === "_") {
      changeRate(-1);
      return;
    }
    if (key === "0") {
      setRate(1);
      return;
    }
    if (key === "d" || key === "D") {
      toggleDim();
      if (state.screen === "parent") render();
      return;
    }
    if (key === "f" || key === "F") {
      toggleFullscreen();
      return;
    }
    if (key === "]") {
      changeText(1);
      if (state.screen === "parent") render();
      return;
    }
    if (key === "[") {
      changeText(-1);
      if (state.screen === "parent") render();
      return;
    }
    if (key === "Escape") {
      stopAutoplay();
      stopSpeech();
      if (state.screen === "parent" || state.screen === "menu") {
        state.screen = state.story ? "read" : "menu";
      } else {
        state.screen = "menu";
      }
      render();
      return;
    }

    if (state.screen === "menu") {
      if (key === "Enter" || key === " " || key === "ArrowRight") {
        if (stories()[0]) {
          prepareStory(stories()[0]);
          openStory(stories()[0]);
        }
      }
      return;
    }
    if (state.screen === "parent") return;

    if (key === "ArrowRight" || key === " ") {
      nextPage();
      return;
    }
    if (key === "ArrowLeft") {
      prevPage();
      return;
    }
    if (key === "a" || key === "A") {
      var p = page();
      if (parentAnswer(p)) {
        state.answerOpen = !state.answerOpen;
        render();
      }
      return;
    }
    if (key === "w" || key === "W") {
      if (state.speaking) return;
      bumpTrack();
      return;
    }
    if (key === "r" || key === "R") {
      toggleReadAloud();
      return;
    }
    if (key === "s" || key === "S") {
      var sp = spotlightEntry(page());
      if (sp) {
        state.spotlight = !state.spotlight;
        render();
      }
      return;
    }
    if (key === "1") {
      recordTally(true);
      return;
    }
    if (key === "2") {
      recordTally(false);
      return;
    }
  }

  function onClick(e) {
    var open = e.target.closest("[data-open]");
    if (open) {
      var story = stories()[Number(open.getAttribute("data-open"))];
      if (story) {
        prepareStory(story);
        openStory(story);
      }
      return;
    }
    var act = e.target.closest("[data-act]");
    if (act) {
      var a = act.getAttribute("data-act");
      if (a === "back") {
        state.screen = state.story ? "read" : "menu";
        render();
      } else if (a === "dim") {
        toggleDim();
        render();
      } else if (a === "smaller") {
        changeText(-1);
        render();
      } else if (a === "bigger") {
        changeText(1);
        render();
      } else if (a === "slower") {
        changeRate(-1);
        render();
      } else if (a === "faster") {
        changeRate(1);
        render();
      } else if (a === "normal-rate") {
        setRate(1);
        render();
      } else if (a === "full") {
        toggleFullscreen();
      } else if (a === "clear" && state.story) {
        clearTally(state.story.id);
      } else if (a === "stories") {
        stopAutoplay();
        stopSpeech();
        state.screen = "menu";
        render();
      } else if (a === "parent") {
        stopAutoplay();
        stopSpeech();
        state.screen = "parent";
        render();
      } else if (a === "speak") {
        toggleReadAloud();
      } else if (a === "autoplay") {
        toggleAutoplay();
      } else if (a === "answer") {
        if (parentAnswer(page())) {
          state.answerOpen = !state.answerOpen;
          render();
        }
      } else if (a === "got") {
        recordTally(true);
      } else if (a === "help") {
        recordTally(false);
      }
      return;
    }
    var edge = e.target.closest("[data-edge]");
    if (edge) {
      if (edge.getAttribute("data-edge") === "next") nextPage();
      else prevPage();
      return;
    }
    var spotEl = e.target.closest("[data-spot]");
    if (spotEl) {
      state.spotlight = !state.spotlight;
      render();
    }
  }

  document.addEventListener("keydown", onKey);
  app.addEventListener("click", onClick);

  var swipeX = 0;
  var swipeY = 0;
  var swipeArmed = false;

  app.addEventListener(
    "touchstart",
    function (e) {
      if (state.screen !== "read") {
        swipeArmed = false;
        return;
      }
      if (e.target.closest("button, a, .word, .touch-nav, summary")) {
        swipeArmed = false;
        return;
      }
      var t = e.changedTouches[0];
      swipeX = t.clientX;
      swipeY = t.clientY;
      swipeArmed = true;
    },
    { passive: true }
  );

  app.addEventListener(
    "touchend",
    function (e) {
      if (!swipeArmed || state.screen !== "read") return;
      swipeArmed = false;
      var t = e.changedTouches[0];
      var dx = t.clientX - swipeX;
      var dy = t.clientY - swipeY;
      if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
      if (dx < 0) nextPage();
      else prevPage();
    },
    { passive: true }
  );

  stories().forEach(prepareStory);
  render();
})();
