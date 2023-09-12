import { useEffect, FC, ReactElement, } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    isActive: boolean,
    modalClose: () => void,
    children: ReactElement
}

const Modal: FC<ModalProps> = ({ isActive, modalClose, children }) => {
    const bodyNode: HTMLElement = document.body;

    useEffect(() => {
        if (isActive) {
            bodyNode.classList.add('popup--open')
            return
        }

        bodyNode.classList.remove('popup--open')

    }, [isActive, bodyNode.classList])

    const handlePopupClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    const renderModalContent = (): ReactElement => {
        return (
            <div className="popup" onClick={modalClose}>
                <div className="popup__body" onClick={handlePopupClick}>
                    {children}
                </div>
            </div>
        )
    }

    return (isActive && createPortal(
        renderModalContent(), bodyNode
    ))
}
export default Modal;
