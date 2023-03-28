import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BettingData } from './types/data';
import moment from "moment";

type InitialState = {
    contents: BettingData | null;
    isLoading: boolean;
    error: string | undefined;
    isSidebarOpen: boolean;
}


const initialState: InitialState = {
    contents: null,
    isLoading: false,
    error: '',
    isSidebarOpen: false
}

export const fetchContent = createAsyncThunk(
    'content/fetchContent',
    async () => {
        const today = moment().add('day').format("YYYY-MM-DD")
        const twoWeeksFromToday = moment().add(14, 'day').format("YYYY-MM-DD")
        const url = `https://sports-sm-distribution-api.de-2.nsoftcdn.com/api/v1/meta?dataFormat={"default":"object"}&language={"default":"sr-Latn"}&timezone=Europe/Belgrade&companyUuid=4f54c6aa-82a9-475d-bf0e-dc02ded89225&filter[from]=${today}T00:00:00&filter[to]=${twoWeeksFromToday}T00:00:00`

        const response = await fetch(url);
        const data = await response.json();
        return data.data
    }
)

export const contentSlice = createSlice({
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
            state.contents = action.payload
        })
        builder.addCase(fetchContent.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    },
})

export const { toggleSidebar, hideSidebar } = contentSlice.actions;

export default contentSlice.reducer