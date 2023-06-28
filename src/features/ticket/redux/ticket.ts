import { createSlice } from '@reduxjs/toolkit'

export type TicketItem = {
  id: number
  name: string
  marketsName: string
  marketsSpecialValue: number
  tip: string
  odd: number
  outcomeId: number
}

type InitialState = {
  ticketItems: { [name: string]: TicketItem[] }
  isTicketOpen: boolean
}

const initialState: InitialState = {
  ticketItems: {},
  isTicketOpen: false,
}

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    addToTicket: (state, action) => {
      if (!state.ticketItems[action.payload.name]) {
        state.ticketItems[action.payload.name] = []
      }
      const ticketOddAlreadyAdded =
        state.ticketItems[action.payload.name].filter(
          (ticketItem) => ticketItem.outcomeId === action.payload.outcomeId,
        ).length > 0
      if (!ticketOddAlreadyAdded) {
        state.ticketItems[action.payload.name].push(action.payload)
      } else {
        state.ticketItems[action.payload.name] = state.ticketItems[
          action.payload.name
        ].filter((ticketItem) => ticketItem.outcomeId !== action.payload.outcomeId)
      }
    },
    removeFromTicket: (state, action) => {
      state.ticketItems[action.payload.name] = state.ticketItems[
        action.payload.name
      ].filter((ticketItem) => ticketItem.outcomeId !== action.payload.outcomeId)
      if (state.ticketItems[action.payload.name].length === 0)
        delete state.ticketItems[action.payload.name]
    },
    toggleTicket: (state) => {
      state.isTicketOpen = !state.isTicketOpen
    },
    closeTicket: (state) => {
      state.isTicketOpen = false
    },
  },
})

export const { addToTicket, removeFromTicket, toggleTicket, closeTicket } =
  ticketSlice.actions

export default ticketSlice.reducer
