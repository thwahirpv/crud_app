import React, { useContext } from 'react'
import NavBar from '../components/commen/NavBar'
import { ContextProvider } from '../context/Context'


const Home = () => {
  const { username } = useContext(ContextProvider)
  return (
    <div className='w-full h-screen bg-gradient-to-r from-slate-50 to-sky-100'>
        <NavBar />
        <h1 className='text-center mt-10 text-2xl font-bold text-slate-900'>Welcome {username}</h1>
    </div>
  )
}

export default Home
