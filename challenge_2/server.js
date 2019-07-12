var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var JSONtoCSV = require('express-json-2-csv');
// var jsonfile = require('jsonfile');
// var fs = require('fs');
// var FileReader = require('filereader');

app.listen(8080, () => {
  console.log('Express is listening on port 8080');
});

app.use(express.static('client'));
app.use(bodyParser.json(/*{ type: 'application/*+json' }*/));
app.use(express.urlencoded({ extended: false })); // for <textarea>
app.use(JSONtoCSV());

app.post('/', (req, res) => {
  var obj = req.body.Zack;
  console.log('obj', obj);
  // fs.readFile(obj, 'utf8', (err, result) => {
  //   if (err) {
  //     console.log('ERROR');
  //   } else {
  //     console.log('PARSED!', JSON.parse(result));
  //   }
  // });

  // if (obj[obj.length-1] === ';') {  // for <textarea>
  //   obj = obj.slice(0, -1);
  // }
  // var obj1 = JSON.parse(obj);

  var columns = Object.keys(obj1).slice(0, -1); // removes children column
  var finalCSVarray = [columns];

  var recurse = (object) => {
    finalCSVarray.push(Object.values(object).slice(0, -1));

    // handles extra keys that may not be on the parent
    var keys = Object.keys(object).slice(0, -1);
    for (let key of keys) {
      if (!finalCSVarray[0].includes(key)) {
        finalCSVarray[0].push(key);
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

  var csv = res.csv(finalCSVarray);
  res.send(csv);
});