import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'pokeApi', // <-- slice name inside Redux
  baseQuery: fetchBaseQuery({
    // <-- tiny wrapper around fetch()
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  endpoints: builder => ({
    // page = 0,1,2…   20 items per page
    getPokemon: builder.query({
      query: (
        page = 0, // <-- build the URL for that page
      ) => `pokemon?limit=20&offset=${page * 20}`,
    }),
  }),
});

// RTK Query auto-creates React hooks from every endpoint:
export const {useGetPokemonQuery} = api;
