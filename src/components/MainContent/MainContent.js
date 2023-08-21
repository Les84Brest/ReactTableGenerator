import React from "react";
import AddDataForm from "../AddDataForm/AddDataForm";
import DataTable from "../DataTable/DataTable";
import { useSelector } from "react-redux";

export const MainContent = () => {
 
    const tablesList = useSelector((state) => state.table.tables)

    const renderTables = () => {
        if (!Object.keys(tablesList).length) {
            return
        }

        return Object.entries(tablesList).map(table => {
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