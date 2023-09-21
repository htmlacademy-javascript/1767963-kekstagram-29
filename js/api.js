import { renderPhotos } from'./picture.js';
import { setupHandlers } from'./big-picture.js';
import { showFilter } from'./picture.js';

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const getData = () => fetch('https://29.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    renderPhotos(photos);
    setupHandlers(photos);
    showFilter(photos);
  })

  .catch((err) => {
    showAlert(err.message);
  });

export {getData};
