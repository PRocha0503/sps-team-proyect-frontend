import React, { useState, useRef } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const defaultValues = {
  item: "",
  percentage: 0,
  owner: "John's Candy"
};

const CouponForm = () => {
    const [formValues, setFormValues] = useState(defaultValues);
    const responseRef = React.useRef();
    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    const element = responseRef.current;

    axios.post('http://localhost:8080/api/coupons', formValues)
    .then(response => element.innerHTML = response.data.id )
    .catch(error => {
        element.innerHTML = `Error: ${error.message}`;
        console.error('There was an error!', error);
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justify="center" direction="column" spacing={3}>
        <Grid item>
          <TextField
            id="item-input"
            name="item"
            label="Item"
            type="text"
            value={formValues.item}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="percentage-input"
            name="percentage"
            label="Percentage"
            type="number"
            value={formValues.percentage}
            onChange={handleInputChange}
          />
        </Grid>
        <Button sx={{ mt: 3}} variant="contained" color="primary" type="submit">
          Submit
        </Button>
        <Typography ref={responseRef}>
            
        </Typography>
      </Grid>
    </form>
  );
};
export default CouponForm;