import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosInstance.interceptors.request.use(
    config => {
        const auth = localStorage.getItem('skymart_auth')
        if (auth) {
            try {
                const parsed = JSON.parse(auth)
                if (parsed.token) {
                    config.headers.Authorization = `Bearer ${parsed.token}`
                }
            } catch { }
        }
        return config
    },
    error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('skymart_auth')
        }
        return Promise.reject(error)
    }
)

export default axiosInstance
