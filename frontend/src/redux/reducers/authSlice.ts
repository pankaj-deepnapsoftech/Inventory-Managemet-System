import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: undefined,
    firstname: undefined,
    lastname: undefined,
    email: undefined,
    phone: undefined,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userExists: (state, action)=>{
            state.id = action.payload._id;
            state.firstname = action.payload.first_name;
            state.lastname = action.payload.last_name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
        },
        userNotExists: (state)=>{
            state.id = undefined;
            state.firstname = undefined;
            state.lastname = undefined;
            state.email = undefined;
            state.phone = undefined;
        }
    }
});

export default authSlice;
export const {userExists, userNotExists} = authSlice.actions;