var checkHorizontal = (board) => {
  var checkRows = {
    '0': [], '1': [], '2': [], '3': [], '4': [], '5': []
  }
  for (let value of board) {
    checkRows[value[0]].push(value[1]);
  }
  for (let colArray in checkRows) {
    if (checkRows[colArray].length > 3) {
      // see if there's 4 in a row
      var zero, one, two, three, four, five, six = false;
      for (let num of checkRows[colArray]) {
        if      (num === '0') { zero = true; }
        else if (num === '1') { one = true; }
        else if (num === '2') { two = true; }
        else if (num === '3') { three = true; }
        else if (num === '4') { four = true; }
        else if (num === '5') { five = true; }
        else if (num === '6') { six = true; }
      }
      if (three) {
        if (zero && one && two) {
          return true;
        } else if (one && two && four) {
          return true;
        } else if (two && four && five) {
          return true;
        } else if (four && five && six) {
          return true;
        }
      }
    }
  }
  return false;
};

export default checkHorizontal;

// console.log(checkHorizontal(['01', '03', '05', '04', '06']));