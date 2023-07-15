import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';
import { AuthenticatedUserState, setAuthenticatedUserRoles } from '../slices/authenticated-user.slice';
import { AppDispatch } from '../../../store/store';

export const isLoggedIn = (dispatch: AppDispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwt_decode(token) as AuthenticatedUserState;
      // @ts-ignore
      if (decodedToken.exp < Date.now() / 1000) {
        logout();
      } else {
        dispatch(setAuthenticatedUserRoles(decodedToken));
        return true;
      }
    } catch (e) {
      toast.error('Someone put broken token to local storage');
    }
  } else {
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  redirect('/sign-in');
};
