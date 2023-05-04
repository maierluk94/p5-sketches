Grid = function (
  cols,
  rows,
  gridWidth = width,
  gridHeight = height,
  pos = createVector(0, 0)
) {
  this.cols = cols;
  this.rows = rows;
  this.gridWidth = gridWidth;
  this.gridHeight = gridHeight;
  this.cellWidth = this.gridWidth / this.cols;
  this.cellHeight = this.gridHeight / this.rows;
  this.pos = pos;
  this.grid = new Array(rows);
  for (let i = 0; i < rows; i++) {
    this.grid[i] = new Array(cols).fill(0);
  }

  this.toggleCell = function (cell) {
    if (this.grid[cell.x][cell.y] == 0) {
      this.grid[cell.x][cell.y] = 1;
    } else {
      this.grid[cell.x][cell.y] = 0;
    }
  };

  this.cellFromPos = function (pos) {
    let col = floor((pos.x - this.pos.x) / this.cellWidth);
    let row = floor((pos.y - this.pos.y) / this.cellHeight);
    return createVector(row, col);
  };

  this.show = function () {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.grid[i][j] == 1) {
          let x = j * this.cellWidth + this.pos.x;
          let y = i * this.cellHeight + this.pos.y;
          fill(100, 50, 200);
          rect(x, y, this.cellWidth, this.cellHeight);
        }
      }
    }
    stroke(0);
    strokeWeight(1);
    for (let i = 0; i <= this.cols; i++) {
      line(
        i * this.cellWidth + this.pos.x,
        this.pos.y,
        i * this.cellWidth + this.pos.x,
        this.gridHeight + this.pos.y
      );
    }
    for (let i = 0; i <= this.rows; i++) {
      line(
        this.pos.x,
        i * this.cellHeight + this.pos.y,
        this.gridWidth + this.pos.x,
        i * this.cellHeight + this.pos.y
      );
    }
  };

  this.lightCol = function (col) {
    for (let i = 0; i < this.rows; i++) {
      let x = col * this.cellWidth + this.pos.x;
      let y = i * this.cellHeight + this.pos.y;
      fill(255, 255, 0, 50);
      rect(x, y, this.cellWidth, this.cellHeight);
    }
  };
};
