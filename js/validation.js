// Добавить в проект валидацию, проверки введённых данных
// Заведите модуль, который будет отвечать за работу с формой.

// Пропишите тегу <form> правильные значения атрибутов method и enctype и адрес action для отправки формы на сервер.

// Обратите внимание. В разделе про работу с сетью мы доработаем механизм отправки данных, а пока достаточно правильных атрибутов у тега <form>.

// Если форма заполнена верно, то после отправки покажется страница сервера
// (по адресу из атрибута action тега form) с успешно отправленными данными.
// Если же форма пропустила какие-то некорректные значения, то будет показана страница с допущенными ошибками.
// В идеале у пользователя не должно быть сценария, при котором он может отправить некорректную форму.

// Проверьте разметку вашего проекта и добавьте недостающие атрибуты.
// Например, всем обязательным полям нужно добавить атрибут required.
// Затем проверьте, правильные ли типы стоят у нужных полей, если нет — проставьте правильные.

// Изучите, что значит загрузка изображения,
// и как, когда и каким образом показывается форма редактирования изображения.
// Напишите код и добавьте необходимые обработчики для реализации этого пункта техзадания.
// В работе вы можете опираться на код показа окна с полноразмерной фотографией,
// который вы, возможно, уже написали в предыдущей домашней работе.

// Подстановка выбранного изображения в форму — это отдельная домашняя работа.
// В данном задании этот пункт реализовывать не нужно.

// После реализуйте закрытие формы.

// при закрытии формы дополнительно необходимо сбрасывать значение поля выбора файла .img-upload__input.
// В принципе, всё будет работать, если при повторной попытке загрузить в поле другую фотографию.
// Но! Событие change не сработает, если пользователь попробует загрузить ту же фотографию,
// а значит окно с формой не отобразится, что будет нарушением техзадания.
// Значение других полей формы также нужно сбрасывать.

// Напишите код для валидации формы добавления изображения, используя библиотеку Pristine
// (скрипт находится в директории /vendor/pristine). Список полей для валидации:

// Хэш-теги
// Комментарий
// Реализуйте логику проверки так, чтобы, как минимум,
// она срабатывала при попытке отправить форму и не давала этого сделать,
// если форма заполнена не по правилам. При желании, реализуйте проверки сразу при вводе значения в поле.

// Как отменить обработчик Esc при фокусе?
// Задача не имеет одного верного решения,
// однако намекнём на самый простой — использовать stopPropagation для события нажатия клавиш в поле при фокусе.

// Валидация хеш-тегов?
// Для валидации хэш-тегов вам придётся вспомнить, как работать с массивами.
//  Набор хэш-тегов можно превратить в массив, воспользовавшись методом .split().
//  Он разбивает строки на массивы. После этого, вы можете написать цикл,
//  который будет ходить по полученному массиву и проверять каждый из хэш-тегов на предмет соответствия ограничениям.
//  Если хотя бы один из тегов не проходит нужных проверок, показывать сообщение об ошибке.

// Поля, не перечисленные в техзадании, но существующие в разметке, особой валидации не требуют.

const imgUploadInput = document.querySelector('.img-upload__input');//кнопка для лисенира
const imgUploadOverlay = document.querySelector('.img-upload__overlay');//попап с настройками фото после выьра фото
const imgUploadBody = document.querySelector('body');//ищем боди
const imgUploadСancel = document.querySelector('.img-upload__cancel'); //кнопка закрытия
const formElement = document.querySelector('.img-upload__form');
const imgHashtags = document.querySelector('.text__hashtags');
const imgPreview = document.querySelector('.img-upload__preview');

function isEscapeKey(evt) {
  return evt.key === 'ESC' || evt.key === 'Escape';
}

function openDownloadForm () {
  imgUploadBody.classList.add('modal-open');//добавляем класс у боди
  imgUploadOverlay.classList.remove('hidden');//показываем попап
}

imgUploadInput.addEventListener('change', () => {
  openDownloadForm();
});

function closeDownloadForm () {//при закрытии нужно сбрасывать значения всех полей
  imgUploadBody.classList.remove('modal-open');//убираем класс у боди
  imgUploadOverlay.classList.add('hidden');//скрываем попап

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      imgUploadBody.classList.remove('modal-open');
      imgUploadOverlay.classList.add('hidden');//так закрывать по ESC?
    }
  });
}

