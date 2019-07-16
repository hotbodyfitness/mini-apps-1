var Forms = [
  {
    pageName: 'Page F0',
    fields: 0,
    prefix: [''],
    type: ['', '', '', '', 'submit'],
    placeholder: [''],
    value: ['', '', '', '', 'Checkout'],
    hidden: ['display:none', 'visibility:hidden', true]
  },
  {
    pageName: 'Page F1',
    fields: 3,
    prefix: ['Name: ', 'Email: ', 'Password: ', '', ''],
    type: ['text', 'text', 'text', '', 'submit'],
    placeholder: ['Your Name', 'email@url.com', 'un1quePa55word', '', ''],
    value: ['', '', '', '', 'Next']
  },
  {
    pageName: 'Page F2',
    fields: 6,
    prefix: ['Street Address: ', 'City, State: ', 'Zip Code: ', 'Phone #: ', ''],
    type: ['text', 'text', 'number', 'text', 'submit'],
    placeholder: ['123 Oak St.', 'Anywhere, CA', '99999', '600-555-4321', ''],
    value: ['', '', '', '', 'Next']
  },
  {
    pageName: 'Page F3',
    fields: 4,
    prefix: ['Credit Card #: ', 'Exp: ', 'CVV code: ', 'Billing Zip Code: ', ''],
    type: ['number', 'number', 'number', 'number', 'submit'],
    placeholder: ['1234567887654321', '1220', '333', '99999', ''],
    value: ['', '', '', '', 'Next']
  },
  {
    pageName: 'Confirmation Page F4',
    fields: 0,
    prefix: [''],
    type: ['', '', '', '', 'submit'],
    placeholder: [''],
    value: ['', '', '', '', 'Purchase']
  }
];

// var Inputs = (props) => {
// var inputThis = '';
// var formObj = props.forms[props.key];
// for (let i = 0; i < formObj.fields; i++) {
//   inputThis += `<p>${formObj.prefix[i]}</p><input type=${formObj.type[i]} placeholder=${formObj.placeholder[i]}></input>`;
// }
//   return (
//     <div>{inputThis}</div>
//   );
// };

class FormNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: 0,
      formName: 'F0'
    };
  }

  componentDidMount() {
    this.setState({
      form: 0
    });
  }

  onCheckout(event) {
    event.preventDefault();
    if (this.state.form === 4) {
      this.setState({
        form: 0
      });
    } else {
      this.setState({
        form: this.state.form + 1
      });
    }
  }

  render() {
    var formObj = this.props.forms[this.state.form];
    return (
      <div id={JSON.stringify(this.state.form)}>
        <form>
          <legend>F{this.state.form} page</legend>
          <fieldset>
            {/* {formObj.prefix.map((e, i) => { // using formObj.prefix because it has the correct number of indexes
              <p>{formObj.prefix[i]}</p> <input type={formObj.type[i]} placeholder={formObj.placeholder[i]}></input>
            })} */}
            {/* <Inputs forms={this.props.forms} key={this.state.form} /> */}
            <p>{formObj.prefix[0]}</p><input type={formObj.type[0]} placeholder={formObj.placeholder[0]}></input>
            <p>{formObj.prefix[1]}</p><input type={formObj.type[1]} placeholder={formObj.placeholder[1]}></input>
            <p>{formObj.prefix[2]}</p><input type={formObj.type[2]} placeholder={formObj.placeholder[2]}></input>
            <p>{formObj.prefix[3]}</p><input type={formObj.type[3]} placeholder={formObj.placeholder[3]}></input>
            <p>{formObj.prefix[4]}</p><input type={formObj.type[4]} onClick={this.onCheckout.bind(this)} value={formObj.value[4]}></input>
          </fieldset>
        </form>
      </div>
    );
  }
}

var App = (props) => (
  <div>
    <h1><u>Multistep Checkout Experience</u></h1>
    <div>
      <FormNumber forms={Forms} />
    </div>
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
