import React, {useEffect} from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types'

const Modal = ({ isActive, modalClose, children }) => {
    const bodyNode = document.body;

    useEffect(() => {
        if (isActive) {
            bodyNode.classList.add('popup--open')
            return
        }

        bodyNode.classList.remove('popup--open')

    }, [isActive])

    const handlePopupClick = (e) => {
        e.stopPropagation()
    }

    const renderModalContent = () => {
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

Modal.propTypes = {
    isActive: PropTypes.bool,
    modalClose: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.string,
    ])
}

Modal.defaultProps = {
    modalOpen: () => { },
    modalClose: () => { },
    children: ''
}