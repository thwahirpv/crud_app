import React from 'react'
import { Routes, Route } from "react-router-dom"
import Dashboard from '../pages/Dashboard'
import EditUser from '../pages/EditUser'
import CreateUser from '../pages/CreateUser'

const AdminRoute = () => {
  return (
    <>
        <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/edit' element={<EditUser />} />
            <Route path="/create" element={<CreateUser />} />
        </Routes>
    </>
  )
}

export default AdminRoute
