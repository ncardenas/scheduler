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

export interface Availability {
  day: string;
  startTime: string;
  endTime: string;
  delete: (tableData: Availability[], arg: number) => void;
}

export const Form = ({ handleParentSubmit, handleParentClose }) => {
  const validTopics = ['Speech', 'Another', 'AnotherAnother'];
  const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const validGrades = ['First', 'Second', 'Third'];
  const header = 'New Student';
  const defaults = {
    id: '',
    name: '',
    grade: validGrades[0],
    topic: validTopics[0],
    day: validDays[0],
    startTime: '08:00',
    endTime: '08:30',
    timesError: false,
  };

  const [id, setId] = useState(defaults.id);
  const [name, setName] = useState(defaults.name);
  const [grade, setGrade] = useState(defaults.grade);
  const [topic, setTopic] = useState(defaults.topic);
  const [day, setDay] = useState(defaults.day);
  const [startTime, setStartTime] = useState(defaults.startTime);
  const [endTime, setEndTime] = useState(defaults.endTime);
  const [times, setTimes] = useState<Availability[]>([]);
  const [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => {
    // Enable submit if all fields are set
    const letters = /^[0-9a-zA-Z]+$/;
    if (id.match(letters) && name.match(letters) && times.length > 0) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [id, name, times]);

  const handleDeleteTime = (tableData, index) => {
    const update = tableData.filter((_, i) => i !== index);
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
        <TimeTable times={times} />
      </Box>
    </Stack>
  );
};
