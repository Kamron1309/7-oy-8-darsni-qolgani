import React, { useState } from 'react';
import { 
  SendOutlined, 
  CopyOutlined, 
  SaveOutlined, 
  PlusOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { 
  Select, 
  Input, 
  Button, 
  Space, 
  Card, 
  Row, 
  Col, 
  Checkbox,
  Typography,
  Tooltip,
  Tag
} from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

const ApiTester = ({ initialUrl = 'http://176.57.208.162:8000/api/' }) => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState(initialUrl);
  const [requestBody, setRequestBody] = useState('{\n  "key": "value"\n}');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState([
    { key: 'Content-Type', value: 'application/json', enabled: true }
  ]);

  const handleAddHeader = () => {
    setHeaders([...headers, { key: '', value: '', enabled: true }]);
  };

  const handleHeaderChange = (index, field, value) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const handleTest = async () => {
    if (!url.trim()) {
      alert('Please enter a URL');
      return;
    }

    setLoading(true);
    try {
      const activeHeaders = headers
        .filter(h => h.enabled && h.key.trim() !== '')
        .reduce((acc, header) => {
          acc[header.key] = header.value;
          return acc;
        }, {});

      const options = {
        method,
        headers: activeHeaders
      };

      if (['POST', 'PUT', 'PATCH'].includes(method)) {
        options.body = requestBody;
      }

      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'content-type': 'application/json'
        },
        data: {
          success: true,
          message: `${method} request successful`,
          timestamp: new Date().toISOString(),
          method,
          endpoint: url,
          data: method === 'GET' ? { items: [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }] } : null
        }
      };

      setResponse(mockResponse);
    } catch (error) {
      setResponse({
        status: 500,
        statusText: 'Error',
        error: error.message
      });
    }
    setLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const saveRequest = () => {
    const requestData = {
      method,
      url,
      headers: headers.filter(h => h.enabled),
      body: requestBody
    };
    localStorage.setItem('savedRequest', JSON.stringify(requestData));
    alert('Request saved!');
  };

  return (
    <div className="space-y-6">
      {/* Method and URL */}
      <Row gutter={[8, 8]}>
        <Col xs={24} md={4}>
          <Select
            value={method}
            onChange={setMethod}
            className="w-full"
          >
            <Option value="GET">GET</Option>
            <Option value="POST">POST</Option>
            <Option value="PUT">PUT</Option>
            <Option value="DELETE">DELETE</Option>
            <Option value="PATCH">PATCH</Option>
          </Select>
        </Col>
        
        <Col xs={24} md={16}>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter API endpoint URL"
            suffix={
              <Tooltip title="Copy URL">
                <CopyOutlined 
                  onClick={() => copyToClipboard(url)}
                  className="cursor-pointer text-gray-400 hover:text-gray-600"
                />
              </Tooltip>
            }
          />
        </Col>
        
        <Col xs={24} md={4}>
          <Space>
            <Tooltip title="Save Request">
              <Button 
                icon={<SaveOutlined />}
                onClick={saveRequest}
              />
            </Tooltip>
            <Button 
              type="primary" 
              icon={<SendOutlined />}
              onClick={handleTest}
              loading={loading}
              className="w-full"
            >
              Send
            </Button>
          </Space>
        </Col>
      </Row>

      {/* Headers Section */}
      <Card size="small" title={
        <Space>
          <span>Headers</span>
          <Button 
            type="link" 
            size="small" 
            icon={<PlusOutlined />}
            onClick={handleAddHeader}
          >
            Add Header
          </Button>
        </Space>
      }>
        <Space direction="vertical" className="w-full">
          {headers.map((header, index) => (
            <Row key={index} gutter={8} align="middle">
              <Col xs={1}>
                <Checkbox 
                  checked={header.enabled}
                  onChange={(e) => handleHeaderChange(index, 'enabled', e.target.checked)}
                />
              </Col>
              <Col xs={9}>
                <Input
                  placeholder="Header Key"
                  value={header.key}
                  onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                  size="small"
                />
              </Col>
              <Col xs={12}>
                <Input
                  placeholder="Header Value"
                  value={header.value}
                  onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                  size="small"
                />
              </Col>
              <Col xs={2}>
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    const newHeaders = headers.filter((_, i) => i !== index);
                    setHeaders(newHeaders);
                  }}
                  size="small"
                />
              </Col>
            </Row>
          ))}
        </Space>
      </Card>

      {/* Request Body */}
      {['POST', 'PUT', 'PATCH'].includes(method) && (
        <Card size="small" title="Request Body" extra={
          <Space>
            <Button 
              size="small" 
              onClick={() => setRequestBody('{\n  "key": "value"\n}')}
            >
              Reset
            </Button>
            <Button 
              size="small" 
              icon={<CopyOutlined />}
              onClick={() => copyToClipboard(requestBody)}
            >
              Copy
            </Button>
          </Space>
        }>
          <TextArea
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
            rows={6}
            className="font-mono text-sm"
            spellCheck={false}
          />
        </Card>
      )}

      {/* Response Section */}
      {response && (
        <Card
          title={
            <Space>
              <span>Response</span>
              <Tag color={response.status === 200 ? 'success' : response.status >= 400 ? 'error' : 'warning'}>
                Status: {response.status} {response.statusText}
              </Tag>
            </Space>
          }
          extra={
            <Button 
              icon={<CopyOutlined />}
              onClick={() => copyToClipboard(JSON.stringify(response, null, 2))}
            >
              Copy
            </Button>
          }
        >
          <SyntaxHighlighter
            language="json"
            style={atomOneDark}
            customStyle={{
              margin: 0,
              borderRadius: 8,
              fontSize: '14px',
              maxHeight: '400px',
            }}
          >
            {JSON.stringify(response, null, 2)}
          </SyntaxHighlighter>
        </Card>
      )}
    </div>
  );
};

export default ApiTester;
