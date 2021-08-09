//IIFE function to getAll() & add()
let pokemonRepository = (function () {
//modal
  let pokedexPokemonList = document.querySelector('.list-group');
  let modal = document.querySelector('.modal-content');

  let pokeName = document.createElement('h1');
   pokeName.classList.add('Pokename');
  let pokeWeight = document.createElement('p');
   pokeWeight.classList.add('Pokeweight');
  let pokeHeight = document.createElement('p');
   pokeHeight.classList.add('Pokeheight');
  let imageContainer = document.createElement('div');
    imageContainer.classList.add('img-container');
  let pokeImage = document.createElement('img');
    pokeImage.classList.add('PokeImage');
  let pokeType = document.createElement('p');
    pokeType.classList.add('Poketype');

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  function add(pokemon) {
      typeof pokemon == 'object' && 'name' in pokemon ? pokemonList.push(pokemon) : console.log('wrong format')
}

  function getAll() {
      return pokemonList;
  }

//created button & eventlistener for each pokemon.
  function addListItem(pokemon){
    let pokemonItem = document.createElement('li');
        pokemonItem.classList.add('group-list-item')
    let pokemonButton = document.createElement('button');
        pokemonButton.innerHTML = pokemon.name.toUpperCase();
        pokemonButton.type = 'button'
        pokemonButton.classList.add('btn');
        pokemonButton.classList.add('btn-primary');
        pokemonButton.dataset.toggle = 'modal'
        pokemonButton.dataset.target = '#pokemon-modal'
      pokedexPokemonList.appendChild(pokemonItem);
      pokemonItem.appendChild(pokemonButton);
      pokemonButton.addEventListener('click', function () {
          showDetails(pokemon);
      });
  }

//execute Pokemon details when a user clicks on a Pokémon.
  function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
      let modalBody = document.querySelector('.modal-body');
      let modalTitle = document.querySelector('.modal-title');

      //Clear contents of modal title and body
      modalBody.innerHTML = '';
      modalTitle.innerHTML = '';

          pokeName.innerHTML = pokemon.name.toUpperCase();
          pokeWeight.innerHTML = 'weight ' + pokemon.weight;
          pokeHeight.innerHTML = 'Height: ' + pokemon.height;
          pokeType.innerHTML = 'Type: ' + pokemon.types.toUpperCase();
          pokeImage.src = pokemon.imageUrl;
  });
}

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
          item.imageUrl = details.sprites.front_default;
          item.weight = details.weight;
          item.height = details.height;
          item.types = details.types[0].type.name;
        }).catch(function (e) {
            console.error(e);
        });
   }

     function search() {
      let searchInput = document.querySelector('#search-bar');

      searchInput.addEventListener('input', function() {
        let pokemonList = document.querySelectorAll('.group-list-item');
        let searchText = searchInput.value.toLowerCase();

        pokemonList.forEach(function(pokemon) {
          if (pokemon.innerText.toLowerCase().indexOf(searchText) > -1) {
            pokemon.style.display = '';
          } else {
            pokemon.style.display = 'none';
        }
      });
  });
}

   modal.appendChild(pokeName);
   modal.appendChild(imageContainer);
   modal.appendChild(pokeImage);
   modal.appendChild(pokeWeight);
   modal.appendChild(pokeHeight);
   modal.appendChild(pokeType);

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      showDetails: showDetails,
      loadList: loadList,
      loadDeatails: loadDetails,
      search: search
    };
  })();

//for loop that iterates over each item in pokemonList!
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon)
      pokemonRepository.search();
  });
});
