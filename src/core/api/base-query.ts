import { axiosBaseQuery } from '../axios-base-query';

export const baseQuery = axiosBaseQuery({
  // @ts-ignore
  baseUrl: process.env.REACT_APP_API_BASE_URL,
});
