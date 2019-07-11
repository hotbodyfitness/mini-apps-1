var GameState = {
  xTurn: true,
  clicked: 0,
  board: [['__', '__', '__'],
          ['__', '__', '__'],
          ['__', '__', '__']],
  xWins: false,
  oWins: false,
  gravity: true,
  rotated: 0,
  winnerLastRound: 'X'
};

var UserInput = {
  enterName: (xOrO) => {
    var clicked = document.getElementById(`${xOrO}submit`);
    var nameDiv = document.getElementById(`${xOrO}name`);
    var nameDiv2 = document.getElementById(`${xOrO}name2`);
    if (clicked.value === 'Play') {
      var name = nameDiv.firstChild.value;
      nameDiv2.innerHTML = `<b style="float:right; padding-right:0.5em">${name}</b>`;
      nameDiv.firstChild.value = '';
      clicked.value = 'Reset';
    } else {
      nameDiv2.innerText = '';
      clicked.value = 'Play';
    }
  },

  changeGravity: () => {
    var checkDiv = document.getElementById('checkDiv');
    if (GameState.gravity) {
      GameState.gravity = false;
      checkDiv.innerHTML = '<input class="check" type="checkbox" onclick="UserInput.changeGravity()">'
    } else {
      GameState.gravity = true;
    }
  },

  rotator: () => {
    var table = document.getElementById('rotate');
    var r = GameState.rotated;
    table.animate([
      {'transform': `rotate(${r}deg)`},
      {'transform': `rotate(${r+90}deg)`}
    ], {duration: 500}
    );
    table.style = `transform: rotate(${r+90}deg)`;
    GameState.rotated += 90;
    // UserInput.makeGravity();
  },

  // makeGravity: () => {
  //   var index;
  //   var slide = 0;
  //   var id = '';
  //   if (GameState.rotated % 360 === 0) {
  //     if (GameState.board[0].includes('X')) {
  //       index = GameState.board[0].indexOf('X');
  //       if (GameState.board[1][index] === '__') {
  //         slide++;
  //         if (GameState.board[2][index] === '__') {
  //           slide++;
  //         }
  //       }
  //       GameState.board[slide][index] = 'X';
  //       id += JSON.stringify(slide) + index;
  //       document.getElementById(id).innerText = 'X';
  //       document.getElementById(id).style = 'color: black';

  //       document.getElementById(`0${index}`).innerText = '__';
  //       document.getElementById(`0${index}`).style = 'color: white';
  //     }

  //   } else if (GameState.rotated % 270 === 0) {

  //   } else if (GameState.rotated % 180 === 0) {

  //   } else {

  //   }
  // },

  addPiece: (cellNumber, xOrO) => {
    if (cellNumber[0] === '0') {
      for (let x in GameState.board[0]) {
        if (Number(x) === Number(cellNumber[1])) {
          GameState.board[0][x] = xOrO;
        }
      }
    } else if (cellNumber[0] === '1') {
      for (let x in GameState.board[1]) {
        if (Number(x) === Number(cellNumber[1])) {
          GameState.board[1][x] = xOrO;
        }
      }
    } else { // (cellNumber[0] === '2')
      for (let x in GameState.board[2]) {
        if (Number(x) === Number(cellNumber[1])) {
          GameState.board[2][x] = xOrO;
        }
      }
    }
    if (GameState.gravity) {
      UserInput.rotator();
    }
  },

  clickHandler: (cellNumber) => {
    var element = document.getElementById(cellNumber);
    var xOrO = 'X';
    if (element.innerText !== '__') {
      alert('This box has already been checked, please try again');
    } else {
      if (!GameState.xTurn) {
        xOrO = 'O';
        GameState.xTurn = true;
      } else {
        GameState.xTurn = false;
      }
      element.style = 'color: black';
      element.innerText = xOrO;

      UserInput.addPiece(cellNumber, xOrO);
      GameState.clicked++;
      if (GameState.clicked === 9) {
        PresentationFunctions.boardChecker();
      }
    }
  },

  resetGame: () => {
    GameState.clicked = 0;
    GameState.xWins = false;
    GameState.oWins = false;
    var element = document.getElementById('winner').innerText = '';
    var tableButtons = document.getElementsByClassName('table');
    for (let button of tableButtons) {
      button.innerText = '__';
      button.style = 'color: white';
    }
    if (GameState.winnerLastRound === 'X') {
      GameState.xTurn = true;
    } else {
      GameState.xTurn = false;
    }
    //animate table back to zero
    var table = document.getElementById('rotate');
    if (GameState.gravity) {
      table.animate([
        {'transform': `rotate(${GameState.rotated}deg)`},
        {'transform': `rotate(0deg)`}
      ], {duration: 1000}
      );
    }
    table.style = `transform: rotate(0deg)`;
    GameState.rotated = 0;
  },

  resetScore: () => {
    document.getElementById('xscore').innerText = 'X: 0';
    document.getElementById('oscore').innerText = 'O: 0';
  }
};

