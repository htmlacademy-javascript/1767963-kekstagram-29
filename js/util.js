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
  if (a.comments.length > b.comments.length) {
    return -1;
  } else if (a.comments.length < b.comments.length) {
    return 1;
  }

  return 0;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//debounce
function debounce (callback, timeoutDelay = 500) {
  //Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  ///к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    //Перед каждым новым вызовом удаляем предыдущий таймаут,
    //чтобы они не накапливались
    clearTimeout(timeoutId);

    //Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    //Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    //пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}


export {getRandomInteger, isEscapeKey, compareNumeric, debounce, shuffle};


