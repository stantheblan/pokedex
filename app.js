// 											 .-.  .-.
// 											 |  \/  |
// 											/,   ,_  `'-.
// 										.'  0/   | 0\  \_  `".
// 										  .-|\   /`\     '.
// 									 .-'  _,/    '--'.'|#''---'
// 									  `--'  |       /   \#
// 											|      /     \#
// 											\     ;|\    .\#
// 											|' ' //  \   ::\#
// 											\   /`    \   ':\#
// 											 `"`       \..   \#
// 													   	\::.  \#
//       _              _   _          _     _           \::.  \#
//   ___| |_ __ _ _ __ | |_| |__   ___| |__ | | __ _ _ __ \::   \#
//  / __| __/ _` | '_ \| __| '_ \ / _ \ '_ \| |/ _` | '_ \ \'  .:\#
//  \__ \ || (_| | | | | |_| | | |  __/ |_) | | (_| | | | | \  :::\#
//  |___/\__\__,_|_| |_|\__|_| |_|\___|_.__/|_|\__,_|_| |_|  \  '::\#
//                                                            \     \#
let pName = document.getElementById('pokeName');
let pNum = document.getElementById('pokeNum');
let pHeight = document.getElementById('pokeHeight');
let pWeight = document.getElementById('pokeWeight');
let pLookupTxt = document.getElementById('pokeTxt');
let pType = document.getElementById('pokeType');

pLookupTxt.addEventListener("input", lookupPoke);

/**
 *  Main function, is called when event listener is called.
 *  Fetches the data from pokeapi.co
 *  Then we scrub the data and display info in the DOM
 * 
 *  get data from api using fetch('url')
 *  use .then to handle the response/reject promise
 */
function lookupPoke() {
    clearTable();

    fetch("https://pokeapi.co/api/v2/pokemon/" + pLookupTxt.value)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        getAbilities(data);
        // getImage(data);
        getImage2(data);
        let type = getType(data);

        pName.innerHTML = "Pokémon name: " + data.name;
        pNum.innerHTML = "Pokémon Number: " + data.id;
        pHeight.innerHTML = "Pokémon Height: " + data.height/10 + " m";
        pWeight.innerHTML = "Pokémon weight: " + data.weight/10 + " kgs";
        pType.innerHTML = "Pokémon type: " + type;
    })
}
/**
 * getAbilities takes an object 
 * finds and displays the abilities
 *
 * @param {object} data
 */
function getAbilities(data) {
    let pAbil = data.abilities;
    const board = document.getElementById('board');

    for(let x = 0; x < data.abilities.length; x++)
    {
        const abilRow = document.createElement('tr');
        abilRow.setAttribute('id', 'abil_' + x+1);
        abilRow.textContent = "Ability " + parseInt(x+1, 10) + ": " + pAbil[x].ability.name;
        board.append(abilRow);        
    }
}

/**
 * Gets the type of the pokemon and combines them together
 * to return a string
 *
 * @param {object} data
 * @return {string} 
 */
function getType(data) {   
    let pType = data.types;
    let a = pType[0].type.name;
    for(let x = 1; x < pType.length; x++)
    {
        a = a.concat("/", pType[x].type.name);
    }
    return a;
}

/**
 * Gets the image link from the data obj
 *
 * @param {object} data
 */
function getImage(data) {
    let url = data.sprites.other.home.front_default;
    // let url = data.sprites.other.official/-artwork.front_default;
    console.log(url)
    changeImg(url);
}

function getImage2(data) {
    var pokNum = data.id
    src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + pokNum +'.png',
    //     img = document.createElement('img');
    changeImg(src);
    // img.src = src;
    // document.body.appendChild(img);
}

/**
 * Changes the image
 *
 * @param {string} link
 */
function changeImg(link) {
    document.getElementById("pokeImg").src = link;
}

/**
 * Clears the table of abilities
 */
function clearTable() {
    let table = document.getElementById("board")
    let length = table.rows.length;
    console.log(length) 
    for(let x = 0; x < length; x++)
    {
        table.deleteRow(0);
    }
}