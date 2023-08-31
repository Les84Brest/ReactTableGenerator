import React, { FC } from "react";
import { Button } from '../ui/Button/Button';
import cn from 'classnames'
import { EmployeeData } from "../../redux/slices/tableSlice";

export enum RowState {
    'EMPTY_ROW' = 'emptyRow',
    'FILLED_ROW' = 'filledRow'
}

type CommonDataTableProps<T> = {
    onPressDelete?: (rowId: string) => void,
    onPressEdit?: (rowId: string) => void,
    rowState: T,
}

type EmptyDataTableProps = CommonDataTableProps<RowState.EMPTY_ROW> & Partial<EmployeeData>

type FilledDataTableRowProps = CommonDataTableProps<RowState.FILLED_ROW> & EmployeeData

type ComponentProps = EmptyDataTableProps | FilledDataTableRowProps

export const DataTableRow: FC<ComponentProps> = (props) => {
    const { rowState,
        onPressDelete,
        onPressEdit,
        id = '',
        workerName = '',
        surname = '',
        age = '',
        city = '' } = props

    const rowClass = cn('table__row', { 'table__row--empty': rowState === RowState.EMPTY_ROW })

    const handleEdit = () => {
        if (id && onPressEdit) {
            onPressEdit(id)
        }
    }

    const handleDelete = () => {
        if (id && onPressDelete) {
            onPressDelete(id)
        }
    }

    return (
        <tr className={rowClass} role="row">
            <td role="cell" data-cell="Name" className="table__cell table__cell--name">{workerName}</td>
            <td role="cell" data-cell="Surname" className="table__cell table__cell--surname">{surname}</td>
            <td role="cell" data-cell="Age" className="table__cell table__cell--name">{age}</td>
            <td role="cell" data-cell="City" className="table__cell table__cell--city">{city}</td>
            <td role="cell" className="table__cell table__cell--buttons">
                {
                    (rowState === RowState.FILLED_ROW) && (<div className="table__buttons-wrap">

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

