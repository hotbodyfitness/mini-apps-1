var Score = ({ score, message, refresh, turn }) => {
  var styleScoreText = {
    marginLeft: '42px', background: '#afd7f0', marginTop: '20px', padding: '10px', border: '2px solid white', width: '75px', zoom: '120%'
  };
  var redSquare = {
    background: 'red', color: 'white', marginTop: '20.7px', paddingTop: '5px', fontSize: '25.8px', border: '2px solid white', width: '75px', zoom: '116%'
  };
  var blackSquare = {
    background: 'black', color: 'white', marginTop: '20.7px', paddingTop: '5px', fontSize: '25.86px', border: '2px solid white', width: '75px', zoom: '116%'
  };
  var winningMessage = {
    marginLeft: '73px', top: '30px', fontSize: '28px', padding: '5px', position: 'relative'
  };
  var buttonStyle = { padding: '10px', position: 'absolute', top: '605px', right: '45px', zoom: '130%' }
  var turnStyle = { fontSize: '25.86px', position:'absolute', top: '795px', right: '200px' }
  var turnUpper = turn.toUpperCase();
  return (
    <div style={{display: 'flex'}}>
      <div style={{display: 'flex', justifyContent: 'flexStart', alignItems: 'flexStart'}}>
        <div style={styleScoreText}><b>Scoreboard</b></div>
        <div style={redSquare}><center><b>{score[0]}</b></center></div>
        <div style={blackSquare}><center><b>{score[1]}</b></center></div>
        <div style={winningMessage}><b>{message}</b></div>
      </div>
      <div style={turnStyle}>Turn: <b>{turnUpper}</b></div>
      <button onClick={refresh} style={buttonStyle}><b>New Game</b></button>
    </div>
  );
};

export default Score;