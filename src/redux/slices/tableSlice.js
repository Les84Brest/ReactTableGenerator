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

        copyTable (state, action) {
            const newId = Object.keys(state.tables).length
            state.tables[newId] = action.payload
        },

        deleteTable(state, action) {
            delete state.tables[action.payload]
        }
    },
})


export const { addTableRow, copyTable, deleteTable } = tableSlice.actions

export default tableSlice.reducer