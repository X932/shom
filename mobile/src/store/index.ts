import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '@slices';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type RootStoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
