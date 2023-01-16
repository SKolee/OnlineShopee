import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "../reducers/productsReducer";

const store=configureStore({
    reducer:rootReducers
})

export default store