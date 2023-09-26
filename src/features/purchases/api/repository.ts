import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../core/api/base-query';
import { Purchase } from './models/purchase.model';

export const purchaseApi = createApi({
  reducerPath: 'purchaseApi',
  baseQuery: baseQuery,
  tagTypes: ['PurchaseList'],
  endpoints: (build) => ({
    getPurchaseList: build.query<Purchase[], void>({
      keepUnusedDataFor: 1,
      query: () => {
        return {
          url: '/purchase',
          method: 'get',
        };
      },
      providesTags: ['PurchaseList'],
    }),
    addGoodToPurchase: build.mutation<Purchase, { goodId: string }>({
      query(data: { goodId: string }) {
        return {
          url: `/purchase/add`,
          method: 'POST',
          data,
        };
      },
      invalidatesTags: ['PurchaseList'],
    }),
    updateGoodFromPurchase: build.mutation<Purchase, string>({
      query(id: string) {
        return {
          url: `/purchase/${id}`,
          method: 'PATCH',
        };
      },
      invalidatesTags: ['PurchaseList'],
    }),
    deleteGoodFromPurchase: build.mutation<Purchase, string>({
      query(id: string) {
        return {
          url: `/purchase/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['PurchaseList'],
    }),
  }),
});

export const {
  useGetPurchaseListQuery,
  useAddGoodToPurchaseMutation,
  useUpdateGoodFromPurchaseMutation,
  useDeleteGoodFromPurchaseMutation,
} = purchaseApi;
