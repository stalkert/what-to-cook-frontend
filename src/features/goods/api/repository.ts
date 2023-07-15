import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../core/api/base-query';
import { ListQueryParams, List } from '../../../common/models/list.model';
import { Good } from './models/good.model';

export const goodApi = createApi({
  reducerPath: 'goodApi',
  baseQuery: baseQuery,
  tagTypes: ['Goods', 'Good'],
  endpoints: (build) => ({
    getGoods: build.query<List<Good>, ListQueryParams>({
      keepUnusedDataFor: 1,
      query: ({ page, size, field, direction, search }) => {
        return {
          url: '/goods',
          method: 'get',
          params: {
            page: page - 1,
            size,
            field,
            direction: !!field ? direction : undefined,
            search: !!search ? search : undefined,
          },
        };
      },
      providesTags: ['Goods'],
    }),
    getGood: build.query<Good, string>({
      keepUnusedDataFor: 1,
      query: (id: string) => {
        return {
          url: `/goods/${id}`,
          method: 'get',
        };
      },
      providesTags: ['Good'],
    }),
    deleteGood: build.mutation<string, string>({
      query(id: string) {
        return {
          url: `/goods/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Goods'],
    }),
    createGood: build.mutation<string, Good>({
      query(data: Partial<Good>) {
        return {
          url: `/goods`,
          method: 'POST',
          data,
        };
      },
      invalidatesTags: ['Good'],
    }),
    editGood: build.mutation<string, Good>({
      query({ id, ...data }) {
        return {
          url: `/goods/${id}`,
          method: 'PUT',
          data,
        };
      },
      invalidatesTags: ['Good'],
    }),
  }),
});

export const { useGetGoodsQuery, useGetGoodQuery, useDeleteGoodMutation, useCreateGoodMutation, useEditGoodMutation } =
  goodApi;
