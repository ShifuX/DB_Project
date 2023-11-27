import mysql from "mysql2/promise";
import express from "express";
import cors from "cors";

let port = 3001;

// the URL needed to connect with the DB
let dbURL =
  "mysql://admin:pokemon23@pokemon.cv6cnzb0rcuo.us-east-1.rds.amazonaws.com:3306/pokemon_db";
const connection = await mysql.createConnection(dbURL);

const app = express();

// Modify depending on your port number, the port I use is 5500 for the website
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

// retrieves all the pokemon in the DB
app.get("/pokemons", async (req, res) => {
  const query = "SELECT * FROM Pokemon";
  const [rows] = await connection.query(query);

  if (rows.length === 0) {
    return res.json({ mssg: "Empty, no Pokemons found" });
  }

  res.send(rows);
});

app.get("/pokemon/:id", async (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT * FROM Pokemon P, HasType T, HasAbility A, Strengths S WHERE P.name=T.pokemonName AND A.pokemonName=P.name AND S.typeName=T.typeName AND name=?";
  const [rows] = await connection.query(query, [id]);

  if (rows.length === 0) {
    return res.json({ mssg: "Empty, no Pokemon found" });
  }

  res.send(rows);
});

app.get("/pokemonByType/:id", async (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT * FROM Pokemon P, HasType T, HasAbility A, Strengths S WHERE P.name=T.pokemonName AND A.pokemonName=P.name AND S.typeName=T.typeName AND T.typeName=?";
  const [rows] = await connection.query(query, [id]);

  if (rows.length === 0) {
    return res.json({ mssg: "Empty, no Pokemon found" });
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
