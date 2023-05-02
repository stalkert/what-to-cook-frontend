import Menu from 'antd/es/menu';
import React from 'react';
import PageLayout from './common/components/page-layout/page-layout';

export const menuItems = (
  <>
    <Menu.Item key="1">Option 1</Menu.Item>
    <Menu.Item key="2">Option 2</Menu.Item>
    <Menu.Item key="3">Option 3</Menu.Item>
  </>
);

const App: React.FC = () => {
  return (
    <PageLayout>
      <div>Main Content</div>
    </PageLayout>
  );
};

export default App;
