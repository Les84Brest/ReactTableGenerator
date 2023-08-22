import React, { useState, useEffect } from "react"
import SelectOption from "./SelectOption"
import ClickOutside from "../ClickOutside/ClickOutside"
import PropTypes from 'prop-types'
import cn from 'classnames'

export const Select = ({
    currentLabel, itemsList, onChoose, className, value, ...attrs
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [currentName, setCurrentName] = useState('')

    const classes = cn('select', className, { 'selected': value, 'is-active': isOpen })

    const onOptionClick = (value) => {
        onChoose(value)
    };

    useEffect(() => {
        if (value) {
            setCurrentName(value.name)
            setIsOpen(false)
            return
        }

        setCurrentName(currentLabel)
    }, [value])



    return (
        <ClickOutside onClick={() => setIsOpen(false)}>
            <div
                className={classes}
                onClick={() => { setIsOpen(prev => !prev) }}
                {...attrs}
            >
                <div className="select__header">
                    <span className="select__current">{currentName}</span>
                    <div className="select__icon"></div>
                </div>
                {isOpen && (

                    <ul className="select__options">
                        {itemsList.map((item) => {
                            return <SelectOption
                                key={item.id}
                                value={item}
                                onClick={onOptionClick}>
                                {item.name}
                            </SelectOption>
                        })}
                    </ul>

                )
                }
            </div>
        </ClickOutside>
    )
}

export default Select

Select.propTypes = {
    currentLabel: PropTypes.string,
    itemsList: PropTypes.arrayOf(PropTypes.object),
    onChoose: PropTypes.func,
    className: PropTypes.string,
    value: PropTypes.object
}

Select.defaultProps = {
    currentLabel: 'Please select value',
    itemsList: [],
    onChoose: () => { },
    className: ''
}