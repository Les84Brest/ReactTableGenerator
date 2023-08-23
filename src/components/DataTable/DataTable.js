import React, { useCallback, useState } from "react"
import PropTypes from "prop-types"
import DataTableRow from "./DataTableRow"
import Button from "../ui/Button/Button"
import { MAIN_TABLE_ID } from "../../redux/config"
import useTable from "./useTable"
import Modal from "../ui/Modal/Modal"


const DataTable = ({ tableId, tableData }) => {
    const VISIBLE_ROWS = 8;

    const { copyTable, deleteTable, deleteRow, startEditRow } = useTable()
    const [isTableModalOpen, setIsTableModalOpen] = useState(false);

    const cbDeleteRow = useCallback((rowId) => {
        deleteRow(tableId, rowId)
    }, [tableId, deleteRow])

    const cbUpdateRow = useCallback((rowId) => {
        startEditRow(tableId, rowId)
    }, [tableId, startEditRow])

    const renderTableRows = () => {
        // return placeholders only in case when we don't have data
        if (!tableData.length) {
            return Array(VISIBLE_ROWS).fill('').map((_, i) => <DataTableRow key={i} isEmpty />);
        }

        const tableRows = tableData.map((row) => {
            return <DataTableRow
                key={`${row.id}item`}
                isEmpty={false}
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
                <Modal isActive={isTableModalOpen} modalClose={() => {setIsTableModalOpen(false)}}>
                    <div class="table__modal">The master table cannot be deleted</div>
                </Modal>}
        </>
    );
}
export default DataTable;


DataTable.propTypes = {
    tableId: PropTypes.string,
    tableData: PropTypes.arrayOf(
        PropTypes.shape({
            workerName: PropTypes.string,
            surname: PropTypes.string,
            age: PropTypes.string,
            city: PropTypes.string,
        })
    ),
}
