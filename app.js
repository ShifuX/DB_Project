// Container fields
const optionSelectorDropDown = document.getElementById("optionSelector");
const searchContainer = document.getElementById("searchContainer");
const insertPokemonContainer = document.getElementById(
  "insertPokemonContainer"
);
// Search fields
const pokemonNameSearch = document.getElementById("pokemonName");
const pokemonTypeSearchDropDown = document.getElementById("types");
const searchButton = document.getElementById("searchButton");
// Insert fields
const pokemonNameInsert = document.getElementById("insertPokemonName");
const pokemonHP = document.getElementById("pokemonHP");
const insertTypesDropDown = document.getElementById("insertTypes");
const pokemonSexDropDown = document.getElementById("pokemonSex");
const insertButton = document.getElementById("insertPokemonButton");

// Result
const resultContainer = document.getElementById("resultContainer");

optionSelectorDropDown.addEventListener("change", () => {
  let selectedOption =
    optionSelectorDropDown.options[optionSelectorDropDown.selectedIndex].text;

  if (selectedOption === "Search") {
    insertPokemonContainer.hidden = true;
    searchContainer.hidden = false;
    resultContainer.hidden = true;
  } else if (selectedOption === "Insert") {
    searchContainer.hidden = true;
    insertPokemonContainer.hidden = false;
    resultContainer.hidden = true;
  } else if (selectedOption === "--Select--") {
    searchContainer.hidden = true;
    insertPokemonContainer.hidden = true;
    resultContainer.hidden = true;
  }
});

searchButton.addEventListener("click", async () => {
  let pokemonName = pokemonNameSearch.value;
  let URL = `http://localhost:3001/pokemon/${pokemonName}`;
  const res = await axios.get(URL);

  //console.log(res);
  if (res.data.mssg) {
    // Append error message
    let errorMssg = res.data.mssg;
    resultContainer.innerHTML = "";
    const errorElement = document.createElement("h2");
    const errorTextElement = document.createTextNode(errorMssg);
    errorElement.appendChild(errorTextElement);
    resultContainer.appendChild(errorElement);
    resultContainer.hidden = false;
    return;
  }

  const [pokemonData] = res.data;

  // Remove existing elements
  resultContainer.innerHTML = "";

  // Create new elements
  const titleElement = document.createElement("h2");
  const titleTextElement = document.createTextNode("Results:");
  titleElement.appendChild(titleTextElement);
  resultContainer.appendChild(titleElement);

  // Append Pokemon Name element
  const NAME = document.createElement("h3");
  const NAME_NODE = document.createTextNode(pokemonData.name);
  NAME.appendChild(NAME_NODE);
  resultContainer.appendChild(NAME);

  // Append Pokemon HP
  const hpElement = document.createElement("h3");
  const hpText = `HP: ${pokemonData.HP}`;
  const hpElementText = document.createTextNode(hpText);
  hpElement.appendChild(hpElementText);
  resultContainer.appendChild(hpElement);

  // Apppend Pokemon Sex
  const sexElement = document.createElement("h3");
  const sexText = `Sex: ${pokemonData.sex}`;
  const sexTextElement = document.createTextNode(sexText);
  sexElement.appendChild(sexTextElement);
  resultContainer.appendChild(sexElement);

  // Append Height
  const heightElement = document.createElement("h3");
  const heightText = `Height: ${pokemonData.height}`;
  const heightTextElement = document.createTextNode(heightText);
  heightElement.appendChild(heightTextElement);
  resultContainer.appendChild(heightElement);

  resultContainer.hidden = false;

  console.log(pokemonData);
});
