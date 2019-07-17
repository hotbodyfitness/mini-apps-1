var Forms = [
  {
    pageName: 'Page F0',
    prefix: [''],
    type: ['', '', '', '', '', 'submit'],
    placeholder: [''],
    value: ['', '', '', '', '', 'Checkout'],
    hidden: [true, true, true, true, true, false]
  },
  {
    pageName: 'Page F1',
    prefix: ['Name: ', 'Email: ', 'Password: ', '', '', ''],
    type: ['text', 'text', 'text', '', '', 'submit'],
    placeholder: ['Your Name', 'email@url.com', 'un1quePa55word', '', '', ''],
    value: ['', '', '', '', '', 'Next'],
    hidden: [false, false, false, true, true, false]
  },
  {
    pageName: 'Page F2',
    prefix: ['Street Address: ', 'City: ', 'State: ', 'Zip Code: ', 'Phone #: ', ''],
    type: ['text', 'text', 'text', 'number', 'text', 'submit'],
    placeholder: ['123 Oak St.', 'Anywhere', 'CA', '99999', '600-555-4321', ''],
    value: ['', '', '', '', '', 'Next'],
    hidden: [false, false, false, false, false, false]
  },
  {
    pageName: 'Page F3',
    prefix: ['Credit Card #: ', 'Exp: ', 'CVV code: ', 'Billing Zip Code: ', '', ''],
    type: ['number', 'number', 'number', 'number', '', 'submit'],
    placeholder: ['1234567887654321', '1220', '333', '99999', '', ''],
    value: ['', '', '', '', '', 'Next'],
    hidden: [false, false, false, false, true, false]
  },
  {
    pageName: 'Confirmation Page F4',
    prefix: [''],
    type: ['', '', '', '', '', 'submit'],
    placeholder: [''],
    value: ['', '', '', '', '', 'Purchase'],
    hidden: [true, true, true, true, true, false]
  }
];

var CompletedForm = ({ params }) => {
  var circle = "circle";
  var arrConcat = [];
  params.params.forEach((e) => {
    arrConcat = arrConcat.concat(e);
  });
  // console.log('arrConcat', arrConcat);
  return (
    <div><ul>
      <h4><u>Account Summary</u></h4>
      {arrConcat.map((e, i) => {
        return (<li type={circle} key={i}><b>{e[0]}: </b>{e[1]}</li>);
      })}
    </ul></div>
  );
};

var sendAjaxToServer = (params) => {
  // var data = params.flat().flat();
  var data = params.flat();
  var obj = {};
  data.forEach((e) => { obj[e[0]] = e[1] });
  // console.log('AJAX OBJ: ', obj);
  $.ajax({
    method: 'POST',
    data: obj,
    success: (res) => { console.log('Successful Post!') }
  });
};

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

/* <Inputs forms={this.props.forms} key={this.state.form} /> */

class FormNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: 0,
      params: []
    };
  }

  componentDidMount() {
    this.setState({
      form: 0,
      params: []
    });
  }

  onCheckout(event) {
    event.preventDefault();
    var id0 = document.getElementById('0');
    var class0 = document.getElementsByClassName('0')[0].innerText;
    var id1 = document.getElementById('1');
    var class1 = document.getElementsByClassName('1')[0].innerText;
    var id2 = document.getElementById('2');
    var class2 = document.getElementsByClassName('2')[0].innerText;
    var id3 = document.getElementById('3');
    var class3 = document.getElementsByClassName('3')[0].innerText;
    var id4 = document.getElementById('4');
    var class4 = document.getElementsByClassName('4')[0].innerText;
    var allIds = [id0, id1, id2, id3, id4];
    var allclasses = [class0, class1, class2, class3, class4];
    var ids = [];

    for (let n = 0; n < 5; n++) {
      if (allIds[n] === null) {
        break;
      } else {
        var obj = [];
        allclasses[n] = allclasses[n].slice(0, -1); // gets rid of ':'
        obj[0] = `${allclasses[n]}`;
        obj[1] = `${allIds[n].value}`;
        ids.push(obj);
      }
    }

    if (this.state.form === 4) {
      this.setState({
        form: 0,
        params: []
      });
    } else if (this.state.form === 0) {
      this.setState({
        form: this.state.form + 1
      });
    } else {
      var newParams = this.state.params;
      newParams.push(ids);
      this.setState({
        form: this.state.form + 1,
        params: newParams
      });
    }
    sendAjaxToServer(this.state.params);

    // zeroing out the user-entered values below
    if (id0 !== null) { id0.value = ''; id1.value = ''; id2.value = ''; }
    if (id4 !== null) { id3.value = ''; id4.value = ''; }
  }

  render() {
    var formObj = this.props.forms[this.state.form];
    var ids = ['0', '1', '2', '3', '4'];
    // console.log(this.state.params);
    return (
      <div>
        <form>
          <legend>F{this.state.form} page</legend>
          <fieldset>
            {/* {formObj.prefix.map((e, i) => { // using formObj.prefix because it has the correct number of indexes
              <p>{formObj.prefix[i]}</p> <input type={formObj.type[i]} placeholder={formObj.placeholder[i]}></input>
            })} */}
            <div>{this.state.form === 4 ? <CompletedForm params={this.state} /> : <p hidden></p>}</div>
            <p className={ids[0]}>{formObj.prefix[0]}</p>{formObj.hidden[0] ? <input hidden></input> : <input type={formObj.type[0]} id={ids[0]} placeholder={formObj.placeholder[0]}></input>}
            <p className={ids[1]}>{formObj.prefix[1]}</p>{formObj.hidden[1] ? <input hidden></input> : <input type={formObj.type[1]} id={ids[1]} placeholder={formObj.placeholder[1]}></input>}
            <p className={ids[2]}>{formObj.prefix[2]}</p>{formObj.hidden[2] ? <input hidden></input> : <input type={formObj.type[2]} id={ids[2]} placeholder={formObj.placeholder[2]}></input>}
            <p className={ids[3]}>{formObj.prefix[3]}</p>{formObj.hidden[3] ? <input hidden></input> : <input type={formObj.type[3]} id={ids[3]} placeholder={formObj.placeholder[3]}></input>}
            <p className={ids[4]}>{formObj.prefix[4]}</p>{formObj.hidden[4] ? <input hidden></input> : <input type={formObj.type[4]} id={ids[4]} placeholder={formObj.placeholder[4]}></input>}
            <p>{formObj.prefix[5]}</p><input type={formObj.type[5]} onClick={this.onCheckout.bind(this)} value={formObj.value[5]}></input>
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
