import { useDispatch } from "react-redux"
import { copyTable, deleteTable as delTable, deleteRow, setEditTableId, setEditRowId } from "../../redux/slices/tableSlice";
import useModal from "../ui/Modal/useModal";
export default function useTable() {
    const dispatcher = useDispatch()
    const { openModal } = useModal();

    return {
        copyTable: (tableData) => {
            const copyTableData = tableData.slice()
            dispatcher(copyTable(copyTableData))
        },

        deleteTable: (id) => {
            dispatcher(delTable(id))
        },

        deleteRow: (tableId, rowId) => {
            dispatcher(deleteRow({ tableId, rowId }))
        },

        updateRow: (tableId, rowId) => { },

        startEditRow: (tableId, rowId) => {
            dispatcher(setEditTableId(tableId))
            dispatcher(setEditRowId(rowId))
            openModal()
        },
    }
}