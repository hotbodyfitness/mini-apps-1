var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var $ = require('jquery');

app.listen(8080, () => {
  console.log('Express is listening on port 8080');
});

app.use(express.static('client'));
// app.use(bodyParser.json(/*{ type: 'application/*+json' }*/));
// app.use(bodyParser.text({ type: 'text/html' }));
app.use(express.urlencoded({extended:false}));
// app.use(bodyParser.urlencoded({extended:true}));

app.post('/', (req, res) => {
  // console.log('REQUEST************', req);
  console.log('JSON.stringify REQ.body***********', req.body);
  res.end();
  // res.render('index');
});

// module.exports = app;