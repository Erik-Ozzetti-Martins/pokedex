const buscaPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}` 

const buscaPokemonPromises = () => Array(150).fill().map((_, index) =>
    fetch(buscaPokemonUrl(index + 1)).then(Response => Response.json())) 

const geraHTML = pokemons => pokemons.reduce((acumulator, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name) 

    acumulator += `
            <li class="card ${elementTypes[0]}">
                <img class="card-image" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" />
                <h2 class="card-title"> ${id}. ${name} </h2>
                 <p class="card-subtitle"> ${elementTypes.join(' | ')}</p> 
            </li>  
        `
    return acumulator
}, '') 

const isertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons  
}

const pokemonPromises = buscaPokemonPromises()

Promise.all(pokemonPromises) // promises: Uma promise é um objeto que representa o sucesso ou a falha de uma operação assíncrona.
    .then(geraHTML)
    .then(isertPokemonsIntoPage)
