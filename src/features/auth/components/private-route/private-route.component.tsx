import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useIsUserLoggedIn } from '../../hooks/use-is-user-logged-in';

interface PrivateRouteProps {}

export const PrivateRoute: FC<PropsWithChildren<PrivateRouteProps>> = ({ children }) => {
  const { isUserLoggedIn } = useIsUserLoggedIn();

  if (!isUserLoggedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
};