var PresentationFunctions = {
  boardChecker: () => { // runs after all boxes have been clicked
    var PF = PresentationFunctions;
    for (let z = 0; z < 2; z++) {
      var xOrO = 'X';
      if (z === 1) {xOrO = 'O'}
      if (xOrO === GameState.board[1][1]) {
        if (PF.checkDiagonalRight(xOrO) || PF.checkDiagonalLeft(xOrO)) {
          if (xOrO === 'X') {GameState.xWins = true;}
          if (xOrO === 'O') {GameState.oWins = true;}
          break;
        }
      }
      for (let i in GameState.board) {
        if (PF.checkHorizontal(i, xOrO)) {
          if (xOrO === 'X') {GameState.xWins = true;}
          if (xOrO === 'O') {GameState.oWins = true;}
          break;
        } else if (PF.checkVertical(i, xOrO)) {
          if (xOrO === 'X') {GameState.xWins = true;}
          if (xOrO === 'O') {GameState.oWins = true;}
          break;
        }
      }
    }
    return PF.displayWinner();
  },

  displayWinner: () => {
    var PF = PresentationFunctions;
    var element = document.getElementById('winner');
    var winningText = '';
    if (GameState.xWins === true && GameState.oWins === true) {
      winningText = 'Cool! You both won this time!';
      PF.logWinners('XO');
    } else if (GameState.xWins === true) {
      winningText = 'Xzibiting skillz! X\'s win!';
      GameState.winnerLastRound = 'X';
      PF.logWinners('X');
    } else if (GameState.oWins === true) {
      winningText = 'Ooh yeah! O\'s win!';
      GameState.winnerLastRound = 'O';
      PF.logWinners('O');
    } else {
      var xOrO = 'X';
      if (GameState.winnerLastRound === 'X') {
        GameState.winnerLastRound = 'O';
        xOrO = 'O';
      } else {
        GameState.winnerLastRound = 'X';
      }
      winningText = `You guys both lose. Ouch!
                    ${xOrO}\'s get a turn first this round.`;
    }
    return element.innerText = winningText;
  },

  logWinners: (xOrO) => {
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
  },

  checkHorizontal: (row, xOrO) => {
    for (let element of GameState.board[row]) {
      if (element !== xOrO) {
        return false;
      }
    }
    return true;
  },

  checkVertical: (col, xOrO) => {
    for (let i = 0; i < 3; i++) {
      if (GameState.board[i][col] !== xOrO) {
        return false;
      }
    }
    return true;
  },

  checkDiagonalRight: (xOrO) => {
    var win = true;
    for (let i = 0; i < 3; i+=2) {
      if (GameState.board[i][i] !== xOrO) {
        win = false;
      }
    }
    return win;
  },

  checkDiagonalLeft: (xOrO) => {
    var win = true;
    if (GameState.board[0][2] !== xOrO || GameState.board[2][0] !== xOrO) {
      win = false;
    }
    return win;
  }
};