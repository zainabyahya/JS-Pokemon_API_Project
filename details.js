import { colors } from "./colors.js";

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

// to fetch forms data
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

async function displayPokemonDetails() {
    const searchParams = new URLSearchParams(window.location.search);
    const name = searchParams.get("name");
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


    // get forms
    const formData = data.forms;
    for (const form of formData) {
        const formName = form.name;
        const formDetails = await getFormDetails(formName);
        console.log(formDetails.pokemon.name);
        pokemonForms.innerHTML += `<li class="form-item"><img src="${formDetails.sprites.front_default}" class="form-img" />${formDetails.pokemon.name} </li>`;
    }

    colors.find((color, index) => {
        if (color.name === name) {
            document.getElementById("secondary-section").style["background-color"] = color.color;
        }
    });

    displayInfo(data);

}
let slider = 0;

function displayInfo(data) {
    pokemonDetails.innerHTML = "";
    if (slider === 0) {
        pokemonDetailTitle.textContent = "Abilities";
        data.abilities.map((ability) => {
            pokemonDetails.innerHTML += `<li class="list-item">${ability.ability.name}</li>`
        });
    }
    else if (slider === 1) {
        pokemonDetailTitle.textContent = "Types";
        data.types.map((type) => {
            pokemonDetails.innerHTML += `<li class="list-item">${type.type.name}</li>`
            console.log(`<li class="list-item">${type.type.name}</li>`);
        });
    }
    else if (slider == 2) {
        pokemonDetailTitle.textContent = "Stats";
        data.stats.map((stat) => {
            pokemonDetails.innerHTML += `<li class="list-item">${stat.stat.name}: ${stat.base_stat}</li>`
        });
    }
}
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");


prevBtn.addEventListener("click", async () => {
    if (slider > 0) {
        slider--;
        const data = await getPokemonDetails("ditto");
        displayInfo(data);
    } else {
        slider = 2;
        const data = await getPokemonDetails("ditto");
        displayInfo(data);
    }
});

nextBtn.addEventListener("click", async () => {
    if (slider === 2) {
        slider = 0;
    } else {
        slider++;

    }
    const data = await getPokemonDetails("ditto");
    displayInfo(data);

});

// async function prevPokemon() {
//     if (slider > 0) {
//         slider--;
//         const data = await getPokemonDetails("ditto");
//         displayInfo(data);
//     } else {
//         slider = 2;
//         const data = await getPokemonDetails("ditto");
//         displayInfo(data);
//     }
// }

// async function nextPokemon() {
//     if (slider === 2) {
//         slider = 0;
//     } else {
//         slider++;

//     }
//     const data = await getPokemonDetails("ditto");
//     displayInfo(data);
// }

displayPokemonDetails();



