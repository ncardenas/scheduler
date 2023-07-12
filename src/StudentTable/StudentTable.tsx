import React from 'react';
import { StudentRecord } from '../App';
import '../table.css';
import { Stack } from '@mui/material';
import { StudentEditButton, StudentDeleteButton } from '../component/Buttons';

interface Props {
  handleParentEdit: (student: StudentRecord) => void;
  handleParentDelete: (index: number) => void;
  students: StudentRecord[];
}

const StudentTable = ({
  handleParentEdit,
  handleParentDelete,
  students,
}: Props) => {
  // TODO: Make this a subset of the time table headers
  const header_names = ['Unique ID', 'Name', 'Grade', 'Topic', 'Action'];
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
      <td>
        <Stack spacing={2} justifyContent="center">
          <StudentEditButton handleClick={() => handleParentEdit(student)} />
          <StudentDeleteButton handleClick={() => handleParentDelete(index)} />
        </Stack>
      </td>
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
