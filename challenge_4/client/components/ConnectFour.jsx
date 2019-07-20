import React from 'react';
import Board from './Board.jsx'; // when it's .jsx it must be explicitly referenced here
import PlayButtons from './PlayButtons.jsx';
import Score from './Score.jsx';
import checkWinner from '../helpers/checkWinner.js';

class ConnectFour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      redBoard: [],
      blackBoard: [],
      winningMessage: '',
      lastWinner: '',
      turn: 'red',
      movesTaken: 0,
      score: [0, 0] // red, black
    }
  }

  // componentDidMount() {
  // }
  refreshState() {
    var cells = document.getElementsByClassName('cells');
    for (let i = 0; i < 42; i++) {
      cells[i].style = `border-radius: 50%; background: #afd7f0; height: 75px; width: 75px`;
    }
    this.setState({
      board: [],
      redBoard: [],
      blackBoard: [],
      lastWinner: '',
      winningMessage: '',
      movesTaken: 0
    });
  }

  handleClick(newBoard, newPosition, newColorBoard) {
    var placePiece = document.getElementById(newPosition);
    placePiece.style = `border-radius: 50%; background: ${this.state.turn}; height: 75px; width: 75px`;
    var playerTurn = this.state.turn;
    if (playerTurn === 'black') {
      var winnerBlack = checkWinner(newColorBoard, playerTurn);
      var winnerRed = checkWinner(this.state.redBoard, 'red');
    } else {
      var winnerBlack = checkWinner(this.state.blackBoard, 'black');
      var winnerRed = checkWinner(newColorBoard, playerTurn); // returns color of winner or false
    }
     // returns color of winner or false
    console.log(this.state.movesTaken);
    if (winnerBlack || winnerRed) {
      if (!this.state.winningMessage && (this.state.movesTaken - 1) % 2 === 0) { // both players have had equal turns
        if (winnerRed && winnerBlack) {
          this.setState({
            winningMessage: 'It\'s a tie!',
            score: [(this.state.score[0] + 1), (this.state.score[1] + 1)]
          });
        } else if (winnerBlack) {
          this.setState({
            winningMessage: 'Black wins!',
            score: [this.state.score[0], (this.state.score[1] + 1)],
            lastWinner: 'black',
            turn: 'black'
          });
        } else if (winnerRed) {
          this.setState({
            winningMessage: 'Red wins!',
            score: [(this.state.score[0] + 1), this.state.score[1]],
            lastWinner: 'red',
            turn: 'red'
          });
        }
      }
    }
    console.log('SCORE', this.state.score);

    this.setState({
      board: newBoard,
      movesTaken: this.state.movesTaken + 1,
      redBoard: playerTurn === 'black' ? this.state.redBoard : newColorBoard,
      blackBoard: playerTurn === 'red' ? this.state.blackBoard : newColorBoard,
      turn: playerTurn === 'red' ? 'black' : 'red',
    });
    if (newBoard.length === 42) { // board is full
      // clear boards and log a game over
      this.setState({
        board: [],
        redBoard: [],
        blackBoard: [],
        winningMessage: 'No win this time'
      });
    }
  }

  render() {
    var colorBoard = (this.state.turn === 'red') ? this.state.redBoard : this.state.blackBoard;
    var buttonStyle = {padding: '10px', position: 'absolute', top: '598px', right: '45px', zoom: '130%'}
    return (
      <div>
        <PlayButtons boardArray={this.state.board} handleClick={this.handleClick.bind(this)} colorBoard={colorBoard} />
        <Board />
        <Score score={this.state.score} message={this.state.winningMessage} />
        <button onClick={this.refreshState.bind(this)} style={buttonStyle}><b>New Game</b></button>
      </div>
    );
  }
}

export default ConnectFour;