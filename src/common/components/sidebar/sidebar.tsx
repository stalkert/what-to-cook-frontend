import React from 'react';
import { Layout } from 'antd';
import './sidebar.scss';
import MainMenu from '../main-menu/main-menu';

const { Sider } = Layout;

const SideMenu = () => {
  return (
    <Sider className="sidebar sidebar-desktop">
      <MainMenu />
    </Sider>
  );
};

export default SideMenu;
