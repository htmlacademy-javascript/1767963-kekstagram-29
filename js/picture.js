import {compareNumeric, debounce, shuffle} from './util.js';
const photosListElement = document.querySelector('.pictures'); //нашли большую секцию
const PhotoTemplate = document.querySelector('#picture').content.querySelector('.picture'); //нашти темплейт и внутри темплейта

const renderPhotos = (photos) => {
  const photosListFragment = document.createDocumentFragment();

  photos.forEach(({url, description, likes, comments, id}) => {//копия массива фоток? нужна?
    const photoElement = PhotoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = url; //передаем переменные из дата джс
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.dataset.id = id;
    photosListElement.appendChild(photoElement); //клонируем элемент и размножаем
  });


  photosListElement.appendChild(photosListFragment);
};

const imgFilterSection = document.querySelector('.img-filters');
const imgFilteFormElement = document.querySelector('.img-filters__form');

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

    console.log('previewElements:', previewElements);
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
  const debouncedFilterClickHandler = debounce(filterClickHandler, 500);

  imgFilteFormElement.addEventListener('click', debouncedFilterClickHandler);
}
export { renderPhotos, showFilter };

const imgFilters = (renderPhotos) => {
  const defaultButton = document.getElementById('filter-default');
  const randomButton = document.getElementById('filter-random');
  const discussedButton = document.getElementById('filter-discussed');
  const comment = document.querySelectorAll('.picture__comments');

    const commentNumbers = () => Array.from({length: 25}, comment);
  if (randomButton.addEventListener('click')){
    commentNumbers.slice(0, 9);
  }
  if (discussedButton.addEventListener('click')){
    commentNumbers.sort(compareNumeric);
  }
  if (defaultButton.addEventListener('click')){
  }

};
