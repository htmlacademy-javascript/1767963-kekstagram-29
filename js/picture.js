const photosListElement = document.querySelector('.pictures'); //нашли большую секцию
const PhotoTemplate = document.querySelector('#picture').content.querySelector('.picture'); //нашти темплейт и внутри темплейта

const renderPhotos = (photos) => {
  const photosListFragment = document.createDocumentFragment();

  photos.forEach(({url, description, likes, comments, id}) => {
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
