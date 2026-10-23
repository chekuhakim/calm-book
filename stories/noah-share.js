(function () {
  "use strict";

  var ART = window.ART;
  ART.shareSnack = "art/share-snack.jpg";
  ART.shareLook = "art/share-look.jpg";
  ART.shareGive = "art/share-give.jpg";
  ART.shareEat = "art/share-eat.jpg";

  window.STORIES.push({
    id: "noah-share",
    title: "Noah Shares His Snack",
    level: 2,
    pages: [
      { art: "shareEat", text: "Noah Shares His Snack." },
      {
        art: "shareSnack",
        text: "Noah had a bowl of soft banana slices. Yum!"
      },
      {
        art: "shareLook",
        text: "Baby sister sat in her high chair. She reached for the bowl."
      },
      {
        type: "predict",
        art: "shareLook",
        text: "Baby sister wants some banana. What could Noah do?",
        answer: "Share some with her. (Any kind idea is good.)",
        hint: "There are lots of slices."
      },
      {
        art: "shareGive",
        text: "Noah gave her one slice. Then another. He shared.",
        word: { shared: "gave some to someone else" }
      },
      {
        type: "question",
        kind: "recall",
        art: "shareGive",
        q: "What did Noah share?",
        answer: "Banana slices.",
        hint: "Look in the bowl."
      },
      {
        art: "shareGive",
        text: "Mama smiled. \"That was kind, Noah.\""
      },
      {
        art: "shareEat",
        text: "Noah and his sister ate their snack together."
      },
      {
        type: "question",
        kind: "vocabulary",
        art: "shareGive",
        q: "What does shared mean?",
        answer: "Gave some to someone else.",
        hint: "What did Noah do with the bananas?"
      },
      {
        type: "question",
        kind: "inference",
        art: "shareEat",
        q: "Why did Noah still have a snack after sharing?",
        answer: "He only gave some away. There were lots of slices.",
        hint: "Did he give her the whole bowl?"
      },
      {
        type: "question",
        kind: "feelings",
        art: "shareEat",
        q: "How did baby sister feel?",
        answer: "Happy, full, glad — any feeling with a reason is good.",
        hint: "Look at her face."
      },
      {
        type: "retell",
        arts: ["shareSnack", "shareLook", "shareGive", "shareEat"],
        text: "Look at the pictures. Tell the story in the right order.",
        answer: "Noah's snack, sister reached, Noah shared, they ate together.",
        hint: "He can point as he talks. Press A after he finishes."
      },
      {
        art: "shareEat",
        text: "Sharing made two happy tummies."
      }
    ]
  });
})();
