import {isEscapeKey} from './util.js';

const insertionPicturePoint = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureInfo = document.querySelector('.big-picture__social');
const commentsContainer = bigPictureInfo.querySelector('.social__comments');
const exitButton = bigPicture.querySelector('.big-picture__cancel');

//Создает шаблон нового коммента
const createCommentElement = ({message, avatar}) => {
  const commentsTemplate = document.querySelector('#picture__comment').content;
  const createdComment = commentsTemplate.cloneNode(true);
  createdComment.querySelector('.social__picture').src = avatar;
  createdComment.querySelector('.social__text').textContent = message;
  return createdComment;
};

//Создает комменты
const createComments = (data) => {
  data.comments.forEach((element) => {
    commentsContainer.append(createCommentElement(element));
  });
};

//Создает полноэкранное изображение
const createBigPicture = ({url, description, likes, comments}) => {
  commentsContainer.innerHTML = '';
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  createComments({comments});
};

//Функция обработчика
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

//Функция закрытия окна, задана декларативно, чтоб можно было использовать в функции обработчика
function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

//Функция открытия окна
const openBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  createBigPicture(data);
  exitButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });
  document.addEventListener('keydown', onDocumentKeydown);
};


const showBigPicture = (pictures) => {
  insertionPicturePoint.addEventListener('click', (evt) => {
    const pictureField = evt.target.closest('[data-picture-id]');
    if (!pictureField) {
      return;
    }
    const image = pictures.find(
      (item) => item.id === +pictureField.dataset.pictureId
    );
    openBigPicture(image);
  });
};

export {showBigPicture};
