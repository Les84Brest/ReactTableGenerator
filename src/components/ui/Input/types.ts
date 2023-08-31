import { InputValidationCb } from '../Select/types';

export type Validation = {
    [idx: string]: number | boolean
}

export interface InputProps {
    id: string,
    className?: string,
    validations: Validation,
    validationStatus: InputValidationCb,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    resetInput: boolean,
    type: string,
    placeholder: string
}