import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const defaultValues = {
  name: "",
  age: 0,
  gender: "",
  os: "",
  favoriteNumber: 0,
};

const Form = () => {
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSliderChange = (name) => (e, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
        <Grid container direction="column" justifyContent="space-around" alignItems="center">
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
                id="grade-input"
                name="grade"
                label="Grade"
                type="number"
                value={formValues.age}
                onChange={handleInputChange}
                />
            </Grid>
            
        </Grid>
    </form>
  );
};

export default Form;