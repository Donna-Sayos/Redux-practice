require("dotenv").config({ path: "../config/config.env" });
const Pool = require("pg").Pool; // this imports the Pool class from the pg module

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
    // TODO: add the DATABASE_URL to env file 
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
});

module.exports = pool;