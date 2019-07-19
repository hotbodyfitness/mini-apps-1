var checkDiagDown = (board) => {
  var diagDown = [[], [], [], [], [], []];

  for (let value of board) {
    if (Number(value[0]) - Number(value[1]) === 2) {
      diagDown[0].push(value[0]);
    } else if (Number(value[0]) - Number(value[1]) === 1) {
      diagDown[1].push(value[1]); // pushing 2nd number so I can check it with same numbers as diagDown[4] (0-4)
    } else if (Number(value[0]) - Number(value[1]) === 0) {
      diagDown[2].push(value[0]);
    } else if (Number(value[0]) - Number(value[1]) === (-1)) {
      diagDown[3].push(value[0]);
    } else if (Number(value[0]) - Number(value[1]) === (-2)) {
      diagDown[4].push(value[0]);
    } else if (Number(value[0]) - Number(value[1]) === (-3)) {
      diagDown[5].push(value[0]);
    }
  }
  if (diagDown[0].length === 4 || diagDown[5].length === 4) {
    return true;
  }
  if (diagDown[1].length >= 4) {
    if (diagDown[1].includes('2')) {
      if (diagDown[1].includes('1') && diagDown[1].includes('3')) {
        if (diagDown[1].includes('0') || diagDown[1].includes('4')) {
          return true;
        }
      }
    }
  }
  if (diagDown[4].length >= 4) {
    if (diagDown[4].includes('2')) {
      if (diagDown[4].includes('1') && diagDown[4].includes('3')) {
        if (diagDown[4].includes('0') || diagDown[4].includes('4')) {
          return true;
        }
      }
    }
  }
  if (diagDown[2].length >= 4) {
    if (diagDown[2].includes('2') && diagDown[2].includes('3')) {
      if (diagDown[2].includes('1')) {
        if (diagDown[2].includes('0') || diagDown[2].includes('4')) {
          return true;
        }
      }
      if (diagDown[2].includes('4')) {
        if (diagDown[2].includes('1') || diagDown[2].includes('5')) {
          return true;
        }
      }
    }
  }
  if (diagDown[3].length >= 4) {
    if (diagDown[3].includes('2') && diagDown[3].includes('3')) {
      if (diagDown[3].includes('1')) {
        if (diagDown[3].includes('0') || diagDown[3].includes('4')) {
          return true;
        }
      }
      if (diagDown[3].includes('4')) {
        if (diagDown[3].includes('1') || diagDown[3].includes('5')) {
          return true;
        }
      }
    }
  }
  return false;
};

export default checkDiagDown;