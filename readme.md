Example of using `pg-copy-streams` to seed a postgres database with a file.
(https://www.npmjs.com/package/pg-copy-streams)

## dependencies used:
- node, npm
- psql cli
- local postgres database (with database `mydb` as defined in package.json, and table `mytable` as defined in schema.sql)

## how to use:
- add your `dbcreds.js` file matching the sample.
- `npm run clear` to clear the db.
- `npm run seed` to seed the db.
- `npm start` to start server.
- visit `localhost:3000` in browser to see the seeded db rows (or inspect the db through cli).

## references:
- https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
- https://node-postgres.com/
- https://github.com/brianc/node-pg-copy-streams
- https://www.postgresql.org/docs/9.4/sql-copy.html

## other links:
- https://stackoverflow.com/questions/57261905/postgresql-copy-cannot-read-json-from-csv-file
- https://stackoverflow.com/questions/39224382/how-can-i-import-a-json-file-into-postgresql
- https://info.crunchydata.com/blog/fast-csv-and-json-ingestion-in-postgresql-with-copy
