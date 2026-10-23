(function () {
  "use strict";

  var ART = window.ART;
  ART.lavaCrack = "art/lava-crack.jpg";
  ART.lavaRise = "art/lava-rise.jpg";
  ART.lavaSteam = "art/lava-steam.jpg";
  ART.lavaPile = "art/lava-pile.jpg";
  ART.lavaBreach = "art/lava-breach.jpg";
  ART.lavaIsland = "art/lava-island.jpg";
  ART.lavaLife = "art/lava-life.jpg";

  window.STORIES.push({
    id: "lava-island",
    title: "How Lava Builds an Island",
    level: 2,
    pages: [
      { art: "lavaCrack", text: "How Lava Builds an Island." },
      {
        art: "lavaCrack",
        text: "Deep under the ocean, Blippi, Terrence, and Biscuit Monster watched the seabed."
      },
      {
        art: "lavaCrack",
        text: "Tectonic plates pulled apart. A crack opened. Pressure built.",
        word: { plates: "giant pieces of Earth's crust that move" }
      },
      {
        type: "predict",
        art: "lavaCrack",
        text: "A crack is open in the seabed. What do you think will come out?",
        answer: "Hot melted rock. Magma.",
        hint: "It is very hot down there."
      },
      {
        art: "lavaRise",
        text: "Super-hot liquid rock escaped the mantle. Magma rose. It burst into the freezing ocean.",
        word: { magma: "hot melted rock under the ground" }
      },
      {
        art: "lavaSteam",
        text: "Sssss! Cold water met molten rock. Giant black pillow basalt formed under the sea."
      },
      {
        type: "question",
        kind: "recall",
        art: "lavaSteam",
        q: "What sound did the water make when it met the hot rock?",
        answer: "Sssss!",
        hint: "Like a kettle."
      },
      {
        art: "lavaPile",
        text: "Eruption after eruption, the underwater mountain grew taller. Thousands of years."
      },
      {
        type: "predict",
        art: "lavaPile",
        text: "The mountain keeps growing. What might happen when it reaches the waves?",
        answer: "It will break through the surface.",
        hint: "Islands start under the sea."
      },
      {
        art: "lavaBreach",
        text: "The rock broke through the waves. Clouds of steam shot into the sky. Terrence covered his ears."
      },
      {
        art: "lavaIsland",
        text: "The black lava cooled into hard basalt. Waves smashed against the new cliffs.",
        word: { basalt: "hard black rock made from cooled lava" }
      },
      {
        type: "question",
        kind: "inference",
        art: "lavaIsland",
        q: "Why did the lava turn hard?",
        answer: "The cold air and water cooled it.",
        hint: "Hot things go hard when they cool."
      },
      {
        art: "lavaLife",
        text: "The volcanic soil cooled. Green seeds arrived on the wind. An island was born."
      },
      {
        art: "lavaLife",
        text: "Biscuit Monster sniffed a leaf. Blippi said, From a crack in the floor to a home for plants."
      },
      {
        type: "question",
        kind: "vocabulary",
        art: "lavaRise",
        q: "What is magma?",
        answer: "Hot melted rock under the ground.",
        hint: "It rose through the crack."
      },
      {
        type: "question",
        kind: "sequence",
        art: "lavaCrack",
        q: "What came first — the green seeds, the crack, or the steam in the sky?",
        answer: "The crack.",
        hint: "The story starts on the seabed."
      },
      {
        type: "question",
        kind: "feelings",
        art: "lavaLife",
        q: "How do you think they felt when the green seeds grew?",
        answer: "Glad, surprised, proud — any feeling with a reason is good.",
        hint: "Ask why he thinks that."
      },
      {
        type: "retell",
        arts: ["lavaCrack", "lavaSteam", "lavaBreach", "lavaLife"],
        text: "Look at the pictures. Tell how the island was built.",
        answer: "Crack, then steam rock, then the island broke the waves, then plants grew.",
        hint: "He can point as he talks. Press A after he finishes."
      },
      {
        art: "lavaLife",
        text: "Crack. Rise. Steam. Pile. Breach. Cool. Life. That is how lava builds an island."
      }
    ]
  });
})();
