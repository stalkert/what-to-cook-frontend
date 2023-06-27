import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../core/api/base-query';
import { List, ListQueryParams, User, UserBrief } from './models/user.model';

export const transformResponse = (response: any) => {
  return {
    content: response.content || [],
  };
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQuery,
  tagTypes: ['User'],
  endpoints: (build) => ({
    getUsers: build.query<List<UserBrief>, ListQueryParams>({
      keepUnusedDataFor: 1,
      query: ({ page, size, field, direction }) => {
        return {
          url: '/admin/profiles',
          method: 'get',
          params: {
            page: page - 1,
            size,
            field,
            direction: !!field ? direction : undefined,
          },
        };
      },
      providesTags: ['User'],
    }),
    getUser: build.query<User, number>({
      query: (id: number) => {
        return {
          url: `/admin/profiles/${id}?view=full`,
          method: 'get',
        };
      },
    }),
    deleteUser: build.mutation<string, number>({
      query(id: number) {
        return {
          url: `/admin/profiles/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useDeleteUserMutation } = userApi;
