(function () {
  "use strict";

  var ART = window.ART;
  ART.sorryTower = "art/sorry-tower.jpg";
  ART.sorryFall = "art/sorry-fall.jpg";
  ART.sorrySay = "art/sorry-say.jpg";
  ART.sorryBuild = "art/sorry-build.jpg";

  window.STORIES.push({
    id: "noah-sorry",
    title: "Noah Says Sorry",
    level: 2,
    pages: [
      { art: "sorryBuild", text: "Noah Says Sorry." },
      {
        art: "sorryTower",
        text: "Baby sister made a tower of soft blocks. Noah zoomed his car across the rug."
      },
      {
        type: "predict",
        art: "sorryTower",
        text: "Look where the car is going. What do you think will happen?",
        answer: "The car will knock the tower down.",
        hint: "Look at the blocks."
      },
      {
        art: "sorryFall",
        text: "Crash! The car hit the tower. The blocks fell down."
      },
      {
        art: "sorryFall",
        text: "Baby sister cried. Noah did not mean to do it. It was an accident.",
        word: { accident: "something that happens by mistake" }
      },
      {
        type: "question",
        kind: "feelings",
        art: "sorryFall",
        q: "How did baby sister feel?",
        answer: "Sad. Her tower fell down.",
        hint: "Look at her face."
      },
      {
        art: "sorrySay",
        text: "Noah knelt down. He patted her back gently. \"I am sorry,\" he said."
      },
      {
        type: "question",
        kind: "recall",
        art: "sorrySay",
        q: "What did Noah say to his sister?",
        answer: "\"I am sorry.\"",
        hint: "He used kind words."
      },
      {
        art: "sorryBuild",
        text: "Then Noah helped her build the tower again."
      },
      {
        type: "question",
        kind: "vocabulary",
        art: "sorryFall",
        q: "What does accident mean?",
        answer: "Something that happens by mistake.",
        hint: "Did Noah mean to do it?"
      },
      {
        type: "question",
        kind: "inference",
        art: "sorrySay",
        q: "Why did Noah say sorry, if it was an accident?",
        answer: "Because his sister was still sad, and he cared about her.",
        hint: "How did she feel?"
      },
      {
        type: "question",
        kind: "sequence",
        art: "sorryBuild",
        q: "What came first — saying sorry, or building again?",
        answer: "Saying sorry.",
        hint: "He fixed her feelings first."
      },
      {
        art: "sorryBuild",
        text: "The new tower was even taller. Baby sister clapped."
      },
      {
        type: "retell",
        arts: ["sorryTower", "sorryFall", "sorrySay", "sorryBuild"],
        text: "Look at the pictures. Tell the story in the right order.",
        answer: "The tower, the crash, saying sorry, building again.",
        hint: "He can point as he talks. Press A after he finishes."
      },
      {
        art: "sorryBuild",
        text: "Even after an accident, Noah says sorry and helps fix it."
      }
    ]
  });
})();
