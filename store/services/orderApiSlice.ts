import { IOrder } from "@/app/_types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApiSlice = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["Order", "OrderProduct"],
    endpoints: (build) => ({
        createOrder: build.mutation<
            IOrder,
            {
                status: string;
                price: number;
                addressId: number;
                userId: number;
                paymentMethod: string;
                products: { productId: number }[];
            }
        >({
            query: (body) => ({
                url: "/order",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Order"],
        }),

        getOrdersByUserId: build.query<IOrder[], number>({
            query: (userId) => ({
                url: "/order",
                method: "GET",
                params: {
                    userId,
                },
            }),
            providesTags: ["Order"],
        }),
    }),
});
