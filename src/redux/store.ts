import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from './navigation' // moz ga krstis kako oces
import ticketReducer from './ticket'

export default configureStore({
    reducer: {
        navigation: navigationReducer,
        ticket: ticketReducer
    }
})