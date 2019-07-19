import handlePlayPiece from '../helpers/handlePlayPiece';

var PlayButtons = ({boardArray, handleClick, colorBoard}) => {
var gridStyle = {
  display: 'grid', gridTemplateRows: 'repeat(auto)', gridTemplateColumns: 'repeat(auto)',
  margin: '0 50px', borderTop: '2px solid #858585', borderLeft: '2px solid #858585', borderRight: '2px solid #858585'
};
var buttonArray = [];
for (let i = 1; i <= 7; i++) {
  var obj = {padding: '5px', zoom: '140%', color: 'grey', gridColumnStart: i, gridRowStart: 1}
  buttonArray.push(obj);
}
var play = 'play';
  return (
    <div className={play} style={gridStyle}>
      {buttonArray.map((e, col) => {
        return (<button style={e} key={col} onClick={() => (handlePlayPiece(col, boardArray, colorBoard, handleClick))}>Play ⬇︎ Here</button>);
      })}
    </div>
    );
};

export default PlayButtons;