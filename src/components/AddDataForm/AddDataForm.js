import React from "react";

const AddDataForm = () => {

    return (<div className="add-data-form">
        <input className="form-input add-data-form__input" type="text" placeholder="Name"></input>
        <input className="form-input add-data-form__input" type="text" placeholder="Surname"></input>
        <input className="form-input add-data-form__input" type="number" placeholder="Age"></input>

        <div className="select add-data-form__select">
            <div className="select__header">
                <span className="select__current">City</span>
                <div className="select__icon"></div>
            </div>
            <ul className="select__options">
                <li className="select__option-item">Riga</li>
                <li className="select__option-item">Daugavpils</li>
                <li className="select__option-item">Jūrmala</li>
                <li className="select__option-item">Ventspils</li>
            </ul>
        </div>
        <button className="btn btn-submit" disabled >add</button>
    </div>);

}
export default AddDataForm;
