// home page 



// details page
const pokemonContainer = document.getElementById("details-card");
const backText = document.getElementById("background")
const pokemonTitle = document.getElementById("poke-name");
const pokemonImg = document.getElementById("poke-img");
const pokemonDetailTitle = document.getElementById("details-title")
const pokemonDetails = document.getElementById("details-list");
const pokemonHeight = document.getElementById("height");
const pokemonWeight = document.getElementById("weight");
const pokemonForms = document.getElementById("form-list");


// getting info from API

async function getPokemonDetails(name) {
    if (!name) {
        return null;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        return data;
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

async function displayFormDetails(name) {
    const formData = await getFormDetails(name);

    return formData;

}
async function displayPokemonDetails() {
    const searchParams = new URLSearchParams(window.location.search);
    // const name = searchParams.get("name");
    const name = "raichu";
    const data = await getPokemonDetails(name);

    if (!data) {
        pokemonContainer.textContent = "Error fetching pokemon details";
        return;
    }

    pokemonHeight.textContent += " " + data.height;
    pokemonWeight.textContent += " " + data.weight + "kg";

    pokemonTitle.textContent = data.name;
    backText.textContent = data.name;
    pokemonImg.src = data.sprites.front_default;

    // get abilities
    data.abilities.forEach((ability, index) => {
        pokemonDetails.innerHTML += `<li class="list-item"> ${ability.ability.name} </li>`;
    });

    // get forms
    const formData = data.forms;
    for (const form of data.forms) {
        const formName = form.name;
        const formDetails = await getFormDetails(formName);
        console.log(formDetails.pokemon.name);
        pokemonForms.innerHTML += `<li class="form-item"><img src="${formDetails.sprites.front_default}" class="form-img" />${formDetails.pokemon.name} </li>`

    }



}

displayPokemonDetails();






