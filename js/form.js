import {isEscapeKey, showSuccessMessage, showErrorMessage} from './util.js';
import {createValidator, isValidPristine, /* destroyValidator */} from './validator.js';
import {scaleChangeCreate, scaleChangeDestroy} from './scale.js';
import {createSlider, destroySlider} from './slider.js';
import {sendData} from './api.js';


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

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = isValidPristine();
    if (isValid) {
      sendData(new FormData(evt.target))
        .then(() => {
          showSuccessMessage();
          onSuccess();
        })
        .catch(() => {
          showErrorMessage();
        });
    }
  });
};


//Действия при закрытии
function closeLoadingForm () {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', closeLoadingForm);
  document.removeEventListener('keydown', onCloseButtonKeydown);
  //destroyValidator();
  scaleChangeDestroy();
  destroySlider();
}


//Действия при открытии
const openLoadingForm = () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', closeLoadingForm);
  document.addEventListener('keydown', onCloseButtonKeydown);
  setUserFormSubmit(closeLoadingForm);
  form.reset();
  createValidator();
  scaleChangeCreate();
  createSlider();
};

//Итог
const showLoadingForm = () => {
  document.querySelector('#upload-file').addEventListener('change', () => {
    openLoadingForm();
  });
};

export {showLoadingForm};
