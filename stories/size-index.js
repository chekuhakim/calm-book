(function () {
  "use strict";

  var ART = window.ART;
  ART.sizeCover = "art/size-cover.jpg";
  ART.sizeRocky = "art/size-rocky.jpg";
  ART.sizeIce = "art/size-ice.jpg";
  ART.sizeGas = "art/size-gas.jpg";
  ART.planetsMercury = ART.planetsMercury || "art/planets-mercury.jpg";
  ART.planetsMars = ART.planetsMars || "art/planets-mars.jpg";
  ART.planetsVenus = ART.planetsVenus || "art/planets-venus.jpg";
  ART.planetsEarth = ART.planetsEarth || "art/planets-earth.jpg";
  ART.planetsNeptune = ART.planetsNeptune || "art/planets-neptune.jpg";
  ART.planetsUranus = ART.planetsUranus || "art/planets-uranus.jpg";
  ART.planetsSaturn = ART.planetsSaturn || "art/planets-saturn.jpg";
  ART.planetsJupiter = ART.planetsJupiter || "art/planets-jupiter.jpg";

  window.STORIES.push({
    id: "size-index",
    title: "The Great Planetary Size Index",
    level: 2,
    pages: [
      { art: "sizeCover", text: "The Great Planetary Size Index." },
      {
        art: "sizeCover",
        text: "Blippi, Terrence, and Biscuit Monster lined up the planets by size. Smallest to biggest."
      },
      {
        type: "predict",
        art: "sizeCover",
        text: "Which planet do you think is the smallest?",
        answer: "Mercury.",
        hint: "It is closest to the Sun, and tiny."
      },
      {
        art: "sizeRocky",
        text: "Category A. The Rocky Scouts. Small and solid."
      },
      {
        art: "planetsMercury",
        text: "Mercury. Four thousand eight hundred seventy-nine kilometers across. A pocket-sized rock. Zero air."
      },
      {
        art: "planetsMars",
        text: "Mars. Six thousand seven hundred seventy-nine kilometers. Red dust. Two tiny moons."
      },
      {
        art: "planetsVenus",
        text: "Venus. Twelve thousand one hundred four kilometers. Heavy yellow clouds. A runaway hot oven."
      },
      {
        art: "planetsEarth",
        text: "Earth. Twelve thousand seven hundred forty-two kilometers. Liquid water. Nitrogen air. Life confirmed.",
        word: { confirmed: "checked and found to be true" }
      },
      {
        type: "question",
        kind: "recall",
        art: "planetsMercury",
        q: "Which rocky planet has zero air?",
        answer: "Mercury.",
        hint: "The smallest one."
      },
      {
        art: "sizeIce",
        text: "Category B. The Ice Giants. Frozen gas and water."
      },
      {
        art: "planetsNeptune",
        text: "Neptune. Forty-nine thousand two hundred forty-four kilometers. Methane blue. Super-fast wind storms."
      },
      {
        art: "planetsUranus",
        text: "Uranus. Fifty thousand seven hundred twenty-four kilometers. A cyan ice ball. Tilted on its side."
      },
      {
        type: "question",
        kind: "inference",
        art: "sizeIce",
        q: "Why are Neptune and Uranus called ice giants?",
        answer: "They are big, cold, and made of frozen gas and water.",
        hint: "Look at their colour and size."
      },
      {
        art: "sizeGas",
        text: "Category C. The Gas Titans. Massive and made of spinning gas."
      },
      {
        art: "planetsSaturn",
        text: "Saturn. One hundred sixteen thousand four hundred sixty kilometers. Light hydrogen. Wide ice rings."
      },
      {
        art: "planetsJupiter",
        text: "Jupiter. One hundred thirty-nine thousand eight hundred twenty kilometers. The king. Ninety-five moons. A giant red storm.",
        word: { giant: "very, very big" }
      },
      {
        type: "question",
        kind: "vocabulary",
        art: "planetsJupiter",
        q: "What does giant mean?",
        answer: "Very, very big.",
        hint: "Jupiter is the king of size."
      },
      {
        type: "question",
        kind: "sequence",
        art: "sizeCover",
        q: "What is smallest to biggest — Jupiter, Mercury, or Earth?",
        answer: "Mercury, then Earth, then Jupiter.",
        hint: "Start with the rocky scout."
      },
      {
        type: "question",
        kind: "feelings",
        art: "planetsJupiter",
        q: "How do you think Biscuit Monster felt next to giant Jupiter?",
        answer: "Tiny, amazed, excited — any feeling with a reason is good.",
        hint: "Ask why he thinks that."
      },
      {
        type: "retell",
        arts: ["planetsMercury", "planetsEarth", "planetsUranus", "planetsJupiter"],
        text: "Look at the pictures. Sort them from smallest to biggest.",
        answer: "Mercury, then Earth, then Uranus, then Jupiter.",
        hint: "Rocky, then ice, then gas titan."
      },
      {
        art: "sizeCover",
        text: "Terrence tapped the list. Rocky scouts. Ice giants. Gas titans. Size is a kind of map."
      }
    ]
  });
})();
