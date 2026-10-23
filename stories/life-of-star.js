(function () {
  "use strict";

  var ART = window.ART;
  ART.starCloud = "art/star-cloud.jpg";
  ART.starProto = "art/star-proto.jpg";
  ART.starYellow = "art/star-yellow.jpg";
  ART.starRed = "art/star-red.jpg";
  ART.starBoom = "art/star-boom.jpg";
  ART.starCore = "art/star-core.jpg";

  window.STORIES.push({
    id: "life-of-star",
    title: "The Life of a Star",
    level: 2,
    pages: [
      { art: "starCloud", text: "The Life of a Star." },
      {
        art: "starCloud",
        text: "Blippi, Terrence, and Biscuit Monster floated in dark space. A cold cloud of gas hung still."
      },
      {
        art: "starCloud",
        text: "Hydrogen dust pulled together. Gravity got stronger and stronger.",
        word: { gravity: "the pull that makes things fall together" }
      },
      {
        type: "predict",
        art: "starCloud",
        text: "The cloud is squeezing tight. What do you think it will become?",
        answer: "A star. (Any thoughtful guess is good.)",
        hint: "Look at the title."
      },
      {
        art: "starProto",
        text: "The gas balled up. The middle got hot. Ten thousand degrees. One hundred thousand degrees!"
      },
      {
        art: "starProto",
        text: "Ignition! A baby star turned on its light. Terrence clapped.",
        word: { ignition: "the moment a fire or a star starts" }
      },
      {
        art: "starYellow",
        text: "The yellow star burned clean fuel for a very long time. It pushed heat out. Gravity pulled in."
      },
      {
        art: "starYellow",
        text: "Push out. Pull in. Perfect balance. Blippi called it a happy star."
      },
      {
        type: "question",
        kind: "recall",
        art: "starYellow",
        q: "What colour was the star when it was in balance?",
        answer: "Yellow.",
        hint: "Think of our Sun."
      },
      {
        art: "starRed",
        text: "The hydrogen fuel ran low. The middle shrank. The outside swelled huge and red.",
        word: { swelled: "got bigger and bigger" }
      },
      {
        art: "starRed",
        text: "The red giant swallowed the nearest planets. Biscuit Monster hid behind Terrence."
      },
      {
        type: "predict",
        art: "starRed",
        text: "The fuel is almost gone. What might happen next?",
        answer: "The star will burst. A supernova.",
        hint: "Big stars do not go out quietly."
      },
      {
        art: "starBoom",
        text: "Core collapse! BOOM. The star blasted heavy metals into the galaxy.",
        word: { core: "the very middle" }
      },
      {
        type: "question",
        kind: "inference",
        art: "starBoom",
        q: "Why did the star boom?",
        answer: "Its fuel ran out and the middle fell in.",
        hint: "Think about the empty tank."
      },
      {
        art: "starCore",
        text: "All that remained was a tiny, dense neutron core, spinning in the dark."
      },
      {
        type: "question",
        kind: "vocabulary",
        art: "starCloud",
        q: "What does gravity mean?",
        answer: "The pull that makes things fall together.",
        hint: "It pulled the dust into a ball."
      },
      {
        type: "question",
        kind: "sequence",
        art: "starYellow",
        q: "What came first — the yellow star, the cloud, or the boom?",
        answer: "The cloud.",
        hint: "Stars start as cold gas."
      },
      {
        type: "question",
        kind: "feelings",
        art: "starCore",
        q: "How do you think Terrence felt at the end?",
        answer: "Quiet, amazed, a bit sad — any feeling with a reason is good.",
        hint: "Ask why he thinks that."
      },
      {
        type: "retell",
        arts: ["starCloud", "starYellow", "starRed", "starBoom"],
        text: "Look at the pictures. Tell the life of the star in the right order.",
        answer: "Cloud, then yellow star, then red giant, then boom.",
        hint: "He can point as he talks. Press A after he finishes."
      },
      {
        art: "starCore",
        text: "Blippi whispered, Five steps. Cloud, baby star, yellow star, red giant, boom."
      }
    ]
  });
})();
