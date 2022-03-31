import React, { useState, useEffect } from "react"

const StudentForm = () => {
    const [name, setName] = useState()
    const [disability, setDisability] = useState()
    const [students, setStudents] = useState([])

    const handleClick= () => {
        const student = {'name': name, 'disability': disability}
        setStudents([...students, student])
    }

    useEffect(()=>{
        console.log(students)
    },[students])
    return (
        <div>
            <input type='text' placeholder="Full Name" onChange={input=>setName(input)}/>
            <input type='text' placeholder="Disability" onChange={input=>setDisability(input)}/>
            <button type='submit' onClick={() => handleClick()}>Add</button>
            
        </div>
    )
}

export default StudentForm