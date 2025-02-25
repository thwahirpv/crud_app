import React from "react"
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import UserRoute from "./routes/UserRoute"
import AdminRoute from "./routes/AdminRoute"
import AuthCheck from "./components/commen/AuthCheck"
import Register from "./pages/Register"


function App() {
  

  return (
    <>
        <Routes>
          <Route path="/register" element={ 
            <AuthCheck >
              <Register />
            </AuthCheck>
            } />
          <Route path="/login" element={
            <AuthCheck>
              <Login />
            </AuthCheck>
          } />
          <Route path="/*" element={<UserRoute />} />
          <Route path="/admin/*" element={<AdminRoute />} />
        </Routes>
    </>
  )
}

export default App
