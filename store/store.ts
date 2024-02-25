import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { productApiSlice } from "./features/productApiSlice";

const rootReducer = combineSlices(productApiSlice);

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(productApiSlice.middleware);
        },
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
