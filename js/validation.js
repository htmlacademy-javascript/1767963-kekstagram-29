import {isEscapeKey} from './util.js';

const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadBody = document.querySelector('body');
const imgUploadСancel = document.querySelector('.img-upload__cancel');
const formElement = document.querySelector('.img-upload__form');
const imgHashtags = document.querySelector('.text__hashtags');
const imgPreview = document.querySelector('.img-upload__preview');
const commentElement = document.querySelector('.text__description');
const effectLevelElement = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');
const filterArray = document.querySelectorAll('.effects__radio');
const controlSmall = document.querySelector('.scale__control--smaller');
const controlBig = document.querySelector('.scale__control--bigger');
const controlValue = document.querySelector('.scale__control--value');
const submitButton = document.querySelector('.img-upload__submit');
const SCALE_STAP = 25;
const COUNTING_BASE = 10;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_COUNT = 5;
let isModalOpen = false;

function openDownloadForm () {
  imgUploadBody.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
}

imgUploadInput.addEventListener('change', () => {
  openDownloadForm();
});

function resetForm() {
  formElement.reset();
  imgPreview.style = null;
  effectLevelElement.classList.add('hidden');
  imgPreview.style.filter = null;
}


function closeDownloadForm () {
  imgUploadBody.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  resetForm();
}

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt) && !isModalOpen) {
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

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__field-wrapper',
}, false);

function showSuccessModal() {
  isModalOpen = true;
  const successTemplate = document.querySelector('#success').content;
  document.body.appendChild(successTemplate.cloneNode(true));
  const modalElement = document.querySelector('.success');
  const successButton = document.querySelector('.success__button');

  const closeModal = (evt) => {
    const innerElement = document.querySelector('.success__inner');

    if (evt.type !== 'keydown' && evt.target !== successButton && innerElement.contains(evt.target)) {
      return;
    }

    isModalOpen = false;
    modalElement.remove();
  };

  const handleEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      closeModal(evt);
      document.removeEventListener('keydown', handleEscKeydown);
    }
  };

  successButton.addEventListener('click', closeModal);
  modalElement.addEventListener('click', closeModal);
  document.addEventListener('keydown', handleEscKeydown);
}

function showErrorModal () {
  isModalOpen = true;
  const successTemplate = document.querySelector('#error').content;
  document.body.appendChild(successTemplate.cloneNode(true));

  const modalElement = document.querySelector('.error');

  const errorButton = document.querySelector('.error__button');

  const closeModal = (evt) => {
    const innerElement = document.querySelector('.error__inner');

    if (evt.type !== 'keydown' && evt.target !== errorButton && innerElement.contains(evt.target)) {
      return;
    }

    isModalOpen = false;
    modalElement.remove();
  };

  const handleEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      closeModal(evt);
      document.removeEventListener('keydown', handleEscKeydown);
    }
  };

  errorButton.addEventListener('click', closeModal);
  modalElement.addEventListener('click', closeModal);
  document.addEventListener('keydown', handleEscKeydown);
}

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    const formData = new FormData(evt.target);
    submitButton.disabled = true;
    fetch('https://29.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: formData,
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        resetForm();
        showSuccessModal();
        closeDownloadForm();
        submitButton.disabled = false;
      })
      .catch(() => {
        submitButton.disabled = false;
        showErrorModal();
      });
  }

});

function parseHashtags(tags) {
  return tags.split(' ').filter((tag) => tag !== '');
}

pristine.addValidator(imgHashtags, () => {
  if (imgHashtags.value === '') {
    return true;
  }
  const hashtags = parseHashtags(imgHashtags.value);

  return hashtags.length <= MAX_HASHTAGS_COUNT;
}, 'Количество элементов массива не больше 5');

pristine.addValidator(imgHashtags, () => {
  if (imgHashtags.value === '') {
    return true;
  }
  const hashtags = parseHashtags(imgHashtags.value);

  for (let i = 0; i < hashtags.length; i++) {
    for (let j = i + 1; j < hashtags.length; j++) {
      if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase()) {
        return false;
      }
    }
  }

  return true;
}, 'один и тот же хэш-тег не может быть использован дважды');

pristine.addValidator(imgHashtags, () => {
  if (imgHashtags.value === '') {
    return true;
  }

  const hashtags = parseHashtags(imgHashtags.value);
  for (let i = 0; i < hashtags.length; i++) {
    if (hashtags[i].length > MAX_HASHTAG_LENGTH) {
      return false;
    }
  }

  return true;
}, 'Хэш-тэг не может быть длиннее 20 символов');

const regHashtag = /^#[a-zа-яё0-9]{1,20}$/i;

pristine.addValidator(imgHashtags, () => {
  if (imgHashtags.value === '') {
    return true;
  }
  const hashtags = parseHashtags(imgHashtags.value);

  for (let i = 0; i < hashtags.length; i++) {
    if (!regHashtag.test(hashtags[i])) {
      return false;
    }
  }

  return true;
}, 'Хэш-тэг может состоять только из букв и цифр и должен начинаться с #');

function getControlValueAsNumber() {
  return Number.parseInt(controlValue.value.replace('%', ''), COUNTING_BASE);
}
controlSmall.addEventListener('click', () => {
  const nextValue = Math.max(getControlValueAsNumber() - SCALE_STAP, SCALE_STAP);
  controlValue.value = `${nextValue}%`;
  imgPreview.style.transform = `scale(${nextValue / 100})`;
});
controlBig.addEventListener('click', () => {
  const nextValue = Math.min(getControlValueAsNumber() + SCALE_STAP, 100);
  controlValue.value = `${nextValue}%`;
  imgPreview.style.transform = `scale(${nextValue / 100})`;
});

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
        start: 1,
        step: 0.1,
      });
    } else if (evt.target.value === 'sepia') {
      effectLevelElement.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
    } else if (evt.target.value === 'marvin') {
      effectLevelElement.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
    }else if (evt.target.value === 'phobos') {
      effectLevelElement.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
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
        start: 3,
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
