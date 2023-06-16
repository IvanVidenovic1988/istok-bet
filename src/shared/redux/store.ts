import { configureStore } from '@reduxjs/toolkit'
import navigationReducer from '../../features/navigation/redux/navigation'
import sidebarDataReducer from '../../features/sidebar/redux/sidebar'
import eventsDataReducer from '../../features/events/redux/events'
import ticketDataReducer from '../../features/ticket/redux/ticket'
import singleEventDataReducer from '../../features/events/redux/singleEvent'

export default configureStore({
  reducer: {
    navigation: navigationReducer,
    sidebarData: sidebarDataReducer,
    eventsData: eventsDataReducer,
    singleEventData: singleEventDataReducer,
    ticket: ticketDataReducer,
  },
})
