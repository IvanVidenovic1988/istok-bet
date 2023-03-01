import { createSlice } from '@reduxjs/toolkit'


type InitialState = {
    ticketState: boolean;
}

const initialState: InitialState = {
    ticketState: false
}

export const ticketSlice = createSlice({
    name: "showTicket",
    initialState,
    reducers: {
        setTicket: (state) => {
            state.ticketState = !state.ticketState
        }
    }
})

export const { setTicket } = ticketSlice.actions;

export default ticketSlice.reducer;