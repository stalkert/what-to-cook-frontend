import SignInPage from '../features/auth/components/sign-in-page/sign-in-page';
import PageLayout from '../common/components/page-layout/page-layout';
import SignUpPage from '../features/auth/components/sign-up-page/sign-up-page';
import GoodList from '../features/goods/list/good-list';
import GoodItem from '../features/goods/item/good-item';
import PurchaseList from '../features/purchases/list/purchase-list';

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
  goods: {
    path: '/goods',
    element: (
      <PageLayout>
        <GoodList />
      </PageLayout>
    ),
    private: true,
  },
  good: {
    path: '/goods/:goodId',
    element: (
      <PageLayout>
        <GoodItem />
      </PageLayout>
    ),
    private: true,
  },
  goodCreate: {
    path: '/goods/create',
    element: (
      <PageLayout>
        <GoodItem />
      </PageLayout>
    ),
    private: true,
  },
  purchaseList: {
    path: '/purchases',
    element: (
      <PageLayout>
        <PurchaseList />
      </PageLayout>
    ),
    private: true,
  },
};
