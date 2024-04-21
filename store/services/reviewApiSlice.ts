import { ILike, IReview } from "@/app/_types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApiSlice = createApi({
    reducerPath: "reviewApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["Review", "Like"],
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
        getOneLikeByReviewIdAndUserId: build.query<ILike, { userId: number; reviewId: number }>({
            query: (params) => ({
                url: `/like?reviewId=${params.reviewId}&userId=${params.userId}`,
                method: "GET",
            }),
            providesTags: ["Like"],
        }),
        createLike: build.mutation<ILike, { reviewId: ILike["reviewId"]; userId: ILike["userId"] }>(
            {
                query: (like) => ({
                    url: "/like",
                    method: "POST",
                    body: like,
                }),
                invalidatesTags: ["Like"],
            },
        ),
        removeLike: build.mutation<string, ILike>({
            query: (like) => ({
                url: `/like/${like.id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Like"],
        }),
    }),
});
