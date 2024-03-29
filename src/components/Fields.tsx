import React from 'react';
import {
    TextField,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
} from '@mui/material';

interface IDProps {
    value: number;
    handleInputChange: (arg: number) => void;
}

export const IDField: React.FC<IDProps> = ({ value, handleInputChange }) => {
    return (
        <TextField
            id="id-field"
            name="ID"
            label="Unique ID"
            type="number"
            disabled={true}
            value={value}
            onChange={(e) => handleInputChange(Number(e.target.value))}
        />
    );
};

interface NameProps {
    value: string;
    handleInputChange: (arg: string) => void;
}
export const NameField: React.FC<NameProps> = ({
    value,
    handleInputChange,
}) => {
    return (
        <TextField
            id="name-input"
            name="name"
            label="Name"
            type="text"
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
        />
    );
};

interface GradeProps {
    handleInputChange: () => void;
}
export const GradeField: React.FC<GradeProps> = ({ handleInputChange }) => {
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

interface SelectGradeProps {
    validGrades: string[];
    value: string;
    handleInputChange: (arg: string) => void;
}
export const SelectGrade: React.FC<SelectGradeProps> = ({
    validGrades,
    value,
    handleInputChange,
}) => {
    return (
        <FormControl size="small">
            <InputLabel>Grade</InputLabel>
            <Select
                value={value}
                onChange={(e) => handleInputChange(e.target.value)}
            >
                {validGrades.map((grade: string) => (
                    <MenuItem key={grade} value={grade}>
                        {grade}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

interface SelectTopicProps {
    topics: string[];
    value: string;
    handleInputChange: (arg: string) => void;
}
export const SelectTopic: React.FC<SelectTopicProps> = ({
    topics,
    value,
    handleInputChange,
}) => {
    return (
        <FormControl size="small">
            <InputLabel>Topic</InputLabel>
            <Select
                value={value}
                onChange={(e) => handleInputChange(e.target.value)}
            >
                {topics.map((topic: string) => (
                    <MenuItem key={topic} value={topic}>
                        {topic}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

interface SelectDayProps {
    validDays: string[];
    value: string;
    handleInputChange: (arg: string) => void;
}
export const SelectDay: React.FC<SelectDayProps> = ({
    validDays,
    value,
    handleInputChange,
}) => {
    return (
        <FormControl size="small">
            <InputLabel>Day</InputLabel>
            <Select
                value={value}
                onChange={(e) => handleInputChange(e.target.value)}
            >
                {validDays.map((day: string) => (
                    <MenuItem key={day} value={day}>
                        {day}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

interface SelectTimeProps {
    options: React.JSX.Element[];
    value: string;
    handleChange: (arg: string) => void;
}
export const SelectTime: React.FC<SelectTimeProps> = ({
    options,
    value,
    handleChange,
}) => (
    <FormControl fullWidth>
        <InputLabel>Meeting Time</InputLabel>
        <Select value={value} onChange={(e) => handleChange(e.target.value)}>
            {options}
        </Select>
    </FormControl>
);
