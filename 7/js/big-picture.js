import {isEscapeKey} from './util.js';

const insertionPicturePoint = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureInfo = document.querySelector('.big-picture__social');
const commentsContainer = bigPictureInfo.querySelector('.social__comments');
const exitButton = bigPicture.querySelector('.big-picture__cancel');
const loadingCommentsButton = bigPicture.querySelector('.comments-loader');
const ADDED_COMMENTS_COUNT = 5;
let renderComments = null;
let currentComments = 0;

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


const initComments = (comments) => {
  let i = 1;
  let renderedComments = [];
  const allComments = comments.slice();
  return () => {
    renderedComments = allComments.slice();
    if (renderedComments.length <= ADDED_COMMENTS_COUNT) {
      bigPicture.querySelector('.comments-loader').classList.add('hidden');
      createComments(renderedComments);
      currentComments = renderedComments.length;
      bigPicture.querySelector('.social__comment-count').innerHTML = `${currentComments} из <span class="comments-count">${renderedComments.length}</span> комментариев`;
    } else {
      if (currentComments + ADDED_COMMENTS_COUNT >= renderedComments.length) {
        bigPicture.querySelector('.comments-loader').classList.add('hidden');
        createComments(renderedComments.slice(-(renderedComments.length - currentComments)));
        currentComments = renderedComments.length;
      } else {
        bigPicture.querySelector('.comments-loader').classList.remove('hidden');
        createComments(renderedComments.slice((i - 1) * ADDED_COMMENTS_COUNT, currentComments + ADDED_COMMENTS_COUNT));
        i += 1;
        currentComments += ADDED_COMMENTS_COUNT;
      }
      bigPicture.querySelector('.social__comment-count').innerHTML = `${currentComments} из <span class="comments-count">${renderedComments.length}</span> комментариев`;
    }
  };
};


//Создает полноэкранное изображение
const createBigPicture = ({url, description, likes, comments}) => {
  commentsContainer.innerHTML = '';
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  renderComments = initComments(comments);
  renderComments();
  loadingCommentsButton.addEventListener('click', renderComments);

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
  loadingCommentsButton.removeEventListener('click', renderComments);
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
