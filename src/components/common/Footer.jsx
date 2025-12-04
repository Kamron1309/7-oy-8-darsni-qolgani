// import React from 'react';
// import { 
//   HeartOutlined, 
//   GithubOutlined, 
//   TwitterOutlined, 
//   MessageOutlined,
//   GlobalOutlined 
// } from '@ant-design/icons';
// import { Layout, Row, Col, Space } from 'antd';

// const { Footer: AntFooter } = Layout;

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <AntFooter className="bg-white border-t mt-8 px-0">
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         <Row gutter={[32, 32]}>
//           <Col xs={24} md={8}>
//             <div className="flex items-center mb-4">
//               <GlobalOutlined className="text-blue-600 text-2xl mr-3" />
//               <span className="text-xl font-bold text-gray-800">EZMA</span>
//             </div>
//             <p className="text-gray-600">
//               Modern API testing and monitoring platform. Streamline your development workflow with powerful tools.
//             </p>
//           </Col>
          
//           <Col xs={24} md={16}>
//             <Row gutter={[32, 32]}>
//               <Col xs={8} sm={8} md={8}>
//                 <h4 className="font-semibold text-gray-800 mb-4">Product</h4>
//                 <ul className="space-y-2">
//                   <li><a href="#" className="text-gray-600 hover:text-blue-600">Features</a></li>
//                   <li><a href="#" className="text-gray-600 hover:text-blue-600">Pricing</a></li>
//                   <li><a href="#" className="text-gray-600 hover:text-blue-600">Documentation</a></li>
//                 </ul>
//               </Col>
//               <Col xs={8} sm={8} md={8}>
//                 <h4 className="font-semibold text-gray-800 mb-4">Company</h4>
//                 <ul className="space-y-2">
//                   <li><a href="#" className="text-gray-600 hover:text-blue-600">About</a></li>
//                   <li><a href="#" className="text-gray-600 hover:text-blue-600">Blog</a></li>
//                   <li><a href="#" className="text-gray-600 hover:text-blue-600">Careers</a></li>
//                 </ul>
//               </Col>
//               <Col xs={8} sm={8} md={8}>
//                 <h4 className="font-semibold text-gray-800 mb-4">Legal</h4>
//                 <ul className="space-y-2">
//                   <li><a href="#" className="text-gray-600 hover:text-blue-600">Privacy</a></li>
//                   <li><a href="#" className="text-gray-600 hover:text-blue-600">Terms</a></li>
//                   <li><a href="#" className="text-gray-600 hover:text-blue-600">Security</a></li>
//                 </ul>
//               </Col>
//             </Row>
//           </Col>
//         </Row>
        
//         <div className="border-t mt-8 pt-8">
//           <Row justify="space-between" align="middle">
//             <Col>
//               <p className="text-gray-600">
//                 © {currentYear} EZMA API Client. All rights reserved.
//               </p>
//             </Col>
            
//             <Col>
//               <Space size="large">
//                 <Space size="middle">
//                   <a href="#" className="text-gray-600 hover:text-blue-600">
//                     <GithubOutlined className="text-lg" />
//                   </a>
//                   <a href="#" className="text-gray-600 hover:text-blue-600">
//                     <TwitterOutlined className="text-lg" />
//                   </a>
//                   <a href="#" className="text-gray-600 hover:text-blue-600">
//                     <MessageOutlined className="text-lg" />
//                   </a>
//                 </Space>
//                 <div className="flex items-center text-gray-600">
//                   Made with <HeartOutlined className="mx-1 text-red-500" /> by EZMA Team
//                 </div>
//               </Space>
//             </Col>
//           </Row>
//         </div>
//       </div>
//     </AntFooter>
//   );
// };

// export default Footer;


import React from 'react';
import { 
  HeartOutlined, 
  GithubOutlined, 
  TwitterOutlined, 
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  LinkedinOutlined,
  GlobalOutlined 
} from '@ant-design/icons';
import { Layout, Row, Col, Space, Divider } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter className="bg-gray-900 text-white px-0">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section */}
        <Row gutter={[48, 32]}>
          <Col xs={24} md={12}>
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4 flex items-center">
                <GlobalOutlined className="text-blue-400 mr-3 text-2xl" />
                Ezma
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                O'zbekistonning eng yirik kutubxona tarmog'i. Biz bilan kitob o'qishni boshlang!
              </p>
            </div>
            
            {/* Social Media Icons */}
            <Space size="large" className="mb-8">
              <a href="#" className="text-gray-300 hover:text-white text-xl">
                <FacebookOutlined />
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-xl">
                <InstagramOutlined />
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-xl">
                <TwitterOutlined />
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-xl">
                <YoutubeOutlined />
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-xl">
                <LinkedinOutlined />
              </a>
            </Space>
          </Col>
          
          <Col xs={24} md={12}>
            <Row gutter={[32, 32]}>
              <Col xs={12} sm={12} md={12}>
                <h4 className="font-bold text-white mb-6 text-lg">Tezkor havolalar</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-300 hover:text-white hover:underline">Bosh sahifa</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white hover:underline">Kutubxonalar</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white hover:underline">Kitoblar</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white hover:underline">Tadbirlar</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white hover:underline">Biz haqimizda</a></li>
                </ul>
              </Col>
              
              <Col xs={12} sm={12} md={12}>
                <h4 className="font-bold text-white mb-6 text-lg">Bog'lanish</h4>
                <ul className="space-y-3">
                  <li className="text-gray-300">
                    <div className="font-medium">Telefon:</div>
                    <a href="tel:+998901234567" className="hover:text-white hover:underline">
                      +998 90 123 45 67
                    </a>
                  </li>
                  <li className="text-gray-300">
                    <div className="font-medium">Email:</div>
                    <a href="mailto:info@ezma.uz" className="hover:text-white hover:underline">
                      info@ezma.uz
                    </a>
                  </li>
                  <li className="text-gray-300">
                    <div className="font-medium">Manzil:</div>
                    <div>Toshkent shahri, Yunusobod tumani</div>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
        
        <Divider className="bg-gray-700 my-10" />
        
        {/* Bottom Section */}
        <Row justify="space-between" align="middle" className="flex-wrap">
          <Col xs={24} md={8} className="mb-4 md:mb-0">
            <p className="text-gray-400">
              © {currentYear} EZMA. Barcha huquqlar himoyalangan
            </p>
          </Col>
          
          <Col xs={24} md={8} className="text-center mb-4 md:mb-0">
            <Space size="middle">
              <a href="#" className="text-gray-400 hover:text-white hover:underline">
                Maxfiylik siyosati
              </a>
              <span className="text-gray-600">•</span>
              <a href="#" className="text-gray-400 hover:text-white hover:underline">
                Foydalanish shartlari
              </a>
            </Space>
          </Col>
          
          <Col xs={24} md={8} className="text-right">
            <div className="flex items-center justify-end text-gray-400">
              <span className="mr-2">Qurilgan:</span>
              <HeartOutlined className="text-red-500 mx-1" />
              <span className="ml-1">EZMA jamoasi tomonidan</span>
            </div>
          </Col>
        </Row>
      </div>
    </AntFooter>
  );
};

export default Footer;