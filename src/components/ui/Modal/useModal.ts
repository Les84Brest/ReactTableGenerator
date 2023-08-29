import { useAppDispatch, useAppSelector } from '../../../hook';
import { openModal, closeModal } from '../../../redux/slices/modalSlice'

export default function useModal() {

    const dispatcher = useAppDispatch()
    const isOpen: boolean = useAppSelector((state) => state.modal.isModalOpen)

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