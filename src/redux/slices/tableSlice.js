import { createSlice } from '@reduxjs/toolkit'
import { MAIN_TABLE_ID } from '../config';


const initialState = {
    tables: {
        [MAIN_TABLE_ID]: []
    }
}

export const tableSlice = createSlice({
    name: 'tables',
    initialState,
    reducers: {
        addTableRow (state, action) {
            const { tableId, tableRow } = action.payload;

            state.tables[tableId].push(tableRow)
        },
    },
})


export const { addTableRow } = tableSlice.actions

export default tableSlice.reducer