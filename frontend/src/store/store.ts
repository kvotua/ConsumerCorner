import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./Slices/RegisterSlice";
import isEntrepreneurSlice from "./Slices/isEntrepreneur";
import tokenSlice from "./Slices/token";
import { ugolokApi } from "./Slices/FetchSlice";

export const store = configureStore({
    reducer: {
        registerSlice,
        isEntrepreneurSlice,
        tokenSlice,
        [ugolokApi.reducerPath]: ugolokApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ugolokApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
