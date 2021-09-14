window.onload = function handleOnLoad() {
    getPokemonList();
    getPokemonTypes();
}

let globalPokeList = [];

function getPokemonList() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151').then(response => response.json())
        .then(pokemonList => {
            let pokePromises = [];
            for (const pokemon of pokemonList.results) {
                const resolvedPokemon = fetch(pokemon.url).then(response => response.json());
                pokePromises.push(resolvedPokemon);
            }
            Promise.all(pokePromises).then((detailedPokemonList) => {
                const pokemonList = document.getElementsByClassName("pokemonWrapper")[0];
                for (i = 0; i < detailedPokemonList.length; i++) {
                    const pokemonCard = document.createElement('div');
                    pokemonCard.className = "pokemonCard";

                    const artworkWrapper = document.createElement('div');
                    artworkWrapper.className = "artworkWrapper";

                    const pokemonImage = document.createElement('img');
                    let pokemonName = detailedPokemonList[i].name;
                    pokemonImage.src = `https://img.pokemondb.net/artwork/large/${pokemonName}.jpg`;
                    pokemonImage.className = "pokemonImg";

                    const pokemonParagraghElement = document.createElement('p');
                    pokemonParagraghElement.textContent += detailedPokemonList[i].name;

                    pokemonCard.appendChild(artworkWrapper);
                    artworkWrapper.appendChild(pokemonImage);
                    pokemonCard.appendChild(pokemonParagraghElement);
                    pokemonList.appendChild(pokemonCard);
                }
                globalPokeList = detailedPokemonList;
            })
        });
}

function getPokemonTypes() {
    fetch('https://pokeapi.co/api/v2/type').then(response => response.json())
        .then(pokemonTypesInfo => {
            const pokemonTypesSelect = document.getElementById('pokemon-types')
            for (i = 0; i < pokemonTypesInfo.results.length; i++) {
                let pokemonTypeName = pokemonTypesInfo.results[i].name;
                let pokemonOption = document.createElement('option');
                pokemonOption.textContent = pokemonTypeName;
                pokemonTypesSelect.appendChild(pokemonOption);
            }

            pokemonTypesSelect.addEventListener('change', filterByType);
        })
}

function filterByType(event) {
    const selectedType = event.target.value;
    const newPokeArray = globalPokeList.filter(pokemon => {
        return pokemon.types.find(typeObj => {
            return typeObj.type.name === selectedType;
        })
    })

    const pokemonList = document.getElementsByClassName('pokemonWrapper')[0];
    pokemonList.innerHTML = '';


    for (i = 0; i < newPokeArray.length; i++) {
        const pokemonCard = document.createElement('div');
        pokemonCard.className = "pokemonCard";

        const artworkWrapper = document.createElement('div');
        artworkWrapper.className = "artworkWrapper";

        const pokemonImage = document.createElement('img');
        let pokemonName = newPokeArray[i].name;
        pokemonImage.src = `https://img.pokemondb.net/artwork/large/${pokemonName}.jpg`;
        pokemonImage.className = "pokemonImg";

        const pokemonParagraghElement = document.createElement('p');
        pokemonParagraghElement.textContent += newPokeArray[i].name;

        pokemonCard.appendChild(artworkWrapper);
        artworkWrapper.appendChild(pokemonImage);
        pokemonCard.appendChild(pokemonParagraghElement);
        pokemonList.appendChild(pokemonCard);
    }
}