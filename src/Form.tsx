import React, { useState } from "react"
import Student from "./Student"
import Time from "./Time"
import StudentTable from './StudentTable/StudentTable'

// type FormProps = {
//     setStudents: Function,
//     setData: Function,
// }

// const Form = ({ setStudents, setData }: FormProps ) => {
const Form = () => {
    const initStudents = []
    const [name, setName] = useState('')
    const [topic, setTopic] = useState('')
    const [day, setDay] = useState('')
    const [start_time, setStartTime] = useState(-1)
    const [end_time, setEndTime] = useState(-1)
    const [id, setId] = useState(-1)
    const [grade, setGrade] = useState(-1)
    const [students, setStudents] = useState(initStudents)
    
    const handleClick= () => {
        const student = new Student(id, name, grade, topic)
        student.addAvailability(day, new Time(start_time), new Time(end_time))
        setStudents(students => {return [...students, student]} )
        // const data = {id, name, topic, day, start_time, end_time}
        // setData(prevData => {return [...prevData, data]})
    }

    return (
        <div>
            <input type='text' placeholder="id" onChange={e=>setId(Number(e.target.value))}/>
            <input type='text' placeholder="name" onChange={e=>setName(e.target.value)}/>
            <input type='text' placeholder="grade" onChange={e=>setGrade(Number(e.target.value))}/>
            <input type='text' placeholder="topic" onChange={e=>setTopic(e.target.value)}/>
            
            <div>
                <input type='text' placeholder="day" onChange={e=>setDay(e.target.value)}/>
                <input type='text' placeholder="start_time" onChange={e=>setStartTime(Number(e.target.value))}/>
                <input type='text' placeholder="end_time" onChange={e=>setEndTime(Number(e.target.value))}/>
            </div>
            <button type='submit' onClick={() => handleClick()}>Add Availability</button>
            <StudentTable students={students}/>
        </div>
    )
}

export default Form