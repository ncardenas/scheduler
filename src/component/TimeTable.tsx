import React from 'react';
import { BasicTable } from '../BasicTable';
import { Availability } from './Form';
import { DeleteTimeEntry } from './Buttons';
interface Props {
  times: Availability[];
}

export const TimeTable = ({ times }: Props) => {
  const column_names = ['Day', 'startTime', 'endTime', 'action'];
  const columns = column_names.map((name) => {
    return { Header: name, accessor: name };
  });

  // return <BasicTable c={columns} d={times} />;
  const headers = column_names.map((name) => <th key={name}>{name}</th>);
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
