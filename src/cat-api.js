import axios from 'axios';
export { fetchBreeds, fetchCatByBreed };
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_yp906wtcEPJuX5du0SOgJkHJeFbYyNaTl4Hd32P7anVvYHl8mjjlUIKSYquuHnJ6';

const BASE_URL = 'https://api.thecatapi.com/v1';
const IMG_SRCH = '/images/search';
const API_KEY =
  'live_yp906wtcEPJuX5du0SOgJkHJeFbYyNaTl4Hd32P7anVvYHl8mjjlUIKSYquuHnJ6';
const BREAD_IDS = 'breed_ids=';
const BREAD = '/breeds';

function fetchBreeds() {
  return axios
    .get(`${BASE_URL}${BREAD}`)
    .then(response => response.data)
    .catch(error => {
      throw new Error('Oops! Something went wrong! Try reloading the page!');
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}${IMG_SRCH}?${BREAD_IDS}${breedId}`)
    .then(responce => {
      return responce.data;
    })
    .catch(error => {
      throw new Error(
        (error.statusText =
          'Oops! Something went wrong! Try reloading the page!')
      );
    });
}
