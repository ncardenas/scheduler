import { useState } from 'react';
import { BasicInfo } from './BasicInfo';
import { TimeEntry } from './TimeEntry';
import { StudentRecord } from '../../types';
import { useMultistepForm } from './useMultistepForm';
import { Button } from '@mui/material';
import React from 'react';
import { StudentInfo } from './StudentInfo';
import { validGrades, validTopics } from '../../constants';

type FormData = {
    firstName: string;
    lastName: string;
    grade: string;
    topic: string;
};
const INITIAL_DATA: FormData = {
    firstName: '',
    lastName: '',
    grade: validGrades[0],
    topic: validTopics[0],
};

interface Props {
    meetingMinutes: number;
    student: StudentRecord;
    validDays: string[];
    validGrades: string[];
    validTopics: string[];
    handleParentSubmit: (student: StudentRecord) => void;
    handleParentClose: () => void;
}
export const Form = ({
    meetingMinutes,
    student,
    validDays,
    validGrades,
    validTopics,
    handleParentSubmit,
    handleParentClose,
}: Props) => {
    const [data, setData] = useState(INITIAL_DATA);

    function updateFields(fields: Partial<FormData>) {
        setData((prev) => {
            return { ...prev, ...fields };
        });
    }

    const {
        steps,
        currentStepIndex,
        step,
        isFirstStep,
        isLastStep,
        back,
        next,
    } = useMultistepForm([
        // <BasicInfo
        //     student={student}
        //     validDays={validDays}
        //     validGrades={validGrades}
        //     validTopics={validTopics}
        //     handleParentSubmit={handleParentSubmit}
        //     handleParentClose={handleParentClose}
        // />,
        <StudentInfo {...data} updateFields={updateFields} />,
        <TimeEntry
            meetingMinutes={meetingMinutes}
            student={student}
            validDays={validDays}
        />,
    ]);

    function onSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        if (!isLastStep) return next();
        alert('Successful!');
    }

    return (
        <div
            style={{
                position: 'relative',
                background: 'white',
                border: '1px solid black',
                padding: '2rem',
                margin: '1rem',
                borderRadius: '.5rem',
                fontFamily: 'Areal',
                maxWidth: 'max-content',
            }}
        >
            <form onSubmit={onSubmit}>
                <div
                    style={{
                        position: 'absolute',
                        top: '.5rem',
                        right: '.5rem',
                    }}
                >
                    {currentStepIndex + 1} /{steps.length}
                </div>
                {step}
                <div
                    style={{
                        marginTop: '1rem',
                        display: 'flex',
                        gap: '.5rem',
                        justifyContent: 'flex-end',
                    }}
                >
                    {!isFirstStep && (
                        <Button type="button" onClick={back}>
                            Back
                        </Button>
                    )}
                    <Button type="submit">
                        {isLastStep ? 'Submit' : 'Next'}
                    </Button>
                </div>
            </form>
        </div>
    );
};
