import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice'
import  scratchReducer  from './slices/scratchSlice';


export const rootReducer = combineReducers({
 auth: authReducer,
 scratches: scratchReducer
});
