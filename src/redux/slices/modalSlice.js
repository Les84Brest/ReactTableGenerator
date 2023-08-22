import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    isModalOpen: false
}

export const modalSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        openModal(state) {
            state.isModalOpen = true
        },

        closeModal(state) {
            state.isModalOpen = false
        },
    },
})


export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer