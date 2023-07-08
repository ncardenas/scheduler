import React from 'react';
import { StudentRecord } from '../App';
import '../table.css';

interface Props {
  students: StudentRecord[];
}
const StudentTable = ({ students }: Props) => {
  // TODO: Make this a subset of the time table headers
  const header_names = ['Unique ID', 'Name', 'Grade', 'Topic'];
  const headers = header_names.map((name) => (
    <th className="th" key={name}>
      {name}
    </th>
  ));

  const rows = students.map((student, index) => (
    <tr key={index}>
      <td>{student.id}</td>
      <td>{student.name}</td>
      <td>{student.grade}</td>
      <td>{student.topic}</td>
    </tr>
  ));

  return (
    <table className="table">
      <thead className="thead">
        <tr className="tr">{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default StudentTable;
