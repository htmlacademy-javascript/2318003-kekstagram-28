import {getRandomInteger, createIdGenerator, getRandomArrayElement} from './util.js';

const DESCRIPTIONS = ['Это я на отдыхе был', 'А щас я дома уже', 'Трудовые будни...'];
const MESSAGES = ['Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'В целом всё неплохо. Но не всё.'];
const NAMES = ['Ванек', 'Артурчик', 'Олежа', 'Настя', 'Саша', 'Сабрина'];

const commentId = createIdGenerator();
const infoId = createIdGenerator();
const infoUrl = createIdGenerator();

const createCommentObject = () => {
  const commentAvatar = getRandomInteger(1, 6);
  const commentMessage = getRandomArrayElement(MESSAGES);
  const commentName = getRandomArrayElement(NAMES);
  return {
    id: commentId(),
    avatar: `img/avatar-${commentAvatar}.svg`,
    message: commentMessage,
    name: commentName
  };
};

const createInfo = () => {
  const commentsCount = getRandomInteger(1, 40);
  const comments = Array.from({length: commentsCount}, createCommentObject);
  const infoDescription = getRandomArrayElement(DESCRIPTIONS);
  const infoLikes = getRandomInteger(15, 200);

  return {
    id: infoId(),
    url: `photos/${infoUrl()}.jpg`,
    description: infoDescription,
    likes: infoLikes,
    comments
  };
};
const infoCount = 25;
const photoDescription = Array.from({length: infoCount}, createInfo);

export {photoDescription};
