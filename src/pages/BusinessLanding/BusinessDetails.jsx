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

const BusinessDetails = ({ businessBasicInfo, setBusinessBasicInfo, phone, setPhone }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const phoneWithoutAreaCode = () => {
      return phone.number.slice(phone.areaCode.length).length;
    }

    if(businessBasicInfo.name==='' || businessBasicInfo.type==='' || phone.number===0 || phoneWithoutAreaCode(phone.number)!==10) {
      setShowAlert(true);
    }
    else {
      setShowAlert(false);
    }

    console.log('businessBasicInfo', businessBasicInfo);
    console.log('phone', phone);
  }, [businessBasicInfo.name, businessBasicInfo.type, phone]);

  const handleChange = (event) => {
    // event.target.value
    setBusinessBasicInfo(prevState => ({
      ...prevState,
      type: event.target.value,
    }));
  };

  const handleOnChange = (value, data, event, formattedValue) => {
    setPhone(prevState => ({
      ...prevState,
      number: value,
      areaCode: data.dialCode,
    }));
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
              setBusinessBasicInfo(prevState => ({
                ...prevState,
                name: e.target.value,
              }));
              
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
              value={businessBasicInfo.type}
              label="businessType"
              onChange={handleChange}
            >
              <MenuItem value={'Restaurant'}>Restaurant</MenuItem> {/* TODO: Retrive options from API */}
              <MenuItem value={'Clothes'}>Clothes</MenuItem>
              <MenuItem value={'Etc'}>Etc</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <PhoneInput
          country={'us'}
          value={phone.number}
          onChange={handleOnChange} // phone => setPhone(phone)}
        />
      </Stack>
    </>
  );
};

export default BusinessDetails;