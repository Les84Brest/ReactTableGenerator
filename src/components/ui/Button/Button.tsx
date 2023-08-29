import React, {FC, ReactNode} from "react"
import cn from 'classnames'

interface ButtonProps {
    children?: ReactNode,
    onClick: () => void,
    className?: string,
    disabled?: boolean,
    active?: boolean,
}

export const Button:FC<ButtonProps> = ({
    children, onClick, className, disabled, active, ...attrs
}) => {

    const classes: string = cn('btn', className, { active })

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

