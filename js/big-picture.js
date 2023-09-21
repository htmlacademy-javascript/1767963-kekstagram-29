import {isEscapeKey} from './util.js';

const userPictureElement = document.querySelector('.big-picture');

function openBigPicture ({url, description, likes, comments}) { //открывает модальное окно

  const body = document.querySelector('body');
  body.classList.add('modal-open');
  userPictureElement.classList.remove('hidden');

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      userPictureElement.classList.add('hidden');
    }
  });

  userPictureElement.querySelector('.big-picture__img img').src = url;
  userPictureElement.querySelector('.big-picture__img img').alt = description;
  userPictureElement.querySelector('.social__caption').textContent = description;
  userPictureElement.querySelector('.likes-count').textContent = likes;
  userPictureElement.querySelector('.comments-count').textContent = comments.length;
  const commentsContainerElement = userPictureElement.querySelector('.social__comments');
  const сommentTemplate = document.querySelector('#comment').content;

  const socialCommentCount = document.querySelector('.social__comment-count');
  socialCommentCount.classList.remove('hidden');
  const commentLoader = document.querySelector('.comments-loader');
  commentLoader.classList.add('hidden');
  const shownCommentsElement = document.querySelector('.comments-count-shown');


  commentsContainerElement.innerHTML = '';
  const firstComments = comments.slice(0, 5);
  firstComments.forEach(({name, avatar, message}) => {
    const element = сommentTemplate.cloneNode(true);
    element.querySelector('.social__picture').src = avatar;
    element.querySelector('.social__picture').alt = name;
    element.querySelector('.social__text').textContent = message;
    commentsContainerElement.appendChild(element);
  });

  shownCommentsElement.textContent = firstComments.length;

  if (comments.length > 5) {
    const loadMoreButton = document.querySelector('.social__comments-loader');
    commentLoader.classList.remove('hidden');


    let lastIndex = firstComments.length - 1;

    const handleLoadMoreButtonClick = () => {
      const nextComments = comments.slice(lastIndex, lastIndex + 5);
      nextComments.forEach(({name, avatar, message}) => {
        const element = сommentTemplate.cloneNode(true);
        element.querySelector('.social__picture').src = avatar;
        element.querySelector('.social__picture').alt = name;
        element.querySelector('.social__text').textContent = message;
        commentsContainerElement.appendChild(element);
      });

      lastIndex = lastIndex + 5 >= comments.length ? comments.length - 1 : lastIndex + 5;
      shownCommentsElement.textContent = lastIndex + 1;
      if (lastIndex + 1 >= comments.length) {
        commentLoader.classList.add('hidden');
      }
    };
    loadMoreButton.addEventListener('click', handleLoadMoreButtonClick);
  }
}

function setupHandlers(pictures) {
  document.querySelectorAll('.picture').forEach((element) => {
    element.addEventListener('click', (evt) => {
      const targetElement = evt.target.tagName === 'A' ? evt.target : evt.target.parentElement;

      const id = Number.parseInt(targetElement.dataset.id, 10);
      const picture = pictures.find((item) => item.id === id);
      openBigPicture(picture);
    });
  });
}

const openCloseBigPicture = () => {
  const userPictureCloseElement = userPictureElement.querySelector('.big-picture__cancel');

  function closeBigPicture () {
    const loadMoreButton = document.querySelector('.social__comments-loader');
    loadMoreButton.replaceWith(loadMoreButton.cloneNode(true));
    userPictureElement.classList.add('hidden');
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        userPictureElement.classList.add('hidden');
      }
    });
  }

  userPictureCloseElement.addEventListener('click', () => {
    closeBigPicture();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeBigPicture();
    }
  });

};

export { openCloseBigPicture };
export { setupHandlers };
