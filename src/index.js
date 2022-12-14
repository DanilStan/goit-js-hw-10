import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const countryInput = document.querySelector('#search-box');
let countryList = document.querySelector('.country-list');
let countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

countryInput.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  let inputValue = event.target.value.trim();
  if (inputValue === '') {
    resetFunc(countryInfo, countryList);
  } else {
    fetchCountries(inputValue)
      .then(value => {
        makcupList(value);
      })
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
      });
  }
}

function resetFunc(clearHtml) {
  clearHtml.innerHTML = '';
}

function makcupList(value) {
  if (value.length > 10) {
    resetFunc(countryList, countryInfo);
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }

  //   for (let i = 0; i < value.length; i += 1) {
  //     const status = {
  //       name: value[i].name,
  //       capital: value[i].capital,
  //       population: value[i].population,
  //       flags: value[i].flags.svg,
  //       languages: value[i].languages,
  //     };
  //     status.languages = status.languages[0].nativeName;

  if (value.length > 1 && value.length < 10) {
    console.log(value);
    countryList.insertAdjacentHTML('beforeend', infoMarkup(value));
    resetFunc(countryInfo);
  } else if (value.length === 1) {
    console.log(value);
    countryInfo.insertAdjacentHTML('beforeend', cardMarkup(value));
    resetFunc(countryList);
  }
}
// }

function infoMarkup(value) {
  return value
    .map(({ flags, name }) => {
      return `<li class="info__item"><img src="${flags.svg}" alt="Country Flag" class="info__image"><span>${name}</span></li>`;
    })
    .join('');
  //   countryList.insertAdjacentHTML(
  //     'beforeend',
  //     `<li class="info__item"><img src="${flags}" alt="Country Flag" class="info__image"><span>${name}</span></li>`
  //   );
}

function cardMarkup(value) {
  return value
    .map(({ flags, capital, population, languages, name }) => {
      const languagesArr = languages.map(value => value.name);
      return `<ul class="card__list">
        <li class="card__item"><img class="card__img" src="${flags.svg}" alt="Country Flag"></img><span class="card__text"><b> ${name}</b></span></li>
        <li class="list__item"><span><b>Capital:</b> ${capital}</span></li>
        <li class="list__item"><span><b>Population</b>: ${population}</span></li>
        <li class="list__item"><span><b>Languages</b>: ${languagesArr}</span></li>
  </ul>`;
    })
    .join('');
  //   countryInfo.insertAdjacentHTML(
  //     'beforeend',
  //     `<ul class="card__list">
  //         <li class="card__item"><img class="card__img" src="${flags}" alt="Country Flag"></img><span class="card__text"><b> ${name}</b></span></li>
  //         <li class="list__item"><span><b>Capital:</b> ${capital}</span></li>
  //         <li class="list__item"><span><b>Population</b>: ${popupaltion}</span></li>
  //         <li class="list__item"><span><b>Languages</b>: ${languages}</span></li>
  //   </ul>`
  //   );
}
