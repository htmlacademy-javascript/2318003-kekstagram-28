import {pristine} from './validator.js';
import {sendData} from './api.js';
import {showSuccessMessage, showErrorMessage} from './message.js';

const form = document.querySelector('.img-upload__form');
const formSubmitButton = document.querySelector('.img-upload__submit');
const SubmitButtonTexts = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};


const blockSubmitButton = () => {
  formSubmitButton.disabled = true;
  formSubmitButton.textContent = SubmitButtonTexts.SENDING;
};

const unblockSubmitButton = () => {
  formSubmitButton.disabled = false;
  formSubmitButton.textContent = SubmitButtonTexts.IDLE;
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          showSuccessMessage();
          onSuccess();
        })
        .catch(() => {
          showErrorMessage();
        })
        .finally(unblockSubmitButton);
    }
  });
};

export {setUserFormSubmit};
