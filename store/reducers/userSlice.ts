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
    // разобраться с аунтефикацией
    extraReducers: (builder) => {
        builder.addMatcher(userApiSlice.endpoints.check.matchFulfilled, (state, { payload }) => {
            if ("user" in payload) {
                state.id = payload.user.id;
                state.firstName = payload.user.firstName;
                state.lastName = payload.user.lastName;
                state.email = payload.user.email;
                state.displayName = payload.user.displayName;
                state.imageUrl = payload.user.imageUrl;
                state.role = payload.user.role;
            }
        });
    },
});

export const { setUser } = userSlice.actions;

export default userSlice;