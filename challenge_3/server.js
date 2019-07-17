var express = require('express');
var app = express();
var db = require('./database');
var bodyParser = require('body-parser');
app.listen(8080, () => {
  console.log('Express is listening on port 8080');
});

// serve up public folder and its files which includes the compiled app.js
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

var pagef0query = () => {
  db.query('INSERT INTO users (fullname, email, pass) VALUES (null, null, null)', (err, res) => {
    if (err) {
      console.log('pageF0query ERROR', err);
    } else {
      console.log('Successful F0!');
    }
  });
};
var pageF1query = (queryArgs) => {
  db.query('UPDATE users SET fullname = ?, email = ?, pass = ? WHERE id = ?', queryArgs, (err, res) => {
    if (err) {
      console.log('pageF1query ERROR', err);
    } else {
      console.log('Successful F1!');
    }
  });
};

var pageF2query = (queryArgs) => {
  db.query('INSERT INTO shipping (street, city, stateof, zip, phone, id) VALUES (?, ?, ?, ?, ?, ?)', queryArgs, (err, res) => {
    if (err) {
      console.log('pageF2query ERROR', err)
    } else {
      console.log('Successful F2!');
    }
  });
};

var pageF3query = (queryArgs) => {
  db.query('INSERT INTO cc (cc, cc_exp, cc_code, cc_zip, id) VALUES (?, ?, ?, ?, ?)', queryArgs, (err, res) => {
    if (err) {
      console.log('pageF3query ERROR', err)
    } else {
      console.log('Successful F3!');
    }
  });
};

app.post('/', (req, res) => {
  // console.log('TYPEOF REQ.BODY : ', typeof req.body);
  // console.log('REQ.BODY : ', req.body);
  if (!Object.keys(req.body).length) {
    pagef0query();
  } else {
    db.query('SELECT id FROM users ORDER BY id DESC LIMIT 1', (err, res) => {
      if (err) {
        console.log('Error selecting last id', err);
      } else {
        var queryArgs = [];
        Object.values(req.body).forEach((e) => {
            queryArgs.push(e);
        });
        queryArgs.push(res[0].id);

        if (Object.keys(req.body).length === 3) {
          pageF1query(queryArgs);
        } else if (Object.keys(req.body).length === 8) {
          queryArgs = queryArgs.slice(3);
          pageF2query(queryArgs);
        } else if (Object.keys(req.body).length === 12) {
          queryArgs = queryArgs.slice(8);
          db.query('SELECT id FROM cc WHERE id = ?', [res[0].id], (err, res) => {
            if (!err && !res.length) { // if the id doesn't exist in table
            console.log('RESSSS', res);
              pageF3query(queryArgs);
            }
          });
        }
        console.log('queryArgs', queryArgs);
      }
    });

  }
  res.end();
});
