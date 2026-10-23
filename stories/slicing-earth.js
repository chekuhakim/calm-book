(function () {
  "use strict";

  var ART = window.ART;
  ART.earthCrust = "art/earth-crust.jpg";
  ART.earthUpper = "art/earth-upper.jpg";
  ART.earthLower = "art/earth-lower.jpg";
  ART.earthOuter = "art/earth-outer.jpg";
  ART.earthInner = "art/earth-inner.jpg";
  ART.earthCut = "art/earth-cut.jpg";

  window.STORIES.push({
    id: "slicing-earth",
    title: "Slicing Planet Earth",
    level: 2,
    pages: [
      { art: "earthCut", text: "Slicing Planet Earth." },
      {
        art: "earthCut",
        text: "Blippi held a clay Earth. Terrence said, Let us slice it. Biscuit Monster licked his lips. Not for eating!"
      },
      {
        art: "earthCrust",
        text: "Layer zero. The crust. We stand on cold, hard rock.",
        word: { crust: "the thin hard skin of the Earth" }
      },
      {
        art: "earthCrust",
        text: "Continents of granite. Oceans of deep blue water. The crust is thin, like the skin of an apple."
      },
      {
        type: "predict",
        art: "earthCrust",
        text: "If we drill down under the crust, what do you think we will find?",
        answer: "Hot rock. The mantle.",
        hint: "It gets hotter as you go down."
      },
      {
        art: "earthUpper",
        text: "Layer one. The upper mantle. Drill down. The rocks turn red-hot."
      },
      {
        art: "earthUpper",
        text: "Giant plates slide on soft, flowing stone. This is where magma sleeps.",
        word: { magma: "hot melted rock under the ground" }
      },
      {
        type: "question",
        kind: "recall",
        art: "earthCrust",
        q: "What is the thin outer layer called?",
        answer: "The crust.",
        hint: "Like the skin of an apple."
      },
      {
        art: "earthLower",
        text: "Layer two. The lower mantle. Crushing pressure! The rock cannot melt. Gravity squeezes it tight."
      },
      {
        art: "earthOuter",
        text: "Layer three. The outer core. A swirling sea of liquid iron and nickel.",
        word: { core: "the middle of the Earth" }
      },
      {
        art: "earthOuter",
        text: "It flows and churns. This moving metal builds Earth's magnetic shield. It blocks solar storms."
      },
      {
        type: "question",
        kind: "inference",
        art: "earthOuter",
        q: "Why does Earth need a magnetic shield?",
        answer: "To block solar storms from the Sun.",
        hint: "The liquid iron is doing a job."
      },
      {
        art: "earthInner",
        text: "Layer four. The inner core. Six thousand degrees. As hot as the surface of the Sun!"
      },
      {
        art: "earthInner",
        text: "A solid ball of white-hot iron, locked under billions of tons of weight. The heart of the world."
      },
      {
        type: "question",
        kind: "vocabulary",
        art: "earthUpper",
        q: "What is magma?",
        answer: "Hot melted rock under the ground.",
        hint: "It sleeps in the mantle."
      },
      {
        type: "question",
        kind: "sequence",
        art: "earthCut",
        q: "What comes first if you start on the outside — the inner core, the crust, or the outer core?",
        answer: "The crust.",
        hint: "Start at your feet."
      },
      {
        type: "question",
        kind: "feelings",
        art: "earthInner",
        q: "How do you think Biscuit Monster felt at the hot heart?",
        answer: "Awed, a bit scared, curious — any feeling with a reason is good.",
        hint: "Ask why he thinks that."
      },
      {
        type: "retell",
        arts: ["earthCrust", "earthUpper", "earthOuter", "earthInner"],
        text: "Look at the pictures. Tell the layers from the outside in.",
        answer: "Crust, then mantle, then outer core, then inner core.",
        hint: "Peel the Earth like an apple."
      },
      {
        art: "earthCut",
        text: "Terrence counted. Crust. Mantle. Outer core. Inner core. Four layers under our feet."
      }
    ]
  });
})();
