import React, { useState } from 'react';
import { Box, Stack, Modal } from '@mui/material';
import { Form } from './component/Form';

import {
  SubmitButton,
  ClearButton,
  NewStudentButton,
  AddTimeBlockButton,
  NewEntryButton,
  ScheduleStudentsButton,
} from './component/Buttons';

import StudentTable from './StudentTable/StudentTable';

function App() {
  const initStudents = [];
  const validTopics = ['Speech', 'Another', 'AnotherAnother'];
  const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const validGrades = ['First', 'Second', 'Third'];

  const defaults = {
    id: '',
    name: '',
    grade: validGrades[0],
    topic: validTopics[0],
    day: validDays[0],
    disableForm: false,
    students: [],
    clickedSubmit: false,
    formOpen: false,
  };

  const [id, setID] = useState(defaults.id);
  const [name, setName] = useState(defaults.name);
  const [grade, setGrade] = useState(defaults.grade);
  const [topic, setTopic] = useState(defaults.topic);
  const [day, setDay] = useState(defaults.day);
  const [disableForm, setDisableForm] = useState(defaults.disableForm);
  const [students, setStudents] = useState(defaults.students);
  const [clickedSubmit, setClickedSubmit] = useState(defaults.clickedSubmit);
  const [formOpen, setFormOpen] = useState(false);

  function handleClear() {
    clearFormFields();
    setStudents(initStudents);
    setDisableForm(defaults.disableForm);
  }

  const handleSubmit = () => {
    setDisableForm(true);
    // setClickedSubmit(true);
  };

  const clearFormFields = () => {
    setID(defaults.id);
    setName(defaults.name);
    setGrade(defaults.grade);
    setTopic(defaults.topic);
    setDay(defaults.day);
  };

  return (
    <Stack marginTop={2} spacing={2}>
      <NewEntryButton handleClick={() => setFormOpen(true)} />
      <Modal open={formOpen} onClose={() => setFormOpen(false)}>
        <Box
          sx={{
            backgroundColor: 'background.paper',
            position: 'absolute',
            top: '25%',
            left: '25%',
          }}
        >
          <Form
            disableForm={disableForm}
            setId={setID}
            setName={setName}
            validGrades={validGrades}
            grade={grade}
            setGrade={setGrade}
            validTopics={validTopics}
            topic={topic}
            setTopic={setTopic}
            validDays={validDays}
            day={day}
            setDay={setDay}
          />
        </Box>
      </Modal>
      <Stack spacing={2} direction="row" justifyContent="center">
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
