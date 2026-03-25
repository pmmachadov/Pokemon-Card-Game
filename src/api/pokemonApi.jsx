const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon?limit=21';
const FALLBACK_IMAGE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/0.png';

export const fetchPokemon = async () => {
    try {
        const response = await fetch(POKEAPI_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const pokemonData = await Promise.all(
            data.results.map(async (pokemon) => {
                const detailsResponse = await fetch(pokemon.url);
                
                if (!detailsResponse.ok) {
                    throw new Error(`Error fetching details for ${pokemon.name}`);
                }
                
                const details = await detailsResponse.json();
                
                const imageUrl = details.sprites.other.dream_world.front_default 
                    || details.sprites.other['official-artwork'].front_default
                    || details.sprites.front_default
                    || FALLBACK_IMAGE;
                
                return {
                    id: details.id,
                    name: pokemon.name,
                    imageUrl: imageUrl,
                };
            })
        );
        
        return pokemonData;
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        throw error;
    }
};
