import React, { useState } from "react"
import Student from "./Student"

const Form = ({setStudents}) => {
    const [name, setName] = useState()
    const [disability, setDisability] = useState()
    const [time, setTime] = useState()
    const [id, setId] = useState()
    const [grade, setGrade] = useState()

    const handleClick= () => {
        const student = new Student(id, name, grade, disability)
        setStudents(students => {return [...students, student]} )
    }

    return (
        <div>
            <input type='text' placeholder="ID" onChange={e=>setId(e.target.value)}/>
            <input type='text' placeholder="Full Name" onChange={e=>setName(e.target.value)}/>
            <input type='text' placeholder="Grade" onChange={e=>setGrade(e.target.value)}/>
            <input type='text' placeholder="Disability" onChange={e=>setDisability(e.target.value)}/>
            <input type='time' onChange={e=>setTime(e.target.value)}/>
            <button type='submit' onClick={() => handleClick()}>Add</button>
        </div>
    )
}

export default Form