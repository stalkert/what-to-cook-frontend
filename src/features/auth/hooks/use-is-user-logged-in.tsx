import { isLoggedIn } from '../tools/auth-tools';
import { useAppDispatch } from '../../../store/store';

export const useIsUserLoggedIn = () => {
  const dispatch = useAppDispatch();
  const isUserLoggedIn = isLoggedIn(dispatch);

  return { isUserLoggedIn };
};
