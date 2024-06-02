import { IAddress, IOrder } from "@/app/_types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApiSlice = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["Order", "Address"],
    endpoints: (build) => ({
        createOrder: build.mutation<
            IOrder,
            {
                status: string;
                price: number;
                addressId: number;
                userId: number;
                paymentMethod: string;
                products: string;
                firstName: string;
                lastName: string;
                phoneNumber: string;
                email: string;
            }
        >({
            query: (body) => ({
                url: "/order",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Order"],
        }),
        updateAddress: build.mutation<
            IAddress,
            {
                addressId: number;
                country: string;
                city: string;
                zipcode?: string;
                streetAddress: string;
                state?: string;
            }
        >({
            query: (body) => ({
                url: `/address/${body.addressId}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Address"],
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
