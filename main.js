'use strict';
const list = document.querySelector('.js-list');
let kittenDataList = [];
const input_search_race = document.querySelector('.js_in_search_race');
const input_search_desc = document.querySelector('.js_in_search_desc');
const buttonSearch = document.querySelector('.js-button-search');
const spanAdd = document.querySelector('.new');
const buttonCancel = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const labelMessageError = document.querySelector('.js-label-error');
const button_add = document.querySelector('.js-btn-add');
const inputRace = document.querySelector('.js-input-race');
const GITHUB_USER = 'AndreaFerreiro';
const SERVER_URL = `https://dev.adalab.es/api/kittens/${GITHUB_USER}`;
const kittenListStored = JSON.parse(localStorage.getItem(kittenDataList));


function filterKitten(event) {
  const descrSearchText = input_search_desc.value;
  const raceSearchText = input_search_race.value;
  event.preventDefault();
  list.innerHTML = ' ';
  if (descrSearchText === '' && raceSearchText === '') {
    list.innerHTML = 'Rellena algún campo';
  } else if (descrSearchText !== '' && raceSearchText !== '') {
    const descracefilter = kittenDataList.filter(
      (kitten) =>
        kitten.desc.includes(descrSearchText) ||
        kitten.race.includes(raceSearchText)
    );
    descracefilter.map((kitten) => {
      renderKitten(kitten);
    });
  } else if (raceSearchText !== '') {
    const filterRaceKitten = kittenDataList.filter((kitten) =>
      kitten.race.includes(raceSearchText)
    );
    filterRaceKitten.map((kitten) => {
      renderKitten(kitten);
    });
  } else if (descrSearchText !== '') {
    const filterDescKitten = kittenDataList.filter((kitten) =>
      kitten.desc.includes(descrSearchText)
    );
    filterDescKitten.map((kitten) => {
      renderKitten(kitten);
    });
  }
}

function handleClickNewCatForm(event) {
  event.preventDefault();
  const form = document.querySelector('.new-form');
  /*form.classList.toggle('collapsed');*/ /*otra manera de hacerlo*/
  if (form.classList.contains('collapsed')) {
    form.classList.remove('collapsed');
  } else {
    form.classList.add('collapsed');
  }
}

function handleButtonCancel(event) {
  event.preventDefault();
  form.classList.add('collapsed');
}

function addNewKitten(event) {
  event.preventDefault();
  let valueDesc = inputDesc.value;
  let valuePhoto = inputPhoto.value;
  let valueName = inputName.value;
  let valueRace = inputRace.value;
  if (valueDesc === '' || valuePhoto === '' || valueName === '') {
    labelMessageError.innerHTML = '¡Uy! parece que has olvidado algo.';
  } else {
    const newkittenDataObject = {
      image: valuePhoto,
      name: valueName,
      desc: valueDesc,
      race: valueRace,
    };
    kittenDataList.push(newkittenDataObject);
    labelMessageError.innerHTML = 'Mola!Un nuevo gatito en Adalab!';
    inputDesc.value = '';
    inputPhoto.value = '';
    inputName.value = '';
    inputRace.value = '';
    renderKitten(newkittenDataObject);
    const newKittenDataObject = {
      image: valuePhoto,
      name: valueName,
      desc: valueDesc,
      race: valueRace,
    };
      fetch(`https://dev.adalab.es/api/kittens/${GITHUB_USER}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newKittenDataObject),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            localStorage.setItem('cats', JSON.stringify(kittenDataList));
          } else {
            console.log('algo va mal')
          }
        });

  }
}

function renderKitten(kittenData) {
    kittenData = `<li class="card">
    <article>
    <img
    class="card_img"
    src= ${kittenData.image}
    alt="siames-cat"
    />
    <h3 class="card_title">${kittenData.name.toUpperCase()}</h3>
    <h4 class="card_race">${kittenData.race}</h4>
    <p class="card_description">
    ${kittenData.desc}
    </p>
    </article>
    </li>`;
    
    list.innerHTML += kittenData;
}

function initialListKitten() {
    if (kittenListStored) {
        for (let i = 0; i < kittenListStored.length; i++) {
            renderKitten(kittenListStored[i]);
        }
    } else {
        fetch(`${SERVER_URL}`)
        .then((response) => response.json())
        .then((data) => {
            kittenDataList = data.results;
            for (let i = 0; i < kittenDataList.length; i++) {
                renderKitten(kittenDataList[i]);
            }
            localStorage.setItem('cats', JSON.stringify(kittenDataList));
        });
    }
}


initialListKitten()


button_add.addEventListener('click', addNewKitten);
buttonCancel.addEventListener('click', handleButtonCancel);
buttonSearch.addEventListener('click', filterKitten);
spanAdd.addEventListener('click', handleClickNewCatForm);