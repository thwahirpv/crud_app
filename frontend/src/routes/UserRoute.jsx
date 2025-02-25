import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Profile from "../pages/Profile"
import Protected from "../components/user/Protected"

const UserRoute = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={
              <Protected>
                <Home />
              </Protected>
            } />
            <Route path="/profile" element={
              <Protected>
                <Profile />
              </Protected>
            } />
        </Routes>
    </>
  )
}

export default UserRoute
