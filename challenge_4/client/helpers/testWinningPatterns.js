// var expect = require('chai').expect;
// var assert = require('chai').assert;
// var should = require('chai').should();
// var checkWinner = require('../client/helpers/checkWinner.js'); // require is only for node
import checkWinner from './checkWinner.js';

describe('Test Winning Boards', () => {
  // before(() => {
  // });

  var boardDiagDown = ['00', '11', '22', '33'];
  var checkDiagDown = checkWinner(boardDiagDown, 'red');
  it('Should pass for Diagonal-Down (4 in a row from upper left to lower right)', () => {
    expect(checkDiagDown).to.equal('red');
  });

  var boardDiagUp = ['50', '41', '32', '23'];
  var checkDiagUp = checkWinner(boardDiagUp, 'black');
  it('Should pass for Diagonal-Up (4 in a row from lower left to upper right)', () => {
    expect(checkDiagUp).to.equal('black');
  });

  var boardHorizontal = ['00', '01', '02', '03'];
  var checkHorizontal = checkWinner(boardHorizontal, 'red');
  it('Should pass for Horizontal (4 in a row on the same row)', () => {
    expect(checkHorizontal).to.equal('red');
  });

  var boardVertical = ['05', '15', '25', '35'];
  var checkVertical = checkWinner(boardVertical, 'black');
  it('Should pass for Vertical (4 in a row on the same column)', () => {
    expect(checkVertical).to.equal('black');
  });

});