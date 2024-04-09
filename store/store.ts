import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { productApiSlice } from "./services/productApiSlice";
import { wishlistApiSlice } from "./services/wishlistApiSlice";

const rootReducer = combineSlices(productApiSlice, wishlistApiSlice);

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(
                productApiSlice.middleware,
                wishlistApiSlice.middleware,
            );
        },
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
