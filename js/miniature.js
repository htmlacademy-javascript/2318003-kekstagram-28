import {createPhotoDescription} from './data.js';

const insertionPicturePoint = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const createdPictures = createPhotoDescription();

const photosFragment = document.createDocumentFragment();

createdPictures.forEach(({url, description, likes, comments}) => {
  const createdPicture = pictureTemplate.cloneNode(true);
  createdPicture.querySelector('.picture__img').src = url;
  createdPicture.querySelector('.picture__img').alt = description;
  createdPicture.querySelector('.picture__likes').textContent = likes;
  createdPicture.querySelector('.picture__comments').textContent = comments.length;
  insertionPicturePoint.append(createdPicture);
});

insertionPicturePoint.append(photosFragment);
