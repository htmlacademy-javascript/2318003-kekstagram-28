const DESCRIPTIONS_OBJECT = ['Это я на отдыхе был', 'А щас я дома уже', 'Трудовые будни...'];
const MESSAGES_OBJECT = ['Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'В целом всё неплохо. Но не всё.'];
const NAMES_OBJECT = ['Ванек', 'Артурчик', 'Олежа', 'Настя', 'Саша', 'Сабрина'];


//Функция получения рандомного значения
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

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

const createCommentObject = () => {
  const commentAvatar = getRandomInteger(1, 6);
  const commentMessage = getRandomArrayElement(MESSAGES_OBJECT);
  const commentName = getRandomArrayElement(NAMES_OBJECT);
  return {
    id: commentId(),
    avatar: `img/avatar-${commentAvatar}.svg`,
    message: commentMessage,
    name: commentName
  };
};

const createInfo = () => {
  const commentsCount = getRandomInteger(1, 40);
  const commentArray = Array.from({length: commentsCount}, createCommentObject);
  const infoDescription = getRandomArrayElement(DESCRIPTIONS_OBJECT);
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
