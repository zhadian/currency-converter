import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_HOST, API_KEY, BASE_URL } from '../../constants';
import { fetchCurrency } from './fetch-currency';
import { convertCurrency } from './convert-currency';

export type CurrencyResponseType = string[];

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      headers.set('X-RapidAPI-Key', API_KEY);
      headers.set('X-RapidAPI-Host', API_HOST);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    fetchCurrency: fetchCurrency(builder),
    convertCurrency: convertCurrency(builder)
  })
});

export const { useFetchCurrencyQuery, useConvertCurrencyQuery } = apiSlice;
