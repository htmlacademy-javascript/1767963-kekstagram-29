import './picture.js';
import { renderPhotos } from'./picture.js';
//const bigPicture = document.querySelector('.big-picture');
//bigPicture.classList.remove('hidden');
//Заведите модуль, который будет отвечать за отрисовку окна с полноразмерным изображением.

//Окно должно открываться при клике на миниатюру. Данные для окна (изображение, комментарии, лайки и так далее) берите из того же объекта, который использовался для отрисовки соответствующей миниатюры.

//Для отображения окна нужно удалять класс hidden у элемента .big-picture и каждый раз заполнять его данными о конкретной фотографии:

//Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.

//Количество лайков likes подставьте как текстовое содержание элемента .likes-count.

//Количество комментариев comments подставьте как текстовое содержание элемента .comments-count.

//Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments
//<li class="social__comment"> пример разметки для комментария
    //<img
        //class="social__picture"
        //src="{{аватар}}"
        //alt="{{имя комментатора}}"
        //width="35" height="35">
    //<p class="social__text">{{текст комментария}}</p>
//</li>
//Описание фотографии description вставьте строкой в блок .social__caption.

//После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.

//После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.

//Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.

//Подключите модуль в проект.
const userPictureElement = document.querySelector('.big-picture');

function setupHandlers() {
  document.querySelectorAll('.picture').forEach(element => {
    element.addEventListener('click', () => {
      openBigPicture();
    });
  });
}

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const openCloseBigPicture = () => {//нужен ди аргумент?
  const userPictureOpenElement = document.querySelector('.picture__img');
  const userPictureCloseElement = userPictureElement.querySelector('.big-picture__cancel');


  function openBigPicture () { //открывает модальное окно
    const body = document.querySelector('body');
    body.classList.add('modal-open');//так добавить для боди??
    userPictureElement.classList.remove('hidden');

    document.addEventListener('keydown', (evt) => {
      if (isEscapeKey(evt)) {//if (isEnterKey(evt)) как сюда добавить открытие? tabindex="0" ненадо? ссылка и так мб в фокусе
        evt.preventDefault();
        userPictureElement.classList.add('hidden');
      }
    });
  }

  function closeBigPicture () {
    userPictureElement.classList.add('hidden');
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        userPictureElement.classList.add('hidden');
      }
    });
  // 1. Скрыть окно
  // 2. Удалить обработчики для закрытия
  // 3. Прочая логика
  }

  /*userPictureOpenElement.addEventListener('click', () => {
    openBigPicture ();
});*/

  userPictureOpenElement.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      openUserModal();
    }
  });

  userPictureCloseElement.addEventListener('click', () => {
    closeBigPicture();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') { //if (isEnterKey(evt)) как сюда добавить открытие? tabindex="0" ненадо? ссылка и так мб в фокусе
      closeBigPicture();
    }
  });
};
//данные для окна просмотра
const renderBigPicture = (picture) => {
  const userPictureFragment = document.createDocumentFragment();

  picture.forEach(({url, description, likes, comments}) => {
    const bigPictureElement = PhotoTemplate.cloneNode(true);//???нам же ненадо cloneNode здесь? это же не шаблон?

    bigPictureElement.querySelector('.big-picture__img').src = url; //передаем переменные из дата джс
    bigPictureElement.querySelector('.social__caption').alt = description;
    bigPictureElement.querySelector('.likes-count').textContent = likes;
    bigPictureElement.querySelector('.comments-count').textContent = comments.length;
    userPictureElement.appendChild(bigPictureElement); //нам же не надо размножать шаблон? он должен срабатывать при открытии
  });


  userPictureElement.appendChild(userPictureFragment);
};
//комментарий
const renderComment = (comment) => {
  const userCommentFragment = document.createDocumentFragment();

  comment.forEach(({avatar, name, comments}) => {
    const сommentElement = PhotoTemplate.cloneNode(true);//???

    сommentElement.querySelector('.social__picture').src = avatar; //передаем переменные из дата джс
    сommentElement.querySelector('.avatar').alt = name;
    сommenteElement.querySelector('.social__text').textContent = comments;
    userCommentElement.appendChild(сommentElement); ///нам же не надо размножать шаблон? он должен срабатывать при открытии
  });


  userCommentElement.appendChild(userCommentFragment);
};

export { openCloseBigPicture };
export { renderBigPicture };
export { renderComment };
export { setupHandlers };
