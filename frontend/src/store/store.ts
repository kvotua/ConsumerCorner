import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slice/userSlice";
import pointSlice  from './slice/pointSlice'
import { ugolokApi } from "./RTKSlice/api";

export const store = configureStore({
    reducer: {
        [ugolokApi.reducerPath]: ugolokApi.reducer,
        userSlice,
        pointSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ugolokApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
