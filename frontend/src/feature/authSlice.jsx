import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api";


const userRegistration = createAsyncThunk('auth/register', async (userData, {rejecthWithValue}) => {
    try {
        const response = await api.post('users/', userData)
        return response.data
    } catch (error) {
        return rejecthWithValue(
            error.response?.data || {message: "Registration failed"}
        )
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null, 
        isLoading: false,
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(userRegistration.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(userRegistration.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload
        })
        .addCase(userRegistration.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }
})

export default authSlice.reducer
export { userRegistration}