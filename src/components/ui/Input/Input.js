import React from "react"
import PropTypes from 'prop-types'
import classNames from 'classnames'

export const Input = ({
    id, className, ...attrs
}) => {

    const classes = classNames('input', className)

return (
    <input
        name={id}
        className={classes}
        {...attrs}
    />
)
}


Input.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,

}

Input.defaultProps = {
    className: ''
}