var axios = require('axios');

var axiosInstance = axios.create({
    baseURL:process.env.REACT_APP_API_BASE_URL//'http://13.232.37.143/v1/api/',
    /* other custom settings */
});

module.exports = axiosInstance;