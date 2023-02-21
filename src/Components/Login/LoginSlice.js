import { createSlice } from "@reduxjs/toolkit";
import Login from "./Login";

const KEY_AUTHENTICATED = 'authenticated';
export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        authenticated: localStorage[KEY_AUTHENTICATED] !== undefined,
    },
    reducers: {
        authenticate: (state) => {
            localStorage.setItem(KEY_AUTHENTICATED, true);
            return {
                ...state,
                authenticated: true
            };
        },
        logout: (state) => {
            localStorage.removeItem(KEY_AUTHENTICATED);
            return {
                ...state,
                authenticated: false
            };
        },
    }
});

export const {authenticate, logout} = loginSlice.actions;

export default loginSlice.reducer;
