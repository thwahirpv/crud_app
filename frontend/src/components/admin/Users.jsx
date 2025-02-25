import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import default_avatar from "../../assets/images/user.png";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  adminDelete,
  clearError,
} from "../../feature/deleteUserSlice";
import { usersList } from "../../feature/userListSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { MdAdminPanelSettings } from "react-icons/md";

const Users = ({ user }) => {
  const navigate = useNavigate();
  const { id, username, email, is_superuser, profile } = user;
  const dispatch = useDispatch();
  const [deleteID, setDeleteID] = useState(null);
  const { isLoading, error } = useSelector((state) => state.deleteUser);

  useEffect(() => {
    dispatch(clearError());
    setDeleteID(null);
  }, []);

  const editHandler = () => {
    navigate(`/admin/edit/${id}`, { state: { user } });
  };

  const handleDelete = async () => {
    setDeleteID(id);
    if (!is_superuser) {
      await dispatch(deleteUser(id))
        .then((res) => {
          dispatch(usersList(''));
          setDeleteID(null);
        })
        .catch((err) => {
          console.log(err);
          setDeleteID(null);
        });
    } else {
      dispatch(adminDelete("You can't delete an admin!"));
    }
  };

  const handleAdminDelete = () => {
    dispatch(clearError());
    setDeleteID(null);
  };

  return (
    <div className="relative flex items-center justify-between px-4 py-4 bg-sky-100 rounded">
      <div className="flex items-center justify-center space-x-2">
        {
          profile ? 
          <Link to={`/admin/user/${id}`} state={id}>
            <img className="w-[40px] rounded cursor-pointer" src={`http://127.0.0.1:8000/${profile}`} alt="" />
          </Link>
          :
          <Link to={`/admin/user/${id}`}>
            <img className="w-[40px] rounded-full cursor-pointer" src={default_avatar} alt="" />
          </Link>
        }
        <div>
          <div className="flex items-center space-x-1">
            {is_superuser && (
              <span className="text-md md:text-lg">
                <MdAdminPanelSettings />
              </span>
            )}
            <h1 className="font-semibold text-lg flex">{username}</h1>
          </div>
          <p className="text-xs text-gray-500">{email}</p>
        </div>
      </div>
      <div className="flex space-x-5">
        <button onClick={editHandler} className="text-blue-500">
          <FaEdit size={18} className="cursor-pointer" />
        </button>
        <button onClick={handleDelete} className="text-red-500">
          <MdDelete size={18} className="cursor-pointer" />
        </button>
      </div>

      {(deleteID == id && isLoading) && (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-gray-300 opacity-70 rounded flex items-center justify-center">
          <ClipLoader color="#991b1b" size={25} loading={isLoading} />
        </div>
      )}
      {(error && deleteID == id) && (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-gray-300 opacity-70 rounded flex items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-1">
            <p className="text-xs md:text-sm font-semibold text-red-500">
              {error || error?.message}
            </p>
            <button
              onClick={handleAdminDelete}
              className="py-1 px-3 bg-red-600 rounded text-xs text-white cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
