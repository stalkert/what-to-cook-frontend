import React, { useState } from 'react';
import { Layout, Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './header.scss';
import MainMenu from '../main-menu/main-menu';

const { Header } = Layout;

const PageHeader = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <Header className="header">
      <div className="header-logo" />
      <div className="header-mobile-toggle">
        <Button type="text" icon={<MenuOutlined />} onClick={toggleDrawer} />
      </div>
      <Drawer open={showDrawer} onClose={toggleDrawer} placement="left" className="header-mobile">
        <MainMenu toggleDrawer={toggleDrawer} />
      </Drawer>
    </Header>
  );
};

export default PageHeader;
