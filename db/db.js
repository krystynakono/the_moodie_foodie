const pg = require('pg-promise')({});

const pgConfig = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
};

const db = pg(pgConfig);

module.exports = db;
