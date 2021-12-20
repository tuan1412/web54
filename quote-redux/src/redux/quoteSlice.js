import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: "idle",
  quote: null,
}

export const fetchQuotes = createAsyncThunk('quote/fetchQuote', async () => {
  const res = await axios.get("https://api.quotable.io/random");
  return res.data
})

// pending
// fulfilled => resolve
// rejected  => rejected
export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchQuotes.pending]: (state, action) => {
      console.log(action);
      state.status = "loading";
    },
    [fetchQuotes.fulfilled]: (state, action) => {
      console.log(action);
      state.status = "done";
      state.quote = action.payload
    },
    [fetchQuotes.rejected]: (state, action) => {
      console.log(action);
      state.status = "error";
    }
  }
})

export default quoteSlice.reducer;