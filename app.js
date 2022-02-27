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
const pName = document.getElementById('pokeName');
const pNum = document.getElementById('pokeNum');
const pHeight = document.getElementById('pokeHeight');
const pWeight = document.getElementById('pokeWeight');
const pLookupTxt = document.getElementById('pokeTxt');
const pType = document.getElementById('pokeType');
const pImg = document.getElementById('pokeImg');
const board = document.getElementById('board');
const butDown = document.getElementById('butDown');
const butUp = document.getElementById('butUp');
const logoImg = document.getElementById('logolink');
const pokeN = document.getElementById('pokeN');

pLookupTxt.addEventListener('input', lookupPokeName);
pokeN.addEventListener('input', lookupPokeNum);
butDown.addEventListener('click', changeDown);
butUp.addEventListener('click', changeUp);


/**
 *  Main function, is called when event listener is called.
 *  Fetches the data from pokeapi.co
 *  Then we scrub the data and display info in the DOM
 * 
 *  get data from api using fetch('url')
 *  use .then to handle the response/reject promise
 */
 function lookupPokeNum() {
    clearTable();

    fetch("https://pokeapi.co/api/v2/pokemon/" + pokeN.value)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        logoImg.setAttribute("href", "https://pokeapi.co/api/v2/pokemon/" + data.id)
        getAbilities(data);
        // getImage(data);
        getImage2(data);
        let type = getType(data);
        let name = data.name.toLowerCase();
        let name2 = name[0].toUpperCase() + name.slice(1).toLowerCase();
        if (pokeN.value != null)
        {
            pLookupTxt.value = name2;
        }
        if (pLookupTxt.value != null) {
            pokeN.value = data.id
        }
        pName.innerHTML = "Pokémon Name: " + name2;
        pNum.innerHTML = "Pokémon Number: " + data.id;
        let h = Math. round(100*data.height*10*0.0328084)/100;
        pHeight.innerHTML = "Pokémon Height: " + data.height*10 + " cm / " + data.height/10 + " m / " + h + " ft";
        let w = Math. round(100*data.weight/10*2.20462262)/100;
        pWeight.innerHTML = "Pokémon Weight: " + data.weight/10 + " kgs / " + w + " lbs";
        pType.innerHTML = "Pokémon Type: " + type;
    })
    .catch(() => {
        pokeData();
    })
}

/**
 *  Main function, is called when event listener is called.
 *  Fetches the data from pokeapi.co
 *  Then we scrub the data and display info in the DOM
 * 
 *  get data from api using fetch('url')
 *  use .then to handle the response/reject promise
 */
 function lookupPokeName() {
    clearTable();

    fetch("https://pokeapi.co/api/v2/pokemon/" + pLookupTxt.value.toLowerCase())
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        logoImg.setAttribute("href", "https://pokeapi.co/api/v2/pokemon/" + data.id)
        getAbilities(data);
        // getImage(data);
        getImage2(data);
        let type = getType(data);
        let name = data.name.toLowerCase();
        let name2 = name[0].toUpperCase() + name.slice(1).toLowerCase();
        if (pokeN.value != null)
        {
            pLookupTxt.value = name2;
        }
        if (pLookupTxt.value != null) {
            pokeN.value = data.id
        }
        pName.innerHTML = "Pokémon Name: " + name2;
        pNum.innerHTML = "Pokémon Number: " + data.id;
        let h = Math. round(100*data.height*10*0.0328084)/100;
        pHeight.innerHTML = "Pokémon Height: " + data.height*10 + " cm / " + data.height/10 + " m / " + h + " ft";
        let w = Math. round(100*data.weight/10*2.20462262)/100;
        pWeight.innerHTML = "Pokémon Weight: " + data.weight/10 + " kgs / " + w + " lbs";
        pType.innerHTML = "Pokémon Type: " + type;
        
    })
    .catch(() => {
        pokeData();
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

    for(let x = 0; x < data.abilities.length; x++) {
        const abilRow = document.createElement('tr');
        abilRow.setAttribute('id', 'abil_' + x+1);
        let name = pAbil[x].ability.name;
        let name2 = name[0].toUpperCase() + name.slice(1).toLowerCase();
        abilRow.textContent = "Ability " + parseInt(x+1, 10) + ": " + name2;
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
    for(let x = 1; x < pType.length; x++) {
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
    // let url = data.sprites.other.official-artwork.front_default;
    // console.log(url)
    changeImg(url);
}

/**
 * Gets the image link from url 
 * using the id from data obj
 *
 * @param {object} data
 */
function getImage2(data) {
    var pokNum = data.id
    src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + pokNum +'.png',
    changeImg(src);
}

/**
 * Changes the image src
 *
 * @param {string} link
 */
function changeImg(link) {
    pImg.src = link;
}

/**
 * Clears the table of abilities
 */
function clearTable() {
    let length = board.rows.length;
    // console.log(length) 
    for(let x = 0; x < length; x++) {
        board.deleteRow(0);
    }
}

/**
 *  Change data for derpachu
 */
function pokeData() {
    changeImg("https://i.ytimg.com/vi/7gvKoUzlDsA/maxresdefault.jpg")
    clearTable()

    pName.innerHTML = "Pokémon Name: Derpachu";
    pNum.innerHTML = "Pokémon Number: <b><i>all of them</i></b>";
    pHeight.innerHTML = "Pokémon Height: 205 cm / 2.05 m / 6.73 ft";
    pWeight.innerHTML = "Pokémon Weight: 95.25 kg / 194.90 lbs";
    pType.innerHTML = "Pokémon Type: dumb/slow/persistent";

    const abilRow1 = document.createElement('tr');
    const abilRow2 = document.createElement('tr');    
    const abilRow3 = document.createElement('tr');

    abilRow1.setAttribute('id', 'abil_1');
    abilRow2.setAttribute('id', 'abil_2');
    abilRow3.setAttribute('id', 'abil_3');

    abilRow1.textContent = "Ability 1: Say - Says 'Derp' and the enemy instantly dies.";
    abilRow2.textContent = "Ability 2: Stare - Stares at opponent until death. -brutal-";
    abilRow3.textContent = "Ability 3: Screech - All those around will hear the mighty roar.";
    
    board.append(abilRow1);
    board.append(abilRow2);
    board.append(abilRow3);
}

/**
 * Changes the value of the textbox -- with click of button
 */
function changeDown() {
    let val = pokeN.value;
    let newV = parseInt(val);
    if (newV > 1) {
        newV--;
        pLookupTxt.value = newV;
        pokeN.value = newV;
        lookupPokeNum();
    }
    else {
        newV = 0;
        pLookupTxt.value = newV;
        pokeN.value = newV;
        pokeData()
    }
}

/**
 * Changes the value of the textbox ++ with click of button
 */
function changeUp() {
    let val = pokeN.value;
    let newV = parseInt(val);

    if (newV < 898) {
        newV++;
        pLookupTxt.value = newV;
        pokeN.value = newV;
        lookupPokeNum();
    }
    else {
        newV++;
        pLookupTxt.value = newV;
        pokeN.value = newV;
        pokeData()
    }  
    if (val == "") {
        newV = 1;
        pLookupTxt.value = newV;
        pokeN.value = newV;
        lookupPokeNum();
    }
}