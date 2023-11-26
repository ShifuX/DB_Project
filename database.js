import mysql from "mysql2/promise";
import express from "express";

let port = 3001;

// the URL needed to connect with the DB
let dbURL = "";
const connection = await mysql.createConnection(dbURL);

const app = express();

// retrieves all the pokemon in the DB
app.get("/pokemons", async (req, res) => {
  const query = "SELECT * FROM pokemon";
  const [rows] = await connection.query(query);
  res.send(rows);
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
