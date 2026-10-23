(function () {
  "use strict";

  var ART = window.ART;
  ART.turnLine = "art/turn-line.jpg";
  ART.turnCount = "art/turn-count.jpg";
  ART.turnSlide = "art/turn-slide.jpg";
  ART.turnFriends = "art/turn-friends.jpg";

  window.STORIES.push({
    id: "noah-turn",
    title: "Noah Waits His Turn",
    level: 2,
    pages: [
      { art: "turnFriends", text: "Noah Waits His Turn." },
      {
        art: "turnLine",
        text: "Noah ran to the slide. A girl in a red coat was there first."
      },
      {
        type: "predict",
        art: "turnLine",
        text: "Noah wants to slide now. What do you think he will do?",
        answer: "Wait for his turn. (Any thoughtful guess is good.)",
        hint: "Who got there first?"
      },
      {
        art: "turnLine",
        text: "Noah wanted to go first. But it was her turn.",
        word: { turn: "the time when it is your go" }
      },
      {
        art: "turnCount",
        text: "So Noah waited. He counted on his fingers. One, two, three, four, five."
      },
      {
        type: "question",
        kind: "recall",
        art: "turnCount",
        q: "What did Noah do while he waited?",
        answer: "He counted on his fingers.",
        hint: "Look at his hands."
      },
      {
        art: "turnCount",
        text: "Whoosh! The girl slid down. Now it was Noah's turn."
      },
      {
        art: "turnSlide",
        text: "Noah climbed up and slid down. Whee!"
      },
      {
        type: "question",
        kind: "inference",
        art: "turnLine",
        q: "Why did Noah have to wait?",
        answer: "The girl was there first. It was her turn.",
        hint: "Who was on the slide?"
      },
      {
        type: "question",
        kind: "vocabulary",
        art: "turnCount",
        q: "What does turn mean?",
        answer: "The time when it is your go.",
        hint: "Whose go was it first?"
      },
      {
        type: "question",
        kind: "sequence",
        art: "turnSlide",
        q: "What came first — counting, or sliding?",
        answer: "Counting.",
        hint: "He waited, then he slid."
      },
      {
        type: "question",
        kind: "feelings",
        art: "turnFriends",
        q: "How do you think the girl felt when Noah waited?",
        answer: "Happy, safe, glad — any feeling with a reason is good.",
        hint: "Ask why he thinks that."
      },
      {
        art: "turnFriends",
        text: "The girl smiled at Noah. Waiting made a new friend."
      },
      {
        type: "retell",
        arts: ["turnLine", "turnCount", "turnSlide", "turnFriends"],
        text: "Look at the pictures. Tell the story in the right order.",
        answer: "The girl was first, Noah counted, Noah slid, they became friends.",
        hint: "He can point as he talks. Press A after he finishes."
      },
      {
        art: "turnFriends",
        text: "When it is not his turn yet, Noah waits and counts."
      }
    ]
  });
})();
