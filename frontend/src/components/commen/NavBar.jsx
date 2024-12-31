import React from 'react'
import default_user from "../../assets/images/user.png"
import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <div className='w-full bg-sky-400'>
        <div className='w-full flex justify-between items-center py-4 px-14'>
            <h1 className='text-white font-bold text-xl xs:text-2xl md:text-3xl'>CRUD</h1>
            <Link to='/profile'>
                <img className='w-[50px] rounded cursor-pointer' src={default_user} alt="User" />
            </Link>
        </div>
    </div>
  )
}

export default NavBar
