import React, { useContext, useState } from 'react'
import default_user from "../../assets/images/user.png"
import { Link, useNavigate } from "react-router-dom"
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { userLogout } from '../../feature/authSlice'; 
import { ContextProvider } from '../../context/Context';



const NavBar = () => {
  const [ logOutShow, setLogOutShow ] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { profile } = useContext(ContextProvider)
  console.log(profile, 'from navbar')

  const handleLogOut = () => {
    dispatch(userLogout())
    navigate('/login')
  }
  return (
    <div className='w-full bg-sky-400'>
        <div className='w-full flex justify-between items-center py-4 px-14'>
            <h1 className='text-white font-bold text-xl xs:text-2xl md:text-3xl'>CRUD</h1>
            <div className='relative flex items-center justify-center space-x-2'>
              <Link to='/profile'>
                {
                  profile ? <img className='w-[50px] rounded cursor-pointer' src={profile} alt='user' /> 
                  : 
                  <img className='w-[50px] rounded-full cursor-pointer' src={default_user} alt="user" /> 
                }
                  
              </Link>
              <button
              onClick={() => setLogOutShow(!logOutShow)}>
                {
                  logOutShow ? <IoMdArrowDropup size={20} /> : <IoMdArrowDropdown size={20} />
                }
              </button>
             
              {
                logOutShow && (
                  <div className='absolute top-[80px] right-0 bg-sky-400 w-[150px] rounded shadow-md'>
                    <ul className='flex flex-col space-y-4 p-3'>
                      <li className='text-slate-900 font-semibold text-sm'>
                      <Link to='/profile' state={{from: '/home'}}>
                          Profile
                      </Link>
                      </li>
                      <li className='text-slate-900 font-semibold text-sm'>
                        <button 
                          onClick={handleLogOut}
                          className='py-2 px-3 rounded bg-sky-200 text-slate-900 text-xs'>
                            Log Out
                        </button>
                      </li>
                    </ul>
                  </div>
                )
              }
              
            </div>
        </div>
    </div>
  )
}

export default NavBar
