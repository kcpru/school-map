import { createSlice } from '@reduxjs/toolkit'

export const locationSlice = createSlice({
  name: 'activeLocation',
  initialState: {
    value: 0,
  },
  reducers: {
    set: (state, action) => {
      state.value = action.value
    },
  },
})

export const { set } = locationSlice.actions

export default locationSlice.reducer