import axios from "axios";
import { BASE_URL, ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/token";
import { userLogout } from "../feature/authSlice";
import { useDispatch } from "react-redux";


const accessTokenRefresh = async () => {
    const dispatch = useDispatch()
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)
    if(refreshToken){
        try {
            const response = await axios.post(`${BASE_URL}token/refresh/`, {refresh: refreshToken})
            localStorage.setItem(ACCESS_TOKEN, response.data?.access)
            return response?.data.access
        }catch (error){
            dispatch(userLogout())
            return null
        }
    }else{
        dispatch(userLogout())
    }
}

export { accessTokenRefresh}