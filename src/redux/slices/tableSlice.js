import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mainTableData: [],
    clonedTables: {},
}

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