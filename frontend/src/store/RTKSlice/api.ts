import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
interface IPostCode {
  code: string
  body: {
    name: string
    surname: string
    phone_number: string
  }
}

export const ugolokApi = createApi({
  reducerPath: "ugolokApi",
  tagTypes: ["getUser", "addPoint", "getPoints"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (token: string) => `proprietors/by/token?token=${token}`,
      providesTags: ["getUser"],
    }),
    getPhone: builder.mutation({
      query: (phone) => ({
        url: `proprietors/verify/phone?phone_number=%2B${phone}`,
        method: "GET",
      }),
    }),
    postCode: builder.mutation({
      query: ({ code, body }: IPostCode) => ({
        url: `proprietors?code=${code}`,
        method: "POST",
        body: body,
      }),
    }),
    getPoints: builder.query({
      query: (pointId) => `points?pointID=${pointId}`,
      providesTags: ["getPoints"],
    }),
    addPoint: builder.mutation({
      query: ({ token, body }) => ({
        url: `points?token=${token}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["getUser"],
    }),
    patchPoint: builder.mutation({
      query: ({ token, pointId, body }) => ({
        url: `/points?token=${token}&pointID=${pointId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["getPoints"],
    }),
    deletePoint: builder.mutation({
      query: ({ token, pointId }: { token: string; pointId: string }) => ({
        url: `points?token=${token}&pointID=${pointId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getUser", "getPoints"],
    }),
    postPayments: builder.mutation({
      query: ({ userId, value }) => ({
        url: `payments/${userId}?value=${value}`,
        method: "POST",
      }),
    }),
    postComment: builder.mutation({
      query: (body) => ({
        url: "/comments",
        method: "POST",
        body,
      }),
    }),
    getComments: builder.query({
      query: ({ token, pointId }) =>
        `/comments/by/pointID?token=${token}&pointID=${pointId}`,
    }),
    getQR: builder.query({
      query: (pointId) => `/points/${pointId}/qr`,
    }),
    getDocs: builder.query({
      query: (docsId: string) => `/files/${docsId}`,
    }),
  }),
})

export const {
  useGetDocsQuery,
  useDeletePointMutation,
  useGetQRQuery,
  useGetCommentsQuery,
  usePostCommentMutation,
  usePostPaymentsMutation,
  useGetUserQuery,
  useGetPhoneMutation,
  usePostCodeMutation,
  useLazyGetPointsQuery,
  useGetPointsQuery,
  useAddPointMutation,
  usePatchPointMutation,
} = ugolokApi
