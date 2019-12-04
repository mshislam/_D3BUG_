import axios from 'axios';
import setAuthorizationToken from '../utils.js/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { LOGOUT, LOGIN } from './types.js';
import { LOAD } from 'redux-storage';


export function setCurrentUser(user) {

  return {

    type: LOGIN,

    user


  };

}

export function setuserlogout(user) {


  return {

    type: LOGOUT,

    user

  };

}


export function logout() {


  return dispatch => {

    console.log(localStorage.getItem('state'))

    localStorage.removeItem('jwtToken');

    localStorage.removeItem('state');


    setAuthorizationToken(false);

    dispatch(setuserlogout({}));

  }

}

export function login(data) {



  return dispatch => {

    console.log(data)

    return axios.post('http://localhost:3001/api/users/login', data).then(res => {



      const token = res.data.data;

     
      localStorage.setItem('jwtToken', token);

      console.log(token)

      setAuthorizationToken(token);


      dispatch(setCurrentUser(jwtDecode(token)));



    }) .catch(function (err) {

      alert(err.response.data.error)

    });

    

  }



}

