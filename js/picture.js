import {compareNumeric} from './util.js';
const photosListElement = document.querySelector('.pictures'); //нашли большую секцию
const PhotoTemplate = document.querySelector('#picture').content.querySelector('.picture'); //нашти темплейт и внутри темплейта

const renderPhotos = (photos) => {
  const photosListFragment = document.createDocumentFragment();

  photos.slice().forEach(({url, description, likes, comments, id}) => {//копия массива фоток? нужна?
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

export { renderPhotos };

// 12.12 После завершения загрузки изображений с сервера покажите блок .img-filters, убрав у него скрывающий класс.

// Добавьте обработчики изменения фильтров, которые будут управлять порядком отрисовки элементов на странице:

// По умолчанию — фотографии в изначальном порядке с сервера.
// Случайные — 10 случайных, не повторяющихся фотографий.
// Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.
// При переключении фильтра все фотографии, отрисованные ранее, нужно убрать и вместо них показать те, которые подходят под новые условия.

// Воспользуйтесь приёмом «устранение дребезга»,
// чтобы при переключении фильтра обновление списка элементов, подходящих под фильтры, происходило не чаще, чем один раз в полсекунды.


const imgFilterSection = document.querySelector('.img-filters');
function showFilter() {
  imgFilterSection.classList.remove('img-filters--inactive');//удаляем скоывающий класс?
}
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
//тут должно быть возврадение нормального состояния
  }

};
