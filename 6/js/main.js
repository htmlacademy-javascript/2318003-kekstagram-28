import {createPhotoDescription} from './data.js';
const insertionPictures = createPhotoDescription();
import {renderPictures} from './miniature.js';
renderPictures(insertionPictures);
import {showBigPicture} from './big-picture.js';
showBigPicture(insertionPictures);

