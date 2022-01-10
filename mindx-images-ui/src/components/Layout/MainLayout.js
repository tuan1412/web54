import React from 'react';
import { Layout } from 'antd';
import Navbar from '../Navbar';

const { Content } = Layout;

export default function MainLayout({ children }) {
  return (
    <Layout>
      <Navbar />
      <Content
        className="site-layout"
        style={{ padding: '0 50px', marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, height: '100vh' }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
}
