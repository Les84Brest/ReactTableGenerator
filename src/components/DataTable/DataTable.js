import React from "react";
import PropTypes from "prop-types";
import DataTableRow from "./DataTableRow";
import Button from "../ui/Button/Button";

const DataTable = ({ isMainTable, tableData }) => {
    const VISIBLE_ROWS = 8;

    const renderTableRows = () => {
        // return placeholders only in case when we don't have data
        if (!tableData.length) {
            return Array(VISIBLE_ROWS).fill('').map((_, i) => <DataTableRow key={i} isEmpty />);
        }

        const tableRows = tableData.map((row, i) => {
            return <DataTableRow id={i} isEmpty={false} {...row} />
        })

        // add empty rows to show table as in Figma design
        while (tableRows.length < VISIBLE_ROWS) {
            tableRows.push(<DataTableRow key={tableRows.length + 1} isEmpty />)
        }

        return tableRows
    }

    const handleCopyTable = () => {
        console.log('%ccopy table', 'padding: 5px; background: crimson; color: white;');
    }

    const handleDeleteTable = () => {
        console.log('%cdelete table', 'padding: 5px; background: DarkKhaki; color: Yellow;');
    }

    return (
        <div className="data-table">
            <div className="data-table__service">
                <Button onClick={handleCopyTable} className='btn-copy'>Copy table</Button>
                <Button onClick={handleDeleteTable} className='btn-close'></Button>
            </div>

            <div className="data-table__table">
                <table className="table">
                    <caption className="table__caption">{isMainTable ? 'Main table' : 'Cloned table'}</caption>
                    <thead className="table__head">
                        <tr className="table__head-row">
                            <th className="table__head-cell" scope="col">Name</th>
                            <th className="table__head-cell" scope="col">Surname</th>
                            <th className="table__head-cell" scope="col">Age</th>
                            <th className="table__head-cell" scope="col">City</th>
                            <th className="table__head-cell"></th>
                        </tr>
                    </thead>
                    <tbody className="table__body">
                        {renderTableRows()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default DataTable;


DataTable.propTypes = {
    isMainTable: PropTypes.bool,
    tableData: PropTypes.arrayOf(
        PropTypes.shape({
            workerName: PropTypes.string,
            surname: PropTypes.string,
            age: PropTypes.string,
            city: PropTypes.string,
        })
    ),
}

DataTable.defaultProps = {
    isMainTable: false
}