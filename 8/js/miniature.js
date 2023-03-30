const createPicture = (picture) => {
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const createdPicture = pictureTemplate.cloneNode(true);
  createdPicture.querySelector('.picture__img').src = picture.url;
  createdPicture.querySelector('.picture__img').alt = picture.description;
  createdPicture.querySelector('.picture__likes').textContent = picture.likes;
  createdPicture.querySelector('.picture__comments').textContent = picture.comments.length;
  createdPicture.dataset.pictureId = picture.id;

  return createdPicture;
};


const renderPictures = (insertionPictures) => {
  const insertionPicturePoint = document.querySelector('.pictures');
  const photosFragment = document.createDocumentFragment();
  insertionPictures.forEach((element) => {
    insertionPicturePoint.append(createPicture(element));
  });
  insertionPicturePoint.append(photosFragment);
  return insertionPicturePoint;
};

export {renderPictures};
