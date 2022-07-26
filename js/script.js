const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) =>{
    //Pegando as informações da API do site
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    //Transformando essas informações em Json para conseguir ler.
    

    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }   
}

const renderPokemon = async (pokemon) =>{

    pokemonNumber.innerHTML= '';
    pokemonName.innerHTML = "Loading...";

    const data = await fetchPokemon(pokemon);

    console.log(data);
    if(data){
    pokemonImage.style.display='block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']
    ['animated']['front_default'];   
    input.value = '';
    searchPokemon = data.id;

    }else{
        pokemonImage.style.display='none';
        pokemonNumber.innerHTML= '';
        pokemonName.innerHTML='Not found :C';     
    }
}

form.addEventListener('submit', () =>{
    
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
}); 

buttonPrev.addEventListener('click', () =>{
    if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
}); 
buttonNext.addEventListener('click', () =>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
}); 


renderPokemon(searchPokemon);