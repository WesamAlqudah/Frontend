import { createSlice } from '@reduxjs/toolkit';
import api from '../configuration/api';
import jwt_decode from 'jwt-decode';

const slice = createSlice({
  name: 'user',
  initialState: {
    user: localStorage.getItem('user'),
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      const token = state.user.userData.token;
      let decoded = jwt_decode(token);
      state.user.username = decoded.sub;
      state.user.userId = decoded.userId;
      state.user.role = decoded.role;
      state.user.token = token;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logoutSuccess: (state, action) => {
      state.user = null;
      localStorage.removeItem('token');
    },
    signUpSuccess: (state, action) => {},
  },
});

export default slice.reducer;

const { loginSuccess, logoutSuccess, signUpSuccess } = slice.actions;

export const login =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      const res = await api.post('authenticate', { username, password });
      const userData = res.data;
      dispatch(loginSuccess({ userData }));
    } catch (e) {
      return console.log(e.message);
    }
  };

export const signup =
  ({ fullname, username, password, Buyer, Seller }) =>
  async (dispatch) => {
    try {
      const res = await api.post('register', {
        fullname,
        username,
        password,
        Buyer,
        Seller,
      });
      const userData = res.data;
      dispatch(signUpSuccess({ userData }));
    } catch (e) {
      return console.log(e.message);
    }
  };

export const logout =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      return dispatch(logoutSuccess());
    } catch (e) {
      return console.log(e.message);
    }
  };
