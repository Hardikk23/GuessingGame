let num = Math.trunc(Math.random() * 101);
let score = 20;
let highscore;
if (localStorage.getItem("highscore")) {
  highscore = localStorage.getItem("highscore");
  document.querySelector(".highscore").textContent = `Highscore: ${highscore}`;
} else {
  highscore = 0;
}
let prevguess = [];
const audio = document.createElement("audio");
audio.src = "music.mp3";
audio.volume = 0.5;
function checkGuess() {
  document.querySelector("body").style.backgroundColor = "#222";
  let guess = Number(document.querySelector("#guess").value);
  if (score <= 0) {
    document.querySelector(".message").textContent = "You Lose 😂😂";
    document.querySelector(".btncheckguess").disabled = false;
    return;
  }
  if (guess > 100 || guess < 0 || !guess) {
    document.querySelector(".message").textContent = "Out of Bounds...";
    document.querySelector("body").style.backgroundColor = "#b22222";
    alert("Please enter a number between 1 and 100.");
    score--;
    document.querySelector(".score").textContent = `Score: ${score}`;
    return;
  }
  if (guess === num) {
    if (score > highscore) {
      highscore = score;
      document.querySelector(
        ".highscore"
      ).textContent = `Highscore: ${highscore}`;
    }
    document.querySelector("body").style.backgroundColor = "green";
    document.querySelector(".message").textContent = "You Win 🏆";
    document.querySelector(".score").textContent = `Score: ${score}`;
    document.querySelector(".btncheckguess").disabled = true;
    document.querySelector(".number").textContent = num;
    localStorage.setItem("highscore", highscore);
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 10000);
    const container = document.getElementById("fireworks-container");
    const fireworks = new Fireworks(container);
    fireworks.start();
    setTimeout(() => {
      fireworks.stop();
    }, 10000);
  } else if (guess > num - 10 && guess < num + 10) {
    document.querySelector(".message").textContent = "Warm 🔥";
    score--;
    document.querySelector(".score").textContent = `Score: ${score}`;

    prevguess.push(guess);
    if (
      Math.abs(num - guess) < Math.abs(num - prevguess[prevguess.length - 2])
    ) {
      document.querySelector(".message").textContent = "Warmer 🔥🔥";
    } else if (
      Math.abs(num - guess) > Math.abs(num - prevguess[prevguess.length - 2])
    ) {
      document.querySelector(".message").textContent = "Colder ❄️❄️";
    }
  } else if (guess < 100 && guess > 0) {
    document.querySelector(".message").textContent = "Cold ❄️";
    score--;
    document.querySelector(".score").textContent = `Score: ${score}`;
    prevguess.push(guess);
  }
//   document.querySelector("#guess").value = "";
}

function gameReset() {
  score = 20;
  num = Math.trunc(Math.random() * 101);
  document.querySelector(".message").textContent = "Start Guessing...";
  document.querySelector(".score").textContent = `Score:${score}`;
  document.querySelector("#guess").value = "";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".btncheckguess").disabled = false;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".number").style.fontSize = "30px";
  prevguess = [];
  audio.pause();
  audio.currentTime = 0;
  const fireworksContainer = document.querySelector("#fireworks-container");
  fireworksContainer.parentNode.removeChild(fireworksContainer);
}
document.querySelector(".btncheckguess").addEventListener("click", checkGuess);
document.querySelector(".again").addEventListener("click", gameReset);
