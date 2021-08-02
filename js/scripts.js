//IIFE function to getAll() & add()
let pokemonRepository = (function () {
  //modal
  let pokedexPokemonList = document.querySelector('.pokemon-list');
  let modalContainer = document.querySelector('#modal-container');
  let modal = document.querySelector('.modal');

  let modalClose = document.createElement('button');
    modalClose.classList.add('modal-close');
  let pokeName = document.createElement('h1');
   pokeName.classList.add('Pokename');
  let pokeHeight = document.createElement('p');
   pokeHeight.classList.add('Pokeheight');
  let imageContainer = document.createElement('div');
    imageContainer.classList.add('img-container');
  let pokeImage = document.createElement('img');
    pokeImage.classList.add('PokeImage');
  let pokeType = document.createElement('p');
    pokeType.classList.add('Poketype');

  let pokemonList = []; //API pokemonList
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
  };

  function getAll() {
        return pokemonList;
  }
//created button & eventlistener for each pokemon.
  function addListItem(pokemon){
    let pokemonList = document.querySelector (".pokemon-list");
    let listpokemon = document.createElement ("li");
    let button = document.createElement ("button");
    button.innerText = pokemon.name.toUpperCase();
    button.classList.add ("button-class");
    listpokemon.appendChild (button);
    pokemonList.appendChild (listpokemon);
    button.addEventListener('click', function (event) {
      showDetails (pokemon);
    });
  }

  function showModal() {
    modalContainer.classList.add('is-visible');
}

//function to hide modal event listener
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  modalClose.addEventListener('click' , hideModal);

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if(e.key === "escape" && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if ( target === modalContainer) {
      hideModal();
    }
  });

//loadList to fetch the data from API.
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
//takes a Pokémon item as an argument.
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types[0].type.name;
      }).catch(function (e) {
        console.error(e);
      });
    }
//execute loadDetails() when a user clicks on a Pokémon.
function showDetails(pokemon){
  loadDetails(pokemon).then(function () {
    pokeName.innerHTML = pokemon.name.toUpperCase();
        pokeHeight.innerHTML = 'Height: ' + pokemon.height;
        pokeType.innerHTML = 'Type: ' + pokemon.types;
        pokeImage.src = pokemon.imageUrl;
        modalClose.innerHTML = "Close";
        showModal();
  });
}

   modal.appendChild(modalClose);
   modal.appendChild(pokeName);
   modal.appendChild(pokeHeight);
   modal.appendChild(pokeType);
   modal.appendChild(imageContainer);
   imageContainer.appendChild(pokeImage);

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
      showModal: showModal,
      hideModal: hideModal
    };
  })();

pokemonRepository.loadList().then(function() {

//for loop that iterates over each item in pokemonList!
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
  });
});
