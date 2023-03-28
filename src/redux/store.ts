import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from './navigation'
import isSubnavActiveReducer from './subnavState'
import sidebarDataReducer from './sidebar'

export default configureStore({
    reducer: {
        navigation: navigationReducer,
        isSubnavActive: isSubnavActiveReducer,
        sidebarData: sidebarDataReducer
    }
})