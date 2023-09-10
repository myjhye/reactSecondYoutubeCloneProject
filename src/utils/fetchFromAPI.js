// 자바스크립트의 axios를 사용해 youtube api v3.1을 호출하는 기능의 모듈 정의

import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';


// http 요청을 위한 옵션 객체
const options = {
  method: 'GET',
  url: BASE_URL, // 요청을 보낼 url
  params: {
    maxResults: 50, // api에서 검색 결과로 반환할 최대 동영상 수
  },
  headers: {
    // rapid api를 사용하기 위한 api키와 host
    'X-RapidAPI-Key': '06d91faac9msh099443fda18026cp10c158jsn23cb5bc57a6b',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};

// youtube api에서 데이터를 가져오는 함수
export const fetchFromAPI = async (setUrl) => {

    // axios를 사용해 http get 요청을 보냄
    const { data } = await axios.get(`${BASE_URL}/${setUrl}`, options);

    // 가져온 데이터 반환
    return data;
};