import {renderPictures} from './miniature.js';
import {showBigPicture} from './big-picture.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {setUserFormSubmit} from './form-submit.js';
import './validator.js';
import {showLoadingForm, closeLoadingForm} from './form.js';

getData()
  .then((userMiniature) => {
    renderPictures(userMiniature);
    showBigPicture(userMiniature);
  })
  .catch(() => showAlert('Не удалось загрузить данные с сервера. Перезагрузите страницу.'));


showLoadingForm();
setUserFormSubmit(closeLoadingForm);
