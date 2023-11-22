import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import { ugolokApi } from "./RTKSlice/api";

export const store = configureStore({
    reducer: {
        [ugolokApi.reducerPath]: ugolokApi.reducer,
        userSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ugolokApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
