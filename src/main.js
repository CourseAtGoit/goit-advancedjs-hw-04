import izitoast from 'izitoast';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const refs = {
  formEl: document.querySelector('.form'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreButton: document.querySelector('.load-more'),
};

let page = 1;
let searchQuery = null;
let galleryCardHeight = null;
let totalPages;

const handleFormSubmit = async event => {
  event.preventDefault();
  const form = event.currentTarget;
  searchQuery = form.elements.search_text.value.trim();

  if (!searchQuery) {
    izitoast.error({
      message: 'Please enter a search query',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  hideLoadMoreButton(handleLoadMoreClick);
  showLoader();
  page = 1;
  try {
    const response = await getImagesByQuery(searchQuery, page);

    if (response.hits.length === 0) {
      izitoast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }
    createGallery(response.hits);

    totalPages = Math.ceil(response.totalHits / 15);

    if (totalPages > 1) {
      showLoadMoreButton(handleLoadMoreClick);
    }

    const image = refs.galleryEl.querySelector('.gallery-image');
    await image.decode();

    galleryCardHeight = refs.galleryEl
      .querySelector('li')
      .getBoundingClientRect().height;
  } catch (error) {
    console.error('Error fetching images:', error);
    izitoast.error({
      message: 'Failed to fetch images',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    form.reset();
  }
};

const handleLoadMoreClick = async () => {
  page += 1;
  try {
    hideLoadMoreButton(handleLoadMoreClick);
    showLoader();
    const response = await getImagesByQuery(searchQuery, page);
    totalPages = Math.ceil(response.totalHits / 15);

    createGallery(response.hits);

    scrollBy({
      top: galleryCardHeight * 2,
      behavior: 'smooth',
    });

    showLoadMoreButton(handleLoadMoreClick);

    if (page === totalPages) {
      hideLoadMoreButton();
      izitoast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    izitoast.error({
      message: 'Failed to fetch images',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
};

refs.formEl.addEventListener('submit', handleFormSubmit);
