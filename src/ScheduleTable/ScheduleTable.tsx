import React, { useEffect, useState } from 'react'

import Student from '../Student'
import { BasicTable } from '../BasicTable'
import { getColumns } from './Columns'

const ScheduleTable = ({ schedule }) => {
    const columns = getColumns()
    const [data, setData] = useState([])

    function formatStudents(students: Student[]) {
        const result = []
        for (const student of students) {
            const strStudent = 'id: ' + student.id + ', name: ' + student.name + ', topic: ' + student.topic
            result.push(<div key={student.id}>{strStudent}</div>)
        }
        return result
    }

    function formatScheduler(schedule) {
        const meetings = schedule.getMeetings('monday')

        const result = []
        for (const meeting of meetings) {
            const start = meeting.getStart()
            const end = meeting.getEnd()
            
            const monday_students = formatStudents(schedule.getStudents('monday', start, end))
            const tuesday_students = formatStudents(schedule.getStudents('tuesday', start, end))
            const wednesday_students = formatStudents(schedule.getStudents('wednesday', start, end))
            const thursday_students = formatStudents(schedule.getStudents('thursday', start, end))
            const friday_students = formatStudents(schedule.getStudents('friday', start, end))

            result.push({'Time': meeting.toString(), 'Monday': monday_students, 'Tuesday': tuesday_students,
                        'Wednesday': wednesday_students, 'Thursday': thursday_students,
                        'Friday': friday_students})
        }

        return result
    }

    useEffect(() => {
        const formatted = formatScheduler(schedule)
        setData(formatted)
    },[schedule])

    return (
        <BasicTable c={columns} d={data} />
    )
}

export default ScheduleTable