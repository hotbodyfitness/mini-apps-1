var mysql = require('mysql');

var db = mysql.createConnection({
  // host: 'localhost',
  user: 'root',
  password: '',
  database: 'cart' // make sure these 3 params are here!!!
});

// tests connection
db.connect(() => {
  console.log('MySQL successfully connected to cart database!');
});

module.exports = db;