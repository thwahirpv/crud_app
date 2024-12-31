import React from 'react'
import UserDetails from '../components/commen/UserDetails'
import NavBar from '../components/commen/NavBar'
import UploadProfile from '../components/user/UploadProfile'

const Profile = () => {
  return (
    <div className='w-full h-screen bg-gradient-to-r from-slate-50 to-sky-100 flex flex-col items-center justify-center space-y-14'>
        <NavBar />
        <UserDetails />
        <UploadProfile />
    </div>
  )
}

export default Profile
