import { CurrencyResponseType } from '../currency-slice';
import { EndpointBuilder } from '@reduxjs/toolkit/query';

export const fetchCurrency = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<CurrencyResponseType, number | void>({
    query: () => `/listquotes`
  });
