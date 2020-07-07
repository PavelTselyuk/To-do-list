import axios from 'axios';
import {
   AUTH_SIGN_UP,
   AUTH_SIGN_OUT,
   AUTH_SIGN_IN,
   DASHBOARD_GET_DATA,
   AUTH_ERROR
} from './types';


export let signUp = data => {
   return async dispatch => {
      try {
         console.log('[Action creater] signUp called');
         let res = await axios.post('http://localhost:5000/users/signup', data);

         console.log('[Action creater] signUp dispatched an action');
         dispatch({
            type: AUTH_SIGN_UP,
            payload: res.data.token
         });

         localStorage.setItem('JWT_TOKEN', res.data.token);
         axios.defaults.headers.common['Authorization'] = res.data.token;

      } catch (err) {
         dispatch({
            type: AUTH_ERROR,
            payload: 'This login is already exist'
         });
      }
   }
}

export let signIn = data => {
   return async dispatch => {
      try {
         console.log('[Action creater] signIn called');
         let res = await axios.post('http://localhost:5000/users/signin', data);

         console.log('[Action creater] signIn dispatched an action');
         dispatch({
            type: AUTH_SIGN_IN,
            payload: res.data.token
         });

         localStorage.setItem('JWT_TOKEN', res.data.token);
         axios.defaults.headers.common['Authorization'] = res.data.token;

      } catch (err) {
         dispatch({
            type: AUTH_ERROR,
            payload: 'Login and/or password is not valid'
         });
      }
   }
}

export let getSecret = () => {
   return async dispatch => {
      try {
         console.log('[ActionCreater] tries to get BE\'s secret');
         let res = await axios.get('http://localhost:5000/users/secret');
         console.log('Gotten list: ', res);

         dispatch({
            type: DASHBOARD_GET_DATA,
            payload: res.data.secret
         });

      } catch (error) {
         console.error('Error: ', error);
      }
   }
}

export let signOut = () => {
   return dispatch => {
      localStorage.removeItem('JWT_TOKEN');
      localStorage.removeItem('login');
      axios.defaults.headers.common['Authorization'] = '';

      dispatch({
         type: AUTH_SIGN_OUT,
         payload: ''
      });
   };
}