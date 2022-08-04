import React, { useState } from "react"
import Student from "./Student"
import Time from "./Time"
import StudentTable from './StudentTable/StudentTable'
// date-fns
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';

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
    const [inputList, setInputList] = useState([{ day: "", start_time: "", end_time: "" }])
    const [selectedDate, handleDateChange] = useState(new Date("2018-01-01T00:00:00.000Z"));

    const handleSubmitClick = () => {
        // TODO: Check for duplicate data
        // TODO: Don't create students until submit is hit!
        // TODO: If empty fields don't add
        const student = new Student(id, name, grade, topic)
        student.addAvailability(day, new Time(start_time), new Time(end_time))
        setStudents(students => {return [...students, student]} )

    }

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const handleRemoveClick = (index) => {
        const list = [...inputList]
        list.splice(index, 1)
        setInputList(list)
    }

    const handleAddClick = () => {
        setInputList([...inputList, { day: "", start_time: "", end_time: "" } ])
    }

    return (
        <>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
           renderInput={(props) => <TextField {...props} />}
            label="Availability"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
        </>
      )

    // return (
    //     <div>
    //         <h2>Student Information</h2>
    //         <input type='text' placeholder="unique id" onChange={e=>setId(Number(e.target.value))}/>
    //         <input type='text' placeholder="name" onChange={e=>setName(e.target.value)}/>
    //         <input type='text' placeholder="grade" onChange={e=>setGrade(Number(e.target.value))}/>
    //         <input type='text' placeholder="topic" onChange={e=>setTopic(e.target.value)}/>

    //         <div>
    //             <h3>Availability</h3>
    //             {inputList.map((x, i) => {
    //                 return (
    //                     <div className="box">
    //                         <input
    //                             name="day"
    //                             placeholder="Enter Day"
    //                             value={x.day}
    //                             onChange={e => handleInputChange(e, i)}
    //                         />
    //                         <input
    //                             name="start_time"
    //                             placeholder="Enter Start Time"
    //                             value={x.start_time}
    //                             onChange={e => handleInputChange(e, i)}
    //                         />
    //                         <input
    //                             name="end_time"
    //                             placeholder="Enter End Time"
    //                             value={x.end_time}
    //                             onChange={e => handleInputChange(e, i)}
    //                         />
    //                         <div className="btn-box">
    //                             {inputList.length !== 1 && <button
    //                                 className="mr10"
    //                                 onClick={() => handleRemoveClick(i)}>Remove</button>}
    //                         </div>
    //                         {inputList.length - 1 === i && <button onClick={handleAddClick}>Add Another</button>}
                            
    //                     </div>
    //                 )
    //             })}
    //             <button>Save Student</button>
    //         </div>
    //     </div>
    // )
}

export default Form