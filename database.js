import mysql from "mysql2";

// the URL needed to connect with the DB
let dbURL = "";
const connection = await mysql.createConnection(dbURL);
