var Board = () => {
  var styler = {
    margin: '0 50px', display: 'grid', gridGap: 0,
    gridTemplateRows: 'repeat(auto)', gridTemplateColumns: 'repeat(auto)', border: '2px solid #858585'
  };

  var boardStyleArray = [];
  for (let row = 1; row <= 6; row++) {
    for (let col = 1; col <= 7; col++) {
      var obj = {
        id: JSON.stringify(row - 1) + (col - 1),
        style: { gridColumnStart: col, gridRowStart: row,
                 background: '#fae01b', padding: '15px 0', textAlign: 'center', border: '1px solid #c2c2c2'
                }
      };
      boardStyleArray.push(obj);
    }
  }
  var squareStyle = {borderRadius: '50%', background: '#afd7f0', height: '75px', width: '75px' }
  var cells = 'cells';
  return (
    <div>
      <span style={styler}>
        {boardStyleArray.map((e) => {
          return (<div style={e.style} key={e.id}><center><div style={squareStyle} className={cells} id={e.id}></div></center></div>)
        })}
      </span>
    </div>
  );
};

export default Board;