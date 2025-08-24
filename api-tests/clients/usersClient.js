const frisby = require('frisby');

const BASE_URL = 'https://reqres.in/api';
const API_KEY = 'reqres-free-v1';

frisby.globalSetup({
  request: {
    headers: {
      'x-api-key': API_KEY,
      'Accept': 'application/json'
    }
  }
});

module.exports = {
  getUsers: (page = 1) => frisby.get(`${BASE_URL}/users?page=${page}`),
  postUser: (body) => frisby.post(`${BASE_URL}/users`, { body })
};
