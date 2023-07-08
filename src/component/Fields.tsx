import React from 'react';
import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';

export const IDField = ({ disabled, handleInputChange }) => {
  return (
    <TextField
      id="id-field"
      name="ID"
      label="ID"
      type="text"
      onChange={handleInputChange}
      disabled={disabled}
    />
  );
};

export const NameField = ({ disabled, handleInputChange }) => {
  return (
    <TextField
      id="name-input"
      name="name"
      label="Name"
      type="text"
      onChange={handleInputChange}
      disabled={disabled}
    />
  );
};

export const GradeField = ({ disabled, handleInputChange }) => {
  return (
    <TextField
      id="grade-input"
      name="grade"
      label="Grade"
      type="number"
      onChange={handleInputChange}
      disabled={disabled}
    />
  );
};

export const SelectGrade = ({
  disabled,
  validGrades,
  value,
  handleInputChange,
}) => {
  return (
    <FormControl disabled={disabled} size="small">
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

export const SelectTopic = ({ disabled, topics, value, handleInputChange }) => {
  return (
    <FormControl disabled={disabled} size="small">
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

export const SelectTime = () => {
  return <input type="time" name="startdate" />;
};
