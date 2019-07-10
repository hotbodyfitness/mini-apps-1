var gameState = {
  xTurn: true,
  clicked: 0,
  board: [['__', '__', '__'],
          ['__', '__', '__'],
          ['__', '__', '__']],
  xWins: false,
  oWins: false,
  winnerLastRound: 'X'
};

var boardChecker = () => { // runs after all boxes have been clicked
  for (let z = 0; z < 2; z++) {
    var xOrO = 'X';
    if (z === 1) {xOrO = 'O'}
    if (xOrO === gameState.board[1][1]) {
      if (checkDiagonalRight(xOrO) || checkDiagonalLeft(xOrO)) {
        if (xOrO === 'X') {gameState.xWins = true;}
        if (xOrO === 'O') {gameState.oWins = true;}
        break;
      }
    }
    for (let i in gameState.board) {
      if (checkHorizontal(i, xOrO)) {
        if (xOrO === 'X') {gameState.xWins = true;}
        if (xOrO === 'O') {gameState.oWins = true;}
        break;
      } else if (checkVertical(i, xOrO)) {
        if (xOrO === 'X') {gameState.xWins = true;}
        if (xOrO === 'O') {gameState.oWins = true;}
        break;
      }
    }
  }
  return displayWinner();
};
var displayWinner = () => {
  var element = document.getElementById('winner');
  var winningText = '';
  if (gameState.xWins === true && gameState.oWins === true) {
    winningText = 'Cool! You both won this time!';
    logWinners('XO');
  } else if (gameState.xWins === true) {
    winningText = 'Xzibiting skillz! X\'s win!';
    gameState.winnerLastRound = 'X';
    logWinners('X');
  } else if (gameState.oWins === true) {
    winningText = 'Ooh yeah! O\'s win!';
    gameState.winnerLastRound = 'O';
    logWinners('O');
  } else {
    var xOrO = 'X';
    if (gameState.winnerLastRound === 'X') {
      gameState.winnerLastRound = 'O';
      xOrO = 'O';
    } else {
      gameState.winnerLastRound = 'X';
    }
    winningText = `You guys both lose. Ouch!
                  ${xOrO}\'s get a turn first this round.`;
  }
  return element.innerText = winningText;
};

var logWinners = (xOrO) => {
  var xscore = document.getElementById('xscore');
  var oscore = document.getElementById('oscore');
  var xDoubleDigitWins = false;
  var oDoubleDigitWins = false;
  if (xscore.innerText.length > 4) {xDoubleDigitWins = true;}
  if (oscore.innerText.length > 4) {oDoubleDigitWins = true;}

  if (xDoubleDigitWins && xOrO.includes('X')) {
    xscore.innerText = 'X: ' + (Number(xscore.innerText[3] + xscore.innerText[4]) + 1);
  } else if (xOrO.includes('X')) {
    xscore.innerText = 'X: ' + (Number(xscore.innerText[3]) + 1);
  }
  if (oDoubleDigitWins && xOrO.includes('O')) {
    oscore.innerText = 'O: ' + (Number(oscore.innerText[3] + oscore.innerText[4]) + 1);
  } else if (xOrO.includes('O')) {
    oscore.innerText = 'O: ' + (Number(oscore.innerText[3]) + 1);
  }
};

var checkHorizontal = (row, xOrO) => {
  for (let element of gameState.board[row]) {
    if (element !== xOrO) {
      return false;
    }
  }
  return true;
};

var checkVertical = (col, xOrO) => {
  for (let i = 0; i < 3; i++) {
    if (gameState.board[i][col] !== xOrO) {
      return false;
    }
  }
  return true;
};

var checkDiagonalRight = (xOrO) => {
  var win = true;
  for (let i = 0; i < 3; i+=2) {
    if (gameState.board[i][i] !== xOrO) {
      win = false;
    }
  }
  return win;
};

var checkDiagonalLeft = (xOrO) => {
  var win = true;
  if (gameState.board[0][2] !== xOrO || gameState.board[2][0] !== xOrO) {
    win = false;
  }
  return win;
};

var resetGame = () => {
  gameState.clicked = 0;
  gameState.xWins = false;
  gameState.oWins = false;
  var element = document.getElementById('winner').innerText = '';
  var tableButtons = document.getElementsByClassName('table');
  for (let button of tableButtons) {
    button.innerText = '__';
  }
  if (gameState.winnerLastRound === 'X') {
    gameState.xTurn = true;
  } else {
    gameState.xTurn = false;
  }
};

var resetScore = () => {
  document.getElementById('xscore').innerText = 'X: 0';
  document.getElementById('oscore').innerText = 'O: 0';
};

var clickHandler = (cellNumber) => {
  var element = document.getElementById(cellNumber);
  var xOrO = 'X';
  if (element.innerText !== '__') {
    alert('This box has already been checked, please try again');
  } else {
    if (!gameState.xTurn) {
      xOrO = 'O';
      gameState.xTurn = true;
    } else {
      gameState.xTurn = false;
    }
    element.innerText = xOrO;

    // these if-else's add the piece to the board
    if (cellNumber[0] === '0') {
      for (let x in gameState.board[0]) {
        if (Number(x) === Number(cellNumber[1])) {
          gameState.board[0][x] = xOrO;
        }
      }
    } else if (cellNumber[0] === '1') {
      for (let x in gameState.board[1]) {
        if (Number(x) === Number(cellNumber[1])) {
          gameState.board[1][x] = xOrO;
        }
      }
    } else { // (cellNumber[0] === '2')
      for (let x in gameState.board[2]) {
        if (Number(x) === Number(cellNumber[1])) {
          gameState.board[2][x] = xOrO;
        }
      }
    }
    gameState.clicked++;
    if (gameState.clicked === 9) {
      boardChecker();
    }
  }
  console.log('gameState', gameState);
};

var enterName = (xOrO) => {
  var clicked = document.getElementById(`${xOrO}submit`);
  var nameDiv = document.getElementById(`${xOrO}name`);
  var nameDiv2 = document.getElementById(`${xOrO}name2`);
  if (clicked.value === 'Play') {
    var name = nameDiv.firstChild.value;
    nameDiv2.innerHTML = `<b style="float:right; padding-right:0.5em">${name}</b>`;
    nameDiv.firstChild.value = '';
    clicked.value = 'Reset';
  } else {
    // nameDiv.innerHTML = `<input type="text">`;
    nameDiv2.innerText = '';
    clicked.value = 'Play';
  }
};