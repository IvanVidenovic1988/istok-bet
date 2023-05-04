import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import moment from 'moment'
import { request } from '../../../shared/utils/request'
import { mapSidebarData } from '../utils/utils'
import { SidebarData, SidebarDataResponse } from '../types'

type InitialState = {
  sports: SidebarData
  isLoading: boolean
  error: string | undefined
  isSidebarOpen: boolean
}

const initialState: InitialState = {
  sports: [],
  isLoading: false,
  error: '',
  isSidebarOpen: false,
}

export const fetchSidebarSports = createAsyncThunk(
  'content/fetchSidebarSports',
  async () => {
    const today = moment().add('day').format('YYYY-MM-DD')
    const twoWeeksFromToday = moment().add(14, 'day').format('YYYY-MM-DD')

    const filters = {
      from: `${today}T00:00:00`,
      to: `${twoWeeksFromToday}T00:00:00`,
    }

    return await request<SidebarDataResponse>('meta', {
      filters,
    })
  },
)

export const sidebarSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    hideSidebar: (state) => {
      state.isSidebarOpen = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSidebarSports.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchSidebarSports.fulfilled, (state, action) => {
      state.isLoading = false
      state.sports = action.payload.sports ? mapSidebarData(action.payload.sports) : []
    })
    builder.addCase(fetchSidebarSports.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
})

export const { toggleSidebar, hideSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer
