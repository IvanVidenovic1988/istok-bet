import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from './navigation' // moz ga krstis kako oces
import isSelectedReducer from './selected'

export default configureStore({
    reducer: {
        navigation: navigationReducer,
        isSelected: isSelectedReducer
    }
})