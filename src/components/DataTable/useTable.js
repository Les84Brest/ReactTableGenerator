import { useDispatch } from "react-redux"
import { copyTable, deleteTable as delTable } from "../../redux/slices/tableSlice";

export default function useTable() {
    const dispatcher = useDispatch()

    return {
        copyTable: (tableData) => {
            const copyTableData = tableData.slice()
            dispatcher(copyTable(copyTableData))
        },
        deleteTable: (id) => {
            console.log('%cdelTable', 'padding: 5px; background: DarkKhaki; color: Yellow;');
            dispatcher(delTable(id))
        }
    }
}