import mysql from "mysql2/promise";
import express from "express";

let port = 3001;

// the URL needed to connect with the DB
let dbURL =
  "mysql://admin:pokemon23@pokemon.cv6cnzb0rcuo.us-east-1.rds.amazonaws.com:3306/pokemon_db";
const connection = await mysql.createConnection(dbURL);

const app = express();

// retrieves all the pokemon in the DB
app.get("/pokemons", async (req, res) => {
  const query = "SELECT * FROM Pokemon";
  const [rows] = await connection.query(query);

  if (rows.length === 0) {
    return res.json({ mssg: "Empty, no Pokemons found" });
  }

  res.send(rows);
});

app.get("/types", async (req, res) => {
  const query = "SELECT * FROM Type";
  const [rows] = await connection.query(query);

  if (rows.length === 0) {
    return res.json({ mssg: "Empty, no Types found" });
  }

  res.send(rows);
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
