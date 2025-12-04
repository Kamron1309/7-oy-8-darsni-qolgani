// import axios from 'axios';

// // const API_BASE_URL = 'http://176.57.208.162:8000';

// const API_BASE_URL = 'https://org-ave-jimmy-learners.trycloudflare.com';


// const api = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 30000,
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('ezma_token');
//     if (token && config.headers) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     if (config.headers) {
//       config.headers['X-Request-Timestamp'] = new Date().toISOString();
//     }

//     return config;
//   },
//   (error) => {
//     console.error('Request error:', error);
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     console.log(`✅ ${response.config.method.toUpperCase()} ${response.config.url} - ${response.status}`);
//     return response;
//   },
//   (error) => {
//     const method = error.config?.method?.toUpperCase();
//     const url = error.config?.url;
//     const status = error.response?.status || 'No Response';
//     console.error(`❌ ${method} ${url} - ${status}`);

//     if (error.response?.status === 401) {
//       localStorage.removeItem('ezma_token');
//       window.location.href = '/login';
//     }

//     if (error.response?.status === 429) {
//       alert('Rate limit exceeded. Please try again later.');
//     }

//     return Promise.reject(error);
//   }
// );

// export const testEndpoint = async (method, endpoint, data = null, headers = {}) => {
//   try {
//     const config = {
//       method: method.toLowerCase(),
//       url: endpoint,
//       headers,
//     };

//     if (data) {
//       config.data = data;
//     }

//     const response = await api(config);
//     return {
//       success: true,
//       status: response.status,
//       statusText: response.statusText,
//       data: response.data,
//       headers: response.headers,
//       config: response.config,
//       timestamp: new Date().toISOString(),
//     };
//   } catch (error) {
//     return {
//       success: false,
//       error: error.message,
//       status: error.response?.status,
//       statusText: error.response?.statusText,
//       data: error.response?.data,
//       config: error.config,
//       timestamp: new Date().toISOString(),
//     };
//   }
// };

// export const fetchSwaggerData = async () => {
//   try {
//     const response = await api.get('/swagger/?format=openapi');
//     return {
//       success: true,
//       data: response.data,
//     };
//   } catch (error) {
//     return {
//       success: false,
//       error: error.message,
//     };
//   }
// };

// export const getAllEndpoints = async () => {
//   try {
//     const result = await fetchSwaggerData();

//     if (!result.success || !result.data) {
//       throw new Error(result.error || 'Failed to fetch swagger data');
//     }

//     const swaggerData = result.data;
//     const endpoints = [];

//     if (swaggerData.paths) {
//       Object.entries(swaggerData.paths).forEach(([path, methods]) => {
//         Object.entries(methods).forEach(([method, details]) => {
//           endpoints.push({
//             id: parseInt(Date.now().toString() + Math.random().toString().substr(2, 5)),
//             method: method.toUpperCase(),
//             path,
//             description: details.summary || details.description || 'No description available',
//             status: 'active',
//             responseTime: '100ms',
//             usage: 'Medium',
//             parameters: details.parameters || [],
//             tags: details.tags || [],
//           });
//         });
//       });
//     }

//     return {
//       success: true,
//       data: {
//         endpoints,
//         info: swaggerData.info,
//         servers: swaggerData.servers || [{ url: API_BASE_URL }],
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching endpoints:', error);
//     return {
//       success: false,
//       error: error.message,
//       data: {
//         endpoints: [],
//         info: {},
//         servers: [],
//       },
//     };
//   }
// };

// export const getApiHealth = async () => {
//   try {
//     const startTime = Date.now();
//     const response = await api.get('/health');
//     const responseTime = Date.now() - startTime;

//     return {
//       success: true,
//       data: {
//         healthy: true,
//         responseTime: `${responseTime}ms`,
//       },
//       timestamp: new Date().toISOString(),
//     };
//   } catch (error) {
//     return {
//       success: false,
//       data: {
//         healthy: false,
//         responseTime: '0ms',
//       },
//       error: error.message,
//       timestamp: new Date().toISOString(),
//     };
//   }
// };

