(function () {
  "use strict";

  var ART = window.ART;
  ART.nadineCover = "art/nadine-cover.jpg";
  ART.nadineBall = "art/nadine-ball.jpg";
  ART.nadineBlocks = "art/nadine-blocks.jpg";
  ART.nadineDucks = "art/nadine-ducks.jpg";
  ART.nadineBooks = "art/nadine-books.jpg";
  ART.nadinePots = "art/nadine-pots.jpg";
  ART.nadineEverywhere = "art/nadine-everywhere.jpg";
  ART.nadineNap = "art/nadine-nap.jpg";
  ART.nadineSteps = "art/nadine-steps.jpg";

  window.STORIES.push({
    id: "nadine-busy",
    title: "Nadine's Very Busy Week",
    level: 2,
    pages: [
      { art: "nadineCover", text: "Nadine's Very Busy Week." },
      {
        art: "nadineCover",
        text: "Nadine is Noah's baby sister. She could not walk yet. She could only crawl.",
        word: { crawl: "move on your hands and knees" }
      },
      {
        type: "predict",
        art: "nadineCover",
        text: "Nadine loves to crawl. Where do you think she will go this week?",
        answer: "To her toys, to everything! (Any thoughtful guess is good.)",
        hint: "What does a baby like to find?"
      },
      {
        art: "nadineBall",
        text: "On Monday she crawled to one soft ball. Roll, roll."
      },
      {
        art: "nadineBlocks",
        text: "On Tuesday she crawled to two wooden blocks. Bang, bang."
      },
      {
        art: "nadineDucks",
        text: "On Wednesday she found three yellow ducks in the bath. Splash, splash, splash."
      },
      {
        type: "question",
        kind: "recall",
        art: "nadineDucks",
        q: "What did Nadine find in the bath?",
        answer: "Three yellow ducks.",
        hint: "They float and go quack."
      },
      {
        art: "nadineBooks",
        text: "On Thursday she crawled to four picture books. Pat, pat, pat, pat."
      },
      {
        art: "nadinePots",
        text: "On Friday she found five shiny pots. Clang, clang, clang, clang, clang!"
      },
      {
        type: "predict",
        art: "nadinePots",
        text: "Each day she went to more things. What might happen on Saturday?",
        answer: "She crawls everywhere and gets very tired.",
        hint: "One, two, three, four, five... what comes next?"
      },
      {
        art: "nadineEverywhere",
        text: "On Saturday she crawled everywhere. Under the table, behind the sofa, and round and round the rug."
      },
      {
        type: "question",
        kind: "inference",
        art: "nadineEverywhere",
        q: "How do you think Nadine felt after crawling everywhere?",
        answer: "Very, very tired.",
        hint: "She went to more places than any other day."
      },
      {
        art: "nadineNap",
        text: "On Sunday Mama wrapped her in a soft blanket. Nadine had a long, long nap.",
        word: { wrapped: "covered all around" }
      },
      {
        type: "question",
        kind: "vocabulary",
        art: "nadineNap",
        q: "What does wrapped mean?",
        answer: "Covered all around.",
        hint: "Look at the blanket."
      },
      {
        art: "nadineSteps",
        text: "When she woke up, Nadine stood up. One step, two steps, three. She walked to Noah!"
      },
      {
        type: "question",
        kind: "sequence",
        art: "nadineCover",
        q: "What came first — the long nap, the ball, or the pots?",
        answer: "The ball.",
        hint: "It was on Monday."
      },
      {
        type: "question",
        kind: "feelings",
        art: "nadineSteps",
        q: "How do you think Noah felt when Nadine walked to him?",
        answer: "Happy, proud, surprised — any feeling with a reason is good.",
        hint: "Ask why he thinks that."
      },
      {
        type: "retell",
        arts: ["nadineBall", "nadineEverywhere", "nadineNap", "nadineSteps"],
        text: "Look at the pictures. Tell the story in the right order.",
        answer: "The ball, then crawling everywhere, then the nap, then her first steps.",
        hint: "He can point as he talks. Press A after he finishes."
      },
      {
        art: "nadineSteps",
        text: "Nadine was not a crawling baby any more. She was a walking girl."
      }
    ]
  });
})();
