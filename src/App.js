import './App.css';
import Form from './Form';
import List from './List';
//import Time from './Time'
//import doSchedule from'./schedule'
import React, { useState } from "react"

function App() {
  const [students, setStudents] = useState([])
  const [rawData, setRawData] = useState({})

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
    const file_name = 'test/data/csvData1.csv'
    //const file_name = await window.api.openDialog()
    const data = await window.api.parseCSV(file_name)
    
    console.log(file_name)
    console.log(data)
    let times = []
    for (let item of data) {
      console.log(item)
      const monday = {'monday': convertData(item.Monday)}
      const tuesday = {'tuesday': convertData(item.Tuesday)}
      const wednesday = {'wednesday': convertData(item.Wednesday)}
      const thursday = {'thursday': convertData(item.Thursday)}
      const friday = {'friday': convertData(item.Friday)}
      times = [{monday, tuesday, wednesday, thursday, friday}, ...times]
      item.Availability = times
    }
 
    console.log(data)
    console.log(times)
    setRawData(times)
  }

  return (
    <div className="App">
      <header className="App-header">
        <Form setStudents={setStudents}/>
        <button onClick={clicked}>Upload File</button>
        <List students={students}></List>
      </header>
    </div>
  );
}

export default App;
