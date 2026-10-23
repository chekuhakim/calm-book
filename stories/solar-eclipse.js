(function () {
  "use strict";

  var ART = window.ART;
  ART.eclipseCover = "art/eclipse-cover.jpg";
  ART.eclipseGlasses = "art/eclipse-glasses.jpg";
  ART.eclipseBite = "art/eclipse-bite.jpg";
  ART.eclipseDim = "art/eclipse-dim.jpg";
  ART.eclipseTotal = "art/eclipse-total.jpg";
  ART.eclipseHold = "art/eclipse-hold.jpg";
  ART.eclipseGold = "art/eclipse-gold.jpg";
  ART.eclipseBack = "art/eclipse-back.jpg";

  window.STORIES.push({
    id: "solar-eclipse",
    title: "Noah and the Solar Eclipse",
    level: 2,
    pages: [
      { art: "eclipseCover", text: "Noah and the Solar Eclipse." },
      {
        art: "eclipseCover",
        text: "Noah, baby sister Nadine, SpongeBob, Squidward, and Blippi sat on a quiet hill. The Sun was round and bright."
      },
      {
        art: "eclipseGlasses",
        text: "Blippi held up dark glasses. Never look at the Sun with bare eyes. Special glasses keep us safe.",
        word: { eclipse: "when the Moon hides the Sun for a little while" }
      },
      {
        type: "predict",
        art: "eclipseGlasses",
        text: "Something is going to slide in front of the Sun. What do you think it is?",
        answer: "The Moon. (Any thoughtful guess is good.)",
        hint: "It is the round neighbour that comes at night."
      },
      {
        art: "eclipseBite",
        text: "The Moon slid in. A little bite of the Sun was gone. SpongeBob whispered, Wow."
      },
      {
        art: "eclipseDim",
        text: "More and more of the Sun was covered. The hill went grey. Squidward said, It is getting dim."
      },
      {
        type: "question",
        kind: "recall",
        art: "eclipseGlasses",
        q: "Why did they wear special glasses?",
        answer: "So they would not look at the Sun with bare eyes.",
        hint: "The Sun is too bright."
      },
      {
        art: "eclipseTotal",
        text: "The Moon covered the Sun. A white ring shone around the black circle. That ring is the corona.",
        word: { corona: "the Sun's pale outer light, seen when the Moon hides the bright middle" }
      },
      {
        art: "eclipseHold",
        text: "Day felt like night. Nadine held Noah's hand. Nobody looked up without the glasses."
      },
      {
        type: "question",
        kind: "vocabulary",
        art: "eclipseTotal",
        q: "What is the corona?",
        answer: "The Sun's pale outer light, seen when the Moon hides the bright middle.",
        hint: "The white ring around the black circle."
      },
      {
        type: "predict",
        art: "eclipseTotal",
        text: "The Moon is still moving. What do you think will happen next?",
        answer: "The Sun will come back.",
        hint: "The Moon does not stay still."
      },
      {
        art: "eclipseGold",
        text: "A bead of gold popped out. The Sun was coming back. Blippi cheered."
      },
      {
        art: "eclipseBack",
        text: "Light poured over the hill. Birds called. Squidward took off his glasses and blinked."
      },
      {
        type: "question",
        kind: "inference",
        art: "eclipseDim",
        q: "Why did the hill go grey?",
        answer: "The Moon was covering the Sun, so less light reached them.",
        hint: "Where does daylight come from?"
      },
      {
        type: "question",
        kind: "sequence",
        art: "eclipseCover",
        q: "What came first — the white ring, the bright Sun, or the grey hill?",
        answer: "The bright Sun.",
        hint: "The story starts on a sunny hill."
      },
      {
        type: "question",
        kind: "feelings",
        art: "eclipseHold",
        q: "How do you think Noah felt when Nadine held his hand?",
        answer: "Brave, calm, proud — any feeling with a reason is good.",
        hint: "Ask why he thinks that."
      },
      {
        type: "retell",
        arts: ["eclipseCover", "eclipseBite", "eclipseTotal", "eclipseBack"],
        text: "Look at the pictures. Tell the eclipse in the right order.",
        answer: "Bright Sun, then a bite gone, then the white ring, then the light came back.",
        hint: "He can point as he talks. Press A after he finishes."
      },
      {
        art: "eclipseBack",
        text: "The Moon moved on. The Sun was round and bright again. Nadine clapped. The eclipse was done."
      }
    ]
  });
})();
