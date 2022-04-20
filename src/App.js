import React, { useEffect, useState } from 'react'

import Time from './Time'
import Student from './Student'
import Schedule from './Schedule'
import Form from './Form'
import { doSchedule } from'./scheduler'
import { BasicTable } from './BasicTable'
import ScheduleTable from './ScheduleTable/ScheduleTable'

function App() {
    const initStudents = []
    const [students, setStudents] = useState(initStudents)
    const [showSchedule, setShowSchedule] = useState(false)
    const [schedule, setSchedule] = useState(new Schedule())

    const [columns, setColumns] = useState([])
    const [filteredData, setFilteredData] = useState([])

    function convertDay(data) {
        if (!data) return []

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
        const formattedData = []
        for (let item of raw_data) {
            item = lowerCaseKeys(item)

            const availability = {}
            availability.monday = convertDay(item.monday)
            availability.tuesday = convertDay(item.tuesday)
            availability.wednesday = convertDay(item.wednesday)
            availability.thursday = convertDay(item.thursday)
            availability.friday = convertDay(item.friday)

            item.availability = availability
            formattedData.push(item)
        }

        return formattedData
    }

    function makeColumns(column_names) {
        return column_names
        ? column_names.map(name => {return { Header:name, accessor: name }})
        : []
    }

    function makeStudents(raw_data) {
        const data = convertRawData(raw_data)
        console.log(data)
        return data.map(item => new Student(item.id, item.name, item.grade, item.topic, item.availability))
    }

    async function uploadFile () {
        // const file_name = await window.api.openDialog()
        const file_name = 'test/data/MOCK_DATA2.csv'
        const raw_data = await window.api.parseCSV(file_name)
        const uploadedStudents = makeStudents(raw_data)
        console.log(uploadedStudents)

        setStudents(students => {return [...students, ...uploadedStudents]} )

        const column_names = ['id', 'name', 'grade', 'topic', 'day', 'start_time', 'end_time']
        const _columns = makeColumns(column_names)
        setColumns(_columns)
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

    return (
        <div>
            {/* <Form setStudents={setStudents} setFilteredData={setFilteredData}/> */}
            <button onClick={reset}>Reset</button>
            <button onClick={uploadFile}>Upload File</button>
            <button onClick={scheduleNow}>Schedule Now</button>
            <button onClick={() => setShowSchedule(prev => !prev)}>Show Schedule</button>
            {showSchedule ? <ScheduleTable schedule={schedule}/> : <BasicTable c={columns} d={filteredData} />}
        </div>
    )
}

export default App