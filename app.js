const optionSelector = document.getElementById("optionSelector");
const searchContainer = document.getElementById("searchContainer");
const insertPokemonContainer = document.getElementById(
  "insertPokemonContainer"
);

optionSelector.addEventListener("change", () => {
  let selectedOption =
    optionSelector.options[optionSelector.selectedIndex].text;

  if (selectedOption === "Search") {
    insertPokemonContainer.hidden = true;
    searchContainer.hidden = false;
  } else if (selectedOption == "Insert") {
    searchContainer.hidden = true;
    insertPokemonContainer.hidden = false;
  }
});
