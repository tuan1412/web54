import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_URL
});

// instance.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   config.headers.Authorization = token ? token : '';
//   return config;
// }, err => {
//   return Promise.reject(err);
// })

// transform mọi response trả về => bỏ qua một lớp data của axios
instance.interceptors.response.use(res => {
  if (res && res.data) {
    return res.data;
  }
  return res;
}, err => {
  return Promise.reject(err);
})

export default instance;