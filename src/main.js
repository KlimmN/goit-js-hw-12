import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const formElem = document.querySelector('.form');
formElem.addEventListener('submit', event => {
  event.preventDefault();
  const query = event.target.elements['search-text'].value.trim();
  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query',
      position: 'topRight',
    });
    return;
  }

  showLoader();
  clearGallery();

  getImagesByQuery(query)
    .then(data => {
      const { hits = [] } = data;
      if (hits.length === 0) {
        iziToast.error({
          message: 'No images found. Try another query.',
          position: 'topRight',
        });
        return;
      }
      createGallery(hits);
    })
    .catch(err => {
      iziToast.error({
        message: 'Request failed',
        position: 'topRight',
      });
      console.error(err);
    })
    .finally(() => {
      hideLoader();
      event.target.reset();
    });
});