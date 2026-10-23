(function () {
  "use strict";

  var ART = window.ART;
  ART.landsBoat = "art/lands-boat.jpg";
  ART.landsAfrica = "art/lands-africa.jpg";
  ART.landsAntarctica = "art/lands-antarctica.jpg";
  ART.landsAsia = "art/lands-asia.jpg";
  ART.landsAustralia = "art/lands-australia.jpg";
  ART.landsEurope = "art/lands-europe.jpg";
  ART.landsNorth = "art/lands-north.jpg";
  ART.landsSouth = "art/lands-south.jpg";

  window.STORIES.push({
    id: "seven-lands",
    title: "Seven Quiet Lands",
    level: 2,
    pages: [
      {
        art: "landsBoat",
        text: "Seven Quiet Lands."
      },
      {
        art: "landsBoat",
        text: "A little paper boat sat on a round globe.",
        word: { globe: "a ball-shaped map of the world" }
      },
      {
        type: "predict",
        art: "landsBoat",
        text: "The boat is ready to sail. Which land do you think he will see first?",
        answer: "Africa. (Any thoughtful guess is good.)",
        hint: "The lands are named in ABC order."
      },
      {
        art: "landsAfrica",
        text: "First he sailed to Africa. The land was wide and warm."
      },
      {
        art: "landsAntarctica",
        text: "Next he sailed to Antarctica. The land was white and still."
      },
      {
        art: "landsAsia",
        text: "Then he sailed to Asia. The land was vast, with high mountains.",
        word: { vast: "very, very wide" }
      },
      {
        type: "question",
        kind: "recall",
        art: "landsAntarctica",
        q: "Which land was white and still?",
        answer: "Antarctica.",
        hint: "The icy one."
      },
      {
        art: "landsAustralia",
        text: "He sailed to Australia. A red rock rose in a quiet desert."
      },
      {
        art: "landsEurope",
        text: "He sailed to Europe. Green fields met a grey sea."
      },
      {
        art: "landsNorth",
        text: "He sailed to North America. Tall trees stood by a cool lake."
      },
      {
        art: "landsSouth",
        text: "He sailed to South America. A long river ran through a green forest."
      },
      {
        type: "predict",
        art: "landsBoat",
        text: "He has seen all seven lands. What might he do now?",
        answer: "Rest. The trip is over.",
        hint: "He has nowhere new left to sail."
      },
      {
        art: "landsBoat",
        text: "He had visited seven continents.",
        word: { continent: "one of the seven big lands on Earth" }
      },
      {
        type: "question",
        kind: "vocabulary",
        art: "landsBoat",
        q: "What does continent mean?",
        answer: "One of the seven big lands on Earth.",
        hint: "Think of Africa, Asia, and the others."
      },
      {
        type: "question",
        kind: "inference",
        art: "landsBoat",
        q: "Why did the little boat stop sailing?",
        answer: "He had already seen all seven lands.",
        hint: "Count the lands he visited."
      },
      {
        type: "question",
        kind: "sequence",
        art: "landsBoat",
        q: "What came first — Antarctica, the globe, or Australia?",
        answer: "The globe.",
        hint: "The story starts with the boat sitting still."
      },
      {
        type: "question",
        kind: "feelings",
        art: "landsBoat",
        q: "How do you think he felt when the trip was done?",
        answer: "Glad, tired, proud — any feeling with a reason is good.",
        hint: "Ask why he thinks that."
      },
      {
        art: "landsBoat",
        text: "He was not lost. He had learned the seven quiet lands."
      },
      {
        type: "retell",
        arts: ["landsBoat", "landsAfrica", "landsAntarctica", "landsSouth"],
        text: "Look at the pictures. Tell the story in the right order.",
        answer: "The globe, then Africa, then Antarctica, then South America.",
        hint: "He can point as he talks. Press A after he finishes."
      },
      {
        art: "landsBoat",
        text: "The little boat folded his sail and rested."
      }
    ]
  });
})();
