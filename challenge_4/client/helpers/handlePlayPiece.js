var handlePlayPiece = (col, boardArray, colorBoard, handleClick) => {
var board = boardArray.slice();
var playerBoard = colorBoard.slice();
var row = 6;
  for (let i = 0; i < board.length; i++) {
    if (board[i][1] == JSON.stringify(col)) {
      if (Number(board[i][0]) < row) { // because we're decrementing the rows
        row = Number(board[i][0]);
      }
    }
  }
  var position = JSON.stringify(row - 1) + col;
  if (row > 0) {
    // play piece
    board.push(position);
    playerBoard.push(position);
    handleClick(board, position, playerBoard);
  } // else { can't play piece bc the col is full }
};

export default handlePlayPiece;