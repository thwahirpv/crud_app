import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/authSlice"
import usersListReducer from "../feature/userListSlice"
import updateUserReducer from "../feature/updateUserSlice"
import deleteUserReducer from "../feature/deleteUserSlice";


const store = configureStore({
    reducer:{
        auth: authReducer,
        usersList: usersListReducer,
        updateUser: updateUserReducer,
        deleteUser: deleteUserReducer
    }
})

export default store