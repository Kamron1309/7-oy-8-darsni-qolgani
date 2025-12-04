import React, { useState, useEffect } from 'react';
import { 
  BookOutlined, 
  CodeOutlined, 
  WarningOutlined,
  CheckCircleOutlined,
  LockOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
  CopyOutlined,
  ApiOutlined
} from '@ant-design/icons';
import { Row, Col, Card, Menu, Button, Space, Alert, Tag, Typography } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const { Title, Paragraph, Text } = Typography;

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [swaggerData, setSwaggerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSwaggerData({
        info: { title: "EZMA API", version: "1.0.0", description: "Modern API for EZMA platform" },
        servers: [{ url: "http://176.57.208.162:8000", description: "Production server" }],
        paths: {}
      });
      setLoading(false);
    }, 1000);
  }, []);

  const sections = [
    { key: 'getting-started', icon: <BookOutlined />, label: 'Getting Started' },
    { key: 'authentication', icon: <LockOutlined />, label: 'Authentication' },
    { key: 'endpoints', icon: <CodeOutlined />, label: 'Endpoints' },
    { key: 'rate-limiting', icon: <ClockCircleOutlined />, label: 'Rate Limiting' },
    { key: 'errors', icon: <WarningOutlined />, label: 'Error Handling' },
    { key: 'best-practices', icon: <CheckCircleOutlined />, label: 'Best Practices' },
  ];

  const codeExamples = {
    auth: `// Authentication header
const headers = {
  'Authorization': 'Bearer your_access_token_here',
  'Content-Type': 'application/json'
};

fetch('http://176.57.208.162:8000/api/users', {
  method: 'GET',
  headers: headers
})
.then(response => response.json())
.then(data => console.log(data));`,

    createUser: `// POST /api/users
const userData = {
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure_password",
  "role": "user"
};

fetch('http://176.57.208.162:8000/api/users', {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(userData)
});`,

    errorHandling: `// Error response example
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "email": "Must be a valid email address"
    },
    "timestamp": "2024-01-15T10:30:00Z"
  }
}`
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
  };

  const renderSectionContent = () => {
    switch(activeSection) {
      case 'getting-started':
        return (
          <div className="space-y-6">
            <Alert
              type="info"
              message="Quick Start"
              description={
                <div className="space-y-4">
                  <Paragraph>
                    Welcome to EZMA API documentation. This guide will help you get started with our API in minutes.
                  </Paragraph>
                  <Space direction="vertical" size="middle">
                    {[1,2,3].map(num => (
                      <div key={num} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">{num}</div>
                        <div>
                          <Text strong>
                            {num === 1 ? "Get Your API Key" : num === 2 ? "Set Up Authentication" : "Make Your First Request"}
                          </Text>
                          <Paragraph className="text-gray-600 text-sm">
                            {num === 1 ? "Register and obtain your API key from the dashboard" : num === 2 ? "Include the API key in your request headers" : "Start calling API endpoints"}
                          </Paragraph>
                        </div>
                      </div>
                    ))}
                  </Space>
                </div>
              }
            />

            <div>
              <Title level={4}>Base URL</Title>
              <Card className="bg-gray-900">
                <Row justify="space-between" align="middle">
                  <Col>
                    <Text className="text-green-400 font-mono">http://176.57.208.162:8000</Text>
                    <Paragraph className="text-gray-400 text-sm">All API requests should be made to this base URL</Paragraph>
                  </Col>
                  <Col>
                    <Button icon={<CopyOutlined />} onClick={() => copyToClipboard('http://176.57.208.162:8000')} type="text" className="text-gray-400 hover:text-white" />
                  </Col>
                </Row>
              </Card>
            </div>
          </div>
        );

      case 'authentication':
        return (
          <div className="space-y-6">
            <Alert type="error" message="Important" description="All API endpoints require authentication. Keep your API keys secure and never expose them in client-side code." icon={<WarningOutlined />} />

            <div>
              <Title level={4}>Bearer Token Authentication</Title>
              <Paragraph className="text-gray-700 mb-4">
                Include the Authorization header with your Bearer token in all requests:
              </Paragraph>

              <Card className="bg-gray-900 border-0">
                <Row justify="space-between" align="middle" className="bg-gray-800 p-2 rounded-t">
                  <Col>
                    <Text className="text-gray-300 text-sm">Example Request Header</Text>
                  </Col>
                  <Col>
                    <Button icon={<CopyOutlined />} onClick={() => copyToClipboard(codeExamples.auth)} className="text-gray-400 hover:text-white text-sm" type="text" />
                  </Col>
                </Row>
                <SyntaxHighlighter language="javascript" style={atomOneDark} customStyle={{ margin:0, padding:'1rem' }}>
                  {codeExamples.auth}
                </SyntaxHighlighter>
              </Card>
            </div>

            <div>
              <Title level={4}>Getting Your API Key</Title>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 pl-4">
                <li>Navigate to Settings → API Keys in your dashboard</li>
                <li>Click "Generate New API Key"</li>
                <li>Copy the generated key (it will only be shown once)</li>
                <li>Store it securely in your application's environment variables</li>
              </ol>
            </div>
          </div>
        );

      case 'endpoints':
        return (
          <div className="space-y-6">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Card title={<Space><BookOutlined className="text-blue-600" />User Management</Space>}>
                  <Space direction="vertical" className="w-full">
                    {[
                      { method: 'GET', path: '/api/users', desc: 'List users' },
                      { method: 'POST', path: '/api/users', desc: 'Create user' },
                      { method: 'PUT', path: '/api/users/{id}', desc: 'Update user' },
                    ].map((endpoint, index) => (
                      <Card key={index} size="small" className="bg-gray-50">
                        <Row justify="space-between" align="middle">
                          <Col>
                            <Space>
                              <Tag color={endpoint.method === 'GET' ? 'success' : endpoint.method === 'POST' ? 'blue' : 'warning'}>{endpoint.method}</Tag>
                              <code>{endpoint.path}</code>
                            </Space>
                          </Col>
                          <Col>
                            <Text type="secondary">{endpoint.desc}</Text>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                  </Space>
                </Card>
              </Col>

              <Col xs={24} md={12}>
                <Card title={<Space><LockOutlined className="text-green-600" />Authentication</Space>}>
                  <Space direction="vertical" className="w-full">
                    {[
                      { method: 'POST', path: '/api/auth/login', desc: 'User login' },
                      { method: 'POST', path: '/api/auth/register', desc: 'User registration' },
                      { method: 'POST', path: '/api/auth/refresh', desc: 'Refresh token' },
                    ].map((endpoint, index) => (
                      <Card key={index} size="small" className="bg-gray-50">
                        <Row justify="space-between" align="middle">
                          <Col>
                            <Space>
                              <Tag color="blue">{endpoint.method}</Tag>
                              <code>{endpoint.path}</code>
                            </Space>
                          </Col>
                          <Col>
                            <Text type="secondary">{endpoint.desc}</Text>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                  </Space>
                </Card>
              </Col>
            </Row>

            <div>
              <Title level={4}>Example Request</Title>
              <Card className="bg-gray-900 border-0">
                <Row justify="space-between" align="middle" className="bg-gray-800 p-2 rounded-t">
                  <Col>
                    <Text className="text-gray-300 text-sm">Create User Example</Text>
                  </Col>
                  <Col>
                    <Button icon={<CopyOutlined />} onClick={() => copyToClipboard(codeExamples.createUser)} className="text-gray-400 hover:text-white text-sm" type="text" />
                  </Col>
                </Row>
                <SyntaxHighlighter language="javascript" style={atomOneDark} customStyle={{ margin:0, padding:'1rem' }}>
                  {codeExamples.createUser}
                </SyntaxHighlighter>
              </Card>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <BookOutlined className="text-5xl text-gray-300 mb-4" />
            <Title level={3} className="text-gray-700 mb-2">Documentation</Title>
            <Paragraph className="text-gray-500">Select a section from the sidebar to view documentation</Paragraph>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
        <Space align="center" className="mb-4">
          <ApiOutlined className="text-3xl" />
          <div>
            <Title level={2} className="text-white m-0">API Documentation</Title>
            <Paragraph className="text-blue-100 m-0">Complete reference for EZMA API endpoints and usage</Paragraph>
          </div>
        </Space>

        {swaggerData && (
          <Row gutter={[16, 16]} className="mt-6">
            <Col xs={24} md={8}>
              <Card className="bg-white/20 backdrop-blur-sm border-0">
                <div className="text-sm text-blue-100 mb-1">API Version</div>
                <div className="text-lg font-semibold">{swaggerData.info.version}</div>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="bg-white/20 backdrop-blur-sm border-0">
                <div className="text-sm text-blue-100 mb-1">Base URL</div>
                <div className="font-mono text-sm truncate">{swaggerData.servers[0].url}</div>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="bg-white/20 backdrop-blur-sm border-0">
                <div className="text-sm text-blue-100 mb-1">Format</div>
                <div className="text-lg font-semibold">JSON</div>
              </Card>
            </Col>
          </Row>
        )}
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={6}>
          <Card>
            <Title level={4} className="mb-4">Contents</Title>
            <Menu
              mode="inline"
              selectedKeys={[activeSection]}
              onSelect={({ key }) => setActiveSection(key)}
              items={sections.map(section => ({ key: section.key, icon: section.icon, label: section.label }))}
              className="border-none"
            />
            <Button block icon={<DownloadOutlined />} href="http://176.57.208.162:8000/swagger/?format=openapi" target="_blank" className="mt-6">
              OpenAPI Spec
            </Button>
          </Card>
        </Col>

        <Col xs={24} lg={18}>
          <Card loading={loading}>
            {renderSectionContent()}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Documentation;
