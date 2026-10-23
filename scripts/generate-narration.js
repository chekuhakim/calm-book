#!/usr/bin/env node
"use strict";

/**
 * Generate ElevenLabs narration once per unique spoken line.
 * Re-running skips lines that already have an mp3 and a manifest entry.
 *
 *   ELEVENLABS_API_KEY=... node scripts/generate-narration.js
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const STORIES_DIR = path.join(ROOT, "stories");
const AUDIO_DIR = path.join(ROOT, "audio");
const MANIFEST_PATH = path.join(AUDIO_DIR, "manifest.json");
const NARRATION_JS = path.join(ROOT, "narration.js");

const VOICE_ID = "cVd39cx0VtXNC13y5Y7z";
const MODEL_ID = "eleven_multilingual_v2";
const API_KEY = process.env.ELEVENLABS_API_KEY;

function spokenText(p) {
  if (!p) return "";
  if (p.type === "question") return p.q || "";
  if (p.type === "predict") return p.text || p.q || "What do you think happens next?";
  if (p.type === "retell") return p.text || "Tell the story in order.";
  return p.text || "";
}

function wordRanges(text) {
  const re = /[A-Za-z][A-Za-z']*/g;
  const ranges = [];
  let m;
  while ((m = re.exec(text))) {
    ranges.push({ start: m.index, word: m[0] });
  }
  return ranges;
}

function loadStories() {
  const window = { STORIES: [], ART: {} };
  const files = fs
    .readdirSync(STORIES_DIR)
    .filter((name) => name.endsWith(".js"))
    .sort();
  files.forEach((name) => {
    const code = fs.readFileSync(path.join(STORIES_DIR, name), "utf8");
    vm.runInNewContext(code, { window, console }, { filename: name });
  });
  return window.STORIES;
}

function collectLines(stories) {
  const lines = [];
  const seen = new Set();
  stories.forEach((story) => {
    (story.pages || []).forEach((page, index) => {
      const text = spokenText(page);
      if (!text || seen.has(text)) return;
      seen.add(text);
      lines.push({
        text,
        id: crypto.createHash("sha256").update(text).digest("hex").slice(0, 16),
        story: story.id,
        page: index
      });
    });
  });
  return lines;
}

function loadManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) return { voiceId: VOICE_ID, modelId: MODEL_ID, clips: {} };
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
}

function writeOutputs(manifest) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
  const book = {};
  Object.keys(manifest.clips).forEach((id) => {
    const clip = manifest.clips[id];
    book[clip.text] = { src: clip.src, starts: clip.starts };
  });
  const js =
    "window.NARRATION = window.NARRATION || {};\n" +
    "Object.assign(window.NARRATION, " +
    JSON.stringify(book) +
    ");\n";
  fs.writeFileSync(NARRATION_JS, js);
}

function wordStarts(text, alignment) {
  if (!alignment || !alignment.characters || !alignment.character_start_times_seconds) return [];
  const joined = alignment.characters.join("");
  const times = alignment.character_start_times_seconds;
  const ranges = wordRanges(joined === text ? text : joined);
  const expected = wordRanges(text);
  const use = ranges.length === expected.length ? ranges : expected;
  return use.map((range) => {
    const t = times[range.start];
    return typeof t === "number" ? Math.round(t * 1000) / 1000 : 0;
  });
}

async function synthesize(text) {
  const url =
    "https://api.elevenlabs.io/v1/text-to-speech/" +
    VOICE_ID +
    "/with-timestamps?output_format=mp3_44100_128";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "xi-api-key": API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      text,
      model_id: MODEL_ID,
      voice_settings: {
        stability: 0.55,
        similarity_boost: 0.75,
        style: 0.15,
        use_speaker_boost: true,
        speed: 0.92
      }
    })
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error("ElevenLabs " + res.status + " " + body.slice(0, 400));
  }
  return res.json();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateOne(line, index, total, manifest) {
  const fileName = line.id + ".mp3";
  const src = "audio/" + fileName;
  const filePath = path.join(AUDIO_DIR, fileName);
  process.stdout.write("[" + (index + 1) + "/" + total + "] " + line.story + " " + line.text.slice(0, 60) + "\n");
  let data;
  let attempt = 0;
  while (true) {
    try {
      data = await synthesize(line.text);
      break;
    } catch (err) {
      attempt += 1;
      if (attempt >= 5) throw err;
      const wait = err.message.indexOf("429") >= 0 ? 5000 * attempt : 2000 * attempt;
      console.warn("retry " + attempt + ": " + err.message.slice(0, 180));
      await sleep(wait);
    }
  }
  const audio = Buffer.from(data.audio_base64, "base64");
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
  fs.writeFileSync(filePath, audio);
  const alignment = data.alignment || data.normalized_alignment;
  manifest.clips[line.id] = {
    text: line.text,
    src,
    starts: wordStarts(line.text, alignment)
  };
  writeOutputs(manifest);
}

async function main() {
  if (!API_KEY) {
    console.error("Set ELEVENLABS_API_KEY");
    process.exit(1);
  }
  const stories = loadStories();
  const lines = collectLines(stories);
  const manifest = loadManifest();
  manifest.voiceId = VOICE_ID;
  manifest.modelId = MODEL_ID;
  manifest.clips = manifest.clips || {};

  const pending = [];
  let skipped = 0;
  lines.forEach((line, index) => {
    const filePath = path.join(AUDIO_DIR, line.id + ".mp3");
    const existing = manifest.clips[line.id];
    if (existing && existing.text === line.text && fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
      skipped += 1;
      return;
    }
    pending.push({ line, index });
  });

  const limit = 4;
  let cursor = 0;
  let made = 0;
  async function worker() {
    while (cursor < pending.length) {
      const job = pending[cursor];
      cursor += 1;
      await generateOne(job.line, job.index, lines.length, manifest);
      made += 1;
    }
  }
  const workers = [];
  for (let i = 0; i < Math.min(limit, pending.length); i++) workers.push(worker());
  await Promise.all(workers);
  writeOutputs(manifest);
  console.log("stories " + stories.length + " unique lines " + lines.length + " generated " + made + " reused " + skipped);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
