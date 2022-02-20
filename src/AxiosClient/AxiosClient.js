import axios from 'axios'

const AxiosClient = axios.create({
    baseURL: process.env.BASE_URL,

    headers: {
        'content-Type': 'application/json',
    },
})

// Add a request interceptor
AxiosClient.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token')
        config.headers.Authorization = token ? `Bearer ${token}` : null
        return config
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error)
    }
)

// Add a response interceptor
AxiosClient.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error)
    }
)
export default AxiosClient
