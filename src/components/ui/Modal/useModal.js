import { useDispatch, useSelector } from "react-redux"
import { openModal, closeModal } from '../../../redux/slices/modalSlice'

export default function useModal() {

    const dispatcher = useDispatch()
    const isOpen = useSelector((state) => state.modal.isModalOpen)

    return {
        isOpen,

        openModal() {
            dispatcher(openModal())
        },

        closeModal() {
            dispatcher(closeModal())
        }
    }
}