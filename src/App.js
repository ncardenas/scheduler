import './App.css';
import Form from './Form';
import List from './List';
import Student from './Student'
import { doSchedule } from'./scheduler'
import Time from './Time'
import React, { useState, useEffect } from "react"
import Calendar from './Calendar'

function App() {
  const initStudents = []
  const [students, setStudents] = useState(initStudents)
  const [schedule, setSchedule] = useState()
  const [interval, setInterval] = useState(30)
  const [showSchedule, setShowSchedule] = useState(false)
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

  async function clicked () {
    const file_name = 'test/data/csvData1.csv'
   // const file_name = await window.api.openDialog()
    const data = await window.api.parseCSV(file_name)
    console.log(data)
    for (let item of data) {
      item.availability = {
        ...(item.Monday) && {'monday': convertData(item.Monday)}, 
        ...(item.Tuesday) && {'tuesday': convertData(item.Tuesday)},
        ...(item.Wednesday) && {'wednesday': convertData(item.Wednesday)},
        ...(item.Thursday) && {'thursday': convertData(item.Thursday)},
        ...(item.Friday) && {'friday': convertData(item.Friday)}
      }
   }

    const created = data.map(item => new Student(item.Id, item.Name, item.Grade, item.Goal, item.availability))
    console.log(created)
    setStudents(students => {return [...students, ...created]} )
  }

  function reset () {
    setStudents(initStudents)
  }

  function scheduleNow() {
    const blockout_times = {
      'monday': [
        {'start': new Time(10), 'end': new Time(11)},
        {'start': new Time(12), 'end': new Time(13)}
      ],
   }
    const result = doSchedule(interval, blockout_times, students)
    setSchedule(result)
  }
  
  useEffect(() => {
    console.log(schedule)
  }, [schedule])

  return (
    <div className="App">
      <header className="App-header">
       { /*<input type="numer" onChange={event => setInterval(event.target.value)}>Interval</input>*/}
        <Form setStudents={setStudents}/>
        <button onClick={reset}>Reset</button>
        <button onClick={clicked}>Upload File</button>
        <button onClick={scheduleNow}>Schedule Now</button>
        <button onClick={() => setShowSchedule(prev => !prev)}>Show Schedule</button>
        {showSchedule? <Calendar schedule={schedule}/> : <List students={students}/> }
      </header>
    </div>
  );
}

export default App;
