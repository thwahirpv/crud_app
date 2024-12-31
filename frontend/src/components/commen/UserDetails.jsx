import React from 'react'
import defaut_user from "../../assets/images/user.png"

const UserDetails = () => {
  return (
    <div>
        <div className='flex flex-col items-center justify-center'>
            <img className='w-[150px] rounded' src={defaut_user} alt="" />
            <h1 className='text-xl md:text-2xl text-slate-900 font-bold'>Thwhair</h1>
        </div>
    </div>
  )
}

export default UserDetails
