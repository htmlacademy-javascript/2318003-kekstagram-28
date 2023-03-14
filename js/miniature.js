const createPicture = (picture) => {
  const pictureTemplate = document.querySelector('#picture').content;

  const createdPicture = pictureTemplate.cloneNode(true);
  createdPicture.querySelector('.picture__img').src = picture.url;
  createdPicture.querySelector('.picture__likes').textContent = picture.likes;
  createdPicture.querySelector('.picture__comments').textContent = picture.comments.length;
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
