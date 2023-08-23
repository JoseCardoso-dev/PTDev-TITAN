const fsPromises = require('fs').promises;
const axios = require('axios');


async function getPokemon(pokemonName) {

    const fileContent = await fsPromises.readFile('pokemons.json', 'utf-8');
    const data = JSON.parse(fileContent);

    if (data.pokemonNames.includes(pokemonName)) {

        const pokemonInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (pokemonInfo) {
            console.log(`Nome: ${pokemonInfo.data.name}, Tipos: ${pokemonInfo.data.types.map(type => type.type.name).join(', ')}`);
        } else {
            console.log('Erro ao buscar informações do Pokémon.');
        }
    } else {
        console.log('Pokemon não encontrado na lista.');
    }
}

getPokemon("charizard")

