// var table = document.getElementsByClassName('table');

// produces array of 9 elements


var xTurn = true;
var clicked = 0;
var board = [['__', '__', '__'],
             ['__', '__', '__'],
             ['__', '__', '__']];
var xWins = false;
var oWins = false;

var boardChecker = () => { // runs after all boxes have been clicked
  for (let z = 0; z < 2; z++) {
    var xOrO = 'X';
    if (z === 1) {xOrO = 'O'}
    if (xOrO === board[1][1]) {
      if (checkDiagonalRight(xOrO) || checkDiagonalLeft(xOrO)) {
        if (xOrO === 'X') {xWins = true;}
        if (xOrO === 'O') {oWins = true;}
        break;
      }
    }
    for (let i in board) {
      if (checkHorizontal(i, xOrO)) {
        if (xOrO === 'X') {xWins = true;}
        if (xOrO === 'O') {oWins = true;}
        break;
      } else if (checkVertical(i, xOrO)) {
        if (xOrO === 'X') {xWins = true;}
        if (xOrO === 'O') {oWins = true;}
        break;
      }
    }
  }
  return displayWinner();
};
var displayWinner = () => {
  var element = document.getElementById('winner');
  var winningText = '';
  if (xWins === true && oWins === true) {
    winningText = 'Cool! You both won this time!';
  } else if (xWins === true) {
    winningText = 'Xzibit the skillz! X\'s win!';
  } else if (oWins === true) {
    winningText = 'Ooh yeah! O\'s win!';
  } else {
    winningText = 'You guys both lose. Ouch!';
  }
  return element.innerText = winningText;
};


var checkHorizontal = (row, xOrO) => {
  for (let element of board[row]) {
    if (element !== xOrO) {
      return false;
    }
  }
  return true;
};

var checkVertical = (col, xOrO) => {
  for (let i = 0; i < 3; i++) {
    if (board[i][col] !== xOrO) {
      return false;
    }
  }
  return true;
};

var checkDiagonalRight = (xOrO) => {
  var win = true;
  for (let i = 0; i < 3; i+=2) {
    if (board[i][i] !== xOrO) {
      win = false;
    }
  }
  return win;
};

var checkDiagonalLeft = (xOrO) => {
  var win = true;
  if (board[0][2] !== xOrO || board[2][0] !== xOrO) {
    win = false;
  }
  return win;
};

var resetGame = () => {
  clicked = 0;
  xWins = false;
  oWins = false;
  var element = document.getElementById('winner').innerText = '';
  var tableButtons = document.getElementsByClassName('table');
  for (let button of tableButtons) {
    button.innerText = '__';
  }
  xTurn = true;
};

var clickHandler = (cellNumber) => {
  var element = document.getElementById(cellNumber);
  var xOrO = 'X';
  if (element.innerText !== '__') {
    alert('This box has already been checked, please try again');
  } else {
    if (!xTurn) {
      xOrO = 'O';
      xTurn = true;
    } else {
      xTurn = false;
    }
    element.innerText = xOrO;

    // these if-else's add the piece to the board
    if (cellNumber[0] === '0') {
      for (let x in board[0]) {
        if (Number(x) === Number(cellNumber[1])) {
          board[0][x] = xOrO;
        }
      }
    } else if (cellNumber[0] === '1') {
      for (let x in board[1]) {
        if (Number(x) === Number(cellNumber[1])) {
          board[1][x] = xOrO;
        }
      }
    } else { // (cellNumber[0] === '2')
      for (let x in board[2]) {
        if (Number(x) === Number(cellNumber[1])) {
          board[2][x] = xOrO;
        }
      }
    }
    clicked++;
    if (clicked === 9) {
      boardChecker();
    }
  }
};


