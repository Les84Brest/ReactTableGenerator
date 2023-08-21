import React from "react";
import AddDataForm from "../AddDataForm/AddDataForm";
import DataTable from "../DataTable/DataTable";
import { useSelector } from "react-redux";
import { MAIN_TABLE_ID } from "../../redux/config";

export const MainContent = () => {

    const tablesList = useSelector((state) => state.table.tables)

    const renderTables = () => {
        if (!Object.keys(tablesList).length) {
            return
        }

        return Object.entries(tablesList)
            .sort((table) => {
                const [key] = table;

                return !key === MAIN_TABLE_ID ? 1 : -1;
            })
            .map(table => {
                const [tableId, tableData] = table;

                return <DataTable
                    tableId={tableId}
                    tableData={tableData}
                    key={tableId}
                />
            })
    }

    return (
        <main className="main">
            <AddDataForm />
            {renderTables()}
        </main>
    );
}

export default MainContent