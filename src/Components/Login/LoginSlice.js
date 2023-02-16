import { createSlice } from "@reduxjs/toolkit";

const KEY_AUTHENTICATED = 'authenticated';
export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        authenticated: localStorage[KEY_AUTHENTICATED] !== undefined,
    },
    reducers: {
        authenticate: (state) => {
            state.authenticated = true;
            localStorage.setItem(KEY_AUTHENTICATED, true);
        },
        logout: (state) => {
            state.authenticated = false;
            localStorage.removeItem(KEY_AUTHENTICATED);
        },
    }
});

export const {authenticate, logout} = loginSlice.actions;

export default loginSlice.reducer;
