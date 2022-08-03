const { Client } = require("pg");

export const db = new Client({
  connectionString: process.env.DATABASE_URL,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});
