const SLIDER_MIN = 0;
const SLIDER_MAX = 100;
const SLIDER_STEP = 1;

const EFFECTS = {'effect-none': {class: 'effects__preview--none',
  style: ''},
'effect-chrome': {class:'effects__preview--chrome',
  style: 'grayscale',
  min: 0,
  max: 1,
  step: 0.1,
  dimension: ''},
'effect-sepia': {class: 'effects__preview--sepia',
  style: 'sepia',
  min: 0,
  max: 1,
  step: 0.1,
  dimension: ''},
'effect-marvin': {class: 'effects__preview--marvin',
  style: 'invert',
  min: 0,
  max: 100,
  step: 1,
  dimension: '%'},
'effect-phobos': {class: 'effects__preview--phobos',
  style: 'blur',
  min: 0,
  max: 3,
  step: 0.1,
  dimension: 'px'},
'effect-heat': {class: 'effects__preview--heat',
  style: 'brightness',
  min: 1,
  max: 3,
  step: 0.1,
  dimension: ''}
};

const DEFAULT_EFFECT = EFFECTS['effect-none'];

const effectField = document.querySelector('.img-upload__effects');
const effectSliderLevel = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectContainerLevel = document.querySelector('.img-upload__effect-level');
const imgUploadPreview = document.querySelector('.img-upload__preview  img');

const createDefaultSetup = () => {
  imgUploadPreview.className = DEFAULT_EFFECT.class;
  imgUploadPreview.style.filter = DEFAULT_EFFECT.style;
  imgUploadPreview.id = 'effect-none';
  effectLevelValue.value = `${SLIDER_MAX}%`;
};

const createEditedSetup = (currentEffect, id) => {
  imgUploadPreview.className = currentEffect.class;
  imgUploadPreview.id = id;
  imgUploadPreview.style.filter = `${currentEffect.style}(${currentEffect.max}${currentEffect.dimension})`;
  effectSliderLevel.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max
    },
    start: currentEffect.max,
    step: currentEffect.step,
  });
  effectSliderLevel.noUiSlider.set(currentEffect.max);
};

const onEffectChange = ({target: {id}}) => {
  if (id === 'effect-none') {
    effectContainerLevel.classList.add('hidden');
    createDefaultSetup();
  } else {
    effectContainerLevel.classList.remove('hidden');
    const currentEffect = EFFECTS[id];
    createEditedSetup(currentEffect, id);
  }
};

const onSliderUpdate = () => {
  const sliderValue = effectSliderLevel.noUiSlider.get();
  effectLevelValue.value = sliderValue;
  const currentEffectId = imgUploadPreview.id;
  const currentEft = EFFECTS[currentEffectId];
  if (currentEft) {
    imgUploadPreview.style.filter = `${currentEft.style}(${sliderValue}${currentEft.dimension})`;
  }
};

const createSlider = () => {
  createDefaultSetup();
  noUiSlider.create(effectSliderLevel, {
    range: {
      min: SLIDER_MIN,
      max: SLIDER_MAX,
    },
    start: SLIDER_MAX,
    step: SLIDER_STEP,
    connect: 'lower',
  });
  effectContainerLevel.classList.add('hidden');
  effectSliderLevel.noUiSlider.on('update', onSliderUpdate);
  effectField.addEventListener('change', onEffectChange);
};

const destroySlider = () => {
  effectSliderLevel.noUiSlider.off('update', onSliderUpdate);
  effectSliderLevel.noUiSlider.destroy();
  effectField.removeEventListener('change', onEffectChange);
};

export {createSlider, destroySlider};
