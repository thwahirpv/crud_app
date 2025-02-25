import React, { useContext } from 'react'
import defaut_user from "../../assets/images/user.png"
import { ContextProvider } from '../../context/Context'

const UserDetails = ({username}) => {
  const { profile } = useContext(ContextProvider)
  return (
    <div>
        <div className='flex flex-col items-center justify-center'>
            {
              profile ? <img className='w-[150px] rounded cursor-pointer' src={profile} alt='user' />
              :
              <img className='w-[150px] rounded' src={defaut_user} alt="" />
            }
            <div>
              <h1 className='text-xl md:text-2xl text-slate-900 font-bold'>{username}</h1>
              <p></p>
            </div>
            
        </div>
    </div>
  )
}

export default UserDetails
