// import { createStore } from 'redux';

import { configureStore } from '@reduxjs/toolkit'
import { humansSlice } from './humansSlice'
import { tasksSlice } from './tasksSlice'

// export const store = createStore(
//   (state = { humans: [], tasks: [] }, action) => state
// );

export const store = configureStore({
  // reducer: (state) => state,
  reducer: {
    tasks: tasksSlice.reducer,
    humans: humansSlice.reducer,
  },
})
