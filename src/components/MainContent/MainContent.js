import React from "react";
import AddDataForm from "../AddDataForm/AddDataForm";
import DataTable from "../DataTable/DataTable";
import { useSelector} from "react-redux";

export const MainContent = () => {

    const mainTableData = useSelector((state) => state.table.mainTableData)
    const clonedTables = []; //TODO get data from REdux

    const renderClonedTables = () => {
        if(!clonedTables.length) {
            return
        }
    }

    return (
        <main className="main">
            <AddDataForm />
            <DataTable isMainTable={true} tableData={mainTableData}/>
            {renderClonedTables()}
        </main>
    );
}

export default MainContent