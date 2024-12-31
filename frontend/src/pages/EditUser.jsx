import React from "react";
import NavBar from "../components/commen/NavBar";
import UserDetails from "../components/commen/UserDetails";
import { IoMdCheckmark } from "react-icons/io";


const EditUser = () => {
  return (
    <>
      <NavBar />
      <div className="w-full min-h-[100vh] bg-gradient-to-r from-slate-50 to-sky-100 flex flex-col justify-start items-center py-5">
        <div className="w-[60%] sm:w-[50%] ">
          <UserDetails />
          <form className="mt-16 flex justify-center space-x-2" action="">
            <input
              className="w-[100%] sm:w-[80%] md:w-[40%] py-3 px-3 rounded outline-none text-slate-900"
              type="text"
              placeholder="Username"
            />
            <button className=" px-3 bg-green-500 text-white font-bold rounded cursor-pointer">
                <IoMdCheckmark />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUser;
