var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.listen(8080);

app.use(express.static('public')); // or /public
app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('TYPEOF req.body', typeof req.body);
  console.log('REQ.BODY', req.body);

  res.statusCode = 201;
  res.end();
});