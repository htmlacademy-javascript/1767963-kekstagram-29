/*
const URL = ['photos/1.jpg', 'photos/2.jpg', 'photos/3.jpg', 'photos/4.jpg', 'photos/5.jpg', 'photos/6.jpg', 'photos/7.jpg', 'photos/8.jpg', 'photos/9 .jpg', 'photos/9.jpg', 'photos/10.jpg',
'photos/11.jpg', 'photos/12.jpg', 'photos/13.jpg', 'photos/14.jpg', 'photos/15.jpg', 'photos/16.jpg', 'photos/17.jpg', 'photos/18.jpg', 'photos/19 .jpg', 'photos/20.jpg',
'photos/21.jpg', 'photos/22.jpg', 'photos/23.jpg', 'photos/24.jpg', 'photos/25.jpg'];

description
'развитие ценностей.', 'значение совершенной', 'Активно развития активности', 'Позволяет с их данными', 'возрастает необходимость', 'общества нашей неузнаваемости',
'рост сомнений', 'значение мира', 'совершенной статус',

comments/message
Всё отлично!
В целом всё неплохо. Но не всё.
Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!

*/
const NAMES = ['Гор', 'Исида', 'Сет', 'Маат', 'Бастет', 'Осирис', 'Птах', 'Ра', 'Сехмет', 'Тот', 'Хеп', 'Ях', 'Шу', 'Хаухет', 'Хатор', 'Серкет', 'Нейт', 'Монту', 'Геб', 'Бенну', 'Бат', 'Атум', 'Атон', 'Ба', 'Атон'];

const MESSAGE = ['Всё отлично!',
'В целом всё неплохо. Но не всё.',
'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const DESCRIPTION = ['развитие ценностей.', 'значение совершенной', 'Активно развивая активности', 'Полет с их данными', 'возрастает необходимость', 'общества нашей неузнаваемости',
'рост сомнений', 'значение мира', 'совершенный статус'];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};


const photoObject = () => {
  const randomNameIndex = getRandomInteger(0, NAMES.length - 1);
  const randomMessageIndex = getRandomInteger(0, MESSAGE.length - 1);
  const randomDescriptionIndex = getRandomInteger(0, DESCRIPTION.length - 1);
  const randomIndex = getRandomInteger(1, 25);
  const randomIndexAvatar = getRandomInteger(1, 6);
  const randomLikes = getRandomInteger(0, 300);

  return {
    id: randomIndex,
    url: 'photos/' + randomIndex + '.jpg',
    description: DESCRIPTION[randomDescriptionIndex],
    likes: randomLikes,
    comments: '', /*это обьект в обьекте? как сделать несколько? */
    avatar: 'img/avatar-' + randomIndexAvatar + '.svg',
    message: MESSAGE[randomMessageIndex], /*как сделать или два? */
    name: NAMES[randomNameIndex],
  };
};

console.log(
  photoObject()
);
