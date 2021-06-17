const user = document.querySelector("#username");
const scoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

user.addEventListener("keyup", () => {
    scoreBtn.disabled = !user.value;
});
function saveHighScore(e) {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: user.value
    };

    highScores.push(score);

    highScores.sort((a, b) => {
        return b.score - a.score;
    });

    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('../highscore/highscore.html');
};
