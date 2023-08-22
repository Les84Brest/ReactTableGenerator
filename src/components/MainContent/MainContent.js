import React from "react";
import AddDataForm from "../AddDataForm/AddDataForm";
import DataTable from "../DataTable/DataTable";
import { useSelector } from "react-redux";
import useModal from "../ui/Modal/useModal";
import { MAIN_TABLE_ID } from "../../redux/config";
import Modal from "../ui/Modal/Modal";
import { MODE_EDIT, MODE_ADD } from "../AddDataForm/useManageData";

export const MainContent = () => {
    const { isOpen, closeModal } = useModal();
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
            <AddDataForm mode={MODE_ADD} submitButtonLabel="Add" />
            {renderTables()}
            <Modal isActive={isOpen} modalClose={closeModal}>
                <AddDataForm mode={MODE_EDIT} submitButtonLabel="Agree" />
            </Modal>
        </main>
    );
}

export default MainContent