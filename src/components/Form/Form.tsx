import { TimeEntry } from './TimeEntry';
import { FormData } from '../../types';
import { useMultistepForm } from './useMultistepForm';
import { Button } from '@mui/material';
import React from 'react';
import { StudentInfo } from './StudentInfo';

interface Props {
    data: FormData;
    meetingMinutes: number;
    updateFields: (fields: Partial<FormData>) => void;
    handleParentSubmit: (student: FormData) => void;
    handleParentClose: () => void;
}

export const Form = ({
    data,
    meetingMinutes,
    updateFields,
    handleParentSubmit,
    handleParentClose,
}: Props) => {
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
        handleParentSubmit(data);
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
