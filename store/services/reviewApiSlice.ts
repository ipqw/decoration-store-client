import { IReview } from "@/app/_types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApiSlice = createApi({
    reducerPath: "reviewApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["Review"],
    endpoints: (build) => ({
        getAllReviews: build.query<IReview[], null>({
            query: () => ({
                url: "/review",
            }),
            providesTags: ["Review"],
        }),
        getOneReview: build.query<IReview, number>({
            query: (id) => ({
                url: `/review/${id}`,
            }),
            providesTags: ["Review"],
        }),
        createReview: build.mutation<IReview, IReview>({
            query: (review) => ({
                url: "/review",
                method: "POST",
                body: review,
            }),
            invalidatesTags: ["Review"],
        }),
        updateReview: build.mutation<IReview, IReview>({
            query: (review) => ({
                url: `/review/${review.id}`,
                method: "PUT",
                body: review,
            }),
            invalidatesTags: ["Review"],
        }),
        deleteReview: build.mutation<string, IReview>({
            query: (post) => ({
                url: `/review/${post.id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Review"],
        }),
    }),
});
