const insertionPicturePoint = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureInfo = document.querySelector('.big-picture__social');
const commentsContainer = bigPictureInfo.querySelector('.social__comments');
const exitButton = bigPicture.querySelector('.big-picture__cancel');

const createComments = (data) => {
  data.comments.forEach((element) => {
    const commentP = document.createElement('p');
    commentP.className = 'social__text';
    commentP.textContent = element.message;
    const commentImg = document.createElement('img');
    commentImg.className = 'social__picture';
    commentImg.src = element.avatar;
    const commentLi = document.createElement('li');
    commentLi.className = 'social__comment';
    commentLi.append(commentImg);
    commentLi.append(commentP);
    commentsContainer.append(commentLi);
  });
};

const openBigPicture = (item) => {
  bigPicture.classList.remove('hidden');
  commentsContainer.innerHTML = '';
  bigPicture.querySelector('.big-picture__img img').src = item.url;
  bigPicture.querySelector('.social__caption').textContent = item.description;
  bigPicture.querySelector('.likes-count').textContent = item.likes;
  bigPicture.querySelector('.comments-count').textContent = item.comments.length;
  createComments(item);
  exitButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      bigPicture.classList.add('hidden');
    }
  });
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
