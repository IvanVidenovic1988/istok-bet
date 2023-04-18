import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from './navigation'
import sidebarDataReducer from './sidebar'

export default configureStore({
    reducer: {
        navigation: navigationReducer,
        sidebarData: sidebarDataReducer
    }
})