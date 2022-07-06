import React, {useState} from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import TextField from '@mui/material/TextField';
import { ButtonGroup, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Alert from '@mui/material/Alert';
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const WeekSchedule = () => {
  const [hourStart, setHourStart] = React.useState(new Date(0, 0, 0, 0, 0));
  const [hourEnd, setHourEnd] = React.useState(new Date(0, 0, 0, 0, 0));
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const [alignment, setAlignment] = React.useState(0);

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <>
      <h1>Week Schedule ⌚️</h1>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        color="error"
      >
        {weekDays.map((day, index) => (
          <ToggleButton value={index} aria-label="left aligned"
            key={index}
            onClick={() => {
              //setValue(new Date(value.getFullYear(), value.getMonth(), value.getDate() + index))}
              console.log(hourStart, hourEnd, day);
              //console.log(value.getFullYear(), value.getMonth(), value.getDate(), value.getHours(), value.getMinutes(), index, weekDays[index])
            }}
          >
            {day}
          </ToggleButton>
        ))}
        

      </ToggleButtonGroup>
      
      <br />
      <Alert severity="warning">The start hour must be before the end hour</Alert>
      <Stack direction="row" spacing={2}>
        
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticTimePicker
            value={hourStart}
            onChange={(newValue) => {
              setHourStart(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticTimePicker
            displayStaticWrapperAs="mobile"
            value={hourEnd}
            onChange={(newValue) => {
              setHourEnd(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Stack>
      <br />
    </>
  );
}

export default WeekSchedule;
