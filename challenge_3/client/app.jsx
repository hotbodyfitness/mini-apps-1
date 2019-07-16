class App extends React.Component {
  constructor(props) {
    super(props);
  }

  F1() {
    return (
      <div id="f1page">
        <form>
          <legend>Page F1</legend>
          <fieldset>
            <p>Name: </p><input type="text" defaultValue="Your Name"></input>
            <p>Email: </p><input type="text" defaultValue="email@url.com"></input>
            <p>Password: </p><input type="text" defaultValue="un1quePa55word"></input>
          </fieldset>
        </form>
      </div>
    );
  }

  onCheckout(event) {
    event.preventDefault();
    var page = document.getElementById(f0page);
    $(page).html(this.F1);
  }

  render() {
    return (
      <div>
        <h1><u>Multistep Checkout Experience</u></h1>
        <form id="f0page">
        <input type="submit" value="Checkout" onClick={this.onCheckout.bind(this)}></input>
        </form>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
