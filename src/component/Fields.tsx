import React from 'react';
import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';

export const IDField = ({ value, handleInputChange }) => {
  return (
    <TextField
      id="id-field"
      name="ID"
      label="ID"
      type="text"
      value={value}
      onChange={handleInputChange}
    />
  );
};

export const NameField = ({ value, handleInputChange }) => {
  return (
    <TextField
      id="name-input"
      name="name"
      label="Name"
      type="text"
      value={value}
      onChange={handleInputChange}
    />
  );
};

export const GradeField = ({ handleInputChange }) => {
  return (
    <TextField
      id="grade-input"
      name="grade"
      label="Grade"
      type="number"
      onChange={handleInputChange}
    />
  );
};

export const SelectGrade = ({ validGrades, value, handleInputChange }) => {
  return (
    <FormControl size="small">
      <InputLabel>Grade</InputLabel>
      <Select value={value} onChange={(e) => handleInputChange(e.target.value)}>
        {validGrades.map((grade: string) => (
          <MenuItem key={grade} value={grade}>
            {grade}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const SelectTopic = ({ topics, value, handleInputChange }) => {
  return (
    <FormControl size="small">
      <InputLabel>Topic</InputLabel>
      <Select value={value} onChange={(e) => handleInputChange(e.target.value)}>
        {topics.map((topic: string) => (
          <MenuItem key={topic} value={topic}>
            {topic}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const SelectDay = ({ validDays, value, handleInputChange }) => {
  return (
    <FormControl size="small">
      <InputLabel>Day</InputLabel>
      <Select value={value} onChange={(e) => handleInputChange(e.target.value)}>
        {validDays.map((day: string) => (
          <MenuItem key={day} value={day}>
            {day}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const SelectTime = ({ value, handleChange }) => {
  return (
    <input
      defaultValue={value}
      type="time"
      name="startdate"
      onChange={handleChange}
    />
  );
};
