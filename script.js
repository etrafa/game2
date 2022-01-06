"using strict";

const playButtonEl = document.querySelector(".hexagon-shape");
const menuContainerEl = document.querySelector(".menu-container");
const spinnerContainerEl = document.querySelector(".spinner-container");
const spinnerButtonEl = document.querySelector(".spinner-button");
const spinnerWheelEl = document.querySelector(".spinner-wheel");
const spinWheelTextEl = document.querySelector(".spin-wheel-text");
const buttonContainerEl = document.querySelector(".question-options");
let questionType;

const spinWheelDegrees = [
  { degree: 25, questionType: "science", category: 17 },
  { degree: 75, questionType: "movie", category: 11 },
  { degree: 125, questionType: "geography", category: 22 },
  { degree: 175, questionType: "history", category: 23 },
  { degree: 225, questionType: "art", category: 25 },
  { degree: 280, questionType: "sports", category: 21 },
  { degree: 340, questionType: "random", category: 20 },
];
let randomNumber;

const backgroundType = () => {
  if (questionType === "science") {
    questionTypeContainer.style.backgroundColor = "#5CB85C";
  } else if (questionType === "movie") {
    questionTypeContainer.style.backgroundColor = "#B94AA2";
  } else if (questionType === "geography") {
    questionTypeContainer.style.backgroundColor = "#3B9AC7";
  } else if (questionType === "history") {
    questionTypeContainer.style.backgroundColor = "#F0AD4E";
  } else if (questionType === "art") {
    questionTypeContainer.style.backgroundColor = "#D9534F";
  } else if (questionType === "sports") {
    questionTypeContainer.style.backgroundColor = "#DF691A";
  } else if (questionType === "randomly") {
    questionTypeContainer.style.backgroundColor = "#684399";
  }
};

spinnerButtonEl.addEventListener("click", () => {
  randomNumber = Math.trunc(Math.random() * 7);
  spinWheelTextEl.textContent = "We're choosing a question for you...";
  spinnerWheelEl.style.transform = `rotate(${spinWheelDegrees[randomNumber].degree}deg)`;
  setTimeout(() => {
    spinWheelTextEl.textContent = `You will be asked ${spinWheelDegrees[randomNumber].questionType} question.`;
    questionType = spinWheelDegrees[randomNumber].questionType;
    console.log(questionType);
  }, 2000);
  setTimeout(() => {
    spinWheelTextEl.textContent = "Get Ready...";
  }, 4000);
  setTimeout(() => {
    spinnerContainerEl.style.display = "none";
    questionContainer.style.display = "block";
    fetchHistoryQuestion(spinWheelDegrees[randomNumber].category);
  }, 9000);
  console.log(randomNumber);
});

//SELECTION QUESTION SECTION HTML ELEMENTS//
const questionTypeContainer = document.querySelector(".question-type");
const questionTypeTextEl = document.querySelector(".question-type-text");
const questionTextEl = document.querySelector(".question-text");
const firstOptionEl = document.querySelector(".first-option");
const secondOptionEl = document.querySelector(".second-option");
const thirdOptionEl = document.querySelector(".third-option");
const fourthOptionEl = document.querySelector(".fourth-option");

let correctAnswer;

const fetchHistoryQuestion = (category) => {
  fetch(
    `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`
  ).then((response) =>
    response.json().then((data) => {
      console.log(data);
      let randomQuestionNumber = Math.trunc(Math.random() * 10 + 1);
      questionTypeTextEl.textContent = questionType.toUpperCase();
      questionTextEl.textContent = data.results[randomQuestionNumber].question;
      const questionAnwsers = [
        data.results[randomQuestionNumber].correct_answer,
        data.results[randomQuestionNumber].incorrect_answers,
      ]
        .flat()
        .sort(() => Math.random() - 0.5);
      correctAnswer = data.results[randomQuestionNumber].correct_answer;
      firstOptionEl.textContent = questionAnwsers[0];
      secondOptionEl.textContent = questionAnwsers[1];
      thirdOptionEl.textContent = questionAnwsers[2];
      fourthOptionEl.textContent = questionAnwsers[3];
      backgroundType();
    })
  );
};

const answerCheckerText = document.querySelector(".answer-checker-text");
const nextQuestionButton = document.querySelector(".next-question-button");
const questionContainer = document.querySelector(".question-container");
answerCheckerText.style.display = "none";
nextQuestionButton.style.display = "none";

questionContainer.style.display = "none";

const correctAnswerChecker = (target) => {
  if (target === correctAnswer) {
    console.log("correct");
    questionTextEl.style.display = "none";
    answerCheckerText.style.display = "block";
    nextQuestionButton.style.display = "block";
    setTimeout(() => {
      buttonContainerEl.style.display = "none";
    }, 2000);
  } else {
    console.log("incorrect");
    questionTextEl.style.display = "none";
    answerCheckerText.textContent = "WRONG";
    answerCheckerText.style.color = "#ff0000";
    answerCheckerText.style.display = "block";
    nextQuestionButton.style.display = "block";
    setTimeout(() => {
      buttonContainerEl.style.display = "none";
    }, 2000);
  }
};

firstOptionEl.addEventListener("click", () => {
  correctAnswerChecker(firstOptionEl.innerHTML);
});
secondOptionEl.addEventListener("click", () => {
  correctAnswerChecker(secondOptionEl.innerHTML);
});
thirdOptionEl.addEventListener("click", () => {
  correctAnswerChecker(thirdOptionEl.innerHTML);
});
fourthOptionEl.addEventListener("click", () => {
  correctAnswerChecker(fourthOptionEl.innerHTML);
});

nextQuestionButton.addEventListener("click", () => {});
