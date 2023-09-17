import { renderPhotos } from'./picture.js';
import { setupHandlers } from'./big-picture.js';
// Создайте новый модуль и опишите в нём функции взаимодействия c удалённым сервером с помощью fetch
//  для получения и отправки данных.
// Подключите модуль в проект.
fetch('https://29.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    console.log(photos)
  .then(onSuccess)
  .catch((err) => {
    console.error(err);
      });
  });

// Получение данных
// Доработайте модуль для отрисовки фотографий так, чтобы в качестве данных использовались не случайно сгенерированные объекты,
//  а те данные, которые вы загрузите с удалённого сервера.

// Добавьте обработку возможных ошибок при загрузке.

// Отправка данных
// данные из формы передавать с помощью AJAX.

// Добавьте обработчик отправки формы, если ещё этого не сделали,
// который бы отменял действие формы по умолчанию и отправлял данные формы посредством fetch на сервер.
const submitButton = document.querySelector('.img-upload__submit');
const setUserFormSubmit = (onSuccess) => {
  submitButton.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);

      fetch(
        'https://29.javascript.pages.academy/kekstagram',
        {
          method: 'POST',
          body: formData,
        },
      )
        .then(onSuccess)
        .catch((err) => {
          console.error(err);
        });
    }
  });
};//тут гдето должна быть очистка formElement.reset()

// Реализуйте возвращение формы в исходное состояние при успешной отправке, а также показ сообщения пользователю.
const successButton = document.querySelector('.success__button');//кнопка закрытия
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  const photoElement = PhotoTemplate.cloneNode(true);
  document.body.append(alertContainer);//тут как то надо использовать шаблон

  setTimeout(() => {
    alertContainer.remove();//удаление мне надо другое по сакцесс?
  },);
};

// Если при отправке данных произошла ошибка запроса, покажите соответствующее сообщение.

// Доработайте обработчик закрытия формы, чтобы кроме закрытия формы он сбрасывал введённые пользователем данные

// и возвращал форму в исходное состояние. Аналогичным образом обработайте нажатие на кнопку сброса.
