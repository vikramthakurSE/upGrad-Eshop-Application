import { configureStore } from '@reduxjs/toolkit';
import roleReducer from './role-manager';

export const Roles = configureStore({
  reducer: {
    role: roleReducer,
  },
});