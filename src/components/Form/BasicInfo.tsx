import React, { useState, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import { IDField, NameField, SelectTopic, SelectGrade } from '../Fields';

import { SubmitButton, CloseFormButton } from '../Buttons';
import { StudentRecord, Availability } from '../../types';

const header = 'Student Information';

interface Props {
    student: StudentRecord;
    validDays: string[];
    validGrades: string[];
    validTopics: string[];
    handleParentSubmit: (student: StudentRecord) => void;
    handleParentClose: () => void;
}

export const BasicInfo = ({
    student,
    validDays,
    validGrades,
    validTopics,
    handleParentSubmit,
    handleParentClose,
}: Props) => {
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
    }, [student, defaults.day, defaults.startTime, defaults.endTime]);

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
                <IDField value={id} handleInputChange={setId} />
                <NameField value={name} handleInputChange={setName} />
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
        </Stack>
    );
};
