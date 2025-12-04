// import React from 'react';
// import { 
//   MenuOutlined, 
//   GlobalOutlined, 
//   BellOutlined, 
//   UserOutlined,
//   SearchOutlined 
// } from '@ant-design/icons';
// import { Layout, Input, Button, Badge, Avatar, Dropdown, Menu } from 'antd';

// const { Header: AntHeader } = Layout;

// const Header = ({ onMenuClick }) => {
//   const userMenu = (
//     <Menu
//       items={[
//         {
//           key: '1',
//           label: 'Profile',
//         },
//         {
//           key: '2',
//           label: 'Settings',
//         },
//         {
//           type: 'divider',
//         },
//         {
//           key: '3',
//           label: 'Logout',
//         },
//       ]}
//     />
//   );

//   return (
//     <AntHeader className="bg-white shadow-md flex items-center justify-between px-6 z-50">
//       <div className="flex items-center space-x-4">
//         <Button
//           type="text"
//           icon={<MenuOutlined className="text-gray-700" />}
//           onClick={onMenuClick}
//           className="hover:bg-gray-100"
//         />
//         <div className="flex items-center">
//           <GlobalOutlined className="text-blue-600 text-xl mr-2" />
//           <h1 className="text-xl font-bold text-gray-800 m-0">EZMA API Client</h1>
//         </div>
//       </div>
      
//       <div className="flex items-center space-x-4">
//         <div className="hidden md:block">
//           <Input
//             placeholder="Search endpoints..."
//             prefix={<SearchOutlined className="text-gray-400" />}
//             className="w-64"
//             size="middle"
//           />
//         </div>
        
//         <Badge dot>
//           <Button 
//             type="text" 
//             icon={<BellOutlined className="text-gray-600" />}
//             className="hover:bg-gray-100"
//           />
//         </Badge>
        
//         <Dropdown overlay={userMenu} trigger={['click']}>
//           <div className="flex items-center space-x-2 cursor-pointer">
//             <Avatar 
//               size="default"
//               className="bg-gradient-to-r from-blue-500 to-purple-600"
//               icon={<UserOutlined />}
//             />
//             <span className="font-medium text-gray-700 hidden md:inline">Admin</span>
//           </div>
//         </Dropdown>
//       </div>
//     </AntHeader>
//   );
// };

// export default Header;


import React from 'react';
import { 
  MenuOutlined, 
  GlobalOutlined, 
  BellOutlined, 
  UserOutlined,
  SearchOutlined 
} from '@ant-design/icons';
import { Layout, Input, Button, Badge, Avatar, Dropdown, Menu, Space } from 'antd';

const { Header: AntHeader } = Layout;

const Header = ({ onMenuClick }) => {
  const userMenu = (
    <Menu
      items={[
        {
          key: '1',
          label: 'Profil',
        },
        {
          key: '2',
          label: 'Sozlamalar',
        },
        {
          type: 'divider',
        },
        {
          key: '3',
          label: 'Chiqish',
        },
      ]}
    />
  );

  const navItems = [
    { key: 'home', label: 'Bosh sahifa' },
    { key: 'info', label: 'Ma\'lumotlar' },
    { key: 'libraries', label: 'Kutubxonalar' }
  ];

  return (
    <AntHeader className="bg-white shadow-md flex items-center justify-between px-6 z-50">
      <div className="flex items-center space-x-4">
        <Button
          type="text"
          icon={<MenuOutlined className="text-gray-700" />}
          onClick={onMenuClick}
          className="hover:bg-gray-100"
        />
        <div className="flex items-center">
          <GlobalOutlined className="text-blue-600 text-xl mr-2" />
          <h1 className="text-xl font-bold text-gray-800 m-0">EZMA API Client</h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-8">
        {/* Navigation items - shown on medium screens and larger */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Button 
              key={item.key}
              type="text" 
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium"
            >
              {item.label}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <Input
              placeholder="Qidirish..."
              prefix={<SearchOutlined className="text-gray-400" />}
              className="w-64"
              size="middle"
            />
          </div>
          
          <Badge dot>
            <Button 
              type="text" 
              icon={<BellOutlined className="text-gray-600" />}
              className="hover:bg-gray-100"
            />
          </Badge>
          
          <Dropdown overlay={userMenu} trigger={['click']}>
            <div className="flex items-center space-x-2 cursor-pointer">
              <Avatar 
                size="default"
                className="bg-gradient-to-r from-blue-500 to-purple-600"
                icon={<UserOutlined />}
              />
              <span className="font-medium text-gray-700 hidden md:inline">Admin</span>
            </div>
          </Dropdown>
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;