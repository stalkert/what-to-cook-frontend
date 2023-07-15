import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { Role } from '../../../common/enums/role.enum';

export interface AuthenticatedUserState {
  username: string | null;
  email: string | null;
  userId: string | null;
  roles: Role[];
}

const initialState: AuthenticatedUserState = {
  username: null,
  email: null,
  userId: null,
  roles: [],
};

export const authenticatedUserSlice = createSlice({
  name: 'authenticatedUser',
  initialState,
  reducers: {
    setAuthenticatedUserRoles: (state, action: PayloadAction<AuthenticatedUserState>) => {
      state.roles = [...action.payload.roles];
    },
  },
});

export const selectAuthenticatedUserUsername = (state: RootState) => state.authenticatedUser.username;
export const selectAuthenticatedUserEmail = (state: RootState) => state.authenticatedUser.email;
export const selectAuthenticatedUserRoles = (state: RootState) => state.authenticatedUser.roles;

export const { setAuthenticatedUserRoles } = authenticatedUserSlice.actions;
