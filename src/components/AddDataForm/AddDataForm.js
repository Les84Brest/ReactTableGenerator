import React, { useState, useCallback } from "react";
import { Input, Select, Button } from '../ui'

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

const AddDataForm = () => {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [age, setAge] = useState('')
    const [city, setCity] = useState(null)

    const disableSubmit = (name && surname && age && city) ? false : true

    const resetForm = useCallback(() => {
        setName('')
        setSurname('')
        setAge('')
        setCity(null)
    }, [])

    const handleChooseCity = useCallback((value) => { setCity(value) }, [])

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
            onClick={resetForm}
        >Add</Button>
    </div>);

}
export default AddDataForm;
