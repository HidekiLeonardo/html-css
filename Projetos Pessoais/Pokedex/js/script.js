const pokemonnome = document.querySelector('.pokemon_nome');
const pokemonnumero = document.querySelector('.pokemon_numero');
const pokemonimagem = document.querySelector('.pokemon_imagem');

const form = document.querySelector('.form');
const search = document.querySelector('.pesquisa');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) =>{

    pokemonnome.innerHTML = 'Carregando...';
    pokemonnumero.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonimagem.style.display = 'block';
        pokemonnome.innerHTML = data.name;
        pokemonnumero.innerHTML = data.id;
        pokemonimagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        search.value ='';
        searchPokemon = data.id;
    }
    else{
        pokemonimagem.style.display = 'none';
        pokemonnome.innerHTML = 'Não encontrado :c';
        pokemonnumero.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(search.value.toLowerCase());
});

prev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

next.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);