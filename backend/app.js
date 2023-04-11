const express = require('express');
const connection = require('./config/config');

const app = express();
const port = 3000
const notiAlertRouter = require("./routes/notificatonAlert.js")

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(notiAlertRouter.router)
app.get('/', (req, res) => {
  res.send('Hello World! test')
})

app.get('/getPatient/:id', function (req, res, next) {
  // const id = req.params.id;
  
  connection.query(
    'SELECT * FROM `Patients` WHERE `id_card` = ?',
    [req.params.id],
    function(err, results) {
      if (err) {
        console.error(err);
        res.status(500).send('Error retrieving user from database');
      } else {
        console.log('User retrieved from database');
        res.status(200).send(results[0]);
      }
    }
  );
})

// app.get('/getListDrugs', (req, res) => {
//   connection.query('SELECT * FROM `Medicine`', (error, results, fields) => { 
//     if(error){
//       console.error('error query:', error);
//       res.send('Error :', error);
//     } else {
//       res.json(results);
//       console.log(results);
//     }
//   })
// })

app.get('/getListDrugs', (req, res) => {
  console.log("axios");
  const sql = 'SELECT * FROM `Medicine`';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving users from database');
    } else {
      console.log('Users retrieved from database');
      res.status(200).send(result);
    }
  });
});

app.get('/getListDrugs/:id', function (req, res, next) {
  // const id = req.params.id;
  connection.query(
    'SELECT * FROM `Medicine` WHERE `medicine_id` = ?',
    [req.params.id],
    function(err, results) {
      if (err) {
        console.error(err);
        res.status(500).send('Error retrieving user from database');
      } else {
        console.log('User retrieved from database');
        res.status(200).send(results[0]);
      }
    }
  );
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})