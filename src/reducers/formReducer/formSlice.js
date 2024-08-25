import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formValues: {},
  formError: {},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      const { parent, value } = action.payload;
      state.formValues[parent] = value;
    },

    setFormError: (state, action) => {
      const { parent, value } = action.payload;
      state.formError[parent] = value;
    },
    clearAllFormData: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const { setFormData, setFormError, clearAllFormData } =
  formSlice.actions;

export default formSlice.reducer;
