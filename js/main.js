
const NAMES = ['Гор', 'Исида', 'Сет', 'Маат', 'Бастет', 'Осирис', 'Птах', 'Ра', 'Сехмет', 'Тот', 'Хеп', 'Ях', 'Шу', 'Хаухет', 'Хатор', 'Серкет', 'Нейт', 'Монту', 'Геб', 'Бенну', 'Бат', 'Атум', 'Атон', 'Ба', 'Атон'];

const MESSAGE = ['Всё отлично!',
'В целом всё неплохо. Но не всё.',
'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const DESCRIPTION = ['развитие ценностей.', 'значение совершенной', 'Активно развивая активности', 'Полет с их данными', 'возрастает необходимость', 'общества нашей неузнаваемости',
'рост сомнений', 'значение мира', 'совершенный статус'];

const RANDOM_PHOTO_OBJECT_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/*const createRandomIdFromRangeGenerator = (a, b) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(a, b);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(a, b);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};*/

const photoObject = (value, index) => {
  const randomNameIndex = getRandomInteger(0, NAMES.length - 1);
  const randomMessageIndex = getRandomInteger(0, MESSAGE.length - 1);
  const randomDescriptionIndex = getRandomInteger(0, DESCRIPTION.length - 1);
  const randomIndexAvatar = getRandomInteger(1, 6);
  const randomLikes = getRandomInteger(0, 300);

  return {
    id: index + 1,
    url: 'photos/' + (index + 1) + '.jpg',
    description: DESCRIPTION[randomDescriptionIndex],
    likes: randomLikes,
    comments: '', /*это обьект в обьекте? как сделать несколько? */
    avatar: 'img/avatar-' + randomIndexAvatar + '.svg',
    message: MESSAGE[randomMessageIndex], /*как сделать или два? */
    name: NAMES[randomNameIndex],
  };
};

const randomPhotoObject = Array.from({length: RANDOM_PHOTO_OBJECT_COUNT}, photoObject);

console.log(
  randomPhotoObject
);
