import React, {useState, useEffect} from 'react';
import BusinessRegistrationForm from './BusinessRegistrationForm';
import axios from 'axios';
import { Typography } from '@mui/material';
import BusinessRecomendations from './BusinessRecomendations';

const BusinessHome = () => {
  const [firstTime, setFirstTime] = useState(true);

  const user = localStorage.getItem('token');
	const token = JSON.parse(user)['token'];
	const [userData, setUserData] = useState({});

	useEffect(() => {
		const getUserType = async () => {
			console.log(user);
			console.log(token);
			try {
				const userType = await axios.get(`${process.env.REACT_APP_API}/api/auth/validate`, {
					headers: {
						'x-token': token,
					}
				});
        console.log(userType);
				setUserData(userType.data);

			}
			catch (err) {
				console.log(err);
			}
			
		};
		getUserType();
	}, [token, user]);

  useEffect(() => {
    const hasCompletedRegistration = async () => {
			try {
				const registerEntry = await axios.get(`${process.env.REACT_APP_API}/api/business/${userData.username}`);
        console.log(userData);
        console.log(registerEntry);
        // Object.keys(registerEntry.data).length > 0 ? setFirstTime(false) : setFirstTime(true);
				if (Object.keys(registerEntry.data).length === 0) {
					console.log('No');
          setFirstTime(true);
				}
				else {
					console.log('Yes');
          setFirstTime(false);
				}

			}
			catch (err) {
				console.log(err);
			}
		}

		hasCompletedRegistration();
  }, [userData]);
	

  return (
    <>
      {firstTime ?
        <BusinessRegistrationForm />
				:
				<BusinessRecomendations />
      }

    </>
  );
}

export default BusinessHome;
