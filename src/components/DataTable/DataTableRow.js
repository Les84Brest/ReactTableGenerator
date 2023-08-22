import React from "react";
import PropTypes from "prop-types";
import { Button } from '../ui/Button/Button';

export const DataTableRow = (props) => {
    const { isEmpty,
        onPressDelete,
        onPressEdit,
        id,
        workerName,
        surname,
        age,
        city } = props

    const handleEdit = () => {
        onPressEdit(id)
    }

    const handleDelete = () => {
        onPressDelete(id)
    }

    return (
        <tr className="table__row">
            <td className="table__cell">{workerName}</td>
            <td className="table__cell">{surname}</td>
            <td className="table__cell">{age}</td>
            <td className="table__cell">{city}</td>
            <td className="table__cell">
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