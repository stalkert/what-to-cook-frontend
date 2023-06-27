import Menu from 'antd/es/menu';
import React, { FC } from 'react';
import PageLayout from './common/components/page-layout/page-layout';
import { Route, Routes } from 'react-router-dom';
import { routes } from './core/routes';
import { PrivateRoute } from './features/auth/components/private-route/private-route.component';

interface AppProps {}

export const App: FC<AppProps> = () => {
  return (
    <>
      <Routes>
        {Object.values(routes).map((route) => {
          if (route.private) {
            return (
              <Route
                key={`route-${route.path}`}
                path={route.path}
                element={<PrivateRoute>{route.element}</PrivateRoute>}
              />
            );
          }

          return <Route key={`route-${route.path}`} path={route.path} element={route.element} />;
        })}
      </Routes>
    </>
  );
};
export default App;
