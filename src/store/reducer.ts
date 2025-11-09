import {combineReducers} from '@reduxjs/toolkit';
import offersReducer from './offerSlice';
import cityReducer from './citySlice';
import authReducer from './authSlice';

export const reducer = combineReducers({
  offers: offersReducer,
  city: cityReducer,
  auth: authReducer,
});
