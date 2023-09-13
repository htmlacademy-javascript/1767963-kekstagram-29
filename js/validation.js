import {isEscapeKey} from './util.js';

const imgUploadInput = document.querySelector('.img-upload__input');//кнопка для лисенира
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadBody = document.querySelector('body');
const imgUploadСancel = document.querySelector('.img-upload__cancel'); //кнопка закрытия
const formElement = document.querySelector('.img-upload__form');
const imgHashtags = document.querySelector('.text__hashtags');
const imgPreview = document.querySelector('.img-upload__preview');
const commentElement = document.querySelector('.text__description');

function openDownloadForm () {
  imgUploadBody.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
}

imgUploadInput.addEventListener('change', () => {
  openDownloadForm();
});

function closeDownloadForm () {
  imgUploadBody.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
}

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === imgHashtags || document.activeElement === commentElement) {
      return;
    }
    closeDownloadForm();
  }
});

imgUploadСancel.addEventListener('click', () => {
  closeDownloadForm();
});

// Комментарий, хештег
const pristine = new Pristine(formElement, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'p',
  errorTextClass: 'img-upload-error'
});


formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  console.log('form is valid:', isValid);
});

pristine.addValidator(imgHashtags, () => {
  const hashtags = imgHashtags.value.split(' ');

  return hashtags.length <= 5;
}, 'Количество элементов массива не больше 5');

pristine.addValidator(imgHashtags, () => {
  const hashtags = imgHashtags.value.split(' ');

  for (let i = 0; i < hashtags.length; i++) {
    for (let j = i + 1; j < hashtags.length; j++) {
      if (hashtags[i] === hashtags[j]) {
        return false;
      }
    }
  }

  return true;
}, 'один и тот же хэш-тег не может быть использован дважды');

pristine.addValidator(imgHashtags, () => {
  const hashtags = imgHashtags.value.split(' ');
  for (let i = 0; i < hashtags.length; i++) {
    if (hashtags[i].length > 20) {
      return false;
    }
  }

  return true;
}, 'Хэш-тэг не может быть длиннее 20 символов');

const regHashtag = /^#[a-zа-яё0-9]{1,20}$/i;

pristine.addValidator(imgHashtags, () => {
  const hashtags = imgHashtags.value.split(' ');

  for (let i = 0; i < hashtags.length; i++) {
    if (!regHashtag.test(hashtags[i])) {
      return false;
    }
  }

  return true;
}, 'Хэш-тэг может состоять только из букв и цифр и должен начинаться с #');

//масштаб
const controlSmall = document.querySelector('.scale__control--smaller');
const controlBig = document.querySelector('.scale__control--bigger');
const controlValue = document.querySelector('.scale__control--value');


function getControlValueAsNumber() {
  return Number.parseInt(controlValue.value.replace('%', ''), 10);
}
controlSmall.addEventListener('click', () => {
  const nextValue = Math.max(getControlValueAsNumber() - 25, 25);
  controlValue.value = `${nextValue}%`;
  imgPreview.style.transform = `scale(${nextValue / 100})`;
});
controlBig.addEventListener('click', () => {
  const nextValue = Math.min(getControlValueAsNumber() + 25, 100);
  controlValue.value = `${nextValue}%`;
  imgPreview.style.transform = `scale(${nextValue / 100})`;
});

//эффекты
const effectLevelElement = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');

const filterArray = document.querySelectorAll('.effects__radio');

effectLevelElement.classList.add('hidden');

for (let i = 0; i < filterArray.length; i++) {
  filterArray[i].addEventListener('change', (evt) => {
    if (evt.target.value === 'none') {
      effectLevelElement.classList.add('hidden');
      imgPreview.style.filter = null;
      effectValueElement.value = '';
    } else if (evt.target.value === 'chrome') {
      effectLevelElement.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 0,
        step: 0.1,
      });
    } else if (evt.target.value === 'sepia') {
      effectLevelElement.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 0,
        step: 0.1,
      });
    } else if (evt.target.value === 'marvin') {
      effectLevelElement.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 0,
        step: 1,
      });
    }else if (evt.target.value === 'phobos') {
      effectLevelElement.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 0,
        step: 0.1,
      });
    }else if (evt.target.value === 'heat') {
      effectLevelElement.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        step: 0.1,
        start: 1,
      });
    }
  });
}

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 25,
  connect: 'lower',
});
sliderElement.noUiSlider.on('update', () => {
  const value = sliderElement.noUiSlider.get();
  effectValueElement.value = value;
  for(let i = 0; i < filterArray.length; i++) {
    if (filterArray[i].checked) {
      if (filterArray[i].value === 'chrome') {
        imgPreview.style.filter = `grayscale(${value})`;
      } else if (filterArray[i].value === 'sepia') {
        imgPreview.style.filter = `sepia(${value})`;
      } else if (filterArray[i].value === 'marvin') {
        imgPreview.style.filter = `invert(${value}%)`;
      } else if (filterArray[i].value === 'phobos') {
        imgPreview.style.filter = `blur(${value}px)`;
      } else if (filterArray[i].value === 'heat') {
        imgPreview.style.filter = `brightness(${value})`;
      }
    }
  }
});
// не забыть про вывоз сообщения
