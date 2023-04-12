import {isEscapeKey} from './util.js';
import {onCloseButtonKeydown} from './form.js';


const successMessage = document.querySelector('#success');
const errorMessage = document.querySelector('#error');


const onMessageCloseEvent = (evt) => {
  if (isEscapeKey(evt) ||
    evt.target.matches('.success__button') ||
    evt.target.matches('.success') ||
    evt.target.matches('.error__button') ||
    evt.target.matches('.error')) {
    closeMessage();
  }
};


const showSuccessMessage = () => {
  const successMessageTemplate = successMessage.content.querySelector('.success');
  const cloneSectionSuccess = successMessageTemplate.cloneNode(true);
  document.body.appendChild(cloneSectionSuccess);
  document.addEventListener('keydown', onMessageCloseEvent);
  cloneSectionSuccess.addEventListener('click', onMessageCloseEvent);
};


const showErrorMessage = () => {
  const errorMessageTemplate = errorMessage.content.querySelector('.error');
  const cloneSectionError = errorMessageTemplate.cloneNode(true);
  document.body.appendChild(cloneSectionError);
  document.removeEventListener('keydown', onCloseButtonKeydown);
  document.addEventListener('keydown', onMessageCloseEvent);
  cloneSectionError.addEventListener('click', onMessageCloseEvent);
};


function closeMessage () {
  const successMessageElement = document.querySelector('.success');
  const errorMessageElement = document.querySelector('.error');
  if (successMessageElement) {
    successMessageElement.remove();
  }
  if (errorMessageElement) {
    errorMessageElement.remove();
  }
  document.addEventListener('keydown', onCloseButtonKeydown);
  document.removeEventListener('keydown', onMessageCloseEvent);
}


export {showSuccessMessage, showErrorMessage};