// export const saveToHistory = (requestData) => {
//   try {
//     const history = JSON.parse(localStorage.getItem('ezma_request_history') || '[]');
//     const newHistory = [requestData, ...history].slice(0, 100);
//     localStorage.setItem('ezma_request_history', JSON.stringify(newHistory));
//     return true;
//   } catch (error) {
//     console.error('Error saving to history:', error);
//     return false;
//   }
// };

// export const getRequestHistory = () => {
//   try {
//     return JSON.parse(localStorage.getItem('ezma_request_history') || '[]');
//   } catch (error) {
//     console.error('Error getting history:', error);
//     return [];
//   }
// };

// export default api;



import axios from 'axios';

// API bazaviy URL
const API_BASE_URL = 'https://org-ave-jimmy-learners.trycloudflare.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ezma_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.headers) {
      config.headers['X-Request-Timestamp'] = new Date().toISOString();
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.config.method.toUpperCase()} ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    const method = error.config?.method?.toUpperCase();
    const url = error.config?.url;
    const status = error.response?.status || 'No Response';
    console.error(`❌ ${method} ${url} - ${status}`);

    if (status === 401) {
      localStorage.removeItem('ezma_token');
      window.location.href = '/login';
    }

    if (status === 429) {
      alert('Rate limit exceeded. Please try again later.');
    }

    return Promise.reject(error);
  }
);

// Endpoint test qilish funksiyasi
export const testEndpoint = async (method, endpoint, data = null, headers = {}) => {
  try {
    const config = {
      method: method.toLowerCase(),
      url: endpoint,
      headers,
    };
    if (data) config.data = data;

    const response = await api(config);
    return {
      success: true,
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      headers: response.headers,
      config: response.config,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: error.config,
      timestamp: new Date().toISOString(),
    };
  }
};

// Swagger ma'lumotlarini olish
export const fetchSwaggerData = async () => {
  try {
    const response = await api.get('/swagger/?format=openapi');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Barcha endpointlarni olish
export const getAllEndpoints = async () => {
  try {
    const result = await fetchSwaggerData();
    if (!result.success || !result.data) throw new Error(result.error || 'Failed to fetch swagger data');

    const swaggerData = result.data;
    const endpoints = [];

    if (swaggerData.paths) {
      Object.entries(swaggerData.paths).forEach(([path, methods]) => {
        Object.entries(methods).forEach(([method, details]) => {
          endpoints.push({
            id: parseInt(Date.now().toString() + Math.random().toString().substr(2, 5)),
            method: method.toUpperCase(),
            path,
            description: details.summary || details.description || 'No description available',
            status: 'active',
            responseTime: '100ms',
            usage: 'Medium',
            parameters: details.parameters || [],
            tags: details.tags || [],
          });
        });
      });
    }

    return {
      success: true,
      data: {
        endpoints,
        info: swaggerData.info,
        servers: swaggerData.servers || [{ url: API_BASE_URL }],
      },
    };
  } catch (error) {
    console.error('Error fetching endpoints:', error);
    return { success: false, error: error.message, data: { endpoints: [], info: {}, servers: [] } };
  }
};

// API holatini tekshirish
export const getApiHealth = async () => {
  try {
    const startTime = Date.now();
    const response = await api.get('/health');
    const responseTime = Date.now() - startTime;

    return { success: true, data: { healthy: true, responseTime: `${responseTime}ms` }, timestamp: new Date().toISOString() };
  } catch (error) {
    return { success: false, data: { healthy: false, responseTime: '0ms' }, error: error.message, timestamp: new Date().toISOString() };
  }
};

// Request tarixini saqlash
export const saveToHistory = (requestData) => {
  try {
    const history = JSON.parse(localStorage.getItem('ezma_request_history') || '[]');
    const newHistory = [requestData, ...history].slice(0, 100);
    localStorage.setItem('ezma_request_history', JSON.stringify(newHistory));
    return true;
  } catch (error) {
    console.error('Error saving to history:', error);
    return false;
  }
};

// Request tarixini olish
export const getRequestHistory = () => {
  try {
    return JSON.parse(localStorage.getItem('ezma_request_history') || '[]');
  } catch (error) {
    console.error('Error getting history:', error);
    return [];
  }
};

export default api;
