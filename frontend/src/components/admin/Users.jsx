import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import default_avatar from "../../assets/images/user.png"



const Users = () => {
    const navigate = useNavigate()
    const editHandler = () => {
        navigate('/admin/edit')
    }
  return (
    <div className='flex items-center justify-between px-4 py-4 bg-sky-100 rounded'>
      <div className='flex items-center justify-center space-x-2'>
        <img className='w-[40px]' src={default_avatar} alt="" />
        <h1 className='font-semibold text-lg'>Thwahir</h1>
      </div>
      <div className='flex space-x-5'>
        <button 
        onClick={editHandler}
        className='text-blue-500'>
            <FaEdit size={18} className='cursor-pointer' />
        </button>
        <button className='text-red-500'>
            <MdDelete size={18} className='cursor-pointer' />
        </button>
      </div>
    </div>
  )
}

export default Users
