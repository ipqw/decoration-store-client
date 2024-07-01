import { ICart, ICartProduct } from "@/app/_types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApiSlice = createApi({
    reducerPath: "cartApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://decoration-store-server.vercel.app/api" }),
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
        getCartProductsByCartId: build.query<ICartProduct[], number>({
            query: (cartId) => ({
                url: "/cartproduct",
                params: {
                    cartId,
                },
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: "CartProduct" as const, id })),
                          "CartProduct",
                      ]
                    : ["CartProduct"],
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
        deleteCartProduct: build.mutation<string, number>({
            query: (id) => ({
                url: `/cartproduct/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["CartProduct"],
        }),
    }),
});
