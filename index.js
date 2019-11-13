const express = require('express');
const { Client } = require('pg');
const dbCreds = require('./dbcreds.js');

const app = express();

app.get('/', (req, res) => {
  console.log('received request for /');

  const client = new Client(dbCreds);
  client.connect();

  const queryString = 'SELECT * from mytable';

  client.query(queryString, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('query error');
      return;
    }

    client.end()

    console.log('success!');
    res.status(200).send(data.rows);
  });
});

app.listen(3000, () => {
  console.log('listening @ port 3000');
});
