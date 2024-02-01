import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Availability } from '../../types';
import { TimeTable } from '../TimeTable';
import { validDays } from '../../constants';
import './TimeEntry.css';

import {
    createMeetingOptions,
    Option,
    optionToString,
} from './createMeetingTime';

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
    const [timeSelected, setTimeSelected] = useState(0);
    const [meetingTimes, setMeetingTimes] = useState(
        createMeetingOptions(meetingMinutes)
    );

    const handleDeleteTime = (index: number) => {
        const update = times.filter((_, i) => i !== index);
        updateFields({ times: update });

        const newEntry: Option = {
            start: times[index].startTime,
            end: times[index].endTime,
        };

        // Add to available meeting times
        setMeetingTimes((prev) => {
            const update = [...prev, newEntry].sort(
                (lhs, rhs) => lhs.start - rhs.start
            );
            return update;
        });
    };

    const handleAddTime = () => {
        const startTime = meetingTimes[timeSelected].start;
        const endTime = meetingTimes[timeSelected].end;
        const newEntry: Availability = {
            day,
            startTime,
            endTime,
        };
        updateFields({ times: [...times, newEntry] });

        // Remove from available meeting times
        setMeetingTimes((prev) => prev.filter((_, i) => i !== timeSelected));
    };

    return (
        <>
            <h2 className="header">Student Availability</h2>
            <div className="popup">
                <div className="line-item item-a">
                    <label>Day</label>
                    <select
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                    >
                        {validDays.map((day) => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="line-item item-b">
                    <label>Times</label>
                    <select
                        value={timeSelected}
                        onChange={(e) => setTimeSelected(+e.target.value)}
                    >
                        {meetingTimes.map((option: Option, i: number) => (
                            <option key={i} value={i}>
                                {optionToString(option)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="item-c">
                    <Button
                        type="button"
                        size="small"
                        variant="contained"
                        color="primary"
                        style={{ maxWidth: '30px' }}
                        onClick={() => handleAddTime()}
                    >
                        Add
                    </Button>
                </div>

                <div className="item-d">
                    <Box sx={{ height: '300px', overflowY: 'scroll' }}>
                        <TimeTable
                            handleParentDelete={handleDeleteTime}
                            times={times}
                        />
                    </Box>
                </div>
            </div>
        </>
    );
};
