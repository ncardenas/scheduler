import React from 'react';
import { Stack } from '@mui/material';
import {
  IDField,
  NameField,
  SelectTopic,
  SelectDay,
  SelectTime,
  SelectGrade,
} from './Fields';

import { AddTimeBlockButton, SubmitButton } from './Buttons';
export const Form = ({
  disableForm,
  setId,
  setName,
  validGrades,
  grade,
  setGrade,
  validTopics,
  topic,
  setTopic,
  validDays,
  day,
  setDay,
}) => {
  return (
    <Stack margin={2} spacing={2}>
      <SubmitButton handleClick={() => {}} />
      <Stack spacing={2} direction="row" justifyContent="center">
        <IDField disabled={disableForm} handleInputChange={setId} />
        <NameField handleInputChange={setName} disabled={disableForm} />
        <SelectGrade
          validGrades={validGrades}
          value={grade}
          handleInputChange={setGrade}
          disabled={disableForm}
        />
        <SelectTopic
          topics={validTopics}
          value={topic}
          handleInputChange={setTopic}
          disabled={disableForm}
        />
      </Stack>
      {/* Day and Time */}
      <Stack spacing={2} direction="row" justifyContent="center">
        <SelectDay
          validDays={validDays}
          value={day}
          handleInputChange={setDay}
        />
        <SelectTime />
        <SelectTime />
        <AddTimeBlockButton handleClick={() => {}} />
      </Stack>
      {/* TODO add table for times */}
    </Stack>
  );
};
