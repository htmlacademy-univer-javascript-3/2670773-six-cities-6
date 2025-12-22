import {createAsyncThunk} from '@reduxjs/toolkit';
import axios, {AxiosInstance} from 'axios';
import {setAuthorizationStatus, AuthorizationStatus} from './auth-slice.ts';
import {fetchFavorites} from './offer-thunks.ts';
import {clearFavorites} from './action.ts';

type LoginData = {
  email: string;
  password: string;
};

export const login = createAsyncThunk<void, LoginData, { extra: AxiosInstance }>(
  'auth/login',
  async (loginData, {extra: api, dispatch, rejectWithValue}) => {
    try {
      const response = await api.post('/login', loginData);
      const {token} = response.data;
      localStorage.setItem('six-cities-token', token);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Authorized));
      dispatch(fetchFavorites());
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        return rejectWithValue('Некорректные данные. Проверьте email и пароль.');
      }
      dispatch(setAuthorizationStatus(AuthorizationStatus.Unauthorized));
      return rejectWithValue('Ошибка авторизации');
    }
  }
);

export const checkAuth = createAsyncThunk<void, undefined, { extra: AxiosInstance }>(
  'auth/checkAuth',
  async (_arg, {extra: api, dispatch}) => {
    try {
      await api.get('/login');
      dispatch(setAuthorizationStatus(AuthorizationStatus.Authorized));
      dispatch(fetchFavorites());
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        dispatch(setAuthorizationStatus(AuthorizationStatus.Unauthorized));
      } else {
        dispatch(setAuthorizationStatus(AuthorizationStatus.Unknown));
      }
    }
  }
);

export const logout = createAsyncThunk<void, undefined, { extra: AxiosInstance }>(
  'auth/logout',
  async (_arg, { extra: api, dispatch }) => {
    await api.delete('/logout');
    localStorage.removeItem('six-cities-token');
    dispatch(setAuthorizationStatus(AuthorizationStatus.Unauthorized));
    dispatch(clearFavorites());
  }
);
