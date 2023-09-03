import './functions.js';
import { createPhotos } from './data.js';
import { renderPhotos } from'./picture.js';
import './big-picture.js';


const randomPhotoObjects = createPhotos();//генерирует обьекты с фотографиями

renderPhotos(randomPhotoObjects);//отрисовывает фото
