import './App.css';
import Form from './Form';
import List from './List';
//import Time from './Time'
//import doSchedule from'./schedule'
import React, { useState, useEffect } from "react"

function App() {
  const [students, setStudents] = useState([])
  const [file, setFile] = useState('')


  useEffect(() => {
    console.log(file)
  },[file])

  //useEffect(()=> {
  //  console.log(doSchedule(interval, blackout_intervals, students))
  //},[students])

  async function clicked () {
    const result = await window.api.openDialog()
    setFile(result.filePaths[0])
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
