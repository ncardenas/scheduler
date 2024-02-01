import { useState } from 'react';
import { TimeEntry } from './TimeEntry';
import { Availability, StudentRecord } from '../../types';
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
    times: Availability[];
};

const INITIAL_DATA: FormData = {
    firstName: '',
    lastName: '',
    grade: validGrades[0],
    topic: validTopics[0],
    times: [],
};

interface Props {
    meetingMinutes: number;
    handleParentSubmit: (student: StudentRecord) => void;
    handleParentClose: () => void;
}
export const Form = ({
    meetingMinutes,
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
        <StudentInfo {...data} updateFields={updateFields} />,
        <TimeEntry
            {...data}
            updateFields={updateFields}
            meetingMinutes={meetingMinutes}
        />,
    ]);

    function onSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        if (!isLastStep) return next();
        // handleParentSubmit();
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
                    <Button
                        type="button"
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={handleParentClose}
                    >
                        Close
                    </Button>
                    {!isFirstStep && (
                        <Button
                            type="button"
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={back}
                        >
                            Back
                        </Button>
                    )}
                    <Button
                        type="submit"
                        size="small"
                        variant="contained"
                        color="primary"
                    >
                        {isLastStep ? 'Submit' : 'Next'}
                    </Button>
                </div>
            </form>
        </div>
    );
};
