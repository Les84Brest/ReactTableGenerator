import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import classNames from 'classnames'
import useValidation from "./useValidation"

export const Input = ({
    id, className,resetInput, validations, onChange, value, validationStatus, ...attrs
}) => {

    const { isValid, errorMessageText } = useValidation(value, validations)
    const [isUsed, setIsUsed] = useState(false);

    const classes = classNames('form-input', className)

    useEffect(() => {
        validationStatus(isValid)
    }, [isValid])

    //reset Input state for new usage
    useEffect(()=> {
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

Input.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    validations: PropTypes.object,
    validationStatus: PropTypes.func,
    value: PropTypes.string,
    onChange: PropTypes.func,
    resetInput: PropTypes.bool
}

Input.defaultProps = {
    className: ''
}

