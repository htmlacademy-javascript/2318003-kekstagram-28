import {renderPictures} from './miniature.js';
import {showBigPicture} from './big-picture.js';
import {getData} from './api.js';

getData()
  .then((userMiniature) => {
    renderPictures(userMiniature);
    showBigPicture(userMiniature);
  });


import {showLoadingForm} from './form.js';
showLoadingForm();
