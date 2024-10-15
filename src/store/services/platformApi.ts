import mainApi from "./mainApi";

export const platformApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlatform: builder.query({
      query: () => ({
        url: `/platforms`,
        method: "GET",
      }),
      providesTags: ["platform"],
    }),
  }),
});

export const { useGetAllPlatformQuery } = platformApi;
export default platformApi;
