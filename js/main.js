import {renderPictures} from './miniature.js';
import {showBigPicture} from './big-picture.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {setUserFormSubmit} from './form-submit.js';
import './validator.js';
import {showLoadingForm, closeLoadingForm} from './form.js';
import {getFiltredImages, init} from './add-filters.js';
import {loadPhoto} from './photo-preview.js';


const GETTING_ALERT_MESSAGE = 'Не удалось загрузить данные с сервера. Перезагрузите страницу.';

try {
  const data = await getData();
  init(data);
  renderPictures(getFiltredImages());
  showBigPicture(getFiltredImages());
} catch (err) {
  showAlert(GETTING_ALERT_MESSAGE);
}


loadPhoto();
showLoadingForm();
setUserFormSubmit(closeLoadingForm);

