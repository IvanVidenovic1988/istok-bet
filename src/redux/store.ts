import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from './navigation'
import isSelectedReducer from './selected'
import sidebarStateReducer from './sidebarState'
import sidebarDataReducer from './sidebarData'

export default configureStore({
    reducer: {
        navigation: navigationReducer,
        isSelected: isSelectedReducer,
        sidebarState: sidebarStateReducer,
        sidebarData: sidebarDataReducer
    }
})