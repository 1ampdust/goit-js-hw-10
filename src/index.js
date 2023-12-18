import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

// https://api.thecatapi.com/v1/breeds

const loader = document.querySelector('.loader');
const errors = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const breadSelect = document.querySelector('.breed-select');

breadSelect.addEventListener('change', handleChange);

errors.style.visibility = 'hidden';
breadSelect.style.visibility = 'hidden';
loader.style.display = 'block';

fetchBreeds()
  .then(responce => {
    breadSelect.style.visibility = 'visible';
    loader.style.display = 'none';
    const pets = responce
      .map(({ id, name }) => {
        return `<option value="${id}">${name}</option>`;
      })
      .join('');
    breadSelect.insertAdjacentHTML('beforeend', pets);
  })
  .catch(error => {
    setTimeout(() => {
      Notiflix.Notify.warning(`${error}`);
      loader.style.display = 'none';
    }, 500);
  });

function handleChange() {
  catInfo.style.visibility = 'hidden';
  loader.style.display = 'block';

  const selectBread = breadSelect.value;
  fetchCatByBreed(selectBread)
    .then(responce => {
      catInfo.style.visibility = 'visible';
      loader.style.display = 'none';

      const informations = responce
        .map(({ url, breeds }) => {
          return `
            <img class="breeds-img" src="${url}"/>
            <h2 class="breeds-caption">${breeds[0].name}</h2>
            <div class="breeds-container">
            <h3 class="breeds-title">${breeds[0].temperament}</h3>
            <p class="breeds-text">${breeds[0].origin}</p>
            <p class="breeds-text">Weight: ${breeds[0].weight.imperial}, ${breeds[0].weight.metric}</p>
            <p class="breeds-text">Life span: ${breeds[0].life_span}</p>
            <a class="breeds-link" href="${breeds[0].wikipedia_url}">Wikipedia info</a>
            </div>
            `;
        })
        .join('');
      catInfo.innerHTML = `${informations}`;
    })
    .catch(error => {
      setTimeout(() => {
        Notiflix.Notify.warning(`${error}`);
        loader.style.display = 'none';
      }, 500);
    });
}
