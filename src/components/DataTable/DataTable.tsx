import { FC, useCallback, useState, ReactNode } from "react"
import DataTableRow from "./DataTableRow"
import Button from "../ui/Button/Button"
import { MAIN_TABLE_ID } from "../../redux/config"
import useTable from "./useTable"
import Modal from "../ui/Modal/Modal"
import { EmployeeData } from "../../redux/slices/tableSlice"
import { RowState } from "./DataTableRow"

interface TableProps {
    tableId: string,
    tableData: EmployeeData[]
}


const DataTable: FC<TableProps> = ({ tableId, tableData }) => {
    const VISIBLE_ROWS = 8;

    const { copyTable, deleteTable, deleteRow, startEditRow } = useTable()
    const [isTableModalOpen, setIsTableModalOpen] = useState<boolean>(false);

    const cbDeleteRow = useCallback((rowId: string): void => {
        deleteRow(tableId, rowId)
    }, [tableId, deleteRow])

    const cbUpdateRow = useCallback((rowId: string): void => {
        startEditRow(tableId, rowId)
    }, [tableId, startEditRow])

    const renderTableRows = (): ReactNode => {
        // return placeholders only in case when we don't have data
        if (!tableData.length) {
            return Array(VISIBLE_ROWS)
                .fill('')
                .map((_, i) => {
                    return <DataTableRow
                        key={`${i}`}
                        rowState={RowState.EMPTY_ROW}
                    />
                });
        }

        const tableRows = tableData.map((row) => {
            return <DataTableRow
                key={`${row.id}item`}
                rowState={RowState.FILLED_ROW}
                onPressDelete={cbDeleteRow}
                onPressEdit={cbUpdateRow}
                {...row} />
        })

        return tableRows
    }

    const handleCopyTable = () => {
        copyTable(tableData)
    }

    const handleDeleteTable = () => {
        if (tableId === MAIN_TABLE_ID) {
            setIsTableModalOpen(true)
            return
        }

        deleteTable(tableId)
    }

    return (
        <>
            <div className="data-table">
                <div className="data-table__service">
                    <Button onClick={handleCopyTable} className='btn-copy'>Copy table</Button>
                    <Button onClick={handleDeleteTable} className='btn-close'></Button>
                </div>

                <div className="data-table__table">
                    <table className="table" role='table'>
                        <caption className="table__caption" role="caption">{tableId === MAIN_TABLE_ID ? 'Main table' : `Cloned table ${tableId}`}</caption>
                        <thead className="table__head" >
                            <tr className="table__head-row" role="row">
                                <th className="table__head-cell" scope="col" role="columnheader">Name</th>
                                <th className="table__head-cell" scope="col" role="columnheader">Surname</th>
                                <th className="table__head-cell" scope="col" role="columnheader">Age</th>
                                <th className="table__head-cell" scope="col" role="columnheader">City</th>
                                <th className="table__head-cell" role="columnheader"></th>
                            </tr>
                        </thead>
                        <tbody className="table__body">
                            {!tableData.length && <tr className="table__row table__row--empty-mobile" role="row">
                                <td role="cell" className="table__cell">
                                    There are no records in this table
                                </td>
                            </tr>}
                            {renderTableRows()}
                        </tbody>
                    </table>
                </div>
            </div>
            {tableId === MAIN_TABLE_ID &&
                <Modal isActive={isTableModalOpen} modalClose={() => { setIsTableModalOpen(false) }}>
                    <div className="table__modal">The main table cannot be deleted</div>
                </Modal>}
        </>
    );
}
export default DataTable;


