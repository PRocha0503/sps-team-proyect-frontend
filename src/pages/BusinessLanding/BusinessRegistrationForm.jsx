import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SelectLocation from './SelectLocation';
import WeekSchedule from './WeekSchedule';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Input } from '@mui/material';
import BusinessDetails from './BusinessDetails';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Steps = ({
  businessLocation, 
  setBusinessLocation,
  serviceArea,
  setServiceArea,
  schedule,
  setSchedule,
  businessBasicInfo,
  setBusinessBasicInfo,
  phone,
  setPhone
}) => {
  return [
    {
      label: 'Select your bussiness location',
      description: `This will help us to bring you a better experience🥳.`,
      styles: { width: 1000, height: 450 },
      renderPage: () => {
        return <SelectLocation 
          businessLocation={businessLocation} 
          setBusinessLocation={setBusinessLocation} 
          serviceArea={serviceArea} setServiceArea={setServiceArea}
        />;
      }
    },
    {
      label: 'Select your working hours',
      description:
        'An ad group contains one or more ads which target a shared set of keywords.',
      styles: { width: 1000, height: 600 },
      renderPage: () => {
        return <WeekSchedule schedule={schedule} setSchedule={setSchedule} />;
      }
    },
    {
      label: 'Name your business ✨',
      description: `Last details to land your business!!!`,
      styles: { width: 450, height: 300 },
      renderPage: () => {
        return <BusinessDetails 
          businessBasicInfo={businessBasicInfo}
          setBusinessBasicInfo={setBusinessBasicInfo}
          phone={phone} 
          setPhone={setPhone}
        />;
      }
    },
    {
      label: 'Almost done!',
      renderPage: () => {
        return (
          <>
            <Typography>
              <h1>Your business information is the next one!</h1>
            </Typography>
            <Card sx={{ minWidth: 250 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Business Location
                </Typography>
                <Typography variant="h5" component="div">
                  {businessLocation.address}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Service Area: {serviceArea} (mts)
                </Typography>
              </CardContent>
            </Card>
            
            <Typography>
              <h3>Your working hours are:</h3>
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      Schedule
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Day</TableCell>
                    <TableCell align="right">Start</TableCell>
                    <TableCell align="right">End</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                {Object.entries(schedule).map((day, entry) => (
                  <TableRow key={day[0]}>
                    <TableCell>{day[0]}</TableCell>
                    <TableCell align="right">{day[1].start}</TableCell>
                    <TableCell align="right">{day[1].end}</TableCell>
                  </TableRow>
                ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        );
      }
    },
  ];
}
const BusinessRegistrationForm = () => {
  const navigate = useNavigate();
  const [businessLocation, setBusinessLocation] = React.useState({
    lat: 0,
    lng: 0,
    address: "",
  });
  const [serviceArea, setServiceArea] = React.useState(0);
  const [activeStep, setActiveStep] = React.useState(0);

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

  const [schedule, setSchedule] = React.useState(weekScheduleObj);
  
  const [businessBasicInfo, setBusinessBasicInfo] = React.useState({
    name: '',
    type: '',
  });
  const [phone, setPhone] = React.useState({
    number: 0,
    areaCode: 0,
  });

  const steps = Steps({
    businessLocation,
    setBusinessLocation,
    serviceArea,
    setServiceArea,
    schedule,
    setSchedule,
    businessBasicInfo,
    setBusinessBasicInfo,
    phone,
    setPhone
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleRegistration = () => {
    navigate('/business/app');
  };

  const getCurrentUser = async () => {
    const user = localStorage.getItem('token');
	  const token = JSON.parse(user)['token'];

    try {
      const userType = await axios.get(`${process.env.REACT_APP_API}/api/auth/validate`, {
        headers: {
          'x-token': token,
        }
      });
      return userType.data.username;
    } catch(err) {
      console.log(err);
    }
  }

  const registerBusiness = async () => {
    await axios.post(`${process.env.REACT_APP_API}/api/business/`, {
      username: await getCurrentUser(),
      name: businessBasicInfo.name,
      businessType: businessBasicInfo.type,
      serviceArea: serviceArea,
      phone: phone.number.slice(phone.areaCode.length),
      servicesHours: schedule,
      location: businessLocation,
    }).then(res => {
      console.log(res);
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

  return (
    <>
      <h1>Registration Form 🚀</h1>
      <Box sx={{ maxWidth: 800 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={step.styles}>
                  {step?.renderPage && step.renderPage()}  
                </Box>
                
                
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={
                        steps.length === activeStep ? 
                          registerBusiness() : 
                          handleNext
                      }
                      disabled={
                        businessLocation.address === "" || 
                        serviceArea === 0 ||
                        (activeStep === steps.length - 2 &&
                        (businessBasicInfo.name === "" ||
                        businessBasicInfo.type === "" ||
                        phone.number === 0 ||
                        phone.number === "" ||
                        phone.number.length - phone.areaCode.length !== 10))
                      } // TODO: Refactor validation
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                    
                  </div>
                  
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleRegistration} sx={{ mt: 1, mr: 1 }}>
              Ok!
            </Button>
          </Paper>
        )}
      </Box>
    </>
  );
}

export default BusinessRegistrationForm;
