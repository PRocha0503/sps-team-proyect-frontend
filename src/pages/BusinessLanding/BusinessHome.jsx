import React from 'react';
import BusinessRegistrationForm from './BusinessRegistrationForm';

const BusinessHome = () => {
  const [firstTime, setFirstTime] = React.useState(true);

  return (
    <>
      {firstTime &&
        <BusinessRegistrationForm />
      }
    </>
  );
}

export default BusinessHome;
