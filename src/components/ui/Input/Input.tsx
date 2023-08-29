import { useState, useEffect, FC } from "react"
import cn from 'classnames'
import useValidation from "./useValidation"
import { InputProps } from "./types"


export const Input: FC<InputProps> = ({
    id, className, resetInput, validations, onChange, value, validationStatus, ...attrs
}) => {

    const { isValid, errorMessageText } = useValidation(value, validations)
    const [isUsed, setIsUsed] = useState(false);

    const classes = cn('form-input', className)

    useEffect(() => {
        validationStatus(isValid)
    }, [isValid, validationStatus])

    //reset Input state for new usage
    useEffect(() => {
        resetInput && setIsUsed(false)
    }, [resetInput])

    const handleOnBlur = () => { setIsUsed(true) }

    return (
        <div className="form-input__wrap">
            <input
                name={id}
                className={classes}
                {...attrs}
                onBlur={handleOnBlur}
                value={value}
                onChange={onChange}
            />
            {(isUsed && !isValid) &&
                <span className="form-input__validation">{errorMessageText}</span>}
        </div>
    )
}
export default Input

