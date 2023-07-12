import React, { useState } from 'react';
import { Box, Stack, Modal } from '@mui/material';
import { Form } from './component/Form';
import { Availability } from './component/Form';
import {
  ClearButton,
  ScheduleStudentsButton,
  NewEntryButton,
} from './component/Buttons';

import StudentTable from './StudentTable/StudentTable';

export interface StudentRecord {
  id: string;
  name: string;
  grade: string;
  topic: string;
  times: Availability[];
}

function App() {
  const initStudents = [];
  const validTopics = ['Speech', 'Another', 'AnotherAnother'];
  const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const validGrades = ['First', 'Second', 'Third'];

  const newStudent = {
    id: '',
    name: '',
    grade: validGrades[0],
    topic: validTopics[0],
    times: [],
  };

  const defaults = {
    students: [],
    formOpen: false,
    editStudent: newStudent,
  };

  const [students, setStudents] = useState<StudentRecord[]>(defaults.students);
  const [formOpen, setFormOpen] = useState(defaults.formOpen);
  const [editStudent, setEditStudent] = useState(defaults.editStudent);

  function handleClear() {
    setStudents(initStudents);
  }

  const handleFormClose = () => {
    setFormOpen(false);
    setEditStudent(newStudent);
  };

  const handleAddStudent = (student: StudentRecord) => {
    let index = -1;
    students.forEach((saved_student, i) => {
      if (saved_student.id === student.id) index = i;
    });

    if (index === -1) {
      setStudents((prev) => [...prev, student]);
    } else {
      students[index] = student;
      setStudents(students);
    }
  };

  const handleEditStudent = (student) => {
    setEditStudent(student);
    setFormOpen(true);
  };

  const handleDeleteStudent = (index) => {
    const update = students.filter((_, i) => i !== index);
    setStudents(update);
  };

  return (
    <Stack marginTop={2} spacing={2}>
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
      <Stack spacing={2} direction="row" justifyContent="center">
        <NewEntryButton handleClick={() => setFormOpen(true)} />
        <ScheduleStudentsButton handleClick={() => {}} />
        <ClearButton handleClick={handleClear} />
      </Stack>
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
