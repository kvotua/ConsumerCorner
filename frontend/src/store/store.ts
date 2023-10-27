import { configureStore } from "@reduxjs/toolkit";
import registerSlice from './Slices/RegisterSlice'
import isEntrepreneurSlice from './Slices/isEntrepreneur'
import tokenSlice from './Slices/token'

export const store = configureStore({
  reducer: {
    registerSlice,
    isEntrepreneurSlice,
    tokenSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
