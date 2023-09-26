import React, { useState } from 'react';
import { FileTextOutlined, UnorderedListOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Role } from '../../enums/role.enum';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  roles?: Role[],
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    roles,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Goods', 'goods', <FileTextOutlined />, [Role.Admin, Role.SuperAdmin]),
  getItem('Purchases', 'purchases', <UnorderedListOutlined />, [Role.Admin, Role.SuperAdmin, Role.User]),
];

export interface MainMenuProps {
  toggleDrawer?: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    if (toggleDrawer) {
      toggleDrawer();
    }
    setCurrent(e.key);
    navigate(`/${e.key}`);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="inline" items={items} />;
};

export default MainMenu;
