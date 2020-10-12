// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    // Initially, we have no astronaut in the game. The astronaut property refers to an array
    // that contains instances of the Astronaut class
    this.astronauts = [];
    // We add the background image to the game
    addBackground(this.root);
    // Adding the score Board
    this.scoreBoard = new Text(this.root, "20px", "20px");
    this.score = 0;
    ////
    this.restart = document.getElementById("restart");
    this.restart.innerText = "RESTART";
    this.restart.style.position = "absolute";
    this.restart.style.left = "309px";
    this.restart.style.top = "300px";
    this.restart.style.fontFamily = "Space Mono, monospace";
    this.restart.style.color = "aqua";
    this.restart.style.padding = "20px 40px";
    this.restart.style.cursor = "pointer";
    this.restart.style.display = "none";
    this.restart.style.backgroundColor = "black";
    this.restart.style.border = "none";
    this.restart.style.outline = "none";
    ////
    this.restart.addEventListener("click", this.restartGame);
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });
    // We use the number of milliseconds since the last call to gameLoop to update the astronaut positions.
    // Furthermore, if any astronaut is below the bottom of our game, its destroyed property will be set. (See Astronaut.js)
    this.astronauts.forEach((astronaut) => {
      astronaut.update(timeDiff);
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    this.astronauts = this.astronauts.filter((astronaut) => {
      return !astronaut.destroyed;
    });

    this.enemies.forEach((enemy) => {
      if (enemy.y + ENEMY_HEIGHT > GAME_HEIGHT) {
        this.score += 1;
      }
    });

    this.astronauts.forEach((astronaut) => {
      if (astronaut.y + ENEMY_HEIGHT > GAME_HEIGHT) {
        this.score -= 1;
      }
    });

    this.scoreBoard.update(`SC0RE: ${Math.round(this.score)}`);

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    // We need to perform the addition of enemies until we have enough astronauts.
    while (this.astronauts.length < 1) {
      // We find the next available spot and, using this spot, we create an astronaut.
      // We add this astronaut to the astronauts array
      const astronautspot = nextAstronautSpot(this.astronauts);
      this.astronauts.push(new Astronaut(this.root, astronautspot));
    }

    if (this.isPlayerDead()) {
      spaceFX.pause();
      this.gameOver = new Text(this.root, "250px", "215px");
      this.gameOver.gameOver("GAME 0VER");
      restart.style.display = "block";
      return;
    }

    if (this.isAstronautCaught()) {
      astronautFX.play();
      this.score += 3;
      this.astronauts.forEach((astronaut) => {
        astronaut.destroyed = true;
        astronaut.root.removeChild(astronaut.domElement);
      });
    }

    if (this.hasWon()) {
      this.youWon = new Text(this.root, "257px", "215px");
      this.youWon.youWon("Y0U W0N!");
      spaceFX.pause();
      return;
    }
    setTimeout(this.gameLoop, 20);
  };

  isPlayerDead = () => {
    let isDead = false;
    for (let i = 0; i < this.enemies.length; i++) {
      let collisionBT = this.enemies[i].getBottom() > this.player.getTop();
      let collisionRL = this.enemies[i].getRight() >= this.player.getLeft();
      let collisionLR = this.enemies[i].getLeft() <= this.player.getRight();
      let collisionBB = this.enemies[i].getTop() < this.player.getBottom();

      let isCollision =
        collisionBT && collisionRL && collisionLR && collisionBB;

      if (isCollision) {
        console.log("***********COLLISION***********");
        isDead = true;
      }
    }
    console.log(isDead);
    return isDead;
  };

  isAstronautCaught = () => {
    for (let i = 0; i < this.astronauts.length; i++) {
      let collisionBT = this.astronauts[i].getBottom() > this.player.getTop();
      let collisionRL = this.astronauts[i].getRight() >= this.player.getLeft();
      let collisionLR = this.astronauts[i].getLeft() <= this.player.getRight();
      let collisionBB = this.astronauts[i].getTop() < this.player.getBottom();

      let isCollision =
        collisionBT && collisionRL && collisionLR && collisionBB;

      if (isCollision) {
        console.log("***********CAUGHT***********");
        return true;
      }
    }
    return false;
  };

  hasWon = () => {
    if (this.score == 500) {
      return true;
    }
    return false;
  };

  restartGame = () => {
    this.gameLoop();
    this.gameOver.restartOver();
    this.restart.style.display = "none";
    spaceFX.play();
    this.score = 0;
  };
}
