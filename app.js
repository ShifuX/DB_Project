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

optionSelectorDropDown.addEventListener("change", () => {
  let selectedOption =
    optionSelectorDropDown.options[optionSelectorDropDown.selectedIndex].text;

  if (selectedOption === "Search") {
    insertPokemonContainer.hidden = true;
    searchContainer.hidden = false;
  } else if (selectedOption === "Insert") {
    searchContainer.hidden = true;
    insertPokemonContainer.hidden = false;
  } else if (selectedOption === "--Select--") {
    searchContainer.hidden = true;
    insertPokemonContainer.hidden = true;
  }
});
