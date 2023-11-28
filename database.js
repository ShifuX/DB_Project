import mysql from "mysql2/promise";
import express from "express";
import cors from "cors";

let PORT = process.env.PORT || 3001;

// the URL needed to connect with the DB
let dbURL =
  "mysql://admin:pokemon23@pokemon.cv6cnzb0rcuo.us-east-1.rds.amazonaws.com:3306/pokemon_db";
const connection = await mysql.createConnection(dbURL);

const app = express();

// Modify depending on your port number, the port I use is 5500 for the website
app.use(
  cors({
    origin: "https://db-project-jde5.onrender.com/",
  })
);

// Support JSON-encoded and URL-encoded post bodies
app.use(express.json());
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
// Test rendering index.html
app.get("/", function (req, res) {
  res.render("index", {});
});

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

app.delete("/deletePokemon/:id", async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Pokemon WHERE name='" + id + "'";
  await connection.query(query);
});

app.post("/insertPokemon", async (req, res) => {
  console.log("Insert request received");
  const pokemonQuery = `
    INSERT INTO Pokemon
    VALUES (?, ?, ?, ?)`;
  const hasTypeQuery = `
    INSERT INTO HasType
    VALUES (?, ?)`;
  const hasAbilityQuery = `
    INSERT INTO HasAbility
    VALUES (?, ?)`;
  try {
    await connection.query(pokemonQuery, [
      req.body.pokemonName,
      req.body.pokemonHeight,
      req.body.pokemonSex,
      req.body.pokemonHP,
    ]),
      await connection.query(hasTypeQuery, [
        req.body.pokemonName,
        req.body.pokemonType,
      ]);
    await connection.query(hasAbilityQuery, [
      req.body.pokemonName,
      req.body.abilityName,
    ]);
    console.log("Successfully inserted pokemon: " + req.body.pokemonName);
    return res.json({ mssg: "Successfully inserted pokemon into database" });
  } catch (exception) {
    console.log(exception.message);
    let message =
      "Failed to insert pokemon into database: " + exception.message;
    return res.json({ mssg: message });
  }
});

app.put("/updatePokemon/:id", async (req, res) => {
  const { id } = req.params;
  const { pokemonName, pokemonHP } = req.body;
  //create update statement for pokemon table

  if (pokemonName === "") {
    pokemonName = id;
  }

  const query = "UPDATE Pokemon SET name=?, HP=? WHERE name=?";
  const [rows] = await connection.query(query, [pokemonName, pokemonHP, id]);
  //console.log(rows);

  res.send(rows);
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
