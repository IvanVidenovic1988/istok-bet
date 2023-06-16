import { createSlice } from '@reduxjs/toolkit'

export type Outcome = {
  active: number
  description: string
  id: number
  name: string
  odd: number
  outcome: number
  shortcut: string
}

export type Market = {
  active: number
  competitors: object
  favourite: false
  id: number
  marketGroups: number[]
  marketId: number
  name: string
  outcomes: { [id: number]: Outcome }
  specialValues: number
}

export type Competitor = {
  id: number
  name: string
  shortName: string
  teamId: number
  type: number
}

export type SingleEvent = {
  id: number
  name: string
  competitors: { [id: number]: Competitor }
  tournamentName: string
  date: string
  startsAt: string
  markets: { [id: number]: Market }
}

type InitialState = {
  singleEvent: SingleEvent | null
  isAllMarketsOpen: boolean
}

const initialState: InitialState = {
  singleEvent: null,
  isAllMarketsOpen: false,
}

const singleEventSlice = createSlice({
  name: 'singleEvent',
  initialState,
  reducers: {
    setAllMarketsForSingleEvent: (state, action) => {
      state.singleEvent = action.payload
    },
    openAllMarketsForSingleEvent: (state) => {
      state.isAllMarketsOpen = true
    },
    closeAllMarketsForSingleEvent: (state) => {
      state.isAllMarketsOpen = false
    },
  },
})

export const {
  setAllMarketsForSingleEvent,
  openAllMarketsForSingleEvent,
  closeAllMarketsForSingleEvent,
} = singleEventSlice.actions

export default singleEventSlice.reducer
