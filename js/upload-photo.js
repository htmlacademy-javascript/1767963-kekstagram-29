//12.13 Выбранная пользователем фотография должна загружаться в поле загрузки файлов в форме загрузки и показываться в окне.
//Изменение размеров и применение фильтра должны применяться для загруженной фотографии.
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const fileChooser = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');// это нужный элемент?

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});
