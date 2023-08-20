import React from "react"
import PropTypes from 'prop-types'

const SelectOption = ({
    onClick, value, children
}) => {

    const handleOnClick = () => {
        onClick(value)
    }

    return <li
        className="select__option-item"
        onClick={handleOnClick}
    >{children}
    </li>


}
export default SelectOption;

SelectOption.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.string,
    value: PropTypes.object
}

SelectOption.defaultProps = {
    onClick: () => { },
    children: '',
    value: null
}