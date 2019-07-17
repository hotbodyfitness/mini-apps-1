var express = require('express');
var app = express();
var db = require('./database');
var bodyParser = require('body-parser');
app.listen(8080, () => {
  console.log('Express is listening on port 8080');
});

// serve up public folder and its files which includes the compiled app.js
app.use(express.static('public'));
app.use(express.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  // console.log('TYPEOF REQ.BODY : ', typeof req.body);
  // console.log('REQ.BODY : ', req.body);

  db.query('SELECT ? FROM users', [req.body['Name:']], (err, res, data) => {
    if (err) {
      console.log('user doesn\'t exist');
      var queryArgs = ['fullname', 'email', 'pass'];
      Object.values(req.body).forEach((e) => {queryArgs.push(e)});
      console.log('queryArgs', queryArgs);
      db.query('INSERT INTO users(?, ?, ?) VALUES (?, ?, ?)', queryArgs, (err, res) => {
        if (err) {
          console.log('could not post');
        } else {
          console.log('Successful dbQuery!');
        }
      });
    } else {
      console.log('add to user, here is RESULTS:', res);
    }
  });

  res.end();
});
