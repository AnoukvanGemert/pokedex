const maxPokemon = 1000; // Maximum aantal Pokémon
let pokemonData = []; // Array om alle Pokémon data bij te houden
let pokemonCount = 0; // Houdt bij hoeveel Pokémon er al zijn geladen

async function fetchAllPokemon() {
    try {
        // Doorloop alle Pokémon tot het maximum
        for (let pokemons = 1; pokemons <= maxPokemon; pokemons++) {
            const pokedexUrl = `https://pokeapi.co/api/v2/pokemon/${pokemons}`;
            const pokedexResponse = await fetch(pokedexUrl);

            if (!pokedexResponse.ok) {
                throw new Error(`Failed to fetch Pokémon for ${pokemons}`);
            }

            const pokedexJson = await pokedexResponse.json();
            pokemonData.push({
                id: pokemons,
                name: pokedexJson.name.toLowerCase(),
                img: pokedexJson.sprites.front_default
            });
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function getPokemon(startIndex, endIndex) {
    const container = document.getElementById('pokemon-container');

    for (let i = startIndex; i < endIndex; i++) {
        if (i >= pokemonData.length) break; // Stop als we het einde van de lijst bereiken

        const pokemon = pokemonData[i];

        const pokemonDiv = document.createElement("div");
        pokemonDiv.className = "p-4 bg-white rounded-lg shadow-md my-2";

        // Naam van de Pokémon
        const newP = document.createElement("p");
        newP.textContent = `${pokemon.id} - ${pokemon.name}`;
        newP.className = "text-lg text-green-700";
        pokemonDiv.appendChild(newP);

        // Afbeelding van de Pokémon
        const newImg = document.createElement("img");
        newImg.src = pokemon.img;
        newImg.alt = `Image of ${pokemon.name}`;
        newImg.className = "mx-auto";
        pokemonDiv.appendChild(newImg);

        container.appendChild(pokemonDiv);
    }

    pokemonCount = endIndex; 
}

async function loadMorePokemon() {
    const start = pokemonCount;
    const end = pokemonCount + 20;

    await getPokemon(start, end);

    if (pokemonCount >= maxPokemon) {
        document.getElementById('load-more').style.display = 'none'; 
    }
}

async function searchPokemon() {
    const input = document.getElementById("myInput").value.toLowerCase();
    const container = document.getElementById('pokemon-container');
    container.innerHTML = ''; // Leeg de container voordat we nieuwe resultaten toevoegen

    // Filter de pokemonData op basis van de zoekterm
    const filteredPokemon = pokemonData.filter(pokemon => pokemon.name.includes(input));

    // Toon de gevonden Pokémon
    filteredPokemon.forEach(pokemon => {
        const pokemonDiv = document.createElement("div");
        pokemonDiv.className = "p-4 bg-white rounded-lg shadow-md my-2";

        // Naam van de Pokémon
        const newP = document.createElement("p");
        newP.textContent = `${pokemon.id} - ${pokemon.name}`;
        newP.className = "text-lg text-green-700";
        pokemonDiv.appendChild(newP);

        // Afbeelding van de Pokémon
        const newImg = document.createElement("img");
        newImg.src = pokemon.img;
        newImg.alt = `Image of ${pokemon.name}`;
        newImg.className = "mx-auto";
        pokemonDiv.appendChild(newImg);

        container.appendChild(pokemonDiv);
    });

    // Als er geen zoekresultaten zijn, toon een melding
    if (filteredPokemon.length === 0) {
        const noResultMessage = document.createElement("p");
        noResultMessage.textContent = "No Pokémon found.";
        noResultMessage.className = "text-lg text-gray-600";
        container.appendChild(noResultMessage);
    }
}

// Initialisatie: Haal alle Pokémon data op en laad de eerste set bij het laden van de pagina
fetchAllPokemon().then(() => {
    getPokemon(0, 20); // Laad de eerste 20 Pokémon
});

// Event listener voor de zoekfunctie
document.getElementById("myInput").addEventListener("keyup", searchPokemon);

// Event listener voor de Load More knop
document.getElementById("load-more").addEventListener("click", loadMorePokemon);
