//Поле ввода хэштегов
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const form = document.querySelector('.img-upload__form');

const MAX_HASHTAG_COUNT = 5;

//Регулярка для проверки 1 хештега
const HASHTAG_REG_EXP = /^#[a-zа-яё0-9]{1,19}$/;

const HASHTAG_FIRST_SYMBOL_REG_EXP = /^#/;

const HASHTAG_CONTENT_REG_EXP = /^[a-zа-яё0-9]$/;

const HASHTAG_LENGTH_REG_EXP = /^.{1,19}$/;


const isValidHashTags = (hashtags) => {
  if (!hashtags) {
    return true;
  }
  const splitHashTags = hashtags.toLowerCase().trim().split(' ');
  const splitHashTagsSet = new Set(splitHashTags);
  if (splitHashTagsSet.size === splitHashTags.length && splitHashTags.length <= MAX_HASHTAG_COUNT) {
    return splitHashTags.every((hashtag) => HASHTAG_REG_EXP.test(hashtag));
  }
};

const errorMessage = (hashtags) => {
  const splitHashTags = hashtags.toLowerCase().split(' ');
  const splitHashTagsSet = new Set(splitHashTags);
  if (!(splitHashTagsSet.size === splitHashTags.length)) {
    return 'Хэштеги не должны повторяться';
  }
  if (splitHashTags.length > MAX_HASHTAG_COUNT) {
    return 'Хэштегов может быть не более 5 штук';
  }
  if (splitHashTagsSet.size === splitHashTags.length && splitHashTags.length <= MAX_HASHTAG_COUNT) {
    for (let i = 0; i <= splitHashTags.length; i++) {
      if (!(HASHTAG_FIRST_SYMBOL_REG_EXP.test(splitHashTags[i]))) {
        return 'Хэштег должен начинаться с "#"';
      }
      if (!(HASHTAG_CONTENT_REG_EXP.test(splitHashTags[i]))) {
        return 'Хэштег должен содержать только буквы латинского и русского алфавита или цифры';
      }
      if (!(HASHTAG_LENGTH_REG_EXP.test(splitHashTags[i]))) {
        return 'Хэштег быть от 1 до 19 символов';
      }
    }
  }
};

const isValidComment = (comment) => {
  if (!comment || comment.length <= 140) {
    return true;
  }
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const createValidator = () => {
  pristine.addValidator(hashtagInput, isValidHashTags, errorMessage);
  pristine.addValidator(commentInput, isValidComment, 'Длина комментария должна быть < 140 символов');
};

const destroyValidator = () => {
  if (pristine) {
    pristine.destroy();
  }
};

const validate = () => pristine.validate();

export {createValidator, validate, destroyValidator};
