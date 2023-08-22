import { createSlice } from '@reduxjs/toolkit'
import { MAIN_TABLE_ID } from '../config';


const initialState = {
    tables: {
        [MAIN_TABLE_ID]: []
    },
    editTableId: '',
    editRowId: ''
}

export const tableSlice = createSlice({
    name: 'tables',
    initialState,
    reducers: {
        addTableRow(state, action) {
            const { tableId, tableRow } = action.payload;
            tableRow.id = state.tables[tableId].length + 1
            state.tables[tableId].push(tableRow)
        },

        copyTable(state, action) {
            const newId = Object.keys(state.tables).length
            state.tables[newId] = action.payload
        },

        deleteTable(state, action) {
            delete state.tables[action.payload]
        },

        deleteRow(state, action) {
            const { tableId, rowId } = action.payload;

            state.tables[tableId] = state.tables[tableId].filter((row) => row.id !== rowId)
        },

        updateRow(state, action) {
            const { tableId, rowId, tableRow } = action.payload;

            const rowIndex = state.tables[tableId].findIndex((item) => item.id === rowId)

            state.tables[tableId][rowIndex] = {...tableRow, id: rowId }
            state.editRowId = ''
            state.editTableId = ''
        },

        setEditTableId(state, action) {
            state.editTableId = action.payload
        },

        setEditRowId(state, action) {
            state.editRowId = action.payload
        }
    },
})


export const {
    addTableRow,
    copyTable,
    deleteTable,
    deleteRow,
    updateRow,
    setEditTableId,
    setEditRowId
} = tableSlice.actions

export default tableSlice.reducer