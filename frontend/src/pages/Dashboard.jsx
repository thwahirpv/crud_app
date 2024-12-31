import React from 'react'
import NavBar from '../components/commen/NavBar'
import UsersTable from '../components/admin/UsersTable'
import Search from '../components/admin/Search'

const Dashboard = () => {
  return (
    <>
        <NavBar />
        <div className='w-full min-h-[100vh] bg-gradient-to-r from-slate-50 to-sky-100 flex flex-col justify- items-center py-8'> 
            <Search />
            <UsersTable />
        </div>
    </>
  )
}

export default Dashboard
