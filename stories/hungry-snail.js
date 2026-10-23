(function () {
  "use strict";

  var ART = window.ART;
  ART.cover = "art/cover.jpg";
  ART.egg = "art/egg.jpg";
  ART.hatch = "art/hatch.jpg";
  ART.strawberry = "art/strawberry.jpg";
  ART.blueberries = "art/blueberries.jpg";
  ART.mushrooms = "art/mushrooms.jpg";
  ART.peas = "art/peas.jpg";
  ART.raspberries = "art/raspberries.jpg";
  ART.feast = "art/feast.jpg";
  ART.tummy = "art/tummy.jpg";
  ART.dew = "art/dew.jpg";
  ART.spiral = "art/spiral.jpg";
  ART.home = "art/home.jpg";
  ART.listen = "art/listen.jpg";

  window.STORIES.push({
    id: "hungry-snail",
    title: "The Very Hungry Snail",
    level: 2,
    pages: [
      { art: "cover", text: "The Very Hungry Snail." },
      {
        art: "egg",
        text: "On Sunday morning, a tiny egg sat on a quiet leaf.",
        word: { quiet: "not loud" }
      },
      {
        type: "predict",
        art: "listen",
        text: "What do you think will hatch from the egg?",
        answer: "A snail. (Any thoughtful guess is good.)",
        hint: "Look back at the title if he wants a clue."
      },
      {
        art: "hatch",
        text: "On Monday the egg cracked. Out came a snail no bigger than a pea."
      },
      {
        art: "strawberry",
        text: "He was hungry. On Monday he ate one sweet strawberry."
      },
      {
        art: "blueberries",
        text: "On Tuesday he ate two plump blueberries.",
        word: { plump: "round and full" }
      },
      {
        art: "mushrooms",
        text: "On Wednesday he ate three soft mushrooms."
      },
      {
        type: "question",
        kind: "recall",
        art: "listen",
        q: "What did the snail eat on Tuesday?",
        answer: "Two blueberries.",
        hint: "The blue ones."
      },
      {
        art: "peas",
        text: "On Thursday he ate four round peas."
      },
      {
        art: "raspberries",
        text: "On Friday he ate five ripe raspberries."
      },
      {
        type: "predict",
        art: "listen",
        text: "He is still hungry. What might he do on Saturday?",
        answer: "Eat even more. Tomorrow is the feast.",
        hint: "He has eaten more each day."
      },
      {
        art: "feast",
        text: "On Saturday he ate an enormous feast: a leaf, a plum, a bean, and a whole cucumber.",
        word: { enormous: "very, very big" }
      },
      {
        type: "question",
        kind: "vocabulary",
        art: "feast",
        q: "What does enormous mean?",
        answer: "Very, very big.",
        hint: "Think of the size of the feast."
      },
      {
        art: "tummy",
        text: "That night his tummy ached. He had eaten far too much."
      },
      {
        type: "question",
        kind: "inference",
        art: "tummy",
        q: "Why did his tummy hurt?",
        answer: "Because he ate too much at the feast.",
        hint: "Think about Saturday."
      },
      {
        art: "dew",
        text: "On Sunday he rested on a cool stone and sipped a drop of dew."
      },
      {
        art: "spiral",
        text: "After a long rest he felt better. His shell had grown into a beautiful spiral.",
        word: { spiral: "a line that curls around and around" }
      },
      {
        type: "question",
        kind: "sequence",
        art: "listen",
        q: "What came first — the feast, the egg, or the spiral shell?",
        answer: "The egg.",
        hint: "The story starts on a leaf."
      },
      {
        type: "question",
        kind: "feelings",
        art: "spiral",
        q: "How do you think the snail felt when his shell grew?",
        answer: "Proud, glad, surprised — any feeling with a reason is good.",
        hint: "Ask why he thinks that."
      },
      {
        art: "home",
        text: "He was not a tiny snail any more. He had learned to listen to his tummy."
      },
      {
        type: "retell",
        arts: ["egg", "feast", "tummy", "spiral"],
        text: "Look at the pictures. Tell the story in the right order.",
        answer: "Egg, then the feast, then the sore tummy, then the spiral shell.",
        hint: "He can point as he talks. Press A after he finishes."
      },
      {
        art: "home",
        text: "The snail slid slowly home, full, and glad."
      }
    ]
  });
})();
