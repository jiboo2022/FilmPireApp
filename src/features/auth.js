import { PlaylistAddOutlined } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:{},
    isAuthenticated: false,
    sessionID: "",
}


const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{

        setUser:(state, action) =>{
            state.user = action.payload;
            state.isAuthenticated = true;
            state.sessionID = localStorage.getItem('session_id');

            localStorage.setItem('account_id', action.payload.id)

            console.log(action.payload)
            

        }
    }

})

export const { setUser } = authSlice.actions;

export default authSlice.reducer;

export const userSelector = (state) => state.user ;