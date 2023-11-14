import axios_ from 'axios'

const axios = axios_.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 2000,
    headers: {
        common:
            { 
                "Accept": "application/json", 
                "Content-Type": "application/json", 
                "X-Requested-With": "XMLHttpRequest" 
            },
        },
    withCredentials: true
});

// axios.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       if (error.response && error.response.status === 419) {
//         window.location.reload();
//       }
//       return Promise.reject(error);
//     }
//   );

export default axios;
