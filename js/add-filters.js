import {renderPictures} from './miniature.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;

const PICTURE_COUNT_FOR_RANDOM = 10;
const SORT_NUMBER = 0.5;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const imgFiltersForm = document.querySelector('.img-filters__form');
const imgFilters = document.querySelector('.img-filters');

let currentFilter = Filter.DEFAULT;

let pictures = [];


const sortByComments = (a, b) => b.comments.length - a.comments.length;

const sortByRandom = () => Math.random() - SORT_NUMBER;

const getFiltredImages = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [ ...pictures ].sort(sortByRandom).slice(0, PICTURE_COUNT_FOR_RANDOM);
    case Filter.DISCUSSED:
      return [ ...pictures ].sort(sortByComments);
    default:
      return [ ...pictures ];
  }
};

const isFilterButton = (evt) => evt.target.id === Filter.DEFAULT || evt.target.id === Filter.RANDOM || evt.target.id === Filter.DISCUSSED;

const onFilterClick = (cb) => {
  imgFiltersForm.addEventListener('click', (evt) => {
    if (isFilterButton(evt)) {
      document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      currentFilter = evt.target.id;
      cb(getFiltredImages());
    }
  });
};

const debouncedRenderGallery = debounce(renderPictures, RERENDER_DELAY);

const init = (loadedPictures) => {
  imgFilters.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  onFilterClick(debouncedRenderGallery);
};

export {getFiltredImages, init};
