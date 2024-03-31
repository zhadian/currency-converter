import { EndpointBuilder } from '@reduxjs/toolkit/query';

export const convertCurrency = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<number, { from: string; to: string }>({
    query: ({ from, to }) => `/exchange?from=${from}&to=${to}`
  });
