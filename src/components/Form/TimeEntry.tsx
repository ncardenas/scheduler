import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import { Availability } from '../../types';
import { TimeTable } from '../TimeTable';
import { AddTimeBlockButton } from '../Buttons';

import { SelectDay, SelectTime } from '../Fields';
import { validDays } from '../../constants';
import { createMeetingOptions, Option } from './createMeetingTime';

const defaults = {
    day: validDays[0],
    startTime: '08:00',
    endTime: '08:30',
    disableSubmit: true,
};

type TimeData = {
    times: Availability[];
};

type Props = TimeData & {
    meetingMinutes: number;
    updateFields: (fields: Partial<TimeData>) => void;
};

export const TimeEntry = ({ times, meetingMinutes, updateFields }: Props) => {
    const [day, setDay] = useState(defaults.day);
    const [timeSelected, setTimeSelected] = useState('');
    const [startTime, setStartTime] = useState(defaults.startTime);
    const [endTime, setEndTime] = useState(defaults.endTime);

    const meetingOptions = createMeetingOptions(meetingMinutes);
    const handleDeleteTime = (index: number) => {
        const update = times.filter((_, i) => i !== index);
        updateFields({ times: update });
    };

    const handleAddTime = () => {
        // TODO: Merge times or prevent cross over times
        const newEntry: Availability = {
            day,
            startTime,
            endTime,
        };
        updateFields({ times: [...times, newEntry] });

        setStartTime(endTime);
        setEndTime(endTime);
    };

    return (
        <Stack>
            <Stack spacing={2} direction="row" justifyContent="center">
                <SelectDay
                    validDays={validDays}
                    value={day}
                    handleInputChange={setDay}
                />
                <SelectTime
                    options={meetingOptions.map(
                        (option: Option) => option.menuItem
                    )}
                    value={timeSelected}
                    handleChange={setTimeSelected}
                />
                <AddTimeBlockButton handleClick={() => handleAddTime()} />
            </Stack>
            <Box sx={{ height: '300px', overflowY: 'scroll' }}>
                <TimeTable
                    handleParentDelete={handleDeleteTime}
                    times={times}
                />
            </Box>
        </Stack>
    );
};
