import React, { useState } from 'react';
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
  action: string;
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
  };

  const [id, setId] = useState(defaults.id);
  const [name, setName] = useState(defaults.name);
  const [grade, setGrade] = useState(defaults.grade);
  const [topic, setTopic] = useState(defaults.topic);

  const [day, setDay] = useState(defaults.day);
  const [startTime, setStartTime] = useState(defaults.startTime);
  const [endTime, setEndTime] = useState(defaults.endTime);

  const [times, setTimes] = useState<Availability[]>([]);

  const handleAddTime = () => {
    // must match table headers to display data
    setTimes((prev) => [...prev, { day, startTime, endTime, action: 'todo' }]);
  };

  const handleSubmit = () => {
    setId(defaults.id);
    setName(defaults.name);
    setGrade(defaults.grade);
    setTopic(defaults.topic);
    setDay(defaults.day);
    setStartTime(defaults.startTime);
    setEndTime(defaults.endTime);
    handleParentSubmit();
  };

  return (
    <Stack margin={2} spacing={2}>
      <Typography align="center">{header}</Typography>
      <Stack spacing={2} direction="row" justifyContent="center">
        <SubmitButton handleClick={() => handleSubmit()} />
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
        <SelectTime value={startTime} />
        <SelectTime value={endTime} />
        <AddTimeBlockButton handleClick={() => handleAddTime()} />
      </Stack>
      <Box sx={{ height: '300px', overflowY: 'scroll' }}>
        <TimeTable times={times} />
      </Box>
    </Stack>
  );
};
