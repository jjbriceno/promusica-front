import axios from 'axios';

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.axios.defaults.withCredentials = true;

window.axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export default window.axios;
// export default window.axios;
// import axios from 'axios'

// // insert all your axios logic here

// export const axios

// export default {
//     install(Vue, options) {
//         Vue.prototype.$axios = axios
//     }
// }