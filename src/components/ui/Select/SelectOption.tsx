
import { FC } from 'react';
import type { SelectOptionProps } from './types';

const SelectOption: FC<SelectOptionProps> = ({
    onClick, value, children
}) => {
    const handleOnClick = () => {
        onClick(value)
    }

    return (
        <li
            className="select__option-item"
            onClick={handleOnClick}
        >{children}
        </li>
    );

}
export default SelectOption;

