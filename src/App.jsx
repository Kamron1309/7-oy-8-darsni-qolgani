// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import MainLayout from './components/layout/MainLayout';
// import Home from './pages/Home';
// import ApiDashboard from './pages/ApiDashboard';
// import Documentation from './pages/Documentation';
// import ApiTesting from './pages/ApiTesting';

// function App() {
//   return (
//     <Router>
//       <MainLayout>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/dashboard" element={<ApiDashboard />} />
//           <Route path="/docs" element={<Documentation />} />
//           <Route path="/testing" element={<ApiTesting />} />
//         </Routes>
//       </MainLayout>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import ApiDashboard from './pages/ApiDashboard';
import Documentation from './pages/Documentation';
import ApiTesting from './pages/ApiTesting';
import './App.css';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ApiDashboard />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/testing" element={<ApiTesting />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;