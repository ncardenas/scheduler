import React, { useEffect, useState } from 'react'

import Student from '../Student'
import { BasicTable } from '../BasicTable'
import { getColumns } from './Columns'

const ScheduleTable = ({ schedule }) => {
    const columns = getColumns()
    const [data, setData] = useState([])

    function formatTime(start, end) {
        const time_start = start.getHour().toString() + start.getMinute().toString()
        const time_end = end.getHour().toString() + end.getMinute().toString()
        return time_start + ' to ' + time_end
    }

    function formatStudents(students: Student[]) {
        const result = []
        for (const student of students) {
            result.push('id: ' + student.id + ', name: ' + student.name + ', topic: ' + student.topic)
        }
        return result
    }

    // [{Time, Monday, Tuesday, Wednesday, Thursday, Friday}]
    function formatScheduler(schedule) {
        const meetings = schedule.getMeetings('monday')

        const result = []
        for (const meeting of meetings) {
            const start = meeting.getStart()
            const end = meeting.getEnd()
            const time = formatTime(start, end)
            
            const monday_students = formatStudents(schedule.getStudents('monday', start, end))
            const tuesday_students = formatStudents(schedule.getStudents('tuesday', start, end))
            const wednesday_students = formatStudents(schedule.getStudents('wednesday', start, end))
            const thursday_students = formatStudents(schedule.getStudents('thursday', start, end))
            const friday_students = formatStudents(schedule.getStudents('friday', start, end))

            result.push({'Time': time, 'Monday': monday_students, 'Tuesday': tuesday_students,
                        'Wednesday': wednesday_students, 'Thursday': thursday_students,
                        'Friday': friday_students})
        }
        console.log(result)
        return result
    }

    useEffect(() => {
        console.log(schedule)
        const formatted = formatScheduler(schedule)
        console.log(formatted)
        setData(formatted)
    },[schedule])

    return (
        <BasicTable c={columns} d={data} />
    )
}

export default ScheduleTable