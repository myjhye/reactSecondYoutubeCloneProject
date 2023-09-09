import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  method: 'GET',
  url: BASE_URL,
  params: {
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key': '06d91faac9msh099443fda18026cp10c158jsn23cb5bc57a6b',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};

export const fetchFromAPI = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);

    return data;
};