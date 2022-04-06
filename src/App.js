import './App.css';
// import Form from './Form';
// import List from './List';
//import Time from './Time'
//import doSchedule from'./schedule'
import React, { useState, useEffect } from "react"
import data from './data.json'


function App() {
  const [students, setStudents] = useState([])

  // TODO: REMOVE AFTER DONE TESTING
  useEffect(() => {
    setStudents(data)
  },[])

  //useEffect(()=> {
  //  console.log(doSchedule(interval, blackout_intervals, students))
  //},[students])

  async function clicked () {
    const result = await window.myApp.sayHello('hello from the renderer')
    const other = await window.api.openDialog()
    console.log(result)
    console.log(other)
  }

  return (
    <div>
      <button onClick={clicked}>Click Me</button>
      <h1>Hello From React</h1>
    </div>
//    <div className="App">
      //<header className="App-header">
        //<Form setStudents={setStudents}/>
        //<List students={students}></List>
      //</header>
    //</div>

//    <div>

      //<script>
        //window.api.receive("fromMain", (data) => console.log(data) )

        //window.api.send("toMain", "data from renderer")
      //</script>

    //</div>
  );
}

export default App;
