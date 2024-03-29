const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const form = document.querySelector('.img-upload__form');

const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;


const HASHTAG_REG_EXP = /^#[a-zа-яё0-9]{1,19}$/;
const HASHTAG_FIRST_SYMBOL_REG_EXP = /^#/;
const HASHTAG_CONTENT_REG_EXP = /[a-zа-яё0-9]/;


const ERROR_HASHTAG_REPEAT = 'Хэштеги не должны повторяться';
const ERROR_HASHTAG_COUNT = 'Хэштегов может быть не более 5 штук';
const ERROR_HASHTAG_START = 'Хэштег должен начинаться с "#"';
const ERROR_HASHTAG_CONTENT = 'Хэштег должен содержать только буквы латинского и русского алфавита или цифры';
const ERROR_HASHTAG_LENGTH = 'Хэштег должен быть от 1 до 19 символов';


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


const defineErrorMessage = (hashtags) => {
  const splitHashTags = hashtags.toLowerCase().trim().split(' ');
  const splitHashTagsSet = new Set(splitHashTags);
  if (splitHashTagsSet.size !== splitHashTags.length) {
    return ERROR_HASHTAG_REPEAT;
  }
  if (splitHashTags.length > MAX_HASHTAG_COUNT) {
    return ERROR_HASHTAG_COUNT;
  }
  if (splitHashTagsSet.size === splitHashTags.length && splitHashTags.length <= MAX_HASHTAG_COUNT) {
    for (let i = 0; i <= splitHashTags.length; i++) {
      if (!(HASHTAG_FIRST_SYMBOL_REG_EXP.test(splitHashTags[i]))) {
        return ERROR_HASHTAG_START;
      }
      if (!(HASHTAG_CONTENT_REG_EXP.test(splitHashTags[i]))) {
        return ERROR_HASHTAG_CONTENT;
      }
      if (splitHashTags[i].length < MIN_HASHTAG_LENGTH && splitHashTags[i].length > MAX_HASHTAG_LENGTH) {
        return ERROR_HASHTAG_LENGTH;
      }
    }
  }
};


const isValidComment = (comment) => comment.length <= MAX_COMMENT_LENGTH;


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper',
  errorTextClass:'img-upload__field-wrapper--error',
});


pristine.addValidator(hashtagInput, isValidHashTags, defineErrorMessage);
pristine.addValidator(commentInput, isValidComment, 'Длина комментария должна быть < 140 символов');


export {pristine};
