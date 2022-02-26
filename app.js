// var car = {
//     make: "Jeep", 
//     model: "Wrangler",
//     wheels: {
//         spare: 1,
//         onGround: 4
//     },
//     color: "Blue"
// }
// console.log(car.wheels.onGround)

// let p = new Promise((resolve, reject) => {
//     let a = 1 + 2;
//     if (a == 2)
//     {
//         resolve("Success")
//     }
//     else {
//         reject("Failed")
//     }
// });
// p.then((message) => {
//     console.log("We are in the 'then' " + message);
// }).catch((message) => {
//     console.log("We are in the 'Catch' " + message)
// });

// console.log(p)


// let btn = document.getElementById("subButton")
// btn.addEventListener("click", checkName)

// function checkName() {
//     let p = new Promise((resolve, reject) => {
//         let n = document.getElementById("nameTxt").value;
//         if (n.length >= 4)
//         {
//             resolve(n + "2")
//         }
//         else {
//             reject(n)
//         }
//     });
//     p.then((message) => {
//         console.log("Name worked " + message);
//     }).catch((message) => {
//         console.log("404 Error: Longer name pls " + message)
//     });
// }




let pName = document.getElementById('pokeName');
let pNum = document.getElementById('pokeNum');
let pHeight = document.getElementById('pokeHeight');
let pWeight = document.getElementById('pokeWeight');
let pLookupTxt = document.getElementById('pokeTxt');
let pType = document.getElementById('pokeType');

let btn = document.getElementById('subButton');

pLookupTxt.addEventListener("input", lookupPoke);

function lookupPoke() {
    clearTable();


    // console.log(pLookupTxt.value)
    //get data from api using fetch('url')
    //use .then to handle the response/reject promise

    fetch("https://pokeapi.co/api/v2/pokemon/" + pLookupTxt.value)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        // console.log(data)
        // console.log(data.name)
        // console.log(data.abilities[1].ability.name)
        // console.log(pLookupTxt.value)

        getAbilities(data);
        getImage(data);
        let type = getType(data);

        pName.innerHTML = "Pokémon name: " + data.name;
        pNum.innerHTML = "Pokémon Number: " + data.id;
        pHeight.innerHTML = "Pokémon Height: " + data.height/10 + " m";
        pWeight.innerHTML = "Pokémon weight: " + data.weight/10 + " kgs";
        pType.innerHTML = "Pokémon type: " + type;
    })
}

function getAbilities(data)
{
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

function getType(data)
{   
    let pType = data.types;
    // console.log(pType)
    let a = pType[0].type.name;
    for(let x = 1; x < pType.length; x++)
    {
        a = a.concat("/", pType[x].type.name);
    }
    return a;
}

function getImage(data) 
{
    let url = data.sprites.other.home.front_default;
    // let url = data.sprites.other.official/-artwork.front_default;
    console.log(url)
    changeImg(url);
}
function changeImg(a) 
{
    document.getElementById("pokeImg").src = a;
}

function clearTable() {
    let table = document.getElementById("board")
    let length = table.rows.length;
    console.log(length) 
    for(let x = 0; x < length; x++)
    {
        table.deleteRow(0);
    }
}