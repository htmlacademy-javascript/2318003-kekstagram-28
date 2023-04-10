import {renderPictures} from './miniature.js';
import {showBigPicture} from './big-picture.js';
import {getData} from './api.js';
import {showAlert, debounce} from './util.js';
import {setUserFormSubmit} from './form-submit.js';
import './validator.js';
import {showLoadingForm, closeLoadingForm} from './form.js';
import {getFiltredImages, init} from './add-filters.js';

const RERENDER_DELAY = 500;


try {
  const data = await getData();
  const debouncedRenderGallery = debounce(renderPictures, RERENDER_DELAY);
  init(data, debouncedRenderGallery);
  renderPictures(getFiltredImages());
  showBigPicture(getFiltredImages());
} catch (err) {
  showAlert('Не удалось загрузить данные с сервера. Перезагрузите страницу.');
}


showLoadingForm();
setUserFormSubmit(closeLoadingForm);
