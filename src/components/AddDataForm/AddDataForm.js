import React, { useState, useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import Input from "../ui/Input/Input"
import Select from "../ui/Select/Select"
import Button from "../ui/Button/Button"
import useManageData, { MODE_EDIT } from "./useManageData"
import cn from 'classnames'

const CITY_DATA = [
    {
        id: 1,
        name: 'Riga'
    },
    {
        id: 2,
        name: 'Daugavpils'
    },
    {
        id: 3,
        name: 'Jūrmala'
    },
    {
        id: 4,
        name: 'Ventspils'
    },
]

const AddDataForm = ({ mode, submitButtonLabel, className }) => {
    const { saveData, getEditRowData } = useManageData(mode);

    const classes = cn('add-data-form', className)

    const editData = getEditRowData()

    const [name, setName] = useState('')
    const [isNameValid, setIsNameValid] = useState(false)
    const [surname, setSurname] = useState('')
    const [isSurnameValid, setIsSurnameValid] = useState(false)
    const [age, setAge] = useState('')
    const [isAgeValid, setIsAgeValid] = useState(false)
    const [city, setCity] = useState(null)
    const [resetInput, setResetInput] = useState(false);

    const [isDataValid, setIsDataValid] = useState(false)

    // validation callbacks
    const cbSetNameValidStatus = useCallback((isValid) => setIsNameValid(isValid), [])
    const cbSetSurnameValidStatus = useCallback((isValid) => setIsSurnameValid(isValid), [])
    const cbSetAgeValidStatus = useCallback((isValid) => setIsAgeValid(isValid), [])

    //reset input validation state
    useEffect (() => {
        resetInput && setResetInput(false)
    }, [name, surname, age, city])

    useEffect(() => {
        (isNameValid && isSurnameValid && isAgeValid && city)
            ? setIsDataValid(true)
            : setIsDataValid(false)
    }, [city, isNameValid, isSurnameValid, isAgeValid])

    useEffect(() => {
        if (!editData) {
            return
        }

        if (mode === MODE_EDIT) {
            const { workerName, surname, age, city } = editData;

            setName(workerName)
            setSurname(surname)
            setAge(age)

            const [cityItem] = CITY_DATA.filter(item => item.name === city)
            setCity(cityItem)
        }

    }, [editData])

    const resetForm = () => {
        setName('')
        setSurname('')
        setAge('')
        setCity(null)
        setResetInput(true)
    }

    const handleChooseCity = useCallback((value) => { setCity(value) }, [])
    const handleSubmit = () => {
        const data = { workerName: name, surname, age, city: city.name }
        saveData(data)
        resetForm()
    }

    return (<div className={classes}>
        <Input
            id='name'
            className="add-data-form__input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setSurname(e.target.value)}
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
            onChange={(e) => setAge(e.target.value)}
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


AddDataForm.propTypes = {
    mode: PropTypes.string,
    submitButtonLabel: PropTypes.string,
    className: PropTypes.string
}