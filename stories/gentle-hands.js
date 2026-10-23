(function () {
  "use strict";

  var ART = window.ART;
  ART.noahPlay = "art/noah-play.jpg";
  ART.noahGrab = "art/noah-grab.jpg";
  ART.noahCross = "art/noah-cross.jpg";
  ART.noahBreathe = "art/noah-breathe.jpg";
  ART.noahMama = "art/noah-mama.jpg";
  ART.noahSwap = "art/noah-swap.jpg";
  ART.noahTogether = "art/noah-together.jpg";

  window.STORIES.push({
    id: "gentle-hands",
    title: "Noah's Gentle Hands",
    level: 2,
    pages: [
      {
        art: "noahTogether",
        text: "Noah's Gentle Hands."
      },
      {
        art: "noahPlay",
        text: "Noah sat at the table. He made a blue snail out of plasticine.",
        word: { plasticine: "soft clay you can squish and shape" }
      },
      {
        art: "noahGrab",
        text: "His baby sister crawled over. She grabbed his blue plasticine!"
      },
      {
        type: "predict",
        art: "noahGrab",
        text: "How do you think Noah feels?",
        answer: "Cross, or sad. (Any feeling with a reason is good.)",
        hint: "Look at his face."
      },
      {
        art: "noahCross",
        text: "Noah felt hot and cross. He wanted to push her away."
      },
      {
        art: "noahCross",
        text: "But Noah kept his hands to himself. Pushing can hurt a baby.",
        word: { hurt: "make someone feel pain" }
      },
      {
        type: "question",
        kind: "inference",
        art: "noahCross",
        q: "Why should Noah not push his baby sister?",
        answer: "Pushing can hurt her. She is little.",
        hint: "Think about how small she is."
      },
      {
        art: "noahBreathe",
        text: "He put a hand on his tummy. He took one slow, deep breath."
      },
      {
        art: "noahBreathe",
        text: "Then another. His body felt calm again.",
        word: { calm: "quiet and still inside" }
      },
      {
        type: "question",
        kind: "recall",
        art: "noahBreathe",
        q: "What did Noah do to feel calm?",
        answer: "He took slow, deep breaths.",
        hint: "Look where his hand is."
      },
      {
        art: "noahMama",
        text: "Noah used his words. \"Mama, she took my plasticine. Can you help?\""
      },
      {
        type: "predict",
        art: "noahMama",
        text: "What do you think Mama will do?",
        answer: "Help find something else for the baby.",
        hint: "Babies need safe toys."
      },
      {
        art: "noahSwap",
        text: "Mama gave the baby a soft rattle. Plasticine is not safe for babies."
      },
      {
        art: "noahSwap",
        text: "Noah got his blue plasticine back. He smiled."
      },
      {
        type: "question",
        kind: "vocabulary",
        art: "noahBreathe",
        q: "What does calm mean?",
        answer: "Quiet and still inside.",
        hint: "How did Noah feel after breathing?"
      },
      {
        type: "question",
        kind: "sequence",
        art: "noahMama",
        q: "What came first — the deep breath, or asking Mama?",
        answer: "The deep breath.",
        hint: "He got calm, then he used his words."
      },
      {
        type: "question",
        kind: "feelings",
        art: "noahTogether",
        q: "How do you think Noah felt at the end?",
        answer: "Happy, proud, calm — any feeling with a reason is good.",
        hint: "Ask why he thinks that."
      },
      {
        art: "noahTogether",
        text: "Noah made his snail. His sister shook her rattle. They played side by side."
      },
      {
        type: "retell",
        arts: ["noahGrab", "noahBreathe", "noahMama", "noahTogether"],
        text: "Look at the pictures. Tell the story in the right order.",
        answer: "The baby took the plasticine, Noah breathed, he asked Mama, then they played together.",
        hint: "He can point as he talks. Press A after he finishes."
      },
      {
        art: "noahTogether",
        text: "When Noah feels cross, he keeps gentle hands, takes a breath, and uses his words."
      }
    ]
  });
})();
