import React from "react"
import ClassNames from 'classnames'
import PropTypes from 'prop-types'

export const Button = ({
    children, onClick, className, disabled, active, ...attrs
}) => {

    const classes = ClassNames('btn', className, { active })

    return (
        <button
            className={classes}
            disabled={disabled}
            onClick={onClick}
            type="button"
            {...attrs}
        >{children}</button>
    )
}

export default Button

Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool
}

Button.defaultProps = {
    disabled: false,
    onClick: () => { },
    className: '',
    active: false
}