import checkHorizontal from "./checkHorizontal.js";
import checkVertical from "./checkVertical.js";
import checkDiagDown from "./checkDiagDown.js";
import checkDiagUp from "./checkDiagUp.js";

var checkWinner = (colorBoard, playerTurn) => {
  var winner;
  if (checkHorizontal(colorBoard) || checkVertical(colorBoard) ||
      checkDiagDown(colorBoard) || checkDiagUp(colorBoard)) {
    winner = playerTurn;
  } else {
    winner = false;
  }
  return winner;
};

export default checkWinner;