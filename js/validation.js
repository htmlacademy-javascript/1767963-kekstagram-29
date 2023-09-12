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
const imgComment = document.querySelector('.img-upload__form');

const pristine = new Pristine(imgComment, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-description__error-text',
});

imgComment.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});

// Хэш-теги:

// хэш-теги разделяются пробелами;
// один и тот же хэш-тег не может быть использован дважды; не повторять элементы массива сравнить друг с другом
// количество элементов массива не больше 5
// хэш-теги необязательны;
// если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
const imgHashtags = document.querySelector('.text__hashtags');


const createArrayHashtags = imgHashtags.value.split(' ');
const arrayHashtagsLength = createArrayHashtags.length;
const comparisonArrayLength = function (){
  if (arrayHashtagsLength <= 5) {
    return true;
  } else {
    return false;
  }
};

let valid = true;
for (let i = 0; i < createArrayHashtags.length; i++) {
  for (let j = i + 1; j < createArrayHashtags.length; j++) {
    if (createArrayHashtags[i] === createArrayHashtags[j]) {
      valid = false;
      break;
    }
  }
  if (!valid) {
    break;
  }
}

const regHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
console.log(regHashtag.test('#ffffvv')); //pattern ??  pattern="/^#[a-zа-яё0-9]{1,19}$/i"

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

controlValue.value = 100;
controlSmall.addEventListener('click', () => {
  controlValue.value - 25;
});
controlBig.addEventListener('click', () => {
  controlValue.value += 25;
});