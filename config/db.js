const mysql = require('mysql');
const con = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "12345",
  database: "lms"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

exports.query = (sql, value) => {
  return new Promise((resolve, reject) => {
    con.query(sql, value, (err, result) => {
      if (err) reject(err);
      resolve(result);
    })
  })
}