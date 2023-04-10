import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MappedSports, Sports } from './types/data';
import moment from "moment";

type InitialState = {
    sports: MappedSports | null;
    isLoading: boolean;
    error: string | undefined;
    isSidebarOpen: boolean;
}


const initialState: InitialState = {
    sports: null,
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
        const { data } = await response.json();
        return data

    }
)

const mapSports = (sports: Sports): MappedSports => {
    const data = Object.values(sports).map((sport) => {
        return {
            id: sport.id,
            name: sport.name,
            position: sport.position,
            numberOfEvents: sport.numberOfEvents,
            categories: Object.values(sport.categories).map((category) => {
                return {
                    id: category.id,
                    name: category.name,
                    position: category.position,
                    numberOfEvents: category.numberOfEvents,
                    tournaments: Object.values(category.tournaments).map((tournament) => {
                        return {
                            id: tournament.id,
                            name: tournament.name,
                            position: tournament.position,
                            numberOfEvents: tournament.numberOfEvents
                        };
                    }),
                };
            }),
        };
    });

    const sortedData = data.sort((a, b) => a.position - b.position)

    return sortedData;
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
            state.sports = mapSports(action.payload.sports)
        })
        builder.addCase(fetchContent.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    },
})

export const { toggleSidebar, hideSidebar } = contentSlice.actions;

export default contentSlice.reducer