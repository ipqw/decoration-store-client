import { IProduct } from "@/app/_types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApiSlice = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["Product"],
    endpoints: (build) => ({
        fetchAllProducts: build.query<IProduct[], number | null>({
            query: (limit) => ({
                url: "/product",
                params: {
                    _limit: limit,
                },
            }),
            providesTags: ["Product"],
        }),
        createProduct: build.mutation<IProduct, IProduct>({
            query: (post) => ({
                url: "/product",
                method: "POST",
                body: post,
            }),
            invalidatesTags: ["Product"],
        }),
        updateProduct: build.mutation<IProduct, IProduct>({
            query: (post) => ({
                url: `/product/${post.id}`,
                method: "PUT",
                body: post,
            }),
            invalidatesTags: ["Product"],
        }),
        deleteProduct: build.mutation<IProduct, IProduct>({
            query: (post) => ({
                url: `/product/${post.id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Product"],
        }),
    }),
});
