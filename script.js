const BATCH_SIZE = 50;
const MAX_POKEMON_ID = 1025; 
let offset = 0; 
let isLoading = false;
let allPokemonData = [];

async function fetchAllPokemonData() {
    const fetchPromises = [];
    for (let i = 1; i <= MAX_POKEMON_ID; i++) {
        const pokedexUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;
        fetchPromises.push(fetch(pokedexUrl).then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch Pokémon for ${i}`);
            }
            return response.json();
        }));
    }

    try {
        allPokemonData = await Promise.all(fetchPromises);
        console.log(`Fetched all Pokémon data`);
        displayPokemonBatch();
    } catch (error) {
        console.error(error.message);
    }
}

function displayPokemonBatch() {
    const container = document.getElementById('pokemon-container');
    const loadingIndicator = document.getElementById('loading');
    loadingIndicator.classList.remove('hidden');
    isLoading = true;

    const end = Math.min(offset + BATCH_SIZE, allPokemonData.length);
    for (let i = offset; i < end; i++) {
        const pokedexJson = allPokemonData[i];
        const namePokemon = pokedexJson.name;
        const imgPokemon = pokedexJson.sprites.front_default;
        const types = pokedexJson.types.map(typeInfo => typeInfo.type.name);

        const pokemonDiv = document.createElement("div");
        pokemonDiv.className = "p-4 bg-white rounded-lg shadow-md my-2  me-2";

        const newP = document.createElement("p");
        newP.textContent = `${pokedexJson.id} - ${namePokemon}`;
        newP.className = "text-lg text-green-700";
        pokemonDiv.appendChild(newP);

        const newImg = document.createElement("img");
        newImg.src = imgPokemon;
        newImg.alt = `Image of ${namePokemon}`;
        newImg.className = "mx-auto";
        pokemonDiv.appendChild(newImg);

        const newType = document.createElement("p");
        newType.textContent = `Type: ${types.join(', ')}`;
        newType.className = "text-sm text-gray-600";
        pokemonDiv.appendChild(newType);

        container.appendChild(pokemonDiv);
    }

    offset = end;
    isLoading = false;
    loadingIndicator.classList.add('hidden');
}

function searchPokemon() {
    const input = document.getElementById('myInput').value.toLowerCase();
    const container = document.getElementById('pokemon-container');
    container.innerHTML = ''; // Clear current displayed Pokémon

    const filteredPokemon = allPokemonData.filter(pokedexJson => 
        pokedexJson.name.toLowerCase().includes(input)
    );

    filteredPokemon.forEach(pokedexJson => {
        const namePokemon = pokedexJson.name;
        const imgPokemon = pokedexJson.sprites.front_default;
        const types = pokedexJson.types.map(typeInfo => typeInfo.type.name);

        const pokemonDiv = document.createElement("div");
        pokemonDiv.className = "p-4 bg-white rounded-lg shadow-md my-2 me-2";

        const newP = document.createElement("p");
        newP.textContent = `${pokedexJson.id} - ${namePokemon}`;
        newP.className = "text-lg text-green-700";
        pokemonDiv.appendChild(newP);

        const newImg = document.createElement("img");
        newImg.src = imgPokemon;
        newImg.alt = `Image of ${namePokemon}`;
        newImg.className = "mx-auto";
        pokemonDiv.appendChild(newImg);

        const newType = document.createElement("p");
        newType.textContent = `Type: ${types.join(', ')}`;
        newType.className = "text-sm text-gray-600 mt-2";
        pokemonDiv.appendChild(newType);

        container.appendChild(pokemonDiv);
    });
}

function setupInfiniteScroll() {
    const container = document.getElementById('pokemon-container');
    container.addEventListener('scroll', () => {
        if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
            if (!isLoading && offset < allPokemonData.length) {
                displayPokemonBatch();
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAllPokemonData();
    setupInfiniteScroll();
    document.getElementById('myInput').addEventListener('keyup', searchPokemon);
});

