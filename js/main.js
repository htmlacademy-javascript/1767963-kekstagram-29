import './functions.js';
import { createPhotos } from './data.js';
import { renderPhotos } from'./picture.js';
import { openCloseBigPicture } from'./big-picture.js';
import { renderBigPicture } from'./big-picture.js';
import { renderComment } from'./big-picture.js';


const randomPhotoObjects = createPhotos();//генерирует обьекты с фотографиями

renderPhotos(randomPhotoObjects);//отрисовывает фото

openCloseBigPicture(renderPhotos);
//какой должен быть аргумент?
renderBigPicture();
renderComment();
