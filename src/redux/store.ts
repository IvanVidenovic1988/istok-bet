import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from './navigation' // moz ga krstis kako oces

export default configureStore({
    reducer: {
        navigation: navigationReducer
    }
})