import axios from 'axios'
import { ACCESS_TOKEN, BASE_URL } from '../constants/token'
import { accessTokenRefresh } from '../utils/tokenRefresh'

const api = axios.create({
    baseURL: BASE_URL,
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }, 
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.request.use(
    (response) => response, 
    async (error) => {
        const originalRequest = error.config
        if(error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true
            const newAccessToken = await accessTokenRefresh()
            if(newAccessToken){
                api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
                return api(originalRequest)
            }
        }
        return Promise.reject(error)
    }
)

export { api }