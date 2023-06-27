import SignInPage from '../features/auth/components/sign-in-page/sign-in-page';
import PageLayout from '../common/components/page-layout/page-layout';
import SignUpPage from '../features/auth/components/sign-up-page/sign-up-page';

interface RouteItem {
  path: string;
  element: any;
  private?: boolean;
}

export const routes: Record<string, RouteItem> = {
  dashboard: {
    path: '/',
    element: <PageLayout />,
    private: true,
  },
  signIn: {
    path: '/sign-in',
    element: <SignInPage />,
    private: false,
  },
  signUp: {
    path: '/sign-up',
    element: <SignUpPage />,
    private: false,
  },
};
