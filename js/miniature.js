const createPicture = (picture) => {
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const createdPicture = pictureTemplate.cloneNode(true);
  const pictureImg = createdPicture.querySelector('.picture__img');
  pictureImg.src = picture.url;
  pictureImg.alt = picture.description;
  createdPicture.querySelector('.picture__likes').textContent = picture.likes;
  createdPicture.querySelector('.picture__comments').textContent = picture.comments.length;
  createdPicture.dataset.pictureId = picture.id;

  return createdPicture;
};


const renderPictures = (insertionPictures) => {
  const insertionPicturePoint = document.querySelector('.pictures');
  insertionPicturePoint.querySelectorAll('.picture').forEach((item) => item.remove());

  const photosFragment = document.createDocumentFragment();
  insertionPictures.slice().forEach((element) => {
    insertionPicturePoint.append(createPicture(element));
  });
  insertionPicturePoint.append(photosFragment);
  return insertionPicturePoint;
};

export {renderPictures};
