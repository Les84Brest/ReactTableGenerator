import { configureStore } from "@reduxjs/toolkit"
import tableReducer from '../../redux/slices/tableSlice'
import modalReducer from '../../redux/slices/modalSlice'
import { Provider } from "react-redux"
import { ReactNode } from "react"

export const renderWithRedux= (component: ReactNode, initialState: any) => {
    const store = createReduxStore(initialState);
    return (
        <Provider store={store}>
            {component}
        </Provider>
    )
}

export const createReduxStore = (initialState = {}) => {
    return configureStore({
        reducer: {
            table: tableReducer,
            modal: modalReducer
        },
        preloadedState: initialState,
    })
}