//Game Constants & variable
let inputDirection = { x: 0, y: 0 };
const foodSound = new Audio("../music/food.mp3");
const gameOverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const musicSound = new Audio("../music/music.mp3");

let speed = 7;
let lastPaintTime = 0;
let score = 0;

let snakeArr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };

//Game Functions
function main(currentTime) {
  window.requestAnimationFrame(main);
  if ((currentTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = currentTime;
  gameEngine();
}

function isCollide(sArr) {
  //if snake bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (sArr[i].x === sArr[0].x && sArr[i].y === sArr[0].y) {
      return true;
    }
  }
  //if you bump into the ball
  if (sArr[0].x >= 18 || sArr[0].x <= 0 || sArr[0].y >= 18 || sArr[0].y <= 0) {
    return true;
  }
}

function gameEngine() {
  //part 1: updating the snake array & food

  if (isCollide(snakeArr)) {
    score = 0;
    gameOverSound.play();
    musicSound.pause();
    inputDirection = { x: 0, y: 0 };
    alert("Game Over. Press any key to play again");
    snakeArr = [{ x: 13, y: 15 }];
    scoreBox.innerHTML = "Score: " + score;
  }

  //if you have eaten the food increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (score > highScoreVal) {
      highScoreVal = score;
      localStorage.setItem("highscore", JSON.stringify(highScoreVal));
      HighScoreBox.innerHTML = "HIGH SCORE : " + highScoreVal;
    }

    scoreBox.innerHTML = "Score: " + score;

    snakeArr.unshift({
      x: snakeArr[0].x + inputDirection.x,
      y: snakeArr[0].y + inputDirection.y,
    });

    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDirection.x;
  snakeArr[0].y += inputDirection.y;

  //part 2: Display the snake and food

  //Display the snake
  board.innerHTML = "";
  snakeArr.forEach((el, index) => {
    snakeElem = document.createElement("div");
    snakeElem.style.gridRowStart = el.y;
    snakeElem.style.gridColumnStart = el.x;
    if (index == 0) {
      snakeElem.classList.add("head");
    } else {
      snakeElem.classList.add("snake");
    }
    board.appendChild(snakeElem);
  });

  //Display the Food
  foodElem = document.createElement("div");
  foodElem.style.gridRowStart = food.y;
  foodElem.style.gridColumnStart = food.x;
  foodElem.classList.add("food");
  board.appendChild(foodElem);
}

// main logic starts from here

let highScore = localStorage.getItem("highscore");
if (highScore === null) {
  highScoreVal = 0;
  localStorage.setItem("highscore", JSON.stringify(highScoreVal));
} else {
  highScoreVal = JSON.parse(highScore);
  HighScoreBox.innerHTML = "HIGH SCORE : " + highScore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDirection = { x: 0, y: 1 }; //Start the game
  musicSound.play();
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDirection.x = 0;
      inputDirection.y = -1;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      inputDirection.x = 0;
      inputDirection.y = 1;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDirection.x = -1;
      inputDirection.y = 0;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      inputDirection.x = 1;
      inputDirection.y = 0;
      break;
    default:
      break;
  }
});
