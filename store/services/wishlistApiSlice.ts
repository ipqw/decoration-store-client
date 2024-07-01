import { IWishlist, IWishlistProduct } from "@/app/_types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wishlistApiSlice = createApi({
    reducerPath: "wishlistApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://decoration-store-server.vercel.app/api" }),
    tagTypes: ["Wishlist", "WishlistProduct"],
    endpoints: (build) => ({
        getOneWishlist: build.query<IWishlist, number>({
            query: (id) => ({
                url: "/wishlist",
                params: {
                    id,
                },
            }),
            providesTags: ["Wishlist"],
        }),
        getWishlistProductsByWishlistId: build.query<IWishlistProduct[], number>({
            query: (wishlistId) => ({
                url: "/wishlistproduct",
                params: {
                    wishlistId,
                },
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: "WishlistProduct" as const, id })),
                          "WishlistProduct",
                      ]
                    : ["WishlistProduct"],
        }),
        createWishlistProduct: build.mutation<
            IWishlistProduct,
            { productId: IWishlistProduct["productId"]; wishlistId: IWishlist["id"] }
        >({
            query: (body) => ({
                url: "/wishlistproduct",
                method: "POST",
                body,
            }),
            invalidatesTags: ["WishlistProduct"],
        }),
        deleteWishlistProduct: build.mutation<
            string,
            { productId: IWishlistProduct["productId"]; wishlistId: IWishlist["id"] }
        >({
            query: (body) => ({
                url: `/wishlistproduct`,
                method: "DELETE",
                body,
            }),
            invalidatesTags: ["WishlistProduct"],
        }),
    }),
});
