const FPS = 60;
const freqPentatonic = [
  261.63,
  293.66,
  329.63,
  392.0,
  440.0,
  523.25,
  587.33,
  659.25,
  783.99,
  880.0,
  1046.5,
  1174.66,
  1318.51,
  1567.98,
  1760.0,
  2093.0,
  2349.32,
  2637.02,
];
var grid;
var waves = [];
var currentCol = 0;
var attackSlider;
var sustainSlider;
var releaseSlider;
var bpmSlider;

function setup() {
  createCanvas(500, 600);
  frameRate(FPS);
  grid = new Grid(16, 16, 400, 400, createVector(50, 50));
  attackSlider = createSlider(0.0, 2.0, 0.3, 0.01);
  attackSlider.position(125, 475);
  attackSlider.style("width", "200px");
  sustainSlider = createSlider(0.0, 2.0, 0.1, 0.01);
  sustainSlider.position(125, 500);
  sustainSlider.style("width", "200px");
  releaseSlider = createSlider(0.0, 2.0, 0.1, 0.01);
  releaseSlider.position(125, 525);
  releaseSlider.style("width", "200px");
  bpmSlider = createSlider(0, 1000, 200, 1);
  bpmSlider.position(125, 550);
  bpmSlider.style("width", "200px");
}

function draw() {
  background(220);
  grid.show();
  if (frameCount % floor(FPS ** 2 / bpmSlider.value()) == 0) {
    currentCol++;
    currentCol = currentCol % grid.cols;
    playCol(currentCol);
  }
  grid.lightCol(currentCol);
  textSize(16);
  text(attackSlider.value() + "s", 345, 490);
  text(sustainSlider.value() + "s", 345, 515);
  text(releaseSlider.value() + "s", 345, 540);
  text(bpmSlider.value(), 345, 565);
  text("Attack", 50, 490);
  text("Sustain", 50, 515);
  text("Release", 50, 540);
  text("BPM", 50, 565);
}

function mousePressed() {
  if (mouseX >= grid.pos.x && mouseX <= grid.gridWidth + grid.pos.x) {
    if (mouseY >= grid.pos.y && mouseY <= grid.gridHeight + grid.pos.y) {
      let cell = grid.cellFromPos(createVector(mouseX, mouseY));
      grid.toggleCell(cell);
    }
  }
}

function playWave(freq, type = "sine") {
  const wave = new p5.Oscillator(type);
  wave.freq(freq, 0.1);
  wave.amp(0);
  wave.amp(1, attackSlider.value());
  wave.amp(
    0,
    releaseSlider.value(),
    attackSlider.value() + sustainSlider.value()
  );
  wave.start();
}

function playCol(col) {
  for (let i = 0; i < grid.rows; i++) {
    if (grid.grid[i][col] == 1) {
      playWave(freqPentatonic[grid.rows - i], "sine");
    }
  }
}
