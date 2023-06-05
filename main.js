'use strict'
const list = document.querySelector(".js-list");
const kittenDataList = [
    {
        image: 'https://dev.adalab.es/gato-siames.webp',
        name: 'Anastacio',
        desc: ' Porte elegante, su patrón de color tan característico y sus ojos de un azul intenso, pero su historia se remonta a Asía al menos hace 500 años, donde tuvo su origen muy posiblemente.',
        race: 'Siamés',
    }, 
    {
        image: 'https://dev.adalab.es/sphynx-gato.webp',
        name: 'Fiona',
        desc: ' Produce fascinación y curiosidad. Exótico, raro, bello, extraño… hasta con pinta de alienígena han llegado a definir a esta raza gatuna que se caracteriza por la «ausencia» de pelo.',
        race: 'Sphynx',
    }, 
    {
        image: 'https://dev.adalab.es/maine-coon-cat.webp',
        name: 'Cielo',
        desc: ' Tienen la cabeza cuadrada y los ojos simétricos, por lo que su bella mirada se ha convertido en una de sus señas de identidad. Sus ojos son grandes y las orejas resultan largas y en punta.',
        race: 'Maine Coon',
    }
];
const elementOne = `
<li class="card one">
    <article>
        <img class="card_img" src= ${kittenDataList[0].image} alt="siames-cat"/>
        <h3 class="card_title"> ${kittenDataList[0].name}</h3>
        <h4 class="card_race"> ${kittenDataList[0].race}</h4>
        <p class="card_description"> ${kittenDataList[0].desc}</p>
    </article>
</li>`;
const elementTwo = `
<li class="card two">
    <img class="card_img" src=${kittenDataList[1].image} alt="sphynx-cat"/>
    <h3 class="card_title">${kittenDataList[1].name}</h3>
    <h4 class="card_race">${kittenDataList[1].race}</h4>
    <p class="card_description">${kittenDataList[1].desc}</p>
</li>`;
const elementThree =`
<li class="card three"><img class="card_img" src="${kittenDataList[2].image}" alt="maine-coon-cat"/>
    <h3 class="card_title">${kittenDataList[2].name}</h3>
    <h4 class="card_race">${kittenDataList[2].race}</h4>
    <p class="card_description">${kittenDataList[2].desc}</p>
</li>`;
list.innerHTML = elementOne + elementTwo + elementThree;
const input_search_race = document.querySelector('.js_in_search_race'); 
const input_search_desc = document.querySelector('.js_in_search_desc');
const buttonSearch = document.querySelector('.js-button-search');
function filterKitten (event) { 
    const descrSearchText = input_search_desc.value;
    const raceSearchText = input_search_race.value; 
    event.preventDefault();
    list.innerHTML="";
    if( kittenDataList[0].desc.includes(descrSearchText) || kittenDataList[0].race === raceSearchText){
        list.innerHTML += elementOne;
    }   
    if( kittenDataList[1].desc.includes(descrSearchText) || kittenDataList[1].race === raceSearchText){
        list.innerHTML += elementTwo;
    }   
    if( kittenDataList[2].desc.includes(descrSearchText) || kittenDataList[2].race === raceSearchText){
        list.innerHTML += elementThree;
    }
}
buttonSearch.addEventListener('click', filterKitten);
const spanAdd = document.querySelector('.new');
function handleClickNewCatForm(event) {
    event.preventDefault(); 
    const form =document.querySelector('.new-form');
    /*form.classList.toggle('collapsed');*/ /*otra manera de hacerlo*/
    if (form.classList.contains('collapsed')) {
        form.classList.remove('collapsed');
    } else {
        form.classList.add('collapsed');
    }
}
spanAdd.addEventListener('click', handleClickNewCatForm);
function handleButtonCancel(event) {
    event.preventDefault(); 
    form.classList.add('collapsed')
}
const buttonCancel = document.querySelector('.js-btn-cancel');
buttonCancel.addEventListener('click', handleButtonCancel);
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const labelMessageError = document.querySelector('.js-label-error');
const button_add = document.querySelector(".js-btn-add");
const inputRace = document.querySelector('.js-input-race');
function addNewKitten(event) {
    const valueDesc = inputDesc.value;
    const valuePhoto = inputPhoto.value;
    const valueName = inputName.value;
    const valueRace = inputRace.value; 
    if (valueDesc === '' || valuePhoto === '' || valueName === '') {
        labelMessageError.innerHTML = '¡Uy! parece que has olvidado algo.';
    }
    else {
        list.innerHTML(` 
        <li class="card one">
        <article>
            <img class="card_img" src= ${valuePhoto} alt="siames-cat"/>
            <h3 class="card_title"> ${valueName}</h3>
            <h4 class="card_race"> ${valueRace}</h4>
            <p class="card_description"> ${valueDesc}</p>
        </article>
    </li>`)
  }
}
button_add.addEventListener('click', addNewKitten);