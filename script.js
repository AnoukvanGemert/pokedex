async function getPokemon() {
    const container = document.getElementById('pokemon-container'); // Verwijst naar de container voor de Pokémon
    const loadMoreButton = document.getElementById('load-more');

    let pokemonCount = 0; 
    const maxPokemon = 1000; 

    loadMoreButton.addEventListener('click', async () => {
        const start = pokemonCount + 1;
        const end = pokemonCount + 20;

        for (let pokemons = start; pokemons <= end && pokemons <= maxPokemon; pokemons++) {
            const pokedexUrl = `https://pokeapi.co/api/v2/pokemon/${pokemons}`;

            try {
                const pokedexResponse = await fetch(pokedexUrl);
                if (!pokedexResponse.ok) {
                    throw new Error(`Failed to fetch Pokémon for ${pokemons}`);
                }
                const pokedexJson = await pokedexResponse.json();
                const namePokemon = pokedexJson.name;
                const imgPokemon = pokedexJson.sprites.front_default;

                const pokemonDiv = document.createElement("div");
                pokemonDiv.className = "p-4 bg-white rounded-lg shadow-md my-2";

                // Naam van de Pokémon
                const newP = document.createElement("p");
                newP.textContent = `${pokemons} - ${namePokemon}`;
                newP.className = "text-lg text-green-700"; 
                pokemonDiv.appendChild(newP);

                // Afbeelding van de Pokémon
                const newImg = document.createElement("img");
                newImg.src = imgPokemon;
                newImg.alt = `Image of ${namePokemon}`;
                newImg.className = "mx-auto";
                pokemonDiv.appendChild(newImg);

                container.appendChild(pokemonDiv);

            } catch (error) {
                console.error(error.message);
            }
        }

        pokemonCount += 20;

        if (pokemonCount >= maxPokemon) {
            loadMoreButton.style.display = 'none'; // Verberg de knop als alle Pokémon zijn geladen
        }
    });

    loadMoreButton.click(); // Laad de eerste set Pokémon bij het laden van de pagina
}

async function searchPokemon() {
    const input = document.getElementById("myInput").value.toLowerCase();
    const pokemonDivs = document.querySelectorAll('#pokemon-container > div');

    pokemonDivs.forEach(pokemonDiv => {
        const
    })
}

getPokemon();


