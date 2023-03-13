import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from './navigation'
import isSelectedReducer from './selected'

export default configureStore({
    reducer: {
        navigation: navigationReducer,
        isSelected: isSelectedReducer
    }
})