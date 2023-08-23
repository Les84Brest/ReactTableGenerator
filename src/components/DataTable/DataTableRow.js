import React from "react";
import PropTypes from "prop-types";
import { Button } from '../ui/Button/Button';
import cn from 'classnames'

export const DataTableRow = (props) => {
    const { isEmpty,
        onPressDelete,
        onPressEdit,
        id,
        workerName,
        surname,
        age,
        city } = props

    const rowClass = cn('table__row', {'table__row--empty': isEmpty}) 

    const handleEdit = () => {
        onPressEdit(id)
    }

    const handleDelete = () => {
        onPressDelete(id)
    }

    return (
        <tr className={rowClass}>
            <td data-cell="Name" className="table__cell table__cell--name">{workerName}</td>
            <td data-cell="Surname" className="table__cell table__cell--surname">{surname}</td>
            <td data-cell="Age" className="table__cell table__cell--name">{age}</td>
            <td data-cell="City" className="table__cell table__cell--city">{city}</td>
            <td className="table__cell table__cell--buttons">
                {
                    !isEmpty && (<div className="table__buttons-wrap">

                        <Button
                            className="btn__edit"
                            onClick={handleEdit}
                        >Edit</Button>
                        <Button
                            className="btn btn__del"
                            onClick={handleDelete}
                        >Delete</Button>
                    </div>)
                }

            </td>
        </tr>
    )
}
export default DataTableRow;

DataTableRow.propTypes = {
    id: PropTypes.number,
    isEmpty: PropTypes.bool,
    workerName: PropTypes.string,
    surname: PropTypes.string,
    age: PropTypes.string,
    city: PropTypes.string,
    onPressDelete: PropTypes.func,
    onPressEdit: PropTypes.func
}

DataTableRow.defaultProps = {
    isEmpty: false,
    workerName: '',
    surname: '',
    age: '',
    city: '',
    onPressDelete: () => { },
    onPressEdit: () => { },
}