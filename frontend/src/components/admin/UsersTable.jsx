import React, { useContext, useEffect } from "react";
import Users from "./Users";
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { usersList } from "../../feature/userListSlice";
import { ContextProvider } from "../../context/Context";
import useDebounce from "../../hook/useDebounce";
import PuffLoader from "react-spinners/PuffLoader";

const UsersTable = () => {
  const navigate = useNavigate();
  const { users, isLoading, error } = useSelector((state) => state.usersList);
  const disparch = useDispatch();
  const { searchTXT } = useContext(ContextProvider);
  const deBounce = useDebounce(searchTXT, 500);

  useEffect(() => {
    disparch(usersList(searchTXT));
  }, [deBounce]);

  const createRedirect = () => {
    navigate("/admin/create");
  };

  return (
    <div className="relative w-[80%] sm:w-[70%] h-[500px] md:w-[40%] rounded px-6 py-5 space-y-3  mt-5">
      <div className="relative border-b border-b-gray-400 py-4">
        <h1 className="font-bold text-xl md:text-2xl text-center text-gray-900">
          Users
        </h1>
        <button
          onClick={createRedirect}
          className="absolute right-2 top-0 bottom-0"
        >
          <IoIosAddCircle className="text-4xl text-green-500 cursor-pointer" />
        </button>
      </div>
      <div className="relative h-full overflow-scroll smooth-scroll scrollbar-none space-y-3">
        {!users.length && (
          <p className="text-red-500 text-xs md:text-sm font-semibold text-center ">
            No user found!
          </p>
        )}
        {users.map((user) => (
          <Users key={user.id} user={user} />
        ))}

        {error && (
          <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center rounded">
            <p className="text-red-500 text-xs md:text-sm font-semibold">
              {error || "Fetching Failed!"}
            </p>
          </div>
        )}
      </div>
      {isLoading && (
        <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center rounded">
          <PuffLoader color="#0ea5e9" loading={true} />
        </div>
      )}
    </div>
  );
};

export default UsersTable;
