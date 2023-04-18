import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SidebarDataResponse, SidebarData, Sports } from './types/data';
import moment from "moment";
import { request } from '../utils/request';

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

        return await request<SidebarDataResponse>(`filter[from]=${today}T00:00:00&filter[to]=${twoWeeksFromToday}T00:00:00`);
    }
)

const sortByPosition = <T extends { position: number }>(sportsData: T[]) => {
    return sportsData.sort((a, b) => a.position - b.position)
}

const mapSidebarData = (sports: Sports): SidebarData => {
    return sortByPosition(Object.values(sports)).map((sport) => {
        return {
            ...sport,
            categories: sortByPosition(Object.values(sport.categories)).map((category) => {
                return {
                    ...category,
                    tournaments: sortByPosition(Object.values(category.tournaments))
                };
            }),
        };
    });
};

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
            state.sports = mapSidebarData(action.payload.sports)
        })
        builder.addCase(fetchContent.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    },
})

export const { toggleSidebar, hideSidebar } = contentSlice.actions;

export default contentSlice.reducer