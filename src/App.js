import React, { useState } from 'react'
import Grid from "@mui/material/Grid";

import Time from './Time'
import Student from './Student'
import Schedule from './Schedule'
import { GradeField, IDField, NameField } from './component/Fields';
import { SubmitButton, UploadFileButton, ClearButton } from './component/Buttons';
import { DateSelect } from './component/DateSelect';

import { doSchedule } from'./scheduler'
import ScheduleTable from './ScheduleTable/ScheduleTable'
import StudentTable from './StudentTable/StudentTable'

import IconButton from '@mui/material/IconButton';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
      }),
      [],
    );
  
    const theme = React.useMemo(
      () =>
        createTheme({
          palette: {
            mode,
          },
        }),
      [mode],
    );
  
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <MyApp />
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
}
  
function MyApp() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    const initStudents = []
    const initSchedule = new Schedule()
    const [name, setName] = useState('')
    const [id, setID] = useState('')
    const [grade, setGrade] = useState('')
    const [students, setStudents] = useState(initStudents)
    const [schedule, setSchedule] = useState(initSchedule)

    function convertDay(data) {
        if (!data) return []

        let properties = data.split(',') || data
        let obj = []
        properties.forEach(prop => {
          let tup = prop.split('-')
          const start = tup[0].split(':')
          const hrStart = Number(start[0])
          const minStart = Number(start[1])
    
          const end = tup[1].split(':')
          const hrEnd = Number(end[0])
          const minEnd = Number(end[1])
    
          obj.push({'start': new Time(hrStart, minStart), 'end': new Time(hrEnd, minEnd)})
        })
        return obj
    }

    function lowerCaseKeys(obj) {
        const array = Object.entries(obj)
                .map( ([key,value]) => { return [key.toLowerCase(), value] })
        
        return Object.fromEntries(array)
    }

    function convertRawData(raw_data) {
        const formattedData = []
        for (let item of raw_data) {
            item = lowerCaseKeys(item)

            const availability = {}
            availability.monday = convertDay(item.monday)
            availability.tuesday = convertDay(item.tuesday)
            availability.wednesday = convertDay(item.wednesday)
            availability.thursday = convertDay(item.thursday)
            availability.friday = convertDay(item.friday)

            item.availability = availability
            formattedData.push(item)
        }

        return formattedData
    }

    function makeStudents(raw_data) {
        const data = convertRawData(raw_data)
        return data.map(item => new Student(item.id, item.name, item.grade, item.topic, item.availability))
    }

    async function uploadFile() {
        // const file_name = await window.api.openDialog()
        const file_name = 'test/data/MOCK_DATA2.csv'
        const raw_data = await window.api.parseCSV(file_name)
        const uploadedStudents = makeStudents(raw_data)
        console.log(raw_data)
        const unscheduled_students = [...students, ...uploadedStudents]
        setStudents(unscheduled_students)
        scheduleNow(unscheduled_students)
    }

    function handleClear() {
        setStudents(initStudents)
        setSchedule(initSchedule)
    }

    const handleSubmit = () => {
        // TODO: Save Student Data
        console.log('submit hit')
    }

    function scheduleNow(unscheduled_students) {
        const blockout_times = {
            'monday': [
            {'start': new Time(0,30), 'end': new Time(1)},
            {'start': new Time(10), 'end': new Time(11)},
            {'start': new Time(12), 'end': new Time(13)}
            ],
            'friday': [
                {'start': new Time(1), 'end': new Time(1,30)},
            ]
        }
        const interval = 30
        const result = doSchedule(interval, blockout_times, unscheduled_students)
        setSchedule(result)
    }

    return (
        <Grid container>
            <Grid container margin={2} spacing={2}>
                <Grid item>
                    {theme.palette.mode} mode
                    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <CssBaseline /> : <Brightness4Icon />}
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container margin={2} spacing={2}>
                <IDField handleInputChange={setID}/>
                <NameField handleInputChange={setName}/>
                <GradeField handleInputChange={setGrade}/>
            </Grid>
            <Grid container margin={2} spacing={2}>
                <DateSelect text='Start'/>
                <DateSelect text='End'/>
            </Grid>
            <Grid container margin={2} spacing={2}>
                <SubmitButton handleSubmit={handleSubmit}/>
                <ClearButton handleClear={handleClear}/>
                <UploadFileButton handleUploadFile={uploadFile}/>
            </Grid>
            <Grid container margin={2} spacing={2}>
                <StudentTable students={students} />
                <ScheduleTable schedule={schedule}/>
            </Grid>
        </Grid>
    )
}

export default App