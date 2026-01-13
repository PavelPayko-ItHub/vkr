import axios from 'axios'

const instanceAxios = axios.create({
    baseURL: __REACT_APP_API_ADDRESS__,
    headers: { 'Content-Type': 'application/json' }
})

instanceAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }
)

export { instanceAxios }
