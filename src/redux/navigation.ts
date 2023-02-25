import { createSlice } from '@reduxjs/toolkit'

export type NavigationState = "sportsko-kladjenje" | 'kladjenje-uzivo'

type InitialState = {
    navigationState: NavigationState;
}

const initialState: InitialState = {
    navigationState: "sportsko-kladjenje"
}

export const navigationSlice = createSlice({
    name: "showNav",
    initialState,
    reducers: {
        setNavigation: (state, action) => {
            state.navigationState = action.payload;
        }
    }
})

export const { setNavigation } = navigationSlice.actions;

export default navigationSlice.reducer;