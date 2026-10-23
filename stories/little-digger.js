(function () {
  "use strict";

  var ART = window.ART;
  ART.digSite = "art/dig-site.jpg";
  ART.digDigging = "art/dig-digging.jpg";
  ART.digBulldozer = "art/dig-bulldozer.jpg";
  ART.digDumptruck = "art/dig-dumptruck.jpg";
  ART.digMixer = "art/dig-mixer.jpg";
  ART.digCrane = "art/dig-crane.jpg";
  ART.digRoller = "art/dig-roller.jpg";
  ART.digPark = "art/dig-park.jpg";

  window.STORIES.push({
    id: "little-digger",
    title: "The Little Digger Builds a Park",
    level: 2,
    pages: [
      {
        art: "digSite",
        text: "The Little Digger Builds a Park."
      },
      {
        art: "digSite",
        text: "A little yellow digger looked at an empty, sandy lot.",
        word: { lot: "a piece of empty land" }
      },
      {
        art: "digSite",
        text: "Today the big machines would build a park."
      },
      {
        type: "predict",
        art: "digSite",
        text: "The land is bumpy and bare. What do you think the machines will do first?",
        answer: "Dig and make the ground flat. (Any thoughtful guess is good.)",
        hint: "Look at the bumpy ground."
      },
      {
        art: "digDigging",
        text: "First the little digger dug a hole. Scoop, lift, drop."
      },
      {
        art: "digBulldozer",
        text: "Then the bulldozer pushed the sand. Its wide blade made it smooth and flat.",
        word: { blade: "a wide, flat metal part that pushes" }
      },
      {
        type: "question",
        kind: "recall",
        art: "digBulldozer",
        q: "Which machine pushed the sand flat?",
        answer: "The bulldozer.",
        hint: "The big orange one with a wide blade."
      },
      {
        art: "digDumptruck",
        text: "The dump truck came. It tipped up and poured out grey gravel.",
        word: { gravel: "lots of tiny stones" }
      },
      {
        art: "digMixer",
        text: "The cement mixer turned and turned. Then it poured smooth, wet cement."
      },
      {
        type: "question",
        kind: "vocabulary",
        art: "digDumptruck",
        q: "What is gravel?",
        answer: "Lots of tiny stones.",
        hint: "The dump truck poured it out."
      },
      {
        art: "digCrane",
        text: "The tall crane lifted a little play house. Slowly, gently, down it came."
      },
      {
        type: "predict",
        art: "digCrane",
        text: "The path is still soft and bumpy. Which machine could make it flat?",
        answer: "The road roller.",
        hint: "It has a big, smooth, round drum."
      },
      {
        art: "digRoller",
        text: "The road roller rolled the path. Roll, roll, roll, until it was smooth."
      },
      {
        type: "question",
        kind: "inference",
        art: "digCrane",
        q: "Why did the crane lift the play house slowly?",
        answer: "So it would not drop or break.",
        hint: "What could happen if it went too fast?"
      },
      {
        art: "digPark",
        text: "The work was done. There was a path, a slide, and a little play house."
      },
      {
        type: "question",
        kind: "sequence",
        art: "digSite",
        q: "What came first — the crane, the digging, or the road roller?",
        answer: "The digging.",
        hint: "Think about what the land looked like at the start."
      },
      {
        type: "question",
        kind: "feelings",
        art: "digPark",
        q: "How do you think the little digger felt when the park was done?",
        answer: "Proud, happy, tired — any feeling with a reason is good.",
        hint: "Ask why he thinks that."
      },
      {
        type: "retell",
        arts: ["digDigging", "digDumptruck", "digCrane", "digPark"],
        text: "Look at the pictures. Tell the story in the right order.",
        answer: "Digging, then the dump truck, then the crane, then the park.",
        hint: "He can point as he talks. Press A after he finishes."
      },
      {
        art: "digPark",
        text: "Each machine did its own job. Together, they built a park."
      },
      {
        art: "digPark",
        text: "The little digger parked by the slide and rested."
      }
    ]
  });
})();
