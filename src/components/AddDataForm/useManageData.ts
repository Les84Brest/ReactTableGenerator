import { useAppDispatch, useAppSelector } from "../../hook"
import { addTableRow, updateRow } from '../../redux/slices/tableSlice'
import { closeModal } from "../../redux/slices/modalSlice"
import { MAIN_TABLE_ID } from '../../redux/config'
import { FormMode } from "./types"
import { EmployeeData } from '../../redux/slices/tableSlice';


export default function useManageData(mode: FormMode) {

    const dispatcher = useAppDispatch()
    const { tables, editRowId, editTableId } = useAppSelector((state) => state.table);


    return {
        saveData(data: EmployeeData): void {

            switch (mode) {
                case FormMode.MODE_ADD:
                    dispatcher(addTableRow({ tableId: MAIN_TABLE_ID, tableRow: data }))
                    break
                case FormMode.MODE_EDIT:
                    dispatcher(updateRow({ tableId: editTableId, rowId: editRowId, tableRow: data }))
                    dispatcher(closeModal())
                    break
                default: return
            }
        },

        getEditRowData(): EmployeeData | null {
            if (!editTableId) {
                return null
            }

            const [row] = tables[editTableId].filter((row) => row.id === editRowId)

            return row
        }
    }
}

