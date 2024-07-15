const BATCH_SIZE = 20; // Number of Pokémon to load per batch
let offset = 1; // Initial offset for Pokémon IDs
let isLoading = false;

async function getPokemon(offset, limit) {
    const container = document.getElementById('pokemon-container');
    const loadingIndicator = document.getElementById('loading');
    console.log("Container found:", container);

    loadingIndicator.classList.remove('hidden');
    isLoading = true;

    for (let i = offset; i < offset + limit; i++) {
        const pokedexUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;

        try {
            const pokedexResponse = await fetch(pokedexUrl);
            if (!pokedexResponse.ok) {
                throw new Error(`Failed to fetch Pokémon for ${i}`);
            }
            const pokedexJson = await pokedexResponse.json();
            const namePokemon = pokedexJson.name;
            const imgPokemon = pokedexJson.sprites.front_default;

            console.log(`Fetched Pokémon: ${namePokemon}`);

            const pokemonDiv = document.createElement("div");
            pokemonDiv.className = "p-4 bg-white rounded-lg shadow-md my-2";

            const newP = document.createElement("p");
            newP.textContent = `${i} - ${namePokemon}`;
            newP.className = "text-lg text-green-700";
            pokemonDiv.appendChild(newP);

            const newImg = document.createElement("img");
            newImg.src = imgPokemon;
            newImg.alt = `Image of ${namePokemon}`;
            newImg.className = "mx-auto";
            pokemonDiv.appendChild(newImg);

            container.appendChild(pokemonDiv);
            console.log(`Added Pokémon to container: ${namePokemon}`);

        } catch (error) {
            console.error(error.message);
        }
    }

    isLoading = false;
    loadingIndicator.classList.add('hidden');
}

async function searchPokemon() {
    const input = document.getElementById('myInput').value.toLowerCase();
    const pokemonDivs = document.querySelectorAll('#pokemon-container > div');

    pokemonDivs.forEach(pokemonDiv => {
        const pokemonName = pokemonDiv.querySelector('p').textContent.toLowerCase();
        if (pokemonName.includes(input)) {
            pokemonDiv.style.display = 'block';
        } else {
            pokemonDiv.style.display = 'none';
        }
    });
}

function setupInfiniteScroll() {
    const container = document.getElementById('pokemon-container');
    container.addEventListener('scroll', () => {
        if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
            if (!isLoading) {
                offset += BATCH_SIZE;
                getPokemon(offset, BATCH_SIZE);
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    getPokemon(offset, BATCH_SIZE);
    setupInfiniteScroll();
});
