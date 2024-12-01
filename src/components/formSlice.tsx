import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormState } from '../common/types';
// Начальное состояние
const initialState: FormState = {
  name: '',
  email: '',
  message: '',
};

// Создание слайса
const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField(state, action: PayloadAction<{ field: keyof FormState; value: string }>) {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm() {
      return initialState;
    },
  },
});

export const { updateField, resetForm } = formSlice.actions;
export default formSlice.reducer;