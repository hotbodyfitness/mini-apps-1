import ConnectFour from './components/ConnectFour.jsx';

var App = (props) => (
  <div>
    <center><h2>Connect Four</h2></center>
    <ConnectFour />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);