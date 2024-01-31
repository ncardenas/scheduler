import React, { useState } from 'react';
import { Stack, Box, MenuItem } from '@mui/material';
import { StudentRecord, Availability } from '../../types';
import { TimeTable } from '../TimeTable';
import { AddTimeBlockButton } from '../Buttons';

import { SelectDay, SelectTime } from '../Fields';

interface Props {
    meetingMinutes: number;
    student: StudentRecord;
    validDays: string[];
}

export const TimeEntry = ({ meetingMinutes, student, validDays }: Props) => {
    const defaults = {
        day: validDays[0],
        startTime: '08:00',
        endTime: '08:30',
        disableSubmit: true,
    };

    const [day, setDay] = useState(defaults.day);
    const [timeSelected, setTimeSelected] = useState('');
    const [times, setTimes] = useState<Availability[]>(student.times);
    const [startTime, setStartTime] = useState(defaults.startTime);
    const [endTime, setEndTime] = useState(defaults.endTime);

    const meetingOptions = createMeetingOptions(meetingMinutes);
    const handleDeleteTime = (index: number) => {
        const update = times.filter((_, i) => i !== index);
        setTimes(update);
    };

    interface Option {
        menuItem: React.JSX.Element;
        strStart: string;
        strEnd: string;
        start: number;
        end: number;
    }

    function createOption(
        startHours: number,
        startMins: number,
        endHours: number,
        endMins: number
    ) {
        function addPadding(arg: number) {
            return arg.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
            });
        }
        const strStart = `${addPadding(startHours)}:${addPadding(startMins)}`;
        const strEnd = `${addPadding(endHours)}:${addPadding(endMins)}`;
        const menuText = `${strStart} to ${strEnd}`;
        const totalStart = startHours * 60 + startMins;
        const totalEnd = endHours * 60 + endMins;

        const menuItem = (
            <MenuItem key={menuText} value={menuText}>
                {menuText}
            </MenuItem>
        );
        const option: Option = {
            menuItem: menuItem,
            strStart: strStart,
            strEnd: strEnd,
            start: totalStart,
            end: totalEnd,
        };
        return option;
    }

    function createMeetingOptions(mins: number) {
        const meetingHours = Math.floor(mins / 60);
        const meetingMins = mins % 60;

        let startHours = 0;
        let startMins = 0;
        let endHours = 0;
        let endMins = 0;

        const items: Option[] = [];
        // Loop: 0-24:00
        while (startHours < 24) {
            // End = Start + Meeting Duration
            const totalMins = startMins + meetingMins;
            endMins = totalMins % 60;
            endHours = startHours + meetingHours + Math.floor(totalMins / 60);

            const newOption = createOption(
                startHours,
                startMins,
                endHours,
                endMins
            );
            items.push(newOption);

            // Start = End
            startMins = endMins;
            startHours = endHours;
        }

        return items;
    }

    const handleAddTime = () => {
        // TODO: Merge times or prevent cross over times
        const newEntry: Availability = {
            day,
            startTime,
            endTime,
        };
        setTimes((prev) => [...prev, newEntry]);

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
