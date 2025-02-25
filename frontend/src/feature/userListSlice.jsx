import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../utils/api";
import { steps } from "framer-motion";

const usersList = createAsyncThunk('userList/user', async (searchTXT, {rejectWithValue}) => {
    try {
        const response = await api.get(`users?param=${searchTXT}`)
        return response.data
    } catch(err) {
        return rejectWithValue(
            err?.response?.data?.detail || "Fetching users failed!"
        )
    }
})

const getUser = createAsyncThunk(
    "getUser/user",
    async (userID, {rejectWithValue}) => {
        try {
            const response = await api.get(`users/${userID}`)
            console.log(response)
            return response.data
        } catch (err) {
            console.log(err)
            return rejectWithValue(
                "Fetching user failed!"
            )
        }
    }
)


const usersListSlice = createSlice({
    name: 'userList',
    initialState: {
        users: [],
        user: null,
        isLoading: false,
        error: null
    },
    reducers: {
        clearUser: (state) => {
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(usersList.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(usersList.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = null
            state.users = action.payload
        })
        .addCase(usersList.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        .addCase(getUser.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload
            state.error = null
        })
        .addCase(getUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }
})

export default usersListSlice.reducer
export const { clearUser } = usersListSlice.actions
export { usersList, getUser }

