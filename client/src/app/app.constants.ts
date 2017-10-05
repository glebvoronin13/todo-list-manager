const baseUrl = 'http://localhost:3000/api';

export const API = {
  login: baseUrl + '/session',
  register: baseUrl + '/user',
  logout: baseUrl + '/session',
  todos: baseUrl + '/todos',
};
