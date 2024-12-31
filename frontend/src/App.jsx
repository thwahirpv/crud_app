import React from "react"
import { Routes, Route } from "react-router-dom"
import Form from "./components/commen/Form"
import UserRoute from "./routes/UserRoute"
import AdminRoute from "./routes/AdminRoute"


function App() {
  

  return (
    <>
      <Routes>
        <Route path="/register" element={<Form url={"/"} role='register' />} />
        <Route path="/login" element={<Form url={"/"} role='login' />} />
        <Route path="/*" element={<UserRoute />} />
        <Route path="/admin*" element={<AdminRoute />} />
      </Routes>
    </>
  )
}

export default App
