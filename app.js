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
const abilityNameInsert = document.getElementById("abilityName");
const pokemonHPInsert = document.getElementById("pokemonHP");
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
  let URL = "";
  let pokemonName = pokemonNameSearch.value;
  let selectedOption =
    pokemonTypeSearchDropDown.options[pokemonTypeSearchDropDown.selectedIndex]
      .text;

  if (selectedOption === "--Select--" && pokemonName === "") {
    resultContainer.innerHTML = "";
    resultContainer.innerHTML = "<div> Select an option above </div>";
    resultContainer.hidden = false;
    return;
  }

  // If the dropdown is selected then we do drop down, else we do textbox search
  if (selectedOption !== "--Select--") {
    let pokemonType = selectedOption.toString().toLowerCase();
    URL = `http://localhost:3001/pokemonByType/${pokemonType}`;
    const result = await axios.get(URL);
    const pokemons = result.data;

    resultContainer.innerHTML = "";

    // Display all pokemons with the chosen type
    resultContainer.innerHTML = pokemons
      .map(
        (pokemon) =>
          `<div>
      <div>Name: ${pokemon.name}</div>
      <div>HP: ${pokemon.HP}</div>
      <div>Sex: ${pokemon.sex}</div>
      <div>Height: ${pokemon.height}</div>
      <div>Type: ${pokemon.typeName}</div>
      <div>Strong Against: ${pokemon.strongAgainst}</div>
      <div>Ability Name: ${pokemon.abilityName}</div>
      <div>Mulitiplier: ${pokemon.multiplier}</div>
      <br>
    </div>`
      )
      .join("");

    resultContainer.hidden = false;
    return;
  }

  URL = `http://localhost:3001/pokemon/${pokemonName}`;
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
  console.log(pokemonData);
  // Remove existing elements
  resultContainer.innerHTML = "";

  // Display pokemon data
  resultContainer.innerHTML = `
    <h3>Results:</h3>
    <div>Name: ${pokemonData.name}</div>
      <div>HP: ${pokemonData.HP}</div>
      <div>Sex: ${pokemonData.sex}</div>
      <div>Height: ${pokemonData.height}</div>
      <div>Type: ${pokemonData.typeName}</div>
      <div>Strong Against: ${pokemonData.strongAgainst}</div>
      <div>Ability Name: ${pokemonData.abilityName}</div>
      <div>Mulitiplier: ${pokemonData.multiplier}</div>
  `;

  resultContainer.hidden = false;

  console.log(pokemonData);
});

insertButton.addEventListener("click", async () => {
  let pokemonName = pokemonNameInsert.value;
  let abilityName = abilityNameInsert.value;
  let pokemonHP = pokemonHPInsert.value;
  let selectedType = pokemonTypeSearchDropDown.selectedIndex.value;
  let selectedSex = pokemonSexDropDown.selectedIndex.value;

  // Reject incomplete input
  if (selectedType === "default" || pokemonName === "" || abilityName === "") {
    resultContainer.innerHTML = "<div> Select an option above </div>";
    resultContainer.hidden = false;
    return;
  }

  // Send insert request to server
  let URL = `http://localhost:3001/insertPokemon`;
  const result = await axios.post(URL, {
    pokemonName: pokemonName,
    abilityName: abilityName,
    pokemonHP: pokemonHP,
    pokemonType: selectedType.toString().toLowerCase(),
    pokemonSex: selectedSex.toString().toLowerCase()
  });
  
  // Display message sent by server
  resultContainer.innerHTML = `<div> ${result.data.mssg} </div>`;
  return;
});
