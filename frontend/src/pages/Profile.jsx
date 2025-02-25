import React from "react";
import UserDetails from "../components/commen/UserDetails";
import NavBar from "../components/commen/NavBar";
import UploadProfile from "../components/user/UploadProfile";

const Profile = () => {
  return (
    <>
      <NavBar />
      <div className="w-full h-screen bg-gradient-to-r from-slate-50 to-sky-100 flex flex-col items-center justify-center space-y-14">
        <UserDetails />
        <UploadProfile />
      </div>
    </>
  );
};

export default Profile;
