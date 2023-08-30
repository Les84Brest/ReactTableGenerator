export enum FormMode {
    MODE_ADD = "MODE_ADD",
    MODE_EDIT = "MODE_EDIT"
}

export interface AddDataFormProps {
    mode: FormMode,
    submitButtonLabel: string,
    className: string
}
