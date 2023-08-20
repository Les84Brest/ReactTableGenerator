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
            {...attrs}
        >{children}</button>
    )
}

Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool
}

Button.defaultProps = {
    children: 'Default button',
    disabled: false,
    onClick: () => { },
    className: '',
    active: false
}