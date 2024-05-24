import { IUser } from "@/app/_types/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { userApiSlice } from "../services/userApiSlice";

const initialState: IUser = {
    id: 0,
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    displayName: "",
    imageUrl: "",
    role: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(userApiSlice.endpoints.check.matchFulfilled, (state, { payload }) => {
            if ("user" in payload && "newToken" in payload && payload.user) {
                state.id = payload.user.id;
                state.firstName = payload.user.firstName;
                state.lastName = payload.user.lastName;
                state.email = payload.user.email;
                state.displayName = payload.user.displayName;
                state.imageUrl = payload.user.imageUrl;
                state.role = payload.user.role;
                state.wishlist = payload.user.wishlist;
                state.cart = payload.user.cart;
                localStorage.setItem("token", payload.newToken);
            }
        });
        builder.addMatcher(userApiSlice.endpoints.check.matchRejected, (state, { payload }) => {
            localStorage.removeItem("token");
        });

        builder.addMatcher(userApiSlice.endpoints.login.matchFulfilled, (state, { payload }) => {
            if ("user" in payload && "token" in payload && payload.user) {
                state.id = payload.user.id;
                state.firstName = payload.user.firstName;
                state.lastName = payload.user.lastName;
                state.email = payload.user.email;
                state.displayName = payload.user.displayName;
                state.imageUrl = payload.user.imageUrl;
                state.role = payload.user.role;
                state.wishlist = payload.user.wishlist;
                state.cart = payload.user.cart;
                localStorage.setItem("token", payload.token);
            }
        });
        builder.addMatcher(
            userApiSlice.endpoints.createUser.matchFulfilled,
            (state, { payload }) => {
                if ("user" in payload && "token" in payload && payload.user) {
                    state.id = payload.user.id;
                    state.firstName = payload.user.firstName;
                    state.lastName = payload.user.lastName;
                    state.email = payload.user.email;
                    state.displayName = payload.user.displayName;
                    state.imageUrl = payload.user.imageUrl;
                    state.role = payload.user.role;
                    state.wishlist = payload.user.wishlist;
                    state.cart = payload.user.cart;
                    localStorage.setItem("token", payload.token);
                }
            },
        );
    },
});

export const { setUser } = userSlice.actions;

export default userSlice;
