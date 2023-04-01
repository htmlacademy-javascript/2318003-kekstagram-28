import {isEscapeKey} from './util.js';
import {createValidator, onFormSubmit, destroyValidator} from './validator.js';


const form = document.querySelector('.img-upload__form');
const closeButton = document.querySelector('.img-upload__cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

//Закрытие на esc
const onCloseButtonKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeLoadingForm();
  }
};


//Действия при закрытии
function closeLoadingForm () {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
  //pristine.reset();
  closeButton.removeEventListener('click', closeLoadingForm);
  document.removeEventListener('keydown', onCloseButtonKeydown);
  destroyValidator();
}


//Действия при открытии
const openLoadingForm = () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', closeLoadingForm);
  document.addEventListener('keydown', onCloseButtonKeydown);
  form.addEventListener('submit', onFormSubmit);
  //Убирает возможность выхода, когда поля не в фокусе
  if (document.activeElement.tagName === 'input') {
    document.removeEventListener('keydown', onCloseButtonKeydown);
  }
  hashtagInput.addEventListener('focus', () => {
    document.removeEventListener('keydown', onCloseButtonKeydown);
  });
  commentInput.addEventListener('focus', () => {
    document.removeEventListener('keydown', onCloseButtonKeydown);
  });
  //Возвращает возможность выхода, когда поля не в фокусе
  hashtagInput.addEventListener('blur', () => {
    document.addEventListener('keydown', onCloseButtonKeydown);
  });
  commentInput.addEventListener('blur', () => {
    document.addEventListener('keydown', onCloseButtonKeydown);
  });
  createValidator();
};

//Итог
const showLoadingForm = () => {
  document.querySelector('#upload-file').addEventListener('change', () => {
    openLoadingForm();
  });
};

export {showLoadingForm};
