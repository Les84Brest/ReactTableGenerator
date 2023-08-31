import React, { useState, useEffect, FC } from "react"
import SelectOption from "./SelectOption"
import ClickOutside from "../ClickOutside/ClickOutside"
import cn from 'classnames'
import { SelectProps, SelectItem } from "./types"


export const Select: FC<SelectProps> = ({
    currentLabel, itemsList, onChoose, className = '', value, ...attrs
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [currentName, setCurrentName] = useState<string>('')

    const classes = cn('select', className, { 'selected': value, 'is-active': isOpen })

    const onOptionClick = (value: SelectItem) => {
        onChoose(value)
    };

    useEffect(() => {
        if (value) {
            setCurrentName(value.name)
            setIsOpen(false)
            return
        }

        setCurrentName(currentLabel)
    }, [value, currentLabel])



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
                        {itemsList.map((item: SelectItem) => {
                            return (
                                <SelectOption
                                    key={item.id}
                                    value={item}
                                    onClick={onOptionClick}>
                                    {item.name}
                                </SelectOption>
                            );
                        })}
                    </ul>
                )
                }
            </div>
        </ClickOutside>
    )
}

export default Select
