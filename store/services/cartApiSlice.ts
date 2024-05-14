import { ICart, ICartProduct } from "@/app/_types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApiSlice = createApi({
    reducerPath: "cartApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["Cart", "CartProduct"],
    endpoints: (build) => ({
        getOneCart: build.query<ICart, number>({
            query: (id) => ({
                url: "/cart",
                params: {
                    id,
                },
            }),
            providesTags: ["Cart"],
        }),
        createCartProduct: build.mutation<
            ICartProduct,
            { productId: ICartProduct["productId"]; cartId: ICart["id"]; amount: number }
        >({
            query: (body) => ({
                url: "/cartproduct",
                method: "POST",
                body,
            }),
            invalidatesTags: ["CartProduct"],
        }),
        deleteCartProduct: build.mutation<
            string,
            { productId: ICartProduct["productId"]; cartId: ICart["id"] }
        >({
            query: (body) => ({
                url: `/cartproduct`,
                method: "DELETE",
                body,
            }),
            invalidatesTags: ["CartProduct"],
        }),
    }),
});
