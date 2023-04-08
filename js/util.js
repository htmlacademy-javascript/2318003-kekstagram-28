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

//Функция проверки клавиши Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

//Функция показа ошибки
/* const ALERT_SHOW_TIME = 5;
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
}; */

const body = document.querySelector('body');

//Успешная загрузка
const showSuccessMessage = () => {
  const templateSuccess = document.querySelector('#success').content;
  const sectionSuccess = templateSuccess.querySelector('section');
  const cloneSectionSuccess = sectionSuccess.cloneNode(true);
  body.appendChild(cloneSectionSuccess);
};

//Загрузка с ошибкой
const showErrorMessage = () => {
  const templateError = document.querySelector('#error').content;
  const sectionError = templateError.querySelector('section');
  const cloneSectionError = sectionError.cloneNode(true);
  body.appendChild(cloneSectionError);
};

export {getRandomInteger, createIdGenerator, getRandomArrayElement, isEscapeKey, showAlert, showSuccessMessage, showErrorMessage};
