import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Form = ({url, role}) => {
    let title = role === "register" ? 'Register' : role === "login" ? "Login" : "Create User";
    const [formData, setFormData] = useState({username: '', email: '', password: ''})

    const handleFormChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    

    return (
        <div className='w-full h-screen bg-gradient-to-r from-slate-50 to-sky-100 flex justify-center items-center'>
           <div className='w-[70%] md:w-[32%] xs:w-[50%] py-9 flex flex-col justify-center items-center rounded space-y-2 border border-slate-200'>
            <h1 className='text-slate-900 font-bold text-xl md:text-2xl text-center'>{title}</h1>
            <form className='w-full flex flex-col p-10' action="">
                <div className='space-y-5 w-full'>
                    <input
                    onChange={handleFormChange}
                    name='username' 
                    className='py-3 px-3 rounded w-full outline-none text-slate-900'               
                    type="text" placeholder='Username' />
                    <input
                    onChange={handleFormChange}
                    name='email' 
                    className='py-3 px-3 rounded w-full outline-none text-slate-900'               
                    type="text" placeholder='Email' />
                    <input
                    onChange={handleFormChange}
                    name='password' 
                    className='py-3 px-3 rounded w-full outline-none text-slate-900'
                    type="password" placeholder='Password' />
                    </div>
                <button className='py-2 bg-sky-300 rounded font-semibold text-slate-900 mt-14 hover:bg-sky-400'>
                    {title}
                </button>
            </form>

            {
               role !== 'create' && (
                role === 'register' ? (
                    <p className='text-slate-600'>
                        Already have an account? <Link to='/login' className='text-sky-600' >Login</Link>
                    </p>
                ) : (
                    <p className='text-slate-600'>
                        Don't have an account? <Link to='/register' className='text-sky-600' >Register</Link>
                    </p>
                )
               )
            }
           </div>
        </div>
    );
};

export default Form;