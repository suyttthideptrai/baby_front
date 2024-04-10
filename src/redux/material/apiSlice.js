import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_CRUD_URL;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: builder => ({
    fetchAllMaterials: builder.query({
      query: () => '/material/all'
    })
  })
});

export const setupApi = () => {
  return api;
}

export const { 
  select: selectFetchAllMaterials,
  useFetchAllMaterialsQuery 
} = api.endpoints.fetchAllMaterials;
