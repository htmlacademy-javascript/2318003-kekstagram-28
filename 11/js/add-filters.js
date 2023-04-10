const PICTURE_COUNT_FOR_RANDOM = 10;
const SORT_NUMBER = 0.5;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const imgFiltersForm = document.querySelector('.img-filters__form');
const filterButtons = imgFiltersForm.querySelectorAll('.img-filters__button');
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
      return [ ...pictures ].sort(sortByComments).slice();
    default:
      return [ ...pictures ];
  }
};

const onFilterClick = (cb) => {
  imgFiltersForm.addEventListener('click', (evt) => {
    filterButtons.forEach((item) => item.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
    currentFilter = evt.target.id;
    cb(getFiltredImages());
  });
};

const init = (loadedPictures, cb) => {
  imgFilters.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  onFilterClick(cb);
};

export {getFiltredImages, init};
