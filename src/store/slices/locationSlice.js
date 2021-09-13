import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    value: {}
  },
  reducers: {
    setLocation: (state, action) => {
      state.value = action.payload;
      console.log(state.value.id)
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
