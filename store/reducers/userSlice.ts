import { IUser } from "@/app/_types/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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
        setNewUser: (state, action: PayloadAction<IUser>) => {
            state = action.payload;
        },
    },
});

export const { setNewUser } = userSlice.actions;

export default userSlice;
