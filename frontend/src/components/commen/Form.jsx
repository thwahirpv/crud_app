import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { userRegistration, userLogin, createUser } from '../../feature/authSlice'
import ScaleLoader from "react-spinners/ScaleLoader";
import { ACCESS_TOKEN, REFRESH_TOKEN, USERNAME, PROFILE } from "../../constants/token"
import { ContextProvider } from '../../context/Context';

const Form = ({role}) => {

    const [formData, setFormData] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { setUsername } = useContext(ContextProvider)
    const { isLoading, error, user } = useSelector((state) => state.auth)
    let title = role === "register" ? 'Register' : role === "login" ? "Login" : "Create User";


    const handleFormChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if(role == "register"){
            await dispatch(userRegistration(formData)).then((res) => {
                if(res.type == 'auth/register/fulfilled'){
                    navigate('/login')
                }
            }).catch((error) => {
                console.log(error)
            })
        }else if(role == "login"){
            await dispatch(userLogin(formData)).then((res ) => {
                if(res.type === 'auth/login/fulfilled'){
                    setUsername(res.payload.username)
                    localStorage.setItem(ACCESS_TOKEN, res.payload.access)
                    localStorage.setItem(REFRESH_TOKEN, res.payload.refresh)
                    localStorage.setItem(USERNAME, res.payload.username)
                    localStorage.setItem(PROFILE, res.payload.profile)
                    console.log(res, 'from login')
                    if(res.payload.is_superuser){
                        navigate('/admin/dashboard', {state: {from: '/dashboard'}})
                    }else{
                        navigate('/', {state: {from: '/login'}})
                    }
                }
            }).catch((error) => {
                console.log(error)
            })

        }else if(role = "create"){
            await dispatch(createUser(formData)).then((res) => {
                if(res.type === 'createUser/user/fulfilled'){
                    navigate('/admin/dashboard')
                }
            }).catch((err) => {
                console.log(err, 'from form err part')
            })
        }
    }
    

    return (
        <div className='w-full h-screen bg-gradient-to-r from-slate-50 to-sky-100 flex justify-center items-center'>
           <div className='w-[70%] md:w-[32%] xs:w-[50%] py-[60px] flex flex-col justify-center items-center rounded space-y-2 border border-slate-200'>
            <h1 className='text-slate-900 font-bold text-xl md:text-2xl text-center'>{title}</h1>
            <form className='w-full flex flex-col p-10' onSubmit={handleFormSubmit}>
                <div className='space-y-5 w-full'>
                    <input
                    onChange={handleFormChange}
                    name='username' 
                    className='py-3 px-3 rounded w-full outline-none text-slate-900'               
                    type="text" placeholder='Username' />
                    {
                        (role == "create" || role == "register") && (
                            <input
                            onChange={handleFormChange}
                            name='email' 
                            className='py-3 px-3 rounded w-full outline-none text-slate-900'               
                            type="text" placeholder='Email' />
                        )
                    }
                    
                    <input
                    onChange={handleFormChange}
                    name='password' 
                    className='py-3 px-3 rounded w-full outline-none text-slate-900'
                    type="password" placeholder='Password' />
                </div>
                {
                    error && (
                        <p className='text-red-500 text-start text-[10px] sm:text-sm mt-2'>
                            {error.username || error + ' check your credentials'}
                        </p>
                    )
                }
                <button type='submit' className='py-2 bg-sky-300 rounded font-semibold text-slate-900 mt-14 hover:bg-sky-400'>
                    {
                        isLoading ? (
                            <ScaleLoader
                            color='#0f172a'
                            loading={isLoading} 
                            height={22}
                            width={4}
                        /> 
                            ) : 
                            title
                    }
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