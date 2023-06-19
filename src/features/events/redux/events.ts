import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import moment from 'moment'
import { request } from '../../../shared/utils/request'
import { Events, EventsDataResponse, mappedEvents } from '../types'
import { mapEventsData } from '../utils/utils'

type Params = {
  sportId: string
  categoryId: string
  tournamentId: string
}

type InitialState = {
  events: mappedEvents | null
  nonMappedEvents: Events | null
  isLoading: boolean
  error: string | undefined
  activeOutcomeId: number[]
}

const initialState: InitialState = {
  events: null,
  nonMappedEvents: null,
  isLoading: false,
  error: '',
  activeOutcomeId: [],
}

export const fetchEvents = createAsyncThunk(
  'content/fetchEvents',
  async (params: Params) => {
    const today = moment().add('day').format('YYYY-MM-DD')
    const twoWeeksFromToday = moment().add(14, 'day').format('YYYY-MM-DD')

    const eventConfig = {
      dataFormat: {
        events: 'array',
      },
    }

    const { sportId, categoryId, tournamentId } = params

    const eventfilters = {
      ...(sportId && { sportId }),
      ...(categoryId && { categoryId }),
      ...(tournamentId && { tournamentId }),
      from: `${today}T00:00:00`,
      to: `${twoWeeksFromToday}T00:00:00`,
    }

    const nonMappedEvent = await request<EventsDataResponse>('events', {
      config: eventConfig,
      filters: eventfilters,
    })
    return nonMappedEvent
  },
)

export const eventSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    getActiveOutcomeId: (state, action) => {
      if (state.activeOutcomeId.includes(action.payload)) {
        state.activeOutcomeId = state.activeOutcomeId.filter(
          (activeId) => activeId !== action.payload,
        )
      } else {
        state.activeOutcomeId.push(action.payload)
      }
    },
    removeActiveOutcomeId: (state, action) => {
      if (state.activeOutcomeId.includes(action.payload)) {
        state.activeOutcomeId = state.activeOutcomeId.filter(
          (activeId) => activeId !== action.payload,
        )
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.isLoading = false
      state.events = mapEventsData(action.payload.events)
      state.nonMappedEvents = action.payload.events
    })
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
})

export const { getActiveOutcomeId, removeActiveOutcomeId } = eventSlice.actions

export default eventSlice.reducer
