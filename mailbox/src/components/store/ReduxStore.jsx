import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import MailSlice from "./MailSlice";

const Reduxstore = configureStore ({
    reducer : {
        auth : authSlice.reducer,
        mails : MailSlice.reducer
    }
})

export default Reduxstore;