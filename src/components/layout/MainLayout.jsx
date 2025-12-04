import React, { useState } from 'react';
import { Layout } from 'antd';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';

const { Content } = Layout;

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Layout className="pt-16">
        <Sidebar isOpen={sidebarOpen} />
        <Layout
          style={{
            marginLeft: sidebarOpen ? 256 : 0,
            transition: 'all 0.2s',
          }}
        >
          <Content className="p-6">
            {children}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
