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

  const defaults = {
    students: [],
    formOpen: false,
  };

  const [students, setStudents] = useState(defaults.students);
  const [formOpen, setFormOpen] = useState(defaults.formOpen);

  function handleClear() {
    setStudents(initStudents);
  }

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleAddStudent = (student: StudentRecord) => {
    setStudents((prev) => [...prev, student]);
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
        <StudentTable students={students} />
      </Box>
    </Stack>
  );
}

export default App;
