import React from 'react'
import NavBar from '../components/commen/NavBar'

const Home = () => {
  return (
    <div className='w-full h-screen bg-gradient-to-r from-slate-50 to-sky-100'>
        <NavBar />
        <h1 className='text-center mt-10 text-2xl font-bold text-slate-900'>Welcome Thwahir</h1>
    </div>
  )
}

export default Home
