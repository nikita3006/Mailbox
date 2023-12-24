import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";

const Reduxstore = configureStore ({
    reducer : {
        auth : authSlice.reducer
    }
})

export default Reduxstore;