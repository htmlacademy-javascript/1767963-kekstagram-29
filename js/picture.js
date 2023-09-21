import {compareNumeric, debounce, shuffle} from './util.js';

const photosListElement = document.querySelector('.pictures');
const PhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const TIMEOUT_DELAY = 500;
const imgFilterSection = document.querySelector('.img-filters');
const imgFilteFormElement = document.querySelector('.img-filters__form');

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

function showFilter(photos) {
  imgFilterSection.classList.remove('img-filters--inactive');
  const filterClickHandler = (evt) => {
    const buttons = imgFilteFormElement.children;

    for(let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('img-filters__button--active');
    }
    const activeButton = imgFilteFormElement.querySelector(`#${evt.target.id}`);
    activeButton.classList.add('img-filters__button--active');
    const originalPhotos = photos.slice();

    const previewElements = document.querySelectorAll('.pictures .picture');

    Array.from(previewElements).forEach((element) => {
      element.remove();
    });

    if (evt.target.id === 'filter-default') {
      renderPhotos(originalPhotos);
    } else if (evt.target.id === 'filter-discussed') {
      renderPhotos(photos.sort(compareNumeric));
    } else if (evt.target.id === 'filter-random') {
      renderPhotos(shuffle(photos).slice(0, 10));
    }

  };
  const debouncedFilterClickHandler = debounce(filterClickHandler, TIMEOUT_DELAY);

  imgFilteFormElement.addEventListener('click', debouncedFilterClickHandler);
}

export { renderPhotos, showFilter };
