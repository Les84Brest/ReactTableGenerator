import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MAIN_TABLE_ID } from '../config';

export interface EmployeeData {
    workerName: string,
    surname: string,
    age: string,
    city: string | null,
    id?: string
}

export interface TablesState {
    tables: { [index: string]: EmployeeData[] },
    editTableId: string,
    editRowId: string
}

type AddTablePayload = {
    tableId: string,
    tableRow: EmployeeData
}

type DeleteRowPayload = {
    tableId: string,
    rowId: string
}

type UpdateRowPayload = DeleteRowPayload & { tableRow: EmployeeData }


export const initialState: TablesState = {
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
        addTableRow(state, action: PayloadAction<AddTablePayload>) {
            const { tableId, tableRow } = action.payload;
            tableRow.id = (state.tables[tableId].length + 1) + '';
            state.tables[tableId].push(tableRow)
        },

        copyTable(state, action: PayloadAction<EmployeeData[]>) {
            const newId = Object.keys(state.tables).length
            state.tables[newId] = action.payload
        },

        deleteTable(state, action: PayloadAction<string>) {
            delete state.tables[action.payload]
        },

        deleteRow(state, action: PayloadAction<DeleteRowPayload>) {
            const { tableId, rowId } = action.payload;

            state.tables[tableId] = state.tables[tableId].filter((row) => row.id !== rowId)
        },

        updateRow(state, action: PayloadAction<UpdateRowPayload>) {
            const { tableId, rowId, tableRow } = action.payload;

            const rowIndex = state.tables[tableId].findIndex((item) => item.id === rowId)

            state.tables[tableId][rowIndex] = { ...tableRow, id: rowId }
            state.editRowId = ''
            state.editTableId = ''
        },

        setEditTableId(state, action: PayloadAction<string>) {
            state.editTableId = action.payload
        },

        setEditRowId(state, action: PayloadAction<string>) {
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