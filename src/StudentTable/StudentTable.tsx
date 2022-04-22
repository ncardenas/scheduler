import React, { useEffect, useState } from "react"
import { BasicTable } from "../BasicTable"
import { getColumns } from "./Columns"

const StudentTable = ({ students }) => {
    const columns = getColumns()
    const [data, setData] = useState([])

    useEffect(() => {
        const result = []
        for (const student of students) {
            const formatAvailability = []
            for (const day of Object.keys(student.availability)) {
                const availability = student.availability[day]
                for (const meeting of availability) {
                    const start = meeting.start.toString()
                    const end = meeting.end.toString()
                    formatAvailability.push(<div key={start}>{day + ': ' + start + ' to ' + end}</div>)
                }
            }
            result.push({
                'id': student.id,
                'name': student.name,
                'grade': student.grade,
                'topic': student.topic,
                'availability': formatAvailability
            })
        }
        setData(result)
    }, [students])

    return (
        <BasicTable c={columns} d={data} />
    )
}

export default StudentTable