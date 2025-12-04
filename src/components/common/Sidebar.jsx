import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeOutlined, 
  DashboardOutlined, 
  FileTextOutlined, 
  ThunderboltOutlined,
  DatabaseOutlined,
  SafetyOutlined,
  SettingOutlined,
  ActivityOutlined,
  ServerOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { Layout, Menu, Badge, Card } from 'antd';

const { Sider } = Layout;

const Sidebar = ({ isOpen }) => {
  const navItems = [
    { key: '/', icon: <HomeOutlined />, label: 'Dashboard' },
    { key: '/dashboard', icon: <DashboardOutlined />, label: 'API Dashboard' },
    { key: '/docs', icon: <FileTextOutlined />, label: 'Documentation' },
    { key: '/testing', icon: <ThunderboltOutlined />, label: 'API Testing' },
  ];

  const apiItems = [
    { icon: <DatabaseOutlined />, label: 'Endpoints', count: 24 },
    { icon: <SafetyOutlined />, label: 'Security', count: 3 },
    { icon: <SettingOutlined />, label: 'Settings', count: null },
  ];

  const quickLinks = [
    { href: 'http://176.57.208.162:8000/swagger/?format=openapi', icon: <ServerOutlined />, label: 'Swagger UI' },
    { href: 'https://ezma-client.vercel.app/', icon: <GlobalOutlined />, label: 'Live Demo' },
  ];

  return (
    <Sider 
      collapsible 
      collapsed={!isOpen}
      trigger={null}
      width={256}
      className="h-[calc(100vh-64px)] bg-white border-r shadow-sm fixed left-0 top-16 z-40"
      style={{ overflowY: 'auto' }}
    >
      <div className="p-4 h-full">
        <Menu
          mode="inline"
          defaultSelectedKeys={['/']}
          className="border-none"
          items={navItems.map(item => ({
            key: item.key,
            icon: item.icon,
            label: <NavLink to={item.key}>{item.label}</NavLink>,
          }))}
        />

        <div className="mt-6">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">
            API Resources
          </h4>
          <div className="space-y-1">
            {apiItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-gray-600 mr-3">{item.icon}</span>
                  <span className="font-medium text-gray-700">{item.label}</span>
                </div>
                {item.count && (
                  <Badge count={item.count} style={{ backgroundColor: '#3b82f6' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-800">API Status</h4>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">Live</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-2">All systems operational</p>
          <div className="flex items-center text-xs text-gray-500">
            <ActivityOutlined className="mr-1" />
            <span>Last checked: Just now</span>
          </div>
        </Card>

        <div className="mt-6">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">
            Quick Links
          </h4>
          <div className="space-y-1">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-600 mr-3">{link.icon}</span>
                <span className="font-medium">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
