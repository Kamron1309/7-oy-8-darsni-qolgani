/**
 * Format a timestamp to a readable string
 */
export const formatTime = (timestamp) => {
  if (!timestamp) return 'Never';

  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
  if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  return date.toLocaleDateString();
};

/**
 * Get color class based on HTTP method
 */
export const getMethodColors = (method) => {
  const colors = {
    GET: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
    POST: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
    PUT: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
    DELETE: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
    PATCH: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
    HEAD: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' },
    OPTIONS: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' },
  };
  return colors[method.toUpperCase()] || colors.GET;
};

/**
 * Get color class based on status
 */
export const getStatusColors = (status) => {
  if (typeof status === 'number') {
    if (status >= 200 && status < 300) return { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' };
    if (status >= 300 && status < 400) return { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' };
    if (status >= 400 && status < 500) return { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' };
    return { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' };
  }

  const statusText = status.toLowerCase();
  switch (statusText) {
    case 'active':
    case 'success':
      return { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' };
    case 'warning':
      return { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' };
    case 'inactive':
    case 'error':
      return { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' };
    case 'deprecated':
      return { bg: 'bg-gray-100', text: 'text-gray-800', dot: 'bg-gray-500' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-800', dot: 'bg-gray-500' };
  }
};

/**
 * Validate JSON string
 */
export const isValidJSON = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Format JSON with indentation
 */
export const formatJSON = (data, indent = 2) => {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (e) {
      return data;
    }
  }
  return JSON.stringify(data, null, indent);
};

/**
 * Debounce function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Generate a unique ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    document.body.removeChild(textArea);
  }
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Format bytes to human readable format
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Get URL parameters
 */
export const getUrlParams = (url) => {
  const params = {};
  try {
    const urlObj = new URL(url, window.location.origin);
    urlObj.searchParams.forEach((value, key) => {
      params[key] = value;
    });
  } catch (error) {
    console.error('Invalid URL:', error);
  }
  return params;
};

/**
 * Build URL with parameters
 */
export const buildUrl = (baseUrl, params) => {
  try {
    const url = new URL(baseUrl);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.append(key, value);
      }
    });
    return url.toString();
  } catch (error) {
    console.error('Error building URL:', error);
    return baseUrl;
  }
};
