import React, { useState } from "react";
import NavBar from "../components/commen/NavBar";
import UserDetails from "../components/commen/UserDetails";
import { useLocation, useNavigate } from "react-router-dom";
import { updateUser } from "../feature/updateUserSlice";
import { useDispatch, useSelector } from "react-redux";
import ScaleLoader from "react-spinners/ScaleLoader";

const EditUser = () => {
  const location = useLocation();
  const { id, username, email } = location.state?.user;
  const [ formData, setFormData ] = useState({id: id, username: username, email: email}) 
  const { user, isLoading, error } = useSelector((state) => state.updateUser);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleFromChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
      console.log(formData)
  }

  const handleUpdate = (e) => {
      e.preventDefault()
      dispatch(updateUser(formData)).then((res) => {
        navigate('/admin/dashboard')
      }).catch((err) => {
        console.log(err)
      })
  };

  return (
    <>
      <NavBar />
      <div className="w-full min-h-[100vh] bg-gradient-to-r from-slate-50 to-sky-100 flex flex-col justify-start items-center py-5">
        <div className="w-[60%] sm:w-[80%] flex flex-col justify-center items-center">
          <UserDetails username={username} />
          <form
            className="mt-16 w-[60%] sm:w-[80%] md:w-[30%] flex flex-col justify-center space-y-4"
            onSubmit={handleUpdate}
            action=""
          >
            <input
              className="w-[100%] sm:w-[80%] md:w-[100%] py-3 px-3 rounded outline-none text-slate-900"
              onChange={handleFromChange}
              value={formData.username}
              name="username"
              type="text"
              placeholder="Username"
            />
            <input
              className="w-[100%] sm:w-[80%] md:w-[100%] py-3 px-3 rounded outline-none text-slate-900"
              value={formData.email}
              onChange={handleFromChange}
              name="email"
              type="email"
              placeholder="Email"
            />
            {
              error && (
                <p className="text-red-500 text-start text-xs ">
                    {error.username || error.email || error || "Update failed!"}
                </p>
              )
            }
            <button
              type="submit"
              className="py-2 px-3 bg-green-500 text-white font-bold rounded cursor-pointer"
            >
              {isLoading ? (
                <ScaleLoader
                  color="#0f172a"
                  loading={isLoading}
                  height={22}
                  width={4}
                />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUser;
