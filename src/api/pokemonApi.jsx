export const fetchPokemon = async () => {
    try {
        const url = "https://pokeapi.co/api/v2/pokemon?limit=12";
        const response = await fetch(url);
        const data = await response.json();
        const pokemonData = await Promise.all(
            data.results.map(async (pokemon) => {
                const pokemonDetailsResponse = await fetch(pokemon.url);
                const pokemonDetails = await pokemonDetailsResponse.json();
                return {
                    name: pokemon.name,
                    imageUrl: pokemonDetails.sprites.other.dream_world.front_default,
                    id: pokemonDetails.id
                };
            })
        );
        return pokemonData;
    } catch (error) {
        console.error("Error fetching Pokemon data:", error);
        return [];
    }
};
