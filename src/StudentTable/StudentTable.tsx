import { BasicTable } from "../BasicTable"
import { getColumns } from "./Columns"

const StudentTable = () => {
    const columns = getColumns()
    return (
        <BasicTable c={columns} d={data} />
    )
}

export default StudentTable