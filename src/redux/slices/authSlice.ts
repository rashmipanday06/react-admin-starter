import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface User{
    name:string;
    email:string;
}
interface AuthState{
    user:User| null;
    token:string| null
}
const initialState:AuthState={
    user:JSON.parse(localStorage.getItem("user") || "null"),
    token:localStorage.getItem('token')|| null
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginSuccess:(state, action:PayloadAction<{user:User; token:string}>)=>{
            state.user=action.payload.user;
            state.token=action.payload.token;
            localStorage.setItem("user", JSON.stringify(state.user));
            localStorage.setItem("token", JSON.stringify(state.token))
        },
        logout:(state)=>{
            state.user=null;
            state.token=null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    },
});
export const{loginSuccess, logout}=authSlice.actions;
export default authSlice.reducer;