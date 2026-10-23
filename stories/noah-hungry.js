(function () {
  "use strict";

  var ART = window.ART;
  ART.hungryCover = "art/hungry-cover.jpg";
  ART.hungryBanana = "art/hungry-banana.jpg";
  ART.hungryCarrots = "art/hungry-carrots.jpg";
  ART.hungryMelon = "art/hungry-melon.jpg";
  ART.hungryStrawberries = "art/hungry-strawberries.jpg";
  ART.hungryTomatoes = "art/hungry-tomatoes.jpg";
  ART.hungryParty = "art/hungry-party.jpg";
  ART.hungryTummy = "art/hungry-tummy.jpg";
  ART.hungrySoup = "art/hungry-soup.jpg";
  ART.hungryTall = "art/hungry-tall.jpg";

  window.STORIES.push({
    id: "noah-hungry",
    title: "Noah's Very Hungry Week",
    level: 2,
    pages: [
      { art: "hungryCover", text: "Noah's Very Hungry Week." },
      {
        art: "hungryCover",
        text: "On Sunday night, Noah went to bed with an empty tummy."
      },
      {
        type: "predict",
        art: "hungryCover",
        text: "When Noah wakes up, how do you think his tummy will feel?",
        answer: "Hungry! (Any thoughtful guess is good.)",
        hint: "Look at the title if he wants a clue."
      },
      {
        art: "hungryBanana",
        text: "On Monday he woke up hungry. He ate one yellow banana."
      },
      {
        art: "hungryCarrots",
        text: "On Tuesday he ate two crunchy carrots.",
        word: { crunchy: "makes a loud crunch when you bite" }
      },
      {
        art: "hungryMelon",
        text: "On Wednesday he ate three slices of juicy watermelon."
      },
      {
        type: "question",
        kind: "recall",
        art: "hungryCarrots",
        q: "What did Noah eat on Tuesday?",
        answer: "Two crunchy carrots.",
        hint: "The orange ones."
      },
      {
        art: "hungryStrawberries",
        text: "On Thursday he ate four red strawberries."
      },
      {
        art: "hungryTomatoes",
        text: "On Friday he ate five little tomatoes. But he was still hungry."
      },
      {
        type: "predict",
        art: "hungryTomatoes",
        text: "On Saturday there is a party. What might Noah eat there?",
        answer: "Lots and lots of party food.",
        hint: "He has eaten more each day."
      },
      {
        art: "hungryParty",
        text: "On Saturday he ate cake, ice cream, sweets, chips, a cookie, and a big pink cupcake!"
      },
      {
        art: "hungryTummy",
        text: "That night, Noah had a tummy ache. Ouch."
      },
      {
        type: "question",
        kind: "inference",
        art: "hungryTummy",
        q: "Why did Noah's tummy hurt?",
        answer: "He ate too many sweet party foods.",
        hint: "Think about Saturday."
      },
      {
        art: "hungrySoup",
        text: "On Sunday he ate a warm bowl of soup with green peas. His tummy felt calm again.",
        word: { calm: "quiet and still" }
      },
      {
        type: "question",
        kind: "vocabulary",
        art: "hungrySoup",
        q: "What does calm mean?",
        answer: "Quiet and still.",
        hint: "How did his tummy feel after the soup?"
      },
      {
        art: "hungryTall",
        text: "Mama measured him on the wall. Noah had grown taller!",
        word: { measured: "found out how big something is" }
      },
      {
        type: "question",
        kind: "sequence",
        art: "hungryCover",
        q: "What came first — the soup, the banana, or the party?",
        answer: "The banana.",
        hint: "It was on Monday."
      },
      {
        type: "question",
        kind: "feelings",
        art: "hungryTall",
        q: "How do you think Noah felt when he saw how tall he was?",
        answer: "Proud, surprised, happy — any feeling with a reason is good.",
        hint: "Ask why he thinks that."
      },
      {
        type: "retell",
        arts: ["hungryBanana", "hungryParty", "hungryTummy", "hungryTall"],
        text: "Look at the pictures. Tell the story in the right order.",
        answer: "The banana, then the party, then the tummy ache, then Noah grew taller.",
        hint: "He can point as he talks. Press A after he finishes."
      },
      {
        art: "hungryTall",
        text: "Noah was not a little boy any more. He was a big, strong brother."
      }
    ]
  });
})();
