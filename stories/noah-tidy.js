(function () {
  "use strict";

  var ART = window.ART;
  ART.tidyMess = "art/tidy-mess.jpg";
  ART.tidyBasket = "art/tidy-basket.jpg";
  ART.tidyHelp = "art/tidy-help.jpg";
  ART.tidyDone = "art/tidy-done.jpg";

  window.STORIES.push({
    id: "noah-tidy",
    title: "Noah Tidies Up",
    level: 2,
    pages: [
      { art: "tidyDone", text: "Noah Tidies Up." },
      {
        art: "tidyMess",
        text: "Blocks, cars, and crayons were all over the rug. What a mess!"
      },
      {
        art: "tidyMess",
        text: "Noah did not want to tidy. It looked like too much.",
        word: { tidy: "put things back where they go" }
      },
      {
        type: "predict",
        art: "tidyMess",
        text: "How could Noah make the big job feel smaller?",
        answer: "Do one kind of toy at a time. (Any helpful idea is good.)",
        hint: "Start with one thing."
      },
      {
        art: "tidyBasket",
        text: "So Noah started small. First, just the blocks. Clunk, clunk, into the basket."
      },
      {
        type: "question",
        kind: "recall",
        art: "tidyBasket",
        q: "What did Noah put away first?",
        answer: "The blocks.",
        hint: "Look in the basket."
      },
      {
        art: "tidyHelp",
        text: "Baby sister wanted to help. She dropped in a soft toy. Plop!"
      },
      {
        art: "tidyDone",
        text: "Soon the rug was clean. Noah felt proud.",
        word: { proud: "happy about something you did" }
      },
      {
        type: "question",
        kind: "vocabulary",
        art: "tidyDone",
        q: "What does proud mean?",
        answer: "Happy about something you did.",
        hint: "How did Noah feel at the end?"
      },
      {
        type: "question",
        kind: "inference",
        art: "tidyBasket",
        q: "Why did starting with just the blocks help?",
        answer: "One small job felt easier than the whole mess.",
        hint: "Was it too much at first?"
      },
      {
        type: "question",
        kind: "sequence",
        art: "tidyHelp",
        q: "What came first — the blocks, or sister's soft toy?",
        answer: "The blocks.",
        hint: "Noah started first."
      },
      {
        type: "retell",
        arts: ["tidyMess", "tidyBasket", "tidyHelp", "tidyDone"],
        text: "Look at the pictures. Tell the story in the right order.",
        answer: "The mess, the blocks, sister helped, all clean.",
        hint: "He can point as he talks. Press A after he finishes."
      },
      {
        art: "tidyDone",
        text: "A big job is easy when you do one small part at a time."
      }
    ]
  });
})();
