import './functions.js';
import { createPhotos } from './data.js';
import { renderPhotos } from'./picture.js';
import { openCloseBigPicture } from'./big-picture.js';
import { setupHandlers } from'./big-picture.js';
import './validation.js';
import './data-module.js';

import { getData }from './api.js';


getData();
// const randomPhotoObjects = createPhotos();//генерирует обьекты с фотографиями
// console.log('pictures data', randomPhotoObjects);
// renderPhotos(randomPhotoObjects);//отрисовывает фото
//тут должет быть вызов гет даты
openCloseBigPicture();
// setupHandlers(randomPhotoObjects);
