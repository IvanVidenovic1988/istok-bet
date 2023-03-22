import { createSlice } from '@reduxjs/toolkit'


type InitialState = {
    sidebarState: boolean;
}

const initialState: InitialState = {
    sidebarState: false
}

export const isSidebarSelectedSlice = createSlice({
    name: "showSidebar",
    initialState,
    reducers: {
        sidebarToggle: (state) => {
            state.sidebarState = !state.sidebarState
        },
        sidebarFalse: (state) => {
            state.sidebarState = false
        },
    }
})

export const { sidebarToggle, sidebarFalse } = isSidebarSelectedSlice.actions;

export default isSidebarSelectedSlice.reducer;