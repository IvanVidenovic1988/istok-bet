import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from '../../feature/navbar/redux/navigation'
import sidebarDataReducer from '../../feature/sidebar/redux/sidebar'

export default configureStore({
    reducer: {
        navigation: navigationReducer,
        sidebarData: sidebarDataReducer
    }
})