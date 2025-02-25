import React, { useEffect, useState } from 'react'
import PuffLoader from "react-spinners/PuffLoader";
import { api } from '../../utils/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants/token';
import { jwtDecode } from 'jwt-decode'


const AuthCheck = ({children}) => {
    const [ isAuthenticated, setIsAuthendicated ] = useState(null)
    const [ isAdmin, setIsAdmin ] = useState(null)
    const location = useLocation()
    const navigate = useNavigate()
    

    useEffect(() => {
        authCheck().catch(() => setIsAuthendicated(false))
    }, [])

    const authCheck = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(token){
            const decodedJWT = jwtDecode(token)
            setIsAdmin(decodedJWT.is_superuser)
        }
        
        await api.get('auth/auth-check').then((res) => {
            if(res.data?.is_authenticated) {
                setIsAuthendicated(true)
            }else{
                setIsAuthendicated(false)
            }
        }).catch((error) => {
            setIsAuthendicated(false)
        })

    }

    if(isAuthenticated == null) {
        return (
            <div className='w-full h-screen flex justify-center items-center'>
                <PuffLoader 
                color='#0ea5e9'
                />
            </div>
        )
    }

  return !isAuthenticated ? children : navigate(isAdmin ? '/admin/dashboard' : '/')
}

export default AuthCheck
