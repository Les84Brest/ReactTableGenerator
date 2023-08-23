import { useState, useEffect, useRef } from "react";


export default function useValidation(value, validations) {

    // if validation rule value return true it means check falls

    const [isEmpty, setIsEmpty] = useState(false);
    const [minWidthError, setMinWidthError] = useState(false);
    const [lessThan, setLessThan] = useState(false);
    const [moreThan, setMoreThan] = useState(false);

    const errorMsgArr = useRef([])

    useEffect(() => {
        errorMsgArr.current = []
        for (const validation in validations) {

            switch (validation) {

                case 'isEmpty':
                    if (value) {
                        setIsEmpty(false)
                        break
                    }

                    errorMsgArr.current.push('Empty value')
                    setIsEmpty(true)

                    break
                case 'minWidth':
                    if (value.length < validations[validation]) {
                        errorMsgArr.current.push(`Length > ${validations[validation]}`)
                        setMinWidthError(true)

                        break
                    }
                    setMinWidthError(false)
                    break
                case 'minValue':
                    if (value && parseInt(value) < validations[validation]) {
                        setLessThan(true)
                        errorMsgArr.current.push(`Age > ${validations[validation]}`)
                        break
                    }
                    setLessThan(false)
                    break
                case 'maxValue':
                    if (value && parseInt(value) > validations[validation]) {
                        setMoreThan(true)
                        errorMsgArr.current.push(`Age < ${validations[validation]}`)
                        break
                    }
                    setMoreThan(false)
                    break
                default:
                    break;
            }
        }
    }, [value])

    const errorMessageText = errorMsgArr.current.join('. ')

    const isValid = !isEmpty && !minWidthError && !moreThan && !lessThan

    return { isValid, errorMessageText }
}