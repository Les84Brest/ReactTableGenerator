import tableReducer, { copyTable, addTableRow, initialState, deleteTable } from './tableSlice';
import { MAIN_TABLE_ID } from '../config';


const populatedState = {
    ...initialState, tables: {
        [MAIN_TABLE_ID]: [
            {
                workerName: 'Joe',
                surname: 'Doe',
                age: '27',
                city: 'New York',
                id: '1'
            }
        ],
        '1': [
            {
                workerName: 'Some',
                surname: 'Else',
                age: '47',
                city: 'Paris',
                id: '1'
            }
        ]
    }
}

describe('Table slice tests', () => {

    const actionPayload =
    {
        tableId: MAIN_TABLE_ID,
        tableRow: {
            workerName: 'Joe',
            surname: 'Doe',
            age: '27',
            city: 'New York'
        }
    }
    test('add table row', () => {
        expect(tableReducer(initialState, addTableRow(actionPayload))).toEqual({
            tables: {
                [MAIN_TABLE_ID]: [
                    {
                        workerName: 'Joe',
                        surname: 'Doe',
                        age: '27',
                        city: 'New York',
                        id: '1'
                    }
                ]
            },
            editTableId: '',
            editRowId: ''
        });


    })
    test('copy table', () => {
        const rowsArray = [
            {
                workerName: 'Joe',
                surname: 'Doe',
                age: '27',
                city: 'New York',
                id: '1'
            },
            {
                workerName: 'Sarra',
                surname: 'Connor',
                age: '50',
                city: 'Chicago',
                id: '2'
            }
        ]

        expect(tableReducer(populatedState, copyTable(rowsArray))).toEqual({
            ...populatedState,
            tables: {
                ...populatedState.tables, '2': rowsArray
            }
        })
    })

    test('delete table', () => {

        const { 1: secondTable, ...clearedTables } = populatedState.tables

        expect(tableReducer(populatedState, deleteTable('1'))).toEqual({ ...populatedState, tables: clearedTables });
    })


})

