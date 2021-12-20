import { configureStore } from '@reduxjs/toolkit';
import colorReducer from './colorSlice';
import quoteReducer from './quoteSlice';

export default configureStore({
  reducer: {
    color: colorReducer,
    quote: quoteReducer
  }
});
