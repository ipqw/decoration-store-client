import { IUser } from "@/app/_types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApiSlice = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["User"],
    endpoints: (build) => ({
        check: build.query<{ newToken: string; user: IUser } | { message: string }, string>({
            query: (token) => ({
                url: "/user/auth",
                headers: {
                    authorization: token,
                },
            }),
        }),
        getUser: build.query<IUser, number>({
            query: (userId) => ({
                url: `/user/${userId}`,
            }),
            providesTags: [],
        }),
        createUser: build.mutation<
            { token: string; user: IUser },
            {
                email: IUser["email"];
                password: IUser["password"];
                firstName: IUser["firstName"];
                lastName: IUser["lastName"];
                displayName: IUser["displayName"];
            }
        >({
            query: (body) => ({
                url: "/user",
                method: "POST",
                body,
            }),
            invalidatesTags: ["User"],
        }),
        login: build.mutation<
            { token: string; user: IUser },
            { email: IUser["email"]; password: IUser["password"] }
        >({
            query: (body) => ({
                url: `/user/login`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["User"],
        }),
        updateUser: build.mutation<
            IUser,
            {
                id: number;
                email?: IUser["email"];
                password?: IUser["password"];
                firstName?: IUser["firstName"];
                lastName?: IUser["lastName"];
                displayName?: IUser["displayName"];
            }
        >({
            query: (body) => ({
                url: `/user/${body.id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["User"],
        }),
    }),
});
