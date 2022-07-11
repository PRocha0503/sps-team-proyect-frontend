import React from 'react';
import {
  Select,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Box,
  Stack,
} from '@mui/material';

const BusinessDetails = () => {
  const [age, setAge] = React.useState('Select one');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <Stack spacing={1}>
        <TextField
            id="outlined-basic"
            label="Business Name"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => {
              console.log(e.target.value);
            }}
            type="text"
          >
        </TextField>
        <br />
        
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select a business type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Restaurant</MenuItem>
              <MenuItem value={20}>Clothes</MenuItem>
              <MenuItem value={30}>Etc</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>
    </>
  );
};

export default BusinessDetails;