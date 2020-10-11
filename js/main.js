// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
const gameEngine = new Engine(document.getElementById("app"));

// keydownHandler is a variable that refers to a function. The function has one parameter
// (does the parameter name matter?) which is called event. As we will see below, this function
// will be called every time the user presses a key. The argument of the function call will be an object.
// The object will contain information about the key press, such as which key was pressed.
const keydownHandler = (event) => {
  // event.code contains a string. The string represents which key was press. If the
  // key is left, then we call the moveLeft method of gameEngine.player (where is this method defined?)
  if (event.code === "ArrowLeft") {
    gameEngine.player.moveLeft();
  }

  // If `event.code` is the string that represents a right arrow keypress,
  // then move our hamburger to the right
  if (event.code === "ArrowRight") {
    gameEngine.player.moveRight();
  }
};

// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener("keydown", keydownHandler);

// We call the gameLoop method to start the game

let startButton = document.getElementById("startButton");
startButton.innerText = "START GAME";
startButton.style.position = "absolute";
startButton.style.left = "294px";
startButton.style.top = "300px";
startButton.style.fontFamily = "Space Mono, monospace";
startButton.style.color = "aqua";
startButton.style.padding = "20px 40px";
startButton.style.borderRadius = "8px";
startButton.style.border = "solid 4px aqua";
startButton.style.cursor = "pointer";
startButton.style.backgroundColor = "black";

let title = document.getElementById("title");
title.innerText = "H1GHL1F3";
title.style.position = "absolute";
title.style.left = "105px";
title.style.top = "100px";
title.style.fontFamily = "Space Mono, monospace";
title.style.textAlign = "center";
title.style.color = "aqua";
title.style.width = "500px";
title.style.padding = "20px";

let instructions = document.getElementById("instructions");
instructions.innerText =
  "Welcome to H1GHL1FE, in this game, your ultimate goal is to reach a score of 100'000. Each astronaut that you save will give you extra points, if you let them die, you will lose points. Use the left and right arrow to move the spaceship.";
instructions.style.position = "absolute";
instructions.style.left = "105px";
instructions.style.top = "170px";
instructions.style.fontFamily = "Space Mono, monospace";
instructions.style.fontSize = "12px";
instructions.style.textAlign = "center";
instructions.style.color = "aqua";
instructions.style.width = "500px";
instructions.style.padding = "20px";

let startGame = () => {
  gameEngine.gameLoop();
  spaceFX.play();
  startButton.style.display = "none";
  title.style.display = "none";
  instructions.style.display = "none";
};

startButton.addEventListener("click", startGame);
