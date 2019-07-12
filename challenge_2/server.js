var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var path = require('path').join(__dirname, '/client/index.html');
// var JSONtoCSV = require('express-json-2-csv');
var { Parser } = require('json2csv');
var fs = require('file-system');

app.listen(8080, () => {
  console.log('Express is listening on port 8080');
});

app.use(express.static('client'));
app.use(bodyParser.json(/*{ type: 'application/*+json' }*/));
app.use(express.urlencoded({ extended: false })); // for <textarea>
// app.use(JSONtoCSV());

app.post('/', (req, res) => {
  // var obj = req.body.Zack; // for <textarea>
  // if (obj[obj.length - 1] === ';') { // for <textarea>
  //   obj = obj.slice(0, -1);
  // }
  // var obj1 = JSON.parse(obj); // for <textarea>

  var obj1 = req.body;

  var columns = Object.keys(obj1).slice(0, -1); // removes "children" key from columns
  var finalCSVarray = [];

  var recurse = (object) => {
    finalCSVarray.push(Object.values(object).slice(0, -1));

    // handles extra keys that may not be on the parent
    var keys = Object.keys(object).slice(0, -1);
    for (let key of keys) {
      if (!columns.includes(key)) {
        columns.push(key);
      }
    }
    if (Object.keys(object).includes('children')) {
      var index = Object.keys(object).indexOf('children');
      var children = Object.values(object)[index];
      if (children.length > 0) {
        for (let each of children) {
          recurse(each);
        }
      }
    }
  };
  recurse(obj1);
  finalCSVarray.unshift(columns);
  // var csv = res.csv(finalCSVarray);
  var json2csvParser = new Parser({ columns });
  var csv = json2csvParser.parse(finalCSVarray);
  fs.writeFile('client.csv', csv, (err) => {
    if (err) { console.log(err);
    } else {
      res.sendFile('client.csv', {root: __dirname}, (err) => {
        if (err) { console.log(err);
        } else { console.log('Sent: client.csv'); res.end();}
      });
    }
  });

});