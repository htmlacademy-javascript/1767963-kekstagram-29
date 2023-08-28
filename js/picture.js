//Заведите модуль, который будет отвечать за отрисовку миниатюр.

//На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

//Адрес изображения url подставьте как атрибут src изображения.
//Описание изображения description подставьте в атрибут alt изображения.
//Количество лайков likes выведите в блок .picture__likes.
//Количество комментариев comments выведите в блок .picture__comments.
//Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

//Подключите модуль в проект.
//1) src="photos/случайная цифра .jpg"
//2) alt="результат функфии photoObject часть description"
//3)) класс .picture__likes результат функфии photoObject часть likes
//4)) класс .picture__comments результат функфии photoObject часть randomComments
//5) вставить как последний элемент шаблон в <section class="pictures  container"> 25 раз? нужен ли список?
// переменная const RANDOM_PHOTO_OBJECT_COUNT = 25;

import {createPhotos} from './data.js'; //импортировали функцию которая генерирует фото

const photosListElement = document.querySelector('.pictures'); //нашли большую секцию
const PhotoTemplate = document.querySelector('#picture').content.querySelector('.picture'); //нашти темплейт и внутри темплейта

const clonePhoto = createPhotos();

const photosListFragment = document.createDocumentFragment();

clonePhoto.forEach(({url, description, likes, comments}) => {
  const photoElement = PhotoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = url; //передаем переменные из дата джс
  photoElement.querySelector('.picture__img').alt = description;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photosListElement.appendChild(photoElement); //клонируем элемент и размножаем
});

photosListElement.appendChild(photosListFragment); //почему тут нужена 38 и 26я строчки, если отображалось на сервере и без них?
