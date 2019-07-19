var Score = ({score, message}) => {
  var grid = {};
  var styleScoreText = {
    marginLeft: '42px', background: '#afd7f0', marginTop: '20px', padding: '10px', border: '2px solid white', width: '75px', zoom: '120%'
  };
  var redSquare = {
    marginLeft: '145px', background: 'red', color: 'white', fontSize: '25.8px', padding: '5px', marginTop: '-43.5px', border: '2px solid white', width: '75px', zoom: '116%'
  };
  var blackSquare = {
    marginLeft: '233px', background: 'black', color: 'white', fontSize: '25.86px', padding: '5px', marginTop: '-42.5px', border: '2px solid white', width: '75px', zoom: '116%'
  };
  var winningMessage = {
    marginLeft: '393px', marginTop: '-40px', fontSize: '22px', padding: '5px'
  };
  return (
    <div>
      <div style={styleScoreText}><b>Scoreboard</b></div>
      <div style={redSquare}><center><b>{score[0]}</b></center></div>
      <div style={blackSquare}><center><b>{score[1]}</b></center></div>
      <div style={winningMessage}><b>{message}</b></div>
    </div>
  );
};

export default Score;