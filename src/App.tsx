import React, { useState, useRef } from 'react';
import { Box, Stack, Modal } from '@mui/material';
import { Availability, Form } from './components/Form';
import { MeetingDurationForm } from './components/MeetDurationForm';
import StudentTable from './components/StudentTable/StudentTable';
import { ButtonBar } from './components/ButtonBar';

export interface StudentRecord {
    id: number;
    name: string;
    grade: string;
    topic: string;
    times: Availability[];
}

function App() {
    const initStudents: StudentRecord[] = [];
    const validTopics = ['Speech', 'Another', 'AnotherAnother'];
    const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const validGrades = ['First', 'Second', 'Third'];

    const counter = useRef(1);
    const newStudent: StudentRecord = {
        id: counter.current,
        name: '',
        grade: validGrades[0],
        topic: validTopics[0],
        times: [],
    };

    const defaults = {
        students: [],
        formOpen: false,
        editStudent: newStudent,
        meetingMinutes: '00',
    };

    const [students, setStudents] = useState<StudentRecord[]>(
        defaults.students
    );
    const [formOpen, setFormOpen] = useState(defaults.formOpen);
    const [editStudent, setEditStudent] = useState(defaults.editStudent);
    const [meetingMinutes, setMeetingMinutes] = useState(
        defaults.meetingMinutes
    );
    const [timeSubmit, setTimeSubmit] = useState(false);

    function handleClear() {
        setStudents(initStudents);
    }

    const handleFormClose = () => {
        setEditStudent(newStudent);
        setFormOpen(false);
    };

    const handleAddStudent = (student: StudentRecord) => {
        let index = -1;
        students.forEach((saved_student, i) => {
            if (saved_student.id === student.id) index = i;
        });

        // student index not found
        if (index === -1) {
            counter.current += 1;
            newStudent.id = counter.current;
            setStudents((prev) => [...prev, student]);
            setEditStudent(newStudent);
        } else {
            students[index] = student;
            setStudents(students);
        }
    };

    const handleEditStudent = (student: StudentRecord) => {
        setEditStudent(student);
        setFormOpen(true);
    };

    const handleDeleteStudent = (index: number) => {
        const update = students.filter((_, i) => i !== index);
        setStudents(update);
    };

    const handleNewEntry = () => {
        setFormOpen(true);
    };

    return (
        <Stack justifyContent="center" marginTop={2} spacing={2}>
            <Modal open={formOpen} onClose={() => setFormOpen(false)}>
                <Box
                    sx={{
                        backgroundColor: 'background.paper',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <Form
                        student={editStudent}
                        validDays={validDays}
                        validGrades={validGrades}
                        validTopics={validTopics}
                        handleParentSubmit={handleAddStudent}
                        handleParentClose={handleFormClose}
                    />
                </Box>
            </Modal>
            <MeetingDurationForm
                disabled={timeSubmit}
                handleChange={setMeetingMinutes}
            />
            <ButtonBar
                handleNewEntry={handleNewEntry}
                handleClear={handleClear}
                handleSubmit={setTimeSubmit}
            />
            <Box justifyContent="center" display="flex">
                <StudentTable
                    handleParentEdit={handleEditStudent}
                    handleParentDelete={handleDeleteStudent}
                    students={students}
                />
            </Box>
        </Stack>
    );
}

export default App;
