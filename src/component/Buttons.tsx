import React from 'react';
import { Button } from '@mui/material';

export const SubmitButton = ({ handleClick }) => (
  <Button
    variant="contained"
    color="primary"
    type="submit"
    onClick={handleClick}
  >
    Submit
  </Button>
);

export const ClearButton = ({ handleClick }) => (
  <Button variant="contained" color="primary" onClick={handleClick}>
    Clear All
  </Button>
);

export const UploadFileButton = ({ handleClick }) => (
  <Button variant="contained" color="primary" onClick={handleClick}>
    Upload File
  </Button>
);

export const StudentButton = ({ buttonText, handleClick }) => (
  <Button variant="contained" color="primary" onClick={handleClick}>
    {buttonText}
  </Button>
);

export const NewStudentButton = ({ handleClick }) => (
  <Button
    variant="contained"
    color="primary"
    type="submit"
    onClick={handleClick}
  >
    New Student
  </Button>
);

export const AddTimeBlockButton = ({ handleClick }) => (
  <Button
    variant="contained"
    color="primary"
    type="submit"
    onClick={handleClick}
  >
    Add
  </Button>
);

export const NewEntryButton = ({ handleClick }) => (
  <Button variant="contained" color="primary" onClick={handleClick}>
    New Entry
  </Button>
);

export const ScheduleStudentsButton = ({ handleClick }) => (
  <Button variant="contained" color="primary" onClick={handleClick}>
    Schedule
  </Button>
);

export const CloseFormButton = ({ handleClick }) => (
  <Button variant="contained" color="primary" onClick={handleClick}>
    Close
  </Button>
);

export const DeleteTimeEntry = ({ handleClick }) => (
  <Button variant="contained" color="primary" onClick={handleClick}>
    Delete
  </Button>
);
