import React from 'react';
import { 
  HeartOutlined, 
  GithubOutlined, 
  TwitterOutlined, 
  MessageOutlined,
  GlobalOutlined 
} from '@ant-design/icons';
import { Layout, Row, Col, Space } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter className="bg-white border-t mt-8 px-0">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <div className="flex items-center mb-4">
              <GlobalOutlined className="text-blue-600 text-2xl mr-3" />
              <span className="text-xl font-bold text-gray-800">EZMA</span>
            </div>
            <p className="text-gray-600">
              Modern API testing and monitoring platform. Streamline your development workflow with powerful tools.
            </p>
          </Col>
          
          <Col xs={24} md={16}>
            <Row gutter={[32, 32]}>
              <Col xs={8} sm={8} md={8}>
                <h4 className="font-semibold text-gray-800 mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Features</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Pricing</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Documentation</a></li>
                </ul>
              </Col>
              <Col xs={8} sm={8} md={8}>
                <h4 className="font-semibold text-gray-800 mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">About</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Blog</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Careers</a></li>
                </ul>
              </Col>
              <Col xs={8} sm={8} md={8}>
                <h4 className="font-semibold text-gray-800 mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Privacy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Terms</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Security</a></li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
        
        <div className="border-t mt-8 pt-8">
          <Row justify="space-between" align="middle">
            <Col>
              <p className="text-gray-600">
                © {currentYear} EZMA API Client. All rights reserved.
              </p>
            </Col>
            
            <Col>
              <Space size="large">
                <Space size="middle">
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    <GithubOutlined className="text-lg" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    <TwitterOutlined className="text-lg" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    <MessageOutlined className="text-lg" />
                  </a>
                </Space>
                <div className="flex items-center text-gray-600">
                  Made with <HeartOutlined className="mx-1 text-red-500" /> by EZMA Team
                </div>
              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
