/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById("board");
  // Add HTML table for the board with width of WIDTH and height of 1 for event listener
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // Create the table with each having the id "row-column" and append to board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // Find row number for clickevent
  for(let i = 5; i >= 0; i--) {
    let ids = i + "--" + x;
    let container = document.getElementById(ids);
    if (!container) { 
      return i;
    } else if(!container && i === 0) {
        return null;
      }
  }
}



function placeInTable(y, x) {
  // make a div and insert into correct table cell
  let ids = y + "-" + x;
  let container = document.getElementById(ids);
  let moveDiv = document.createElement("div");
  moveDiv.setAttribute("id", `${y}--${x}`);
  moveDiv.classList.add("piece");
  if (currPlayer === 1) {
    //set player piece on board
    moveDiv.classList.add("player-one");
    //check for win after each turn
    if (checkForWin()) {
      container.append(moveDiv);
      return endGame(`Player ${currPlayer} won!`);
    }
    // check for tie after each turn
    if (board.every(row => row.every(cell => cell))) {
      container.append(moveDiv);
      return endGame('Tie!');
    }
  //alternate between players one and two after each turn
    currPlayer = 2;
  }
  else if (currPlayer === 2) {
    moveDiv.classList.add("player-two");
    //check for win after each turn
    if (checkForWin()) {
      container.append(moveDiv);
      return endGame(`Player ${currPlayer} won!`);
    }
    // check for tie after each turn
    if (board.every(row => row.every(cell => cell))) {
      container.append(moveDiv);
      return endGame('Tie!');
    }
    //alternate between players one and two after each turn
    currPlayer = 1;
  }
  container.append(moveDiv);
}

/** endGame: announce game end */

function endGame(msg) {
  let top = document.getElementById("column-top");
  top.removeEventListener("click", handleClick);
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  } else {
    board[y][x] = currPlayer;
    placeInTable(y, x);
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // Either horizontal, vertical or diagonal connections of four results in a
  //winning combination.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
