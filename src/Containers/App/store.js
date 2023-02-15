import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "Components/Login/LoginSlice";

export default configureStore({
    reducer: {
        login: LoginReducer
    },
});
