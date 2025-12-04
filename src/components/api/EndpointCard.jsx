import React from 'react';
import { 
  EyeOutlined, 
  CopyOutlined, 
  ClockCircleOutlined,
  BarChartOutlined,
  ActivityOutlined,
  MoreOutlined 
} from '@ant-design/icons';
import { Card, Tag, Button, Space, Tooltip, Dropdown, Menu } from 'antd';

const EndpointCard = ({ endpoint, onClick }) => {
  const getMethodColor = (method) => {
    switch(method) {
      case 'GET': return 'success';
      case 'POST': return 'blue';
      case 'PUT': return 'warning';
      case 'DELETE': return 'error';
      case 'PATCH': return 'purple';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'success';
      case 'warning': return 'warning';
      case 'inactive': return 'error';
      case 'deprecated': return 'default';
      default: return 'default';
    }
  };

  const getUsageColor = (usage) => {
    switch((usage || '').toLowerCase()) {
      case 'very high': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'gold';
      case 'low': return 'green';
      default: return 'default';
    }
  };

  const menu = (
    <Menu
      items={[
        { key: '1', label: 'View Details' },
        { key: '2', label: 'Edit' },
        { key: '3', label: 'Delete', danger: true },
      ]}
    />
  );

  return (
    <Card 
      className="hover-card"
      actions={[
        <Button 
          key="test" 
          type="link" 
          icon={<EyeOutlined />}
          onClick={onClick}
          className="text-blue-600"
        >
          Test Endpoint
        </Button>,
        <Button key="details" type="text">
          Details
        </Button>,
      ]}
    >
      <div className="flex justify-between items-start mb-4">
        <Space>
          <Tag color={getMethodColor(endpoint.method)}>
            {endpoint.method}
          </Tag>
          <Tag color={getStatusColor(endpoint.status)}>
            {endpoint.status}
          </Tag>
        </Space>
        <Space>
          <Tooltip title="Copy endpoint">
            <Button 
              type="text" 
              icon={<CopyOutlined />}
              onClick={() => navigator.clipboard.writeText(endpoint.path)}
              size="small"
            />
          </Tooltip>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="text" icon={<MoreOutlined />} size="small" />
          </Dropdown>
        </Space>
      </div>
      
      <div className="mb-4">
        <h3 className="font-mono text-sm font-bold text-gray-800 truncate mb-1">
          {endpoint.path}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {endpoint.description || 'No description available'}
        </p>
      </div>
      
      {endpoint.tags && endpoint.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {endpoint.tags.slice(0, 3).map((tag, index) => (
            <Tag key={index} color="default" className="text-xs">
              {tag}
            </Tag>
          ))}
          {endpoint.tags.length > 3 && (
            <Tag className="text-xs">+{endpoint.tags.length - 3}</Tag>
          )}
        </div>
      )}
      
      <Space direction="vertical" className="w-full">
        <div className="flex items-center justify-between">
          <Space>
            <ClockCircleOutlined className="text-gray-400" />
            <span className="text-xs text-gray-500">Response Time</span>
          </Space>
          <span className="font-semibold text-sm">{endpoint.responseTime || 'N/A'}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <Space>
            <BarChartOutlined className="text-gray-400" />
            <span className="text-xs text-gray-500">Usage</span>
          </Space>
          <Tag color={getUsageColor(endpoint.usage)}>
            {endpoint.usage || 'N/A'}
          </Tag>
        </div>

        {endpoint.lastUsed && (
          <div className="flex items-center justify-between">
            <Space>
              <ActivityOutlined className="text-gray-400" />
              <span className="text-xs text-gray-500">Last Used</span>
            </Space>
            <span className="text-xs text-gray-600">{endpoint.lastUsed}</span>
          </div>
        )}
      </Space>
    </Card>
  );
};

export default EndpointCard;
