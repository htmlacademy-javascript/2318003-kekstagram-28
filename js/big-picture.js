import {isEscapeKey} from './util.js';

const insertionPicturePoint = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureInfo = document.querySelector('.big-picture__social');
const commentsContainer = bigPictureInfo.querySelector('.social__comments');
const exitButton = bigPicture.querySelector('.big-picture__cancel');
const loadingCommentsButton = bigPicture.querySelector('.comments-loader');
let currentComments = 0;
let onLoadCommentsButton = null;


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
  data.forEach((element) => {
    commentsContainer.append(createCommentElement(element));
  });
};

//Добавляем загрузку комментов по 5 шт
const initComments = (comments) => {
  const ADDED_COMMENTS_COUNT = 5;
  const allComments = comments.slice();
  let renderedComments = [];
  return () => {
    if (allComments.length <= ADDED_COMMENTS_COUNT || currentComments + ADDED_COMMENTS_COUNT >= comments.length) {
      loadingCommentsButton.classList.add('hidden');
      createComments(allComments);
      currentComments += allComments.length;
    } else {
      loadingCommentsButton.classList.remove('hidden');
      renderedComments = allComments.splice(0, ADDED_COMMENTS_COUNT);
      createComments(renderedComments);
      currentComments += ADDED_COMMENTS_COUNT;
    }
    bigPicture.querySelector('.social__comment-count').innerHTML = `${currentComments} из <span class="comments-count">${comments.length}</span> комментариев`;
  };
};


//Создает полноэкранное изображение
const createBigPicture = ({url, description, likes, comments}) => {
  commentsContainer.innerHTML = '';
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  onLoadCommentsButton = initComments(comments);
  onLoadCommentsButton();
  loadingCommentsButton.addEventListener('click', onLoadCommentsButton);

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
  currentComments = 0;
  loadingCommentsButton.removeEventListener('click', onLoadCommentsButton);
}

//Функция открытия окна
const openBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  createBigPicture(data);
  exitButton.addEventListener('click', closeBigPicture);
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
