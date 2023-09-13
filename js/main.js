import './functions.js';
import { createPhotos } from './data.js';
import { renderPhotos } from'./picture.js';
import { openCloseBigPicture } from'./big-picture.js';
import { setupHandlers } from'./big-picture.js';
import './validation.js';

const randomPhotoObjects = createPhotos();//генерирует обьекты с фотографиями
console.log('pictures data', randomPhotoObjects);
renderPhotos(randomPhotoObjects);//отрисовывает фото

openCloseBigPicture(renderPhotos);
setupHandlers(randomPhotoObjects);
