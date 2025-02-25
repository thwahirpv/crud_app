import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import PuffLoader from "react-spinners/PuffLoader";
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants/token';
import { api } from '../../utils/api';
import { jwtDecode } from "jwt-decode"
import { useDispatch } from 'react-redux';
import { userLogout } from '../../feature/authSlice';


const Protected = ({children}) => {
    const [ isAuthenticated, setIsAuthendicated ] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        accessChecing().catch(() => setIsAuthendicated(false))
    }, [])

    const renewAccessToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        if(!refreshToken){
            setIsAuthendicated(false)
            return 
        }
        try {
            const response = await api.post('token/refresh/', {refresh: refreshToken})
            if(response.status === 200){
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                isAuthenticated(true)
            }else{
                setIsAuthendicated(false)
                dispatch(userLogout())
            }
        }catch(error){
            isAuthenticated(false)
            dispatch(userLogout())
        }
    }

    const accessChecing = async () => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN)
        if(!accessToken) {
            setIsAuthendicated(false)
            return false
        }
        const decodedJWT = jwtDecode(accessToken)
        const accessTokenExp = decodedJWT.exp
        const currentTime = Date.now() / 1000
        
        if(accessTokenExp < currentTime) {
            await renewAccessToken()
        }else{
            setIsAuthendicated(true)
        }

    }

    if(isAuthenticated == null) {
        return (
            <div className='w-full h-screen flex justify-center items-center'>
                <PuffLoader />
            </div>
        )
    }
  return isAuthenticated ? children : <Navigate to='/login' />
}

export default Protected
