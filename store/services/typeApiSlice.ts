import { IType } from "@/app/_types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const typeApiSlice = createApi({
    reducerPath: "typeApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["Type"],
    endpoints: (build) => ({
        getAllTypes: build.query<IType[], null>({
            query: () => ({
                url: "/type",
            }),
            providesTags: ["Type"],
        }),
    }),
});
