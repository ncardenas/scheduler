import React, { useState } from 'react';
import { Stack, Typography, TextField } from '@mui/material';

interface Props {
    disabled: boolean;
    handleParentChange: (arg: number) => void;
}

export const MeetingDurationForm: React.FC<Props> = ({
    disabled,
    handleParentChange,
}) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);

    const handleChangeHour = (newHours: number) => {
        let localHours = 0;

        if (newHours < 0) {
            localHours = 24;
        } else if (newHours > 24) {
            localHours = 0;
        } else {
            localHours = newHours;
        }
        setHours(localHours);
        const hoursInMins = localHours * 60;
        handleParentChange(hoursInMins + minutes);
    };

    const handleChangeMinutes = (newMinutes: number) => {
        const hoursInMins = hours * 60;
        let localMinutes = 0;

        if (newMinutes < 0) {
            localMinutes = 59;
        } else if (newMinutes > 59) {
            localMinutes = 0;
        } else {
            localMinutes = newMinutes;
        }

        setMinutes(localMinutes);
        handleParentChange(hoursInMins + localMinutes);
    };

    return (
        <Stack spacing={2} alignItems="center">
            <Typography>Meeting Duration</Typography>
            <Stack spacing={2} alignItems="center" direction="row">
                <TextField
                    disabled={disabled}
                    size="small"
                    type="number"
                    label="Hours"
                    value={hours}
                    onChange={(e) => handleChangeHour(Number(e.target.value))}
                />
                <TextField
                    disabled={disabled}
                    size="small"
                    type="number"
                    label="Minutes"
                    value={minutes}
                    onChange={(e) =>
                        handleChangeMinutes(Number(e.target.value))
                    }
                />
            </Stack>
        </Stack>
    );
};
