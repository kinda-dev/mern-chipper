import axios from 'axios';

// default.headers sets the data with pass associated with the variable
// name Authorization with every request, in the header
export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const signup = (userData) => {
    return axios.post('/api/users/register', userData);
  };
  
  export const login = (userData) => {
    return axios.post('/api/users/login', userData);
  };