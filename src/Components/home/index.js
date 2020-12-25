axios.defaults.baseURL = 'https://zany-periodic-fisherman.glitch.me/api';
let userData = JSON.parse(localStorage.getItem("userData"))
let token
if (userData) {
  token = userData.token
}
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';axios.interceptors.request.use(request => {
  return request;
}, 
error => {
  //  console.log(error);
  return Promise.reject(error);
});
axios.interceptors.response.use(response => {
  return response;
},
 error => {
  console.log(error.response);
  return Promise.reject(error);
});