var checkDiagUp = (board) => {
  var diagUp = [[], [], [], [], [], []];

  for (let value of board) {
    if ((Number(value) - 26) % 9 === 0) {
      diagUp[0].push(value[0]);
    } else if ((Number(value) - 16) % 9 === 0) {
      diagUp[1].push(value[0]);
    } else if ((Number(value) - 6) % 9 === 0) {
      diagUp[2].push(value[0]);
    } else if ((Number(value) - 5) % 9 === 0) {
      diagUp[3].push(value[0]);
    } else if ((Number(value) - 4) % 9 === 0) {
      diagUp[4].push(value[0]);
    } else if ((Number(value) - 3) % 9 === 0) {
      diagUp[5].push(value[0]);
    }
  }
  if (diagUp[0].length === 4 || diagUp[5].length === 4) {
    return true;
  }
  if (diagUp[1].length >= 4) {
    if (diagUp[1].includes('3')) {
      if (diagUp[1].includes('2') && diagUp[1].includes('4')) {
        if (diagUp[1].includes('1') || diagUp[1].includes('5')) {
          return true;
        }
      }
    }
  }
  if (diagUp[4].length >= 4) {
    if (diagUp[4].includes('2')) {
      if (diagUp[4].includes('1') && diagUp[4].includes('3')) {
        if (diagUp[4].includes('0') || diagUp[4].includes('4')) {
          return true;
        }
      }
    }
  }
  if (diagUp[2].length >= 4) {
    if (diagUp[2].includes('2') && diagUp[2].includes('3')) {
      if (diagUp[2].includes('1')) {
        if (diagUp[2].includes('0') || diagUp[2].includes('4')) {
          return true;
        }
      }
      if (diagUp[2].includes('4')) {
        if (diagUp[2].includes('1') || diagUp[2].includes('5')) {
          return true;
        }
      }
    }
  }
  if (diagUp[3].length >= 4) {
    if (diagUp[3].includes('2') && diagUp[3].includes('3')) {
      if (diagUp[3].includes('1')) {
        if (diagUp[3].includes('0') || diagUp[3].includes('4')) {
          return true;
        }
      }
      if (diagUp[3].includes('4')) {
        if (diagUp[3].includes('1') || diagUp[3].includes('5')) {
          return true;
        }
      }
    }
  }
  return false;
};

export default checkDiagUp;