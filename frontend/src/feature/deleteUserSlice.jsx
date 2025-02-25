import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../utils/api"


const deleteUser = createAsyncThunk(
    "deleteUser/user",
    async (userID , { rejectWithValue }) => {
        try {
            const response = await api.delete(`users/${userID}/`)
            // console.log(response)
            return response.data
        } catch(err) {
            return rejectWithValue( err.response?.data?.detail || {message: "delete failed!"})
        }
    }
)

const deleteUserSlice = createSlice({
    name: 'deleteUser', 
    initialState: {
        isLoading: false,
        error: null
    },
    reducers: {
        adminDelete: (state, action) => {
            state.error = action.payload
        },
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(deleteUser.pending, (state, action) => {
            state.isLoading = true
            state.error = null
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = null
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }
})


export default deleteUserSlice.reducer
export const { adminDelete, clearError } = deleteUserSlice.actions
export { deleteUser}