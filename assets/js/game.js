const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

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
    question: "what is the correct file extension for Javascript files?",
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

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign("/end.html")

  }

  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
  

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionsIndex, 1)

  acceptingAnswers = true
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()

    }, 1000)
  })
})

incrementScore = num => {
  score += num
  scoreText.innerText = score
}
startGame()
