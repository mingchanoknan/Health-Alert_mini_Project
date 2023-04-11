const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: '54.163.234.235',
  user: 'root',
  password: 'password',
  database: 'health-alert',
  waitForConnections: true,
  connectionLimit: 30,
  queueLimit: 0
});

module.exports = connection