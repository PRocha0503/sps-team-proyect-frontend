import React, { useState, useRef, useEffect } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import validateJWT from "../../../helpers/validateJWT";

const defaultValues = {
  name: "",
  price: 0,
  description: "",
  image: "",
  category: "",
  owner: ""
};

const ProductForm = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const responseRef = React.useRef();
  const [user, setUser] = useState(0);
  const { token } = JSON.parse(localStorage.getItem("token")) || {};
  
  useEffect(() => {
    const validate = async () => {
      try {
        const user = await validateJWT(token);
        setUser(user);
        defaultValues.owner = user.username;
      } catch (err) {
        console.log(err);
      }
    };
    validate();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    const element = responseRef.current;
    const url = `${process.env.REACT_APP_API}/api/products`;
    
    axios.post(url, formValues)
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
            id="name-input"
            name="name"
            label="Name"
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="price-input"
            name="price"
            label="Price"
            type="number"
            value={formValues.price}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="description-input"
            name="description"
            label="Description"
            type="text"
            value={formValues.description}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="image-input"
            name="image"
            label="Image URL"
            type="text"
            value={formValues.image}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="category-input"
            name="category"
            label="Category"
            type="text"
            value={formValues.category}
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
export default ProductForm;