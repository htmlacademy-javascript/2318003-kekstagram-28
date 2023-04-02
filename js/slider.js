const SLIDER_MIN = 0;
const SLIDER_MAX = 100;
const SLIDER_STEP = 1;

const EFFECTS = [
  {class: 'effects__preview--none', style: ''},
  {class: 'effects__preview--chrome', style: 'grayscale', min: 0, max: 1, step: 0.1, dimention: ''},
  {class: 'effects__preview--sepia', style: 'sepia', min: 0, max: 1, step: 0.1, dimention: ''},
  {class: 'effects__preview--marvin', style: 'invert', min: 0, max: 100, step: 1, dimention: '%'},
  {class: 'effects__preview--phobos', style: 'blur', min: 0, max: 3, step: 0.1, dimention: 'px'},
  {class: 'effects__preview--heat', style: 'brightness', min: 1, max: 3, step: 0.1, dimention: ''}];

const DEFAULT_EFFECT = EFFECTS[0];

const effectList = document.querySelector('.effects__list');
const effectSliderLevel = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectContainerLevel = document.querySelector('.img-upload__effect-level');
const imgUploadPreview = document.querySelector('.img-upload__preview  img');

const createDefaultSetup = () => {
  imgUploadPreview.className = DEFAULT_EFFECT.class;
  imgUploadPreview.style = DEFAULT_EFFECT.style;
  effectLevelValue.value = '100%';
};

const onEffectClick = (evt) => {
  if (evt.target.matches('.effects__preview--none')) {
    effectContainerLevel.classList.add('hidden');
    createDefaultSetup();
  }else if (evt.target.matches('.effects__preview')) {
    effectContainerLevel.classList.remove('hidden');
    const currentEffect = EFFECTS.find((effect) => evt.target.matches(`.${effect.class}`));
    if (currentEffect) {
      imgUploadPreview.className = currentEffect.class;
      imgUploadPreview.style.filter = `${currentEffect.style}(${currentEffect.max}${currentEffect.dimention})`;
      effectSliderLevel.noUiSlider.updateOptions({
        range: {
          min: currentEffect.min,
          max: currentEffect.max
        },
        start: currentEffect.max,
        step: currentEffect.step,
      });
      effectSliderLevel.noUiSlider.set(currentEffect.max);
    }
  }
};

const onSliderUpdate = () => {
  const sliderValue = effectSliderLevel.noUiSlider.get();
  effectLevelValue.value = sliderValue;
  const currentEffectClass = imgUploadPreview.className;
  const currentEffect = EFFECTS.find((effect) => effect.class === currentEffectClass);
  if (currentEffect) {
    imgUploadPreview.style.filter = `${currentEffect.style}(${sliderValue}${currentEffect.dimention})`;
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
  effectList.addEventListener('click', onEffectClick);
};

const destroySlider = () => {
  effectSliderLevel.noUiSlider.off('update', onSliderUpdate);
  effectSliderLevel.noUiSlider.destroy();
  effectList.removeEventListener('click', onEffectClick);
};


export {createSlider, destroySlider};
