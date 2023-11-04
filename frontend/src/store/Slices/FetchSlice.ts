import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ugolokApi = createApi({
    reducerPath: "ugolokApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai:8000",
    }),
    tagTypes: ["User", "Point"],
    endpoints: (builder) => ({
        getUserByToken: builder.query({
            query: (token) => `/proprietors/by/token?token=${token}`,
            providesTags: ["User"],
        }),

        getPointsById: builder.query({
            query: (id: string[]) => `/points?pointID=${id}`,
            providesTags: ["Point"],
            // invalidatesTags: ['User']
        }),

        postPoint: builder.mutation({
            query: ({ token, body }) => ({
                url: `/points?token=${token}`,
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["User"],
        }),

        deletePoints: builder.mutation({
            query: ({ token, id }) => ({
                url: `/points?token=${token}&pointID=${id}`,
                method: "DELETE",
            }),

            invalidatesTags: ["User"],
        }),

        patchPoints: builder.mutation({
            query: ({ token, id, body }) => ({
                url: `/points?token=${token}&pointID=${id}`,
                method: "PATCH",
                body: body,
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const {
    useGetUserByTokenQuery,
    useGetPointsByIdQuery,
    useLazyGetPointsByIdQuery,
    usePostPointMutation,
    useDeletePointsMutation,
    usePatchPointsMutation
} = ugolokApi;
