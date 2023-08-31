import { useAppDispatch } from "../../hook";
import { copyTable, deleteTable as delTable, deleteRow, setEditTableId, setEditRowId, EmployeeData } from "../../redux/slices/tableSlice";
import useModal from "../ui/Modal/useModal";

export default function useTable() {
    const dispatcher = useAppDispatch()
    const { openModal } = useModal();

    return {
        copyTable: (tableData: EmployeeData[]) => {
            const copyTableData = tableData.slice()
            dispatcher(copyTable(copyTableData))
        },

        deleteTable: (id: string) => {
            dispatcher(delTable(id))
        },

        deleteRow: (tableId: string, rowId: string) => {
            dispatcher(deleteRow({ tableId, rowId }))
        },

        startEditRow: (tableId: string, rowId: string) => {
            dispatcher(setEditTableId(tableId))
            dispatcher(setEditRowId(rowId))
            openModal()
        },
    }
}