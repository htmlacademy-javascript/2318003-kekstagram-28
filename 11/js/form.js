import {isEscapeKey} from './util.js';
import {pristine} from './validator.js';
import {scaleChangeCreate, scaleChangeDestroy} from './scale.js';
import {createSlider, destroySlider} from './slider.js';


const form = document.querySelector('.img-upload__form');
const closeButton = document.querySelector('.img-upload__cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');


//Закрытие на esc
const onCloseButtonKeydown = (evt) => {
  const hasActiveElement = document.activeElement === commentInput || document.activeElement === hashtagInput;
  if (isEscapeKey(evt) && !hasActiveElement) {
    evt.preventDefault();
    closeLoadingForm();
  }
};


//Действия при закрытии
function closeLoadingForm () {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', closeLoadingForm);
  document.removeEventListener('keydown', onCloseButtonKeydown);
  form.reset();
  pristine.reset();
  scaleChangeDestroy();
  destroySlider();
}


//Действия при открытии
const openLoadingForm = () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', closeLoadingForm);
  document.addEventListener('keydown', onCloseButtonKeydown);
  scaleChangeCreate();
  createSlider();
};

//Итог
const showLoadingForm = () => {
  document.querySelector('#upload-file').addEventListener('change', openLoadingForm);
};

export {showLoadingForm, closeLoadingForm, onCloseButtonKeydown};
