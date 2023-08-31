import { useState, useEffect, useRef } from "react";
import { Validation } from "./types";


export default function useValidation(
    value: string ,
    validations: Validation) {

    // if validation rule value return true it means check falls

    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const [minWidthError, setMinWidthError] = useState<boolean>(false);
    const [lessThan, setLessThan] = useState<boolean>(false);
    const [moreThan, setMoreThan] = useState<boolean>(false);

    const errorMsgArr = useRef<Array<string>>([])

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
                    if ((value as string).length < (validations[validation] as number)) {
                        errorMsgArr.current.push(`Length > ${validations[validation]}`)
                        setMinWidthError(true)
                        break
                    }
                    setMinWidthError(false)
                    break
                case 'minValue':
                    if (value && parseInt(value as string) < (validations[validation] as number)) {
                        setLessThan(true)
                        errorMsgArr.current.push(`Age > ${validations[validation]}`)
                        break
                    }
                    setLessThan(false)
                    break
                case 'maxValue':
                    if (value && parseInt(value) > (validations[validation] as number)) {
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
    }, [value, validations])

    const errorMessageText = errorMsgArr.current.join('. ')

    const isValid = !isEmpty && !minWidthError && !moreThan && !lessThan

    return { isValid, errorMessageText }
}