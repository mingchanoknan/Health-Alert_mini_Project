const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '54.163.234.235',
  user: 'root',
  password: 'password',
  database: 'health-alert',
  waitForConnections: true,
  connectionLimit: 30,
  queueLimit: 0
});

// connection.connect((error) => {
//     if (error) {
//       console.error('Error connecting to MySQL database: ' + error.stack);
//       return;
//     }
//     console.log('Connected to MySQL database.');
//   });

  
module.exports = connection;