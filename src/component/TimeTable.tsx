import React from 'react';
import { Availability } from './Form';
import { DeleteTimeEntry } from './Buttons';
import '../table.css';
interface Props {
  times: Availability[];
}

export const TimeTable = ({ times }: Props) => {
  const header_names = ['Day', 'Start Time', 'End Time', 'Action'];
  const headers = header_names.map((name) => <th key={name}>{name}</th>);
  const rows = times.map((time, index) => (
    <tr key={index}>
      <td>{time.day}</td>
      <td>{time.startTime}</td>
      <td>{time.endTime}</td>
      <td>
        <DeleteTimeEntry handleClick={() => time.delete(times, index)} />
      </td>
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
