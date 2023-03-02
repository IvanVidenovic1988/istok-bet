import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from './navigation' // moz ga krstis kako oces
import ticketReducer from './ticket'
import isSelectedReducer from './selected'

export default configureStore({
    reducer: {
        navigation: navigationReducer,
        ticket: ticketReducer,
        isSelected: isSelectedReducer
    }
})