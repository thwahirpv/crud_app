import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../utils/api"



const updateUser = createAsyncThunk(
    "updateUser/user",
    async (userData, {rejectWithValue}) => {
        try {
            const response = await api.patch(`users/${userData.id}/`, userData)
            console.log(response)
            return response.data
        } catch (err) {
            return rejectWithValue(
                err.response?.data || { message: "update failed!"}
            )
        }
    }
)


const updateUserSlice = createSlice({
    name: updateUser, 
    initialState: {
        user: null, 
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder 
        .addCase(updateUser.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = null
            state.user = action.payload
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }
})



export default updateUserSlice.reducer
export { updateUser }
