import { configureStore } from '@reduxjs/toolkit'
import navigationReducer from '../../features/navigation/redux/navigation'
import sidebarDataReducer from '../../features/sidebar/redux/sidebar'
import eventsDataReducer from '../../features/events/redux/events'

export default configureStore({
  reducer: {
    navigation: navigationReducer,
    sidebarData: sidebarDataReducer,
    eventsData: eventsDataReducer,
  },
})