imgUploadСancel.addEventListener('click', () => {
  closeDownloadForm();
});
// Комментарий:
// не обязателен;
// не  больше 140 символов;
// если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
// const imgComment = document.querySelector('.img-upload__form');

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

  return hashtags.length <= 5; // вынести в константу
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

// document.activeElement


// $0.style = 'transform: scale(0.75)';

//Масштаб:
// При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться значение поля .scale__control--value;
// Значение должно изменяться с шагом в 25.
//Например, если значение поля установлено в 50%, после нажатия на «+», значение должно стать равным 75%. Максимальное значение — 100%, минимальное — 25%.
//Значение по умолчанию — 100%;
// При изменении значения поля .scale__control--value
//изображению внутри .img-upload__preview должен добавляться соответствующий стиль CSS,
//который с помощью трансформации scale задаёт масштаб. Например, если в поле стоит значение 75%,
//то в стиле изображения должно быть написано transform: scale(0.75).
const controlSmall = document.querySelector('.scale__control--smaller');
const controlBig = document.querySelector('.scale__control--bigger');
const controlValue = document.querySelector('.scale__control--value');


function getControlValueAsNumber() {
  return Number.parseInt(controlValue.value.replace('%', ''), 10);
}
controlSmall.addEventListener('click', () => {
  const nextValue = Math.max(getControlValueAsNumber() - 25, 25);
  controlValue.value = `${nextValue}%`;
  imgPreview.style = `transform: scale(${nextValue / 100})`;
});
controlBig.addEventListener('click', () => {
  const nextValue = Math.min(getControlValueAsNumber() + 25, 100);
  controlValue.value = `${nextValue}%`;
  imgPreview.style = `transform: scale(${nextValue / 100})`;
});

// Наложение эффекта на изображение:

// По умолчанию должен быть выбран эффект «Оригинал».
// На изображение может накладываться только один эффект.
// Интенсивность эффекта регулируется перемещением ползунка в слайдере.
// Слайдер реализуется сторонней библиотекой для реализации слайдеров noUiSlider.
// Уровень эффекта записывается в поле .effect-level__value.
// При изменении уровня интенсивности эффекта (предоставляется API слайдера),
// CSS-стили картинки внутри .img-upload__preview обновляются следующим образом:
// Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
// Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
// Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
// Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
// Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
// Для эффекта «Оригинал» CSS-стили filter удаляются.
// При выборе эффекта «Оригинал» слайдер и его контейнер (элемент .img-upload__effect-level) скрываются.
// При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%):
//слайдер, CSS-стиль изображения и значение поля должны обновляться.
const effectElement = document.querySelector('.effect-level__value');
// const chromeElement = document.querySelector('.effects__preview--chrome');
// const sepiaElement = document.querySelector('.effects__preview--sepia');
// const marvinElement = document.querySelector('.effects__preview--marvin');
// const phobosElement = document.querySelector('.effects__preview--phobos');
// const heatElement = document.querySelector('.effects__preview--heat');
//const originalElement = document.querySelector('.effects__preview--none');
//controlValue.value = 0;
const filterArray = document.querySelectorAll('.effects__radio');

noUiSlider.create(effectElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 25,
  connect: 'lower',
});
effectElement.noUiSlider.on('update', () => {
  controlValue.value = effectElement.noUiSlider.get();
});

element.addEventListener('change', (evt) => {
  if (evt.target.value === 'none') {
    effectElement.setAttribute('disabled', true);//effectElement.noUiSlider.destroy();
  } else if (evt.target.value === 'chrome') {
    effectElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
    });
  } else if (evt.target.value === 'sepia') {
    effectElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
    });
  } else if (evt.target.value === 'marvin') {
    effectElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
    });
  }else if (evt.target.value === 'phobos') {
    effectElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,//px
    });
  }else if (evt.target.value === 'heat') {
    effectElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,//px
      start: 1,
    });
  }
});
// document.querySelectorAll('.effects__radio') это уже массив и его надо использовать в цикле
