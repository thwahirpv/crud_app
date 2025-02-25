import React from 'react'
import { Routes, Route } from "react-router-dom"
import Dashboard from '../pages/Dashboard'
import EditUser from '../pages/EditUser'
import CreateUser from '../pages/CreateUser'
import AdminProtected from '../components/admin/AdminProtected'
import IndividualUser from '../components/admin/IndividualUser'

const AdminRoute = () => {
  return (
    <>
        <Routes>
            <Route path='/dashboard' element={
              <AdminProtected>
                <Dashboard />
              </AdminProtected>
              } />
            <Route path='/edit/:id' element={
              <AdminProtected>     
                <EditUser /> 
              </AdminProtected>
            } />
            <Route path="/create" element={
              <AdminProtected>
                <CreateUser />
              </AdminProtected>
              } />
            <Route path='/user/:id' element={
              <AdminProtected>
                <IndividualUser />
              </AdminProtected>
            }>

            </Route>
        </Routes>
    </>
  )
}

export default AdminRoute
