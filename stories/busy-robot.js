(function () {
  "use strict";

  var ART = window.ART;
  ART.botCover = "art/robot.jpg";
  ART.botWorkshop = "art/robot-box.jpg";
  ART.botListen = "art/robot.jpg";
  ART.botRoll = "art/robot.jpg";
  ART.botBattery = "art/robot-battery.jpg";
  ART.botGears = "art/robot-gears.jpg";
  ART.botSprings = "art/robot-springs.jpg";
  ART.botBolts = "art/robot-bolts.jpg";
  ART.botWires = "art/robot-wires.jpg";
  ART.botScrap = "art/robot-scrap.jpg";
  ART.botStuck = "art/robot-scrap.jpg";
  ART.botOil = "art/robot-oil.jpg";
  ART.botPod = "art/robot-pod.jpg";
  ART.botSwoosh = "art/robot-hover.jpg";
  ART.botHover = "art/robot-hover.jpg";

  window.STORIES.push({
    id: "busy-robot",
    title: "The Very Busy Little Robot",
    level: 2,
    pages: [
      {
        art: "botCover",
        text: "The Very Busy Little Robot."
      },
      {
        art: "botWorkshop",
        text: "In the quiet workshop, a little green light blinked on. Beep.",
        word: { quiet: "not loud" }
      },
      {
        type: "predict",
        art: "botWorkshop",
        text: "What do you think will roll out of the box?",
        answer: "A little robot. (Any thoughtful guess is good.)",
        hint: "Look back at the title if he wants a clue."
      },
      {
        art: "botRoll",
        text: "Out rolled a tiny grey robot. His battery blinked low, and he was hungry for parts."
      },
      {
        art: "botBattery",
        text: "On Monday he found one shiny red battery. Click! But his engine was still hungry."
      },
      {
        art: "botGears",
        text: "On Tuesday he found two spinning blue gears. Whir, whir!",
        word: { spinning: "turning around and around" }
      },
      {
        art: "botSprings",
        text: "On Wednesday he found three bouncy yellow springs. Boing, boing, boing!"
      },
      {
        type: "question",
        kind: "recall",
        art: "botGears",
        q: "What did the robot find on Tuesday?",
        answer: "Two blue gears.",
        hint: "They went whir, whir."
      },
      {
        art: "botBolts",
        text: "On Thursday he found four twisting green bolts. Squeak, squeak, squeak, squeak!"
      },
      {
        art: "botWires",
        text: "On Friday he found five glowing purple wires. Zap, zap, zap, zap, zap!",
        word: { glowing: "shining with light" }
      },
      {
        type: "predict",
        art: "botListen",
        text: "He is still hungry. What might he do on Saturday?",
        answer: "Look for even more parts. Tomorrow is the scrap pile.",
        hint: "He has found more each day."
      },
      {
        art: "botScrap",
        text: "On Saturday he attached one magnet, two sirens, three tracks, four antennas, and five bells."
      },
      {
        art: "botStuck",
        text: "Bzzzt! He was too heavy, too loud, and too bright. He had a system overload.",
        word: { overload: "too much at once" }
      },
      {
        type: "question",
        kind: "vocabulary",
        art: "botStuck",
        q: "What does overload mean?",
        answer: "Too much at once.",
        hint: "Think of all the Saturday parts."
      },
      {
        type: "question",
        kind: "inference",
        art: "botStuck",
        q: "Why couldn't the robot move?",
        answer: "The extra parts made him too heavy, too loud, and too bright.",
        hint: "Think about the scrap pile."
      },
      {
        art: "botOil",
        text: "On Sunday he unhooked the extra parts and took a long drink from one golden oil can."
      },
      {
        art: "botPod",
        text: "He rolled into his charging pod for three quiet days, and his new parts began to fuse.",
        word: { fuse: "join and become one" }
      },
      {
        art: "botSwoosh",
        text: "Then he powered on and pushed the doors open. Swoosh!"
      },
      {
        art: "botHover",
        text: "He was not a clunky grey robot any more. He was a zooming, rainbow hover-bot.",
        word: { clunky: "heavy and awkward" }
      },
      {
        type: "question",
        kind: "sequence",
        art: "botListen",
        q: "What came first — the oil can, the red battery, or the hover-bot?",
        answer: "The red battery.",
        hint: "Monday comes before Sunday."
      },
      {
        type: "question",
        kind: "feelings",
        art: "botHover",
        q: "How do you think he felt when he flew?",
        answer: "Light, glad, proud — any feeling with a reason is good.",
        hint: "Ask why he thinks that."
      },
      {
        art: "botHover",
        text: "He was not a hungry little robot any more. He had learned when enough was enough."
      },
      {
        type: "retell",
        arts: ["botRoll", "botScrap", "botOil", "botHover"],
        text: "Look at the pictures. Tell the story in the right order.",
        answer: "The tiny robot, then the scrap pile, then the oil can, then the hover-bot.",
        hint: "He can point as he talks. Press A after he finishes."
      },
      {
        art: "botHover",
        text: "The hover-bot zoomed away, light, and glad."
      }
    ]
  });
})();
