import React, { useState, useEffect } from 'react';
import { 
  PlayCircleOutlined, 
  HistoryOutlined, 
  FolderOutlined,
  ShareAltOutlined,
  CodeOutlined,
  EyeOutlined,
  DownloadOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { 
  Card, 
  Row, 
  Col, 
  Button, 
  Space, 
  Select, 
  Tag, 
  Alert,
  List,
  Typography,
  Tabs,
  Dropdown,
  Menu
} from 'antd';
import ApiTester from '../components/api/ApiTester';
import LoadingSpinner from '../components/common/LoadingSpinner';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const ApiTesting = () => {
  const [savedRequests, setSavedRequests] = useState([]);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('tester');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [environments, setEnvironments] = useState([
    { id: 1, name: 'Production', url: 'http://176.57.208.162:8000', active: true },
    { id: 2, name: 'Staging', url: 'http://staging.example.com', active: false },
    { id: 3, name: 'Development', url: 'http://localhost:8000', active: false },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('savedRequests');
    if (saved) {
      try {
        setSavedRequests(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading saved requests:', e);
      }
    }

    setHistory([
      { id: 1, method: 'GET', url: '/api/users', status: 200, timestamp: '2024-01-15T10:30:00Z', duration: '120ms' },
      { id: 2, method: 'POST', url: '/api/auth/login', status: 201, timestamp: '2024-01-15T10:25:00Z', duration: '85ms' },
      { id: 3, method: 'PUT', url: '/api/products/123', status: 404, timestamp: '2024-01-15T10:20:00Z', duration: '200ms' },
    ]);
  }, []);

  const handleSaveRequest = (requestData) => {
    const newRequest = {
      id: Date.now(),
      ...requestData,
      createdAt: new Date().toISOString()
    };
    const updatedRequests = [...savedRequests, newRequest];
    setSavedRequests(updatedRequests);
    localStorage.setItem('savedRequests', JSON.stringify(updatedRequests));
  };

  const handleLoadRequest = (request) => {
    setSelectedRequest(request);
    setActiveTab('tester');
  };

  const handleDeleteRequest = (id) => {
    const updatedRequests = savedRequests.filter(req => req.id !== id);
    setSavedRequests(updatedRequests);
    localStorage.setItem('savedRequests', JSON.stringify(updatedRequests));
  };

  const handleEnvironmentChange = (envId) => {
    setEnvironments(envs => envs.map(env => ({ ...env, active: env.id === envId })));
  };

  const activeEnvironment = environments.find(env => env.active);

  const quickActionsMenu = (
    <Menu
      items={[
        { key: '1', label: 'Share Collection', icon: <ShareAltOutlined /> },
        { key: '2', label: 'Export Collection', icon: <DownloadOutlined /> },
        { key: '3', label: 'Preview Documentation', icon: <EyeOutlined /> },
      ]}
    />
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={2} className="mb-1">API Testing</Title>
          <Text type="secondary">Test and debug your API endpoints in real-time</Text>
        </Col>
        <Col>
          <Space>
            <Space>
              <Text type="secondary">Environment:</Text>
              <Select value={activeEnvironment?.id} onChange={handleEnvironmentChange} style={{ width: 150 }}>
                {environments.map(env => <Option key={env.id} value={env.id}>{env.name}</Option>)}
              </Select>
            </Space>
            <Button type="primary" icon={<SettingOutlined />}>Settings</Button>
          </Space>
        </Col>
      </Row>

      {/* Environment Banner */}
      <Alert
        message={
          <Row justify="space-between" align="middle">
            <Col>
              <Space>
                <div className={`w-3 h-3 rounded-full ${activeEnvironment?.name === 'Production' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                <div>
                  <Text strong>{activeEnvironment?.name} Environment</Text>
                  <div className="text-sm">{activeEnvironment?.url}</div>
                </div>
              </Space>
            </Col>
            <Col>
              <Text type="secondary">All requests will be sent to this environment</Text>
            </Col>
          </Row>
        }
        type={activeEnvironment?.name === 'Production' ? 'warning' : 'info'}
        className="rounded-xl"
      />

      <Row gutter={[24, 24]}>
        {/* Sidebar */}
        <Col xs={24} lg={8}>
          <Card>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane key="tester" tab={<Space><CodeOutlined />Tester</Space>} />
              <TabPane key="saved" tab={<Space><FolderOutlined />Saved ({savedRequests.length})</Space>} />
              <TabPane key="history" tab={<Space><HistoryOutlined />History</Space>} />
            </Tabs>

            {activeTab === 'saved' && (
              <List
                dataSource={savedRequests}
                locale={{ emptyText: 'No saved requests yet' }}
                renderItem={(request) => (
                  <List.Item
                    actions={[<Button type="link" danger onClick={() => handleDeleteRequest(request.id)} key="delete">Delete</Button>]}
                  >
                    <List.Item.Meta
                      title={
                        <Space>
                          <Tag color={request.method === 'GET' ? 'success' : request.method === 'POST' ? 'blue' : 'warning'}>
                            {request.method}
                          </Tag>
                          <Text code className="text-sm">{request.url}</Text>
                        </Space>
                      }
                      description={new Date(request.createdAt).toLocaleDateString()}
                    />
                  </List.Item>
                )}
              />
            )}

            {activeTab === 'history' && (
              <List
                dataSource={history}
                renderItem={(item) => (
                  <List.Item extra={<Tag>{item.duration}</Tag>}>
                    <List.Item.Meta
                      title={
                        <Space>
                          <Tag color={item.method === 'GET' ? 'success' : item.method === 'POST' ? 'blue' : 'warning'}>
                            {item.method}
                          </Tag>
                          <Tag color={item.status === 200 ? 'success' : 'error'}>{item.status}</Tag>
                          <Text code className="text-sm">{item.url}</Text>
                        </Space>
                      }
                      description={new Date(item.timestamp).toLocaleString()}
                    />
                  </List.Item>
                )}
              />
            )}
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6">
            <Title level={4} className="mb-4">Quick Actions</Title>
            <Dropdown overlay={quickActionsMenu} placement="bottomLeft">
              <Button block>More Actions</Button>
            </Dropdown>
          </Card>
        </Col>

        {/* Main Content */}
        <Col xs={24} lg={16}>
          <Card
            title="API Tester"
            extra={
              <Space>
                <Button icon={<HistoryOutlined />}>Load from History</Button>
                <Button type="primary" icon={<PlayCircleOutlined />}>Run All Tests</Button>
              </Space>
            }
          >
            <ApiTester initialUrl={selectedRequest ? `${activeEnvironment?.url}${selectedRequest.url}` : `${activeEnvironment?.url}/api/`} />
          </Card>

          {/* Test Results */}
          <Card className="mt-6" title="Test Results">
            <Space direction="vertical" className="w-full">
              {[
                { method: 'GET', path: '/api/users', status: 200, duration: '120ms', success: true },
                { method: 'PUT', path: '/api/products/123', status: 404, duration: '200ms', success: false },
              ].map((test, index) => (
                <Alert
                  key={index}
                  message={
                    <Row justify="space-between" align="middle">
                      <Col>
                        <Space>
                          <Tag color={test.success ? 'success' : 'error'}>{test.method}</Tag>
                          <Text code>{test.path}</Text>
                          <Text type="secondary">Status: {test.status}</Text>
                        </Space>
                      </Col>
                      <Col>
                        <Text type="secondary">{test.duration}</Text>
                      </Col>
                    </Row>
                  }
                  type={test.success ? 'success' : 'error'}
                  showIcon
                  className="rounded-lg"
                />
              ))}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ApiTesting;
