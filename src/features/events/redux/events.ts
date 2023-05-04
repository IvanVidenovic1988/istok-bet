import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import moment from 'moment'
import { request } from '../../../shared/utils/request'
import { EventsDataResponse, mappedEvents } from '../types'
import { mapEventsData } from '../utils/utils'

type Params = {
  sportId: string
  categoryId: string
  tournamentId: string
}

type InitialState = {
  events: mappedEvents | null
  isLoading: boolean
  error: string | undefined
}

const initialState: InitialState = {
  events: null,
  isLoading: false,
  error: '',
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

    console.log('params: ', params)
    return await request<EventsDataResponse>('events', {
      config: eventConfig,
      filters: eventfilters,
    })
  },
)

export const sidebarSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.isLoading = false
      state.events = mapEventsData(action.payload.events)
    })
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
})

export default sidebarSlice.reducer
