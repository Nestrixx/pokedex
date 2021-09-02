const typeSelector = document.getElementById('pokemon-types');
window.onload = function getPokemonList() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151').then(response => response.json())
        .then(pokemonList => {
            let pokePromises = [];
            for (const pokemon of pokemonList.results) {
                const resolvedPokemon = fetch(pokemon.url).then(response => response.json());
                pokePromises.push(resolvedPokemon);
            }
            Promise.all(pokePromises).then((detailedPokemonList) => {
                console.log('hooray', detailedPokemonList);
                const pokemonList = document.getElementsByClassName("pokemonCards")[0];
                for (i = 0; i < detailedPokemonList.length; i++) {
                    const pokemonImage = document.createElement('img');
                    pokemonImage.src = detailedPokemonList[i].sprites.front_shiny;
                    pokemonList.appendChild(pokemonImage);
                }
            })
        });
}

function filterByType() {
    console.log(typeSelector.value);
}
typeSelector.onchange = filterByType;

function showMeData() {
    console.log('hi');
}