# Adding a story

Stories are plain data. Duplicate this shape in a new `stories/your-story.js` file, then add a script tag in `index.html` **before** `app.js`.

```js
window.ART = window.ART || {};
window.STORIES = window.STORIES || [];

// Pictures live in the art/ folder (jpg or png). You can still use inline SVG if you prefer.
window.ART.myPicture = "art/my-picture.jpg";

window.STORIES.push({
  id: "my-story",
  title: "My Story",
  level: 2,
  pages: [
    { art: "myPicture", text: "One sentence per page.", word: { sentence: "a group of words that tells a whole idea" } },
    { type: "predict", text: "What do you think happens next?", answer: "…", hint: "…" },
    { type: "question", kind: "recall", q: "Who was in the garden?", answer: "The snail.", hint: "Look at the picture." },
    { type: "retell", arts: ["egg", "feast", "tummy", "spiral"], text: "Tell the story in order.", answer: "…" }
  ]
});
```

Page types:

- story (default) — `art`, `text`, optional `word: { tricky: "simple meaning" }`
- `predict` — spoken guess, no wrong answer
- `question` — `kind` should be one of `recall`, `sequence`, `inference`, `vocabulary`, `feelings`
- `retell` — four `arts` shown jumbled; child tells the order out loud

Parent keys: `A` show answer, `1` got it, `2` needed help.
