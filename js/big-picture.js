import './picture.js';
import {renderPhotos} from './picture.js';
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
const userModalElement = document.querySelector('.big-picture');
const userModalOpenElement = document.querySelector('.picture_img');
const userModalCloseElement = userModalElement.querySelector('.big-picture__cancel');

userModalOpenElement.addEventListener('click', () => {
  userModalElement.classList.remove('hidden');
});

userModalCloseElement.addEventListener('click', () => {
  userModalElement.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    userModalElement.classList.add('hidden');
  }
});


