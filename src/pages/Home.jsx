import React, { useState, useEffect } from 'react';
import { 
  ActivityOutlined, 
  ServerOutlined, 
  UserOutlined, 
  ClockCircleOutlined,
  RiseOutlined,
  SafetyOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { Row, Col, Card, Statistic, Tag, Button, Space, Alert } from 'antd';
import ApiTester from '../components/api/ApiTester';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Home = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    setTimeout(() => {
      setStats([
        { label: 'Total Endpoints', value: '24', change: '+2 this week', trend: 'up' },
        { label: 'Active Users', value: '1,234', change: '+12% this month', trend: 'up' },
        { label: 'Avg Response Time', value: '127ms', change: '-8ms from last week', trend: 'down' },
        { label: 'API Uptime', value: '99.9%', change: '99.9% this month', trend: 'stable' },
      ]);
      setApiStatus('operational');
      setLoading(false);
    }, 1000);
  }, []);

  const recentActivities = [
    { action: 'GET /api/users', status: 'success', time: '2 min ago', user: 'admin' },
    { action: 'POST /api/auth/login', status: 'success', time: '5 min ago', user: 'john_doe' },
    { action: 'PUT /api/products/123', status: 'error', time: '10 min ago', user: 'dev_team' },
    { action: 'DELETE /api/orders/456', status: 'success', time: '15 min ago', user: 'admin' },
    { action: 'GET /api/analytics', status: 'success', time: '25 min ago', user: 'analyst' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white border-0">
        <div className="relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="relative z-10">
            <Space align="center" className="mb-4">
              <div className={`w-3 h-3 rounded-full ${apiStatus === 'operational' ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`}></div>
              <span className="text-blue-100">
                {apiStatus === 'operational' ? 'All systems operational' : 'Performance degraded'}
              </span>
            </Space>
            <h1 className="text-3xl font-bold mb-2">Welcome to EZMA API Dashboard</h1>
            <p className="text-blue-100 mb-6 max-w-2xl">
              Monitor, test and manage your API endpoints in real-time. Streamline your development workflow with powerful tools and analytics.
            </p>
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={12}>
                <Alert
                  className="bg-white/20 backdrop-blur-sm"
                  icon={<GlobalOutlined />}
                  description={
                    <div>
                      <div className="text-sm text-blue-100">Base URL</div>
                      <div className="font-mono text-sm text-white">http://176.57.208.162:8000</div>
                    </div>
                  }
                />
              </Col>
              <Col xs={24} md={12}>
                <Space>
                  <Button type="primary" size="large" className="bg-white text-blue-600 hover:bg-blue-50">
                    Quick Start Guide
                  </Button>
                  <Button size="large" className="bg-transparent border-2 border-white text-white hover:bg-white/10">
                    View Documentation
                  </Button>
                </Space>
              </Col>
            </Row>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => {
          const icons = [ServerOutlined, UserOutlined, ClockCircleOutlined, ActivityOutlined];
          const Icon = icons[index] || ServerOutlined;
          const trendColor = stat.trend === 'up' ? '#52c41a' : stat.trend === 'down' ? '#f5222d' : '#fa8c16';

          return (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card className="hover:shadow-md transition-all">
                <Row align="middle" justify="space-between" className="mb-4">
                  <Col>
                    <div className="p-3 rounded-xl bg-blue-50">
                      <Icon className="text-blue-600 text-xl" />
                    </div>
                  </Col>
                  <Col>
                    <Tag color={trendColor === '#52c41a' ? 'success' : trendColor === '#f5222d' ? 'error' : 'warning'}>
                      {stat.change}
                    </Tag>
                  </Col>
                </Row>
                <Statistic
                  title={stat.label}
                  value={stat.value}
                  valueStyle={{ fontSize: '24px', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* API Tester Widget */}
      <Card>
        <Row justify="space-between" align="middle" className="mb-6">
          <Col>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Quick API Tester</h2>
            <p className="text-gray-600">Test any endpoint with our built-in API client</p>
          </Col>
          <Col>
            <Space>
              <RiseOutlined className="text-green-500" />
              <span className="text-sm text-gray-600">Last test: 2 min ago</span>
            </Space>
          </Col>
        </Row>
        <ApiTester />
      </Card>

      {/* Recent Activity & Documentation */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card 
            title={
              <Space>
                <span>Recent Activity</span>
                <Button type="link" size="small">View All →</Button>
              </Space>
            }
          >
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <Space align="start" size="middle">
                    <div className={`p-2 rounded-lg ${activity.status === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>
                      <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <code className="text-sm font-semibold">{activity.action}</code>
                        <span className="text-xs text-gray-500">by {activity.user}</span>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  </Space>
                  <Tag color={activity.status === 'success' ? 'success' : 'error'}>
                    {activity.status.toUpperCase()}
                  </Tag>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card 
            title={
              <Space>
                <span>Quick Documentation</span>
                <SafetyOutlined className="text-green-500" />
              </Space>
            }
          >
            <div className="space-y-4">
              <Alert
                type="info"
                message="Authentication"
                description={
                  <div>
                    <p className="text-sm mb-2">All API requests require authentication via Bearer token.</p>
                    <code className="text-xs bg-blue-50 text-blue-800 p-2 rounded block">
                      Authorization: Bearer your_token_here
                    </code>
                  </div>
                }
              />
              
              <Alert
                type="warning"
                message="Rate Limiting"
                description="100 requests per minute per IP address. Use headers to check limits."
              />
              
              <Alert
                type="success"
                message="Base URL"
                description={
                  <div>
                    <p className="text-sm mb-2">All endpoints are relative to:</p>
                    <code className="text-xs bg-green-50 text-green-800 p-2 rounded block">
                      http://176.57.208.162:8000
                    </code>
                  </div>
                }
              />
            </div>
            <Button block className="mt-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700">
              View Full Documentation
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
