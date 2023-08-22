import { useDispatch } from "react-redux"
import { addTableRow, updateRow } from '../../redux/slices/tableSlice'
import { closeModal } from "../../redux/slices/modalSlice"
import { MAIN_TABLE_ID } from '../../redux/config'
import { useSelector } from "react-redux"

export const MODE_ADD = "MODE_ADD"
export const MODE_EDIT = "MODE_EDIT"

export default function useManageData(mode) {

    const dispatcher = useDispatch()
    const { tables, editRowId, editTableId } = useSelector((state) => state.table);


    return {
        saveData(data) {

            switch (mode) {
                case MODE_ADD:
                    dispatcher(addTableRow({ tableId: MAIN_TABLE_ID, tableRow: data }))
                    break
                case MODE_EDIT:
                    dispatcher(updateRow({ tableId: editTableId, rowId: editRowId, tableRow: data }))
                    dispatcher(closeModal())
                    break
                default: return
            }
        },

        getEditRowData() {
            if (!editTableId) {
                return
            }

            const [row] = tables[editTableId].filter((row) => row.id === editRowId)

            return row
        }
    }
}

