import React, {useState, useEffect} from 'react';
import {
  Select,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Box,
  Stack,
  Alert,
} from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

const BusinessDetails = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [phone, setPhone] = useState(0);
  const [areaCode, setAreaCode] = useState(0);


  useEffect(() => {
    const phoneWithoutAreaCode = () => {
      return phone.slice(areaCode.length).length;
    }

    if(businessName==='' || businessType==='' || phone===0 || phoneWithoutAreaCode(phone)!==10) {
      setShowAlert(true);
    }
    else {
      setShowAlert(false);
    }
  }, [businessName, businessType, phone, areaCode]);

  const handleChange = (event) => {
    setBusinessType(event.target.value);
  };

  const handleOnChange = (value, data, event, formattedValue) => {
    setPhone(value);
    setAreaCode(data.dialCode);
  }
  

  return (
    <>
      <br />
      <Stack spacing={2}>
        {showAlert && 
          (<Alert 
            severity="warning"
          >
            <strong>There are required fields that are missing</strong>
          </Alert>)
        }
        <TextField
            id="outlined-basic"
            label="Business Name"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => {
              setBusinessName(e.target.value);
            }}
            type="text"
          >
        </TextField>
        
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="business-type-select-label">Select a business type</InputLabel>
            <Select
              labelId="business-type-select-label"
              id="business-type-select"
              value={businessType}
              label="businessType"
              onChange={handleChange}
            >
              <MenuItem value={0}>Restaurant</MenuItem> {/* TODO: Retrive options from API */}
              <MenuItem value={1}>Clothes</MenuItem>
              <MenuItem value={2}>Etc</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <PhoneInput
          country={'us'}
          value={phone}
          onChange={handleOnChange} // phone => setPhone(phone)}
        />
      </Stack>
    </>
  );
};

export default BusinessDetails;