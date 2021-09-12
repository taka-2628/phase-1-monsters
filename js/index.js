let pageNum = 1;

// GET FETCH AND RENDER RESPONSE 
function getFetch(pageNum){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
    .then(res => res.json())
    .then(monstersArr => {
        document.querySelector('#monster-container').innerHTML=''
        handleMonsterArr(monstersArr)
    })
}

function handleMonsterArr(monstersArr){
    for (let monster of monstersArr){
        renderMonster(monster);
    }
}

function renderMonster(monster){
    // grab <div> by its id
    let container = document.getElementById('monster-container');

    // create <div>
    let div = document.createElement('div');

    // create <h2> / <h4> / <p> 
    let h2 = document.createElement('h2');
    h2.textContent = `Name: ${monster['name']}`
    let h4 = document.createElement('h4');
    h4.textContent = `Age: ${monster['age']}`
    let p =document.createElement('p');
    p.textContent = `Description: ${monster['description']}`;

    // append h2 / h4 / p to div
    div.appendChild(h2);
    div.appendChild(h4);
    div.appendChild(p)

    // append div to container
    container.appendChild(div);
}


// CREATE FORM AND POST FETCH
function createForm(){
    // grab <div> by its id
    let formContainer = document.querySelector('#create-monster');

    // create <form> 
    let form = document.createElement('form');

    // create 3 <input>s and <button>
    let nameInput = document.createElement('input');
    let ageInput = document.createElement('input');
    let descInput = document.createElement('input');
    let createBtn = document.createElement('button');

    // add placeholder to nameInput / ageInput / descInput and add textContent to createBtn
    nameInput.placeholder = 'name...';
    ageInput.placeholder = 'age...';
    descInput.placeholder = 'description...';
    createBtn.textContent = 'Create';

    // appned nameInput / ageInput / descInput / createBtn to form 
    form.appendChild(nameInput);
    form.appendChild(ageInput);
    form.appendChild(descInput);
    form.appendChild(createBtn);

    // append form to formContainer
    formContainer.appendChild(form);

    // add event listener to form
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let monsterObj = {
            name: nameInput.value,
            age: ageInput.value,
            description: descInput.value,
        };
        postFetch(monsterObj);
    })
}

function postFetch(monsterObj){
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accpet: 'application/json'
        }, 
        body: JSON.stringify(monsterObj)
    })
    .then(res => res.json())
    .then(newMonster => {
        renderMonster(newMonster)
    })
}

// PAGE NAVIGATION 
function navigatePage(){
    let forwardBtn = document.getElementById('forward');
    forwardBtn.addEventListener('click', () => {
        pageNum ++;
        getFetch(pageNum);
    }); 

    let backBtn = document.getElementById('back');
    backBtn.addEventListener('click', () => {
        1 < pageNum ? (pageNum --, getFetch(pageNum)) : alert('Aint no monsters here')
    });
}

// INITIALIZE
function init(){
    getFetch();
    createForm();
    navigatePage();
}

document.addEventListener('DOMContentLoaded', () => {
    init();
})