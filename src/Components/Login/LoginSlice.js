import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        authenticated: false,
    },
    reducers: {
        authenticate: (state) => {
            state.authenticated = true;
        },
        logout: (state) => {
            state.authenticated = false;
        },
    }
});

export const {authenticate, logout} = loginSlice.actions;

export default loginSlice.reducer;
