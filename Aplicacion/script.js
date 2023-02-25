//Dividimos en variables la informacion que contiene la api para poder intregarlo.
const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');


// Se le asigna un color al tipo de Pokemon.
const typeColors = {
    electric: '#C5B706',
    normal: '#B0747E',
    fire: '#D86907',
    water: '#1582C4',
    ice: '#0DACCF',
    rock: '#818181',
    flying: '#7AE7C7',
    grass: '#259B33',
    psychic: '#C83A6A',
    ghost: '#561D53',
    bug: '#22F124',
    poison: '#FC2C94',
    ground: '#D2B074',
    dragon: '#380F8E',
    steel: '#097BA6',
    fighting: '#010101',
    default: '#2A1A1F',
};

// Para poder obtener Pokemones aleatorios usamos esta funcion para obtener un numero aleatorio y que se vea reflejado
function getRandomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min)) + min;
  }

// Con esto generamos la informacion dentro del recuadro
const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

const renderPokemonData = data => {
    const sprite =  data['sprites']['versions']['generation-iii']['emerald']['front_default'];
    const { stats, types } = data;
    pokeName.textContent = data.name;
    if(sprite != null){
        pokeImg.setAttribute('src', sprite);
    }else{
        pokeImg.setAttribute('src', './Missing Pokemon.png');
    }
    
    pokeId.textContent = `Nº ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}


const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', 'Missing Pokemon.png');
    pokeImg.style.background =  '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}

function randomButton(){
    document.getElementById("buscador").setAttribute("value", getRandomNumber(1,386));
}

setInterval(()=>{ 
    value = getRandomNumber(1,386);
    document.getElementById("buscador").setAttribute("value", value);
    fetch(`https://pokeapi.co/api/v2/pokemon/${value}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
    console.log(getRandomNumber(1,386))
}, 30000);
