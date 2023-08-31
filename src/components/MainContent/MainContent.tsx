import AddDataForm from "../AddDataForm/AddDataForm"
import DataTable from "../DataTable/DataTable"

import { useAppSelector } from "../../hook"
import useModal from "../ui/Modal/useModal"
import { MAIN_TABLE_ID } from "../../redux/config"
import Modal from "../ui/Modal/Modal"
import { FormMode } from "../AddDataForm/types"

export const MainContent = ():JSX.Element => {
    const { isOpen, closeModal } = useModal();
    const tablesList = useAppSelector((state) => state.table.tables)

    const renderTables = () => {
        if (!Object.keys(tablesList).length) {
            return
        }

        return Object.entries(tablesList)
            .sort((table) => {
                const [key] = table;

                return !(key === MAIN_TABLE_ID) ? 1 : -1;
            })
            .map(table => {
                const [tableId, tableData] = table

                return (<DataTable
                    tableId={tableId}
                    tableData={tableData}
                    key={tableId}
                />)
            })
    }

    return (
        <main className="main">
            <AddDataForm mode={FormMode.MODE_ADD} submitButtonLabel="Add" className="main__add-data-form" />
            {renderTables()}
            <Modal isActive={isOpen} modalClose={closeModal}>
                <AddDataForm mode={FormMode.MODE_EDIT} submitButtonLabel="Agree" />
            </Modal>
        </main>
    );
}

export default MainContent