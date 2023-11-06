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

window.axios = axios
