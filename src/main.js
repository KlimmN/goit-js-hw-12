// main.js
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const formElem = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
const PER_PAGE = 15;

formElem.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onFormSubmit(event) {
  event.preventDefault();

  const query = event.target.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query',
      position: 'topRight',
    });
    return;
  }

  // новый поиск → сбрасываем страницу и текущий запрос
  currentQuery = query;
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const { hits = [], totalHits: total = 0 } = data;
    totalHits = total;

    if (!hits.length) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(hits);

    const loaded = currentPage * PER_PAGE;
    if (loaded < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    event.target.reset();
  } catch (err) {
    iziToast.error({
      message: 'Request failed. Please try again later.',
      position: 'topRight',
    });
    console.error(err);
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  currentPage += 1;

  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const { hits = [] } = data;

    if (!hits.length) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }

    // высота карточки до скролла
    const firstCard = document.querySelector('.gallery-item');
    let cardHeight = 0;
    if (firstCard) {
      const rect = firstCard.getBoundingClientRect();
      cardHeight = rect.height;
    }

    createGallery(hits);

    // плавный скролл на 2 высоты карточки
    if (cardHeight) {
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    const loaded = currentPage * PER_PAGE;
    if (loaded >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (err) {
    iziToast.error({
      message: 'Request failed. Please try again later.',
      position: 'topRight',
    });
    console.error(err);
  } finally {
    hideLoader();
  }
}
