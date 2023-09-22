import {compareNumeric, debounce, shuffle} from './util.js';
import { setupHandlers } from'./big-picture.js';

const photosListElement = document.querySelector('.pictures');
const PhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const TIMEOUT_DELAY = 500;
const imgFilterSection = document.querySelector('.img-filters');
const imgFilteFormElement = document.querySelector('.img-filters__form');
const RANDOM_FOTOS_NUMBER = 10;

const renderPhotos = (photos) => {
  const photosListFragment = document.createDocumentFragment();

  photos.forEach(({url, description, likes, comments, id}) => {
    const photoElement = PhotoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.dataset.id = id;
    photosListElement.appendChild(photoElement);
  });

  photosListElement.appendChild(photosListFragment);
};

function updatePreviews(photos, id) {
  const previewElements = document.querySelectorAll('.pictures .picture');

  Array.from(previewElements).forEach((element) => {
    element.remove();
  });


  if (id === 'filter-default') {
    renderPhotos(photos);
    setupHandlers(photos);
  } else if (id === 'filter-discussed') {
    renderPhotos(photos.sort(compareNumeric));
    setupHandlers(photos);
  } else if (id === 'filter-random') {
    const nextPhotos = shuffle(photos).slice(0, RANDOM_FOTOS_NUMBER);
    renderPhotos(nextPhotos);
    setupHandlers(nextPhotos);
  }
}

const debouncedUpdatePreviews = debounce(updatePreviews, TIMEOUT_DELAY);

function showFilter(photos) {
  imgFilterSection.classList.remove('img-filters--inactive');
  const filterClickHandler = (evt) => {
    const buttons = imgFilteFormElement.children;

    for(let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('img-filters__button--active');
    }
    const activeButton = imgFilteFormElement.querySelector(`#${evt.target.id}`);
    activeButton.classList.add('img-filters__button--active');
    debouncedUpdatePreviews(photos.slice(), evt.target.id);

  };

  imgFilteFormElement.addEventListener('click', filterClickHandler);
}

export { renderPhotos, showFilter };
