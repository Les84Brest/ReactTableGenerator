import React, { useState, useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import Input from "../ui/Input/Input"
import Select from "../ui/Select/Select"
import Button from "../ui/Button/Button"
import useManageData, { MODE_EDIT } from "./useManageData"

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

const AddDataForm = ({ mode, submitButtonLabel }) => {
    const { saveData, getEditRowData } = useManageData(mode);

    const editData = getEditRowData()

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [age, setAge] = useState('')
    const [city, setCity] = useState(null)

    useEffect(() => {
        if(!editData){
            return
        }

        if(mode === MODE_EDIT) {
            const {workerName, surname, age, city  } = editData;

            setName(workerName)
            setSurname(surname)
            setAge(age)

            const [cityItem] = CITY_DATA.filter(item => item.name === city)
            setCity(cityItem)
        }

    }, [editData])

    const disableSubmit = (name && surname && age && city) ? false : true

    const resetForm = useCallback(() => {
        setName('')
        setSurname('')
        setAge('')
        setCity(null)
    }, [])

    const handleChooseCity = useCallback((value) => { setCity(value) }, [])
    const handleSubmit = () => {
        const data = { workerName: name, surname, age, city: city.name }
        saveData(data)
        resetForm()
    }

    return (<div className="add-data-form">
        <Input
            id='name'
            className="form-input add-data-form__input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />

        <Input
            id='surname'
            className="form-input add-data-form__input"
            type="text"
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
        />

        <Input
            id='age'
            className="form-input add-data-form__input"
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
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
            disabled={disableSubmit}
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
}