import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const coverAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bookcover.longitood.com/',
  }),
  endpoints: (build) => ({
    getBookCoverByISBN: build.query<string | null, string>({
      query: (isbn: string) => `bookcover/${isbn}`,
      transformResponse: (res) => (res as { url?: string }).url ?? null,
      keepUnusedDataFor: 0,
    }),
  }),
});

export default coverAPI;
export const { useGetBookCoverByISBNQuery } = coverAPI;
