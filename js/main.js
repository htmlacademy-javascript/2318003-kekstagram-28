import {renderPictures} from './miniature.js';
import {showBigPicture} from './big-picture.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {setUserFormSubmit} from './form-submit.js';
import './validator.js';
import {showLoadingForm, closeLoadingForm} from './form.js';
import {getFiltredImages, init} from './add-filters.js';
import {loadPhoto} from './photo-preview.js';


const getDataAlertMessage = 'Не удалось загрузить данные с сервера. Перезагрузите страницу.';

try {
  const data = await getData();
  init(data);
  renderPictures(getFiltredImages());
  showBigPicture(getFiltredImages());
} catch (err) {
  showAlert(getDataAlertMessage);
}


loadPhoto();
showLoadingForm();
setUserFormSubmit(closeLoadingForm);

