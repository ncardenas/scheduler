import React, { useEffect, useState } from 'react'

import Time from './Time'
import Student from './Student'
import Form from './Form'
import { BasicTable } from './BasicTable'


function App() {
    const initStudents = []
    const [students, setStudents] = useState(initStudents)
    const [columns, setColumns] = useState([])
    const [filteredData, setFilteredData] = useState([])

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

    async function convertRawData(raw_data) {
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

    async function makeColumns(parsed_data) {
        const column_names = ['id', 'name', 'grade', 'topic', 'day', 'start_time', 'end_time']
        const columns_temp = parsed_data[0]
         ? Object.keys(parsed_data[0])
         .filter(key => column_names.includes(key))
         .map((key) => {
             return { Header: key, accessor: key }
         }) : []
        
        return columns_temp
    }

    async function makeStudents(data) {
        return data.map(item => new Student(item.Id, item.Name, item.Grade, item.Goal, item.availability))
    }

    async function uploadFile () {
        // const file_name = await window.api.openDialog()
        const file_name = 'test/data/csvData1.csv'
        const raw_data = await window.api.parseCSV(file_name)
        const parsed_data = await convertRawData(raw_data)
        const _columns = await makeColumns(parsed_data)
        const _students = await makeStudents(raw_data)

        setStudents(students => {return [...students, ..._students]} )
        setColumns(_columns)
        setFilteredData(parsed_data)
    }

    useEffect(() => console.log(students), [students])
    useEffect(() => console.log(filteredData), [filteredData])

    function reset () {
        setStudents(initStudents)
        setFilteredData([])
    }

    return (
        <div>
            <Form setStudents={setStudents} setFilteredData={setFilteredData}/>
            <button onClick={reset}>Reset</button>
            <button onClick={uploadFile}>Upload File</button>

            <BasicTable c={columns} d={filteredData} />
        </div>
    )
}

export default App