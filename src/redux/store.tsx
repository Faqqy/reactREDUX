import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../components/formSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

// Типы для использования в приложении
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;