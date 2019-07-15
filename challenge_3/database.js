var mysql = require('mysql');

var db = mysql.createConnection({
  user: 'root',
  password: '',
  name: 'cart'
});

// tests connection
db.connect(() => {
  console.log('MySQL successfully connected to cart database!');
});

module.exports = db;