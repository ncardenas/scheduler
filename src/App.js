import React, { useEffect, useState } from 'react'

import Time from './Time'
import Student from './Student'
import Schedule from './Schedule'
import Form from './Form'
import { BasicTable } from './BasicTable'
import { doSchedule } from'./scheduler'

function App() {
    const initStudents = []
    const [students, setStudents] = useState(initStudents)
    const [showSchedule, setShowSchedule] = useState(false)
    const [schedule, setSchedule] = useState(new Schedule())

    const [columns, setColumns] = useState([])
    const [filteredData, setFilteredData] = useState([])

    const [studentColumns, setStudentColumns] = useState([])
    const [studentData, setStudentData] = useState([])
    const [scheduleColumns, setScheduleColumns] = useState([])
    const [scheduleData, setScheduleData] = useState([])

    function convertDay(data) {
        if (!data) return
    
        let properties = data.split(',') || data
        let obj = []
        properties.forEach(prop => {
          let tup = prop.split('-')
          const start = tup[0].split(':')
          const hrStart = Number(start[0])
          const minStart = Number(start[1])
    
          const end = tup[1].split(':')
          const hrEnd = Number(end[0])
          const minEnd = Number(end[1])
    
          obj.push({'start': new Time(hrStart, minStart), 'end': new Time(hrEnd, minEnd)})
        })
        return obj
    }

    function lowerCaseKeys(obj) {
        const array = Object.entries(obj)
                .map( ([key,value]) => { return [key.toLowerCase(), value] })
        
        return Object.fromEntries(array)
    }

    function convertRawData(raw_data) {
        const format_data = []
        for (let item of raw_data) {
            item = lowerCaseKeys(item)
            item.availability = {
                ...(item.Monday) && {'monday': convertDay(item.Monday)}, 
                ...(item.Tuesday) && {'tuesday': convertDay(item.Tuesday)},
                ...(item.Wednesday) && {'wednesday': convertDay(item.Wednesday)},
                ...(item.Thursday) && {'thursday': convertDay(item.Thursday)},
                ...(item.Friday) && {'friday': convertDay(item.Friday)}
            }
            format_data.push(item)
        }
        return format_data
    }

    function makeColumns(column_names) {
        return column_names
        ? column_names.map(name => {return { Header:name, accessor: name }})
        : []
    }

    function makeStudents(data) {
        return data.map(item => new Student(item.Id, item.Name, item.Grade, item.Goal, item.availability))
    }

    async function uploadFile () {
        // const file_name = await window.api.openDialog()
        const file_name = 'test/data/csvData1.csv'
        const raw_data = await window.api.parseCSV(file_name)
        const parsed_data = convertRawData(raw_data)
        const column_names = ['id', 'name', 'grade', 'topic', 'day', 'start_time', 'end_time']
        const _columns = makeColumns(column_names)
        const _students = makeStudents(raw_data)

        setStudents(students => {return [...students, ..._students]} )
        setStudentColumns(_columns)
        setStudentData(parsed_data)

        setColumns(_columns)
        setFilteredData(parsed_data)
    }

    useEffect(() => console.log(students), [students])
    useEffect(() => console.log(filteredData), [filteredData])

    function reset () {
        setStudents(initStudents)
        setFilteredData([])
    }

    function scheduleNow() {
        const blockout_times = {
            'monday': [
            {'start': new Time(10), 'end': new Time(11)},
            {'start': new Time(12), 'end': new Time(13)}
            ],
        }
        const interval = 30
        const result = doSchedule(interval, blockout_times, students)
        setSchedule(result)
        console.log(result)
    }

    function formatTime(start, end) {
        const time_start = start.getHour().toString() + start.getMinute().toString()
        const time_end = end.getHour().toString() + end.getMinute().toString()
        return time_start + ' to ' + time_end
    }

    function formatStudents(students) {
        if (!students) return ''

    }

    // [{Time, Monday, Tuesday, Wednesday, Thursday, Friday}]
    function formatScheduler(schedule) {
        const meetings = schedule.getMeetings('monday')
        // time slots are the same accross days so we can iterate over them
        // TODO: Get students at a specific meeting time

        const result = []
        for (const meeting of meetings) {
            const start = meeting.getStart()
            const end = meeting.getEnd()
            const time = formatTime(start, end)
            
            const monday_students = schedule.getStudents('monday', start, end)
            const tuesday_students = schedule.getStudents('tuesday', start, end)
            const wednesday_students = schedule.getStudents('wednesday', start, end)
            const thursday_students = schedule.getStudents('thursday', start, end)
            const friday_students = schedule.getStudents('friday', start, end)

            result.push({'Time': time, 'Monday': monday_students, 'Tuesday': tuesday_students,
                        'Wednesday': wednesday_students, 'Thursday': thursday_students,
                        'Friday': friday_students})
        }
        console.log(result)
        return result
    }

    useEffect(() => {
        const columns_names = ['Time', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        const _columns = makeColumns(columns_names)
        const formatted = formatScheduler(schedule)
        console.log(formatted)
        setScheduleColumns(_columns)
        setScheduleData(formatted)
    },[showSchedule])

    useEffect(() => {
        if(showSchedule) {
            setColumns(scheduleColumns)
            setFilteredData(scheduleData)
        } 
        else {
            setColumns(studentColumns)
            setFilteredData(studentData)
        }
    }, [showSchedule])

    return (
        <div>
            {/* <Form setStudents={setStudents} setFilteredData={setFilteredData}/> */}
            <button onClick={reset}>Reset</button>
            <button onClick={uploadFile}>Upload File</button>
            <button onClick={scheduleNow}>Schedule Now</button>
            <button onClick={() => setShowSchedule(prev => !prev)}>Show Schedule</button>
            <BasicTable c={columns} d={filteredData} />
        </div>
    )
}

export default App