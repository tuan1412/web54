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

export const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setActiveColor: (state, action) => {
      const newActiveColor = action.payload;

      state.activeColor = newActiveColor;
    },
    resetActiveColor: () => {
      return initialState;
    }
  }
})

// { type: 'SET_ACTIVE_COLOR', payload: 'red' }
export const { setActiveColor, resetActiveColor } = colorSlice.actions;

export default colorSlice.reducer;