import { FC, useState, useCallback, useEffect } from "react"
import Input from "../ui/Input/Input"
import Select from "../ui/Select/Select"
import Button from "../ui/Button/Button"
import useManageData from "./useManageData"
import cn from 'classnames'
import { InputValidationCb, SelectItem } from "../ui/Select/types"
import { AddDataFormProps, FormMode } from './types';
import { EmployeeData } from "../../redux/slices/tableSlice"

const CITY_DATA: Array<SelectItem> = [
    {
        id: 1,
        name: 'London'
    },
    {
        id: 2,
        name: 'New York'
    },
    {
        id: 3,
        name: 'Paris'
    },
    {
        id: 4,
        name: 'Madrid'
    },
]

const AddDataForm: FC<AddDataFormProps> = ({ mode, submitButtonLabel, className }) => {
    const { saveData, getEditRowData } = useManageData(mode);

    const classes = cn('add-data-form', className);

    const editData = getEditRowData();

    const [name, setName] = useState<string>('');
    const [isNameValid, setIsNameValid] = useState<boolean>(false)
    const [surname, setSurname] = useState<string>('')
    const [isSurnameValid, setIsSurnameValid] = useState<boolean>(false)
    const [age, setAge] = useState<string>('')
    const [isAgeValid, setIsAgeValid] = useState<boolean>(false)
    const [city, setCity] = useState<SelectItem | null>(null)
    const [resetInput, setResetInput] = useState<boolean>(false)
    const [isDataValid, setIsDataValid] = useState<boolean>(false)

    // validation callbacks
    const cbSetNameValidStatus = useCallback<InputValidationCb>((isValid) => setIsNameValid(isValid), [])
    const cbSetSurnameValidStatus = useCallback<InputValidationCb>((isValid) => setIsSurnameValid(isValid), [])
    const cbSetAgeValidStatus = useCallback<InputValidationCb>((isValid) => setIsAgeValid(isValid), [])

    //reset input validation state
    useEffect(() => {
        resetInput && setResetInput(false)
    }, [name, surname, age, city, resetInput])

    useEffect(() => {
        (isNameValid && isSurnameValid && isAgeValid && city)
            ? setIsDataValid(true)
            : setIsDataValid(false)
    }, [city, isNameValid, isSurnameValid, isAgeValid])

    useEffect(() => {
        if (!editData) {
            return
        }

        if (mode === FormMode.MODE_EDIT) {
            const { workerName, surname, age, city } = editData;

            setName(workerName)
            setSurname(surname)
            setAge(age)

            const [cityItem] = CITY_DATA.filter(item => item.name === city)
            setCity(cityItem)
        }

    }, [editData, mode])

    const resetForm = () => {
        setName('')
        setSurname('')
        setAge('')
        setCity(null)
        setResetInput(true)
    }

    const handleChooseCity = useCallback((value: SelectItem) => { setCity(value) }, [])

    const handleSubmit = () => {
        const data: EmployeeData = { workerName: name, surname, age, city: city && city.name }
        saveData(data)
        resetForm()
    }

    return (
        <div className={classes}>
            <Input
                id='name'
                className="add-data-form__input"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }}
                validations={{ minWidth: 4, isEmpty: true }}
                validationStatus={cbSetNameValidStatus}
                resetInput={resetInput}
            />

            <Input
                id='surname'
                className="add-data-form__input"
                type="text"
                placeholder="Surname"
                value={surname}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSurname(e.target.value) }}
                validations={{ minWidth: 4, isEmpty: true }}
                validationStatus={cbSetSurnameValidStatus}
                resetInput={resetInput}
            />

            <Input
                id='age'
                className="add-data-form__input"
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAge(e.target.value) }}
                validations={{ isEmpty: true, minValue: 18, maxValue: 60 }}
                validationStatus={cbSetAgeValidStatus}
                resetInput={resetInput}
            />

            <Select
                itemsList={CITY_DATA}
                currentLabel='City'
                onChoose={handleChooseCity}
                value={city}
                className='add-data-form__select'
            />

            <Button
                className="btn-submit"
                disabled={!isDataValid}
                onClick={handleSubmit}
            >
                {submitButtonLabel}
            </Button>
        </div>);
}
export default AddDataForm;


