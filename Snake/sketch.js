const gridSize = 25;
const BACKGROUND_COLOR = '#f1f2da'
const FONT_COLOR = '#00303b'
const SNAKE_COLOR = '#ffce96'
const BERRY_COLOR = '#ff7777'
const POOP_COLOR = '#850101'
var button;
var snake;
var berry;
var poop = [];
var score = 0;
var snakeSpeed = 6;
var gameState = 0;

function preload() {
  fontKenney = loadFont('Kenney Future Narrow.ttf');
}

function setup() {
  createCanvas(500, 500);
  frameRate(60);
  stroke(FONT_COLOR);
}

function draw() {
  background(BACKGROUND_COLOR);
  if (gameState == 0) {
    menu();
  } else {
    game();
  }
}

function keyPressed() {
  if ((keyCode == 32) && (gameState == 0)) {
    newGame();
  }
  if ((keyCode == RIGHT_ARROW) && (gameState == 1)) {
    if (snake.dir.x !== -1) {
      snake.next_dir = createVector(1, 0);
    }
  } else if ((keyCode == DOWN_ARROW) && (gameState == 1)) {
    if (snake.dir.y !== -1) {
      snake.next_dir = createVector(0, 1);
    }
  } else if ((keyCode == LEFT_ARROW) && (gameState == 1)) {
    if (snake.dir.x !== 1) {
      snake.next_dir = createVector(-1, 0);
    }
  } else if ((keyCode == UP_ARROW) && (gameState == 1)) {
    if (snake.dir.y !== 1) {
      snake.next_dir = createVector(0, -1);
    }
  }
}

function menu() {
  fill(FONT_COLOR);
  textAlign(CENTER);
  textFont(fontKenney);
  textSize(32);
  text('Press space to start', width/2, height/2);
  if (score != 0) {
    text('Score: ' + score, width/2, height/2 - 40)
  }
}

function newGame() {
  snake = new Snake();
  berry = new Berry();
  berry.setPosition(snake.snake, poop);
  gameState = 1;
  score = 0;
  poop = [];
}

function game() {
  if (snake.isAlive) {
    if (frameCount % snakeSpeed == 0) {
      if (snake.update(berry.pos)) { // SNAKE EAT
        berry.setPosition(snake.snake, poop);
        p = new Poop(snake.snake[snake.snake.length-1]);
        poop.push(p);
        score++;
      }
      if (snake.hitPoop(poop)) {
        snake.isAlive = false;
      }
    }
    snake.show();
    berry.show();
    for (let i = 0; i < poop.length; i++) {
      poop[i].show();
    }
    fill(FONT_COLOR);
    textAlign(RIGHT);
    textFont(fontKenney);
    textSize(16);
    text('Score: ' + score, width-10, 20);
  } else {
    gameState = 0;
  }
}

function Snake() {
  let cols = floor(width / gridSize);
  let rows = floor(height / gridSize);
  this.snake = [createVector(floor(cols/2), floor(rows/2))];
  this.dir = createVector(0, 1);
  this.next_dir = createVector(0, 1);
  this.isAlive = true;
    
  this.update = function(berryPos) {
    this.dir = this.next_dir;
    
    this.snake.unshift(createVector(this.snake[0].x + this.dir.x,           this.snake[0].y + this.dir.y));
    
    if (this.hitSelf()) {
      this.isAlive = false;
    }
    
    if (this.hitWall()) {
      this.isAlive = false;
    }
    
    if (!this.snake[0].equals(berryPos)) {
      this.snake.pop();
      return false;
    }   
    return true;
  }
  
  this.hitSelf = function() {
    for (let i = 1; i < this.snake.length-1; i++) {
      if (this.snake[0].equals(this.snake[i])) {
        return true;
      }
    }
    return false;
  }
  
  this.hitWall = function() {
    let cols = floor(width / gridSize);
    let rows = floor(height / gridSize);
    
    if ((this.snake[0].x < 0) || (this.snake[0].x > cols-1)) {
      return true;
    } 
    if ((this.snake[0].y < 0) || (this.snake[0].y > rows-1)) {
      return true;
    }
    return false;
  }
  
  this.hitPoop = function(poopArr) {
    for (let i = 0; i < poopArr.length; i++) {
      if (this.snake[0].equals(poopArr[i].pos)) {
        return true;
      }
    }
    return false;
  }
  
  this.show = function() {
    fill(SNAKE_COLOR);
    for (let i = 0; i < this.snake.length; i++) {
      rect(this.snake[i].x * gridSize, this.snake[i].y * gridSize, gridSize-1, gridSize-1, gridSize/10) 
    }
  }
}

function Berry() {
  this.pos = null;
  
  this.setPosition = function(snakePos, poopArr) {
    let cols = floor(width / gridSize);
    let rows = floor(height / gridSize);
    this.pos = createVector(floor(random(cols)), floor(random(rows)));
    for (i = 0; i < snakePos.length; i++) {
      if (this.pos.equals(snakePos[i])) {
        this.setPosition(snakePos, poopArr);
        return null;
      }
    }
    for (i = 0; i < poopArr.length; i++) {
      if (this.pos.equals(poopArr[i].pos)) {
        this.setPosition(snakePos, poopArr);
        return null;
      }
    }
  }
  
  this.show = function () {
    fill(BERRY_COLOR);
    rect(this.pos.x * gridSize, this.pos.y * gridSize, gridSize-1, gridSize-1, gridSize/10);
  }
}

function Poop(pos) {
  this.pos = pos;
  
  this.show = function () {
    fill(POOP_COLOR);
    rect(this.pos.x * gridSize, this.pos.y * gridSize, gridSize-1, gridSize-1, gridSize/10);
  }
}