import React from 'react';
import { Availability } from '../types';
import { DeleteTimeEntry } from './Buttons';
import { timeToString } from './Form/createMeetingTime';
import '../table.scss';
interface Props {
    times: Availability[];
    handleParentDelete: (index: number) => void;
}

export const TimeTable: React.FC<Props> = ({ times, handleParentDelete }) => {
    const header_names = ['Day', 'Start Time', 'End Time', 'Action'];
    const headers = header_names.map((name) => <th key={name}>{name}</th>);
    const rows = times.map((time, index) => (
        <tr key={index}>
            <td>{time.day}</td>
            <td>{timeToString(time.startTime)}</td>
            <td>{timeToString(time.endTime)}</td>
            <td>
                <DeleteTimeEntry
                    handleClick={() => handleParentDelete(index)}
                />
            </td>
        </tr>
    ));

    return (
        <table style={{ tableLayout: 'fixed' }}>
            <thead>
                <tr>{headers}</tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
};
