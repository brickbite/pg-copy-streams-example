var fs = require('fs');
var { Pool } = require('pg');
var copyFrom = require('pg-copy-streams').from;
const dbCreds = require('../dbcreds.js');
 
var pool = new Pool(dbCreds);

/**
 * with COPY in postgres, you can do text (default), csv, or binary.
 * https://www.postgresql.org/docs/9.4/sql-copy.html
 */

/**
 * CSV option:
 * file we end up using is not really csv. and need to add extra quotes in this file. can't use comma as delimiter since JSON is using it (data.csv in this repo wouldn't work). also need to escape extra slash.
 */
// const filename = './data-backslash-separated.csv';
// const copyCommand = `COPY mytable FROM STDIN DELIMITER '\\' CSV HEADER`; // 

/**
 * TEXT option:
 */
const filename = './dataText.txt';
const copyCommand = `COPY mytable FROM STDIN WITH DELIMITER '|'`;

/**
 * Seeding
 */

const cleanup = () => {
  pool.end();
  process.exit();
};

pool.connect(function(err, client, done) {
  if (err) {
    console.log('pool.connect error:', err);
    return;
  };

  var stream = client.query(copyFrom(copyCommand));
  var fileStream = fs.createReadStream(filename);

  fileStream.on('error', (err) => {
    console.log('fileStream error', err);
    cleanup();
  });

  stream.on('error', (err) => {
    console.log('streamError', err);
    cleanup();
  });

  stream.on('end', () => {
    console.log('seed complete');
    cleanup();
  });

  fileStream.pipe(stream);
});
