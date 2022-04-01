import React, { useState } from "react"

const Form = ({setStudents}) => {
    const [name, setName] = useState()
    const [disability, setDisability] = useState()
    const [time, setTime] = useState()

    const handleClick= () => {
        console.log(time)
        const student = {'name': name, 'disability': disability, 'availability': time}
        setStudents(students => {return [...students, student]} )
    }

    return (
        <div>
            <input type='text' placeholder="Full Name" onChange={e=>setName(e.target.value)}/>
            <input type='text' placeholder="Disability" onChange={e=>setDisability(e.target.value)}/>
            <input type='time' onChange={e=>setTime(e.target.value)}/>
            <button type='submit' onClick={() => handleClick()}>Add</button>
        </div>
    )
}

export default Form