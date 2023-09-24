import {isEscapeKey} from './util.js';

const userPictureElement = document.querySelector('.big-picture');
const userPictureCloseElement = userPictureElement.querySelector('.big-picture__cancel');
const commentsContainerElement = userPictureElement.querySelector('.social__comments');
const сommentTemplate = document.querySelector('#comment').content;
const socialCommentCount = document.querySelector('.social__comment-count');
const shownCommentsElement = document.querySelector('.comments-count-shown');
const body = document.querySelector('body');
const COMMENTS_STEP = 5;
const COUNTING_BASE = 10;

function openBigPicture ({url, description, likes, comments}) {
  const loadMoreButton = document.querySelector('.social__comments-loader');
  body.classList.add('modal-open');
  userPictureElement.classList.remove('hidden');

  function escKeydownHandler(evt) {
    if (isEscapeKey(evt)) {
      bigPictureCancelClickHandler();
    }
  }

  function bigPictureCancelClickHandler () {
    loadMoreButton.replaceWith(loadMoreButton.cloneNode(true));
    userPictureElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    userPictureCloseElement.removeEventListener('click', bigPictureCancelClickHandler);
    document.removeEventListener('keydown', escKeydownHandler);
  }

  userPictureCloseElement.addEventListener('click', bigPictureCancelClickHandler);

  document.addEventListener('keydown', escKeydownHandler);

  userPictureElement.querySelector('.big-picture__img img').src = url;
  userPictureElement.querySelector('.big-picture__img img').alt = description;
  userPictureElement.querySelector('.social__caption').textContent = description;
  userPictureElement.querySelector('.likes-count').textContent = likes;
  userPictureElement.querySelector('.comments-count').textContent = comments.length;

  socialCommentCount.classList.remove('hidden');
  loadMoreButton.classList.add('hidden');

  commentsContainerElement.innerHTML = '';
  const firstComments = comments.slice(0, COMMENTS_STEP);
  firstComments.forEach(({name, avatar, message}) => {
    const element = сommentTemplate.cloneNode(true);
    element.querySelector('.social__picture').src = avatar;
    element.querySelector('.social__picture').alt = name;
    element.querySelector('.social__text').textContent = message;
    commentsContainerElement.appendChild(element);
  });

  shownCommentsElement.textContent = firstComments.length;

  if (comments.length > COMMENTS_STEP) {

    loadMoreButton.classList.remove('hidden');
    let lastIndex = firstComments.length;

    const loadMoreButtonClickHandler = () => {
      const nextComments = comments.slice(lastIndex, lastIndex + COMMENTS_STEP);
      nextComments.forEach(({name, avatar, message}) => {
        const element = сommentTemplate.cloneNode(true);
        element.querySelector('.social__picture').src = avatar;
        element.querySelector('.social__picture').alt = name;
        element.querySelector('.social__text').textContent = message;
        commentsContainerElement.appendChild(element);
      });

      lastIndex = lastIndex + COMMENTS_STEP >= comments.length ? comments.length : lastIndex + COMMENTS_STEP;
      shownCommentsElement.textContent = lastIndex;
      if (lastIndex >= comments.length) {
        loadMoreButton.classList.add('hidden');
      }
    };
    loadMoreButton.addEventListener('click', loadMoreButtonClickHandler);
  }
}

function setupHandlers(pictures) {
  document.querySelectorAll('.picture').forEach((element) => {
    element.addEventListener('click', (evt) => {
      const targetElement = evt.target.tagName === 'A' ? evt.target : evt.target.parentElement;

      const id = Number.parseInt(targetElement.dataset.id, COUNTING_BASE);
      const picture = pictures.find((item) => item.id === id);
      openBigPicture(picture);
    });
  });
}

export { setupHandlers };
