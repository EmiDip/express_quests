require("dotenv").config();
const mysql = require("mysql2");

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "express_quests",
});

module.exports = database;
