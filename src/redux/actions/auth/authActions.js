//import axios from 'axios';
import setAuthorizationToken from './setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from '../../types/types';
var client = require('./client');

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}
//then(res => { return res.data.user })
export function login(data) {
  return dispatch => {
    return client.post('user/cms/login', data).then(res => {
      const token = res.data.accessToken;
      const user = res.data.user
      const auth = res.data.auth
      localStorage.setItem('auth', auth);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
      return res.data.user;
    });
  }
}

// export function loginFailure(errors) {
//     return {
//         type: LOGIN_FAILURE,
//         errors
//     };
// }
// export function login(data) {
//     return dispatch => {
//         return fetch('http://localhost:3001/api/users/login', {
//             method: 'post',
//             crossDomain: true,
//             body: JSON.stringify(data),
//             headers: { 'Content-Type': 'application/json' }
//         }).then(res => {
//             res.json()
//         }).then(responseJson => {
//             console.log(responseJson)
//         }
//         )
//     }
// }