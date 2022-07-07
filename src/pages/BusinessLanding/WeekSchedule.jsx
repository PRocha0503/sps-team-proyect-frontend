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
import { useEffect } from "react";

const completeGranularityTime = (date) => {
  return ('0' + date).slice(-2);
}

const completeDateFormat = (date) => {
  let formattedDate = date.split(':');
  return completeGranularityTime(formattedDate[0]) + ":" + completeGranularityTime(formattedDate[1]);
}

const WeekSchedule = () => {
  const [showAlert, setShowAlert] = useState(false);

  const [hourStart, setHourStart] = React.useState(new Date(0, 0, 0, 0, 0));
  const [hourEnd, setHourEnd] = React.useState(new Date(0, 0, 0, 0, 0));
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  let weekScheduleMap = new Map();
  weekDays.forEach(element => 
    weekScheduleMap.set(
      element, 
      {
        start: "00:00", //Date(0, 0, 0, 0, 0), 
        end: "00:00" // Date(0, 0, 0, 0, 0)
      }
    )
  );

  let weekScheduleObj = Array.from(weekScheduleMap).reduce((obj, [key, value]) => (
    Object.assign(obj, { [key]: value }) 
  ), {}); 

  const [alignment, setAlignment] = React.useState(0);
  const [schedule, setSchedule] = React.useState(weekScheduleObj);

  const handleAlignment = (event, newAlignment) => {

    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  useEffect (() => {
    if(hourStart.getTime() > hourEnd.getTime()) {
      setShowAlert(true);
    }
    else {
      setShowAlert(false);
    }
  }, [hourStart, hourEnd]);

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
              console.log(schedule);
              let hourStart = schedule[weekDays[index]].start;
              let hourEnd = schedule[weekDays[index]].end;
              
              const hourStartFormated = hourStart.split(':');
              const hourEndFormated = hourEnd.split(':');

              setHourStart(new Date(0, 0, 0, hourStartFormated[0], hourStartFormated[1]));
              setHourEnd(new Date(0, 0, 0, hourEndFormated[0], hourEndFormated[1]));
            }}
            disabled={showAlert}
          >
            {day}
          </ToggleButton>
        ))}
        

      </ToggleButtonGroup>
      
      <br />
      { showAlert && 
          (
            <Alert severity="warning">The start hour must be before the end hour</Alert>
          )
      }
      
      <Stack direction="row" spacing={2}>
        
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticTimePicker
            value={hourStart}
            onChange={(newValue) => {
              setHourStart(newValue);
              
              setSchedule(prevSchedule => {
                let newSchedule = prevSchedule;
                newSchedule[weekDays[alignment]].start = completeDateFormat(newValue.getHours() + ":" + newValue.getMinutes());
                return newSchedule;
              });
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

              setSchedule(prevSchedule => {
                let newSchedule = prevSchedule;
                console.log(weekDays);
                console.log(alignment);
                console.log(weekDays[alignment]);
                console.log(newSchedule);
                newSchedule[weekDays[alignment]].end = completeDateFormat(newValue.getHours() + ":" + newValue.getMinutes());
                return newSchedule;
              });
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
