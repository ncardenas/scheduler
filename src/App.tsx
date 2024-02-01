import React, { useState, useRef } from 'react';
import { Box, Stack, Modal } from '@mui/material';
import { validGrades, validTopics } from './constants';
import { FormData } from './types';

import {
    ButtonBar,
    Form,
    StudentTable,
    MeetingDurationForm,
} from './components';

function App() {
    const initStudents: FormData[] = [];

    const counter = useRef(1);
    const newStudent: FormData = {
        id: counter.current,
        firstName: '',
        lastName: '',
        grade: validGrades[0],
        topic: validTopics[0],
        times: [],
    };

    const defaults = {
        students: [],
        formOpen: false,
        editStudent: newStudent,
        meetingMinutes: 0,
    };

    const [students, setStudents] = useState<FormData[]>(defaults.students);
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

    const handleAddStudent = (student: FormData) => {
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

    const handleEditStudent = (student: FormData) => {
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

    function updateFields(fields: Partial<FormData>) {
        setEditStudent((prev: FormData) => {
            return { ...prev, ...fields };
        });
    }

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
                        data={editStudent}
                        meetingMinutes={meetingMinutes}
                        updateFields={updateFields}
                        handleParentSubmit={handleAddStudent}
                        handleParentClose={handleFormClose}
                    />
                </Box>
            </Modal>
            <MeetingDurationForm
                disabled={timeSubmit}
                handleParentChange={setMeetingMinutes}
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
