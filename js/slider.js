const SLIDER_MIN = 0;
const SLIDER_MAX = 100;
const SLIDER_STEP = 1;

const EFFECTS = {'effect-none': ['effects__preview--none', ''],
  'effect-chrome': ['effects__preview--chrome', 'grayscale', 0, 1, 0.1, ''],
  'effect-sepia': ['effects__preview--sepia', 'sepia', 0, 1, 0.1, ''],
  'effect-marvin': ['effects__preview--marvin', 'invert', 0, 100, 1, '%'],
  'effect-phobos': ['effects__preview--phobos', 'blur', 0, 3, 0.1, 'px'],
  'effect-heat': ['effects__preview--heat', 'brightness', 1, 3, 0.1, '']
};

const DEFAULT_EFFECT = EFFECTS['effect-none'];

const effectList = document.querySelector('.effects__list');
const effectSliderLevel = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectContainerLevel = document.querySelector('.img-upload__effect-level');
const imgUploadPreview = document.querySelector('.img-upload__preview  img');

const createDefaultSetup = () => {
  imgUploadPreview.className = DEFAULT_EFFECT[0];
  imgUploadPreview.style = DEFAULT_EFFECT[1];
  imgUploadPreview.id = 'effect-none';
  effectLevelValue.value = '100%';
};

const createEditedSetup = (currentEffect, id) => {
  imgUploadPreview.className = currentEffect[0];
  imgUploadPreview.id = id;
  imgUploadPreview.style.filter = `${currentEffect[1]}(${currentEffect[3]}${currentEffect[5]})`;
  effectSliderLevel.noUiSlider.updateOptions({
    range: {
      min: currentEffect[2],
      max: currentEffect[3]
    },
    start: currentEffect[3],
    step: currentEffect[4],
  });
  effectSliderLevel.noUiSlider.set(currentEffect[3]);
};

const onEffectChange = (evt) => {
  if (evt.target.id === 'effect-none') {
    effectContainerLevel.classList.add('hidden');
    createDefaultSetup();
  } else {
    effectContainerLevel.classList.remove('hidden');
    const currentEffect = EFFECTS[evt.target.id];
    createEditedSetup(currentEffect, evt.target.id);
  }
};

const onSliderUpdate = () => {
  const sliderValue = effectSliderLevel.noUiSlider.get();
  effectLevelValue.value = sliderValue;
  const currentEffectId = imgUploadPreview.id;
  const currentEft = EFFECTS[currentEffectId];
  if (currentEft) {
    imgUploadPreview.style.filter = `${currentEft[1]}(${sliderValue}${currentEft[5]})`;
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
  effectList.addEventListener('change', onEffectChange);
};

const destroySlider = () => {
  effectSliderLevel.noUiSlider.off('update', onSliderUpdate);
  effectSliderLevel.noUiSlider.destroy();
  effectList.removeEventListener('change', onEffectChange);
};

export {createSlider, destroySlider};
