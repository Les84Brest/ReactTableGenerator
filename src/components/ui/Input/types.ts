export type Validation = {
    [index: string]: string
}

export interface InputProps {
    id: string,
    className?: string,
    validations: Validation,
    validationStatus: (isValid: boolean) => {},
    value: string,
    onChange: () => {},
    resetInput: boolean,
}