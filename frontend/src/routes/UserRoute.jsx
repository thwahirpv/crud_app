import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Profile from "../pages/Profile"

const UserRoute = () => {
  return (
    <>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    </>
  )
}

export default UserRoute
