// cat-api.js
import axios from 'axios';

const API_URL = 'https://api.thecatapi.com/v1/images/search';

// Функция для отримання інформації про кота за ідентифікатором породи
export const fetchCatByBreed = async breedId => {
  try {
    const response = await axios.get(`${API_URL}?breed_ids=${breedId}`);
    return response.data;
  } catch (error) {
    console.error('При отриманні інформації про кота виникла помилка:', error);
    throw error;
  }
};
