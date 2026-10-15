import SimpleLightbox from 'simplelightbox';

const lightbox = new SimpleLightbox('.gallery a');

const refs = {
  loaderEl: document.querySelector('.loader'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreButton: document.querySelector('.load-more'),
};

export const createGallery = images => {
  const galleryTamplate = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
            <li class="gallery-item">
                <a href="${largeImageURL}" class="gallery-link">
                    <img
                        class="gallery-image"
                        src="${webformatURL}"
                        alt="${tags}"
                        width="360"
                        height="200"
                        loading="lazy"
                    />
                    <ul class ="info">
                        <li class="info-item">
                        <span class="info-item-title">Likes</span>
                        <span class="info-item-value">${likes}</span>
                        </li>
                        <li class="info-item">
                        <span class="info-item-title">Views</span>
                        <span class="info-item-value">${views}</span>
                        </li>
                        <li class="info-item">
                        <span class="info-item-title">Comments</span>
                        <span class="info-item-value">${comments}</span>
                        </li>
                        <li class="info-item">
                        <span class="info-item-title">Downloads</span>
                        <span class="info-item-value">${downloads}</span>
                        </li>
                    </ul>
                </a>
            </li>`;
      }
    )
    .join('');
  refs.galleryEl.insertAdjacentHTML('beforeend', galleryTamplate);
  lightbox.refresh();
};

export const clearGallery = () => {
  refs.galleryEl.innerHTML = '';
};

export const showLoader = () => {
  refs.loaderEl.classList.add('active');
};

export const hideLoader = () => {
  refs.loaderEl.classList.remove('active');
};

export const showLoadMoreButton = handleClick => {
  refs.loadMoreButton.classList.add('active');
  refs.loadMoreButton.addEventListener('click', handleClick);
};

export const hideLoadMoreButton = handleClick => {
  refs.loadMoreButton.classList.remove('active');
  refs.loadMoreButton.removeEventListener('click', handleClick);
};
