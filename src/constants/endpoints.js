/* eslint-disable no-unused-vars */
const BASE_URL = process.env.REACT_APP_BACKEND_API_ENDPOINT;
// const BASE_URL = 'http://localhost:5000/api/v1';
const URL_AUTH = `${BASE_URL}/auth`;
const URL_STUDENT = `${BASE_URL}/students`;
const URL_ADULT = `${BASE_URL}/adults`;
const URL_AVATAR = `${BASE_URL}/avatars`;

const Endpoints = {
  urlGetAvatars: URL_AVATAR,
};

export default Endpoints;
