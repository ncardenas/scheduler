import React, { useEffect, useState } from "react"
import Student from '../Student'
import { BasicTable } from "../BasicTable"
import { getColumns } from "./Columns"

const StudentTable = ({ students }) => {
    const columns = getColumns()
    const [data, setData] = useState([])

    function formatStudents(students: Student) {

    }

    useEffect(() => {
        console.log(students)
        const result = []
        for (const student of students) {
            result.push({
                'id': student.id,
                'name': student.name,
                'grade': student.grade,
                'topic': student.topic,
                'availability': student.availability
            })
        }
        setData(result)
    }, [students])

    return (
        <BasicTable c={columns} d={data} />
    )
}

export default StudentTable