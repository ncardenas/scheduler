import React, { useState } from 'react';
import { Stack } from '@mui/material';
import {
    ClearButton,
    ScheduleStudentsButton,
    NewEntryButton,
    SubmitButton,
} from './Buttons';

interface Props {
    handleNewEntry: () => void;
    handleClear: () => void;
    handleSubmit: (arg: boolean) => void;
}
export const ButtonBar: React.FC<Props> = ({
    handleNewEntry,
    handleClear,
    handleSubmit,
}) => {
    const [submitClicked, setSubmitClicked] = useState(false);

    const handleSubmitClicked = () => {
        handleSubmit(true);
        setSubmitClicked(true);
    };

    return (
        <Stack spacing={2} direction="row" justifyContent="center">
            {!submitClicked ? (
                <SubmitButton
                    disabled={false}
                    handleClick={() => handleSubmitClicked()}
                />
            ) : (
                <>
                    <NewEntryButton handleClick={handleNewEntry} />
                    <ScheduleStudentsButton handleClick={() => {}} />
                    <ClearButton handleClick={handleClear} />
                </>
            )}
        </Stack>
    );
};
