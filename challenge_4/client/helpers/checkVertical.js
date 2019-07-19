var checkVertical = (board) => {
  var checkCols = {
    '0': [], '1': [], '2': [], '3': [], '4': [], '5': [], '6': []
  }
  for (let value of board) {
    checkCols[value[1]].push(value[0]);
  }
  for (let rowArray in checkCols) {
    if (checkCols[rowArray].length > 3) {
      // see if there's 4 in a col
      var zero, one, two, three, four, five = false;
      for (let num of checkCols[rowArray]) {
        if      (num === '0') { zero = true; }
        else if (num === '1') { one = true; }
        else if (num === '2') { two = true; }
        else if (num === '3') { three = true; }
        else if (num === '4') { four = true; }
        else if (num === '5') { five = true; }
      }
      if (two && three) {
        if (zero && one) {
          return true;
        } else if (one && four) {
          return true;
        } else if (four && five) {
          return true;
        }
      }
    }
  }
  return false;
};

export default checkVertical;