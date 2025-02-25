import React, { useEffect } from 'react'
import UserDetails from '../commen/UserDetails'
import defaut_user from "../../assets/images/user.png"
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, clearUser } from '../../feature/userListSlice'
import PuffLoader from "react-spinners/PuffLoader";

const IndividualUser = () => {
    const location = useLocation()
    const { isLoading, error, user } = useSelector((state) => state.usersList)
    const dispatch = useDispatch()

    
    useEffect(() => {
        dispatch(getUser(location.state))

        return () => {
            dispatch(clearUser())
        }
    }, [])
  return (
    <div className='w-full h-screen flex justify-center items-center bg-gradient-to-r from-slate-50 to-sky-100'>
      <div className='w-[60%] sm:w-[80%] md:w-[30%] border border-gray-300 rounded py-[40px] flex flex-col justify-center items-center space-y-4'>
        
        {
            user?.profile ? 
            <img className='w-[150px] rounded' src={`http://127.0.0.1:8000/${user.profile}`} alt="" />
            : 
            <img className='w-[150px] rounded' src={defaut_user} alt="" />
        }
        {
        error && (
            <div>
                <p className='text-red-500 font-semibold text-xs md:text-sm'>{error || "Fetching failed!"}</p>
            </div>
        )
        }
        <div>
            <h1 className='text-sm md:text-xl text-center font-bold text-slate-900'>{user?.username}</h1>
            <p className='text-xs md:text-sm text-slate-900 font-semibold'>{user?.email}</p>
        </div>
      </div>
      {
        isLoading && (
            <div>
                <PuffLoader 
                color='#0ea5e9'
                loading={isLoading}
                />
            </div>
        )
      }
      
    </div>
  )
}

export default IndividualUser
