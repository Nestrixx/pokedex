const typeSelector = document.getElementById('pokemon-types');
let pokemonArray = [];
window.onload = function getPokemonList() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151').then(response => response.json())
        .then(pokemonList => {
            pokemonList.results.forEach((pokemon) => {
                fetch(pokemon.url).then(response => response.json())
                    .then(individualPokemon => {
                        pokemonArray.push(individualPokemon);
                    })
            })
        })
    console.log(pokemonArray);
}

function filterByType() {
    console.log(typeSelector.value);
}
typeSelector.onchange = filterByType;

function showMeData() {
    console.log(pokemonArray)
}