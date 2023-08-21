import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mainTableData: [],
    clonedTables: {},
}
// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes
export const tableSlice = createSlice({
    name: 'tables',
    initialState,
    reducers: {
        addLineToMainTable: (state, action) => {
            const { payload } = action;

            state.mainTableData.push(payload);
        }
    },
})


export const { addLineToMainTable } = tableSlice.actions

export default tableSlice.reducer