var express = require('express');
var app = express();
var db = require('./database');
var bodyParser = require('body-parser');
app.listen(8080, () => {
  console.log('Express is listening on port 8080');
});

// serve up public folder and its files which includes the compiled app.js
app.use(express.static('public'));
// app.use(express.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  cnosole.log('TYPEOF REQ.BODY : ', typeof req.body);
  cnosole.log('REQ.BODY : ', req.body);
  res.end();
});
