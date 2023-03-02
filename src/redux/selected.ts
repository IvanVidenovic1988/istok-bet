import { createSlice } from '@reduxjs/toolkit'


type InitialState = {
    selectedState: boolean;
}

const initialState: InitialState = {
    selectedState: false
}

export const isSelectedSlice = createSlice({
    name: "showTicket",
    initialState,
    reducers: {
        selectedStateTrue: (state) => {
            state.selectedState = true
        },
        selectedStateFalse: (state) => {
            state.selectedState = false
        },
    }
})

export const { selectedStateTrue, selectedStateFalse } = isSelectedSlice.actions;

export default isSelectedSlice.reducer;