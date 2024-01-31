import React, { useState } from 'react';
import { Stack, Box, Button } from '@mui/material';
import { Availability } from '../../types';
import { TimeTable } from '../TimeTable';
import { AddTimeBlockButton } from '../Buttons';
import { FormWrapper } from './FormWrapper';

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
        // TODO: eliminate selected time from options
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
        <FormWrapper title="Meeting Times">
            <label>Day</label>
            <select value={day} onChange={(e) => setDay(e.target.value)}>
                {validDays.map((day) => (
                    <option value={day}>{day}</option>
                ))}
            </select>
            <label>Meeting Time</label>
            <select
                value={timeSelected}
                onChange={(e) => setTimeSelected(e.target.value)}
            >
                {meetingOptions.map((option: Option) => option.menuItem)}
            </select>

            <Button
                type="button"
                size="small"
                variant="contained"
                color="primary"
                onClick={() => handleAddTime()}
            >
                Add
            </Button>
            <div>
                <Box sx={{ height: '300px', overflowY: 'scroll' }}>
                    <TimeTable
                        handleParentDelete={handleDeleteTime}
                        times={times}
                    />
                </Box>
            </div>
        </FormWrapper>
    );
};
