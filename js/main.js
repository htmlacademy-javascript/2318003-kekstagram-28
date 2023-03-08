const descriptions = ['Это я на отдыхе был', 'А щас я дома уже', 'Трудовые будни...'];
const messages = ['Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'В целом всё неплохо. Но не всё.'];
const names = ['Ванек', 'Артурчик', 'Олежа', 'Настя', 'Саша', 'Сабрина'];


//Функция получения рандомного значения

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

//Функция получения рандомного уникального значения

/* const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}; */

//Функция генерации id

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

//Функция получения рандомного значения из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const commentId = createIdGenerator();
const infoId = createIdGenerator();
const infoUrl = createIdGenerator();
const createInfo = () => {
  const createCommentArray = () => {
    const commentAvatar = getRandomInteger(1, 6);
    const commentMessage = getRandomArrayElement(messages);
    const commentName = getRandomArrayElement(names);
    return {
      id: commentId(),
      avatar: `img/avatar-${commentAvatar}.svg`,
      message: commentMessage,
      name: commentName
    };
  };
  const commentsCount = getRandomInteger(1, 40);
  const commentArray = Array.from({length: commentsCount}, createCommentArray);
  const infoDescription = getRandomArrayElement(descriptions);
  const infoLikes = getRandomInteger(15, 200);

  return {
    id: infoId(),
    url: `photos/${infoUrl()}.jpg`,
    description: infoDescription,
    likes: infoLikes,
    comments: commentArray
  };
};
const infoCount = 25;
Array.from({length: infoCount}, createInfo);
