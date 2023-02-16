import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "Components/Login/LoginSlice";
import CertificationReducer from "Components/Home/Certification/CertificationSlice";

export default configureStore({
    reducer: {
        login: LoginReducer,
        certification: CertificationReducer
    },
});
