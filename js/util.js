const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function isEscapeKey(evt) {
  return evt.key === 'ESC' || evt.key === 'Escape';
}

function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a === b) return 0;
  if (a < b) return -1;
}

export {getRandomInteger, isEscapeKey, compareNumeric};

//debounce
// function debounce (callback, timeoutDelay = 500) {
//   Используем замыкания, чтобы id таймаута у нас навсегда приклеился
//   к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
//   let timeoutId;

//   return (...rest) => {
//     Перед каждым новым вызовом удаляем предыдущий таймаут,
//     чтобы они не накапливались
//     clearTimeout(timeoutId);

//     Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
//     timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

//     Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
//     пока действие совершается чаще, чем переданная задержка timeoutDelay
//   };
// }

//throttle
//function throttle (callback, delayBetweenFrames) {
// Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
// к возвращаемой функции с условием, тогда мы его сможем перезаписывать
//let lastTime = 0;

//return (...rest) => {
// Получаем текущую дату в миллисекундах,
// чтобы можно было в дальнейшем
// вычислять разницу между кадрами
//const now = new Date();

// Если время между кадрами больше задержки,
// вызываем наш колбэк и перезаписываем lastTime
// временем "последнего кадра"
//if (now - lastTime >= delayBetweenFrames) {
//callback.apply(this, rest);
//lastTime = now;
//}
//};
//}
