import React, { useState, useEffect } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import {
  IDField,
  NameField,
  SelectTopic,
  SelectDay,
  SelectTime,
  SelectGrade,
} from './Fields';

import { AddTimeBlockButton, SubmitButton, CloseFormButton } from './Buttons';
import { TimeTable } from './TimeTable';
import { StudentRecord } from '../App';

export interface Availability {
  day: string;
  startTime: string;
  endTime: string;
  delete: (tableData: Availability[], arg: number) => void;
}

interface Props {
  student: StudentRecord;
  handleParentSubmit: (student: StudentRecord) => void;
  handleParentClose: () => void;
}

export const Form = ({
  student,
  handleParentSubmit,
  handleParentClose,
}: Props) => {
  const validTopics = ['Speech', 'Another', 'AnotherAnother'];
  const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const validGrades = ['First', 'Second', 'Third'];
  const header = 'Student Information';
  const defaults = {
    id: '',
    name: '',
    grade: validGrades[0],
    topic: validTopics[0],
    day: validDays[0],
    times: [],
    startTime: '08:00',
    endTime: '08:30',
    disableSubmit: true,
  };

  const [id, setId] = useState(student.id);
  const [name, setName] = useState(student.name);
  const [grade, setGrade] = useState(student.grade);
  const [topic, setTopic] = useState(student.topic);
  const [times, setTimes] = useState<Availability[]>(student.times);

  const [day, setDay] = useState(defaults.day);
  const [startTime, setStartTime] = useState(defaults.startTime);
  const [endTime, setEndTime] = useState(defaults.endTime);
  const [disableSubmit, setDisableSubmit] = useState(defaults.disableSubmit);

  useEffect(() => {
    // Enable submit if all fields are set
    const letters = /^[0-9a-zA-Z]+$/;
    if (id.match(letters) && name.match(letters) && times.length > 0) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [id, name, times]);

  const handleDeleteTime = (index) => {
    const update = times.filter((_, i) => i !== index);
    console.log('delete time');
    console.log(index);
    console.log(update);
    setTimes(update);
  };

  const handleAddTime = () => {
    const newEntry: Availability = {
      day,
      startTime,
      endTime,
      delete: handleDeleteTime,
    };

    setTimes((prev) => [...prev, newEntry]);
  };

  const handleSubmit = () => {
    handleParentSubmit({
      id,
      name,
      grade,
      topic,
      times,
    });
    clearForm();
  };

  const clearForm = () => {
    setId(defaults.id);
    setName(defaults.name);
    setGrade(defaults.grade);
    setTopic(defaults.topic);
    setDay(defaults.day);
    setStartTime(defaults.startTime);
    setEndTime(defaults.endTime);
    setTimes([]);
  };

  return (
    <Stack margin={2} spacing={2}>
      <Typography align="center">{header}</Typography>
      <Stack spacing={2} direction="row" justifyContent="center">
        <SubmitButton
          disabled={disableSubmit}
          handleClick={() => handleSubmit()}
        />
        <CloseFormButton handleClick={() => handleParentClose()} />
      </Stack>
      <Stack spacing={2} direction="row" justifyContent="center">
        {/**TODO: Make Ids unique */}
        <IDField value={id} handleInputChange={(e) => setId(e.target.value)} />
        <NameField
          value={name}
          handleInputChange={(e) => setName(e.target.value)}
        />
        <SelectGrade
          validGrades={validGrades}
          value={grade}
          handleInputChange={setGrade}
        />
        <SelectTopic
          topics={validTopics}
          value={topic}
          handleInputChange={setTopic}
        />
      </Stack>
      {/* Day and Time */}
      <Stack spacing={2} direction="row" justifyContent="center">
        <SelectDay
          validDays={validDays}
          value={day}
          handleInputChange={setDay}
        />
        <SelectTime
          value={startTime}
          handleChange={(e) => setStartTime(e.target.value)}
        />
        <SelectTime
          value={endTime}
          handleChange={(e) => setEndTime(e.target.value)}
        />
        <AddTimeBlockButton handleClick={() => handleAddTime()} />
      </Stack>
      <Box sx={{ height: '300px', overflowY: 'scroll' }}>
        <TimeTable handleParentDelete={handleDeleteTime} times={times} />
      </Box>
    </Stack>
  );
};
