import checkHorizontal from "./checkHorizontal";
import checkVertical from "./checkVertical";
import checkDiagDown from "./checkDiagDown";
import checkDiagUp from "./checkDiagUp";

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