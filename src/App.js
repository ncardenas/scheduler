import './App.css';
import Form from './Form';
import List from './List';
import Time from './Time'
import doSchedule from'./schedule'
import React, { useState, useEffect } from "react"


import data from './data.json'
import blackout_intervals from './blackout_intervals.json'
import internal from 'stream';

function App() {
  const [students, setStudents] = useState([])

  // TODO: REMOVE AFTER DONE TESTING
  useEffect(() => {
    setStudents(data)
  },[])

  useEffect(()=> {
    console.log(doSchedule(interval, blackout_intervals, students))
  },[students])

  return (
    <div className="App">
      <header className="App-header">
        <Form setStudents={setStudents}/>
        <List students={students}></List>
      </header>
    </div>
  );
}

export default App;
