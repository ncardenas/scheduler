import './App.css';
import Form from './Form';
import List from './List';
import Student from './Student'

//import Time from './Time'
//import doSchedule from'./schedule'
import React, { useState } from "react"

function App() {
  const initStudents = []
  const [students, setStudents] = useState(initStudents)

  function convertData(data) {
    if (!data) return {}

    let properties = data.split(',') || data
    let obj = []
    properties.forEach(prop => {
      let tup = prop.split('-')
      obj.push({'start': Number(tup[0]), 'end': Number(tup[1]) })
    })
    return obj
  }

  async function clicked () {
    //const file_name = 'test/data/csvData1.csv'
    const file_name = await window.api.openDialog()
    const data = await window.api.parseCSV(file_name)

    for (let item of data) {
      const monday = {'monday': convertData(item.Monday)}
      const tuesday = {'tuesday': convertData(item.Tuesday)}
      const wednesday = {'wednesday': convertData(item.Wednesday)}
      const thursday = {'thursday': convertData(item.Thursday)}
      const friday = {'friday': convertData(item.Friday)}
      item.availability = {monday, tuesday, wednesday, thursday, friday}
    }

    const created = data.map(item => new Student(item.Id, item.Name, item.Grade, item.Goal, item.availability))
    console.log(created)
    setStudents(students => {return [...students, ...created]} )
  }

  function reset () {
    setStudents(initStudents)
  }

  return (
    <div className="App">
      <header className="App-header">
        <Form setStudents={setStudents}/>
        <button onClick={clicked}>Upload File</button>
        <button onClick={reset}>Reset</button>
        <List students={students}></List>
      </header>
    </div>
  );
}

export default App;
