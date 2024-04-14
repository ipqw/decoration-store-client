import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { productApiSlice } from "./services/productApiSlice";
import { wishlistApiSlice } from "./services/wishlistApiSlice";
import { cartApiSlice } from "./services/cartApiSlice";
import { userApiSlice } from "./services/userApiSlice";
import userSlice from "./reducers/userSlice";

const rootReducer = combineSlices(
    productApiSlice,
    wishlistApiSlice,
    cartApiSlice,
    userApiSlice,
    userSlice,
);

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(
                productApiSlice.middleware,
                wishlistApiSlice.middleware,
                cartApiSlice.middleware,
                userApiSlice.middleware,
            );
        },
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
