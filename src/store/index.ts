import { configureStore } from "@reduxjs/toolkit";
import app from "./slices/appSlice";
import view from "./slices/viewSlice";

export const store = configureStore({
    reducer: {
        app,
        view,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
