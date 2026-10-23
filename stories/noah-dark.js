(function () {
  "use strict";

  var ART = window.ART;
  ART.darkBed = "art/dark-bed.jpg";
  ART.darkShadow = "art/dark-shadow.jpg";
  ART.darkLight = "art/dark-light.jpg";
  ART.darkSleep = "art/dark-sleep.jpg";

  window.STORIES.push({
    id: "noah-dark",
    title: "Noah and the Shadow",
    level: 2,
    pages: [
      { art: "darkSleep", text: "Noah and the Shadow." },
      {
        art: "darkBed",
        text: "It was bedtime. The room was dark and quiet."
      },
      {
        art: "darkShadow",
        text: "Noah saw a big shape on the wall. His tummy felt wobbly.",
        word: { shape: "the outline of something" }
      },
      {
        type: "predict",
        art: "darkShadow",
        text: "What do you think the big shape really is?",
        answer: "A shadow of something in the room. (Any thoughtful guess is good.)",
        hint: "Look at the chair."
      },
      {
        art: "darkShadow",
        text: "Noah did not hide. He called, \"Mama, can you come?\""
      },
      {
        art: "darkLight",
        text: "Mama turned on a little nightlight. The shape was only his coat on the chair!"
      },
      {
        type: "question",
        kind: "recall",
        art: "darkLight",
        q: "What was the big shape?",
        answer: "A shadow of Noah's coat on the chair.",
        hint: "Look at the chair."
      },
      {
        art: "darkLight",
        text: "\"It is just a shadow,\" said Mama. Noah took a slow breath.",
        word: { shadow: "a dark shape made when something blocks the light" }
      },
      {
        type: "question",
        kind: "vocabulary",
        art: "darkLight",
        q: "What is a shadow?",
        answer: "A dark shape made when something blocks the light.",
        hint: "What made the shape on the wall?"
      },
      {
        type: "question",
        kind: "inference",
        art: "darkLight",
        q: "Why did the nightlight help Noah?",
        answer: "He could see the shape was only his coat.",
        hint: "What could he see once it was lighter?"
      },
      {
        art: "darkSleep",
        text: "Noah hugged his teddy. The nightlight glowed softly. He fell asleep."
      },
      {
        type: "question",
        kind: "feelings",
        art: "darkSleep",
        q: "How did Noah feel at the end?",
        answer: "Safe, calm, sleepy — any feeling with a reason is good.",
        hint: "Look at his face."
      },
      {
        type: "retell",
        arts: ["darkBed", "darkShadow", "darkLight", "darkSleep"],
        text: "Look at the pictures. Tell the story in the right order.",
        answer: "Bedtime, the shadow, Mama's nightlight, sleeping.",
        hint: "He can point as he talks. Press A after he finishes."
      },
      {
        art: "darkSleep",
        text: "When Noah feels scared, he calls for help and takes a slow breath."
      }
    ]
  });
})();
