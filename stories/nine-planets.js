(function () {
  "use strict";

  var ART = window.ART;
  ART.planetsSun = "art/planets-sun.jpg";
  ART.planetsMercury = "art/planets-mercury.jpg";
  ART.planetsVenus = "art/planets-venus.jpg";
  ART.planetsEarth = "art/planets-earth.jpg";
  ART.planetsMars = "art/planets-mars.jpg";
  ART.planetsJupiter = "art/planets-jupiter.jpg";
  ART.planetsSaturn = "art/planets-saturn.jpg";
  ART.planetsUranus = "art/planets-uranus.jpg";
  ART.planetsNeptune = "art/planets-neptune.jpg";
  ART.planetsPluto = "art/planets-pluto.jpg";

  window.STORIES.push({
    id: "nine-planets",
    title: "The Little Rocket and the Nine Planets",
    level: 2,
    pages: [
      {
        art: "planetsSun",
        text: "The Little Rocket and the Nine Planets."
      },
      {
        art: "planetsSun",
        text: "A little paper rocket floated near the big, warm Sun.",
        word: { rocket: "a ship that flies into space" }
      },
      {
        type: "predict",
        art: "planetsSun",
        text: "The rocket wants to visit every planet. Which one do you think is closest to the Sun?",
        answer: "Mercury. (Any thoughtful guess is good.)",
        hint: "Its name starts with M, but it is not Mars."
      },
      {
        art: "planetsMercury",
        text: "First he flew to Mercury. It was small, grey, and very close to the Sun."
      },
      {
        art: "planetsVenus",
        text: "Next he flew to Venus. Thick yellow clouds wrapped it up."
      },
      {
        art: "planetsEarth",
        text: "Then he flew past Earth. Blue sea, green land. That is our home."
      },
      {
        type: "question",
        kind: "recall",
        art: "planetsEarth",
        q: "Which planet is our home?",
        answer: "Earth.",
        hint: "The blue and green one."
      },
      {
        art: "planetsMars",
        text: "He flew to Mars. The ground was red and dusty."
      },
      {
        art: "planetsJupiter",
        text: "He flew to Jupiter. It was huge, the biggest planet of all.",
        word: { huge: "very, very big" }
      },
      {
        art: "planetsSaturn",
        text: "He flew to Saturn. Wide, flat rings went all the way around it."
      },
      {
        type: "question",
        kind: "recall",
        art: "planetsSaturn",
        q: "Which planet had wide rings around it?",
        answer: "Saturn.",
        hint: "The gold one after Jupiter."
      },
      {
        art: "planetsUranus",
        text: "He flew to Uranus. It was pale blue, and it spun on its side."
      },
      {
        art: "planetsNeptune",
        text: "He flew to Neptune. It was deep blue, cold, and far away."
      },
      {
        art: "planetsPluto",
        text: "Last, he flew to little Pluto. It is a dwarf planet, tiny and icy.",
        word: { dwarf: "much smaller than the others" }
      },
      {
        type: "predict",
        art: "planetsPluto",
        text: "He has seen all nine. What might he do now?",
        answer: "Fly back home toward the warm Sun.",
        hint: "Pluto is very cold and very far away."
      },
      {
        art: "planetsSun",
        text: "He had visited eight planets and one dwarf planet.",
        word: { planet: "a big round world that goes around the Sun" }
      },
      {
        type: "question",
        kind: "vocabulary",
        art: "planetsSun",
        q: "What does planet mean?",
        answer: "A big round world that goes around the Sun.",
        hint: "Think of Earth, Mars, and the others."
      },
      {
        type: "question",
        kind: "inference",
        art: "planetsNeptune",
        q: "Why was Neptune so cold?",
        answer: "It is very far from the Sun.",
        hint: "The Sun gives warmth. How far away was it?"
      },
      {
        type: "question",
        kind: "sequence",
        art: "planetsSun",
        q: "What came first — Mars, Mercury, or Saturn?",
        answer: "Mercury.",
        hint: "Start at the planet closest to the Sun."
      },
      {
        type: "question",
        kind: "feelings",
        art: "planetsPluto",
        q: "How do you think he felt so far from home?",
        answer: "Brave, a little lonely, curious — any feeling with a reason is good.",
        hint: "Ask why he thinks that."
      },
      {
        type: "retell",
        arts: ["planetsMercury", "planetsEarth", "planetsJupiter", "planetsPluto"],
        text: "Look at the pictures. Tell the trip in the right order.",
        answer: "Mercury, then Earth, then Jupiter, then Pluto.",
        hint: "He can point as he talks. Press A after he finishes."
      },
      {
        art: "planetsSun",
        text: "The little rocket flew back to the warm Sun and rested."
      }
    ]
  });
})();
