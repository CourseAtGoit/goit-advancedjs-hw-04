import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '18770359-69995c75016210012c9ceb955';

axios.defaults.baseURL = BASE_URL;

export const getImagesByQuery = async (query, page) => {
  const response = await axios.get('/', {
    params: {
      key: API_KEY,
      q: query,
      page: page,
      per_page: 15,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  return response.data;
};
