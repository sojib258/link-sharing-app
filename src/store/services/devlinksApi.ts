import mainApi from "./mainApi";

export const devlinksApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDevlinks: builder.query({
      query: ({ userId, token }) => ({
        url: `/users/${userId}?populate[dev_links][populate]=platform&populate[dev_links]=true`,
        method: "GET",
      }),
      providesTags: ["devlinks"],
    }),
  }),
});

export const { useGetAllDevlinksQuery } = devlinksApi;
export default devlinksApi;
