import React, { useState, useEffect } from 'react';
import { 
  DownloadOutlined, 
  PlusOutlined, 
  ReloadOutlined, 
  SearchOutlined,
  FilterOutlined,
  BarChartOutlined,
  AlertOutlined,
  CheckCircleOutlined 
} from '@ant-design/icons';
import { 
  Card, 
  Button, 
  Input, 
  Select, 
  Statistic, 
  Tag, 
  Row, 
  Col, 
  Space,
  Dropdown,
  Menu,
  Checkbox,
  Grid,
  Typography,
  Modal,
  Form
} from 'antd';
import EndpointCard from '../components/api/EndpointCard';
import LoadingSpinner, { LoadingOverlay } from '../components/common/LoadingSpinner';

const { Option } = Select;
const { Search } = Input;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;
const { confirm } = Modal;

const ApiDashboard = () => {
  const [endpoints, setEndpoints] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('usage');
  const [showFilters, setShowFilters] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const screens = useBreakpoint();

  useEffect(() => {
    const fetchEndpoints = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockEndpoints = [
          {
            id: 1,
            method: 'GET',
            path: '/api/users',
            description: 'Retrieve all registered users with pagination support',
            status: 'active',
            responseTime: '120ms',
            usage: 'High',
            lastUsed: '2 min ago',
            tags: ['users', 'auth', 'admin']
          },
          {
            id: 2,
            method: 'POST',
            path: '/api/auth/login',
            description: 'Authenticate user and return JWT token',
            status: 'active',
            responseTime: '85ms',
            usage: 'Very High',
            lastUsed: '5 min ago',
            tags: ['auth', 'security']
          },
          {
            id: 3,
            method: 'PUT',
            path: '/api/products/{id}',
            description: 'Update product information by ID',
            status: 'warning',
            responseTime: '200ms',
            usage: 'Medium',
            lastUsed: '10 min ago',
            tags: ['products', 'inventory']
          },
          {
            id: 4,
            method: 'DELETE',
            path: '/api/orders/{id}',
            description: 'Delete specific order (admin only)',
            status: 'inactive',
            responseTime: '150ms',
            usage: 'Low',
            lastUsed: '1 hour ago',
            tags: ['orders', 'admin']
          },
          {
            id: 5,
            method: 'GET',
            path: '/api/orders',
            description: 'Get all orders with filtering options',
            status: 'active',
            responseTime: '95ms',
            usage: 'High',
            lastUsed: '15 min ago',
            tags: ['orders', 'reporting']
          },
          {
            id: 6,
            method: 'PATCH',
            path: '/api/users/{id}/profile',
            description: 'Partially update user profile information',
            status: 'active',
            responseTime: '110ms',
            usage: 'Medium',
            lastUsed: '30 min ago',
            tags: ['users', 'profile']
          },
          {
            id: 7,
            method: 'GET',
            path: '/api/analytics/dashboard',
            description: 'Get dashboard analytics and statistics',
            status: 'active',
            responseTime: '180ms',
            usage: 'High',
            lastUsed: '25 min ago',
            tags: ['analytics', 'dashboard']
          },
          {
            id: 8,
            method: 'POST',
            path: '/api/webhooks',
            description: 'Create new webhook subscription',
            status: 'deprecated',
            responseTime: '220ms',
            usage: 'Low',
            lastUsed: '2 days ago',
            tags: ['webhooks', 'integration']
          },
        ];
        setEndpoints(mockEndpoints);
      } catch (error) {
        console.error('Error fetching endpoints:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEndpoints();
  }, []);

  const filteredEndpoints = endpoints
    .filter(endpoint => {
      const matchesFilter = filter === 'all' || endpoint.status === filter;
      const matchesSearch = search === '' || 
        endpoint.path.toLowerCase().includes(search.toLowerCase()) ||
        endpoint.description.toLowerCase().includes(search.toLowerCase()) ||
        endpoint.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'usage':
          const usageOrder = { 'Very High': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
          return (usageOrder[b.usage] || 0) - (usageOrder[a.usage] || 0);
        case 'response':
          return parseFloat(a.responseTime) - parseFloat(b.responseTime);
        case 'alphabetical':
          return a.path.localeCompare(b.path);
        default:
          return 0;
      }
    });

  const handleEndpointClick = (endpoint) => {
    console.log('Testing endpoint:', endpoint);
    // Navigate to testing page with endpoint pre-filled
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(filteredEndpoints, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'ezma-endpoints.json');
    linkElement.click();
  };

  const filterMenu = (
    <Menu>
      <Menu.Item key="1"><Checkbox>GET</Checkbox></Menu.Item>
      <Menu.Item key="2"><Checkbox>POST</Checkbox></Menu.Item>
      <Menu.Item key="3"><Checkbox>PUT</Checkbox></Menu.Item>
      <Menu.Item key="4"><Checkbox>DELETE</Checkbox></Menu.Item>
      <Menu.Divider />
      <Menu.Item key="5"><Button type="link" size="small">Clear All</Button></Menu.Item>
      <Menu.Item key="6"><Button type="primary" size="small">Apply Filters</Button></Menu.Item>
    </Menu>
  );

  const AddEndpointModal = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
      console.log('Received values:', values);
      setAddModalVisible(false);
      form.resetFields();
    };

    return (
      <Modal
        title="Add New Endpoint"
        open={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        onOk={() => form.submit()}
        okText="Add Endpoint"
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="method"
                label="Method"
                rules={[{ required: true, message: 'Please select method' }]}
              >
                <Select>
                  <Option value="GET">GET</Option>
                  <Option value="POST">POST</Option>
                  <Option value="PUT">PUT</Option>
                  <Option value="DELETE">DELETE</Option>
                  <Option value="PATCH">PATCH</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item
                name="path"
                label="Path"
                rules={[{ required: true, message: 'Please input path' }]}
              >
                <Input placeholder="/api/endpoint" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input description' }]}
          >
            <Input.TextArea rows={3} placeholder="Describe the endpoint functionality" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="status" label="Status" initialValue="active">
                <Select>
                  <Option value="active">Active</Option>
                  <Option value="warning">Warning</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="usage" label="Usage" initialValue="Medium">
                <Select>
                  <Option value="Very High">Very High</Option>
                  <Option value="High">High</Option>
                  <Option value="Medium">Medium</Option>
                  <Option value="Low">Low</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="tags" label="Tags">
            <Select mode="tags" placeholder="Add tags" />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  if (loading && endpoints.length === 0) {
    return <LoadingOverlay message="Loading API endpoints..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={2} className="mb-1">API Endpoints Dashboard</Title>
          <Text type="secondary">Monitor and manage all API endpoints in one place</Text>
        </Col>
        <Col>
          <Space>
            <Button icon={<ReloadOutlined spin={loading} />} onClick={handleRefresh} />
            <Button icon={<DownloadOutlined />} onClick={exportData}>Export</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddModalVisible(true)}>Add Endpoint</Button>
          </Space>
        </Col>
      </Row>

      {/* Stats Overview */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-0">
            <Statistic
              title="Total Endpoints"
              value={endpoints.length}
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#1e40af' }}
            />
            <div className="mt-4 flex items-center text-sm">
              <CheckCircleOutlined className="text-green-500 mr-1" />
              <Text type="success">+3 this week</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-0">
            <Statistic
              title="Active Endpoints"
              value={endpoints.filter(e => e.status === 'active').length}
              valueStyle={{ color: '#166534' }}
              prefix={<div className="w-3 h-3 bg-green-500 rounded-full mr-2" />}
            />
            <Text type="secondary" className="mt-4">All critical endpoints are operational</Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-0">
            <Statistic
              title="Need Attention"
              value={endpoints.filter(e => e.status === 'warning' || e.status === 'inactive').length}
              prefix={<AlertOutlined />}
              valueStyle={{ color: '#92400e' }}
            />
            <Text type="secondary" className="mt-4">Check endpoint statuses</Text>
          </Card>
        </Col>
      </Row>

      {/* Filters & Search */}
      <Card>
        <Space direction="vertical" size="large" className="w-full">
          <Search
            placeholder="Search endpoints by path, description, or tags..."
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="large"
            allowClear
          />
          <Row justify="space-between" align="middle">
            <Col>
              <Space wrap>
                <Button type={filter==='all'?'primary':'default'} onClick={()=>setFilter('all')}>
                  All ({endpoints.length})
                </Button>
                <Button type={filter==='active'?'primary':'default'} onClick={()=>setFilter('active')}>
                  Active ({endpoints.filter(e=>e.status==='active').length})
                </Button>
                <Button type={filter==='warning'?'primary':'default'} onClick={()=>setFilter('warning')}>
                  Warning ({endpoints.filter(e=>e.status==='warning').length})
                </Button>
                <Button type={filter==='inactive'?'primary':'default'} onClick={()=>setFilter('inactive')}>
                  Inactive ({endpoints.filter(e=>e.status==='inactive').length})
                </Button>
                <Dropdown overlay={filterMenu} trigger={['click']}>
                  <Button icon={<FilterOutlined />}>More Filters</Button>
                </Dropdown>
              </Space>
            </Col>
            <Col>
              <Space>
                <Text type="secondary">Sort by:</Text>
                <Select value={sortBy} onChange={setSortBy} style={{width:120}}>
                  <Option value="usage">Usage</Option>
                  <Option value="response">Response Time</Option>
                  <Option value="alphabetical">Alphabetical</Option>
                </Select>
              </Space>
            </Col>
          </Row>
        </Space>
      </Card>

      {/* Endpoints Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="large" />
        </div>
      ) : filteredEndpoints.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <SearchOutlined className="text-5xl text-gray-300 mb-4" />
            <Title level={3} className="text-gray-700 mb-2">No endpoints found</Title>
            <Text type="secondary">Try adjusting your search or filter criteria</Text>
          </div>
        </Card>
      ) : (
        <>
          <Row justify="space-between" align="middle" className="mb-4">
            <Col><Title level={4}>Showing {filteredEndpoints.length} of {endpoints.length} endpoints</Title></Col>
            <Col><Text type="secondary">Updated just now</Text></Col>
          </Row>
          <Row gutter={[16,16]}>
            {filteredEndpoints.map(endpoint=>(
              <Col key={endpoint.id} xs={24} sm={12} md={8} lg={6}>
                <EndpointCard endpoint={endpoint} onClick={()=>handleEndpointClick(endpoint)} />
              </Col>
            ))}
          </Row>
        </>
      )}

      {/* Add Endpoint Modal */}
      <AddEndpointModal />
    </div>
  );
};

export default ApiDashboard;
