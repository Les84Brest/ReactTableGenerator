import { configureStore } from '@reduxjs/toolkit'
import tableReducer from './slices/tableSlice'
import modalReducer from './slices/modalSlice'

export const store = configureStore({
    reducer: {
        table: tableReducer,
        modal: modalReducer
    },
})