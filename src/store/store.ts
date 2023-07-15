import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { authApi } from '../features/auth/api/repository';
import { goodApi } from '../features/goods/api/repository';
import { authenticatedUserSlice } from '../features/auth/slices/authenticated-user.slice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [goodApi.reducerPath]: goodApi.reducer,
    [authenticatedUserSlice.name]: authenticatedUserSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, goodApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type GetRootState = typeof store.getState;
