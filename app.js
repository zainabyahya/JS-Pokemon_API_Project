document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-list');

    hamburgerMenu.addEventListener('click', function () {
        navLinks.classList.toggle('show');
    });
});

const pokemonsContainer = document.getElementById("cards");

async function getPokemons() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        return data.results;
    } catch (error) {
        return null;
    }
}
async function getFormDetails(name) {
    if (!name) {
        return null;
    }
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${name}`);
        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}
async function displayPokemons() {
    const pokemons = await getPokemons();

    if (!pokemons) {
        pokemonContainer.textContent = "Error fetching pokemons";
        return;
    }

    for (pokemon of pokemons) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${pokemon.name}`);
        const data = await response.json();

        const pokemonCard = document.createElement("div");
        const pokemonImg = document.createElement("img");
        const borderCard = document.createElement("div");
        const pokemonName = document.createElement("h3");

        pokemonCard.classList.add("pokemon-card");
        pokemonImg.classList.add("pokemon-img");
        borderCard.classList.add("border-card");
        pokemonName.classList.add("pokemon-name");

        pokemonImg.src = data.sprites.front_default;
        pokemonName.textContent = pokemon.name;

        pokemonCard.addEventListener("click", () => {
            window.location.href = `./pokemons.html?name=${data.name}`;
            console.log(data.name);
        });

        pokemonsContainer.appendChild(pokemonCard);
        pokemonCard.appendChild(pokemonImg);
        pokemonCard.appendChild(borderCard);
        borderCard.appendChild(pokemonName);
    }
}



displayPokemons();
