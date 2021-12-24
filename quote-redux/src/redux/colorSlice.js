import { createSlice } from '@reduxjs/toolkit';

const colors = [
  "cornflowerblue",
  "blueviolet",
  "indianred",
  "deeppink",
  "forestgreen",
];

const initialState = {
  colors,
  activeColor: colors[2]
}

// setState(prevState => prevState)
// immer.js
export const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setActiveColor: (state, action) => {
      // action: type: 'color/setActiveColor'
      // payload: newActiveColor
      const newActiveColor = action.payload;

      state.activeColor = newActiveColor;
    },
    resetActiveColor: () => {
      // action: type 'color/resetActiveColor'
      // payload: ''
      return initialState;
    }
  }
})

// { type: 'SET_ACTIVE_COLOR', payload: 'red' }
export const { setActiveColor, resetActiveColor } = colorSlice.actions;

export default colorSlice.reducer;