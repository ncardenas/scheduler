import React from 'react';
import { Button } from '@mui/material';

interface SubmitProps {
    disabled: boolean;
    handleClick: () => void;
}
export const SubmitButton: React.FC<SubmitProps> = ({
    disabled,
    handleClick,
}) => (
    <Button
        disabled={disabled}
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleClick}
    >
        Submit
    </Button>
);

interface ButtonProps {
    handleClick: () => void;
}
export const ClearButton: React.FC<ButtonProps> = ({ handleClick }) => (
    <Button variant="contained" color="primary" onClick={handleClick}>
        Clear All
    </Button>
);

export const UploadFileButton: React.FC<ButtonProps> = ({ handleClick }) => (
    <Button variant="contained" color="primary" onClick={handleClick}>
        Upload File
    </Button>
);

interface StudentButtonProps {
    buttonText: string;
    handleClick: () => void;
}
export const StudentButton: React.FC<StudentButtonProps> = ({
    buttonText,
    handleClick,
}) => (
    <Button variant="contained" color="primary" onClick={handleClick}>
        {buttonText}
    </Button>
);

export const NewStudentButton: React.FC<ButtonProps> = ({ handleClick }) => (
    <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleClick}
    >
        New Student
    </Button>
);

export const AddTimeBlockButton: React.FC<ButtonProps> = ({ handleClick }) => (
    <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleClick}
    >
        Add
    </Button>
);

export const NewEntryButton: React.FC<ButtonProps> = ({ handleClick }) => (
    <Button variant="contained" color="primary" onClick={handleClick}>
        New Entry
    </Button>
);

export const ScheduleStudentsButton: React.FC<ButtonProps> = ({
    handleClick,
}) => (
    <Button variant="contained" color="primary" onClick={handleClick}>
        Schedule
    </Button>
);

export const CloseFormButton: React.FC<ButtonProps> = ({ handleClick }) => (
    <Button variant="contained" color="primary" onClick={handleClick}>
        Close
    </Button>
);

export const DeleteTimeEntry: React.FC<ButtonProps> = ({ handleClick }) => (
    <Button variant="contained" color="primary" onClick={handleClick}>
        Delete
    </Button>
);

export const StudentEditButton: React.FC<ButtonProps> = ({ handleClick }) => (
    <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={handleClick}
    >
        Edit
    </Button>
);

export const StudentDeleteButton: React.FC<ButtonProps> = ({ handleClick }) => (
    <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={handleClick}
    >
        Delete
    </Button>
);
