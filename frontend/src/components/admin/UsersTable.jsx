import React from 'react'
import Users from './Users'
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


const UsersTable = () => {
    const navigate = useNavigate()
    const createRedirect = () => {
        navigate('/admin/create')
    }
  return (
    <div className='w-[80%] sm:w-[70%] h-[500px] md:w-[40%] rounded px-6 py-5 space-y-3  mt-5'>
        <div className='relative border-b border-b-gray-400 py-4'>
            <h1 className='font-bold text-xl md:text-2xl text-center text-gray-900'>Users</h1>
            <button 
            onClick={createRedirect}
            className='absolute right-2 top-0 bottom-0'>
                <IoIosAddCircle className='text-4xl text-green-500 cursor-pointer' />
            </button>
        </div>
        <div className='h-full overflow-scroll smooth-scroll scrollbar-none space-y-3'>
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
        </div>
        
        
        
        
    </div>
  )
}

export default UsersTable
