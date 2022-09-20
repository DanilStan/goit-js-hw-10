import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v2/name/${name}?fullText=true,fields=name,capital,population,languages,flags`
  ).then(response => {
    if (!response.ok) {
      throw new Error();
      // Notify.failure('Oops, there is no country with that name')
    }
    return response.json();
  });
}
