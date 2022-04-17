import React, { useState } from 'react'

import Time from './Time'
import Student from './Student'

import { BasicTable } from './BasicTable'

function App() {
    const initStudents = []
    const [students, setStudents] = useState(initStudents)
    const [formated_data, setFormattedData] = useState([])

    function convertData(data) {
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

    async function uploadFile () {
        const file_name = 'test/data/csvData1.csv'
       // const file_name = await window.api.openDialog()
        const raw_data = await window.api.parseCSV(file_name)

        const temp = []
        for (let item of raw_data) {
            item = lowerCaseKeys(item)
            console.log(item)
            item.availability = {
                ...(item.Monday) && {'monday': convertData(item.Monday)}, 
                ...(item.Tuesday) && {'tuesday': convertData(item.Tuesday)},
                ...(item.Wednesday) && {'wednesday': convertData(item.Wednesday)},
                ...(item.Thursday) && {'thursday': convertData(item.Thursday)},
                ...(item.Friday) && {'friday': convertData(item.Friday)}
            }
            temp.push(item)
       }

       console.log(raw_data)
       console.log(temp)
       const created = raw_data.map(item => new Student(item.Id, item.Name, item.Grade, item.Goal, item.availability))
       console.log(created)
       setStudents(students => {return [...students, ...created]} )
       setFormattedData(temp)
    }

    function reset () {
        setStudents(initStudents)
    }

    return (
        <div>
            <button onClick={reset}>Reset</button>
            <button onClick={uploadFile}>Upload File</button>
            <BasicTable students={formated_data} />
        </div>
    )
}

export default App