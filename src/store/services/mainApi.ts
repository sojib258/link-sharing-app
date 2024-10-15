import { URL } from "@/lib/config/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tags = ["devlinks", "platform"];

export const mainApi = createApi({
  reducerPath: "mainApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${URL}`,

    prepareHeaders: (headers, { getState }) => {
      const token: string = (getState() as any).auth?.token;
      if (token) {
        headers.set("authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: tags,
  endpoints: (builder) => ({
    getAnalytics: builder.query({
      query: () => ({
        url: "/analytics",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAnalyticsQuery } = mainApi;

export default mainApi;
