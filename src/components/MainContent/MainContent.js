import React from "react";
import AddDataForm from "../AddDataForm/AddDataForm";
import DataTable from "../DataTable/DataTable";

export const MainContent = () => {
    return (
        <main className="main">
            <AddDataForm />
            <DataTable />
        </main>
    );
}

export default MainContent