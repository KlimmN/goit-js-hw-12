import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-item">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" />
          </a>
          <ul class="stats">
  <li class="stats-item">
    <span class="stats-label">Likes</span>
    <span class="stats-value">${likes}</span>
  </li>
  <li class="stats-item">
    <span class="stats-label">Views</span>
    <span class="stats-value">${views}</span>
  </li>
  <li class="stats-item">
    <span class="stats-label">Comments</span>
    <span class="stats-value">${comments}</span>
  </li>
  <li class="stats-item">
    <span class="stats-label">Downloads</span>
    <span class="stats-value">${downloads}</span>
  </li>
</ul>
</li>
    `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
      captionPosition: 'bottom',
    });
  }
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}