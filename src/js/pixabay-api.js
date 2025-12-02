// js/pixabay-api.js
import axios from 'axios';

const API_KEY = '53335895-4d104a908de65f21952c0d536';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,        // номер страницы
      per_page: 15 // по ТЗ должно быть 15
    },
  });

  return response.data; // { hits, totalHits, ... }
}
