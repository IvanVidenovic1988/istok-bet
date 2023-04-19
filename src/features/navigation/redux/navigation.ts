import { createSlice } from '@reduxjs/toolkit'

export type NavigationState = "sportsko-kladjenje" | 'kladjenje-uzivo'

type InitialState = {
    navigationState: NavigationState;
    isSubnavActive: boolean;
}

const initialState: InitialState = {
    navigationState: "sportsko-kladjenje",
    isSubnavActive: false
}

export const navigationSlice = createSlice({
    name: "navigation",
    initialState,
    reducers: {
        setNavigation: (state, action) => {
            state.navigationState = action.payload;
        },
        setSubnavToActive: (state) => {
            state.isSubnavActive = true
        },
        setSubnavToInactive: (state) => {
            state.isSubnavActive = false
        },
    }
})

export const { setNavigation, setSubnavToActive, setSubnavToInactive } = navigationSlice.actions;

export default navigationSlice.reducer;