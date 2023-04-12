const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const SCALE_STEP_VALUE = 25;

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
scaleValue.value = `${100}%`;

let currentScale = 100;


const onChangeScaleClickEvent = (evt) => {
  currentScale = parseInt(scaleValue.value, 10);
  if (evt.target.matches('.scale__control--smaller') && currentScale > MIN_SCALE_VALUE) {
    currentScale -= SCALE_STEP_VALUE;
  }
  if (evt.target.matches('.scale__control--bigger') && currentScale < MAX_SCALE_VALUE) {
    currentScale += SCALE_STEP_VALUE;
  }
  scaleValue.value = `${currentScale}%`;
  document.querySelector('.img-upload__preview  img').style.transform = `scale(${currentScale / 100})`;
};


const scaleChangeCreate = () => {
  document.querySelector('.scale__control--value').value = `${100}%`;
  document.querySelector('.img-upload__preview  img').style.transform = 'scale(1)';
  smallerButton.addEventListener('click', onChangeScaleClickEvent);
  biggerButton.addEventListener('click', onChangeScaleClickEvent);
};


const scaleChangeDestroy = () => {
  smallerButton.removeEventListener('click', onChangeScaleClickEvent);
  biggerButton.removeEventListener('click', onChangeScaleClickEvent);
};


export {scaleChangeCreate, scaleChangeDestroy};
