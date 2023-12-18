// index.js
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('select.breed-select');
const loader = document.querySelector('p.loader');
const catInfoContainer = document.querySelector('div.cat-info');
const errorElement = document.querySelector('p.error');

// Функція для показу завантажувача
const showLoader = () => {
  loader.style.display = 'block';
};

// Функція для приховування завантажувача
const hideLoader = () => {
  loader.style.display = 'none';
};

// Функція для приховування/показу елементів інтерфейсу
const toggleUI = showUI => {
  breedSelect.style.display = showUI ? 'block' : 'none';
  catInfoContainer.style.display = showUI ? 'block' : 'none';
};

// Функція для виведення помилки та приховування інтерфейсу
const showError = message => {
  console.error(message);
  errorElement.style.display = 'block';
  toggleUI(false);
  hideLoader();
};

// Обробник зміни вибору породи
breedSelect.addEventListener('change', async event => {
  const selectedBreedId = event.target.value;

  // При зміні вибору породи приховуємо помилку та показуємо завантажувач
  errorElement.style.display = 'none';
  showLoader();

  try {
    // Викликаємо функцію fetchCatByBreed() при зміні вибору породи
    const catInfo = await fetchCatByBreed(selectedBreedId);

    // Відображаємо інформацію про кота на сторінці
    toggleUI(true);
    hideLoader();

    // Решта коду для виведення інформації про кота
    const cat = catInfo[0];
    const catImage = document.createElement('img');
    catImage.src = cat.url;

    const breedName = document.createElement('h2');
    breedName.textContent = cat.breeds[0].name;

    const description = document.createElement('p');
    description.textContent = `Опис: ${cat.breeds[0].description}`;

    const temperament = document.createElement('p');
    temperament.textContent = `Темперамент: ${cat.breeds[0].temperament}`;

    catInfoContainer.innerHTML = '';
    catInfoContainer.appendChild(catImage);
    catInfoContainer.appendChild(breedName);
    catInfoContainer.appendChild(description);
    catInfoContainer.appendChild(temperament);
  } catch (error) {
    // Виводимо помилку та приховуємо інтерфейс
    showError('При отриманні інформації про кота виникла помилка.');
  }
});

// Ініціалізація при завантаженні сторінки
window.addEventListener('load', async () => {
  // Приховуємо помилку, завантажувач та інтерфейс
  errorElement.style.display = 'none';
  hideLoader();
  toggleUI(false);

  try {
    // Викликаємо функцію fetchBreeds() для заповнення селекта порід
    const breeds = await fetchBreeds();

    // Решта коду для виведення списку порід
    // ...

    // Показуємо інтерфейс
    toggleUI(true);
  } catch (error) {
    // Виводимо помилку та приховуємо інтерфейс
    showError('При отриманні списку порід виникла помилка.');
  }
});
