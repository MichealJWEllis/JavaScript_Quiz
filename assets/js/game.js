const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const SCORE_POINTS = 100;
const MAX_QUES = 5;
const scoreText = document.querySelector("#score");
const timer_h1 = document.getElementById('countdown');
let currQuest = {};
let takingAnswers = true;
let score = 0;
let timeLeft = 59;
let questCount = 0;
let currQuestion = [];


// Question to be randomized
let questions = [
  {
    question: "What is the HTML tag under which one can write the JavaScript code?",
    choice1: "<javascript></javascript>",
    choice2: "<script></script>",
    choice3: "<js></js>",
    choice4: "<scripts></scripts>",
    answer: 2,
  },
  {
    question: "Which of the following is the correct syntax to display “GeeksforGeeks” in an alert box using JavaScript?",
    choice1: "alertbox(“GeeksforGeeks”);",
    choice2: "msg(“GeeksforGeeks”);",
    choice3: "msgbox(“GeeksforGeeks”);",
    choice4: "alert(“GeeksforGeeks”);",
    answer: 4,
  },
  {
    question: "What is the correct file extension for Javascript files?",
    choice1: ".java",
    choice2: ".js",
    choice3: ".javacript",
    choice4: ".script",
    answer: 2,
  },
  {
    question: "JavaScript is ________ language?",
    choice1: "an interpreted",
    choice2: "a compiled ",
    choice3: "translated",
    choice4: "None of the above",
    answer: 1,
  },
  {
    question: 'What is the difference between "==" and "==="?',
    choice1: "Both B & C",
    choice2: "Both operators are the same",
    choice3: '"==" checks only for equality in value whereas "===" is a stricter equality test',
    choice4: "None of the above",
    answer: 3,
  }
];

function getGame() {
  questCount = 0;
  score = 0;
  currQuestion = [...questions];
  getNewQuestion();
  countDown();
};

function countDown() {
  var timeInterval = setInterval(function () {

    if (timeLeft > 1) {
      timer_h1.innerHTML = ':' + timeLeft;
      timeLeft--;
    } else {
      timer_h1.innerHTML = '0:00';
      clearInterval(timeInterval);
      return window.location.assign("../endpage/end.html")
    }
  }, 1000)

}

function getNewQuestion() {
  if (currQuestion.length === 0 || questCount > MAX_QUES) {
    localStorage.setItem('mostRecentScore', score)
    return window.location.assign("../endpage/end.html")
  }
  questCount++

  const randomQues = Math.floor(Math.random() * currQuestion.length)
  currQuest = currQuestion[randomQues]
  question.innerText = currQuest.question

  choices.forEach(choice => {
    const num = choice.dataset['number']
    choice.innerText = currQuest['choice' + num]
  })

  currQuestion.splice(randomQues, 1)

  takingAnswers = true
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!takingAnswers) return
    takingAnswers = false
    const selChoice = e.target
    const selAnswer = selChoice.dataset['number']
    let classChange = selAnswer == currQuest.answer ? 'correct' : 'incorrect'

    if (classChange === 'correct') {
      plusScore(SCORE_POINTS)
    } else {
      minusTime();
    }

    selChoice.parentElement.classList.add(classChange)

    setTimeout(() => {
      selChoice.parentElement.classList.remove(classChange)
      getNewQuestion()

    }, 1000)
  })
})
// Will add to users score for correct answers
function plusScore(num) {
  score += num
  scoreText.innerText = score
}
// Will deduct time from users overall time for incorrect answers
function minusTime() {
  timeLeft -= 10
  timer_h1.innerHTML = ':' + timeLeft;

}
getGame()
