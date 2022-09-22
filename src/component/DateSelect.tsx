import React, { useState } from "react"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";

export const DateSelect = ({text}) => {
    const [selectedDate, handleDateChange] = useState(new Date("2018-01-01T00:00:00.000Z"));

    return (
        <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                    label={text}
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </LocalizationProvider>
        </Grid>
    )
}