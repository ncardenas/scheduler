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
}

interface Props {
  student: StudentRecord;
  validDays: string[];
  validGrades: string[];
  validTopics: string[];
  handleParentSubmit: (student: StudentRecord) => void;
  handleParentClose: () => void;
}

export const Form = ({
  student,
  validDays,
  validGrades,
  validTopics,
  handleParentSubmit,
  handleParentClose,
}: Props) => {
  const header = 'Student Information';
  const defaults = {
    day: validDays[0],
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
    // TODO: Allow spaces here
    const letters = /^[0-9a-zA-Z]+$/;
    if (name.match(letters) && times.length > 0) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [id, name, times]);

  useEffect(() => {
    // This should be triggered when a new student is given to display on the form
    setId(student.id);
    setName(student.name);
    setGrade(student.grade);
    setTopic(student.topic);
    setTimes(student.times);

    setDay(defaults.day);
    setStartTime(defaults.startTime);
    setEndTime(defaults.endTime);
  }, [student, defaults.day, defaults.startTime, defaults.endTime]);

  const handleDeleteTime = (index) => {
    const update = times.filter((_, i) => i !== index);
    setTimes(update);
  };

  const handleAddTime = () => {
    // TODO: Merge times or prevent cross over times
    const newEntry: Availability = {
      day,
      startTime,
      endTime,
    };
    setTimes((prev) => [...prev, newEntry]);

    setStartTime(endTime);
    setEndTime(endTime);
  };

  const handleSubmit = () => {
    handleParentSubmit({
      id,
      name,
      grade,
      topic,
      times,
    });
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
