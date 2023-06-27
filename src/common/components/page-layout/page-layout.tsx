import React, { PropsWithChildren } from 'react';
import { Layout } from 'antd';
import './page-layout.scss';
import FooterBar from '../footer/footer';
import Header from '../header/header';
import Sidebar from '../sidebar/sidebar';

interface PageLayoutProps {}

const PageLayout: React.FC<PropsWithChildren<PageLayoutProps>> = ({ children }) => {
  return (
    <div className="page-layout">
      <Layout>
        <Header />
        <Layout>
          <Sidebar />
          <Layout.Content>{children}</Layout.Content>
        </Layout>
        <FooterBar />
      </Layout>
    </div>
  );
};

export default PageLayout;
