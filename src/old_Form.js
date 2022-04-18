import React, { useState } from "react"
import Student from "./Student"
import Time from "./Time"

const Form = ({setStudents}) => {
    const [name, setName] = useState()
    const [topic, setTopic] = useState()
    const [day, setDay] = useState()
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [id, setId] = useState()
    const [grade, setGrade] = useState()

    const handleClick= () => {
        const student = new Student(id, name, grade, topic)
        student.addAvailability(day, new Time(startTime), new Time(endTime))
        setStudents(students => {return [...students, student]} )
    }

    return (
        <div>
            <input type='text' placeholder="id" onChange={e=>setId(e.target.value)}/>
            <input type='text' placeholder="name" onChange={e=>setName(e.target.value)}/>
            <input type='text' placeholder="grade" onChange={e=>setGrade(e.target.value)}/>
            <input type='text' placeholder="topic" onChange={e=>setTopic(e.target.value)}/>
            <input type='text' placeholder="day" onChange={e=>setDay(e.target.value)}/>
            <input type='text' placeholder="start_time" onChange={e=>setStartTime(e.target.value)}/>
            <input type='text' placeholder="end_time" onChange={e=>setEndTime(e.target.value)}/>
            <button type='submit' onClick={() => handleClick()}>Add</button>
        </div>
    )
}

export default Form