import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import moment from "moment";
import { request } from '../../../shared/utils/request';
import { mapSidebarData } from '../utils/utils';
import { SidebarData, SidebarDataResponse } from '../types';

type InitialState = {
    sports: SidebarData;
    isLoading: boolean;
    error: string | undefined;
    isSidebarOpen: boolean;
}

const initialState: InitialState = {
    sports: [],
    isLoading: false,
    error: '',
    isSidebarOpen: false
}

export const fetchContent = createAsyncThunk(
    'content/fetchContent',
    async () => {
        const today = moment().add('day').format("YYYY-MM-DD")
        const twoWeeksFromToday = moment().add(14, 'day').format("YYYY-MM-DD")

        return await request<SidebarDataResponse>('meta', `filter[from]=${today}T00:00:00&filter[to]=${twoWeeksFromToday}T00:00:00`);
    }
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchContent.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchContent.fulfilled, (state, action) => {
            state.isLoading = false
            state.sports = mapSidebarData(action.payload.sports)
        })
        builder.addCase(fetchContent.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    },
})

export const { toggleSidebar, hideSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer