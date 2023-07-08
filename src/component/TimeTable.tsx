import React from 'react';
import { BasicTable } from '../BasicTable';

export const TimeTable = ({ times }) => {
  const column_names = ['day', 'startTime', 'endTime', 'action'];
  const columns = column_names.map((name) => {
    return { Header: name, accessor: name };
  });

  return <BasicTable c={columns} d={times} />;
};
