import React from 'react';
import { Stack, Typography, TextField } from '@mui/material';

export const MeetingDurationForm = ({ disabled, handleChange }) => {
  return (
    <Stack spacing={2} alignItems="center">
      <Typography>Meeting Duration</Typography>
      <TextField
        disabled={disabled}
        size="small"
        type="number"
        label="Minutes"
        onChange={(e) => handleChange(e.target.value)}
      />
    </Stack>
  );
};
