import { createSlice } from '@reduxjs/toolkit'


type InitialState = {
    isSubnavActive: boolean;
}

const initialState: InitialState = {
    isSubnavActive: false
}

export const isSelectedSlice = createSlice({
    name: "isSubnavActive",
    initialState,
    reducers: {
        setSubnavToActive: (state) => {
            state.isSubnavActive = true
        },
        setSubnavToInactive: (state) => {
            state.isSubnavActive = false
        },
    }
})

export const { setSubnavToActive, setSubnavToInactive } = isSelectedSlice.actions;

export default isSelectedSlice.reducer;